import LineChartAdmin from "../../../components/charts/LineChartAdmin";
import YearDropdown from "../../../components/dropdown/Dropdown";

const EsuReports = () => {
  const year = [2024, 2025, 2026, 2027];

  // Sample document names
  const documentNames = [
    "Document Sample",
    "Document B",
    "Document C",
    "Document D",
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between lg:flex-row flex-col gap-5 ">
        <div className="w-full bg-white">
          <div className="flex p-2 bg-gray-400 justify-between items-center">
            <h1 className="font-bold">Document Reports</h1>
            <YearDropdown data={year} option={year[0]} />
          </div>
          <LineChartAdmin />
        </div>

        <div className="min-w-[350px] p-2 bg-white rounded-md shadow-lg">
          <div className="relative overflow-x-auto ">
            <button className="absolute right-0 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-all">
              Download
            </button>
            <h2 className="font-semibold text-lg mb-4">Document List</h2>

            <table className="w-full text-sm text-left text-gray-600">
              <tbody>
                {documentNames.map((doc, index) => (
                  <tr
                    key={index}
                    className="bg-gray-100 border-b hover:bg-gray-200 transition-colors"
                  >
                    <th
                      scope="row"
                      className="p-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {doc}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-between  mt-10 lg:flex-row flex-col gap-5 ">
        <div className="w-full bg-white">
          <div className="flex p-2 bg-gray-400 justify-between items-center">
            <h1 className="font-bold">Document Type Reports</h1>
            <YearDropdown data={year} option={year[0]} />
          </div>
          <LineChartAdmin />
        </div>

        <div className="min-w-[350px] p-2 bg-white rounded-md shadow-lg">
          <div className="relative overflow-x-auto ">
            <button className="absolute right-0 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-all">
              Download
            </button>
            <h2 className="font-semibold text-lg mb-4">Document List</h2>

            <table className="w-full text-sm text-left text-gray-600">
              <tbody>
                {documentNames.map((doc, index) => (
                  <tr
                    key={index}
                    className="bg-gray-100 border-b hover:bg-gray-200 transition-colors"
                  >
                    <th
                      scope="row"
                      className="p-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {doc}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EsuReports;
