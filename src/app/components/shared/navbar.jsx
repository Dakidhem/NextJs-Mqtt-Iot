const NavBar = () => {
  return (
    <div className="w-full h-20 lgh:h-[12vh] sticky top-0 z-50 bg-primary px-12">
      <div className="max-w-container h-full mx-auto py-1 font-titleFont flex items-center justify-between">
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <a href="/" className="block text-2xl text-white font-bold">
            OhmCare
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
