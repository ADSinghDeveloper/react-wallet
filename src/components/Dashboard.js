import { Component } from "react";
import { Button } from "react-bootstrap";
import AuthContext from "../store/auth-context";

class Dashboard extends Component {
  static contextType = AuthContext;
  render() {
    return (
      <div className="text-success">
        Welcome {this.context.authUser.name}!
        <br />
        You have been LoggedIn Successfully!
        <br />
        <Button variant="primary" onClick={this.context.logout}>
          Logout
        </Button>
      </div>
    );
  }
}

export default Dashboard;
