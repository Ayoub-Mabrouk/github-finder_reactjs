import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  };
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };
  
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/">
                <Search
                  setAlert={this.setAlert}
                  searchUsers={this.searchUsers}
                  clearUsers={this.clearUsers}
                  showClear={this.state.users.length > 0 ? true : false}
                />
                <Users loading={this.state.loading} users={this.state.users} />
              </Route>
              <Route exact path='/user/:login' >
                  <User   loading={this.state.loading}/>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
