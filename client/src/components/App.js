import React, { Component } from "react";
import "./App.css";
import {
  Grid,
  Search,
  Button,
  Sticky,
  Segment,
  Dimmer,
  Image,
  Loader,
} from "semantic-ui-react";
import { connect } from "react-redux";
import Tag from "./Tags/Tag";
import Header from "./Header/Header";
import Axios from "axios";
import {
  addTag,
  removeTag,
  removeAllTags,
  addAllTags,
  setUser,
  authCheckState,
  checkAuthTimeOut,
} from "../actions/index";
import ApplyTagCard from "./ApplyTagCard/ApplyTagCard";

class App extends Component {
  state = {
    authorLoading: true,
    conceptLoading: true,
    checkingAuthState: true,
    difficulty: [
      "easy",
      "medium",
      "hard",
      "school",
      "basic",
      "challenge",
      "contest",
    ],
    author: [],
    concept: [],
    userDefined: [],
    authorOffset: 0,
    conceptOffset: 0,
    userdef:this.props.user.token
    // userDefinedOffset: 0
  };

  fetchAuthor = async () => {
    try {
      let res = await Axios.get(
        "https://floating-eyrie-36103.herokuapp.com/api/tags/tags/author/" + this.state.authorOffset
      );

      let modifiedRes = [];
      res.data.map((tag) => modifiedRes.push(tag.tag));

      this.setState((prevState) => ({
        authorLoading: false,
        author: [...prevState.author, ...modifiedRes],
        authorOffset: prevState.authorOffset + 1,
      }));
    } catch (err) {
      this.setState({
        authorLoading: false,
      });
    }
  };

  fetchConcept = async () => {
    try {
      let res = await Axios.get(
        "https://floating-eyrie-36103.herokuapp.com/api/tags/tags/actual_tag/" +
          this.state.conceptOffset
      );

      let modifiedRes = [];
      res.data.map((tag) => modifiedRes.push(tag.tag));

      this.setState((prevState) => ({
        conceptLoading: false,
        concept: [...prevState.concept, ...modifiedRes],
        conceptOffset: prevState.conceptOffset + 1,
      }));
    } catch (err) {
      this.setState({
        conceptLoading: false,
      });
    }
  };

  fetchAuthState = () => {
    this.props.onTryAutoSignup();
  };

  fetchUserDefinedTags = async () => {
    const token=localStorage.getItem("token");
    if (token === null) {
      return;
    }

    try {
     
      console.log(token,"here");
      const res = await Axios.get(
        "https://floating-eyrie-36103.herokuapp.com/api/tags/userDefinedTags",
        {
          headers: {
            authorization: token,
          },
        }
      );

      this.setState({
        userDefined: res.data.tags,
      });
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {

    this.fetchAuthor();
    this.fetchConcept();
    this.fetchAuthState();
    this.fetchUserDefinedTags();
    console.log("mounted")
  }

  render() {
    const {
      difficulty,
      author,
      concept,
      conceptLoading,
      authorLoading,
      checkingAuthState,
      userDefined,
    } = this.state;

    // console.log("app", this.state.userdef);

    if (conceptLoading || authorLoading) {
      return (
        <Grid>
          <Dimmer active>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        </Grid>
      );
    }
    return (
      <Grid divided className="App">
        <Grid.Row>
          <Header link={0} />
        </Grid.Row>

        <Grid.Row>
          {this.props.applyTags.tags.map((tag, i) => (
            <ApplyTagCard key={i} tag={tag} />
          ))}
        </Grid.Row>

        <Grid.Row>
          <Tag
            content="Concepts"
            tags={concept}
          />
        </Grid.Row>
        <Grid.Row>
        <Button
            inverted
            color="white"
            className="Button"
            onClick={()=>{this.fetchConcept()}}
          >Load More...</Button>
        </Grid.Row>

        <Grid.Row>
          <Tag
            content="Author"
            tags={author}
          />
        </Grid.Row>

        <Grid.Row>
        <Button
            inverted
            color="white"
            className="Button"
            onClick={()=>{this.fetchAuthor()}}
          >Load More...</Button>
        </Grid.Row>

        {this.props.user.token === null ? null : (
          <Grid.Row>
            <Tag
              content="User Defined Tags"
              tags={userDefined}
            />
          </Grid.Row>
        )}

      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  applyTags: state.applyTags,
  problems: state.problems.problems,
});
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
    onAddAllTags: (tags) => addAllTags(tags),
    removeTag,
    // removeAllTags,
    check: () => dispatch(checkAuthTimeOut()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
