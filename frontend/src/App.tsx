import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Main from "./application/main/Main";
import { Typography } from "@material-ui/core";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Typography variant="h6">Video manager</Typography>
        </header>
        <Route path="/" exact component={Main} />
      </div>
    </Router>
  );
};

export default App;