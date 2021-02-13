import React from "react";
import { Link } from "react-router-dom";
import "./ShowPostPageData.css"

function ShowPostPageData(props) {
  return (
    <div className="postpage__display">
      <span>{props.post.id}</span>
      <span>{props.post.title}</span>
      <span>
        <Link to={`/postId/${props.post.id}`}>Post Details</Link>
      </span>
    </div>
  );
}

export default ShowPostPageData;
