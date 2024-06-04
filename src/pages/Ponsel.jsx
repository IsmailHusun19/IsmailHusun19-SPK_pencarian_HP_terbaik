import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Radio } from "@material-tailwind/react";
import TableSelection from "./TableSelection";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "../component/Navbar";

const skala = [
  "1. Keduanya sama unggul",
  "2. Agak lebih unggul",
  "3. Lebih mendekati sedang",
  "4. Lebih unggul dari sedang",
  "5. Sedang",
  "6. Lebih mendekati unggul",
  "7. Jauh lebih unggul",
  "8. Jauh lebih dari unggul",
  "9. Mutlak lebih unggul",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Ponsel = () => {
  let render = false;
  const cekLogin = () => {
    if(render === false){
      render = true
      if(render === true){
        return localStorage.getItem("urutanAkun") !== null ? true : false;
      }
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("urutanAkun") === null) {
      return navigate("/dashboard");
    }
  });

  const dataKretariaPonsel = useParams();

  if (localStorage.getItem("urutanAkun") !== null) {
    const urutanAkun = localStorage.getItem("urutanAkun");
    let akun = JSON.parse(localStorage.getItem("akun" + urutanAkun));
    const namaKretaria = dataKretariaPonsel.kretaria;
    let pilihan = [];
    const keysPonsel = Object.keys(akun?.dataHp || {});
    const dataPonsel = keysPonsel.map((key) => akun.dataHp[key]);
    dataPonsel.map((item) => {
      pilihan.push(item.merek);
    });
    const [selectedRadio, setSelectedRadio] = useState([]);
    const [selectedListbox, setSelectedListbox] = useState([]);

    const handleRadioChange = (option1, option2, value) => {
      const updatedSelectedRadio = [...selectedRadio];
      const index = updatedSelectedRadio.findIndex(
        (item) => item.option1 === option1 && item.option2 === option2
      );

      if (index !== -1) {
        updatedSelectedRadio[index] = { option1, option2, value };
      } else {
        updatedSelectedRadio.push({ option1, option2, value });
      }

      setSelectedRadio(updatedSelectedRadio);
    };

    const handleListboxChange = (option1, option2, value) => {
      const updatedSelectedListbox = [...selectedListbox];
      const index = updatedSelectedListbox.findIndex(
        (item) => item.option1 === option1 && item.option2 === option2
      );

      if (index !== -1) {
        updatedSelectedListbox[index] = { option1, option2, value };
      } else {
        updatedSelectedListbox.push({ option1, option2, value });
      }

      setSelectedListbox(updatedSelectedListbox);
    };

    let comparisonOptions = [];

    for (let i = 0; i < pilihan.length - 1; i++) {
      for (let j = i + 1; j < pilihan.length; j++) {
        comparisonOptions.push([pilihan[i], pilihan[j]]);
      }
    }

    useEffect(() => {
      if (urutanAkun !== null) {
        if (akun[`radio${namaKretaria}`] !== undefined) {
          setSelectedRadio(akun[`radio${namaKretaria}`]);
          setSelectedListbox(akun[`select${namaKretaria}`]);
          if (akun[`radio${namaKretaria}`].length === 0) {
            setSelectedRadio([]);
            setSelectedListbox([]);
            console.log(selectedListbox);
          } else {
            setSelectedRadio(akun[`radio${namaKretaria}`]);
            setSelectedListbox(akun[`select${namaKretaria}`]);
          }
        }
      }
    }, [namaKretaria]);

    const handleSubmit = (e) => {
      e.preventDefault();
      let cheking = false;
      for (let index = 0; index < selectedRadio.length; index++) {
        if (selectedListbox[index] === undefined) {
          const updatedAkun = {
            ...akun,
            [`radio${namaKretaria}`]: [],
            [`select${namaKretaria}`]: [],
          };
          localStorage.setItem(
            "akun" + urutanAkun,
            JSON.stringify(updatedAkun)
          );
          cheking = true;
          Swal.fire({
            icon: "error",
            showConfirmButton: false,
            text: "Harap lengkapi semua kretaria",
            timer: 1500,
            timerProgressBar: true,
          });
          break;
        }
      }
      if (!cheking) {
        const updatedAkun = {
          ...akun,
          [`radio${namaKretaria}`]: selectedRadio,
          [`select${namaKretaria}`]: selectedListbox,
        };
        localStorage.setItem("akun" + urutanAkun, JSON.stringify(updatedAkun));
        return location.reload();
      }
    };

    const handleClearButton = (e) => {
      event.preventDefault(e);
      const updatedAkun = {
        ...akun,
        [`radio${namaKretaria}`]: [],
        [`select${namaKretaria}`]: [],
      };
      location.reload();
      return localStorage.setItem(
        "akun" + urutanAkun,
        JSON.stringify(updatedAkun)
      );
    };

    return (
      <>
        {cekLogin() ? <Navbar /> : null}
        <div className="h-max min-h-screen flex flex-col w-full items-center justify-center bg-slate-900 py-[120px] gap-4">
          <h1 className="font-bold text-slate-200 text-xl text-center">
            {`Perbandingan ${dataKretariaPonsel.kretaria} ponsel`}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-[90%] flex flex-col gap-14"
          >
            <p className="mb-[-45px] mt-2 text-red-500 font-medium text-sm">
            *Mengisi dari atas terlebih dahulu agar perhitungannnya valid dan
              jika ingin menghitung kembali sebaiknya di clear terlebih dahulu*
            </p>
            {comparisonOptions.map(([option1, option2], index) => (
              <div key={index}>
                <div className="flex gap-10 font-normal">
                  <Radio
                    name={`type-${option1}-${option2}`}
                    label={
                      <span className="font-normal text-slate-200 shadow-none">
                        {option1}
                      </span>
                    }
                    required
                    checked={
                      selectedRadio.find(
                        (item) =>
                          item.option1 === option1 && item.option2 === option2
                      )?.value === option1
                    }
                    onChange={() =>
                      handleRadioChange(option1, option2, option1)
                    }
                    className="mr-3 text-blue-700 border-none transition-none nonAktif"
                  />
                  <Radio
                    name={`type-${option1}-${option2}`}
                    label={
                      <span className="font-normal text-slate-200">
                        {option2}
                      </span>
                    }
                    required
                    checked={
                      selectedRadio.find(
                        (item) =>
                          item.option1 === option1 && item.option2 === option2
                      )?.value === option2
                    }
                    onChange={() =>
                      handleRadioChange(option1, option2, option2)
                    }
                    className="mr-3 text-blue-700 border-none transition-none nonAktif"
                  />
                </div>
                <div className="relative w-full">
                  <Listbox
                    value={
                      selectedListbox.find(
                        (item) =>
                          item.option1 === option1 && item.option2 === option2
                      ) || null
                    }
                    onChange={(value) => {
                      handleListboxChange(option1, option2, value);
                    }}
                  >
                    {({ open }) => (
                      <>
                        <Listbox.Button className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                          <span className="flex items-center">
                            <span className="ml-3 block truncate">
                              {selectedListbox.find(
                                (item) =>
                                  item.option1 === option1 &&
                                  item.option2 === option2
                              )
                                ? selectedListbox.find(
                                    (item) =>
                                      item.option1 === option1 &&
                                      item.option2 === option2
                                  ).value
                                : "Pilih..."}
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
                            {skala.map((person, personIndex) => (
                              <Listbox.Option
                                key={personIndex}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? "bg-indigo-600 text-white"
                                      : "text-gray-900",
                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                  )
                                }
                                value={person}
                                onClick={() => setSelectedListbox(person)}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center">
                                      <span
                                        className={classNames(
                                          selected
                                            ? "font-semibold"
                                            : "font-normal",
                                          "ml-3 block truncate"
                                        )}
                                      >
                                        {person}
                                      </span>
                                    </div>

                                    {selected ? (
                                      <span
                                        className={classNames(
                                          active
                                            ? "text-white"
                                            : "text-indigo-600",
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
                      </>
                    )}
                  </Listbox>
                </div>
              </div>
            ))}
            <p className="mt-[-45px] mb-2 text-red-500 font-medium text-sm">
            *Mengisi dari atas terlebih dahulu agar perhitungannnya valid dan
              jika ingin menghitung kembali sebaiknya di clear terlebih dahulu*
            </p>
            <div className="flex gap-5">
              <button
                type="submit"
                onClick={handleClearButton}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[35px] py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-auto"
              >
                Clear
              </button>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[35px] py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
          <TableSelection />
        </div>
      </>
    );
  }
};

export default Ponsel;
