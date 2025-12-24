import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Upload, X, AlertCircle } from "lucide-react";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import SuccessModal from "../components/SuccessModal.jsx";


const CreateNoticePage = () => {
  const navigate = useNavigate();
  const axios = useAxios();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [documents, setDocuments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const uploadToImgBB = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
    {
      method: 'POST',
      body: formData,
    }
  );
  const data = await res.json();
  return data.data.url;
};

const onSubmit = async (data) => {

  setIsSubmitting(true);

  try {
    let imageUrl = "";

    if (data.image?.[0]) {
      imageUrl = await uploadToImgBB(data.image[0]);
    }

    const noticeData = {
      ...data,
      image: imageUrl,
      isPublished: true,
      status: "published",
    };

    const res = await axios.post("/notice", noticeData);
    console.log(res.data);

 
    if (res.data?.success) {
      setShowSuccess(true);
      reset();
      setImagePreview(null);
      setDocuments([]); 
    } else {
      toast.error("Notice publish failed");
    }
  } catch (error) {
    toast.error("Failed to create notice");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div>
    
      <div className="flex items-center space-x-3 mb-6">
        <button
          onClick={() => navigate("/")}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Create a Notice</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <p className="text-sm text-gray-600 mb-6">
          Please fill in the details below
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="text-red-500">*</span> Target Department(s) or
              Individual
            </label>
            <select
              {...register("targetDepartment", {
                required: "Target Department or Individual is required",
              })}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.targetDepartment ? "border-red-500" : "border-gray-300"
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

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="text-red-500">*</span> Notice Title
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Notice title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
              className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? "border-red-500" : "border-gray-300"
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

      
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500">*</span> Select Employee ID
              </label>
              <select
                {...register("employeeId", {
                  required: "Employee ID is required",
                })}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${
                  errors.employeeId ? "border-red-500" : "border-gray-300"
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
                {...register("employeeName", {
                  required: "Employee name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                placeholder="Enter employee full name"
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${
                  errors.employeeName ? "border-red-500" : "border-gray-300"
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
                {...register("position", {
                  required: "Position is required",
                })}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${
                  errors.position ? "border-red-500" : "border-gray-300"
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

     
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500">*</span> Notice Type
              </label>
              <select
                {...register("noticeType", {
                  required: "Notice type is required",
                })}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${
                  errors.noticeType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Notice Type</option>
                <option value="Warning / Disciplinary">
                  Warning / Disciplinary
                </option>
                <option value="Performance Improvement">
                  Performance Improvement
                </option>
                <option value="Appreciation / Recognition">
                  Appreciation / Recognition
                </option>
                <option value="Attendance / Leave Issue">
                  Attendance / Leave Issue
                </option>
                <option value="Payroll / Compensation">
                  Payroll / Compensation
                </option>
                <option value="Contract / Role Update">
                  Contract / Role Update
                </option>
                <option value="Advisory / Process Reminder">
                  Advisory / Process Reminder
                </option>
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
                {...register("publishDate", {
                  required: "Publish date is required",
                })}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 ${
                  errors.publishDate ? "border-red-500" : "border-gray-300"
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

        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notice Body
            </label>
            <textarea
              {...register("description")}
              rows="5"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Write the details about notice"
            ></textarea>
          </div>

    
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Upload Attachments (optional)
  </label>


  <input
    type="file"
    id="attachments"
    multiple
    accept="image/*,.pdf"
    {...register("image")}
    className="hidden"
    onChange={(e) => {
      const files = Array.from(e.target.files);

      files.forEach((file) => {
        if (file.type.startsWith("image/")) {
          setImagePreview(URL.createObjectURL(file));
        } else if (file.type === "application/pdf") {
          setDocuments((prev) => [...prev, file]);
        }
      });
    }}
  />


  <label
    htmlFor="attachments"
    className="border-2 border-dashed border-teal-400 rounded-xl p-8 text-center cursor-pointer block hover:bg-teal-50 transition"
  >
    {imagePreview ? (
      <div className="relative inline-block">
        <img
          src={imagePreview}
          alt="Preview"
          className="max-h-40 mx-auto rounded-lg object-contain"
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setImagePreview(null);
          }}
          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
        >
          <X size={16} />
        </button>
      </div>
    ) : (
      <>
        <Upload className="w-10 h-10 text-teal-500 mx-auto mb-2" />
        <p className="text-sm text-gray-700">
          <span className="text-teal-600 font-medium">Upload</span> nominee profile image or drag and drop
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Accepted File Type: jpg, png, pdf
        </p>
      </>
    )}
  </label>


  {documents.length > 0 && (
    <div className="flex flex-wrap gap-3 mt-4">
      {documents.map((file, index) => (
        <div
          key={index}
          className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm"
        >
          <span className="text-gray-600">📎</span>
          <span className="text-gray-700">{file.name}</span>
          <button
            type="button"
            onClick={() =>
              setDocuments((prev) =>
                prev.filter((_, i) => i !== index)
              )
            }
            className="text-gray-400 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )}
</div>


     
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="text-gray-500">📎</span>
            <span>Policy_Document.pdf</span>
            <button type="button" className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>

         
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
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
              {isSubmitting ? "Publishing..." : "Publish Notice"}
            </button>
          </div>
        </form>
      </div>

     
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate("/");
        }}
      />
    </div>
  );
};

export default CreateNoticePage;
