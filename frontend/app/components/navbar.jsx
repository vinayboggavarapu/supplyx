const Navbar = ({ header }) => {
  return (
    <div className="flex justify-between py-4  border-style">
      <p className="text-[1.3rem]">Welcome {header}</p>
      <div className="hidden md:flex gap-14 text-[1rem]">
        <div>Home</div>
        <div className="text-[#E5F9B4]">Notifications</div>
        <div>Connect</div>
      </div>
    </div>
  );
};

export default Navbar;
