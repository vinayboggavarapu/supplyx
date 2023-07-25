import {
  getNotifications,
  createNotification,
  deleteNotification,
  setShopFloor,
} from "@/prisma";

export const GET = async (req) => {
  const user = req.nextUrl.searchParams.get("user");
  const notifications = await getNotifications({ user });

  return new Response(JSON.stringify(notifications));
};

export const POST = async (req) => {
  const body = await req.json();
  const { manufacturer, retailer, eventName } = body;
  const notifications = await createNotification({
    manufacturer,
    retailer,
    eventName,
  });

  return new Response(JSON.stringify(notifications));
};

export const DELETE = async (req) => {
  const body = await req.json();
  const { id } = body;
  const notifications = await deleteNotification({ id });

  return new Response(JSON.stringify(notifications));
};

export const PUT = async (req) => {
  const body = await req.json();
  const { id } = body;
  const orders = await setShopFloor({ id });
  return new Response(JSON.stringify(orders));
};
