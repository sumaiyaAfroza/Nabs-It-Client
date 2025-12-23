import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertCircle, Upload, Calendar, X } from 'lucide-react';
import useAxios from '../services/api';
import toast from 'react-hot-toast';

const CreateNotice = ({ onSuccess }) => {
  const axios = useAxios();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNoticeTypes, setShowNoticeTypes] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const noticeTypes = [
    'Warning / Disciplinary',
    'Performance Improvement',
    'Appreciation / Recognitio',
    'Attendance / Leave Issue',
    'Payroll / Compensation',
    'Contract / Role Update',
    'Advisory / Process Reminder',
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/notices', data);
      toast.success(response.data.message || 'Notice published successfully!');
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to create notice';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <button className="text-gray-600 hover:text-gray-800">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Create a Notice</h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">Please fill in the details below</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Target Department/Individual */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            * Target Department(s) or Individual
          </label>
          <select
            {...register('targetDepartment', { required: 'This field is required' })}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
              errors.targetDepartment ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Individual</option>
            <option value="All Department">All Department</option>
            <option value="Finance">Finance</option>
            <option value="Sales Team">Sales Team</option>
            <option value="IT / System Members">IT / System Members</option>
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

        {/* Notice Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            * Notice Title
          </label>
          <input
            type="text"
            {...register('title', {
              required: 'Title is required',
              minLength: { value: 3, message: 'Title must be at least 3 characters' },
            })}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
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

        {/* 3 Column Row: Employee ID, Name, Position */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              * Select Employee ID
            </label>
            <select
              {...register('employeeId')}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">Select employee designation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              * Employee Name
            </label>
            <input
              type="text"
              {...register('employeeName')}
              placeholder="Enter employee full name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              * Position
            </label>
            <select
              {...register('position')}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">Select employee department</option>
            </select>
          </div>
        </div>

        {/* Notice Type & Publish Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              * Notice Type
            </label>
            <button
              type="button"
              onClick={() => setShowNoticeTypes(!showNoticeTypes)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-left text-gray-500"
            >
              Select Notice Type
            </button>

            {showNoticeTypes && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-3">
                {noticeTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-2 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('noticeType')}
                      value={type}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              * Publish Date
            </label>
            <div className="relative">
              <input
                type="date"
                {...register('publishDate')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Notice Body */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notice Body
          </label>
          <textarea
            {...register('description', {
              required: 'Description is required',
              minLength: { value: 10, message: 'Description must be at least 10 characters' },
            })}
            rows="5"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Write the details about notice"
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Upload Attachments */}
        <div className="border-2 border-dashed border-yellow-400 bg-yellow-50 rounded-lg p-8">
          <div className="text-center">
            <Upload className="w-12 h-12 text-teal-500 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-1">
              Upload narrative profile image or drag and drop
            </p>
            <p className="text-xs text-teal-600">Accepted File Type: jpg, png</p>
          </div>
        </div>

        {/* Policy Document */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <input type="file" className="hidden" id="policy-doc" />
          <label htmlFor="policy-doc" className="cursor-pointer flex items-center space-x-2">
            <span className="text-gray-500">📎</span>
            <span>Policy_Document.pdf</span>
            <X className="w-4 h-4 text-gray-400" />
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => reset()}
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
  );
};

export default CreateNotice;