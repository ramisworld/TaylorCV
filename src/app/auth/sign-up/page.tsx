import { redirect } from "next/navigation";

export default async function LegacySignUpPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item != null) params.append(key, item);
      }
    } else if (value != null) {
      params.set(key, value);
    }
  }

  params.set("mode", "sign-up");
  redirect(`/auth?${params.toString()}`);
}
