import React, { Component } from "react";
import { Card, Icon, Checkbox, Item } from "semantic-ui-react";
import "./TagCard.css";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { addTag, removeTag } from "../../actions/index";

const description = [
  "Amy is a violinist with 2 years experience in the wedding industry.",
  "She enjoys the outdoors and currently resides in upstate New York.",
].join(" ");

class TagCard extends Component {
  handleChange = (e, { checked }) => {
    let tag = this.props.tag;
    if (checked) {
      this.props.addTag(tag);
    } else {
      this.props.removeTag(tag);
    }
  };

  render() {
    let checked = false;
    if (this.props.applyTags.tags.indexOf(this.props.tag) != -1) {
      checked = true;
    }

    return (
      <Card
        centered
        color="white"
        raised={true}
        className="Card"
      >
        <Card.Content>
         <Card.Header> <Checkbox onChange={this.handleChange} checked={checked} />  {this.props.tag}
         </Card.Header>
         <Card.Meta>x{this.props.count} Problems.</Card.Meta>
         <Card.Description>
           {description}
         </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  applyTags: state.applyTags,
});
export default connect(mapStateToProps, { addTag, removeTag })(
  withRouter(TagCard)
);
