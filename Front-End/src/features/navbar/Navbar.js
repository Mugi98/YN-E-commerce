import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assests/Y-N E-commerce.jpg";
import "./index.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";
import { selectUserInfo } from "../user/userSlice";

const navigation = [
  { name: "Home", link: "/", user: true },
  { name: "Product", link: "/admin", admin: true },
  { name: "Order", link: "/admin/order", admin: true },
];
const userNavigation = [
  { name: "Your Profile", link: "/profile" },
  { name: "My Orders", link: "/my-orders" },
  { name: "My Wishlist", link: "/wishlist" },
  { name: "Log out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ children }) {
  const items = useSelector(selectItems);
  const user = useSelector(selectUserInfo);

  return (
    <>
      {user && (
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link to="/">
                          <img
                            className="mx-auto h-10 w-auto"
                            src={logo}
                            alt="Your Company"
                          />
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="nav-item ml-10 flex items-baseline space-x-4">
                          {navigation?.map((item) =>
                            item[user?.role] ? (
                              <Link
                                key={item?.name}
                                to={item?.link}
                                className={classNames(
                                  item?.current
                                    ? "text-white"
                                    : "text-gray-300 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={
                                  item?.current ? "page" : undefined
                                }
                              >
                                {item?.name}
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <Link to="/my-cart">
                          <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5" />
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>

                        {items?.length > 0 && (
                          <span className="inline-flex items-center rounded-full mb-5 -ml-3 z-50 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {items?.length}
                          </span>
                        )}
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                                alt=""
                              />
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
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation?.map((item) => (
                                <Menu.Item key={item?.name}>
                                  {({ active }) => (
                                    <Link
                                      key={item?.name}
                                      to={item?.link}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item?.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation?.map((item) =>
                      item[user?.role] ? (
                        <Disclosure.Button>
                          <Link
                            key={item?.name}
                            to={item?.link}
                            className={classNames(
                              item?.current
                                ? "text-white"
                                : "text-gray-300 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item?.current ? "page" : undefined}
                          >
                            {item?.name}
                          </Link>
                        </Disclosure.Button>
                      ) : null
                    )}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex justify-between px-5">
                      <div className="flex flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                          alt=""
                        />
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">
                            {user?.name}
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-400">
                            {user?.email}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Link to="/my-cart">
                          <button
                            type="button"
                            className="relative ml-auto items-end flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="absolute -inset-1.5">
                              <ShoppingCartIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </span>
                            {items.length > 0 && (
                              <span className="item-counter inline-flex items-end rounded-full z-50 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                {items?.length}
                              </span>
                            )}
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                          <Link key={item?.name} to={item?.link}>
                            {item?.name}
                          </Link>
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default NavBar;
