import React, { Component } from "react";
import axios from "axios";
import ShowPostPageData from "./ShowPostPageData";
import "./Postpage.css";


export class Postpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      filter: "",
    };
  }
  componentDidMount() {
    const API_URL = `https://jsonplaceholder.typicode.com/posts?userId=${this.props.match.params.userId}`;
    axios.get(API_URL).then((response) => {
      console.log(response);
      const data = response.data;
      this.setState({ post: data });
    });
  }
  handleChange = (event) => {
    this.setState({ filter: event.target.value });
  };
  render() {
    const { filter, post } = this.state;
    const excludeColumns = ["id"];
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = post.filter((item) => {
      return Object.keys(item).some((key) =>
        excludeColumns.includes(key)
          ? false
          : item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });
    return (
      <div className="postpage">
        <div className="postpage__filter">
          <div className="postpage__filter__search">
            <input
              className="postpage__filter__search__input"
              value={filter}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="postpage__show">
          <span className="postpage__display__headings">
            <span>
              <strong>S.no</strong>
            </span>
            <span>
              <strong>Post Title</strong>
            </span>
            <span>
              <strong>Post Page Details</strong>
            </span>
          </span>
          <span className="postpage__display__data">
            {filteredData.map((post) => (
              <ShowPostPageData key={post.id} post={post} />
            ))}
          </span>
        </div>
      
      </div>
    );
  }
}

export default Postpage;
