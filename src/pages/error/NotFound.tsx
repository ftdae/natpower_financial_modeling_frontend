const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-[#111927] flex justify-center items-center">
      <div className="flex flex-col items-center text-center py-10">
        <div className="px-4 py-32 rounded-xl bg-white shadow-xl">
          <h1 className="text-6xl font-inter font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1a212b] via-[#111927] to-[#2c3b47] drop-shadow-md leading-relaxed">
            404 - Page Not Found
          </h1>

          <p className="max-w-2xl mb-8 text-[#111927]">
            The page you are looking for doesn't exist or has been moved. You
            can return to the login page and start fresh.
          </p>

          <div className="flex items-center justify-center">
            <button
              onClick={() => (window.location.href = "/")}
              className="px-8 py-3 mt-4 text-white rounded-full shadow-md border border-[#111927] bg-gradient-to-r from-[#1f2732] to-[#2c3b47] hover:from-[#111927] hover:to-[#394964]"
            >
              <span>Go to Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
