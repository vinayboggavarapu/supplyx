// pages/api/createPost.js

import { NextRequest } from "next/server";
import { createProduct, getOrders } from "@/prisma";

export async function POST(req, res) {
  // Check the request method

  const body = await req.json();

  const { userName, walletAddress, transactionId, orderId, productName } = body;

  //   if (!userName || !authorEmail || !postTitle || !postBody || !postSlug) {
  //     return new Response(400).json({ error: "Missing information" });
  //   }

  try {
    const newPost = await createProduct({
      userName,
      walletAddress,
      transactionId,
      orderId,
      productName,
    });
    return new Response(JSON.stringify(newPost));
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
    //   res.status(500).json({ message: "Failed to create post.", error });
  }
}

export const GET = async () => {
  const orders = await getOrders();
  return new Response(JSON.stringify(orders));
};
