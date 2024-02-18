import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./layout/Layout";
import "./App.css";
import Register from "./auth/Register";
import Login from "./auth/Login";
import AddNewTask from "./views/AddNewTask";
import EditTask from "./views/EditTask";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout auth>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout auth>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/addNewTask"
            element={
              <Layout>
                <AddNewTask />
              </Layout>
            }
          />
          <Route
            path="/addNewTask"
            element={
              <Layout>
                <AddNewTask />
              </Layout>
            }
          />
          <Route
            path="/editTask/:task_id"
            element={
              <Layout>
                <EditTask />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout auth>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/signin"
            element={
              <Layout auth>
                <Login />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
