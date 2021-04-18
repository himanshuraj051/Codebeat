import React, { Component } from "react";
import { Search, Grid, Button } from "semantic-ui-react";
import "./Header.css";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { addTag, removeTag, logout, addProblemToSelectedTag } from "../../actions/index";
import Dropdown from "./Dropdown"

class Header extends Component {
  state = {
    stateOptions: [],
    selected: [],
    selections: 0,
  };

  componentDidMount() {
    console.log(this.props.applyTags);
    let val = this.props.applyTags.allTags.map((state, i) => ({
      key: state.tag,
      text: state.tag,
      value: state.tag,
    }));

    this.setState({
      stateOptions: val,
    });
  }

  handleChange = (e, data) => {
    console.log(data.value);
    this.props.addTag(data.value.pop());
  };

  data = async () => {
    let res = await axios.get("https://floating-eyrie-36103.herokuapp.com/api/problem");

    console.log(res);
    // return;

    const AuthStr = "Bearer " + "0bd271a0c1e4bfda8999b0bfc2d8ec6085a1b882";
    let v = 372;

    var tt = setInterval(async () => {
      for (let i = v; i <= v + 30; i++) {
        some(i);
        console.log("Going for document", i);
        try {
          const response = await axios.get(
            "https://api.codechef.com/contests/PRACTICE/problems/" +
              res.data[i].problemCode,
            {
              headers: { Authorization: AuthStr },
            }
          );

          let body = response.data.result.data.content;
          body = { ...body, accuracy: res.data[i].accuracy };

          console.log("Trying to send", body);

          let resp = await axios.post(
            "https://floating-eyrie-36103.herokuapp.com/api/problem/hard",
            body
          );
          console.log("Successfully done", resp);
          console.log("Done", i);
        } catch (err) {
          console.log(i);
        }
      }
      v += 31;
    }, 305000);

    const some = (i) => {
      if (i == 900) clearInterval(tt);
    };
  };

  applyTags = async () => {
    this.props.onAddProblem();
    this.props.history.push("tagDetail");
  };

  logout = () => {
    this.props.onLogout()
  };

  render() {
    const { stateOptions } = this.state;

    return (
      <Grid columns={5} doubling className="Header">
        <Grid.Row divided>
          <Grid.Column width={10}>
          <Grid columns={3} divided>
            <Grid.Column>
            {/* <Dropdown
              placeholder="State"
              fluid
              multiple
              search
              selection
              options={stateOptions}
              ref
              onChange={this.handleChange}
              value={[]}
            /> */}
            <Dropdown/>
            <Button
                  inverted
                  color="white"
                  className="Button"
                  onClick={this.applyTags}
                >
                  Apply Tags
                </Button>
            </Grid.Column>

            <Grid.Column>
                
              </Grid.Column>
            </Grid>
          </Grid.Column>

          <Grid.Column className="Buttons" floated="right">
            <Grid>
              

              {this.props.user.token === null ? (
                <Grid.Row floated="right">
                  <Grid.Column>
                    <Button
                      inverted
                      color="white"
                      className="Button"
                      onClick={()=>this.props.history.push("/login")}
                    >
                      Authorize
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              ) : (
                <Grid.Row floated="right">
                <Grid.Column>
                  <Button
                    inverted
                    color="white"
                    className="Button"
                    onClick={this.logout}
                  >
                    Logout {this.props.user.username}
                  </Button>
                </Grid.Column>
                </Grid.Row>
              )}
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  applyTags: state.applyTags,
});
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logout()),
    addTag,
    removeTag,
    onAddProblem: () => dispatch(addProblemToSelectedTag()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
