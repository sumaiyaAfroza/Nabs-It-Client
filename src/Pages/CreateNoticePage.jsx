import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Upload, X, AlertCircle } from 'lucide-react';
import useAxios from '../hooks/useAxios';
import toast from 'react-hot-toast';
import SuccessModal from '../components/SuccessModal';

const CreateNoticePage = () => {
    const navigate = useNavigate();
    const axios = useAxios();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('/notices', data);
            toast.success(response.data.message);
            setShowSuccess(true);
            reset();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create notice');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
                <button 
                    onClick={() => navigate('/')}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Create a Notice</h1>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
                <p className="text-sm text-gray-600 mb-6">Please fill in the details below</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Target Department/Individual - REQUIRED */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <span className="text-red-500">*</span> Target Department(s) or Individual
                        </label>
                        <select
                            {...register('targetDepartment', { 
                                required: 'Target Department or Individual is required' 
                            })}
                            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.targetDepartment ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Individual</option>
                            <option value="All Department">All Department</option>
                            <option value="Finance">Finance</option>
                            <option value="Sales Team">Sales Team</option>
                            <option value="IT">IT / System Members</option>
                            <option value="Database Team">Database Team</option>
                            <option value="HR">HR</option>
                        </select>
                        {errors.targetDepartment && (
                            <p className="mt-1 text-xs text-red-600 flex items-center">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                {errors.targetDepartment.message}
                            </p>
                        )}
                    </div>

                    {/* Notice Title - REQUIRED */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <span className="text-red-500">*</span> Notice Title
                        </label>
                        <input
                            type="text"
                            {...register('title', {
                                required: 'Notice title is required',
                                minLength: { 
                                    value: 3, 
                                    message: 'Title must be at least 3 characters' 
                                },
                            })}
                            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Write the Title of Notice"
                        />
                        {errors.title && (
                            <p className="mt-1 text-xs text-red-600 flex items-center">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* 3 Columns: Employee ID, Name, Position - ALL REQUIRED */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="text-red-500">*</span> Select Employee ID
                            </label>
                            <select
                                {...register('employeeId', { 
                                    required: 'Employee ID is required' 
                                })}
                                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${
                                    errors.employeeId ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select employee designation</option>
                                <option value="EMP001">EMP001</option>
                                <option value="EMP002">EMP002</option>
                                <option value="EMP003">EMP003</option>
                            </select>
                            {errors.employeeId && (
                                <p className="mt-1 text-xs text-red-600 flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {errors.employeeId.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="text-red-500">*</span> Employee Name
                            </label>
                            <input
                                type="text"
                                {...register('employeeName', { 
                                    required: 'Employee name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Name must be at least 2 characters'
                                    }
                                })}
                                placeholder="Enter employee full name"
                                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${
                                    errors.employeeName ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.employeeName && (
                                <p className="mt-1 text-xs text-red-600 flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {errors.employeeName.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="text-red-500">*</span> Position
                            </label>
                            <select
                                {...register('position', { 
                                    required: 'Position is required' 
                                })}
                                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${
                                    errors.position ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select employee department</option>
                                <option value="Manager">Manager</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="HR">HR</option>
                            </select>
                            {errors.position && (
                                <p className="mt-1 text-xs text-red-600 flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {errors.position.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Notice Type & Publish Date - BOTH REQUIRED */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="text-red-500">*</span> Notice Type
                            </label>
                            <select
                                {...register('noticeType', { 
                                    required: 'Notice type is required' 
                                })}
                                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${
                                    errors.noticeType ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select Notice Type</option>
                                <option value="Warning / Disciplinary">Warning / Disciplinary</option>
                                <option value="Performance Improvement">Performance Improvement</option>
                                <option value="Appreciation / Recognition">Appreciation / Recognition</option>
                                <option value="Attendance / Leave Issue">Attendance / Leave Issue</option>
                                <option value="Payroll / Compensation">Payroll / Compensation</option>
                                <option value="Contract / Role Update">Contract / Role Update</option>
                                <option value="Advisory / Process Reminder">Advisory / Process Reminder</option>
                            </select>
                            {errors.noticeType && (
                                <p className="mt-1 text-xs text-red-600 flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {errors.noticeType.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="text-red-500">*</span> Publish Date
                            </label>
                            <input
                                type="date"
                                {...register('publishDate', { 
                                    required: 'Publish date is required' 
                                })}
                                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${
                                    errors.publishDate ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.publishDate && (
                                <p className="mt-1 text-xs text-red-600 flex items-center">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {errors.publishDate.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Notice Body - NOT REQUIRED (no * in Figma) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notice Body
                        </label>
                        <textarea
                            {...register('description')}
                            rows="5"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Write the details about notice"
                        ></textarea>
                    </div>

                    {/* Upload Attachments - OPTIONAL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Attachments (optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-400 transition">
                            <Upload className="w-10 h-10 text-teal-500 mx-auto mb-3" />
                            <p className="text-sm text-gray-600 mb-1">
                                Upload narrative profile image or drag and drop
                            </p>
                            <p className="text-xs text-teal-600">Accepted File Type: jpg, png</p>
                        </div>
                    </div>

                    {/* Policy Document */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-gray-500">📎</span>
                        <span>Policy_Document.pdf</span>
                        <button type="button" className="text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="px-6 py-2.5 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition text-sm"
                        >
                            Save as Draft
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition disabled:opacity-50 text-sm"
                        >
                            {isSubmitting ? 'Publishing...' : 'Publish Notice'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccess}
                onClose={() => {
                    setShowSuccess(false);
                    navigate('/');
                }}
            />
        </div>
    );
};

export default CreateNoticePage;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { ArrowLeft, Upload, X, AlertCircle } from 'lucide-react';

// import toast from 'react-hot-toast';
// import SuccessModal from '../components/SuccessModal';
// import useAxios from '../hooks/useAxios';

// const CreateNoticePage = () => {
//     const navigate = useNavigate();
//     const axios = useAxios();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [showSuccess, setShowSuccess] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//     } = useForm();

//     const onSubmit = async (data) => {
//         setIsSubmitting(true);
//         try {
//             const response = await axios.post('/notices', data);
//             toast.success(response.data.message);
//             setShowSuccess(true);
//             reset();
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Failed to create notice');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div>
//             {/* Header */}
//             <div className="flex items-center space-x-3 mb-6">
//                 <button 
//                     onClick={() => navigate('/')}
//                     className="p-2 hover:bg-gray-100 rounded-full transition"
//                 >
//                     <ArrowLeft className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <h1 className="text-2xl font-bold text-gray-800">Create a Notice</h1>
//             </div>

//             {/* Form */}
//             <div className="bg-white rounded-lg shadow-sm p-8">
//                 <p className="text-sm text-gray-600 mb-6">Please fill in the details below</p>

//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                     {/* Target Department/Individual */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             * Target Department(s) or Individual
//                         </label>
//                         <select
//                             {...register('targetDepartment', { required: 'This field is required' })}
//                             className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                 errors.targetDepartment ? 'border-red-500' : 'border-gray-300'
//                             }`}
//                         >
//                             <option value="">Individual</option>
//                             <option value="All Department">All Department</option>
//                             <option value="Finance">Finance</option>
//                             <option value="Sales Team">Sales Team</option>
//                             <option value="IT">IT / System Members</option>
//                             <option value="Database Team">Database Team</option>
//                             <option value="HR">HR</option>
//                         </select>
//                         {errors.targetDepartment && (
//                             <p className="mt-1 text-xs text-red-600 flex items-center">
//                                 <AlertCircle className="w-3 h-3 mr-1" />
//                                 {errors.targetDepartment.message}
//                             </p>
//                         )}
//                     </div>

//                     {/* Notice Title */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             * Notice Title
//                         </label>
//                         <input
//                             type="text"
//                             {...register('title', {
//                                 required: 'Title is required',
//                                 minLength: { value: 3, message: 'Title must be at least 3 characters' },
//                             })}
//                             className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
//                                 errors.title ? 'border-red-500' : 'border-gray-300'
//                             }`}
//                             placeholder="Write the Title of Notice"
//                         />
//                         {errors.title && (
//                             <p className="mt-1 text-xs text-red-600 flex items-center">
//                                 <AlertCircle className="w-3 h-3 mr-1" />
//                                 {errors.title.message}
//                             </p>
//                         )}
//                     </div>

//                     {/* 3 Columns: Employee ID, Name, Position */}
//                     <div className="grid grid-cols-3 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 * Select Employee ID
//                             </label>
//                             <select
//                                 {...register('employeeId')}
//                                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="">Select employee designation</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 * Employee Name
//                             </label>
//                             <input
//                                 type="text"
//                                 {...register('employeeName')}
//                                 placeholder="Enter employee full name"
//                                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 * Position
//                             </label>
//                             <select
//                                 {...register('position')}
//                                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="">Select employee department</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* Notice Type & Publish Date */}
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 * Notice Type
//                             </label>
//                             <select
//                                 {...register('noticeType', { required: 'Notice type is required' })}
//                                 className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${
//                                     errors.noticeType ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                             >
//                                 <option value="">Select Notice Type</option>
//                                 <option value="Warning / Disciplinary">Warning / Disciplinary</option>
//                                 <option value="Performance Improvement">Performance Improvement</option>
//                                 <option value="Appreciation / Recognition">Appreciation / Recognition</option>
//                                 <option value="Attendance / Leave Issue">Attendance / Leave Issue</option>
//                                 <option value="Payroll / Compensation">Payroll / Compensation</option>
//                                 <option value="Contract / Role Update">Contract / Role Update</option>
//                                 <option value="Advisory / Process Reminder">Advisory / Process Reminder</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 * Publish Date
//                             </label>
//                             <input
//                                 type="date"
//                                 {...register('publishDate')}
//                                 className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                     </div>

//                     {/* Notice Body */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Notice Body
//                         </label>
//                         <textarea
//                             {...register('description', {
//                                 required: 'Description is required',
//                                 minLength: { value: 10, message: 'Description must be at least 10 characters' },
//                             })}
//                             rows="5"
//                             className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 resize-none ${
//                                 errors.description ? 'border-red-500' : 'border-gray-300'
//                             }`}
//                             placeholder="Write the details about notice"
//                         ></textarea>
//                         {errors.description && (
//                             <p className="mt-1 text-xs text-red-600 flex items-center">
//                                 <AlertCircle className="w-3 h-3 mr-1" />
//                                 {errors.description.message}
//                             </p>
//                         )}
//                     </div>

//                     {/* Upload Attachments */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Upload Attachments (optional)
//                         </label>
//                         <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-400 transition">
//                             <Upload className="w-10 h-10 text-teal-500 mx-auto mb-3" />
//                             <p className="text-sm text-gray-600 mb-1">
//                                 Upload narrative profile image or drag and drop
//                             </p>
//                             <p className="text-xs text-teal-600">Accepted File Type: jpg, png</p>
//                         </div>
//                     </div>

//                     {/* Policy Document */}
//                     <div className="flex items-center space-x-2 text-sm text-gray-600">
//                         <span className="text-gray-500">📎</span>
//                         <span>Policy_Document.pdf</span>
//                         <button type="button" className="text-gray-400 hover:text-gray-600">
//                             <X className="w-4 h-4" />
//                         </button>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex justify-end space-x-3 pt-4">
//                         <button
//                             type="button"
//                             onClick={() => navigate('/')}
//                             className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition text-sm"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="button"
//                             className="px-6 py-2.5 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition text-sm"
//                         >
//                             Save as Draft
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={isSubmitting}
//                             className="px-6 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition disabled:opacity-50 text-sm"
//                         >
//                             {isSubmitting ? 'Publishing...' : 'Publish Notice'}
//                         </button>
//                     </div>
//                 </form>
//             </div>

//             {/* Success Modal */}
//             <SuccessModal
//                 isOpen={showSuccess}
//                 onClose={() => {
//                     setShowSuccess(false);
//                     navigate('/');
//                 }}
//             />
//         </div>
//     );
// };

// export default CreateNoticePage;