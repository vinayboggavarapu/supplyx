const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const createProduct = async ({
  userName,
  walletAddress,
  transactionId,
  orderId,
  productName,
}) => {
  const product = await prisma.orders.create({
    data: {
      name: userName,
      address: walletAddress,
      transactionId: transactionId,
      orderId: orderId,
      productName: productName,
    },
  });
  return product;
};

export const getOrders = async () => {
  const orders = await prisma.orders.findMany();
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
