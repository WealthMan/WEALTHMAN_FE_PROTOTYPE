import React, { Component } from 'react';
import Investor from './Investor.js';
import Manager from './Manager.js';
import logo from './logo.svg';
import './styles/App.css';
import './styles/wealthman.css';
import './styles/proportions.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { type: "investor", name: "Dagny", surname: "Taggart", balances: [
          { currency: "BTC", amount: 2.198 },
          { currency: "ETH", amount: 13.235 },
          { currency: "DOGE", amount: 6845.866 },
          { currency: "LTC", amount: 23.532 },
        ], portfolios: [
          { portfolio: 0, amount: 0.365, currency: "BTC" },
          { portfolio: 1, amount: 0.121, currency: "BTC" },
          { portfolio: 2, amount: 0.238, currency: "BTC" },
        ]},
        { type: "investor", name: "Midas", surname: "Mulligan", balances: [
          { currency: "BTC", amount: 54.786 },
          { currency: "ETH", amount: 347.982 },
        ], potrfolios: [
          { portfolio: 1, amount: 2.478, currency: "BTC" },
          { portfolio: 2, amount: 3.985, currency: "BTC" },
        ]},
        { type: "manager", name: "John", surname: "Galt" },
        { type: "manager", name: "Francisco", surname: "d'Anconia" },
        { type: "manager", name: "Henry", surname: "Rearden" },
        { type: "manager", name: "Orren", surname: "Boyle" },
      ],

      rates: [
        { currency: "BTC", rate: 11229.6 },
        { currency: "ETH", rate: 955.03 },
        { currency: "DOGE", rate: 0.006883 },
        { currency: "LTC", rate: 226.09 },
      ],

      algorithms: [
        { user: 2, likes: [1, 3, 5], followers: [1, 3], risk: 12.7, profit: 26.9, rating: 10, min: 1, currencies: ["BTC", "ETH"], comments: [
          { user: 1, text: "Great technology" },
          { user: 4, text: "too slow. I'll use different" },
          { user: 2, text: "I'm rich"}
        ]},
        { user: 3, likes: [1, 4], followers: [4], risk: 63.1, profit: 43.4, rating: 7, min: 0.1, currencies: ["BTC", "DOGE"], comments: [
          { user: 1, text: "What are u doing7" },
          { user: 4, text: "I'd like to use that" }
        ]},
        { user: 4, likes: [1, 3], followers: [5], risk: 8.6, profit: 13.7, rating: 8, min: 0.34, currencies: ["BTC", "USD"], comments: [
          { user: 5, text: "I could use it" },
          { user: 1, text: "nice" }
        ]},
        { user: 5, likes: [], followers: [], risk: 89.1, profit: 4.4, rating: 2, currencies: ["BTC", "LTC"], comments: [
          { user: 4, text: "Please go away" }
        ]},
      ],

      currentUser: 0,
      page: "user",
      selectedUser: 0,
    };
  }

  renderContent() {
    if (this.state.page === "main")
      return this.renderMain();
    if (this.state.page === "user")
      return (
        <User user={this.state.users[this.state.currentUser]} data={this.state} />
      );
    if (this.state.page === "welcome")
      return (
        <div className="container">
          <h3>Welcome to WealthMan site</h3>
          <h4>prototype version 1.0</h4>
        </div>
      );

    var rows = [];
    var users = this.state.users;

    for (var i = 0; i < users.length; i++)
      rows.push(
        <option value={i} selected={this.state.selectedUser == i}>
          {users[i].type}: {users[i].name} {users[i].surname}
        </option>
      );

    return (
      <div className="container">
        <div>(Возможность регистрироваться появится после подключения базы данных)</div>
        <div>(На данном этапе можно выбрать и посмотреть аккаунт инвестора/менеджера)</div>

        <select value={this.state.selectedUser} onChange={(event) => this.setSelectedUser(event.target.value)}>
          {rows}
        </select>
        <button className="login" onClick={() => { this.setUser(this.state.selectedUser); this.setPage("main"); }}>Log in</button>
      </div>
    );
  }

  renderMain() {
    return (
      <div className="container">
        <h1 className="text-center">Investment page</h1>
        <h2>List of algorithms</h2>
        {
          this.state.algorithms.map(alg => {
            var creator = this.state.users[alg.user];
            return (
              <section className="algorithm">
                <section className="main">
                  <div className="creator">
                    <div className="userpic"></div>
                    <div className="name">{creator.name} {creator.surname}</div>
                  </div>
                  <div className="fifth right">
                    <h2 className="numbers">{alg.profit}%</h2>
                    <div>profit</div>
                  </div>
                  <div className="fifth right">
                    <h2 className="numbers">{alg.risk}%</h2>
                    <div>risk</div>
                  </div>
                  <div className="two-fifth right">
                    <div>rating {alg.rating}/10</div>
                    <div>Description</div>
                    <div>Investment details</div>
                  </div>
                </section>
                <section className="social">
                  <button className="like">Like {alg.likes.length}</button>
                  <button className="comment">Comment {alg.comments.length}</button>
                  <button className="follow">Follow {alg.followers.length}</button>
                </section>
                <section className="comments">
                  {
                    alg.comments.map(comment => {
                      var user = this.state.users[comment.user];
                      return (
                        <section className="comment">
                          <div className="sixth">
                            <div className="userpic"></div>
                          </div>
                          <div className="half">
                            <div className="name">{user.name} {user.surname}</div>
                            <div>{comment.text}</div>
                          </div>
                        </section>
                      );
                    })
                  }
                </section>
              </section>
            );
          })
        }
      </div>
    );
  }

  renderUserpic() {
    if (this.state.currentUser != -1) {
      var user = this.state.users[this.state.currentUser];
      return (
        <div>
          <div className="userpic right" onClick={() => this.setPage("user")}></div>
          <h4 className="login right" onClick={() => { this.setUser(-1); this.setPage("welcome"); }}>Log out</h4>
        </div>
      );
    }
    return (
      <h4 className="login" onClick={() => this.setPage("login")}>Log in</h4>
    );
  }

  setUser(i) {
    this.setState({
      currentUser: i,
    });
  }

  setPage(page) {
    this.setState({
      page: page,
    });
  }

  setSelectedUser(i) {
    this.setState({
      selectedUser: i,
    });
  }

  render() {
    document.title = "WealthMan";

    return (
      <div className="page">
        <div className="header">
          <div className="container">
            <img src={logo} className="logo left" onClick={() => (this.state.currentUser > -1 ? this.setPage("main") : this.setPage("welcome"))}/>
            {this.renderUserpic()}
          </div>
        </div>
        <section className="content">
          {this.renderContent()}
        </section>
      </div>
    );
  }
}

class User extends Component {
  render() {
    if (this.props.user.type === "investor")
      return (
        <Investor user={this.props.user} data={this.props.data} />
      );
    return (
      <Manager user={this.props.user} />
    );
  }
}

export default App;
