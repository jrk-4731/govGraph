import React, { Component } from "react";
import { getButtons } from "./fetch_data_functions";
import Dropdown from "./dropDown";
import "./map.css";
import MyMap from "./usa.jpg";

class MapDisplay extends Component {
  constructor() {
    super();
    this.state = {
      buttons: [],
      btn_tracker: null,
      currentMember: null,
      clicked: false
    };
  }
  componentWillMount() {
    this.getAll();
  }

  getAll = () => {
    getButtons(116).then(data => {
      this.setState({
        buttons: [...data],
        btn_tracker: new Map()
      });
    });
  };

  componentWillReceiveProps = props => {
    getButtons(props.congress).then(data => {
      this.setState({
        buttons: [...data],
        btn_tracker: new Map()
      });
    });
  };

  getTheState = (abbrev, idx) => {
    var val = this.state.btn_tracker.get(abbrev);
    var name = this.state.buttons[idx][0];
    var bioGuide = this.state.buttons[idx][1];
    var party = this.state.buttons[idx][3];
    if (party !== "Republican" && party !== "Democrat") {
      party = "Other";
    }
    if (val === undefined) {
      this.state.btn_tracker.set(abbrev, 1);
      return (
        <div
          onClick={() => this.props.setCurrentMember(name, bioGuide)}
          key={idx}
          className={party + " " + abbrev + "-1 btn "}
        >
          <span className="tooltiptext">{name.first + " " + name.last}</span>
        </div>
      );
    } else {
      return (
        <div
          onClick={() => this.props.setCurrentMember(name, bioGuide)}
          key={idx}
          className={party + " " + abbrev + "-2 btn "}
        >
          <span className="tooltiptext">{name.first + " " + name.last}</span>
        </div>
      );
    }
  };

  setCongress = newCongress => {
    this.props.setCongress(newCongress);
  };

  render() {
    return (
      <div className="imgContainer">
        <img className="mapImg" src={MyMap} alt="Where is my map" />
        <h3 className="dropDownName">Congress</h3>
        <div className="congressDropDown">
          <Dropdown setCongress={this.setCongress} />
        </div>
        {Object.keys(this.state.buttons).map(idx => {
          var val = this.state.buttons[idx][2];
          return this.getTheState(val, idx);
        })}
      </div>
    );
  }
}

export default MapDisplay;
