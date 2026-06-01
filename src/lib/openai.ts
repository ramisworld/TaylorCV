import "server-only";

import { env } from "../env.js";

type JsonSchema = Record<string, unknown>;

type ResponsesApiBody = {
  model: string;
  input: Array<{ role: "system" | "user"; content: string }>;
  temperature?: number;
  reasoning?: {
    effort: "low" | "medium" | "high";
  };
  text: {
    format: {
      type: "json_schema";
      name: string;
      strict: true;
      schema: JsonSchema;
    };
  };
};

export type OpenAiProviderErrorMeta = {
  provider: "openai";
  status: number | null;
  errorClass: string;
  retryable: boolean;
  rayId: string | null;
  bodyPreview: string | null;
  durationMs: number;
};

export class OpenAiProviderError extends Error {
  meta: OpenAiProviderErrorMeta;

  constructor(message: string, meta: OpenAiProviderErrorMeta) {
    super(message);
    this.name = "OpenAiProviderError";
    this.meta = meta;
  }
}

function parseJsonPayload(text: string, serviceName: string) {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    const looksLikeHtml = /^\s*</.test(text);
    throw new Error(
      `${serviceName} returned ${looksLikeHtml ? "HTML" : "invalid JSON"} instead of JSON`
    );
  }
}

function sanitizeBodyPreview(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 300) || null;
}

function extractCloudflareRayId(value: string) {
  const match =
    value.match(/Ray ID[:\s]*([A-Za-z0-9-]+)/i) ??
    value.match(/cf-ray["'>:\s]+([A-Za-z0-9-]+)/i);
  return match?.[1] ?? null;
}

function classifyErrorResponse(args: {
  responseText: string;
  status: number;
  durationMs: number;
}) {
  const preview = sanitizeBodyPreview(args.responseText);
  const looksLikeHtml = /^\s*</.test(args.responseText);
  const cloudflareSignal =
    args.status === 520 ||
    /cloudflare|api\.openai\.com\s*\|\s*520|error code:\s*520|<title>\s*520/i.test(
      args.responseText
    );

  if (looksLikeHtml && cloudflareSignal) {
    return new OpenAiProviderError(
      "OpenAI provider edge error 520. Request failed before a valid JSON response.",
      {
        provider: "openai",
        status: args.status,
        errorClass: "openai_cloudflare_520",
        retryable: true,
        rayId: extractCloudflareRayId(args.responseText),
        bodyPreview: preview,
        durationMs: args.durationMs,
      }
    );
  }

  return new OpenAiProviderError(
    `OpenAI Responses API failed with HTTP ${args.status}.`,
    {
      provider: "openai",
      status: args.status,
      errorClass: looksLikeHtml ? "openai_non_json_error" : "openai_http_error",
      retryable: args.status >= 500,
      rayId: extractCloudflareRayId(args.responseText),
      bodyPreview: preview,
      durationMs: args.durationMs,
    }
  );
}

export function isMockAiEnabled() {
  return env.USE_MOCK_AI === "true";
}

export function getFastModel() {
  if (!env.OPENAI_FAST_MODEL) {
    throw new Error("OPENAI_FAST_MODEL is required when USE_MOCK_AI is false");
  }
  return env.OPENAI_FAST_MODEL;
}

export function getStrongModel() {
  if (!env.OPENAI_STRONG_MODEL) {
    throw new Error("OPENAI_STRONG_MODEL is required when USE_MOCK_AI is false");
  }
  return env.OPENAI_STRONG_MODEL;
}

export async function createStructuredJsonResponse(args: {
  model: string;
  systemPrompt: string;
  userPrompt: string;
  schemaName: string;
  jsonSchema: JsonSchema;
  temperature?: number;
}) {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required when USE_MOCK_AI is false");
  }

  const body: ResponsesApiBody = {
    model: args.model,
    temperature: args.temperature,
    input: [
      { role: "system", content: args.systemPrompt },
      { role: "user", content: args.userPrompt },
    ],
    text: {
      format: {
        type: "json_schema",
        name: args.schemaName,
        strict: true,
        schema: args.jsonSchema,
      },
    },
  };

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`OpenAI Responses API failed: ${responseText}`);
  }

  const data = parseJsonPayload(responseText, "OpenAI Responses API") as {
    output_text?: string;
    output?: Array<{
      content?: Array<{ type?: string; text?: string }>;
    }>;
  };

  const outputText =
    data.output_text ??
    data.output
      ?.flatMap((item) => item.content ?? [])
      .find((content) => content.type === "output_text")?.text;

  if (!outputText) {
    throw new Error("OpenAI response did not include output text");
  }

  return parseJsonPayload(outputText, "OpenAI output text");
}

export type OpenAiUsage = {
  promptTokens: number | null;
  completionTokens: number | null;
  totalTokens: number | null;
  reasoningTokens: number | null;
};

export async function createStructuredJsonResponseWithUsage(args: {
  model: string;
  systemPrompt: string;
  userPrompt: string;
  schemaName: string;
  jsonSchema: JsonSchema;
  temperature?: number;
  reasoningEffort?: "low" | "medium" | "high";
}): Promise<{ parsed: unknown; usage: OpenAiUsage }> {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required when USE_MOCK_AI is false");
  }

  const body: ResponsesApiBody = {
    model: args.model,
    temperature: args.temperature,
    reasoning: args.reasoningEffort ? { effort: args.reasoningEffort } : undefined,
    input: [
      { role: "system", content: args.systemPrompt },
      { role: "user", content: args.userPrompt },
    ],
    text: {
      format: {
        type: "json_schema",
        name: args.schemaName,
        strict: true,
        schema: args.jsonSchema,
      },
    },
  };

  const startedAt = Date.now();
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw classifyErrorResponse({
      responseText,
      status: response.status,
      durationMs: Date.now() - startedAt,
    });
  }

  const data = parseJsonPayload(responseText, "OpenAI Responses API") as {
    output_text?: string;
    output?: Array<{
      content?: Array<{ type?: string; text?: string }>;
    }>;
    usage?: {
      input_tokens?: number;
      output_tokens?: number;
      total_tokens?: number;
      output_tokens_details?: {
        reasoning_tokens?: number;
      };
    };
  };

  const outputText =
    data.output_text ??
    data.output
      ?.flatMap((item) => item.content ?? [])
      .find((content) => content.type === "output_text")?.text;

  if (!outputText) {
    throw new Error("OpenAI response did not include output text");
  }

  const usage: OpenAiUsage = {
    promptTokens: data.usage?.input_tokens ?? null,
    completionTokens: data.usage?.output_tokens ?? null,
    totalTokens: data.usage?.total_tokens ?? null,
    reasoningTokens: data.usage?.output_tokens_details?.reasoning_tokens ?? null,
  };

  return {
    parsed: parseJsonPayload(outputText, "OpenAI output text"),
    usage,
  };
}

function sseDataLines(block: string) {
  return block
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trimStart());
}

export async function streamStructuredJsonResponse(args: {
  model: string;
  systemPrompt: string;
  userPrompt: string;
  schemaName: string;
  jsonSchema: JsonSchema;
  temperature?: number;
  onOutputTextDelta: (delta: string) => void | Promise<void>;
}) {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required when USE_MOCK_AI is false");
  }

  const body: ResponsesApiBody & { stream: true } = {
    model: args.model,
    temperature: args.temperature,
    input: [
      { role: "system", content: args.systemPrompt },
      { role: "user", content: args.userPrompt },
    ],
    stream: true,
    text: {
      format: {
        type: "json_schema",
        name: args.schemaName,
        strict: true,
        schema: args.jsonSchema,
      },
    },
  };

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`OpenAI Responses API failed: ${await response.text()}`);
  }
  if (!response.body) {
    throw new Error("OpenAI streaming response did not include a body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let pending = "";
  let outputText = "";

  while (true) {
    const chunk = await reader.read();
    pending += decoder.decode(chunk.value, { stream: !chunk.done });
    const blocks = pending.split(/\r?\n\r?\n/);
    pending = blocks.pop() ?? "";
    for (const block of blocks) {
      for (const data of sseDataLines(block)) {
        if (!data || data === "[DONE]") continue;
        const event = parseJsonPayload(data, "OpenAI streaming event") as {
          type?: string;
          delta?: string;
          error?: { message?: string };
        };
        if (event.type === "response.output_text.delta" && event.delta) {
          outputText += event.delta;
          await args.onOutputTextDelta(event.delta);
        }
        if (event.type === "error" || event.type === "response.error") {
          throw new Error(event.error?.message ?? "OpenAI streaming response failed");
        }
      }
    }
    if (chunk.done) break;
  }

  return parseJsonPayload(outputText, "OpenAI output text");
}

