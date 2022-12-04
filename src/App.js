import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Attendance from './components/Attendance/Attendance';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/signup"><Signup /></Route>
          <Route path="/attendance"><Attendance /></Route>
          <Route path="/"><Redirect to="/login" /></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;