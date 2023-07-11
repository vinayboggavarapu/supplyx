import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black py-12 text-lime-100">
      <nav className="w-11/12 border-y-2 border-lime-100 py-6 flex flex-col lg:flex-row lg:justify-between  items-center text-center gap-6 ">
        <span>SupplyX</span>
        <ul className="gap-6 flex flex-col lg:flex-row">
          <li>Home</li>
          <li>Manufacturers</li>
          <li>Customers</li>
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
      <div className="w-full pt-14 lg:pb-6 1 grayscale">
        <Image
          src="/img1.png"
          alt="hi"
          layout="responsive"
          width={0}
          height={0}
          className="h-1/4 overflow-clip bg-cover"
        />
      </div>
      <div className="w-11/12  lg:flex lg:flex-col lg:w-8/12 text-left lg:gap-10 lg:py-20">
        <h2 className="font-semibold text-[6dvw] lg:text-[3.2dvw] lg:font-bold lg:w-9/12 text-lime-300 opacity-50 pb-3">
          Two Categories, One Platform
        </h2>
        <p className="text-slate-50 lg:w-4/6 lg:text-[1.5rem] lg:font-medium">
          SupplyX is designed specifically for Manufacturers and normal
          customers. It’s the ultimate platform for connecting businesses with
          their market, making supply chain more transparent and accurate.
        </p>
      </div>
      <div className="w-9/12 py-20 flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:pb-64">
        <div className="flex flex-col items-center text-center gap-4">
          <Image
            src="/team1.webp "
            width={80}
            height={50}
            className="rounded-full h-20 grayscale"
          />
          <h3 className="font-semibold text-2xl">PETER</h3>
          <p className="text-slate-50 text-lg font-light">Manufacturer</p>
        </div>

        <div className="flex flex-col items-center text-center gap-4">
          <Image
            src="/team2.webp"
            width={80}
            height={50}
            className="rounded-full h-20 grayscale"
          />
          <h3 className="font-semibold text-2xl">PETER</h3>
          <p className="text-slate-50 text-lg font-light">Manufacturer</p>
        </div>

        <div className="flex flex-col items-center text-center gap-4">
          <Image
            src="/team3.webp"
            width={80}
            height={50}
            className="rounded-full h-20 grayscale"
          />
          <h3 className="font-semibold text-2xl">PETER</h3>
          <p className="text-slate-50 text-lg font-light">Manufacturer</p>
        </div>

        <div className="flex flex-col items-center text-center gap-4">
          <Image
            src="/team4.webp"
            width={80}
            height={50}
            className="rounded-full h-20 grayscale  "
          />
          <h3 className="font-semibold text-2xl">PETER</h3>
          <p className="text-slate-50 text-lg font-light">Manufacturer</p>
        </div>
      </div>

      <div className="w-11/12 lg:w-8/12 gap-5 grid lg:gap-[20px] lg:grid-rows-2 lg:grid-cols-3">
        <div className="card1 w-full bg-[#0d0d0d] px-5 py-4 rounded-2xl flex flex-col gap-3 lg:col-span-2">
          <h3 className="font-semibold text-2xl">Transparent</h3>
          <p className="text-slate-50">Live onchain logistics tracking</p>
          <Image
            src="/card1.webp"
            width={100}
            height={100}
            quality={100}
            className="lg:mt-5 grayscale w-full h-52 object-cover rounded-lg self-center m-auto"
          />
        </div>
        <div className="card1 w-full bg-[#0d0d0d] px-5 py-4 rounded-2xl flex flex-col gap-3">
          <h3 className="font-semibold text-2xl">Transparent</h3>
          <p className="text-slate-50">Live onchain logistics tracking</p>
          <Image
            src="/card2.webp"
            width={100}
            height={100}
            quality={100}
            className="lg:mt-5 grayscale w-full h-52 object-cover rounded-lg self-center m-auto"
          />
        </div>
        <div className="card1 w-full bg-[#0d0d0d] px-5 py-4 rounded-2xl flex flex-col gap-3">
          <h3 className="font-semibold text-2xl">Transparent</h3>
          <p className="text-slate-50">Live onchain logistics tracking</p>
          <Image
            src="/card3.webp"
            width={100}
            height={100}
            quality={100}
            className="lg:mt-5 grayscale w-full h-52 object-cover rounded-lg self-center m-auto"
          />
        </div>
        <div className="card1 w-full bg-[#0d0d0d] px-5 py-4 rounded-2xl flex flex-col gap-3 lg:col-span-2">
          <h3 className="font-semibold text-2xl">Transparent</h3>
          <p className="text-slate-50">Live onchain logistics tracking</p>
          <Image
            src="/card4.webp"
            width={100}
            height={100}
            quality={100}
            className="lg:mt-5 grayscale w-full h-52 object-cover rounded-lg self-center m-auto"
          />
        </div>
      </div>
      <div className="w-11/12 lg:w-4/12 flex flex-col lg:items-center text-center my-20 gap-6">
        <h2 className="text-3xl font-bold">Get Started</h2>
        <p className="text-[0.98rem]">
          Don’t wait another minute! Dive into the world of SupplyX and
          revolutionize your supply chain experience. Join us now!
        </p>
        <div className="w-full lg:w-fit bg-[#704e2e] text-slate-50 text-sm p-3 rounded-lg">
          Sign up
        </div>
      </div>
      <div>
        <p className="text-slate-50 text-base font-light">
          © SupplyX, Transforming Industries
        </p>
      </div>
    </main>
  );
}
