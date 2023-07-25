"use client";
import Layout from "@/components/pagelayout";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

// import { Button } from "@/components/ui/button";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
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
import abi, { contractAddress } from "@/Abi";

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
  const userAddress = address.address;

  const { data: manufacturers } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getmanufacturers",
    overrides: { from: userAddress },
  });

  const [selectedManufacturer, setSelectedManufacturer] = useState("");

  const [dropDownLabel, setDropDownLabel] = useState("Select Manufacturer");

  const [product, setProduct] = useState({
    userName: "John",
    walletAddress: `${address.address}`,
    transactionId: "",
    orderId: "",
    productName: "",
    manufacturer: "",
  });

  const [manufacturer, setManufacturer] = useState("");

  useEffect(() => {
    setProduct({ ...product, manufacturer: selectedManufacturer });
  }, [selectedManufacturer]);

  const {
    data: trasactionData,
    write: preOrder,
    error: preOrderError,
    isSuccess,
  } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "preOrder",
    args: [manufacturer, 1],
    value: 0.005 * 1e18,
    overrides: { from: userAddress },
  });

  useEffect(() => {
    setTimeout(() => {
      if (preOrderError) {
        alert(preOrderError.message);
      }
    }, 1000);
  }, [preOrderError]);

  async function handleBuyNowClick() {
    if (address.isConnected) {
      try {
        const res = await preOrder();
        console.log(res);
        if (isSuccess) {
        }
      } catch (error) {
        console.error(error); // handle the error from the preOrder() function
      }
    } else {
      alert("Please connect your wallet to continue");
    }
  }
  const route = useRouter();

  useEffect(() => {
    const postProduct = async () => {
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
    };
    if (isSuccess) {
      setProduct({ ...product, transactionId: trasactionData });
      postProduct();
    }
  }, [isSuccess]);

  return (
    <Layout header={"Products"}>
      <div className="flex flex-col gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>{dropDownLabel}</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[100%] bg-white text-black">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedManufacturer}
              onValueChange={(value) => {
                setManufacturer(value);
                setDropDownLabel("Selected Manufacturer");
                setSelectedManufacturer(value);
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
        <div className="w-full flex flex-col xl:flex-row gap-10">
          {bikes.map((bike, index) => (
            <div
              key={bike.name}
              className="xl:w-1/3 h-fit bg-[#0D0D0D] rounded-2xl"
            >
              <div className="w-[85%] m-auto flex flex-col my-4 gap-4">
                <p className="text-2xl text-[#dff896]">Kelvua</p>
                <p className="font-light">{bike.name}</p>
                <Image
                  src={bike.image}
                  width={400}
                  className="w-full h-full xl:w-[25rem] xl:h-48 my-2"
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
      </div>
    </Layout>
  );
};

export default Products;
