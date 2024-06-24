import { useEffect, useState } from "react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const documentData = [
  {
    officeID: "00-OFFICE",
    officeName: "ESU Registrar",
    date: "2024-06-06",
  },
  {
    officeID: "01-OFFICE",
    officeName: "OIC Dean of ESU Office",
    date: "2024-06-20",
  },
  {
    officeID: "02-OFFICE",
    officeName: "Vice President For Academic Affairs Office",
    date: "2024-06-20",
  },
  {
    officeID: "03-OFFICE",
    officeName: "Human Resource Office)",
    date: "2024-06-20",
  },
  {
    officeID: "04-OFFICE",
    officeName: "Accounting Office)",
    date: "2024-06-20",
  },
  {
    officeID: "05-OFFICE",
    officeName: "Records Office)",
    date: "2024-06-20",
  },
];

const Office = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(documentData);
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                <div className="flex items-center  whitespace-nowrap">
                  OFFICE ID
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center  whitespace-nowrap">
                  OFFICE NAME
                </div>
              </th>

              <th scope="col" className="px-6 py-3">
                <div className="flex items-center  whitespace-nowrap">DATE</div>
              </th>
              <th scope="col" className="px-6 py-3 ">
                <div className="flex items-center justify-center  whitespace-nowrap">
                  ACTION
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ officeID, officeName, date }, index) => (
              <tr
                key={index}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {officeID}
                </th>

                <td className="px-6 py-4 whitespace-nowrap">{officeName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{date}</td>
                <td className="px-6 py-4 flex gap-3 justify-center items-center">
                  <Link
                    to={`/documents/${officeID}`}
                    className="px-4 py-2 text-lg bg-[#fca326] hover:bg-[#f58e40] text-white rounded-lg"
                  >
                    <FaEye className="h-5 w-5" />
                  </Link>

                  <button className="px-4 py-2 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    <FaRegEdit className="h-5 w-5" />
                  </button>
                  <button className="px-4 py-2 text-lg bg-red-600 hover:bg-red-700 text-white rounded-lg">
                    <MdDelete className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Office;
