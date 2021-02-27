import React, { Component } from "react";
import "./Tag.css";
import { Grid, Card, Item, Segment, Header, Accordion, Icon, Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";
import TagCard from "../TagCard/TagCard";
import { addTag, removeTag } from "../../actions/index";
import { withRouter, Redirect } from "react-router-dom";

class Tag extends Component {
  state = { activeIndex: 0 }

  render() {
    return (
      <Grid doubling columns={4} className="Tag">
        <Grid.Row>

          <Header as='h2' style={{ color: "white" }} image='http://labarberiainstitute.com/wp-content/themes/labarberia/_/img/enrollment-icon.png' content={this.props.content} />

        </Grid.Row>

        <Grid.Row>
          <Accordion styled >
            {this.props.tags.map((tag, i) => {

              let checked = false;
              if (this.props.applyTags.tags.indexOf(tag) != -1)
                checked = true;

              return (
                // <Grid.Column key={i}>
                <div>
                  <Accordion.Title active={true}
                    index={i}
                  // onClick={this.handleClick}
                  >
                    {/* <Icon name='dropdown' /> */}
                    <Checkbox className="checkbox"
                      onChange={(e, { checked }) => {
                        // let tag = tag.tag;
                        console.log(checked);
                        if (checked) {
                          this.props.addTag(tag);
                        } else {
                          this.props.removeTag(tag);
                        }
                      }}
                      checked={checked} float="left" />
                      {console.log(tag)}
                    {tag}
                    {/* <p style={{ color: "gray", marginLeft: 30, fontSize: 10 }} >x{tag.count} Problems.</p> */}

                  </Accordion.Title>
                </div>

                // <TagCard tag={tag.tag} count={tag.count} checked />
                // </Grid.Column>
              );
            })}
          </Accordion>
        </Grid.Row>

        {/* ================================================================ */}
        {/* ================================================================ */}
        {/* ================================================================ */}
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  applyTags: state.applyTags,
});
export default connect(mapStateToProps, { addTag, removeTag })(withRouter(Tag));

// mongoimport --uri "mongodb+srv://mukul3:mukul@mukul.lcc65.mongodb.net/codechef?retryWrites=true&w=majority" --collection media --drop --jsonArray --file medium.json
// export vidly_jwtPrivateKey=mySecureKey
// mongo "mongodb+srv://mukul.lcc65.mongodb.net/codechef" --username mukul3
// db.runCommand({ "renameCollection": "hard", "to": "hards" })