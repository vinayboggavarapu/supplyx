"use client";

import abi, { contractAddress } from "@/Abi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

export default function Home() {
  const address = useAccount();

  const { write: registerManufacturer, isSuccess: registeredManufacturer } =
    useContractWrite({
      address: contractAddress,
      abi: abi,
      functionName: "addManufacturer",
      args: [address.address],
    });

  const { write: registerRetailer, isSuccess: registeredRetailer } =
    useContractWrite({
      address: contractAddress,
      abi: abi,
      functionName: "addRetailer",
      args: [address.address],
    });

  const { data: isRetailer } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "isRetailer",
    args: [address.address],
  });

  const { data: isManufacturer } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "isManufacturer",
    args: [address.address],
  });

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden bg-black py-12 text-[#dff896]">
      <nav className="w-11/12 border-y-2 border-[#dff896] py-6 flex flex-col  lg:flex-row lg:justify-between  items-center text-center gap-6 ">
        <span>SupplyX</span>
        <ul className="gap-6 flex items-center flex-col lg:flex-row">
          {/* <Link href="/" className="cursor-pointer">
            Home
          </Link> */}
          <Link
            href="/manufacturers"
            className={`${
              !address.address || isManufacturer
                ? "opacity-100"
                : "opacity-50 text-white"
            }cursor-pointer`}
          >
            Manufacturers
          </Link>
          <Link
            href="/users"
            className={`${
              !isManufacturer && !isRetailer
                ? "opacity-100"
                : "opacity-50 text-white"
            }cursor-pointer`}
          >
            Customers
          </Link>
          <Link
            href="/retailers"
            className={`${
              !address.address || isRetailer
                ? "opacity-100"
                : "opacity-50 text-white"
            }cursor-pointer`}
          >
            Retailers
          </Link>
          <li
            className="cursor-pointer"
            onClick={() => {
              const registerElement = document.getElementById("register");
              registerElement.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Register
          </li>
          <ConnectButton showBalance={false} />
        </ul>
      </nav>
      <hero className="w-11/12 pt-12">
        <div className="lg:flex items-center lg:gap-6">
          <h1 className="text-[20dvw] lg:text-[9dvw] font-bold">SUPPLYX</h1>
          <p className="text-xl leading-8 text-center lg:text-left">
            Welcome to SupplyX, where manufacturers and customers come together
            in the world of Web3. Experience seamless onchain logistics and
            demand forecasting like never before.
          </p>
        </div>
      </hero>

      <div className="w-full pt-14 lg:pb-6 1 grayscale relative lg:flex lg:justify-end ">
        <div className="lg:z-0 lg:w-80 lg:absolute lg:h-44 lg:border lg:top-2 lg:rotate-45 lg:rounded-[100%] lg:border-gray-500	 lg:p-10"></div>
        <div className="lg:z-0 lg:w-80 lg:absolute lg:h-44 lg:border lg:top-2 lg:rotate-90 lg:rounded-[100%] lg:border-gray-500	 lg:p-10"></div>
        <Image
          src="/img1.png"
          alt="product warehouse"
          width={4000}
          height={0}
          className="h-1/4 overflow-clip bg-cover "
        />
      </div>
      <div className="w-11/12 lg:flex relative lg:flex-col lg:w-8/12 text-left lg:gap-10 lg:py-20 py-14">
        <h2 className="z-10 font-semibold text-[6dvw] lg:text-[3.2dvw] lg:font-bold lg:w-9/12 text-[#dff896] opacity-80 pb-3">
          Three Categories, One Platform
        </h2>
        <p className="z-10 text-slate-50 lg:w-4/6 lg:text-[1.5rem] lg:font-medium">
          SupplyX is designed specifically for Manufacturers and normal
          customers. It’s the ultimate platform for connecting businesses with
          their market, making supply chain more transparent and accurate.
        </p>
        <div className="lg:z-0 lg:w-[50rem] lg:self-end  lg:h-[25rem] lg:absolute lg:border lg:-right-48 lg:-top-20 lg:-rotate-45 lg:rounded-[100%] lg:border-zinc-700	 lg:p-10"></div>
      </div>
      <h2 id="register" className="w-[50%] text-center p-2 text-2xl">
        Get Started by Registering as any one
      </h2>
      <div className="relative w-9/12 p-20 flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:pb-64">
        <div
          onClick={() => registerManufacturer()}
          className="flex cursor-pointer flex-col items-center text-center gap-4"
        >
          <Image
            src="/team1.webp "
            width={80}
            height={50}
            className="rounded-full h-20 grayscale"
          />
          <h3 className="font-semibold text-2xl">Manufacturer</h3>
        </div>

        <Link
          href="/users"
          className="flex cursor-pointer flex-col items-center text-center gap-4"
        >
          <Image
            src="/team2.webp"
            width={80}
            height={50}
            className="rounded-full h-20 grayscale"
          />
          <h3 className="font-semibold text-2xl">Customer</h3>
        </Link>

        <div
          onClick={() => registerRetailer()}
          className="flex flex-col cursor-pointer items-center text-center gap-4"
        >
          <Image
            src="/team3.webp"
            width={80}
            height={50}
            className="rounded-full h-20 grayscale"
          />
          <h3 className="font-semibold text-2xl">Retailer</h3>
        </div>
      </div>

      <div className="relative w-11/12 lg:w-8/12 gap-5 grid lg:gap-[20px] lg:grid-rows-2 lg:grid-cols-3">
        <div className="z-10 card1 w-full bg-[#0d0d0d] px-5 py-4 rounded-2xl flex flex-col gap-3 lg:col-span-2">
          <h3 className="font-semibold text-2xl">Transparent</h3>
          <p className="text-slate-50">Live onchain logistics tracking</p>
          <Image
            src="/card1.webp"
            width={4000}
            height={100}
            quality={100}
            className="lg:mt-5 grayscale w-full h-52 object-cover rounded-xl self-center m-auto"
          />
        </div>
        <div className="z-10 card1 w-full bg-[#0d0d0d] px-5 py-4 rounded-2xl flex flex-col gap-3">
          <h3 className="font-semibold text-2xl">Transparent</h3>
          <p className="text-slate-50">Live onchain logistics tracking</p>
          <Image
            src="/card2.webp"
            width={4000}
            height={100}
            quality={100}
            className="lg:mt-5 grayscale w-full h-52 object-cover rounded-xl self-center m-auto"
          />
        </div>
        <div className="z-10 card1 w-full bg-[#0d0d0d] px-5 py-4 rounded-2xl flex flex-col gap-3">
          <h3 className="font-semibold text-2xl">Transparent</h3>
          <p className="text-slate-50">Live onchain logistics tracking</p>
          <Image
            src="/card3.webp"
            width={4000}
            height={100}
            quality={100}
            className="lg:mt-5 grayscale w-full h-52 object-cover rounded-xl self-center m-auto"
          />
        </div>
        <div className="z-10 card1 w-full bg-[#0d0d0d] px-5 py-4 rounded-2xl flex flex-col gap-3 lg:col-span-2">
          <h3 className="font-semibold text-2xl">Transparent</h3>
          <p className="text-slate-50">Live onchain logistics tracking</p>
          <Image
            src="/card4.webp"
            width={4000}
            height={100}
            quality={100}
            className="lg:mt-5 grayscale w-full h-52 object-cover rounded-xl self-center m-auto"
          />
        </div>
        <div className="lg:z-0 lg:w-[35rem] lg:self-start  lg:h-[15rem] lg:-left-32 lg:top-10 lg:absolute lg:border lg:rotate-45 lg:rounded-[100%] lg:border-zinc-700	 lg:p-10"></div>
        <div className="lg:z-0 lg:w-[40rem] lg:self-end lg:-right-64 lg:h-[20rem] lg:-bottom-[0.5rem] lg:absolute lg:border lg:rotate-[130deg] lg:rounded-[100%] lg:border-zinc-700	 lg:p-10"></div>
        <div className="lg:z-0 lg:w-[22rem] lg:absolute lg:h-52 lg:border lg:self-end lg:-left-48 lg:-bottom-40 lg:rotate-[30deg] lg:rounded-[100%] lg:border-zinc-700	 lg:p-10"></div>
        <div className="lg:z-0 lg:w-[22rem] lg:absolute lg:h-52 lg:border lg:self-end lg:-left-48 lg:-bottom-40 lg:rotate-[80deg] lg:rounded-[100%] lg:border-zinc-700	 lg:p-10"></div>
      </div>

      <div className=" w-11/12 lg:w-6/12 flex flex-col lg:items-center text-center my-20 gap-6 lg:pt-10">
        <h2 className="text-lg lg:text-3xl font-bold">
          Connecting Users - Manufacturers - Retailers
        </h2>
      </div>
      <div>
        <p className="text-slate-50 text-base font-light">
          © EtherNinjas, Web3Conf India
        </p>
      </div>
    </main>
  );
}
