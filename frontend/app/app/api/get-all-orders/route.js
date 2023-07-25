import { getOrders } from "@/prisma";

export const GET = async (req, res) => {
  const orders = await getOrders();
  return new Response(JSON.stringify(orders));
};
