import "server-only";

import { env } from "../env.js";

type JsonSchema = Record<string, unknown>;

type ResponsesApiBody = {
  model: string;
  input: Array<{ role: "system" | "user"; content: string }>;
  temperature?: number;
  text: {
    format: {
      type: "json_schema";
      name: string;
      strict: true;
      schema: JsonSchema;
    };
  };
};

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

export function getEmbeddingModel() {
  if (!env.OPENAI_EMBEDDING_MODEL) {
    throw new Error(
      "OPENAI_EMBEDDING_MODEL is required when USE_MOCK_AI is false"
    );
  }
  return env.OPENAI_EMBEDDING_MODEL;
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

export async function createOpenAIEmbedding(text: string) {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required when USE_MOCK_AI is false");
  }

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: getEmbeddingModel(),
      input: text,
    }),
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`OpenAI Embeddings API failed: ${responseText}`);
  }

  const data = parseJsonPayload(responseText, "OpenAI Embeddings API") as {
    data?: Array<{ embedding?: number[] }>;
  };

  const embedding = data.data?.[0]?.embedding;
  if (!embedding) {
    throw new Error("OpenAI embedding response did not include an embedding");
  }

  return embedding;
}

export async function createOpenAIEmbeddings(texts: string[]) {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required when USE_MOCK_AI is false");
  }
  if (texts.length === 0) return [];

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: getEmbeddingModel(),
      input: texts,
    }),
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`OpenAI Embeddings API failed: ${responseText}`);
  }

  const data = parseJsonPayload(responseText, "OpenAI Embeddings API") as {
    data?: Array<{ index?: number; embedding?: number[] }>;
  };

  const ordered = [...(data.data ?? [])].sort(
    (a, b) => (a.index ?? 0) - (b.index ?? 0)
  );
  const embeddings = ordered.map((item) => item.embedding).filter(Boolean);
  if (embeddings.length !== texts.length) {
    throw new Error("OpenAI embedding response did not include all embeddings");
  }

  return embeddings as number[][];
}
