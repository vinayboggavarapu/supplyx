import { getUserProductOrder } from "@/prisma";

export const GET = async (req) => {
  const address = req.nextUrl.searchParams.get("address");
  const res = await getUserProductOrder({ address });
  return new Response(JSON.stringify(res));
};
