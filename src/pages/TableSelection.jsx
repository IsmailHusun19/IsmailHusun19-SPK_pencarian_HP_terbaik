import { faToiletPaperSlash } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const TableSelection = () => {
  const urutanAkun = localStorage.getItem("urutanAkun");
  const akun = JSON.parse(localStorage.getItem("akun" + urutanAkun));
  const select = akun.select
  const radio = akun.radio;

const data = radio.map((item, index) => {
    const skala = parseInt(select[index].value.match(/\d+/)[0]);
    return {...item, skala};
});

console.log(data)

  const { options, matrix } = createComparisonMatrix(data);

  const totalIndex = [];
  const totalMatrix = (a) => {
    let totalPerIndex = 0;
    matrix.forEach((row) => {
      totalPerIndex += row[a];
    });
    return parseFloat(totalPerIndex.toFixed(3));
  };

  matrix.forEach((data, index) => {
    totalIndex.push(totalMatrix(index));
  });

  console.log("Total Matriks", totalIndex);

  const hasilBagi = matrix.map((row, rowIndex) => {
    return row.map((elemen, colIndex) => {
      return elemen / totalIndex[colIndex];
    });
  });

  console.log("Hasil Pembagian:", hasilBagi);

  const hasilAkhir = hasilBagi.map((baris) => {
    const totalPerBaris = baris.reduce((total, nilai) => total + nilai, 0);
    return totalPerBaris / baris.length;
  });

  console.log("Hasil Akhir:", hasilAkhir);

  const hasilBagi2 = matrix.map((row, rowIndex) => {
    return row.map((elemen, colIndex) => {
      return elemen * hasilAkhir[colIndex];
    });
  });

  console.log("Hasil Pembagian2:", hasilBagi2);

  const hasilAkhir2 = hasilBagi2.map((baris) => {
    return baris.reduce((total, nilai) => total + nilai, 0);
  });

  console.log("Hasil Akhir2:", hasilAkhir2);

  const hasilBagi3 = hasilAkhir2.map(
    (nilai, index) => nilai / hasilAkhir[index]
  );
  console.log("Hasil Pembagian3:", hasilBagi3);

  const total = hasilBagi3.reduce((acc, curr) => acc + curr, 0);

  const rataRata = total / hasilBagi3.length;

  console.log("Rata-rata:", rataRata);

  const CI = (rataRata - matrix.length) / (matrix.length - 1);
  let IR = 0;

  if (matrix.length === 2) {
    IR = 0.0;
  } else if (matrix.length === 3) {
    IR = 0.58;
  } else if (matrix.length === 4) {
    IR = 0.9;
  } else if (matrix.length === 5) {
    IR = 1.12;
  } else if (matrix.length === 6) {
    IR = 1.24;
  } else if (matrix.length === 7) {
    IR = 1.32;
  } else if (matrix.length === 8) {
    IR = 1.41;
  } else if (matrix.length === 9) {
    IR = 1.45;
  } else {
    IR = 1.49;
  }

  const CR = CI / IR;
  console.log("CR-rata:", CR.toFixed(4));

  return (
    <div>
      <h2>Matriks Perbandingan</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            {options.map((option, index) => (
              <th key={index}>{option}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{options[rowIndex]}</td>
              {row.map((value, colIndex) => (
                <td key={colIndex}>{value.toFixed(2)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h1>{CR.toFixed(4)}</h1>
    </div>
  );
};

// Function to create comparison matrix
function createComparisonMatrix(data) {
  const options = Array.from(
    new Set(data.flatMap((item) => [item.option1, item.option2]))
  );
  const matrix = Array.from({ length: options.length }, () =>
    Array.from({ length: options.length }, () => 1)
  );

  data.forEach(({ option1, option2, value, skala }) => {
    const index1 = options.indexOf(option1);
    const index2 = options.indexOf(option2);
    const ratio = value === option1 ? skala : 1 / skala;
    matrix[index1][index2] = ratio;
    matrix[index2][index1] = 1 / ratio;
  });

  return { options, matrix };
}

export default TableSelection;
