import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LineChartAdmin from "../../../components/charts/LineChartAdmin";
import YearDropdown from "../../../components/dropdown/YearDropdown";
import {
  fetchReportsByYear,
  getReportsByYear,
  fetchDataByYear,
  fetchFacultyDataByYear,
  getFacultyDataByYear,
} from "../../../services/analyticsSlice";
import { useFormat } from "../../../hooks/useFormatDate";
import { getUserData } from "../../../services/authSlice";
import LineChartDocumentSubmissions from "../../../components/charts/LineChartDocumentSubmissions";

const FacultyReports = () => {
  const { dateFormat } = useFormat();
  const dispatch = useDispatch();
  const documents = useSelector(getReportsByYear);
  const [year, setYear] = useState(new Date().getFullYear());
  const user = useSelector(getUserData);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const data = useSelector(getFacultyDataByYear);

  useEffect(() => {
    const filterByUser = documents.filter((doc) => doc.user_id === user.id);
    setFilteredDocuments(filterByUser);
  }, [documents, user]);

  useEffect(() => {
    dispatch(fetchReportsByYear(year));
    if (user.id) {
      dispatch(fetchFacultyDataByYear({ user_id: user.id, year: year }));
    }
  }, [dispatch, year, user]);

  const filterByYear = (selected) => {
    setYear(selected);
    dispatch(fetchFacultyDataByYear({ user_id: user.id, year: selected }));
    dispatch(fetchDataByYear(selected));
  };

  const downloadPdf = (data) => {
    const headers = [
      "Tracking Number",
      "Document Name",
      "Document Type",
      "Uploaded By",
      "Contact Number",
      "ESU Campus",
      "Date And Time Submitted",
    ];

    const formatFieldCsv = (field) => {
      if (/[,]/.test(field)) {
        return `"${field}"`;
      }

      return field;
    };

    const dataRows = data?.map((response) => {
      return [
        formatFieldCsv(response.tracking_number),
        formatFieldCsv(response.document_name),
        formatFieldCsv(response.document_type),
        formatFieldCsv(response.uploaded_by),
        formatFieldCsv(response.contact_number),
        formatFieldCsv(response.esuCampus),
        formatFieldCsv(dateFormat(response.createdAt)),
      ];
    });

    const csvContent = [headers, ...dataRows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Documents_Reports.csv";
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
          <LineChartAdmin data={data} />
        </div>

        <div className="min-w-[350px] h-[400px] overflow-y-auto p-2 bg-white rounded-md shadow-lg">
          <div className="relative overflow-x-auto ">
            <button
              onClick={() => downloadPdf(filteredDocuments)}
              className="absolute right-0 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-all"
            >
              Download
            </button>
            <h2 className="font-semibold text-lg mb-4">Filtered Documents</h2>

            {filteredDocuments?.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-500">No documents found</p>
              </div>
            ) : (
              <>
                <table className="w-full  text-sm text-left text-gray-600">
                  <tbody>
                    {filteredDocuments?.map(({ document_name, id }) => (
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
          <div className="max-w-[650px]">
            <LineChartDocumentSubmissions data={filteredDocuments} />
          </div>
        </div>

        <div className="min-w-[350px] h-[400px] overflow-y-auto  p-2 bg-white rounded-md shadow-lg">
          <div className="relative overflow-x-auto ">
            <button
              onClick={() => downloadPdf(filteredDocuments)}
              className="absolute right-0 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-all"
            >
              Download
            </button>
            <h2 className="font-semibold text-lg mb-4">Filtered Documents</h2>

            {filteredDocuments?.length === 0 ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-gray-500">No documents found</p>
              </div>
            ) : (
              <table className="w-full  text-sm text-left text-gray-600">
                <tbody>
                  {filteredDocuments?.map(({ document_name, id }) => (
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

export default FacultyReports;
