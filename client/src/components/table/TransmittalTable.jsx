import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useFormat } from "../../hooks/useFormatDate";
import NoData from "../NoData";

const Table = ({ documents }) => {
  const { dateFormat } = useFormat();
  const navigate = useNavigate();

  return (
    <>
      {documents.length === 0 ? (
        <NoData />
      ) : (
        <div className="relative overflow-x-auto  shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center  whitespace-nowrap">
                    TRACKING NUMBER
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    DOCUMENT NAME
                  </div>
                </th>

                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    DOCUMENT TYPE
                  </div>
                </th>

                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    UPLOADED BY
                  </div>
                </th>

                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center  whitespace-nowrap">
                    DATE
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {documents?.map(
                (
                  {
                    id,
                    tracking_number,
                    document_name,
                    document_type,
                    // file_type,
                    uploaded_by,
                    createdAt,
                  },
                  index
                ) => (
                  <tr
                    onClick={() => navigate(`/document-details/${id}`)}
                    key={index}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-200 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tracking_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {document_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {document_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {uploaded_by}
                    </td>

                    <td className="px-6 w-5 py-4 whitespace-nowrap">
                      {" "}
                      {dateFormat(createdAt)}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

Table.propTypes = {
  documents: PropTypes.array.isRequired,
  handleSort: PropTypes.func,
};

export default Table;
