"use client";
import Layout from "@/components/pagelayout";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const bikes = [
  {
    name: "Ralley Y2",
    image: "/ralleyY2.png",
    specs: {
      engine: "500cc",
      topSpeed: "120mph",
      weight: "150kg",
      fuelCapacity: "20 liters",
      tireType: "Off-road",
    },
  },
  {
    name: "Ralley Sport",
    image: "/ralley.png",
    specs: {
      engine: "600cc",
      topSpeed: "140mph",
      weight: "170kg",
      fuelCapacity: "22 liters",
      tireType: "Sport",
    },
  },
  {
    name: "Monster",
    image: "/monster.png",
    specs: {
      engine: "1000cc",
      topSpeed: "180mph",
      weight: "200kg",
      fuelCapacity: "25 liters",
      tireType: "Street",
    },
  },
];

const Products = ({ params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams}`;
  console.log(url);
  return (
    <Layout header={"Products"}>
      <div className="w-full flex text-white gap-10">{params.slug}</div>
    </Layout>
  );
};

export default Products;
