import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./layout/Layout";
import "./App.css";
import Register from "./auth/Register";
import Login from "./auth/Login";
import AddNewTask from "./views/AddNewTask";
import EditTask from "./views/EditTask";
import ViewTask from "./views/ViewTask";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import TakeMeToAdmin from "./components/TakeMeToAdmin";
import NotFound from "./views/NotFound"; // Import NotFound component

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Home */}
          <Route
            path="/"
            element={
              <Layout auth>
                <Home />
              </Layout>
            }
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />

          {/* Add New Task */}
          <Route
            path="/addNewTask"
            element={
              <Layout>
                <AddNewTask />
              </Layout>
            }
          />

          {/* Edit Task */}
          <Route
            path="/editTask/:task_id"
            element={
              <Layout>
                <EditTask />
              </Layout>
            }
          />

          {/* View Task */}
          <Route
            path="/viewTask/:task_id"
            element={
              <Layout>
                <ViewTask />
              </Layout>
            }
          />

          {/* Register */}
          <Route
            path="/register"
            element={
              <Layout auth>
                <Register />
              </Layout>
            }
          />

          {/* Login */}
          <Route
            path="/signin"
            element={
              <Layout auth>
                <Login />
              </Layout>
            }
          />

          {/* Admin */}
          <Route path="/admin" element={<TakeMeToAdmin />} />
          <Route path="/admin/" element={<TakeMeToAdmin />} />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
