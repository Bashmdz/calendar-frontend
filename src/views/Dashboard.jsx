import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CONSTANT } from "../CONSTANT";
import UserData from "../contexts/UserData";
import FilterIcon from "./../assets/icons/FilterIcon";

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  let { session } = useContext(UserData);
  const [displayTasks, setDisplayTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priority: "",
    category: "",
    progress: "",
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (session?.isLoggedIn) {
      fetchTasks();
    }
  }, [session]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        CONSTANT.server + "api/tasks/" + session?.personal?.id
      );
      const result = response.data?.map((a, b) => {
        return a?.task;
      });
      const sortedTasks = result.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );
      setDisplayTasks(sortedTasks); // All tasks that need to be displayed
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CONSTANT.server + "api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let newStyle = {
      backgroundColor: "lightgrey",
      color: "black",
      borderRadius: "0px",
      border: "none",
    };

    if (event.priority === "Important") {
      newStyle.backgroundColor = "red";
    } else if (event.priority === "Medium") {
      newStyle.backgroundColor = "yellow";
    } else if (event.priority === "Low") {
      newStyle.backgroundColor = "green";
    }

    return {
      style: newStyle,
    };
  };

  return (
    <div className="container mt-5">
      <button
        onClick={() => navigate("/addNewTask")}
        className="btn btn-primary mb-4"
      >
        Create a new task
      </button>
      <div className="mb-4 d-flex justify-content-center align-items-center flex-row gap-2">
        <input
          type="text"
          placeholder="Search Tasks"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control"
        />
        <div className="dropdown">
          <FilterIcon
            role="button "
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              width: "25px",
              userSelect: "none",
              cursor: "pointer",
            }}
          />
          <ul
            className="dropdown-menu px-3"
            style={{
              width: "15rem",
            }}
            aria-labelledby="dropdownMenuButton1"
          >
            <div className="mb-3">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                className="form-select"
                id="priority"
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                required
              >
                <option value="">All</option>
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
                value={filters.category}
                onChange={handleFilterChange}
                required
              >
                <option value="">All</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
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
                value={filters.progress}
                onChange={handleFilterChange}
                required
              >
                <option value="">All</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </ul>
        </div>
      </div>
      <Calendar
        localizer={localizer}
        events={displayTasks
          .filter((task) => {
            if (searchTerm === "") return true;
            return task.title.toLowerCase().includes(searchTerm);
          })
          .filter((task) => {
            if (filters?.priority === "") return true;
            return task?.priority.includes(filters?.priority);
          })
          .filter((task) => {
            if (filters?.category === "") return true;
            return task?.category?.name?.includes(filters?.category);
          })
          .filter((task) => {
            if (filters?.progress === "") return true;
            return task?.progress.includes(filters?.progress);
          })
          .map((task) => ({
            ...task,
            start: new Date(task.startDate),
            end: new Date(task.endDate),
            title: task.title,
          }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => {
          console.info("[handleSelected - event]", event);
          navigate(`/viewTask/${event.id}`);
        }}
      />
    </div>
  );
};

export default Dashboard;
