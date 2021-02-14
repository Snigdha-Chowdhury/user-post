import React, { Component } from "react";
import ShowHomePageData from "./ShowHomePageData";
import axios from "axios";
import "./Homepage.css";

export class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filter: "",
    };
  }
  componentDidMount() {
    const API_URL = "https://jsonplaceholder.typicode.com/users";
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response);
        const data = response.data;
        this.setState({ users: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // handleChange = (event) => {

  //   this.setState({ filter: event.target.value });
  // };

  betterChange = this.debounce((event) => {
    console.log("Debouncing", event);
    this.setState({ filter: event.target.value });
  }, 300);

  debounce(fn, d) {
    let timer;
    return function () {
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, d);
    };
  }

  render() {
    const { filter, users } = this.state;
    const excludeColumns = ["id"];
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = users.filter((item) => {
      return Object.keys(item).some((key) =>
        excludeColumns.includes(key)
          ? false
          : item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });
    return (
      <div className="homepage">
        <div className="homepage__heading">Home Page</div>
        <div className="homepage__filter">
          <div className="homepage__filter__search">
            <input
              className="homepage__filter__search__input"
              // value={filter}
              onChange={this.betterChange}
              placeholder="Search by Name, Company Name..."
            />
          </div>
        </div>
        <div className="homepage__show">
          <span className="homepage__display__headings">
            {/* <span>
              <strong>S.no</strong>
            </span> */}
            <span>
              <strong>Name</strong>
            </span>
            <span>
              <strong>Company Name</strong>
            </span>
            <span>
              <strong>Post Page</strong>
            </span>
          </span>
          <span className="homepage__display__data">
            {filteredData.map((user) => (
              <ShowHomePageData key={user.id} user={user} />
            ))}
          </span>
        </div>
      </div>
    );
  }
}

export default Homepage;
