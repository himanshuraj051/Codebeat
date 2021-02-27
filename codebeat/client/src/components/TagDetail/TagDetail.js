import React, { Component } from "react";
import "./TagDetail.css";
import { Item, Grid, Message, Card, Icon, Table, Input,Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import axios from "axios";
import ProblemCard from "../ProblemCard/ProblemCard";
import Header from "../Header/Header";
import QuestionModal from "../TagCard/QuestionModal/QuestionModal";
import ApplyTagCard from "../ApplyTagCard/ApplyTagCard";
import {
  addTag,
  removeTag,
  removeAllTags,
  addAllTags,
  setUser,
  authCheckState,
  checkAuthTimeOut,
} from "../../actions/index";
class TagDetail extends Component {
state = {
problems: [],
loading: true,
error: false,
};
async componentDidMount() {
    this.props.onTryAutoSignup();
    this.setState((prevState) => ({
      loading: false,
      selectedTags: this.props.applyTags.tags,
    }));
  }
render() {
const { loading, error, selectedTags } = this.state;
const { problems } = this.props;
return (
<Grid  relaxed className="Tags">
   <Grid.Row>
      <Header/>
   </Grid.Row>

   <Grid.Row>
            {this.props.applyTags.tags.map((tag, i) => (
              <ApplyTagCard key={i} tag={tag} />
            ))}
          </Grid.Row>

          {/* {selectedTags.length === 0 ? (
            <Grid.Row className="message">
              <Message negative>
                <Message.Header>No tags selected.</Message.Header>
              </Message>
            </Grid.Row>
          ) : (
            <Grid.Row className="message">
              <Message positive>
                <Message.Header>Selected Tags :</Message.Header>

                {selectedTags.map((tag,i) => (
                  <p key={i}>{tag}</p>
                ))}
              </Message>
            </Grid.Row>
          )} */}

   <Grid.Row >
      <Table collapsing size="large" selectable>
         <Table.Header>
            <Table.Row>
               <Table.HeaderCell>Code</Table.HeaderCell>
               <Table.HeaderCell>Problem</Table.HeaderCell>
               <Table.HeaderCell>Successful Submissions</Table.HeaderCell>
               <Table.HeaderCell>Accuracy</Table.HeaderCell>
               {/* 
               <Table.HeaderCell>Accuracy</Table.HeaderCell>
               */}
            </Table.Row>
         </Table.Header>
         <Table.Body>
            {problems.map((problem, i) => (
            <Table.Row>
               <Table.Cell>
                  <QuestionModal title={problem.problemCode} bold={true} problem={problem}/>
               </Table.Cell>
               <Table.Cell>
                  <QuestionModal title={problem.problemName} bold={false} problem={problem}/>
               </Table.Cell>
               <Table.Cell>
                  {problem.successfulSubmissions}
               </Table.Cell>
               <Table.Cell>
                  {problem.accuracy.substr(0,5)}
               </Table.Cell>
            </Table.Row>
            ))}
         </Table.Body>
      </Table>
   </Grid.Row>

   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
   <Grid.Row></Grid.Row>
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
    onRemoveAllTags: () => dispatch(removeAllTags()),
    check: () => dispatch(checkAuthTimeOut()),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(TagDetail);