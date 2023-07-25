import { getPriorityOrders } from "@/prisma";

export const GET = async (req, res) => {
  const orders = await getPriorityOrders();
  return new Response(JSON.stringify(orders));
};
