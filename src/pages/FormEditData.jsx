import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const FormEditData = () => {
  const navigate = useNavigate();
  const urutanAkun = localStorage.getItem('urutanAkun');
  let akun = JSON.parse(localStorage.getItem('akun' + urutanAkun));
  const { id } = useParams();
  const dataHp = akun.dataHp;
  const [formData, setFormData] = useState({
    merek: '',
    harga: '',
  });

  useEffect(() => {
    for (const key in dataHp) {
      if (Object.hasOwnProperty.call(dataHp, key)) {
        const element = dataHp[key];
        if (element.id === id) {
          setFormData({
            ...element
          });
          break;
        }
      }
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const newData = { ...formData};
  for (const key in dataHp) {
    if (Object.hasOwnProperty.call(dataHp, key)) {
      const element = dataHp[key];
      if (element.id === id) {
        akun.dataHp = {
          ...akun.dataHp,
          [key]: newData,
        };
      }
    }
  }

  localStorage.setItem("akun" + urutanAkun, JSON.stringify(akun));

  setFormData({
    merek: '',
    harga: '',
  });

  Swal.fire({
    icon: "success",
    showConfirmButton: false,
    text: "Berhasil edit data",
    timer: 1500,
    timerProgressBar: true,
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      navigate("/dashboard");
    }
  });
};

  return (
    <div className="bg-slate-900 h-max flex justify-center items-center px-0">
      <form
        onSubmit={handleSubmit}
        className="w-[80%] flex justify-center flex-col h-screen gap-7 mt-[64px]"
      >
        <h1 className="mb-10 font-bold text-slate-200 text-2xl text-center">
          Masukan data ponsel
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
            prefix={"Rp. "}
            allowNegative={false}
            allowLeadingZeros={false}
            decimalScale={1}
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

export default FormEditData;