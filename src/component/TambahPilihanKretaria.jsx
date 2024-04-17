import { useState, useEffect } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Card, Typography, CardBody } from "@material-tailwind/react";
import { Tooltip } from "flowbite-react";
import Swal from "sweetalert2";
import Navbar from "./Navbar";

const TABLE_HEAD = ["No", "Spesifikasi", "Aksi"];

const TambahPilihanKretaria = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("urutanAkun") === null) {
      navigate("/dashboard");
    }
  }, []);
  const cekLogin = () => {
    return localStorage.getItem("urutanAkun") !== null ? true : false;
  };

  if (localStorage.getItem("urutanAkun") !== null) {
    const urutanAkun = localStorage.getItem("urutanAkun");
    const akunData = JSON.parse(localStorage.getItem("akun" + urutanAkun));
    const [data, setData] = useState({
      kebutuhanSpesifikasi: akunData.kebutuhanSpesifikasi,
    });
    const [dataTambah, setDataTambah] = useState("");

    const handleChange = (e) => {
      const newValue = e.target.value;
      setDataTambah(newValue);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (dataTambah.trim() !== "") {
        if (akunData.select.length !== 0) {
          Swal.fire({
            title: "Yakin?",
            text: `Jika ingin menambah data, selection akan di riset`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.isConfirmed) {
              setData((prevData) => {
                return {
                  ...prevData,
                  kebutuhanSpesifikasi:
                    prevData.kebutuhanSpesifikasi.concat(dataTambah),
                };
              });
              const updatedAkun = {
                ...akunData,
                radio: [],
                select: [],
                [`radio${dataTambah}`]: [],
                [`select${dataTambah}`]: [],
                kebutuhanSpesifikasi:
                  data.kebutuhanSpesifikasi.concat(dataTambah),
              };
              localStorage.setItem(
                "akun" + urutanAkun,
                JSON.stringify(updatedAkun)
              );
            }
          });
        } else {
          setData((prevData) => {
            return {
              ...prevData,
              kebutuhanSpesifikasi:
                prevData.kebutuhanSpesifikasi.concat(dataTambah),
            };
          });
          const updatedAkun = {
            ...akunData,
            radio: [],
            select: [],
            [`radio${dataTambah}`]: [],
            [`select${dataTambah}`]: [],
            kebutuhanSpesifikasi: data.kebutuhanSpesifikasi.concat(dataTambah),
          };
          localStorage.setItem(
            "akun" + urutanAkun,
            JSON.stringify(updatedAkun)
          );
        }
        setDataTambah("");
        navigate("/tambahkretaria");
      }
    };

    const handleDelete = (index) => {
      if (index > 2) {
        if (akunData.select.length !== 0) {
          Swal.fire({
            title: "Yakin?",
            text: `Jika ingin menghapus ${data.kebutuhanSpesifikasi[index]}, selection akan di riset`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.isConfirmed) {
              const newData = [...data.kebutuhanSpesifikasi];
              let updatedAkun = { ...akunData };
              delete updatedAkun[`radio${newData[index]}`];
              delete updatedAkun[`select${newData[index]}`];
              console.log(updatedAkun);
              newData.splice(index, 1);
              setData({
                kebutuhanSpesifikasi: newData,
              });
              updatedAkun = {
                ...updatedAkun,
                radio: [],
                select: [],
                kebutuhanSpesifikasi: newData,
              };
              localStorage.setItem(
                "akun" + urutanAkun,
                JSON.stringify(updatedAkun)
              );
            }
          });
        } else {
          const newData = [...data.kebutuhanSpesifikasi];
          let updatedAkun = { ...akunData };
          delete updatedAkun[`radio${newData[index]}`];
          delete updatedAkun[`select${newData[index]}`];
          console.log(updatedAkun);
          newData.splice(index, 1);
          setData({
            kebutuhanSpesifikasi: newData,
          });
          updatedAkun = {
            ...updatedAkun,
            radio: [],
            select: [],
            kebutuhanSpesifikasi: newData,
          };
          localStorage.setItem(
            "akun" + urutanAkun,
            JSON.stringify(updatedAkun)
          );
        }
        navigate("/tambahkretaria");
      } else {
        return Swal.fire({
          icon: "error",
          showConfirmButton: false,
          text: `Maaf ${data.kebutuhanSpesifikasi[index]} tidak bisa dihapus`,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    };

    return (
      <>
        {cekLogin() ? <Navbar /> : null}
        <div className="bg-slate-900 flex justify-center items-center px-0 flex-col">
          <form
            onSubmit={handleSubmit}
            className="w-[80%] flex justify-center flex-col gap-7 mt-[120px]"
          >
            <h1 className="mb-10 font-bold text-slate-200 text-2xl text-center">
              Masukan kreteria perbandingan
            </h1>
            <div className="relative z-0 w-full mb-5 group mt-10">
              <input
                type="text"
                name="merek"
                id="merek"
                className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                autoComplete="off"
                required
                onChange={handleChange}
                value={dataTambah}
              />
              <label
                htmlFor="merek"
                id="merek"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Kretaria
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[35px] py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-auto"
            >
              Submit
            </button>
          </form>
          {data.kebutuhanSpesifikasi.length !== 0 ? (
            <div className="my-10 w-[90%]">
              <Card className="w-full mb-10 bg-slate-900 text-slate-200 shadow-none">
                <CardBody className="overflow-x-auto p-0 top-0 px-0">
                  <table className="w-full min-w-max table-auto text-left">
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
                      {data.kebutuhanSpesifikasi.map((items, index) => {
                        const isLast =
                          index === data.kebutuhanSpesifikasi.length - 1;
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
                                    {items}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className={`w-4 ${classes}`}>
                              <div className="flex w-full gap-3 mr-8">
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
                      })}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
};

export default TambahPilihanKretaria;
