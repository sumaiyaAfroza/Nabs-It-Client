import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;


  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 text-center relative">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Notice Published Successfully
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-8">
          Your notice <span className="font-medium">“Holiday Schedule – November 2025”</span>{" "}
          has been published and is now visible to all selected departments.
        </p>

        {/* Action Buttons */}
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






// import { CheckCircle } from 'lucide-react';

// const SuccessModal = ({ isOpen, onClose, message }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
//         {/* Success Icon */}
//         <div className="flex flex-col items-center text-center">
//           <div className="bg-teal-500 rounded-full p-4 mb-6">
//             <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
//           </div>

//           {/* Message */}
//           <h3 className="text-2xl font-bold text-gray-800 mb-3">
//             Notice Published Successfully
//           </h3>
//           <p className="text-sm text-gray-600 mb-8">
//             Your notice "Holiday Schedule - November 2025" has been published and is now visible to all selected departments.
//           </p>

//           {/* Buttons */}
//           <div className="flex space-x-3 w-full">
//             <button className="flex-1 px-4 py-2.5 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition text-sm">
//               View Notice
//             </button>
//             <button className="flex-1 px-4 py-2.5 border border-orange-500 text-orange-500 rounded-lg font-medium hover:bg-orange-50 transition text-sm">
//               + Create Another
//             </button>
//             <button
//               onClick={onClose}
//               className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-sm"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessModal;