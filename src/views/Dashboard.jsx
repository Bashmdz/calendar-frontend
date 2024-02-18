import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [displayTasks, setDisplayTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      const sortedTasks = response.data.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );
      setTasks(sortedTasks);
      setDisplayTasks(sortedTasks.slice(0, 3)); // Only take the most recent 3 tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredTasks = tasks
      .filter((task) => task.title.toLowerCase().includes(value))
      .slice(0, 3); // Filter and slice the first 3 results

    setDisplayTasks(filteredTasks);
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

  const mapTasksToEvents = tasks.map((task) => ({
    ...task,
    start: new Date(task.startDate),
    end: new Date(task.endDate),
    title: task.title,
  }));

  return (
    <div className="container mt-5">
      <input
        type="text"
        placeholder="Search Tasks"
        value={searchTerm}
        onChange={handleSearch}
        className="form-control mb-4"
      />
      <button
        onClick={() => navigate("/addNewTask")}
        className="btn btn-primary mb-4"
      >
        Create a new Task
      </button>
      <div>
        {displayTasks.map((task, index) => (
          <div
            key={index}
            style={{ marginBottom: "1rem", backgroundColor: task.priority }}
          >
            {task.title} - {task.priority}
          </div>
        ))}
      </div>
      <Calendar
        localizer={localizer}
        events={mapTasksToEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default Dashboard;
