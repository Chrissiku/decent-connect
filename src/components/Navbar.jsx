import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";
import ConnectButton from "./common/ConnectButton";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "About Us", href: "#", current: false },
  { name: "Mentor", href: "#", current: false },
  { name: "Features", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="w-full p-5 lg:p-7 text-black">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-between space-x-5 lg:space-x-10 text-[14px] lg:text-[18px]">
                <div className="text-black font-bold inline-flex justify-around space-x-5 items-center">
                  <div className="lg:w-10 lg:h-10">
                    <img
                      className="h-full w-full"
                      src={logo}
                      alt="Decent connect logo"
                    />
                  </div>
                  <h1 className="text-[16px] lg:text-[20px]">Decent Connect</h1>
                </div>
                <div className="hidden sm:block px-3">
                  <div className="inline-flex md:space-x-3 lg:space-x-5">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? "" : "",
                          "rounded-md px-3 py-2 hover:text-teal"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center justify-between">
                <div className="hidden sm:block">
                  <ConnectButton text="Connect" start="Connect" />
                </div>
                <div className="flex sm:hidden items-center">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center bg-teal text-white p-2 rounded-lg">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden w-full">
            <div className="space-y-1 px-2 pb-3 pt-10">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? "text-teal" : "",
                    "block rounded-md px-3 py-2 text-base font-medium hover:text-teal text-black"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="w-full">
              <button
                type="button"
                className="bg-teal w-full text-white text-center py-2 px-5 lg:py-3 lg:px-10 rounded-lg"
              >
                Connect
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
