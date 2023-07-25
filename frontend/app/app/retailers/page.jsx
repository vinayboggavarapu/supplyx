"use client";
import abi, { contractAddress } from "@/Abi";
import Layout from "@/components/pagelayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { watchContractEvent } from "@wagmi/core";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

const orders = [
  {
    manufacturer: "UserVintu",
    tx: "0xxxcvvvvvvfff",
    order: "KVSP123",
  },
  {
    manufacturer: "UserVintu",
    tx: "0xxxcvvvvvvfff",
    order: "KVSP123",
  },
  {
    manufacturer: "UserVintu",
    tx: "0xxxcvvvvvvfff",
    order: "KVSP123",
  },

  {
    manufacturer: "UserVintu",
    tx: "0xxxcvvvvvvfff",
    order: "KVSP123",
  },
];

const Page = () => {
  const address = useAccount();

  const userAddress = address.address;

  const [notification, setNotification] = useState({
    manufacturer: "",
    retailer: "",
    eventName: "",
  });

  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const { data: manufacturers } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getmanufacturers",
    overrides: { from: userAddress },
  });

  const { data: isRetailer } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "isRetailer",
    args: [userAddress],
  });

  const unwatch = watchContractEvent(
    {
      address: contractAddress,
      abi: abi,
      eventName: "OrderConfirmedByRetailer",
    },
    (log) => {
      const logData = log[0];
      setNotification({
        manufacturer: logData.args.manufacturer,
        retailer: logData.args.retailer,
        eventName: logData.eventName,
      });
    }
  );

  useEffect(() => {
    const isNotificated = Object.keys(notification).every(
      (k) => !!notification[k]
    );

    const postNofitications = async () => {
      const response = await fetch("/api/manufacturer", {
        method: "POST",
        body: JSON.stringify({
          manufacturer: notification.manufacturer,
          retailer: notification.retailer,
          eventName: notification.eventName,
        }),
      });
      const data = await response.json();
    };

    if (isNotificated) {
      postNofitications();
    }
  }, [notification]);

  const { data: hasOrders } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "manufacturerSet",
    args: [selectedManufacturer, userAddress],
  });

  const { write: handleRawMaterialShipment } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "confirmPreOrderRetailer",
    args: [selectedManufacturer],
    overrides: { from: userAddress },
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <Layout header={"Retailer"}>
        <p>Orders from the Manufacturer can be seen here</p>
        {isRetailer ? (
          <div className="flex flex-col gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>Select Manufacturer</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[100%] text-sm bg-white text-black">
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={manufacturers}
                  onValueChange={(value) => {
                    setSelectedManufacturer(value);
                    // setSelectedRetailer(value);
                    // console.log(selectedRetailer);
                    // setManufacturer(value);
                    // setDropDownLabel("Selected Manufacturer");
                    // setSelectedManufacturer(value);
                  }}
                >
                  {manufacturers?.map((data) => (
                    <DropdownMenuRadioItem key={data} value={data}>
                      {data}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {hasOrders ? (
              <div className="flex items-center justify-between p-5 bg-[#181818]">
                <h2>
                  Ship Order for this{" "}
                  <span className="text-[#E5F9B4]">{selectedManufacturer}</span>
                </h2>
                <button
                  onClick={handleRawMaterialShipment}
                  className="bg-[#E5F9B4] p-2 text-black rounded-full"
                >
                  Confirm Shipment
                </button>
              </div>
            ) : (
              <p>No orders found</p>
            )}
          </div>
        ) : (
          <>
            <div>
              <p className="text-[#E5F9B4] text-xl">
                You are not a registered retailer
              </p>
            </div>
          </>
        )}
      </Layout>
    )
  );
};

export default Page;
