import { X } from "lucide-react";

const NoticeDetailsModal = ({ notice, onClose }) => {
  if (!notice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold mb-2">{notice.title}</h2>

        <p className="text-sm text-gray-600 mb-3">
          <strong>Type:</strong> {notice.noticeType}
        </p>

        <p className="text-sm text-gray-600 mb-3">
          <strong>Department:</strong> {notice.targetDepartment}
        </p>

        <p className="text-sm text-gray-600 mb-3">
          <strong>Employee:</strong> {notice.employeeName} ({notice.employeeId})
        </p>

        <p className="text-sm text-gray-600 mb-4">
          <strong>Status:</strong>{" "}
          {notice.isPublished ? "Published" : "Draft"}
        </p>

        <div className="border-t pt-3">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {notice.description || "No description"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailsModal;
