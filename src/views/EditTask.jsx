import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CONSTANT, setMessage, resetMessage } from "../CONSTANT";
import CreatableSelect from "react-select/creatable";
import { useNavigate, useParams } from "react-router-dom";
import UserData from "../contexts/UserData";

const EditTask = () => {
  let { session, setToast } = useContext(UserData);
  let navigate = useNavigate();
  let { task_id } = useParams();
  const [data, setData] = useState({
    title: "",
    priority: "Important",
    category: "",
    progress: "Open",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    description: "",
    assign_users: [],
  });
  const [categories, setCategories] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (session?.isLoggedIn) {
      if (!task_id || isNaN(task_id)) {
        navigate("/dashboard");
      } else {
        fetchCategories();
        fetchUsers();
        fetchTaskDetails();
      }
    }
  }, [session, task_id]);

  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get(CONSTANT.server + `api/task/${task_id}`);
      const taskDetails = response.data;
      setData({
        ...taskDetails,
        category: {
          value: taskDetails.category?.id,
          label: taskDetails.category?.name,
        },
        assign_users: taskDetails.assign_users
          .filter((user) => user.id !== session?.personal?.id)
          .map((user) => ({
            value: user.id,
            label: user.name,
          })),
      });
    } catch (error) {
      navigate("/dashboard");
      console.error(error);
    }
  };

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

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        CONSTANT.server + "authentication/users"
      );
      const userOptions = response.data
        .filter((user) => user.id !== session?.personal?.id)
        .map((user) => ({
          value: user.id,
          label: `${user.name} - (${user.email})`,
        }));
      setUsers(userOptions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCategory = async (inputValue) => {
    try {
      const response = await axios.post(CONSTANT.server + "api/categories", {
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

  const handleAssignUsersChange = (newValue) => {
    setData((prevData) => ({
      ...prevData,
      assign_users: newValue || [],
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
    } else if (!data.startDate) {
      setMessage("Select a start date.", "danger");
      allGood = false;
    } else if (!data.endDate) {
      setMessage("Select an end date.", "danger");
      allGood = false;
    } else if (new Date(data.endDate) <= new Date(data.startDate)) {
      setMessage("End date should be greater than start date.", "danger");
      allGood = false;
    } else if (!data.description) {
      setMessage("Enter task description.", "danger");
      allGood = false;
    }
    return allGood;
  };

  const handleUpdateClick = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("priority", data.priority);
        formData.append("category", data.category?.value);
        formData.append("progress", data.progress);
        formData.append("startDate", data.startDate);
        formData.append("endDate", data.endDate);
        if (attachment) {
          formData.append("attachment", attachment);
        }
        formData.append("description", data.description);
        formData.append(
          "assign_users",
          JSON.stringify([
            session?.personal?.id,
            ...data.assign_users?.map((a, b) => {
              return a.value;
            }),
          ])
        );

        const response = await axios.put(
          CONSTANT.server + "api/task/" + task_id,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        // setMessage("Task updated successfully!", "success");
        setToast({
          show: true,
          text: "Task updated successfully!",
          type: "success",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
        console.error(error);
        setMessage("Failed to update task. Please try again.", "danger");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Task Form</h2>
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
            placeholder="Select or create a category"
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
      <div className="row mb-3">
        {/* <div className="col-sm-6 col-md-4 mb-3"> */}
        <label htmlFor="assign_users" className="form-label">
          Update additional users
        </label>
        <CreatableSelect
          id="assign_users"
          name="assign_users"
          isMulti
          placeholder="Select users"
          options={users}
          value={data.assign_users}
          onChange={handleAssignUsersChange}
        />
        {/* </div> */}
        {/* <div className="col-sm-6 col-md-8 mb-3">
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
          {!attachment && data?.attachment && (
            <span className="text-success d-block mt-2">
              Current: {data?.attachment}
            </span>
          )}
        </div> */}
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
        onClick={handleUpdateClick}
      >
        Update
      </button>
      <button
        type="button"
        className="ms-2 btn btn-danger"
        onClick={() => {
          navigate(-1);
        }}
      >
        Cancel
      </button>
      <div className="my-3" id="error" style={{ display: "none" }}></div>
    </div>
  );
};

export default EditTask;
