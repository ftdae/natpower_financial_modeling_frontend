import { Link, useNavigate } from "react-router-dom";
import BessIcon from "./assets/BESS.jpg";
import BessVideo from "./public/Gwyddelwern.mp4";

const Index = () => {
  const navigate = useNavigate();
  const handleStartNowClick = () => {
    navigate("/login");
  };

  const handleStartSystemClick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <div className="flex flex-col items-center text-center py-10 bg-black">
          <div className="px-4 py-20 rounded-lg spotlight-bg shadow-2xl">
            {/* Gradient Header */}
            <h1 className="text-6xl font-inter header-weight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 drop-shadow-lg">
              Renewable Energy <br /> for a Future
            </h1>

            {/* Subtitle Text */}
            <p className="max-w-2xl mb-8 text-gray-300 drop-shadow-lg">
              Leading the Renewable Energy Revolution, NatPower implements{" "}
              <span className="font-semibold">high-profile projects</span> for
              top operators. With expertise in clean energy, smart demand, and
              advanced infrastructure, NatPower is your{" "}
              <span className="font-semibold">
                independent platform for a sustainable future.
              </span>
            </p>

            {/* Button */}
            <div className="flex items-center justify-center">
              <button
                onClick={handleStartNowClick}
                className="px-8 py-3 mt-4 text-white rounded-full shadow-md border border-[#00acc1] bg-gradient-to-b from-[#1a233a] to-[#2c3e50] hover:from-[#1a233a] hover:to-[#394964]  space-x-2 backdrop-blur-md"
              >
                <span>START NOW</span>
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative mt-4 w-full max-w-4xl shadow-[0_-15px_30px_-5px] shadow-[#030719]">
            {/* Gradient Overlay */}
            <div className="absolute  rounded-lg"></div>

            {/* Video */}
            <video src="/Gwyddelwern.mp4" controls className="rounded-lg w-full" muted>
              Your browser does not support the video tag.
            </video>

            {/* Play Button Overlay */}

            {/* Overlay Elements */}
            {/* <div className="absolute bottom-8 left-8 bg-black bg-opacity-70 rounded-full w-16 h-16 flex items-center justify-center text-xl">
              50%
            </div>
            <div className="absolute bottom-8 right-8 bg-black bg-opacity-70 rounded-full w-16 h-16 flex items-center justify-center text-xl">
              99
            </div> */}
          </div>
          <div className="w-full max-w-4xl h-px bg-gray-600 mt-20"></div>
          <div className="w-full max-w-4xl px-8 py-6 rounded-lg bg-opacity-30 bg-gradient-to-b from-gray-800 to-gray-900 backdrop-blur-lg shadow-lg border border-gray-700 flex justify-around text-center space-x-4 my-16">
            <div>
              <p className="text-4xl font-semibold bg-clip-text text-transparent font-poppins bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
                30 GW+
              </p>
              <p className="text-gray-400 mt-2 font-inter">
                Project Development Portfolio
              </p>
            </div>
{/* TEst comment */}
            <div>
              <p className="text-4xl font-semibold bg-clip-text text-transparent font-poppins bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
                1466 MW+
              </p>
              <p className="text-gray-400 mt-2 font-inter">Project Sold</p>
            </div>

            <div>
              <p className="text-4xl font-semibold bg-clip-text text-transparent font-poppins bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
                25 years
              </p>
              <p className="text-gray-400 mt-2 font-inter">
                In the RES Market and Tech Background
              </p>
            </div>
          </div>

          <div className="relative flex flex-col items-center bg-black text-white  pb-12 overflow-hidden">
            <h1 className="text-5xl header-weight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
              WE ARE ENERGY
            </h1>

            {/* Container for the image overlays */}
            <div className="relative w-[60rem] h-[600px]">
              {/* Background image */}
              <div
                className="absolute w-[60rem] inset-0 bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url(../public/earth.png)",
                }}
              ></div>

              {/* Overlaying images */}
              <div className="absolute top-0 left-0 w-1/2 p-2 z-[999]">
                <img
                  src="../public/offshore-wind.jpeg"
                  alt="Wind Energy"
                  className="rounded-lg shadow-lg"
                />
              </div>

              <div className="absolute top-0 right-0 w-1/3 p-2 z-[999]">
                <img
                  src="../public/solar-image.jpeg"
                  alt="Solar Panels"
                  className="rounded-lg shadow-lg h-[20rem]"
                />
              </div>

              <div className="absolute inset-x-1/3 top-1/3 w-1/2 p-2 z-[99]">
                <img
                  src="../public/grass-image.png"
                  alt="Forest Energy"
                  className="rounded-lg shadow-lg"
                />
              </div>

              <div className="absolute -bottom-10 left-0 w-1/2 p-2">
                <img
                  src="../public/stock-image.jpeg"
                  alt="Control Room"
                  className="rounded-lg shadow-lg"
                />
              </div>

              <div className="absolute -bottom-10 -right-12 w-1/2 p-2">
                <img
                  src="../public/flex-grid.jpeg"
                  alt="Energy Storage"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center bg-black text-white px-10 md:px-20 lg:px-24 my-16">
            <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center">
              {/* Text Section */}
              <div className="md:w-1/2  ml-10">
                <div className="ml-24 space-y-2">
                  <p className="text-gray-400 text-sm text-left">
                    - Our <span className="font-semibold">Technologies</span>
                  </p>

                  <h2 className="text-xl md:text-2xl font-bold text-left">
                    We fight against climate change
                  </h2>

                  <p className="text-gray-300 text-base md:text-lg text-left">
                    Embracing wind, solar, and hydrogen technology, NatPower
                    reduces greenhouse gases and fights climate change. Our
                    battery storage systems provide reliable, on-demand clean
                    energy.
                  </p>
                </div>
              </div>

              {/* Image Section */}
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center items-center">
                <img
                  src="../public/overlay-image.png"
                  alt="Energy Technologies"
                  className="w-full max-w-[500px] h-auto shadow-lg"
                />
              </div>
            </div>
          </div>
          <div className="w-full max-w-4xl h-px bg-gray-600 mb-8 shadow-xl shadow-white"></div>

          <div className="flex justify-center items-center bg-black p-8 mx-52 2xl:mx-[40rem] min-h-[20rem] mb-8">
            <div className="grid grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="relative bg-[#1c1c1e] p-6 rounded-2xl shadow-lg flex flex-col items-center card-shadow">
                <img
                  src={BessIcon}
                  alt="BESS System"
                  className="w-full h-1/2 rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2 text-white">
                  BESS System
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  NatPower actively develops battery storage projects on a
                  stand-alone basis and changes its development process to
                  install them in both photovoltaic plants and farms.
                </p>
                <button
                  onClick={handleStartSystemClick}
                  className="mt-auto px-4 py-2 bg-transparent border border-gray-400 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white flex items-center"
                >
                  Start System <span className="ml-2">→</span>
                </button>
              </div>

              <div className="relative bg-[#1c1c1e] p-6 rounded-2xl shadow-lg flex flex-col items-center card-shadow">
                <img
                  src="../public/Wind-turbine.jpeg"
                  alt="Wind System"
                  className="w-full h-1/2 rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Wind System
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  NatPower enables customers to build wind farms that consist of
                  two wind-power generators that transform the kinetic energy of
                  wind into mechanical energy.
                </p>
                <button
                  onClick={handleStartSystemClick}
                  className="mt-auto px-4 py-2 bg-transparent border border-gray-400 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white flex items-center"
                >
                  Start System <span className="ml-2">→</span>
                </button>
              </div>
              <div className="relative bg-[#1c1c1e] p-6 rounded-2xl shadow-lg flex flex-col items-center card-shadow">
                <img
                  src="../public/panel.jpeg"
                  alt="Solar System"
                  className="w-full h-1/2 rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Solar System
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  NatPower enables customers to build photovoltaic plants that
                  will generate electricity from solar sources.
                </p>
                <button
                  onClick={handleStartSystemClick}
                  className="mt-auto px-4 py-2 bg-transparent border border-gray-400 text-gray-400 rounded-full hover:bg-gray-700 hover:text-white flex items-center"
                >
                  Start System <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="w-full max-w-4xl h-px bg-gray-600 mb-8 shadow-xl shadow-white"></div>

          <div className="flex items-center justify-center  bg-black text-white px-6 md:px-16 lg:px-24 py-12">
            {/* Testimonial Container */}
            <div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto space-y-8 md:space-y-0 md:space-x-8">
              {/* Image Section */}
              <div className="w-48 h-48 flex-shrink-0">
                <img
                  src="../public/ceo.jpeg"
                  alt="CEO Image"
                  className="w-full h-full object-cover rounded-full shadow-lg"
                />
              </div>

              {/* Text Section */}
              <div className="flex flex-col space-y-4">
                {/* Quotation Mark */}
                <div className="w-20 h-16 flex-shrink-0">
                  <img
                    src="../public/quoation.png"
                    alt="CEO Image"
                    className="w-16 h-14  shadow-lg"
                  />
                </div>
                {/* Quote */}
                <p className="text-gray-300 text-lg md:text-xl text-left">
                  The challenges of the future will be the ability to respond to
                  the different needs of the energy transition, the tendency to
                  increasingly globalise the business by maintaining a
                  tailor-made project development.
                </p>
                {/* Author */}
                <p className="text-blue-500 text-left">- Fabrizio Zago, CEO</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-black text-white px-4 py-12">
            <div className="max-w-4xl text-center space-y-6">
              {/* Heading */}
              <h2 className="text-2xl md:text-3xl font-light"></h2>

              {/* Paragraph */}
              <p className="text-gray-400 text-lg md:text-xl text-left">
                <span className="font-bold text-white">
                  {" "}
                  Our investors approach.
                </span>{" "}
                NatPower cultivates strong investor relations by implementing
                high-value renewable energy projects. We navigate complex
                permitting processes, employ cutting-edge technologies, and
                target new markets. Our investor-focused approach ensures
                maximum returns for a sustainable future.
              </p>

              {/* Button */}

              <Link to="/login">
                <button className="px-8 py-3 mt-4 text-white rounded-full shadow-md border border-[#00acc1] bg-gradient-to-b from-[#1a233a] to-[#2c3e50] hover:from-[#1a233a] hover:to-[#394964] space-x-2 backdrop-blur-md">
                  <span>START NOW</span>
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-black text-white py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Logo Section */}
              <div>
                <img
                  src="./NatPower_Payoff_Bianco.png"
                  alt="Natpower Marine Logo"
                  className="h-[40px] w-[150px] object-contain"
                />
              </div>

              {/* Address Section */}
              <div>
                <h2 className="text-md font-semibold mb-2">Address</h2>
                <p className="text-gray-400 text-sm">
                  NatPower UK
                  <br />
                  
                 
                  13 Hanover Square, London W1S 1HN
                  <br />
                  London
                </p>
              </div>

              {/* Company Section */}
              <div>
                <h2 className="text-md font-semibold mb-2">Company</h2>
                <p className="text-gray-400 text-sm">About Us</p>
                <p className="text-gray-400 text-sm">Contact Us</p>
              </div>

              {/* Resources Section */}
              <div>
                <h2 className="text-md font-semibold mb-2">Resources</h2>
                <p className="text-gray-400 text-sm">Downloads</p>
                <p className="text-gray-400 text-sm">Community</p>
              </div>

              {/* Social Media Section */}
              <div>
                <h2 className="font-semibold mb-2 text-md">FOLLOW US</h2>
                <div className="flex justify-center space-x-4">
                  <a
                    href="#"
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center"
                  >
                    <i className="fab fa-facebook-f"></i>{" "}
                    {/* Replace with actual social media icons */}
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Divider Line */}
            <div className="border-t border-gray-700 my-8"></div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
              <p>© NatPower 2024</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
                <a href="#" className="hover:underline">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
