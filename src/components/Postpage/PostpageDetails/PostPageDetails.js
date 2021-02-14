import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./PostPageDetails.css";
import { toast } from "react-toastify";

// Import toastify css file
import "react-toastify/dist/ReactToastify.css";

export class PostPageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postDetails: [],
      comments: [],
      deleted: false,
    };
  }
  componentDidMount() {
    toast.configure();
    const API_URL = `https://jsonplaceholder.typicode.com/posts/${this.props.match.params.postId}`;
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response);
        const data = response.data;
        this.setState({ postDetails: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleChange = () => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts/${this.props.match.params.postId}/comments`;
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response);
        const data = response.data;
        this.setState({ comments: data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  deleteChange = () => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts/${this.props.match.params.postId}`;
    axios
      .delete(API_URL)
      .then((response) => {
        toast("Successfully Deleted");
        console.log(response);
        this.setState({ deleted: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    if (this.state.deleted === true) {
      // alert("Succesfully Deleted")
      return <Redirect to={`/post/${this.props.match.params.postId}`} />;
    }

    return (
      <div className="postdetails">
        <div className="postdetails__heading">Post Details</div>
        <div className="postdetails__details">
          <div className="postdetails__details__title">
            <span className="child1">Title </span> <br />
            <span className="child1">Body </span>
          </div>

          <div className="postdetails__details__body">
            <span className="child2">{this.state.postDetails.title}</span>
            <br />
            <span className="child2">{this.state.postDetails.body}</span>
          </div>
        </div>
        <div className="postdetails__addons">
          <span onClick={this.handleChange} className="postdetails__comments">
            <i class="fa fa-comment" aria-hidden="true"></i>
          </span>
          <span onClick={this.deleteChange} className="postdetails__delete">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </span>
        </div>

        {this.state.comments.map((item) => {
          return (
            <div className="postdetails__comments_details">
              <p>Name : {item.name}</p>
              <p>Email : {item.email}</p>
              <p>Body : {item.body}</p>
            </div>
          );
        })}
        <br />
      </div>
    );
  }
}

export default PostPageDetails;
