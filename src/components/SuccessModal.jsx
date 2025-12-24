import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 text-center relative">
        
       
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
        </div>

      
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Notice Published Successfully
        </h2>

       
        <p className="text-sm text-gray-600 mb-8">
          Your notice <span className="font-medium">“Holiday Schedule – November 2025”</span>{" "}
          has been published and is now visible to all selected departments.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate("/notice-board")}
            className="px-4 py-2 rounded-full border border-blue-500 text-blue-600 text-sm font-medium hover:bg-blue-50 transition"
          >
            View Notice
          </button>

          <button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2 rounded-full border border-orange-500 text-orange-500 text-sm font-medium hover:bg-orange-50 transition"
          >
            + Create Another
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};



export default SuccessModal;