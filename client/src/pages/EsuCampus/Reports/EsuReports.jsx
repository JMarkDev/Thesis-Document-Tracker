import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LineChartAdmin from "../../../components/charts/LineChartAdmin";
import YearDropdown from "../../../components/dropdown/YearDropdown";
import {
  getDataByYear,
  fetchDataEsuByYear,
  getReportsDocumentByESU,
  fetchReportEsuByYear,
} from "../../../services/analyticsSlice";
import { getAllDocuments } from "../../../services/documentSlice";
import LineChartDocumentSubmissions from "../../../components/charts/LineChartDocumentSubmissions";
import { useFormat } from "../../../hooks/useFormatDate";
import { getUserData } from "../../../services/authSlice";

const EsuReports = () => {
  const { fullDateFormat } = useFormat();
  const dispatch = useDispatch();
  const user = useSelector(getUserData);
  const documents = useSelector(getReportsDocumentByESU);
  const filterDocuments = useSelector(getAllDocuments);
  const dataByYear = useSelector(getDataByYear);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (user?.esuCampus && year) {
      // Fetch data for the selected year only
      dispatch(
        fetchReportEsuByYear({
          esuCampus: `${user?.esuCampus}`,
          year: year,
        })
      );

      dispatch(
        fetchDataEsuByYear({
          esuCampus: `${user?.esuCampus}`,
          year: year, // Use selected year instead of the current year
        })
      );
    }
  }, [dispatch, year, user]);

  console.log(documents);

  const filterByYear = (selected) => {
    setYear(selected);
    // dispatch(fetchDataByYear(selected));
    dispatch(
      fetchReportEsuByYear({
        esuCampus: `${user?.esuCampus}`,
        year: selected,
      })
    );

    dispatch(
      fetchDataEsuByYear({
        esuCampus: `${user?.esuCampus}`,
        year: selected,
      })
    );
  };

  const downloadPdf = (data) => {
    const headers = [
      "Tracking Number",
      "Document Name",
      "Uploaded By",
      "Contact Number",
      "ESU Campus",
      "Date Submitted",
    ];

    const formatFieldCsv = (field) => {
      if (/[,]/.test(field)) {
        return `"${field}"`;
      }

      return field;
    };

    const dataRows = data.map((response) => {
      return [
        formatFieldCsv(response.tracking_number),
        formatFieldCsv(response.document_name),
        formatFieldCsv(response.uploaded_by),
        formatFieldCsv(response.contact_number),
        formatFieldCsv(response.esuCampus),
        formatFieldCsv(fullDateFormat(response.createdAt)),
      ];
    });

    const csvContent = [headers, ...dataRows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Documents_uploaded.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between  lg:flex-row flex-col gap-5 ">
        <div className="w-full bg-white">
          <div className="flex p-2 bg-gray-300 justify-between items-center">
            <h1 className="font-bold">Document Reports</h1>
            <YearDropdown handleFilter={filterByYear} />
          </div>
          <LineChartAdmin data={dataByYear} />
        </div>

        <div className="min-w-[350px] h-[400px] overflow-y-auto p-2 bg-white rounded-md shadow-lg">
          <div className="relative overflow-x-auto ">
            <button
              onClick={() => downloadPdf(documents)}
              className="absolute right-0 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-all"
            >
              Download
            </button>
            <h2 className="font-semibold text-lg mb-4">Filtered Documents</h2>

            {documents?.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-500">No documents found</p>
              </div>
            ) : (
              <>
                <table className="w-full  text-sm text-left text-gray-600">
                  <tbody>
                    {documents.map(({ document_name, id }) => (
                      <tr
                        key={id}
                        className="bg-gray-100 border-b hover:bg-gray-200 transition-colors"
                      >
                        <th
                          scope="row"
                          className="p-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {document_name}
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex mt-10 justify-between lg:flex-row flex-col gap-5 ">
        <div className="w-full bg-white">
          <div className="flex p-2 bg-gray-300 justify-between items-center">
            <h1 className="font-bold">Document Submissions Charts</h1>
          </div>
          <LineChartDocumentSubmissions data={filterDocuments} />
        </div>

        <div className="min-w-[350px] h-[400px] overflow-y-auto  p-2 bg-white rounded-md shadow-lg">
          <div className="relative overflow-x-auto ">
            <button
              onClick={() => downloadPdf(filterDocuments)}
              className="absolute right-0 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-all"
            >
              Download
            </button>
            <h2 className="font-semibold text-lg mb-4">Filtered Documents</h2>

            {filterDocuments.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-500">No documents found</p>
              </div>
            ) : (
              <table className="w-full  text-sm text-left text-gray-600">
                <tbody>
                  {filterDocuments.map(({ document_name, id }) => (
                    <tr
                      key={id}
                      className="bg-gray-100 border-b hover:bg-gray-200 transition-colors"
                    >
                      <th
                        scope="row"
                        className="p-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {document_name}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EsuReports;
