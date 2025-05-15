import React, { useState } from "react";
import axios from "axios";
import { X, ChevronDown, ChevronUp } from "lucide-react";

const AddJobModal = ({ onClose, onJobAdded }) => {
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        type: "",
        location: "",
        description: "",
        companyEmail: "",
        companyAddress: "",
        companyDescription: "",
    });

    const [error, setError] = useState("");
    const [showCompanyDetails, setShowCompanyDetails] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, company, type, location, description } = formData;
        if (!title || !company || !type || !location || !description) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/jobs",
                formData
            );
            onJobAdded(response.data);
            onClose();
        } catch (err) {
            if (err.response?.status === 409) {
                setError(err.response.data.error);
            } else {
                setError("Failed to add job.");
            }
        }
    };

    const isFormIncomplete =
        !formData.title.trim() ||
        !formData.company.trim() ||
        !formData.type ||
        !formData.location.trim() ||
        !formData.description.trim();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg p-6 relative shadow-lg max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl text-center font-bold mb-4">
                    Add New Job
                </h2>

                {error && (
                    <p className="text-red-500 text-center text-sm mb-2">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Job Title*"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md outline-emerald-800"
                    />
                    <input
                        type="text"
                        name="company"
                        placeholder="Company Name*"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md outline-emerald-800"
                    />
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md outline-emerald-800"
                    >
                        <option disabled value="">
                            Select Job Type*
                        </option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                    </select>
                    <input
                        type="text"
                        name="location"
                        placeholder="Location*"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md outline-emerald-800"
                    />
                    <textarea
                        name="description"
                        placeholder="Job Description*"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-md h-28 resize-none outline-emerald-800"
                    ></textarea>

                    {/* Toggle Company Details */}
                    <div
                        className="flex items-center justify-between cursor-pointer select-none border-t pt-3"
                        onClick={() =>
                            setShowCompanyDetails(!showCompanyDetails)
                        }
                    >
                        <span className="text-emerald-700 font-medium">
                            {showCompanyDetails
                                ? "Hide Company Details"
                                : "Add Company Details"}
                        </span>
                        {showCompanyDetails ? (
                            <ChevronUp size={20} />
                        ) : (
                            <ChevronDown size={20} />
                        )}
                    </div>

                    {showCompanyDetails && (
                        <div className="space-y-3">
                            <input
                                type="email"
                                name="companyEmail"
                                placeholder="Company Email"
                                value={formData.companyEmail}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-md outline-emerald-800"
                            />
                            <input
                                type="text"
                                name="companyAddress"
                                placeholder="Company Address"
                                value={formData.companyAddress}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-md outline-emerald-800"
                            />
                            <textarea
                                name="companyDescription"
                                placeholder="Company Description"
                                value={formData.companyDescription}
                                onChange={handleChange}
                                className="w-full border p-2 rounded-md resize-none outline-emerald-800"
                            ></textarea>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isFormIncomplete}
                        className={`px-4 py-2 rounded-md w-full text-white ${
                            isFormIncomplete
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
                    >
                        {isFormIncomplete
                            ? "Add Job (Required all fields)"
                            : "Add Job"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddJobModal;
