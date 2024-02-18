import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CONSTANT } from "../CONSTANT";
import UserData from "../contexts/UserData";

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  let { session } = useContext(UserData);
  const [tasks, setTasks] = useState([]);
  const [displayTasks, setDisplayTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (session?.isLoggedIn) {
      fetchTasks();
    }
  }, [session]);

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
      <button
        onClick={() => navigate("/addNewTask")}
        className="btn btn-primary mb-4"
      >
        Create a new task
      </button>
      <input
        type="text"
        placeholder="Search Tasks"
        value={searchTerm}
        onChange={handleSearch}
        className="form-control mb-4"
      />
      <div>
        {displayTasks.map((task, index) => (
          <Link to={`/viewTask/${task?.id}`} className="text-decoration-none ">
            <div
              key={index}
              style={{
                marginBottom: "1rem",
                backgroundColor:
                  task.priority === "Important"
                    ? "red"
                    : task.priority === "Medium"
                    ? "yellow"
                    : "green",
                color: "white",
                padding: "0.5rem",
                borderRadius: "4px",
              }}
            >
              {task.title} - {task.priority}
            </div>
          </Link>
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
