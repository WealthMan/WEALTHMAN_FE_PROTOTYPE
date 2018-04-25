import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import myDate from './myDate.js';
import './css/main.css';
import './css/Sortable.css';

class Sortable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "",
      order: true,
      titles: [],
    }
  }
  componentDidMount() {
    var titles = [];
    for (var key in this.props.listings[0])
      titles.push(key);

    var firstAttr = titles.find(attr => (attr !== "number" && attr !== "img"));
    if (titles.includes("date"))
      firstAttr = "date";

    this.setState({
      titles: titles,
      sortBy: firstAttr,
    });
  }

  setSortBy(sortBy) {
    if (this.state.sortBy == sortBy)
      this.setState({ order: !this.state.order });
    else
      this.setState({ sortBy: sortBy });
  }

  renderListing(listing, index) {
    var data = this.state.titles
    .filter(listing => listing !== "type" && listing !== "id")
    .map((title, titleIndex) => {
      var className;
      switch(title.toLowerCase()) {
        case "type_shown":
          className = "type";
          break;
        case "id_shown":
          className = "id";
          break;
        default:
          className = dasherize(title.toLowerCase());
          break;
      }

      var firstLast = (titleIndex + 1 == this.state.titles.length - 2 ? " last" : "") + (titleIndex == 0 ? " first" : "");
      switch(title) {
        case "number":
          return (
            <div className={("number" + firstLast)}>
              {index + 1}
            </div>
          );
        case "img":
          return (
            <div className={("circle left" + firstLast)}>
              <img src={listing.img} className="avatar" />
            </div>
          );
        case "date":
          var date = new myDate(listing.date);
          return (
            <div className={("date" + firstLast)}>
              {date.niceTime()}
            </div>
          );
        case "days":
          var days = new myDate(listing.days);
          return (
            <div className={("days" + firstLast)}>
              {days.pastNice()}
            </div>
          );
        default:
          return (
            <div className={(className + firstLast)}>
              {listing[title.toLowerCase()]}
            </div>
          );
      }
    });
    return (
      <li>
        <Link to={("/" + listing.type + "/" + listing.id)} className="no-margin" onClick={() => this.props.setPage(listing.type, listing.id)}>
          {data}
        </Link>
      </li>
    );
  }
  renderTitles() {
    var titles = this.state.titles
    .filter(title => title !== "type" && title !== "id")
    .map((title, index) => {

      var shownTitle;
      switch(title.toLowerCase()) {
        case "type_shown":
          shownTitle = "Type";
          break;
        case "id_shown":
          shownTitle = "ID";
          break;
        case "days":
          shownTitle = "Days in system";
          break;
        case "aum":
          shownTitle = "AUM, mln $";
          break;
        case "assets":
          shownTitle = "Fee, % of assets";
          break;
        case "profit":
          shownTitle = "Fee, % of profit";
          break;
        case "initial":
          shownTitle = "Fee, % of initial capital";
          break;
        case "output":
          shownTitle = "Fee, % of output capital";
          break;
        case "annual":
          shownTitle = "Annual average income per capital, %";
          break;
        case "clients":
          shownTitle = "Number of clients";
          break;
        default:
          shownTitle = capitalize(title);
          break;
      }

      var className;
      switch(title.toLowerCase()) {
        case "type_shown":
          className = "type";
          break;
        case "id_shown":
          className = "id";
          break;
        default:
          className = dasherize(title.toLowerCase());
          break;
      }

      var firstLast = (index + 1 == this.state.titles.length - 2 ? " last" : "") + (index == 0 ? " first" : "");
      switch(title.toLowerCase()) {
        case "number":
          return (
            <div className={("number blue" + firstLast)}>
              #
            </div>
          );
        case "img":
          return <div className={("none" + firstLast)}></div>;
        default:
          return (
            <div className={(className + firstLast)}>
              <button
                className={this.state.sortBy == dasherize(title.toLowerCase()) ? (this.state.order ? "desc" : "asc") : ""}
                onClick={() => this.setSortBy(title.toLowerCase())}>
                {shownTitle}
              </button>
            </div>
          );
      }
    });

    return (
      <li className="titles">
        {titles}
      </li>
    );
  }

  render() {
    var listings = this.props.listings.sort((a, b) => {
      var sortBy = this.state.sortBy;

      switch(sortBy) {
        case "date":
          var numberA = parseInt(a[sortBy]);
          var numberB = parseInt(b[sortBy]);
          return !this.state.order ? numberA - numberB : numberB - numberA;
        case "days":
          var numberA = parseInt(a[sortBy]);
          var numberB = parseInt(b[sortBy]);
          return !this.state.order ? numberA - numberB : numberB - numberA;
        case "value":
          var numberA = parseFloat(a[sortBy]);
          var numberB = parseFloat(b[sortBy]);
          return this.state.order ? numberA - numberB : numberB - numberA;
        default:
          if (typeof a[sortBy] == "number")
            return this.state.order ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
          if (typeof a[sortBy] == "string")
            return this.state.order ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
          return 0;
      }
      // switch (typeof a[sortBy]) {
      //   case "string":
      //     return this.state.order ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
      //   case "number":
      //     return this.state.order ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
      //   default:
      //     return 0;
      // }
    }).map((listing, index) => this.renderListing(listing, index));

    return (
      <ul className="sortable">
        {this.renderTitles()}
        {listings}
      </ul>
    );
  }
}

function dasherize(string) {
  return string.replace("/ /g", "-");
}
function camelize(string) {
  return string;
}
function capitalize(string) {
  var lowerCase = string.toLowerCase();
  if (lowerCase === "id")
    return "ID";
  if (lowerCase === "kyc")
    return "KYC";
  if (lowerCase === "aum")
    return "AUM";
  return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
}

export default Sortable;
