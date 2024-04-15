import { Card, Typography, CardBody } from "@material-tailwind/react";
import PersentaseSelection from "../component/PersentaseSelection";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const TableSelection = () => {
  const dataKretariaPonsel = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("urutanAkun") === null) {
      return navigate("/dashboard");
    }
  });

  const urutanAkun = localStorage.getItem("urutanAkun");
  const akun = JSON.parse(localStorage.getItem("akun" + urutanAkun));

  if (urutanAkun !== null) {
    const radio = akun[Object.keys(dataKretariaPonsel).length !== 0 ? `radio${dataKretariaPonsel.kretaria}` : 'radio'];
    const select = akun[Object.keys(dataKretariaPonsel).length !== 0 ? `select${dataKretariaPonsel.kretaria}` : 'select'];
    if (radio !== undefined) {
      const data = radio.map((item, i) => {
        const skala = parseInt(select[i].value.match(/\d+/)[0]);
        return { ...item, skala };
      });

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


      const hasilBagi = matrix.map((row, rowIndex) => {
        return row.map((elemen, colIndex) => {
          return elemen / totalIndex[colIndex];
        });
      });


      const hasilAkhir = hasilBagi.map((baris) => {
        const totalPerBaris = baris.reduce((total, nilai) => total + nilai, 0);
        return totalPerBaris / baris.length;
      });

      console.log(hasilAkhir)

      const totalPersentase = hasilAkhir.reduce((acc, curr) => acc + curr, 0);
      const percentages = hasilAkhir.map((value) =>
        parseFloat(((value / totalPersentase) * 100).toFixed(1))
      );

      const hasilBagi2 = matrix.map((row, rowIndex) => {
        return row.map((elemen, colIndex) => {
          return elemen * hasilAkhir[colIndex];
        });
      });

      const hasilAkhir2 = hasilBagi2.map((baris) => {
        return baris.reduce((total, nilai) => total + nilai, 0);
      });

      const hasilBagi3 = hasilAkhir2.map(
        (nilai, index) => nilai / hasilAkhir[index]
      );

      const total = hasilBagi3.reduce((acc, curr) => acc + curr, 0);

      const rataRata = total / hasilBagi3.length;

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

      return (
        <>
          {options.length !== 0 ? (
            <div className="my-10 w-[90%]">
              <Card className="w-full mb-10 bg-slate-900 text-slate-200 shadow-none">
                <CardBody className="overflow-x-auto p-0 top-0 px-0">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        <th className="cursor-pointer border-y-2 border-blue-gray-100 bg-blue-gray-50/50 transition-colors hover:bg-blue-gray-50">
                          <span className="ml-4">Krearia</span>
                        </th>
                        {options.map((head, index) => (
                          <th
                            key={head}
                            className="cursor-pointer border-y-2 border-blue-gray-100 bg-blue-gray-50/50 transition-colors hover:bg-blue-gray-50"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="flex items-center justify-center bg-blue-gray-50/50 p-4 font-medium"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {options.map((head, rowIndex) => (
                        <tr key={head}>
                          <td className="border-b border-blue-gray-100 bg-blue-gray-50/50 p-4 font-medium">
                            {head}
                          </td>
                          {options.map((col, colIndex) => (
                            <td
                              key={col}
                              className="border-b border-blue-gray-100 bg-blue-gray-50/50 py-4 text-center"
                            >
                              {matrix[rowIndex][colIndex].toFixed(2)}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr className="border-b border-blue-gray-100 bg-blue-gray-50/50">
                        <td className="p-4 font-bold">CR</td>
                        <td className="p-4 absolute right-0 text-right font-bold">
                          {CR.toFixed(4)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
              <PersentaseSelection persentase={percentages} name={options} />
            </div>
          ) : (
            ""
          )}
        </>
      );
    }
  }
};

function createComparisonMatrix(data) {
  // console.log(data);
  // Mengumpulkan semua opsi yang ada dalam data
  const options = Array.from(
    new Set(data.flatMap((item) => [item.option1, item.option2]))
  );

  // Inisialisasi matriks dengan ukuran yang sesuai
  const matrix = Array.from({ length: options.length }, () =>
    Array.from({ length: options.length }, () => 1)
  );

  // Mengisi matriks dengan rasio yang sesuai berdasarkan pilihan pengguna
  data.forEach(({ option1, option2, value, skala }) => {
    const index1 = options.indexOf(option1);
    const index2 = options.indexOf(option2);
    // console.log(option1, option2, value)

    // Menentukan rasio berdasarkan pilihan pengguna
    let ratio;
    if (value === option1) {
      ratio = skala;
    } else if (value === option2) {
      ratio = 1 / skala;
    } else {
      console.error(`Value tidak valid: ${value}`);
      return;
    }

    // Mengisi matriks dengan rasio yang sesuai
    matrix[index1][index2] = ratio;
    matrix[index2][index1] = 1 / ratio;
    // console.log(matrix[index1][index2], ratio , "Yang dipih user", value === option1 ? value : option2)
    // console.log(matrix[index2][index1], 1 / ratio, "Yang tidak", value !== option1 ? value : option2)
  });

  // Mengatur nilai diagonal utama matriks menjadi 1
  for (let i = 0; i < options.length; i++) {
    matrix[i][i] = 1;
  }

  return { options, matrix };
}

export default TableSelection;
