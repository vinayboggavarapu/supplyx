"use client";

import Layout from "@/components/pagelayout";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import abi, { contractAddress } from "@/Abi";

export const metadata = {
  title: "Users",
  description: "SupplyX users page",
};

const Page = () => {
  const router = useRouter();
  console.log(router);

  const address = useAccount();

  const userAddress = address.address;

  const [userProduct, setProduct] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleProrityChange = async () => {
    const editReponse = await fetch(`/api/edit-priority?id=${userProduct.id}`);
    const edit = await editReponse.json();
  };

  useEffect(() => {
    const userProduct = async () => {
      const order = await fetch(`/api/user-order?address=${address.address}`);
      const orders = await order.json();
      orders ? setProduct(orders[0]) : "";
      console.log(orders);
    };
    userProduct();
  }, [userAddress]);

  const { data: orderStatus } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "userOrders",
    args: [userAddress, 0],
    overrides: { from: userAddress },
  });

  const contractRead = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "manufacturers",
    overrides: { from: userAddress },
  });

  const { write: highPriority, isSuccess } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "updateOrderPriority",
    args: [userProduct?.manufacturer, 0],
    value: 0.002 * 1e18,
    overrides: { from: userAddress },
  });

  //   struct Order {
  //     uint256 quantity;
  //     uint256 escrowBalance;
  //     address manufacturer;
  //     bool manufacturerConfirmed;
  //     bool orderCompleted;
  //     bool highPriority;
  // }

  // Reference struct in the contract
  console.log(orderStatus);

  useEffect(() => {
    if (isSuccess) {
      handleProrityChange();
    }
  }, [isSuccess]);

  return (
    isClient && (
      <Layout header={"User"}>
        <div className="flex flex-col xl:flex-row w-full justify-between flex-grow">
          {userAddress ? (
            userProduct ? (
              <div>
                <div className="flex gap-10 lg:gap-16 flex-col">
                  <div className="flex h-fit flex-col lg:flex-row gap-2 lg:gap-0 lg:max-w-[62rem] w-full px-10 py-10 rounded-[2.5rem] justify-between bg-[#181818]">
                    <div className="flex flex-col">
                      <h2 className="text-[1.2rem] font-[400]">Preorders :</h2>
                      <div className="flex min-w-[20rem] flex-col flex-grow mt-7 px-5 gap-2">
                        <p>{userProduct?.productName}</p>
                        <p>Track Status : {userProduct?.transactionId}</p>
                        {!userProduct.isPriority ? (
                          <button
                            onClick={() => {
                              highPriority();
                            }}
                            className="border-b w-fit mt-4"
                          >
                            Request for faster delivery
                          </button>
                        ) : (
                          <p>Fastest Delivery</p>
                        )}
                      </div>
                    </div>
                    <Image
                      src="/ralley.png"
                      width={400}
                      className="w-[100%] h-[100%] lg:w-[30rem] lg:h-80"
                      height={400}
                    />
                  </div>
                  {orderStatus && (
                    <div className=" flex flex-col gap-6 flex-grow h-full">
                      <h2 className="text-[1.2rem]">Your Order Status</h2>
                      <div className="flex items-center">
                        <div className="border w-10 h-10 bg-[#E5F9B4] rounded-full"></div>
                        <hr
                          className={`${
                            orderStatus[3]
                              ? "border-[#E5F9B4]"
                              : "border-white/[0.5]"
                          } border w-[43%]`}
                        />
                        <div
                          className={`${
                            orderStatus[3]
                              ? "bg-[#E5F9B4] border-green-50"
                              : "border-white"
                          } border w-10 h-10 rounded-full`}
                        ></div>
                        <hr className="border-white/[0.5] border w-[43%]" />
                        <div className="border w-10 h-10 rounded-full"></div>
                      </div>

                      <div className="flex w-full justify-between">
                        <p className="w-20 text-[1.1rem]">
                          Processed the order
                        </p>
                        <p
                          className={`w-20 text-[1.1rem] ${
                            orderStatus[3] ? "text-white" : "text-white/[0.2]"
                          }`}
                        >
                          order at the shop floor
                        </p>
                        <p className="w-20 text-[1.1rem] text-white/[0.2]">
                          Full payment and delivery
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-grow flex flex-col gap-4 h-full">
                <p className="text-lg font-semibold">No preorders found</p>
                <Image
                  src="/supplybg.png"
                  width={1000}
                  height={1000}
                  className="w-[90%] max-h-[42rem] object-cover opacity-60"
                />
              </div>
            )
          ) : (
            <div className="flex-grow flex flex-col gap-4 h-full">
              <p className="text-lg font-semibold">Connect you wallet</p>
              <Image
                src="/supplybg.png"
                width={1000}
                height={1000}
                className="w-[90%] max-h-[42rem] object-cover opacity-60"
              />
            </div>
          )}
          <div className="flex-grow px-8 py-6 rounded-[2.5rem] max-w-md gap-5 bg-[#181818]">
            {" "}
            <h2 className="text-[20px]">Trending Products :</h2>
            <div className="flex flex-col justify-between h-[95%]">
              <table className="trending-table">
                <thead>
                  <tr>
                    <td>Product</td>
                    <td>Active Preorder Count</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kelvua Ralley</td>
                    <td>300</td>
                  </tr>
                  <tr>
                    <td>Kelvua Ralley Y2</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td>Kelvua monster</td>
                    <td>600</td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={() => router.push("/users/products")}
                className="w-full bg-[#e5f4bfe2] p-2 font-[500] text-black rounded-[41px]"
              >
                View Products
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  );
};

export default Page;
