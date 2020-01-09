import React, { Component } from "react";
import "./dropDown.css";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      congress: null,
      active: false
    };
  }

  componentWillMount = () => {
    this.setState({ congress: 116 });
  };

  getDropDown = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };

  filterFunction = () => {
    var input, filter, a, i, div;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
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

  render() {
    var congress = [];

    for (let i = 1; i < 117; i++) {
      congress.push(
        <div
          onClick={() => {
            this.props.setCongress(i);
            this.setState({ congress: i, active: false });
          }}
          key={i}
        >
          {i}
        </div>
      );
    }

    var yearOne = 1789 + (this.state.congress - 1) * 2;
    var yearTwo = yearOne + 2;
    var suffix;
    if (
      this.state.congress % 10 === 1 &&
      (this.state.congress !== 11 && this.state.congress !== 111)
    ) {
      suffix = "st";
    } else if (
      this.state.congress % 10 === 2 &&
      (this.state.congress !== 12 && this.state.congress !== 112)
    ) {
      suffix = "nd";
    } else if (
      this.state.congress % 10 === 3 &&
      (this.state.congress !== 13 && this.state.congress !== 113)
    ) {
      suffix = "rd";
    } else {
      suffix = "th";
    }

    return (
      <div className="dropdown">
        <div className="dropDownHeader" onClick={this.getDropDown}>
          {this.state.congress + suffix + " (" + yearOne + "-" + yearTwo + ")"}
        </div>
        <div
          id="myDropdown"
          className={
            this.state.active ? "dropdown-content show" : "dropdown-content"
          }
        >
          <input
            type="text"
            placeholder="Search Congress..."
            id="myInput"
            onKeyUp={this.filterFunction}
          />
          {congress}
        </div>
      </div>
    );
  }
}

export default Dropdown;
