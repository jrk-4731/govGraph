import React, { Component } from "react";
import "./congressPersonDisplay.css";
import { getButtons, getBills } from "./fetch_data_functions";
import PlaceHolder from "./placeholder.jpg";

class CongressPersonDisplay extends Component {
  constructor() {
    super();
    this.state = {
      repBio: null,
      repInfo: [],
      billsSponsored: null,
      billsPassed: null,
      partisanDegree: null,
      bipartisanDegree: null,
      active: false
    };
  }

  componentWillMount = () => {
    this.getAll();
  };

  getDropdown = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };

  filterFunc = () => {
    var input, filter, a, i, div;
    input = document.getElementById("myINput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropDown");
    a = div.getElementsByTagName("div");
    for (i = 0; i < a.length; i++) {
      var txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  };

  getAll = () => {
    getButtons(116).then(data => {
      this.setState({
        repInfo: [...data],
        repBio: null,
        billsSponsored: null,
        billsPassed: null,
        partisanDegree: null,
        bipartisanDegree: null,
        active: false
      });
    });
  };

  componentWillReceiveProps = props => {
    getButtons(props.congress).then(data => {
      this.setState({
        repInfo: [...data]
      });
    });
    this.setState({ repBio: props.currentMember });
    getBills(props.currentMember[1], props.congress).then(data => {
      this.computeBillData(data);
    });
  };

  computeBillData = bills => {
    var passed = 0;
    var party = [];
    var sponsorParty;
    for (var i = 0; i < bills.length; i++) {
      if (bills[i][0] !== null) {
        passed++;
      }
      for (var j = 0; j < this.state.repInfo.length; j++) {
        if (bills[i][1] !== []) {
          for (var k = 0; k < bills[i][1].length; k++) {
            if (bills[i][1][k] === this.state.repInfo[j][1]) {
              party.push(this.state.repInfo[j][3]);
            }
          }
        }
        if (this.state.repInfo[j][1] === this.state.repBio[1]) {
          sponsorParty = this.state.repInfo[j][3];
        }
      }
    }
    var partisan = 0;
    var bipartisan = 0;
    for (var x = 0; x < party.length; x++) {
      if (party[x] === sponsorParty) {
        partisan++;
      } else {
        bipartisan++;
      }
    }
    this.setState({
      billsSponsored: bills.length,
      billsPassed: passed,
      partisanDegree: partisan,
      bipartisanDegree: bipartisan
    });
  };

  render() {
    var rep_Name;
    if (this.state.repBio == null) {
      rep_Name = <h4 className="name">Choose Your Senator</h4>;
    } else {
      rep_Name = <h4 className="name">{this.state.repBio[0]}</h4>;
    }

    var message;
    var currImg;
    if (this.state.repBio == null) {
      message = (
        <div className="onMountMessage">
          Click on a Senator To Get More Information About That Congress Member
        </div>
      );
      currImg = (
        <img className="placeholderPhoto" src={PlaceHolder} alt="Placeholder" />
      );
    } else {
      message = (
        <div className="properties">
          <div className="bills">
            <div className="sponsored">
              <h6>Bills Sponsored</h6>
              <h3>{this.state.billsSponsored}</h3>
            </div>
            <div className="passed">
              <h6>Bills Passed</h6>
              <h3>{this.state.billsPassed}</h3>
            </div>
          </div>
          <div className="partisan">
            <div className="part">
              <h6>Partisan Degree</h6>
              <h3>{this.state.partisanDegree}</h3>
            </div>
            <div className="bipart">
              <h6>Bipartisan Degree</h6>
              <h3>{this.state.bipartisanDegree}</h3>
            </div>
          </div>
        </div>
      );
      currImg = (
        <img
          className="smallPhoto"
          src={
            "http://bioguide.congress.gov/bioguide/photo/" +
            this.state.repBio[1].substring(0, 1) +
            "/" +
            this.state.repBio[1] +
            ".jpg"
          }
          alt="Placeholder"
        />
      );
    }

    return (
      <div className="wrapper">
        {rep_Name}
        {currImg}
        <div className="textContainer">
          <div className="nameAndSearch">
            <div className="dropDown">
              <input
                type="text"
                placeholder="Search Rep..."
                id="myINput"
                onKeyUp={this.filterFunc}
                onClick={this.getDropdown}
              />
              <div
                id="myDropDown"
                className={
                  this.state.active
                    ? "dropDown-Content Show"
                    : "dropDown-Content"
                }
              >
                {Object.keys(this.state.repInfo).map(idx => {
                  var name = this.state.repInfo[idx][0];
                  var bioGuide = this.state.repInfo[idx][1];
                  return (
                    <div
                      onClick={() => {
                        this.setState({
                          repBio: [name.first + " " + name.last, bioGuide],
                          active: false
                        });
                      }}
                      key={idx}
                    >
                      {name.first + " " + name.last}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {message}
        </div>
      </div>
    );
  }
}

export default CongressPersonDisplay;
