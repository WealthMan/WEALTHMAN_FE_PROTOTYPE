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
      name: "",
      date: "",
      status: "status",
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
        case "number_portfolio":
          className = "number-portfolio";
          break;
        case "number_smart":
          className = "number-smart";
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
        case "status":
          return (
            <div className={("status" + firstLast)}>
              <p className={listing.status}>{listing.status}</p>
            </div>
          );
        case "percent_portfolio":
          return (
            <div className={("percent-portfolio" + firstLast)}>
              {listing.percent_portfolio}
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
    var titles;
    if (this.props.titles)
      titles = this.props.titles.map(title => title.title);
    else
      titles = this.state.titles;

    var upperTitles;
    if (this.props.titles) {
      upperTitles = this.props.titles
      .filter(title => title.upper)
      .map((title, index) => {
        return (
          <div className={title.class} title={title.tooltip}>
            <button
              className={this.state.sortBy == dasherize(title.title.toLowerCase()) ? (this.state.order ? "desc" : "asc") : ""}
              onClick={() => this.setSortBy(title.title.toLowerCase())}>
              {title.title}
            </button>
          </div>
        );
      });
    }
    var upperInserted = false;

    titles = titles
    .filter(title => title !== "type" && title !== "id")
    .map((title, index) => {
      if (this.props.titles && this.props.titles[index].upper)
        if (!upperInserted)
        {
          upperInserted = true;
          return (
            <div className="upper-titles">
              <p className="blue text-center width100">{this.props.titles[index].upper}</p>
              {upperTitles}
            </div>
          );
        }
        else
          return;

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
        case "percent_portfolio":
          shownTitle = "% in portfolio";
          break;
        case "number_portfolio":
          shownTitle = "portfolio";
          break;
        case "number_smart":
          shownTitle = "smart-contract";
          break;
        default:
          shownTitle = this.props.titles ? title : capitalize(title);
          break;
      }

      var className;
      if (this.props.titles)
        className = this.props.titles[index].class;
      else
        switch(title.toLowerCase()) {
          case "type_shown":
            className = "type";
            break;
          case "id_shown":
            className = "id";
            break;
          case "percent_portfolio":
            className = "percent-portfolio";
            break;
          case "number_portfolio":
            className = "number-portfolio";
            break;
          case "number_smart":
            className = "number-smart";
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
        case "#":
          return (
            <div className={("number blue" + firstLast)}>
              #
            </div>
          );
        case "img":
          return <div className={("none" + firstLast)}></div>;
        default:
          return (
            <div className={(className + firstLast)} title={this.props.titles ? this.props.titles[index].tooltip : ""}>
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
    var listings = this.props.listings
    .filter(listing => {
      if (listing.hasOwnProperty("name"))
        return listing.name.toLowerCase().includes(this.state.name.toLowerCase());
      if (listing.hasOwnProperty("instrument"))
        return listing.instrument.toLowerCase().includes(this.state.name.toLowerCase());
      if (listing.hasOwnProperty("currency"))
        return listing.currency.toLowerCase().includes(this.state.name.toLowerCase());
      return true;
    })
    .filter(listing => {
      if (listing.hasOwnProperty("date") && this.state.date !== "") {
        var selectedDate = new myDate(this.state.date);
        return selectedDate.sameDay(listing.date);
      }
      return true;
    })
    .filter(listing => {
      if (listing.type == "request" && this.state.status !== "status")
        return listing.status == this.state.status;
      return true;
    })
    .sort((a, b) => {
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

    var search = (
      <article className="search">
        <input value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} placeholder="Search..." />
      </article>
    );
    var dateSearch = <input type="date" value={this.state.date} onChange={(event) => this.setState({ date: event.target.value })} />;
    var statusSearch = (
      <select value={this.state.status} onChange={(event) => this.setState({ status: event.target.value })}>
        {["status", "cancelled", "declined", "accepted", "pending"].map(status => <option><p className={status}>{status}</p></option>)}
      </select>
    );

    return (
      <div>
        <div className="search-container">
          {this.props.listings[0].type !== "portfolio" ? search : ""}
          {this.state.titles.includes("date") ? dateSearch : ""}
          {this.props.currencySelector}
          {this.state.titles.includes("status") && this.props.listings[0].type == "request" ? statusSearch : ""}
        </div>
        <ul className="sortable">
          {this.renderTitles()}
          {listings}
        </ul>
      </div>
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
