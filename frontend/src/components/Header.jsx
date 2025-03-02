const Header = () => {
  return (
    <header className="fixed w-full h-20 shadow-lg flex items-center bg-white z-10 ">
      <div className="w-6xl mx-auto flex items-center justify-between p-3 ">
        <a href="/">
          <h1 className="text-xl md:text-3xl font-bold">
            Tix<span className="text-sky-600">Manage</span>{" "}
          </h1>
        </a>
        <div className="flex gap-3 md:gap-9 items-center">
          <a href="#features">
            <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
              Features
            </span>
          </a>
          <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
            Login
          </span>
          <span className="bg-sky-600 hover:bg-sky-400 text-white px-3 py-1 rounded-2xl cursor-pointer">
            Sign up
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
