import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./views/Home";
import Layout from "./layout/Layout";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
