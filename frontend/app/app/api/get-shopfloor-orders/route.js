import { getShopFloorOrders } from "@/prisma";

export const GET = async (req, res) => {
  const orders = await getShopFloorOrders();
  return new Response(JSON.stringify(orders));
};
