import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/16/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSection() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();

    const cookies = document.cookie.split(";");

    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      if (name.startsWith("msal")) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });

    navigate("/auth");
  };
  return (
    <div className="flex items-center">
      <div className="relative">
        <BellIcon
          width={20}
          className="transition-all duration-300 ease-in-out cursor-pointer hover:scale-110 hover:animate-[wiggle_0.3s_ease-in-out_infinite]"
        />
      </div>
      <div className="ml-4 flex items-center space-x-3">
        <div className="w-8 h-8 text-lg rounded-full bg-white text-black flex justify-center items-center p-1">
          <span>US</span>
        </div>
        <div className="text-base font-normal">{`User`}</div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-transparent bg-opacity-20 px-2 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <ChevronDownIcon width={18} aria-hidden="true" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-[3000] right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {/* {userInfo.role == 'GIS Owner' ? 
              <>
             <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`${
                        active
                          ? 'bg-violet-200 text-white cursor-pointer'
                          : 'text-gray-900'
                      }  group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={(e) => onHandleScreenChange(e)}
                    >
                      <GlobeAltIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      {screenType == 'GIS User' ? 'GIS Owner' : 'GIS User'}
                    </div>
                  )}
                </Menu.Item>
             </> : <></>}  */}

                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`${
                        active
                          ? "bg-violet-200 text-white cursor-pointer"
                          : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={handleLogout}
                    >
                      {/* <ArrowLeftOnRectangleIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      /> */}
                      Logout
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
