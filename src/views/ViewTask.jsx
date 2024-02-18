import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const ViewTask = () => {
  const { task_id } = useParams();
  const history = useHistory();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get(`/api/task/${task_id}`);
      setTask(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    history.push(`/editTask/${task_id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">View Task</h2>
      {task ? (
        <div className="row">
          <div className="col-md-6">
            <h4>Title: {task.title}</h4>
            <p>Priority: {task.priority}</p>
            <p>Progress: {task.progress}</p>
            <p>Start Date: {task.startDate}</p>
            <p>End Date: {task.endDate}</p>
            <p>Category: {task.category?.name}</p>
            <p>Description: {task.description}</p>
          </div>
          <div className="col-md-6">
            <h4>Assigned Users:</h4>
            <ul>
              {task.assign_users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
            {task.attachment && (
              <div>
                <h4>Attachment:</h4>
                <p>{task.attachment}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading task details...</p>
      )}
      <button className="btn btn-primary" onClick={handleEditClick}>
        Edit Task
      </button>
    </div>
  );
};

export default ViewTask;
