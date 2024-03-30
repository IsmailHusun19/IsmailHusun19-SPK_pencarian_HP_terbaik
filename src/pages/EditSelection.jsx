import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const people = [
  {
    id: 1,
    name: "Sangat penting",
  },
  {
    id: 2,
    name: "Penting",
  },
  {
    id: 3,
    name: "Tidak terlalu penting",
  },
];

const pilihan = [
  {
    id: 1,
    name: "Harga",
  },
  {
    id: 2,
    name: "CPU",
  },
  {
    id: 3,
    name: "Kamera",
  },
  {
    id: 4,
    name: "Baterai",
  },
  {
    id: 5,
    name: "Charging",
  },
  {
    id: 6,
    name: "RAM",
  },
  {
    id: 7,
    name: "ROM",
  },
  {
    id: 8,
    name: "Display",
  },
  {
    id: 9,
    name: "Refresh Rate",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function EditSelection() {
  const [selected, setSelected] = useState({});
  if (Object.keys(selected).length !== pilihan.length) {
    const initialSelected = {};
    pilihan.forEach((item) => {
      initialSelected[item.id] = null;
    });
    setSelected(initialSelected);
  }

  return (
    <div className="h-max flex flex-col w-full items-center justify-center bg-slate-900 py-[120px] gap-4">
        <h1 className="font-bold text-slate-200 text-xl text-center">
          Pilih kriteria ponsel
        </h1>
      {pilihan.map((item) => (
        <div key={item.id} className="w-[80%]">
          <Listbox value={selected[item.id]} onChange={(value) => {
            setSelected({ ...selected, [item.id]: value });
          }}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-base text-left w-full text-slate-200 font-semibold">
                  {item.name}
                </Listbox.Label>
                <div className="relative w-full">
                  <Listbox.Button className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                        {selected[item.id] ? selected[item.id].name : "Pilih..."}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-slate-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {people.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {person.name}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-indigo-600",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      ))}
    </div>
  );
}
