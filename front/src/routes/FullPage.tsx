import React from "react";
import ReactDOM from "react-dom";
import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true
import ReactFullpage from "@fullpage/react-fullpage";
import "./styles.css";
const anchors = ["firstPage", "secondPage", "thirdPage"];

class MySection extends React.Component {
  render() {
    return (
      <div className="section">
        <h3>{this.props.content}</h3>
      </div>
    );
  }
}

// https://codesandbox.io/s/8lpo68lp28?file=/src/index.js:232-256

const FullpageWrapper = () => (
  <ReactFullpage
    anchors={anchors}
    navigation
    navigationTooltips={anchors}
    sectionsColor={["#282c34", "#ff5f45", "#0798ec"]}
    onLeave={(origin, destination, direction) => {
      console.log("onLeave event", { origin, destination, direction });
    }}
    render={({ state, fullpageApi }) => {
      console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

      return (
        <div>
          <MySection content={"Slide down!"} />
          <MySection content={"Keep going!"} />
          <MySection content={"Slide up!"} />
        </div>
      );
    }}
  />
);



function FullPage() {
  return (
    <ReactFullpage
      anchors={anchors}
      navigation
      navigationTooltips={anchors}
      sectionsColor={["#282c34", "#ff5f45", "#0798ec"]}
      onLeave={(origin, destination, direction) => {
        console.log("onLeave event", { origin, destination, direction });
      }}
      render={({ state, fullpageApi }) => {
        console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

        return (
          <div>
            <MySection content={"Slide down!"} />
            <MySection content={"Keep going!"} />
            <MySection content={"Slide up!"} />
          </div>
        );
      }}
    />
  );
}

export default FullPage;

