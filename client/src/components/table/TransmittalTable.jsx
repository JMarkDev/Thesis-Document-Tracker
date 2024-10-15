import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useFormat } from "../../hooks/useFormatDate";
import NoData from "../NoData";

const Table = ({ documents, contentRef, campus }) => {
  const { dateFormat } = useFormat();
  const navigate = useNavigate();

  return (
    <>
      {documents.length === 0 ? (
        <NoData />
      ) : (
        <div
          ref={contentRef}
          className="relative overflow-x-auto  shadow-md sm:rounded-lg"
        >
          <h2 className="font-bold text-gray-700 mb-5 text-sm">
            Document Transmittal {campus}
          </h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-[10px]  text-gray-700 text-center uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-2 whitespace-nowrap">
                  <div className="flex px-4 items-center  whitespace-nowrap">
                    TRACKING NUMBER
                  </div>
                </th>
                <th scope="col" className="p-2">
                  <div className="flex items-center  whitespace-nowrap">
                    DOCUMENT NAME
                  </div>
                </th>

                <th scope="col" className="p-2">
                  <div className="flex items-center  whitespace-nowrap">
                    UPLOADED BY
                  </div>
                </th>
                <th scope="col" className="p-2">
                  <div className="flex items-center  whitespace-nowrap">
                    CONTACT NUMBER
                  </div>
                </th>

                <th scope="col" className="p-2 ">
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
                    uploaded_by,
                    contact_number,
                    createdAt,
                  },
                  index
                ) => (
                  <tr
                    onClick={() => navigate(`/document-details/${id}`)}
                    key={index}
                    className="bg-white text-[12px] dark:bg-gray-800 hover:bg-gray-200 cursor-pointer"
                  >
                    <td className="p-2 pl-6 whitespace-nowrap">
                      {tracking_number}
                    </td>
                    <td className="p-2 whitespace-nowrap">{document_name}</td>

                    <td className="p-2 whitespace-nowrap">{uploaded_by}</td>
                    <td className="p-2 whitespace-nowrap">{contact_number}</td>

                    <td className="p-2 w-5  whitespace-nowrap">
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
  contentRef: PropTypes.object,
  campus: PropTypes.string,
};

export default Table;
