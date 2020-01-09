import React, { Component } from "react";
import CongressPersonDisplay from "./components/congressPersonDisplay";
import MapDisplay from "./components/map";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      congress: 116,
      currentMember: null
    };
  }

  setCongress = newCongress => {
    this.setState({ congress: newCongress });
  };

  setCurrentMember = (name, bioguide) => {
    this.setState({ currentMember: [name.first + " " + name.last, bioguide] });
  };

  render() {
    return (
      <div className="appContainer">
        <MapDisplay
          congress={this.state.congress}
          setCongress={this.setCongress}
          setCurrentMember={this.setCurrentMember}
        />
        <CongressPersonDisplay
          congress={this.state.congress}
          currentMember={this.state.currentMember}
        />
      </div>
    );
  }
}

export default App;
