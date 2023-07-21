import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Navbar = ({ header }) => {
  return (
    <div className="flex justify-between py-4  border-style">
      <p className="text-[1.3rem]">Welcome {header}</p>
      <div className="hidden md:flex items-center gap-14 text-[1rem]">
        <Link href="/">Home</Link>
        <div className="text-[#E5F9B4]">Notifications</div>
        <ConnectButton showBalance={false} />
      </div>
    </div>
  );
};

export default Navbar;
