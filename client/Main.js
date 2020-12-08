import React from "react";
import Axios from "axios";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      contents: [],
    };
  }

  async componentDidMount() {
    this.setState({ contents: (await Axios.get("/api/contents")).data });
  }

  render() {
    const { contents } = this.state;
    console.log(contents);
    return (
      <div id="main" className="row container">
        Hello World
      </div>
    );
  }
}
