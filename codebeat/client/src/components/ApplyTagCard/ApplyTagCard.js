import React from "react";
import { connect } from "react-redux";
import { Button, Icon, Label } from "semantic-ui-react";
import "./ApplyTagCard.css";
import { removeTag } from "../../actions/index";

class ApplyTagCard extends React.Component {
  render() {
    return (
      <div className="ApplyTagCard">
        <Button as="div" labelPosition="right">
          <Label as="a" basic color="rgb(68, 68, 68)" >
            {this.props.tag}
          </Label>

          {/* <Button color="rgb(68, 68, 68)"> */}
            <div onClick={() => this.props.removeTag(this.props.tag)}>
              <Icon name="close" color="white"/>
            </div>
          {/* </Button> */}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  applyTags: state.applyTags,
});

export default connect(mapStateToProps, { removeTag })(ApplyTagCard);
