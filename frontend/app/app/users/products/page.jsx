"use client";
import Layout from "@/components/pagelayout";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAccount } from "wagmi";

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

const Products = () => {
  const address = useAccount();
  const [product, setProduct] = useState({
    userName: "John",
    walletAddress: `${address.address}`,
    transactionId: "0xefgasdadasdasdat",
    orderId: "2",
    productName: "",
  });

  async function handleBuyNowClick() {
    if (address.isConnected) {
      try {
        const res = await fetch("/api/details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });
        const data = await res.json();
        console.log(data);
        route.push("/users");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please connect your wallet to continue");
    }
  }
  const route = useRouter();
  return (
    <Layout header={"Products"}>
      <div className="w-full flex gap-10">
        {bikes.map((bike, index) => (
          <div key={bike.name} className="w-1/3 h-fit bg-[#0D0D0D] rounded-2xl">
            <div className="w-[85%] m-auto flex flex-col my-4 gap-4">
              <p className="text-2xl text-[#dff896]">Kelvua</p>
              <p className="font-light">{bike.name}</p>
              <Image
                src={bike.image}
                width={400}
                className="w-[25rem] h-48 my-2"
                height={400}
              />
              <hr className="my-1" />
              <ul className="gap-4 mt-1 flex flex-col">
                <li>Engine: {bike.specs.engine}</li>
                <li>Top Speed: {bike.specs.topSpeed}</li>
                <li>Weight: {bike.specs.weight}</li>
                <li>Fuel capacity: {bike.specs.fuelCapacity}</li>
                <li>Tire type: {bike.specs.tireType}</li>
              </ul>
              <button
                onClick={() => {
                  setProduct({ ...product, productName: bike.name });
                  handleBuyNowClick();
                }}
                // href={`/users/products/${bike.name
                //   .toLowerCase()
                //   .split(" ")
                //   .join("-")}`}
                // onClick={(e) => {
                //   e.preventDefault();
                //   route.push(
                //     "/users/products/" +
                //       bike.name.toLowerCase().split(" ").join("-")
                //   );
                // }}
                className="p-4 bg-[#dff896] my-4 text-black rounded-xl text-center hover:cursor-pointer"
              >
                Buy This
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Products;
