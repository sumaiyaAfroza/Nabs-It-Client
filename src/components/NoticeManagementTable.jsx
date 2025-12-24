import { useState, useEffect } from "react";
import { Eye, Edit2, MoreVertical, ToggleLeft, ToggleRight } from "lucide-react";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import NoticeDetailsModal from "./NoticeDetailsModal";

const NoticeManagementTable = ({ filters }) => {
  const axios = useAxios();

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedNotice, setSelectedNotice] = useState(null);


  const handleViewNotice = async (id) => {
  try {
    const res = await axios.get(`/notice/${id}`);
    setSelectedNotice(res.data.data);
  } catch (error) {
    toast.error("Failed to load notice details");
  }
};

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const params = {};


      if (filters.status === "published") {
        params.status = "published";
      } else if (filters.status === "draft") {
        params.status = "draft";
      }

      const response = await axios.get("/notice", { params });
      setNotices(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch notices");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchNotices();
  }, [filters.status]);


  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const res = await axios.patch(`/notice/${id}/status`, {
        isPublished: !currentStatus,
      });

      toast.success(res.data.message || "Status updated");
      fetchNotices();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };
//  page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = notices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(notices.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">
                <input type="checkbox" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                Notice Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                Published On
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {/* EMPTY STATE */}
            {currentNotices.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  No notices found
                </td>
              </tr>
            )}

            {currentNotices.map((notice) => (
              <tr key={notice._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input type="checkbox" />
                </td>

                <td className="px-6 py-4 text-sm">
                  {notice.title}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {notice.noticeType}
                </td>

                <td className="px-6 py-4 text-sm text-blue-600">
                  {notice.targetDepartment}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {notice.createdAt
                    ? new Date(notice.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {notice.isPublished ? (
                      <>
                        <span className="px-3 py-1 text-xs rounded-full bg-teal-100 text-teal-700">
                          Published
                        </span>
                        <button
                          onClick={() =>
                            handleToggleStatus(
                              notice._id,
                              notice.isPublished
                            )
                          }
                        >
                          <ToggleRight className="w-7 h-7 text-teal-500" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-600">
                          Unpublished
                        </span>
                        <button
                          onClick={() =>
                            handleToggleStatus(
                              notice._id,
                              notice.isPublished
                            )
                          }
                        >
                          <ToggleLeft className="w-7 h-7 text-gray-400" />
                        </button>
                      </>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                   <button
  onClick={() => handleViewNotice(notice._id)}
  className="text-gray-600 hover:text-gray-800"
>
  <Eye className="w-5 h-5" />
</button>
                    <Edit2 className="w-5 h-5 cursor-pointer" />
                    <MoreVertical className="w-5 h-5 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===============================================================================================details modal */}
{selectedNotice && (
  <NoticeDetailsModal
    notice={selectedNotice}
    onClose={() => setSelectedNotice(null)}
  />
)}

      {/* PAGINATION */}
      <div className="flex justify-center space-x-2 py-4">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "border-1 border-blue-700 text-black"
                : "border"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoticeManagementTable;
