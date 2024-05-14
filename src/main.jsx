import React from 'react'
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from './App.jsx'

// Import BrowserRouter
import { BrowserRouter as Router} from "react-router-dom";

// Wrap the App component with the BrowserRouter component to enable the router features.
ReactDOM.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById("root")
);
