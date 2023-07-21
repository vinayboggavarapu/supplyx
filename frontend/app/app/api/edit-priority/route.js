import { editPriority } from "@/prisma";

export async function GET(req) {
  const id = req.nextUrl.searchParams.get("id");
  const orders = await editPriority({ id });
  return new Response(JSON.stringify(orders));
}
