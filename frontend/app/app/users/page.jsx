import Layout from "@/components/pagelayout";
import Navbar from "@/components/navbar";
import Image from "next/image";

export const metadata = {
  title: "Users",
  description: "SupplyX users page",
};

const Page = () => {
  return (
    <Layout header={"User"}>
      <div className="flex w-full justify-between flex-grow">
        <div className="flex gap-16 flex-col">
          <div className="flex h-fit max-w-[62rem] w-full px-10 py-10 rounded-[2.5rem] justify-between bg-[#181818]">
            <div className="flex flex-col">
              <h2 className="text-[1.2rem] font-[400]">Preorders :</h2>
              <div className="flex flex-col flex-grow mt-7 px-5 gap-2">
                <p>Kelvua Ralley Sport</p>
                <p>Track Status : 0x2555666659988888</p>
                <p className="border-b w-fit mt-4">
                  Request for faster delivery
                </p>
              </div>
            </div>
            <Image
              src="/ralley.png"
              width={400}
              className="w-[30rem] h-80"
              height={400}
            />
          </div>
          <div className=" flex flex-col gap-6 flex-grow h-full">
            <h2 className="text-[1.2rem]">Your Order Status</h2>
            <div className="flex items-center">
              <div className="border w-10 h-10 bg-[#E5F9B4] rounded-full"></div>
              <hr className="border-[#E5F9B4] border w-[43%]" />
              <div className="border w-10 h-10 rounded-full"></div>
              <hr className="border-white/[0.5] border w-[43%]" />
              <div className="border w-10 h-10 rounded-full"></div>
            </div>

            <div className="flex w-full justify-between">
              <p className="w-20 text-[1.1rem]">Processed the order</p>
              <p className="w-20 text-[1.1rem] text-white/[0.2]">
                order at the shop floor
              </p>
              <p className="w-20 text-[1.1rem] text-white/[0.2]">
                Processed the order
              </p>
            </div>
          </div>
        </div>
        <div className="flex-grow px-8 py-6 rounded-[2.5rem] max-w-md gap-5 bg-[#181818]">
          {" "}
          <h2 className="text-[20px]">Trending Products :</h2>
          <div className="flex flex-col justify-between h-[95%]">
            <table className="trending-table">
              <thead>
                <tr>
                  <td>Product</td>
                  <td>Active Preorder Count</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kelvua Ralley</td>
                  <td>300</td>
                </tr>
                <tr>
                  <td>Kelvua Ralley Y2</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>Kelvua monster</td>
                  <td>600</td>
                </tr>
              </tbody>
            </table>
            <button className="w-full bg-[#e5f4bfe2] p-2 font-[500] text-black rounded-[41px]">
              View Products
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
