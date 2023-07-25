const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const createProduct = async ({
  userName,
  walletAddress,
  transactionId,
  orderId,
  productName,
  manufacturer,
}) => {
  const product = await prisma.orders.create({
    data: {
      name: userName,
      address: walletAddress,
      transactionId: transactionId,
      orderId: orderId,
      productName: productName,
      manufacturer: manufacturer,
    },
  });
  return product;
};

export const getOrders = async () => {
  const orders = await prisma.orders.findMany({
    where: {
      isShopfloor: false,
      isPriority: false,
    },
  });
  return orders;
};

export const getPriorityOrders = async () => {
  const orders = await prisma.orders.findMany({
    where: {
      isShopfloor: false,
      isPriority: true,
    },
  });
  return orders;
};

export const getShopFloorOrders = async () => {
  const orders = await prisma.orders.findMany({
    where: {
      isShopfloor: true,
    },
  });
  return orders;
};

export const getUserProductOrder = async ({ address }) => {
  const order = await prisma.orders.findMany({
    where: {
      address: address,
    },
  });
  return order;
};

export const getProductGroup = async () => {
  const Monster = await prisma.orders.findMany({
    where: {
      productName: "Monster",
    },
  });
  const Sport = await prisma.orders.findMany({
    where: {
      productName: "Ralley Sport",
    },
  });
  const Ralley = await prisma.orders.findMany({
    where: {
      productName: "Ralley Y2",
    },
  });

  return [Monster, Ralley, Sport];
};

export const editPriority = async ({ id }) => {
  const editResponse = await prisma.orders.update({
    where: {
      id: id,
    },
    data: {
      isPriority: true,
    },
  });

  return editResponse;
};

export const getNotifications = async ({ user }) => {
  const nofification = await prisma.notifications.findMany({
    where: {
      manufacturer: user,
    },
  });
  return nofification;
};

export const createNotification = async ({
  manufacturer,
  retailer,
  eventName,
  orderId,
}) => {
  const notification = await prisma.notifications.create({
    data: {
      manufacturer: manufacturer,
      retailer: retailer,
      eventName: eventName,
    },
  });
  return notification;
};

export const deleteNotification = async ({ id }) => {
  const deleteResponse = await prisma.notifications.delete({
    where: {
      id: id,
    },
  });
  return deleteResponse;
};

export const setShopFloor = async ({ id }) => {
  const shopFloor = await prisma.orders.update({
    where: {
      id: id,
    },
    data: {
      isShopfloor: true,
    },
  });
  return shopFloor;
};
