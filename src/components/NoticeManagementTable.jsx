import { useState, useEffect } from 'react';
import { Eye, Edit2, MoreVertical, ToggleLeft, ToggleRight } from 'lucide-react';

import toast from 'react-hot-toast';
import useAxios from '../hooks/useAxios';

const NoticeManagementTable = ({ filters }) => {
    const axios = useAxios()
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Fetch notices
    const fetchNotices = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/notices');
            setNotices(response.data.data || []);
        } catch (error) {
            toast.error('Failed to fetch notices');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    // Toggle publish status
    const handleToggleStatus = async (id, currentStatus) => {
        try {
            const response = await axios.patch(`/notice/${id}/status`, {
                isPublished: !currentStatus,
            });
            toast.success(response.data.message);
            fetchNotices();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNotices = notices.slice(indexOfFirstItem, indexOfLastItem);
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
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left">
                                <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                Notice Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                Departments/Individual
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                Published On
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentNotices.map((notice) => (
                            <tr key={notice._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800">
                                    {notice.title}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {notice.noticeType || 'General / Company-W'}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span className="text-blue-600">All Department</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    15-Jun-2025
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        {notice.isPublished ? (
                                            <>
                                                <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-700">
                                                    Published
                                                </span>
                                                <button
                                                    onClick={() => handleToggleStatus(notice._id, notice.isPublished)}
                                                    className="focus:outline-none"
                                                >
                                                    <ToggleRight className="w-8 h-8 text-teal-500" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-600">
                                                    Unpublished
                                                </span>
                                                <button
                                                    onClick={() => handleToggleStatus(notice._id, notice.isPublished)}
                                                    className="focus:outline-none"
                                                >
                                                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <button className="text-gray-600 hover:text-gray-800 transition">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-800 transition">
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-800 transition">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 py-4 border-t border-gray-200">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                    ←
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-1 rounded text-sm transition ${
                            currentPage === index + 1
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default NoticeManagementTable;