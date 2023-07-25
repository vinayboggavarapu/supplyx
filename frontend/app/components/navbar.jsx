"use client";
import abi, { contractAddress } from "@/Abi";
import StateContext from "@/context/states";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { watchContractEvent } from "@wagmi/core";

const Navbar = ({ header }) => {
  const { notification } = useContext(StateContext);

  const address = useAccount();

  const userAddress = address.address;

  const [retailer, setRetailer] = useState("");

  const [notificationId, setNotificationId] = useState("");

  const [productId, setProductId] = useState("");

  const { write: handleConfirmShipment, isSuccess } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "confirmOrderManufacturer",
    args: [retailer],
    overrides: { from: userAddress },
  });

  const unwatch = watchContractEvent(
    {
      address: contractAddress,
      abi: abi,
      eventName: "PreOrderConfirmed",
    },
    (log) => {
      const logData = log[0];
      setProductId(logData.args.preOrderId);
    }
  );

  useEffect(() => {
    if (isSuccess && notificationId !== "") {
      const deleteNotification = async () => {
        const response = await fetch("/api/manufacturer", {
          method: "DELETE",
          body: JSON.stringify({
            id: notificationId,
          }),
        });
        const data = await response.json();
      };
      deleteNotification();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (productId !== "") {
      const setShopFloor = async () => {
        const response = await fetch("/api/manufacturer", {
          method: "PUT",
          body: JSON.stringify({
            id: productId,
          }),
        });
        const data = await response.json();
      };
      setShopFloor();
    }
  }, [productId]);

  const [notificationExpand, setNotificationExpand] = useState(false);

  return (
    <div className="relative flex justify-between py-4  border-style">
      <p className="text-[1.3rem]">Welcome {header}</p>
      <div className="hidden md:flex items-center gap-14 text-[1rem]">
        <Link href="/">Home</Link>
        <div
          onClick={() => setNotificationExpand(!notificationExpand)}
          className={`${
            notification.length > 0 ? "text-[#E5F9B4]" : "text-white"
          } cursor-pointer`}
        >
          Notifications
        </div>

        {notificationExpand && (
          <div className="absolute top-20 right-0 z-30">
            {notification.length > 0 && (
              <div className="flex flex-col gap-2 bg-black">
                {notification.map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-black border p-1 border-white"
                  >
                    <div className="text-sm flex gap-3">
                      <div className="flex flex-col gap-2">
                        <h2> Your Address : {notification.manufacturer}</h2>
                        <h2 className="text-[#E5F9B4]">
                          {" "}
                          {notification.eventName}
                        </h2>
                        <h2> Retailer address : {notification.retailer}</h2>
                      </div>
                      <button
                        onClick={() => {
                          setRetailer(notification.retailer);
                          setNotificationId(notification.id);
                          handleConfirmShipment();
                        }}
                        className="bg-[#E5F9B4] text-black p-1"
                      >
                        Confirm shipment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <ConnectButton showBalance={false} />
      </div>
    </div>
  );
};

export default Navbar;
