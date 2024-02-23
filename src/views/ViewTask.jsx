import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, ListGroup, Modal } from "react-bootstrap";
import { CONSTANT } from "../CONSTANT";
import UserData from "../contexts/UserData";

const ViewTask = () => {
  // Get session and setToast from UserData context
  let { session, setToast } = useContext(UserData);

  // Get task_id from URL params
  const { task_id } = useParams();

  // Initialize navigate function from react-router-dom
  const navigate = useNavigate();

  // Initialize task and showConfirmation state variables
  const [task, setTask] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (session?.isLoggedIn) {
      // Check if task_id is valid
      if (!task_id || isNaN(task_id)) {
        // Redirect to dashboard if task_id is invalid
        navigate("/dashboard");
      } else {
        // Fetch task details if task_id is valid
        fetchTaskDetails();
      }
    }
  }, [session, task_id]);

  const fetchTaskDetails = async () => {
    try {
      // Fetch task details from server
      const response = await axios.get(CONSTANT.server + `api/task/${task_id}`);
      setTask(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    // Navigate to editTask page with task_id
    navigate(`/editTask/${task_id}`);
  };

  const handleDeleteClick = () => {
    // Show confirmation modal for task deletion
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Send delete request to server to delete task
      await axios.delete(CONSTANT.server + `api/task/${task_id}`, {
        data: {
          user_id: session?.personal?.id,
        },
      });
      setShowConfirmation(false);
      // Show success toast message
      setToast({
        show: true,
        text: "Task deleted successfully!",
        type: "success",
      });
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    // Hide confirmation modal for task deletion
    setShowConfirmation(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Current Task Info</h2>
      {task ? (
        <Card>
          <Card.Header
            as="h5"
            className="d-flex align-items-center justify-content-between"
          >
            {task.title}
            <div className="d-flex flex-row gap-2">
              <Button variant="success" onClick={handleEditClick}>
                Edit Task
              </Button>
              <Button variant="danger" onClick={handleDeleteClick}>
                Delete Task
              </Button>
            </div>
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
                    <ListGroup.Item key={user.id}>
                      {user.name} {user.id === session?.personal?.id && `(You)`}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
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

      <Modal show={showConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewTask;
