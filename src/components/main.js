import React from "react";
import Homepage from "./Homepage/Homepage";
import Postpage from "./Postpage/Postpage";
import PostPageDetails from "./Postpage/PostpageDetails/PostPageDetails";
import { Switch, Route } from "react-router-dom";
import "./main.css";

function main() {
  return (
    <div className="Main">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/post/:userId" component={Postpage} />
        <Route path="/postId/:postId" component={PostPageDetails} />
      </Switch>
      {/* <Homepage /> */}
    </div>
  );
}

export default main;
