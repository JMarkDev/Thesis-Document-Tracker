import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDesignation } from "../../services/designationSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  getAllWorkflow,
  fetchAllWorkflow,
} from "../../services/documentWolkflowSlice";

const ChartByDocumentType = ({ data }) => {
  const dispatch = useDispatch();
  const { designationList } = useSelector((state) => state.designation);
  const workflow = useSelector(getAllWorkflow);

  const [selectedYear, setSelectedYear] = useState(""); // Default to no year selected
  const [selectedMonth, setSelectedMonth] = useState(""); // Default to no month selected
  const [selectedDesignation, setSelectedDesignation] = useState(""); // Default to all designations
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(fetchDesignation());
    dispatch(fetchAllWorkflow());
  }, [dispatch]);

  // Function to normalize designations
  const normalizeDesignation = (designation) => {
    const designationMapping = {
      "Campus Admin": "Campus Administrator", // Add more mappings if needed
    };
    return designationMapping[designation] || designation;
  };

  useEffect(() => {
    // Extract all unique document types from the workflow data
    const allDocumentTypes = Array.from(
      new Set(workflow.map((item) => item.document_type))
    );

    // Create a mapping of document types with initial count of zero
    const initialCounts = allDocumentTypes.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {});

    // Filter the original data based on selected year, month, and designation
    const filtered = data?.filter((item) => {
      const createdDate = new Date(item.createdAt);
      const itemYear = createdDate.getFullYear().toString();
      const itemMonth = (createdDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const matchesYear = selectedYear === "" || itemYear === selectedYear;
      const matchesMonth = selectedMonth === "" || itemMonth === selectedMonth;

      // Normalize and match designations
      const normalizedSelectedDesignation =
        normalizeDesignation(selectedDesignation);
      const normalizedItemDesignation = normalizeDesignation(item.designation);

      const matchesDesignation =
        normalizedSelectedDesignation === "" ||
        normalizedItemDesignation.includes(normalizedSelectedDesignation);

      return matchesYear && matchesMonth && matchesDesignation;
    });

    // Count occurrences of document types in the filtered data
    const countsByDocumentType = filtered.reduce(
      (acc, item) => {
        acc[item.document_type] = (acc[item.document_type] || 0) + 1;
        return acc;
      },
      { ...initialCounts }
    );

    // Prepare the chart data
    const chartData = Object.entries(countsByDocumentType).map(
      ([type, count]) => ({
        document_type: type,
        count,
      })
    );

    setFilteredData(chartData);
  }, [data, workflow, selectedYear, selectedMonth, selectedDesignation]);

  // Generate year options dynamically
  const yearOptions = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

  // Month options
  const monthOptions = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const truncateCampusNames = (name, length) => {
    return name.length > length ? `${name.slice(0, length)}...` : name;
  };

  return (
    <div className="w-full overflow-x-auto shadow-xl mt-4">
      <div className="flex items-center gap-4 mb-4 justify-end">
        {/* Month Dropdown */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Month</option>
          {monthOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Year</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Designation Dropdown */}
        <select
          value={selectedDesignation}
          onChange={(e) => setSelectedDesignation(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Designations</option>
          {designationList.map((designation) => (
            <option key={designation.id} value={designation.name}>
              {designation.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={filteredData}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 100, // Increased bottom margin to give more space for slanted labels
          }}
        >
          <CartesianGrid strokeDasharray="6 6" />
          <XAxis
            dataKey="document_type"
            tick={{ angle: -45, textAnchor: "end", fontSize: 14 }} // Slanted labels
            interval={0} // Ensures all labels are shown
            tickFormatter={(name) => truncateCampusNames(name, 20)} // Adjust truncation length if needed
          />
          <YAxis width={24} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartByDocumentType;
