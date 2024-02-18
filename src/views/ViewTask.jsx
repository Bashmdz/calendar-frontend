import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, ListGroup } from "react-bootstrap";
import { CONSTANT } from "../CONSTANT";
import UserData from "../contexts/UserData";

const ViewTask = () => {
  let { session } = useContext(UserData);
  const { task_id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (session?.isLoggedIn) {
      if (!task_id || isNaN(task_id)) {
        navigate("/dashboard");
      } else {
        fetchTaskDetails();
      }
    }
  }, [session, task_id]);

  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get(CONSTANT.server + `api/task/${task_id}`);
      setTask(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    navigate(`/editTask/${task_id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Current Task Infos</h2>
      {task ? (
        <Card>
          <Card.Header as="h5">
            {task.title}
            <Button
              variant="secondary"
              onClick={handleEditClick}
              className="float-end"
            >
              Edit Task
            </Button>
          </Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col-md-6">
                <ListGroup variant="flush">
                  <ListGroup.Item>Priority: {task.priority}</ListGroup.Item>
                  <ListGroup.Item>Progress: {task.progress}</ListGroup.Item>
                  <ListGroup.Item>
                    Category: {task.category?.name}
                  </ListGroup.Item>
                  <ListGroup.Item>Start Date: {task.startDate}</ListGroup.Item>
                  <ListGroup.Item>End Date: {task.endDate}</ListGroup.Item>
                </ListGroup>
              </div>
              <div className="col-md-6">
                <h4>Assigned Users:</h4>
                <ListGroup>
                  {task?.assign_users?.map((user) => (
                    <ListGroup.Item key={user.id}>{user.name}</ListGroup.Item>
                  ))}
                </ListGroup>
                {task.attachment && (
                  <Button
                    variant="info"
                    href={task.attachment}
                    className="mt-3"
                  >
                    Download Attachments
                  </Button>
                )}
              </div>
            </div>
            <Card.Text className="mt-3">
              <h4>Description</h4>
              {task.description}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
};

export default ViewTask;