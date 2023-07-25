"use client";
import Layout from "@/components/pagelayout";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import React, { useContext, useEffect, useState } from "react";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import abi, { contractAddress } from "@/Abi";
import { watchContractEvent } from "@wagmi/core";
import StateContext from "@/context/states";

export const revalidate = 0;

const Page = () => {
  const [preorders, setPreorders] = useState([]);

  const [shopFloorOrders, setShopFloorOrders] = useState([]);

  const [priorityOrders, setPriorityOrders] = useState([]);

  const [retailers, setRetailers] = useState("Select retailer");

  const { notification, setNotification } = useContext(StateContext);

  const address = useAccount();

  const userAddress = address.address;

  const { data: isManufacturer } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "isManufacturer",
    args: [userAddress],
  });

  const { data: getRetailers } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getRetailers",
    overrides: { from: userAddress },
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [orderToRetailer, setOrderToRetailer] = useState({
    preOrderId: "",
    retailerAddress: "",
    preOrderUserAddress: "",
  });

  const [selectedRetailer, setSelectedRetailer] = useState("");

  const { write: orderRawMaterial, isSuccess } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "addPreOrderCountForRetailer",
    args: [
      orderToRetailer.preOrderId,
      orderToRetailer.retailerAddress,
      orderToRetailer.preOrderUserAddress,
    ],
    overrides: { from: userAddress },
  });

  useEffect(() => {
    const Orders = async () => {
      const response = await axios.get("/api/get-all-orders");
      setPreorders(response.data);
    };
    Orders();
  }, [isSuccess]);

  useEffect(() => {
    const shopFloorOrders = async () => {
      const response = await axios.get("/api/get-shopfloor-orders");
      setShopFloorOrders(response.data);
    };
    shopFloorOrders();
  }, [isSuccess]);

  useEffect(() => {
    const priorityOrders = async () => {
      const response = await axios.get("/api/get-priority-orders");
      setPriorityOrders(response.data);
    };
    priorityOrders();
  }, [isSuccess]);

  useEffect(() => {
    const getNotitications = async () => {
      const response = await axios.get(`/api/manufacturer?user=${userAddress}`);
      setNotification(response.data);
    };
    getNotitications();
  }, [isSuccess]);

  const handleGetRawMaterial = async () => {
    console.log(orderToRetailer);
    orderRawMaterial();
  };

  return (
    isClient && (
      <Layout header={"Manufacturer"}>
        {isManufacturer ? (
          <div className="p-7">
            <Tabs defaultValue="regular">
              <div className="flex justify-between">
                <TabsList className="grid w-1/4 grid-cols-3 border-b ">
                  <TabsTrigger
                    value="regular"
                    className="tabs-active-style tabs-inactive-style rounded-md"
                  >
                    Regular
                  </TabsTrigger>
                  <TabsTrigger
                    className="tabs-active-style tabs-inactive-style"
                    value="priority"
                  >
                    High Priority
                  </TabsTrigger>
                  <TabsTrigger
                    className="tabs-active-style tabs-inactive-style"
                    value="shopfloor"
                  >
                    Shopfloor
                  </TabsTrigger>
                </TabsList>
                {/* <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="border-none rounded-[10px] focus:border-none outline-none bg-[#D9D9D9] text-black px-4">
                      Product Category
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 rounded-[10px] bg-black">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="dropdown-items-style">
                        Ralley
                      </DropdownMenuItem>
                      <DropdownMenuItem className="dropdown-items-style">
                        Ralley Y2
                      </DropdownMenuItem>
                      <DropdownMenuItem className="dropdown-items-style">
                        Monster
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu> */}
              </div>
              <TabsContent value="regular">
                <div className="flex items-center justify-between h-[9.3rem]">
                  <h2 className="mt-7 mb-7">Orders from the users</h2>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button>{retailers}</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[100%] text-sm bg-white text-black">
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={retailers}
                        onValueChange={(value) => {
                          setRetailers(value);
                          setSelectedRetailer(value);
                          console.log(selectedRetailer);
                          // setManufacturer(value);
                          // setDropDownLabel("Selected Manufacturer");
                          // setSelectedManufacturer(value);
                        }}
                      >
                        {getRetailers?.map((data) => (
                          <DropdownMenuRadioItem key={data} value={data}>
                            {data}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="text-[#E5F9B4] text-[1.1rem]">
                      <TableHead>User</TableHead>
                      <TableHead>Address</TableHead>
                      {/* <TableHead>tx</TableHead> */}
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">orderId</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {preorders.map((preorder, index) => (
                      <TableRow key={index} className="border-b-gray-500">
                        <TableCell className="font-medium">
                          {preorder.name}
                        </TableCell>
                        <TableCell>{preorder.address}</TableCell>
                        {/* <TableCell>{preorder.transactionId}</TableCell> */}
                        <TableCell>{preorder.productName}</TableCell>
                        <TableCell className="text-right">
                          {preorder.id}
                        </TableCell>
                        <TableCell className="text-right">Pending</TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() => {
                              setOrderToRetailer({
                                preOrderId: preorder.id,
                                retailerAddress: selectedRetailer,
                                preOrderUserAddress: preorder.address,
                              });
                              console.log(orderToRetailer);
                              handleGetRawMaterial();
                            }}
                            className="bg-[#E5F9B4] text-black font-semibold p-2 rounded-full"
                          >
                            Get Material
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="priority">
                <div className="flex items-center justify-between h-[9.3rem]">
                  <h2 className="mt-7 mb-7">Orders from the users</h2>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button>{retailers}</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[100%] text-sm bg-white text-black">
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={retailers}
                        onValueChange={(value) => {
                          setRetailers(value);
                          setSelectedRetailer(value);
                          console.log(selectedRetailer);
                          // setManufacturer(value);
                          // setDropDownLabel("Selected Manufacturer");
                          // setSelectedManufacturer(value);
                        }}
                      >
                        {getRetailers?.map((data) => (
                          <DropdownMenuRadioItem key={data} value={data}>
                            {data}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="text-[#E5F9B4] text-[1.1rem]">
                      <TableHead>User</TableHead>
                      <TableHead>Address</TableHead>
                      {/* <TableHead>tx</TableHead> */}
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">orderId</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {priorityOrders.map((preorder, index) => (
                      <TableRow key={index} className="border-b-gray-500">
                        <TableCell className="font-medium">
                          {preorder.name}
                        </TableCell>
                        <TableCell>{preorder.address}</TableCell>
                        {/* <TableCell>{preorder.transactionId}</TableCell> */}
                        <TableCell>{preorder.productName}</TableCell>
                        <TableCell className="text-right">
                          {preorder.id}
                        </TableCell>
                        <TableCell className="text-right">Pending</TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() => {
                              setOrderToRetailer({
                                preOrderId: preorder.id,
                                retailerAddress: selectedRetailer,
                                preOrderUserAddress: preorder.address,
                              });
                              console.log(orderToRetailer);
                              handleGetRawMaterial();
                            }}
                            className="bg-[#E5F9B4] text-black font-semibold p-2 rounded-full"
                          >
                            Get Material
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="shopfloor">
                <div className="flex items-center justify-between h-[9.3rem]">
                  <h2 className="mt-7 mb-7">Orders from the users</h2>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button>{retailers}</button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[100%] text-sm bg-white text-black">
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={retailers}
                        onValueChange={(value) => {
                          setRetailers(value);
                          setSelectedRetailer(value);
                          console.log(selectedRetailer);
                          // setManufacturer(value);
                          // setDropDownLabel("Selected Manufacturer");
                          // setSelectedManufacturer(value);
                        }}
                      >
                        {shopFloorOrders?.map((data) => (
                          <DropdownMenuRadioItem key={data} value={data}>
                            {data}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow className="text-[#E5F9B4] text-[1.1rem]">
                      <TableHead>User</TableHead>
                      <TableHead>Address</TableHead>
                      {/* <TableHead>tx</TableHead> */}
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">orderId</TableHead>
                      {/* <TableHead className="text-right">Status</TableHead>
                      <TableHead className="text-right">Action</TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shopFloorOrders.map((preorder, index) => (
                      <TableRow key={index} className="border-b-gray-500">
                        <TableCell className="font-medium">
                          {preorder.name}
                        </TableCell>
                        <TableCell>{preorder.address}</TableCell>
                        {/* <TableCell>{preorder.transactionId}</TableCell> */}
                        <TableCell>{preorder.productName}</TableCell>
                        <TableCell className="text-right">
                          {preorder.id}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl">All orders from users can be seen here</h2>
            <p className="text-[#E5F9B4] text-xl">
              You are not a registered manufacturer
            </p>
          </div>
        )}
      </Layout>
    )
  );
};

export default Page;
