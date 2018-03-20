import React, { Component } from 'react';
import './styles/App.css';
import './styles/wealthman.css';
import './styles/proportions.css';


class SingleBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      depositFlag: false,
      withdrawFlag: false,
    };
  }
  depositClick() {
    this.setState({
      depositFlag: !this.state.depositFlag,
      withdrawFlag: false,
    });
  }
  withdrawClick() {
    this.setState({
      depositFlag: false,
      withdrawFlag: !this.state.withdrawFlag,
    });
  }
  render() {
    var precision = 7;
    return (
      <section className="balance">
        <div className="sixth">{this.props.currency}</div>
        <div className="sixth">{this.props.amount.toPrecision(precision)}</div>
        <div className="sixth text-right">{this.props.invested.toPrecision(precision)}</div>
        <div className="sixth text-right">{this.props.BTCvalue.toPrecision(precision)}</div>
        <div className="sixth text-center"><p className={this.state.depositFlag ? "deposit active" : "deposit"} onClick={() => this.depositClick()}>Deposit</p></div>
        <div className="sixth text-center"><p className={this.state.withdrawFlag ? "withdraw active" : "withdraw"} onClick={() => this.withdrawClick()}>Withdraw</p></div>
        {this.state.depositFlag ? (
          <section className="address">
            <div className="text-center">
              Send {this.props.currency} to this address
            </div>
            <h4 className="text-center">
              0x3a8b4013eb7bb370d2fd4e2edbdaf6fd8af6a862
            </h4>
          </section>) : ""}
        {this.state.withdrawFlag ? (
          <section className="address">
            <div className="text-center">
              Paste your {this.props.currency} address
            </div>
            <div>
              <input type="text" />
            </div>
          </section>) : ""}
      </section>
    );
  }
}

class Investor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [
        "Balances",
        "Portfolios",
        "Efficiency"
      ],
      currentPage: "Balances",
      sort: "currency",
      order: "asc",
    };
  }

  setPage(page) {
    this.setState({
      currentPage: page
    });
  }

  renderBalances() {
    var totalValue = 0;
    this.props.user.balances.forEach(balance => {
      totalValue += balance.amount * this.props.data.rates.find(rate => { return rate.currency === balance.currency; }).rate;
    });
    var totalValueBTC = totalValue / this.props.data.rates[0].rate;
    //sorting
    var balances = [].concat(this.props.user.balances).sort((a, b) => {
      if (this.state.order == 'asc')
        return a[this.state.sort] > b[this.state.sort];
      return a[this.state.sort] < b[this.state.sort];
    });

    return (
      <div>
        <h3>Total value: ${totalValue.toPrecision(7)} USD / {totalValueBTC.toPrecision(7)} BTC</h3>
        <section className="balance text-bold">
          <div className="sixth">Currency</div>
          <div className="sixth">Amount</div>
          <div className="sixth text-right">In Investments</div>
          <div className="sixth text-right">BTC Value</div>
          <div className="third text-center">Actions</div>
        </section>
        {
          //mapping
          balances.map(balance => {
            var BTCvalue = balance.amount * this.props.data.rates.find(rate => { return rate.currency === balance.currency; }).rate / this.props.data.rates[0].rate;
            var invested = 0;
            this.props.user.portfolios.forEach(portfolio => {
              if (portfolio.currency === balance.currency)
                invested += portfolio.amount;
            });
            return (<SingleBalance currency={balance.currency} amount={balance.amount} invested={invested} BTCvalue={BTCvalue} />);
          })
        }
      </div>
    );
  }

  renderPortfolios() {
    var totalInvested = 0;
    this.props.user.portfolios.forEach(portfolio => {
      totalInvested += portfolio.amount;
    });
    var totalInvestedBTC = totalInvested / this.props.data.rates[0].rate;

    return (
      <div>
        <h3>Total invested: ${totalInvested.toPrecision(7)} USD / {totalInvestedBTC.toPrecision(7)} BTC</h3>
        {
          this.props.user.portfolios.map(portfolio => {
            var info = this.props.data.algorithms[portfolio.portfolio];
            var creator = this.props.data.users[info.user];
            return (
              <section className="portfolio">
                <div className="third text-right padding-right">
                  <div>invested {portfolio.amount} {portfolio.currency}</div>
                  <div>estimated profit {info.profit}%</div>
                  <div>risk {info.risk}%</div>
                </div>
                <div className="third">
                  <div className="graph"></div>
                </div>
                <div className="third border-left">
                  <div>created by {creator.name} {creator.surname}</div>
                  <div>rating {info.rating}/10</div>
                  <div>{info.likes.length} likes, {info.followers.length} followers, {info.comments.length} comments</div>
                </div>
              </section>
            );
          })
        }
      </div>
    );
  }

  renderEfficency() {

  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Investor page</h1>
        <div className="user-content">
          <h2>{this.props.user.name} {this.props.user.surname} {this.state.currentPage}</h2>
          {this.state.currentPage == "Balances" ? this.renderBalances() : ""}
          {this.state.currentPage == "Portfolios" ? this.renderPortfolios() : ""}
          {this.state.currentPage == "Efficiency" ? this.renderEfficency() : ""}
        </div>
        <div className="user-menu">
          {
            this.state.pages.map(page => {
              return (<div><button className={this.state.currentPage === page ? "link active" : "link"} onClick={() => this.setPage(page)}>{page}</button></div>);
            })
          }
        </div>
      </div>
    );
  }
}

export default Investor;
