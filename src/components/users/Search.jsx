import React, { Component } from "react";

export default class Search extends Component {
  state = {
    text: "",
  };
  onChange = (e) => {
    this.setState({ text: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter Something", "light");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            onChange={this.onChange}
            value={this.state.text}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {this.props.showClear && (
          <button
            className="btn btn-light btn-block"
            onClick={this.props.clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}
