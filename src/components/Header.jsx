const Header = () => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur border-b border-slate-50/[0.1]">
      <div className="flex justify-between items-center h-full py-4">
        <div className="flex items-center cursor-pointer">
          <img src="/logo-trasparence.png" alt="logo" className="w-12 mr-3" />
          <h1 className=" text-slate-300 text-3xl font-medium">
            Reactive<span className="text-emerald-500">X</span>
          </h1>
        </div>

        <nav>
          <ul className="flex items-center gap-5 text-slate-200">
            <li className="hover:bg-opacity-80 transition cursor-pointer bg-emerald-500 rounded-md px-3 py-1">
              Log In
            </li>
            <li className="hover:text-emerald-300 transition cursor-pointer ">
              Sign Up
            </li>{" "}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
