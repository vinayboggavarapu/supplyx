import Layout from "@/components/pagelayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

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
  return (
    <Layout header={"Retailer"}>
      <p>Orders from the Manufacturer</p>
      <Table>
        <TableHeader>
          <TableRow className="text-[#E5F9B4] text-[1.1rem]">
            <TableHead>Manufacturer</TableHead>
            <TableHead>Tx</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={index} className="border-b-gray-500">
              <TableCell className="font-medium">
                {order.manufacturer}
              </TableCell>
              <TableCell>{order.tx}</TableCell>
              <TableCell>{order.order}</TableCell>
              <TableCell className="text-right">
                <button className="bg-[#E5F9B4] text-black py-1 px-2 rounded-full">
                  Mark Complete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
};

export default Page;
