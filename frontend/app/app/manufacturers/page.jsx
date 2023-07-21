"use client";
import Layout from "@/components/pagelayout";
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
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// const preorders = [
//   {
//     name: "UserVintu",
//     address: "0x123456789",
//     tx: "0xxxcvvvvvvfff",
//     orderid: "KVSP123",
//   },
//   {
//     name: "UserVintu",
//     address: "0x123456789",
//     tx: "0xxxcvvvvvvfff",
//     orderid: "KVSP123",
//   },
//   {
//     name: "UserVintu",
//     address: "0x123456789",
//     tx: "0xxxcvvvvvvfff",
//     orderid: "KVSP123",
//   },
//   {
//     name: "UserVintu",
//     address: "0x123456789",
//     tx: "0xxxcvvvvvvfff",
//     orderid: "KVSP123",
//   },
//   {
//     name: "UserVintu",
//     address: "0x123456789",
//     tx: "0xxxcvvvvvvfff",
//     orderid: "KVSP123",
//   },
//   {
//     name: "UserVintu",
//     address: "0x123456789",
//     tx: "0xxxcvvvvvvfff",
//     orderid: "KVSP123",
//   },
// ];

const Page = () => {
  const [preorders, setPreorders] = useState([]);
  const countDownTimeInMinutes = 2;
  const [time, setTime] = useState(
    Date.now() + countDownTimeInMinutes * 60 * 1000
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((previousTime) => previousTime - 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const ordersData = await fetch("/api/details");
      const orders = await ordersData.json();
      setPreorders(orders);
    };
    getData();
  }, []);

  const minutes = Math.max(Math.floor((time - Date.now()) / (1000 * 60)), 0);
  const seconds = Math.max(Math.floor((time - Date.now()) / 1000) % 60, 0);

  return (
    <Layout header={"Manufacturer"}>
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
                value="progress"
              >
                Shopfloor
              </TabsTrigger>
            </TabsList>
            <DropdownMenu>
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
            </DropdownMenu>
          </div>
          <TabsContent value="regular">
            <div className="flex items-center justify-between h-[9.3rem]">
              <h2 className="mt-7 mb-7">Orders from the users</h2>

              <Accordion type="single" collapsible className="w-2/5">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Timer left</AccordionTrigger>
                  <AccordionContent>
                    <h2 className="mt-7 mb-7">
                      <span className="text-[#f9f4b4]">
                        Timer to trigger bulk order :
                      </span>{" "}
                      {minutes} minute {seconds} seconds
                    </h2>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="text-[#E5F9B4] text-[1.1rem]">
                  <TableHead>User</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>tx</TableHead>
                  <TableHead className="text-right">orderId</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {preorders.map((preorder, index) => (
                  <TableRow key={index} className="border-b-gray-500">
                    <TableCell className="font-medium">
                      {preorder.name}
                    </TableCell>
                    <TableCell>{preorder.address}</TableCell>
                    <TableCell>{preorder.transactionId}</TableCell>
                    <TableCell className="text-right">
                      {preorder.orderId}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="priority">
            <h2 className="mt-7 mb-7">High Priority Orders</h2>
            <Table>
              <TableHeader>
                <TableRow className="text-[#E5F9B4] text-[1.1rem]">
                  <TableHead>User</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>tx</TableHead>
                  <TableHead className="text-right">orderId</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {preorders.map((preorder, index) => (
                  <TableRow key={index} className="border-b-gray-500">
                    <TableCell className="font-medium">
                      {preorder.name}
                    </TableCell>
                    <TableCell>{preorder.tx}</TableCell>
                    <TableCell>{preorder.orderid}</TableCell>
                    <TableCell className="text-right">
                      {preorder.address}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Page;
