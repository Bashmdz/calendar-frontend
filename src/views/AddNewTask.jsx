import React, { useState, useEffect } from "react";
import axios from "axios";
import { CONSTANT, setMessage, resetMessage } from "../CONSTANT";
import CreatableSelect from "react-select/creatable";

const AddNewTask = () => {
  const [data, setData] = useState({
    title: "",
    priority: "Important",
    category: "",
    progress: "Open",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    attachment: null,
    description: "",
  });
  const [categories, setCategories] = useState([]);
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CONSTANT.server + "api/categories");
      const categoryOptions = response.data.map((cat) => ({
        value: cat.id,
        label: cat.name,
      }));
      setCategories(categoryOptions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCategory = async (inputValue) => {
    try {
      const response = await axios.post(CONSTANT.server + "api/categories/", {
        name: inputValue,
        // Add other necessary fields according to your backend model
      });
      // Assuming the response includes the new category object with an id
      const newCategory = response.data;
      const newOption = { value: newCategory.id, label: newCategory.name };
      setCategories([...categories, newOption]);
      handleCategoryChange(newOption); // Set the newly created category as selected
    } catch (error) {
      console.error("Error creating the new category:", error);
      // Handle the error (e.g., display an error message)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (newValue) => {
    setData((prevData) => ({
      ...prevData,
      category: newValue || "",
    }));
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const validateForm = () => {
    resetMessage();
    let allGood = true;

    if (!data.title) {
      setMessage("Enter task title.", "danger");
      allGood = false;
    } else if (!data.category) {
      setMessage("Select a category.", "danger");
      allGood = false;
    } else if (!data.endDate) {
      setMessage("Select an end date.", "danger");
      allGood = false;
    } else if (!data.description) {
      setMessage("Enter task description.", "danger");
      allGood = false;
    }

    return allGood;
  };

  const handleAddClick = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("priority", data.priority);
        formData.append("category", data.category);
        formData.append("progress", data.progress);
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);
        formData.append("attachment", attachment);
        formData.append("description", data.description);

        const response = await axios.post(
          CONSTANT.server + "api/task",
          formData
        );
        console.log(response.data);
        setMessage("Task created successfully!", "success");
      } catch (error) {
        console.error(error);
        setMessage("Failed to create task. Please try again.", "danger");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">New Task Form</h2>
      <div className="row">
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="title" className="form-label">
            Task Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={data.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            className="form-select"
            id="priority"
            name="priority"
            value={data.priority}
            onChange={handleInputChange}
            required
          >
            <option value="Important">Important</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <CreatableSelect
            id="category"
            name="category"
            isClearable
            options={categories}
            value={data.category}
            onChange={handleCategoryChange}
            onCreateOption={handleCreateCategory}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="progress" className="form-label">
            Progress
          </label>
          <select
            className="form-select"
            id="progress"
            name="progress"
            value={data.progress}
            onChange={handleInputChange}
            required
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            value={data.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-sm-6 col-md-4 mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            value={data.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="attachment" className="form-label">
          Attachment
        </label>
        <input
          type="file"
          className="form-control"
          id="attachment"
          name="attachment"
          onChange={handleFileChange}
        />
        {attachment && (
          <span className="text-success d-block mt-2">
            File uploaded successfully
          </span>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={data.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAddClick}
      >
        Add
      </button>
      <div className="my-3" id="error" style={{ display: "none" }}></div>
    </div>
  );
};

export default AddNewTask;
