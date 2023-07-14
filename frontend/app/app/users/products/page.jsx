import Layout from "@/components/pagelayout";
import React from 'react'
import Image from "next/image";


const Products = () => {
  return (
    <Layout header={"Products"}>
       <div className="w-full flex gap-10">
       
        <div className="w-1/3 h-fit bg-[#0D0D0D] rounded-2xl">
          <div className="w-[85%] m-auto flex flex-col my-4 gap-4">
            <p className="text-2xl text-[#dff896]">Kelvua</p>
            <p className="font-light">Ralley Y2</p>
            <Image
              src="/ralleyY2.png"
              width={400}
              className="w-[25rem] h-48 my-2"
              height={400}
            />
            <hr className="my-1"/>
            <ul className="gap-4 mt-1 flex flex-col">
              <li className="">Kelvua Ralley Y2 is a fictional planet located in the Andromeda galaxy.</li>
              <li className="">It is known for its vibrant and diverse ecosystem, consisting of lush forests, vast oceans, and towering mountains.</li>
            </ul>
            <div className="p-4 bg-[#dff896] my-4 text-black rounded-xl text-center">Buy This</div>
          </div>
        </div>
        <div className="w-1/3 h-fit bg-[#0D0D0D] rounded-2xl">
          <div className="w-[85%] m-auto flex flex-col my-4 gap-4">
            <p className="text-2xl text-[#dff896]">Kelvua</p>
            <p className="font-light">Ralley Sport</p>
            <Image
              src="/ralley.png"
              width={400}
              className="w-[25rem] h-48 my-2"
              height={400}
            />
            <hr className="my-1"/>
            <ul className="gap-4 mt-1 flex flex-col">
              <li className="">Kelvua is a fictional planet located in the Andromeda galaxy.</li>
              <li className="line-clamp-3">The inhabitants of Kelvua, called Kelvians, are an advanced civilization known for their technological innovations and harmonious coexistence with nature.</li>
            </ul>
            <div className="p-4 bg-[#dff896] my-4 text-black rounded-xl text-center">Buy This</div>
          </div>
        </div>
        <div className="w-1/3 h-fit bg-[#0D0D0D] rounded-2xl">
          <div className="w-[85%] m-auto flex justify-between flex-col my-4 gap-4">
            <p className="text-2xl text-[#dff896]">Kelvua</p>
            <p className="font-light">Monster</p>
            <Image
              src="/monster.png"
              width={400}
              className="w-[25rem] h-48 my-2"
              height={400}
            />
            <hr className="my-1"/>
            <ul className="gap-4 mt-1 flex flex-col">
              <li className="">Kelvua Monster is a fictional planet located in the Andromeda galaxy.</li>
              <li className="line-clamp-3">It is known for its vibrant and diverse ecosystem, consisting of lush forests, vast oceans, and towering mountains.</li>
            </ul>
            <div className="p-4 bg-[#dff896] my-4 text-black  rounded-xl text-center">Buy This</div>
          </div>
        </div>
       </div>
    </Layout>
  )
}

export default Products
