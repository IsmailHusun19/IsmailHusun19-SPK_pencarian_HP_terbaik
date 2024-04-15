import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import profile from "../assets/profile.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urutanAkun = localStorage.getItem("urutanAkun");
  const akun = JSON.parse(localStorage.getItem("akun" + urutanAkun));

  const keysKretaria = Object.keys(akun?.kebutuhanSpesifikasi || {});
  const keysPonsel = Object.keys(akun?.dataHp || {});

  const dataKretaria = keysKretaria.map((key) => akun.kebutuhanSpesifikasi[key]);
  const dataPonsel = keysPonsel.map((key) => akun.dataHp[key]);
  const [kretaria, setKretaria] = useState([]);
  const [ponsel, setPonsel] = useState([]);

  useEffect(() => {
    const newDataKretaria = dataKretaria.map((item, index) => ({
      name: item
    }));
    const newDataPonsel = dataPonsel.map((item, index) => ({
      id: item.id,
      name: item.merek
    }));
    if (JSON.stringify(kretaria) !== JSON.stringify(newDataKretaria)) {
      setKretaria(newDataKretaria);
    }
    if (JSON.stringify(ponsel) !== JSON.stringify(newDataPonsel)) {
      setPonsel(newDataPonsel);
    }
  }, [dataKretaria, kretaria, dataPonsel, ponsel]);


  const navigation = [
    {
      name: "Dashboard",
      to: "/dashboard",
      current: location.pathname === "/dashboard" ? true : false,
    },
    {
      name: "Selection",
      to: "/selection",
      current: location.pathname === "/selection" ? true : false,
    },
    {
      name: "Team",
      to: "/team",
      current: location.pathname === "/team" ? true : false,
    },
    {
      name: "About Us",
      to: "/aboutus",
      current: location.pathname === "/aboutus" ? true : false,
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const nameAkun = () => {
    if (localStorage.getItem("urutanAkun") !== null) {
      const urutanAkun = localStorage.getItem("urutanAkun");
      const akun = JSON.parse(localStorage.getItem("akun" + urutanAkun));
      return akun.name;
    } else {
      return navigate("/login");
    }
  };
  const logout = () => {
    if (localStorage.getItem("urutanAkun") !== null) {
      return localStorage.removeItem("urutanAkun");
    }
  };
  return (
    <Disclosure
      as="nav"
      className="bg-gray-950 fixed top-0 left-0 w-full z-50 shadow-lg"
    >
      {({ open }) => (
        <>
          <div className="w-full px-6">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto hidden md:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {ponsel.length > 1 ? (
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 items-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">
                            Options
                            <ChevronDownIcon
                              className="-mr-1 h-5 w-5 text-gray-400"
                              aria-hidden="true"
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
                          <Menu.Items className="absolute left-0 z-10 mt-[14px] w-56 origin-top-right text-gray-400 bg-slate-950 rounded-md rounded-tr-none rounded-tl-none">
                            <div className="py-1 flex flex-col gap-1">
                              {kretaria.map((item, index) => (
                                <Menu.Item key={index}>
                                  {({ active }) => (
                                    <Link
                                      to={`/ponsel/${item.name}/${index}`}
                                      className={classNames(
                                        active
                                          ? "bg-gray-900 text-white transition duration-250 ease-in-out"
                                          : "hover:bg-gray-900",
                                        "block px-4 py-2 text-sm font-medium"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <p className="text-slate-200 font-semiBold">{nameAkun()}</p>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={profile}
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
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/"
                            onClick={logout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              {ponsel.length > 1 ? (
                <Menu
                  as="div"
                  className="relative inline-block text-left w-full"
                >
                  <div>
                    <Menu.Button className="inline-flex w-full justify-start gap-x-1.5 items-start rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium">
                      Options
                      <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
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
                    <Menu.Items className="w-full text-gray-400 bg-slate-950 rounded-md rounded-tr-none rounded-tl-none transition duration-250 ease-in-out">
                      <div className="py-1 flex flex-col gap-1">
                        {kretaria.map((item, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <Link
                              to={`/ponsel/${item.name}/${index}`}
                                className={classNames(
                                  active
                                    ? "bg-gray-900 text-white transition duration-250 ease-in-out"
                                    : "hover:bg-gray-900",
                                  "block px-4 py-2 text-sm font-medium"
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                ''
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
