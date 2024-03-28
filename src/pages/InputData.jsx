import { NumericFormat } from "react-number-format";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormInputData = () => {
  const [formData, setFormData] = useState({
    merek: "",
    harga: "",
    ram: "",
    rom: "",
    display: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const urutanAkun = localStorage.getItem("urutanAkun");
    const akun = JSON.parse(localStorage.getItem("akun" + urutanAkun));
    const id = uuidv4();
  
    const newData = { ...formData };

    akun.dataHp = {
      ...akun.dataHp,
      [id]: newData
    };
    localStorage.setItem("akun" + urutanAkun, JSON.stringify(akun));
    setFormData({
      merek: "",
      harga: "",
      ram: "",
      rom: "",
      display: "",
    });
    return Swal.fire({
      icon: "success",
      showConfirmButton: false,
      text: "Berhasil ditambahkan!",
      timer: 1500,
      timerProgressBar: true,
    });
  };

  return (
    <div className="bg-slate-900 flex justify-center items-center px-0 py-0 h-screen pt-[64px]">
      <form onSubmit={handleSubmit} className="w-[80%] flex justify-center flex-col">
        <h1 className="mb-5 mt-0 font-bold text-slate-200 text-xl text-center">
          Masukan Spesifikasi ponsel
        </h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="merek"
            id="merek"
            className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            autoComplete="off"
            required
            onChange={handleChange}
            value={formData.merek}
          />
          <label
            htmlFor="merek"
            id="merek"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Merek HP
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <NumericFormat
            thousandSeparator={true}
            prefix={"Rp "}
            allowNegative={false}
            allowLeadingZeros={false}
            decimalScale={0}
            format="###,###"
            mask="_"
            name="harga"
            id="harga"
            placeholder=" "
            autoComplete="off"
            required
            onChange={handleChange}
            value={formData.harga}
            className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            htmlFor="harga"
            id="harga"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Harga
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="ram"
            id="ram"
            className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            autoComplete="off"
            required
            value={formData.ram}
            onChange={handleChange}
          />
          <label
            htmlFor="ram"
            id="ram"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            RAM
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="number"
            name="rom"
            id="rom"
            className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            autoComplete="off"
            required
            value={formData.rom}
            onChange={handleChange}
          />
          <label
            htmlFor="rom"
            id="rom"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            ROM
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="display"
            id="display"
            className="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            autoComplete="off"
            required
            value={formData.display}
            onChange={handleChange}
          />
          <label
            htmlFor="display"
            id="display"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Display
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[35px] py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormInputData;
