import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tooltip } from "flowbite-react";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import PersentaseSelection from "./PersentaseSelection";

const TABLE_HEAD = ["No", "Merk", "Aksi"];

const Table = () => {
  const [results, setResults] = useState([]);
  const cekLogin = () => {
    return localStorage.getItem("urutanAkun") !== null ? true : false;
  };
  const navigate = useNavigate();
  if (localStorage.getItem("urutanAkun") === null) {
    return navigate("/login");
  }
  const urutanAkun = localStorage.getItem("urutanAkun");
  let akun = JSON.parse(localStorage.getItem("akun" + urutanAkun));

  const keys = Object.keys(akun?.dataHp || {});
  const numericKeys = Array.from({ length: keys.length }, (_, index) =>
    index.toString()
  );
  numericKeys.sort((a, b) => parseInt(a) - parseInt(b));
  const sortedData = {};
  numericKeys.forEach((key, index) => {
    sortedData[key] = akun.dataHp[keys[index]];
  });

  akun.dataHp = sortedData;
  localStorage.setItem("akun" + urutanAkun, JSON.stringify(akun));

  const data = keys.map((key) => akun.dataHp[key]);
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);

  useEffect(() => {
    const newData = data
      .map((item) => {
        if (item && item.merek !== undefined) {
          return { merekHP: item.merek };
        } else {
          return null;
        }
      })
      .filter((item) => item !== null);

    if (JSON.stringify(TABLE_ROWS) !== JSON.stringify(newData)) {
      setTABLE_ROWS(newData);
    }
  }, [data, TABLE_ROWS]);

  const [displayedData, setDisplayedData] = useState(TABLE_ROWS.slice(0, 5));
  const [startIndex, setStartIndex] = useState(0);
  const [actualIndex, setActualIndex] = useState(0);
  const [reloadEffect, setReloadEffect] = useState(false);

  const updateDisplayedData = () => {
    const newData = TABLE_ROWS.slice(startIndex, startIndex + 5);
    setDisplayedData(newData);
    setActualIndex(startIndex);
  };

  useEffect(() => {
    updateDisplayedData();
  }, [startIndex, TABLE_ROWS, reloadEffect]);

  useEffect(() => {
    if (startIndex >= TABLE_ROWS.length) {
      const lastPageStartIndex = Math.max(TABLE_ROWS.length - 5, 0);
      setStartIndex(lastPageStartIndex);
      setActualIndex(lastPageStartIndex);
    }
  }, [TABLE_ROWS]);

  const handleNextClick = () => {
    if (startIndex + 5 < TABLE_ROWS.length) {
      setStartIndex(startIndex + 5);
      setActualIndex(actualIndex + 5);
    }
  };

  const handlePreviousClick = () => {
    if (startIndex >= 5) {
      setStartIndex(startIndex - 5);
      setActualIndex(actualIndex - 5);
    }
  };

  const handleDelete = (index) => {
    let cheking = false;
    const sintax = () => {
      const newData = [...TABLE_ROWS];
      newData.splice(actualIndex + index, 1);
      setTABLE_ROWS(newData);
      const newActualIndex = actualIndex - 1 < 0 ? 0 : actualIndex - 1;
      setActualIndex(newActualIndex);
      const newDataForStorage = { ...akun.dataHp };
      const keyToDelete = keys[actualIndex + index];
      delete newDataForStorage[keyToDelete];
      akun.dataHp = newDataForStorage;
      const kebutuhanSpesifikasiPonsel = akun.kebutuhanSpesifikasi;
      akun = { ...akun };
      kebutuhanSpesifikasiPonsel.forEach((element) => {
        akun[`radio${element}`] = [];
        akun[`select${element}`] = [];
      });
      localStorage.setItem("akun" + urutanAkun, JSON.stringify(akun));
      setReloadEffect((prevState) => !prevState);
      navigate("/dashboard");
    };

    akun.kebutuhanSpesifikasi.forEach((element) => {
      if (akun[`radio${element}`] !== undefined) {
        if (akun[`radio${element}`].length !== 0) {
          cheking = true;
        }
      }
    });

    if (cheking) {
      Swal.fire({
        title: "Yakin?",
        text: `Jika ingin menghapus data, selection dan option akan di riset`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          sintax();
        }
      });
    } else {
      sintax();
    }
  };

  const handleEdit = (index) => {
    const newData = [...TABLE_ROWS];
    newData.splice(actualIndex + index, 1);
    const getAkun = akun.dataHp[actualIndex + index].id;
    return navigate("/editdata/" + getAkun);
  };

  let cekPonsel = true;
  const kretriaAkun = akun.kebutuhanSpesifikasi;
  kretriaAkun.forEach((element) => {
    if (
      akun[`hasilRataRata${element}`] === undefined ||
      akun.hasilRataRata === undefined ||
      akun.hasilRataRata[0].length === 0 ||
      akun[`hasilRataRata${element}`][0].length === 0
    ) {
      cekPonsel = false;
      return;
    }
  });

  const btnCekPonsel = (e) => {
    e.preventDefault();
    if (cekPonsel === true) {
      const kebutuhanSpesifikasi = akun.kebutuhanSpesifikasi;
      const allHasilRataRata = kebutuhanSpesifikasi.map((spec) => {
        const key = akun[`hasilRataRata${spec}`];
        return key || [];
      });
      const rataRata = akun.hasilRataRata.flat();

      function calculateResults(rataRata, allHasilRataRata) {
        const results = [];
        for (let i = 0; i < allHasilRataRata[0].length; i++) {
          let sum = 0;
          for (let j = 0; j < rataRata.length; j++) {
            sum += rataRata[j] * allHasilRataRata[j][i];
          }
          results.push(sum);
        }

        return results;
      }
      const calculatedResults = calculateResults(
        rataRata,
        allHasilRataRata.flat()
      );
      const formattedResults = calculatedResults.map((result) =>
        result.toFixed(3)
      );
      setResults(formattedResults);
      results.forEach((result, index) => {
        console.log(`Hasil perhitungan ${index + 1}: ${result}`);
      });
    } else {
      alert("gagal");
    }
  };

  const dataMerekHp = akun.dataHp; // asumsi dataMerekHp adalah objek
  const brands = Object.values(dataMerekHp); // Mengambil semua nilai dari objek ke dalam array
  
  const uniqueBrands = Array.from(
    new Set(brands.map((brand) => brand.merek.toLowerCase()))
  ).map((merek) => merek.charAt(0).toUpperCase() + merek.slice(1));
  
  console.log(uniqueBrands);

  return (
    <>
      {cekLogin() ? <Navbar /> : null}
      <div
        className={`flex justify-center py-10 bg-slate-900 px-6 pt-[100px] ${
          displayedData.length > 4 ? "items-center" : ""
        } ${results.length > 0 ? "h-full" : "h-screen"}`}
      >
        <Card className="w-full bg-slate-900 text-slate-200 shadow-none">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none bg-slate-900 mt-0 mx-0"
          >
            <div className="mb-0 flex items-center justify-between gap-0">
              <div className="text-slate-200">
                <h5>List smartphone</h5>
              </div>
              <Link to={"/form"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-slate-200 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </Link>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-auto p-0 top-0 px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}{" "}
                        {index !== TABLE_HEAD.length && (
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedData.length === 0 ? (
                  <tr>
                    <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                      Data Kosong
                    </td>
                  </tr>
                ) : (
                  displayedData.map(({ merekHP }, index) => {
                    const isLast = index === displayedData.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    return (
                      <tr key={index}>
                        <td className={`w-2 ${classes}`}>
                          <div className="flex flex-col w-max">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {index + 1}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {merekHP}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={`w-4 ${classes}`}>
                          <div className="flex w-full gap-3 mr-8">
                            <Tooltip content="Edit">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-7 h-7 cursor-pointer"
                                onClick={() => handleEdit(index)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                />
                              </svg>
                            </Tooltip>
                            <Tooltip content="Hapus">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-7 h-7 cursor-pointer"
                                onClick={() => handleDelete(index)}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page {Math.ceil((startIndex + 1) / 5)} of{" "}
              {Math.ceil(TABLE_ROWS.length / 5)}
            </Typography>
            <div className="flex gap-2">
              {/* Tombol "Previous" */}
              <Button
                variant="outlined"
                size="sm"
                className="text-slate-200"
                onClick={handlePreviousClick}
              >
                Previous
              </Button>
              {/* Tombol "Next" */}
              <Button
                variant="outlined"
                size="sm"
                className="text-slate-200"
                onClick={handleNextClick}
              >
                Next
              </Button>
            </div>
          </CardFooter>
          <button
            type="submit"
            onClick={btnCekPonsel}
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[35px] py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-auto 
            ${results.length > 0 ? "mb-4" : "mb-0"}`}
          >
            Cek Ponsel
          </button>
          {results.length > 0 && (
            <PersentaseSelection persentase={results} name={uniqueBrands} />
          )}
        </Card>
      </div>
    </>
  );
};

export default Table;
