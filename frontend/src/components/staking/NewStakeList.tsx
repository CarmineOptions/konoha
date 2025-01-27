import React, { useState, ChangeEvent } from "react";

interface DataRow {
  id: string;
  status: string;
  name: string;
  time: string;
}

const data: DataRow[] = [
  {
    id: "KON-00001",
    status: "Open",
    name: "[FIXED] Technical Omnibus 3",
    time: "24 hours",
  },
  {
    id: "KON-00001",
    status: "Open",
    name: "[FIXED] Technical Omnibus 3",
    time: "24 hours",
  },
  {
    id: "KON-00001",
    status: "Open",
    name: "[FIXED] Technical Omnibus 3",
    time: "24 hours",
  },
  {
    id: "KON-00001",
    status: "Open",
    name: "[FIXED] Technical Omnibus 3",
    time: "24 hours",
  },
  {
    id: "KON-00001",
    status: "Open",
    name: "[FIXED] Technical Omnibus 3",
    time: "24 hours",
  },
  {
    id: "KON-00001",
    status: "Open",
    name: "[FIXED] Technical Omnibus 3",
    time: "24 hours",
  },
  {
    id: "KON-00001",
    status: "Open",
    name: "[FIXED] Technical Omnibus 3",
    time: "24 hours",
  },
  {
    id: "KON-00001",
    status: "Open",
    name: "[FIXED] Technical Omnibus 3",
    time: "24 hours",
  },
];

const NewStakeList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 3;

  // Filter the data based on the search query
  const filteredData = data.filter(
    (row) =>
      row.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.time.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate start and end indices for pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Paginated data for the current page
  const paginatedData = filteredData.slice(startIndex, endIndex);

  //   // Total pages for pagination
  //   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <div className="bg-transparent p-6">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search proposals"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full bg-transparent placeholder:text-[#837E69] px-4 py-2 border border-[#837E69] rounded-md focus:outline-none focus:ring-[0.5px] focus:ring-secondary"
        />
      </div>

      <div className="bg-transparent pt-5">
        <table className="min-w-full text-left cursor-pointer text-sm">
          <tbody className="">
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100 bg-[#F1EFDF] ">
                <td className="py-3 text-[#8E886A] px-4">{row.id}</td>
                <td className="py-3 text-base px-4">{row.status}</td>
                <td className="py-3 text-base px-4">{row.name}</td>
              </tr>
            ))}

            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={3} className="py-3 px-4 text-center">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="py-5">
          <p className="text-[#837E69] font-inter text-[16px]">
            History • 120 Proposals
          </p>
        </div>
      </div>

      {/* <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)}{" "}
          of {filteredData.length} entries
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default NewStakeList;
