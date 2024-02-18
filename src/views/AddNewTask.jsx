import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("priority", data.priority);
    formData.append("category", data.category);
    formData.append("progress", data.progress);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("attachment", attachment);
    formData.append("description", data.description);

    try {
      const response = await axios.post("api/task", formData);
      console.log(response.data);
      setMessage("Task created successfully!", "success");
    } catch (error) {
      console.error(error);
      setMessage("Failed to create task. Please try again.", "danger");
    }
  };

  return (
    <div className="container mt-5">
      <h2>New Task Form</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
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
        <div className="mb-3">
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
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={data.category}
            onChange={handleInputChange}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
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
        <div className="mb-3">
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
        <div className="mb-3">
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
            <span className="text-success">File uploaded successfully</span>
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
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddNewTask;
