import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Loadable from 'react-loadable';

import myDate from './myDate.js';

import logoWhite from './logo.svg';
import logoBlue from './logo_blue.svg';
import './css/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: -1,
      login: "",
      password: "",

      currentPage: "requests",
      currentManager: 0,
      currentInvestor: 0,
      currentAlgorythm: 0,
      currentPortfolio: 0,
      currentRequest: 0,

      currentAccountPage: "personal",
      currentPortfoliosPage: "active",
      currentAlgorythmsPage: "uploaded",

      currentCurrency: "USD",
      currentCurrencyPrices: {
        USD: 1,
        BTC: 6848.77,
        ETH: 415.132,
        XRP: 0.491838,
        BCH: 651.954,
        LTC: 113.974,
      },

      prevousPages: [],

      loggedInvestorLinks: ["portfolios", "managers", "account", "logout"],
      loggedManagerLinks: ["requests", "portfolios", "account", "algorythms", "logout"],
      loggedSuplierLinks: ["some page"],
      unloggedLinks: ["about us", "faq", "contact", "login"],//, "login"],//, "invest"],

      investors: [
        {
          type: "investor",
          id: 0,
          name: "Kisa",
          surname: "Vorobyaninov",
          img: "0.jpg",
          age: 36,
          email: "vorobyaninov@mail.ru",
          kyc: false,
          registered: "19.03.2018",
        },
        {
          type: "investor",
          id: 1,
          name: "Jim",
          surname: "Taggart",
          img: "1.jpg",
          age: 31,
          email: "jim@taggart-transcontinental.us",
          kyc: true,
          registered: "20.03.2017",
        },
        {
          type: "investor",
          id: 2,
          name: "John",
          surname: "Bolton",
          img: "2.jpg",
          age: 25,
          email: "bolton@mail.com",
          kyc: true,
          registered: "08.11.2017",
        },
      ],
      managers: [
        {
          type: "manager",
          id: 5,
          name: "Andrey",
          surname: "Morozov",
          age: 28,
          img: "5.jpg",
          company: 5,
          money: 97000,
          methodology: "VAR method",
          biography: "KEF HOLDINGS, Business Analyst. DIFC, Dubai, UAE.                                                                       September 2016 – August 2017 • Engaged in financial modeling, transaction due diligence, and investment portfolio performance tracking  • Conducted detailed due diligence on the country, market, competitive environment and financial issues • Conducted regular financial research to stay apprised about global economy and global financial markets • Represented the firm's commercial interests while leading sales, tender contract negotiations, and business development • Worked on projects covering strategy formulation, new project investments, and growth opportunities for KEF Infra GO GOODSCOUT, Executive Insurance Broker. New York, NY, USA.      April 2015 – November 2015 • Managed all aspects of business development from initial strategic and fiscal planning to final testing and delivery • Established strategic business partnerships with over 40 global program senior officials at universities in NYC • Obtained NY Life & Health and Property & Casualty insurance producer licenses INFLOT WORLDWIDE, Supervising Port Agent.  St. Petersburg, Russia.      May 2009 – July 2009 • Coordinated over 100 clearance procedures for international passenger cruise ships calling to the port of SPb • Liaised with port authorities, procured supplies, and arranged customs, immigration and quarantine clearance procedures • Organized documentation filing including submission of crew lists, cargo manifest and trading certificates • Arranged vessel mooring and handling, as well as husbandry services for various types of vessels E",
          social: {
            facebook: "",
            linkedin: ""
          },
          terms: "1,5% of AUM, monthly paid",
          investors: 404,

          rating: 9,
          aum: 13,
          assets: 2,
          profit: 2,
          initial: 2,
          output: 2,
          annual: 2,
          clients: 4,
        },
        {
          type: "manager",
          id: 6,
          name: "Andrei",
          surname: "Huseu",
          age: 28,
          img: "6.jpg",
          company: 6,
          money: 97000,
          methodology: "random",
          biography: "--",
          social: {
            facebook: "",
            linkedin: ""
          },
          terms: "1,5% of AUM, monthly paid",
          investors: 404,

          rating: 9,
          aum: 13,
          assets: 2,
          profit: 2,
          initial: 2,
          output: 2,
          annual: 2,
          clients: 4,
        },
        {
          type: "manager",
          id: 7,
          name: "Olga",
          surname: "Pershina",
          age: 28,
          img: "7.jpg",
          company: 7,
          money: 97000,
          methodology: "random",
          biography: "--",
          social: {
            facebook: "",
            linkedin: ""
          },
          terms: "1,5% of AUM, monthly paid",
          investors: 404,

          rating: 9,
          aum: 13,
          assets: 2,
          profit: 2,
          initial: 2,
          output: 2,
          annual: 2,
          clients: 4,
        },
      ],

      companies: [
        {
          id: 5,
          name: "Moroz&Co",
          img: "ponzi.jpg",
          site: "https://en.wikipedia.org/wiki/Ponzi_scheme"
        },
        {
          id: 6,
          name: "Moroz&Co",
          img: "ponzi.jpg",
          site: "https://en.wikipedia.org/wiki/Ponzi_scheme"
        },
        {
          id: 7,
          name: "Mera Kapital",
          img: "mera.png",
          site: "http://www.mera-capital.com/"
        },
      ],

      algorythms: [
      ],

      staticQuestions: [
        {
          type: "",
          question: "What is your primary reason for investing?",
          answers: ["General Savings", "Retirement", "Colledge savings", "Other"]
        },
        {
          question: "What is your current age?",
          answers: ["18-24", "25-32", "33-46", "47-54", "55 or older"]
        },
        {
          question: "What is your pre-tax income?",
          answers: ["100-500$", "500-1000$", "1000-5000$", "5000-10000$", "10000-100000$", "100000$ or more"]
        },
        {
          question: "What of the following best describes your household?",
          answers: ["Single income, no dependents", "Single income, at least one dependent", "Dual income, no dependents", "Dual income, at least one dependent", "Retired or financially independent"]
        },
        {
          question: "What is the total value of your cash in liquid investments?",
          answers: ["100-500$", "500-1000$", "1000-5000$", "5000-10000$", "10000-100000$", "100000$ or more"]
        },
        {
          question: "When deciding how to invest your money, wich do you care about more?",
          answers: ["Maximizing gains", "Minimizing looses", "Both equally"]
        },
        {
          question: "The global stock market is often volatile. If your entire investement portfolio lost 10% of its value in a month during a market decline, what would you do?",
          answers: ["Sell all of your investments", "Sell some", "Keep all", "Buy more"]
        },
        {
          question: "What is the total value of your cash in liquid investments?",
          answers: ["100-500$", "500-1000$", "1000-5000$", "5000-10000$", "10000-100000$", "100000$ or more"]
        },
      ],
      dynamicQuestions: [
        {
          question: "Du you like this site?",
          answers: ["yes", "no"]
        },
        {
          question: "Are you rich yet?",
          answers: ["yes", "no"]
        },
      ],
      managerQuestions: [
        {
          question: "Are u ready to get rich?",
          answers: ["yes", "definitely", "absolutely!!"]
        },
        {
          question: "Will u invest more soon?",
          answers: ["yes", "definitely", "absolutely!!"]
        },
      ],
      account: {
        personalInfo: {
          firstName: "",
          lastName: "",
          day: 0,
          month: 0,
          year: 0,
          nationality: "",
        }
      },
      portfolios: [
        {
          type: "portfolio",
          id: 0,
          investor: 0,
          manager: 0,
          date: "15:16 01-02-2013",
          value: 1,
          currency: "ETH",
          alg: 0,
          profit: 12,
          cost: 0.2,
          status: "recalculating"
        },
        {
          type: "portfolio",
          id: 1,
          investor: 2,
          manager: 4,
          date: "15:16 01-02-2013",
          value: 7,
          currency: "ETH",
          alg: 1,
          profit: -247,
          cost: 0.4,
          status: "recalculated"
        },
        {
          type: "portfolio",
          id: 2,
          investor: 1,
          manager: 3,
          date: "15:16 01-02-2013",
          value: 6,
          currency: "ETH",
          alg: 2,
          profit: 164,
          cost: 0.67,
          status: "recalculated"
        },
      ],
      requests: [
        {
          type: "request",
          id: 0,
          investor: 0,
          manager: 0,
          date: "15:16 12-11-2017",
          value: 1,
          currency: "ETH",
          status: "revision",
        },
        {
          type: "request",
          id: 1,
          investor: 2,
          manager: 0,
          date: "15:16 10-04-2018",
          value: 10,
          currency: "BTC",
          status: "pending",
        },
        {
          type: "request",
          id: 2,
          investor: 0,
          manager: 2,
          date: "11:16 11-04-2018",
          value: 3,
          currency: "ETH",
          status: "declined",
        },
        {
          type: "request",
          id: 3,
          investor: 1,
          manager: 3,
          date: "19:40 01-02-2016",
          value: 4,
          currency: "ETH",
          status: "pending",
        },
      ],
      agreement: "Wealthfront Inc. is an SEC registered investment advisor.\nBy using this website, you accept our Terms of Use and Privacy Policy. Past performance is no guarantee of future results. Any historical returns, expected returns, or probability projections may not reflect actual future performance. All securities involve risk and may result in loss. Our financial planning services were designed to aid our clients in preparing for their financial futures and allow them to personalize their assumptions for their portfolios. We do not intend to represent that our financial planning guidance is based on or meant to replace a comprehensive evaluation of a client's entire personal portfolio. While the data Wealthfront uses from third parties is believed to be reliable, Wealthfront cannot ensure the accuracy or completeness of data provided by clients or third parties. Wealthfront does not provide tax advice and does not represent in any manner that the outcomes described herein will result in any particular tax consequence. Prospective investors should confer with their personal tax advisors regarding the tax consequences based on their particular circumstances. Wealthfront assumes no responsibility for the tax consequences for any investor of any transaction. Full Disclosure\nThe Wealthfront Risk Parity Fund is managed by WFAS LLC, an SEC registered investment adviser and a wholly owned subsidiary of Wealthfront Inc. WFAS LLC receives an annual management fee equal to 0.50% of the Fund's average daily net assets. Northern Lights Distributors, LLC, a member of FINRA / SIPC, serves as the principal distributor for the Fund.\nBefore investing in the Wealthfront Risk Parity Fund, you should carefully consider the Fund's investment objectives, risks, fees and expenses. This and other information can be found in the Fund's prospectus. Please read the fund prospectus or summary prospectus carefully before investing. In order to add the Wealthfront Risk Parity Fund, we must rebalance your portfolio. As part of this process, if we sell positions at a gain, and you do not have sufficient harvested losses to offset those gains, you'll pay taxes on the net gain.\nAll investing is subject to risk, including the possible loss of the money you invest. In addition, an investment in the Wealthfront Risk Parity Fund (the \"Fund\") would also subject you to the following principal risks, among others: The Fund's principal investment strategy requires the use of derivative instruments, such as investments in total return swaps, forward and futures contracts. In general, a derivative instrument typically involves leverage, providing exposure to potential gain or loss from a change in market price of the underlying security or commodity in a notional amount that exceeds the amount of cash or assets required to establish or maintain the derivative instrument. Adverse changes in the value of the underlying asset or index, can result in a loss to the Fund substantially greater than the amount invested in the derivative itself. These derivative instruments provide the economic effect of financial leverage by creating additional investment exposure to the underlying instrument. Financial leverage will magnify, sometimes significantly, the Fund's exposure to any increase or decrease in prices associated with a particular reference asset resulting in increased volatility in the value of the Fund's portfolio. While such financial leverage has the potential to produce greater gains, it also may result in greater losses, which in some cases may cause the Fund to liquidate other portfolio investments at a loss to comply with limits on leverage and asset segregation requirements imposed by the 1940 Act or to meet redemption requests. If the Fund uses leverage through the purchase of derivative instruments, the Fund has the risk that losses may exceed the net assets of the Fund. The net asset value of the Fund while employing leverage will be more volatile and sensitive to market movements. Investments in total return swap agreements also involves the risk that the party with whom the Fund has entered into the total return swap agreements will default on its obligation to pay the Fund. The Fund's use of derivatives may cause the Fund to realize higher amounts of short-term capital gains than if the Fund had not used such instruments. The Fund may also be subject to overall equity market risk, including volatility, which may affect the value of individual instruments in which the Fund invests. Factors such as domestic and foreign economic growth and market conditions, interest rate levels, and political events affect the securities markets. Markets also tend to move in cycles, with periods of rising and falling prices. If there is a general decline in the securities and other markets, your investment in the Fund may lose value, regardless of the individual results of the securities and other instruments in which the Fund invests. When the value of the Fund's investments goes down, your investment in the Fund decreases in value and you could lose money. As a new fund, there can be no assurance that the Fund will grow to or maintain an economically viable size, in which case it could ultimately liquidate. The Fund is non-diversified under the 1940 Act and may be more susceptible than a diversified fund to being adversely affected by any single corporate, economic, political or regulatory occurrence. For more information regarding the risks of investing in the Fund, please see Principal Investment Risks section of the Fund's prospectus. Past performance is no guarantee of future results.",

      tokens: [
        {
          "name": "Bitcoin",
          "symbol": "BTC",
          "price_usd": "8799.69",
          "price_btc": "1.0",
          "market_cap_usd": "149518718278",
        },
        {
          "name": "Ethereum",
          "symbol": "ETH",
          "price_usd": "605.189",
          "price_btc": "0.0688367",
          "market_cap_usd": "59892115473.0",
        },
        {
          "name": "Ripple",
          "symbol": "XRP",
          "price_usd": "0.858897",
          "price_btc": "0.00009769",
          "market_cap_usd": "33602451230.0",
        },
        {
          "name": "Bitcoin Cash",
          "symbol": "BCH",
          "price_usd": "1135.44",
          "price_btc": "0.129149",
          "market_cap_usd": "19400652981.0",
        },
        {
          "name": "EOS",
          "symbol": "EOS",
          "price_usd": "10.8138",
          "price_btc": "0.00123001",
          "market_cap_usd": "8741671551.0",
        },
        {
          "name": "Litecoin",
          "symbol": "LTC",
          "price_usd": "147.318",
          "price_btc": "0.0167565",
          "market_cap_usd": "8277586684.0",
        },
        {
          "name": "Cardano",
          "symbol": "ADA",
          "price_usd": "0.28347",
          "price_btc": "0.00003224",
          "market_cap_usd": "7349546685.0",
        },
        {
          "name": "Stellar",
          "symbol": "XLM",
          "price_usd": "0.367553",
          "price_btc": "0.00004181",
          "market_cap_usd": "6825325914.0",
        },
        {
          "name": "IOTA",
          "symbol": "MIOTA",
          "price_usd": "1.89329",
          "price_btc": "0.00021535",
          "market_cap_usd": "5262456890.0",
        },
        {
          "name": "NEO",
          "symbol": "NEO",
          "price_usd": "74.1089",
          "price_btc": "0.00842946",
          "market_cap_usd": "4817078500.0",
        }
      ],
    };
  }

  priceUSD(currency) {
    var fullName;
    switch(currency) {
      case "BTC":
        fullName = "bitcoin";
        break;
      case "ETH":
        fullName = "ethereum";
        break;
      case "XRP":
        fullName = "ripple";
        break;
      case "BCH":
        fullName = "bitcoin-cash";
        break;
      case "LTC":
        fullName = "litecoin";
        break;
    }
    const myFirstPromise = new Promise((resolve, reject) => {
      fetch("https://api.coinmarketcap.com/v1/ticker/" + fullName)
        .then(res => res.json())
        .then(
          (result) => {
            resolve(parseFloat(result.price_usd));
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  tryLogin() {
    if (this.state.password == "123" && this.state.login == "investor")
      this.setState({
        user: 0,
        currentPage: "contracts"
      });
      if (this.state.password == "123" && this.state.login == "manager")
        this.setState({
          user: 1,
          currentPage: "contracts"
        });
  }
  logout() {
    this.setState({
      user: -1,
      currentPage: "landing",
      login: "",
      password: ""
    });
  }

  setPage(page, id) {
    var prevousPages = this.state.prevousPages.slice();
    prevousPages.push(this.state.currentPage);
    if (typeof id !== "undefined")
      switch (page) {
        case "manager":
          this.setState({currentManager: id})
          break;
        case "algorythm":
          this.setState({currentAlgorythm: id})
          break;
        case "portfolio":
          this.setState({currentPortfolio: id})
          break;
        case "request":
          this.setState({currentRequest: id})
          break;
      }

    this.setState({
      currentPage: page,
      prevousPages: prevousPages,
      currentAccountPage: "personal",
      currentPortfoliosPage: "active",
    });
  }
  prevousPage() {
    var prevousPages = this.state.prevousPages.slice();
    if (prevousPages.length == 0)
      return;
    var currentPage = prevousPages.pop();

    this.setState({
      currentPage: currentPage,
      prevousPages: prevousPages
    })
  }

  renderBackButton() {
    if (this.state.prevousPages.length == 0)
      return;

    var prevousPage = capitalize(this.state.prevousPages[this.state.prevousPages.length - 1]);

    return (
      <div className="third-header">
        <div className="container">
          <button className="back" onClick={() => this.prevousPage()}>Back to {prevousPage}</button>
        </div>
      </div>
    );
  }
  renderProgressBar() {
    var pages = ["register", "agreement", "static form", "dynamic form", "manager form", "KYC", "accept", "money"];
    var progress = pages.indexOf(this.state.currentPage) + 1;
    var total = pages.length;

    return (
      <div className="progress-bar">
        <div className="progress" style={{width: (100 / total * progress) + "%"}}></div>
      </div>
    );
  }

  renderPage() {
    switch (this.state.currentPage.toLowerCase()) {
      case "login":
        return this.renderLoginPage();
      case "contracts":
        return this.renderContractsPage();
      case "investment":
        return this.renderInvestmentPage();
      case "documents":
        return this.renderDocumentsPage();
      case "about us":
        return this.renderAboutUsPage();
      case "origin":
        return this.renderOriginPage();
      case "invest":
        return this.renderInvestPage();

      case "legal":
        return this.renderLegalPage();
      case "contacts":
        return this.renderContactsPage();
      case "methodology":
        return this.renderMethodologyPage();
      case "press":
        return this.renderPressPage();
      case "help center":
        return this.renderHelpCenterPage();
      case "blog":
        return this.renderBlogPage();

      case "manager":
        return this.renderManagerPage();
      case "algorythm":
        return this.renderAlgorythmPage();

      /* FORMS */
      case "static form":
        return this.renderStaticForm();
      case "dynamic form":
        return this.renderDynamicForm();
      case "agreement":
        return this.renderAgreementPage();
      case "manager form":
        return this.renderManagerForm();
      case "thanks":
        return this.renderThanksPage();
      case "register":
        return this.renderRegisterPage();
      case "money":
        return this.renderMoneyPage();
      case "kyc":
        return this.renderKYCPage();
      case "accept":
        return this.renderAcceptPage();

      default:
        return this.renderLandingPage();
    }
  }

  renderLoginPage() {
    return (
      <div>
        <LoginForm title="" tryLogin={(login, password) => this.tryLogin(login, password)} />
        {/* <LoginForm title="Log in as Manager" tryLogin={(login, password) => this.tryLogin(login, password)} />
        <LoginForm title="Log in as Data Supplier" tryLogin={(login, password) => this.tryLogin(login, password)} /> */}
      </div>
    );
    return (
      <div className="login-box">
        <h3>Welcome back</h3>
        <b>Email</b>
        <input type="text" value={this.state.login} onChange={(event) => this.setState({ login: event.target.value })} placeholder="me@example.com" />
        <b>Password</b>
        <input type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} placeholder="password" />
        {/* <h3>Choose your role</h3>
        <select>
          <option onClick={() => this.setState({ login: "investor", password: "123" })}>investor</option>
          <option onClick={() => this.setState({ login: "manager", password: "123" })}>manager</option>
        </select> */}
        <button className="login" onClick={() => this.tryLogin()}>Log in</button>
      </div>
    );
  }
  renderLogin2Page() {
    return (
      <div>
        <LoginForm title="Login for Experts" tryLogin={(login, password) => this.tryLogin(login, password)} />
        {/* <LoginForm title="Log in as Manager" tryLogin={(login, password) => this.tryLogin(login, password)} />
        <LoginForm title="Log in as Data Supplier" tryLogin={(login, password) => this.tryLogin(login, password)} /> */}
      </div>
    );
    return (
      <div className="login-box">
        <h3>Welcome back</h3>
        <b>Email</b>
        <input type="text" value={this.state.login} onChange={(event) => this.setState({ login: event.target.value })} placeholder="me@example.com" />
        <b>Password</b>
        <input type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} placeholder="password" />
        {/* <h3>Choose your role</h3>
        <select>
          <option onClick={() => this.setState({ login: "investor", password: "123" })}>investor</option>
          <option onClick={() => this.setState({ login: "manager", password: "123" })}>manager</option>
        </select> */}
        <button className="login" onClick={() => this.tryLogin()}>Log in</button>
      </div>
    );
  }

  renderContractsPage() {
    return (
      <div>
        <div className="second-header">
          <div className="container">
            <div className="title">
              <h2>My Contracts</h2>
              <p className="grey">Personal account</p>
            </div>
            <div className="description">
              <h2>$200.00</h2>
              <p className="grey">Total value</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="first-tab">
            <div className="box">
              <div className="row">
                contract 1
              </div>
              <div className="row">
                contract 2
              </div>
              <div className="row">
                contract 3
              </div>
            </div>
          </div>
          <div className="second-tab">
            <div className="box">
              <button className="transactions-link">See transactions history</button>
            </div>
            <div className="box">
              <h4>Have a question?</h4>
              <div className="question">What is WealthMan investment strategy?</div>
              <div className="question">What defines long-term investing?</div>
              <div className="question">Can WealthMan help me plan for retirement?</div>
              <div className="question">What fees will I pay?</div>
              <div className="question">What is tax-loss harvesting?</div>
              <div className="question">When will my money be invested?</div>
              <div className="question">How does client support work?</div>
              <div className="question">I have a different question</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderInvestmentPage() {
    var newAlg = this.state.algorythms.slice(0, 5).map((alg, index) => {
        var creator = this.state.managers[alg.creator];
        return (
          <div className="question">
            <p>{index + 1}.</p>
            <button className="transactions-link left" onClick={() => this.setPage("algorythm", alg.id)}>{alg.name}</button>
            <p>by</p>
            <button className="transactions-link left" onClick={() => this.setPage("manager", creator.id)}>{creator.name} {creator.surname}</button>
          </div>
        );
      }
    );

    var managers = this.state.managers.slice().sort((a, b) => {
      return b.rating - a.rating;
    }).map((manager, index) =>
      <div className="manager" onClick={() => this.setPage("manager", manager.id)}>
        <div className="circle left">
          <img src={"managers/" + manager.img} className="avatar" />
        </div>
        <h4>{manager.name} {manager.surname}</h4>
        <p className="grey">rating {manager.rating}/10</p>
      </div>
    );

    var algorythms = this.state.algorythms.slice().sort((a, b) => {
      return b.rating - a.rating;
    }).map((alg, index) =>
      <div className="manager" onClick={() => this.setPage("algorythm", alg.id)}>
        <h4>{alg.name}</h4>
        <p className="grey">rating {alg.rating}/10</p>
      </div>
    );

    return (
      <div>
        <div className="long-header"></div>
        <div className="container">
          <div className="first-tab">
            <div className="box">
              <h3>Top managers</h3>
              {managers}
              <div className="row">
                <button className="transactions-link right">See more...</button>
              </div>
            </div>
            <div className="box">
              <h3>Top algorythms</h3>
              {algorythms}
              <div className="row">
                <button className="transactions-link right">See more...</button>
              </div>
            </div>
          </div>
          <div className="second-tab">
            <div className="box">
              <h4>New algorythms</h4>
              {newAlg}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDocumentsPage() {
    return (
      <div>
        {this.renderBackButton()}
        <div className="container">
          <h1>Taxes & Documents</h1>
          <div className="first-tab">
            <div className="box">
              <h4>Tax Documents</h4>
            </div>
            <div className="box">
              <h4>Statements and Trade Confirmations</h4>
            </div>
            <div className="box">
              <h4>Your ID's</h4>
            </div>
          </div>
          <div className="second-tab">
            <div className="box">
              <h4>Other Links</h4>
              <button className="transactions-link">Client Agreement for My Personal Account</button>
              <button className="transactions-link">Portfolio Line of Credit Agreement</button>
              <button className="transactions-link" onClick={() => this.setPage("help center")}>Help Center Articles</button>
            </div>
            <div className="box">
              <h4>Send us a document</h4>
              <p className="grey">If we have asked you to send us a document, you can upload them here.</p>
              <button className="send">Upload a document</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderManagerAccountPage() {
    this.setPage("account");
  }

  renderAboutUsPage() {
    return (
      <div className="container">
        <div className="box">
          <h2>About us</h2>
          <p>whitepaper and so on</p>
        </div>
      </div>
    );
  }

  renderOriginPage() {
    return (
      <div className="container">
        <div className="box">
          <h2>Origin</h2>
          <p>well, we are ICO</p>
        </div>
      </div>
    );
  }

  renderInvestPage() {
    this.setPage("investment");
    return (
      <div>
      </div>
    );
  }

  renderLegalPage() {
    return (
      <div className="container">
        <div className="box">
          <h2 className="text-center">Legal Documents</h2>
          <h3>Client agreements</h3>
          <p>bla-bla-bla</p>
          <h3>General</h3>
          <p>bla-bla-bla</p>
          <h3>Taxes</h3>
          <p>bla-bla-bla</p>
        </div>
      </div>
    );
  }

  renderContactsPage() {
    return (
      <div className="container">
        <div className="box">
          <h2 className="text-center">Our contacts</h2>
        </div>
      </div>
    );
  }

  renderMethodologyPage() {
    return (
      <div className="container">
        <div className="box">
          <h2 className="text-center">Methodology</h2>
          <p>Nobody knows for sure</p>
        </div>
      </div>
    );
  }

  renderPressPage() {
    return (
      <div className="container">
        <div className="box">
          <h2 className="text-center">Press</h2>
          <p>Press loves us, and bitconnect</p>
        </div>
      </div>
    );
  }

  renderHelpCenterPage() {
    return (
      <div className="container">
        <div className="box">
          <h2 className="text-center">Help</h2>
          <p>Press on Invest button and all will be well</p>
        </div>
      </div>
    );
  }

  renderBlogPage() {
    return (
      <div className="container">
        <div className="box">
          <h2 className="text-center">Blog</h2>
        </div>
      </div>
    );
  }

  renderLandingPage() {
    return (
      <div className="container">
        <div className="box">
          <h1 className="text-center">Landing page</h1>
          <p>Wealthman is a decentralized platform for development, execution and marketing of wealth management service. The platform is embedded with strong antifraud features allowing autonomous robo-advisors and human-driven digital asset management services are to be secure for investors.</p>
        </div>
      </div>
    );
  }

  renderManagerPage(match) {
    var manager = this.state.managers.find(manager => manager.id == match.params.id);
    var company = this.state.companies.find(company => company.id == manager.company);
    var companies;
    var algs = this.state.algorythms.filter(alg => {
      return alg.creator == manager.id;
    });
    // }).map(alg =>
    //   <div className="manager-listing" onClick={() => this.setPage("algorythm", alg.id)}>
    //     <h4>{alg.name}</h4>
    //     <p className="grey">rating {alg.rating}/10</p>
    //   </div>
    // );

    return (
      <div>
        {/* {this.renderBackButton()} */}
        <div className="container">
          <div className="first-tab">
            <div className="manager-box">
              <div className="cover"></div>
              <div className="info">
                <div className="circle">
                  <img src={manager.img} className="avatar" />
                </div>
                <h2 className="text-center">{manager.name} {manager.surname}</h2>
                <h4 className="text-center">Age {manager.age}</h4>
                <div className="row-padding">
                  <div className="column center">
                    {/* {this.state.user !== -1 ? (<button className="back">Contact</button>) : ""} */}
                    {/* <Link to={"/contact"}> */}
                      <button className="back">Contact</button>
                    {/* </Link> */}
                    {/* <Link to="/register"> */}
                      <button className="continue">Invest</button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="row-padding">
              <div className="box">
                <h4>Fees</h4>
                {/* <p>Manager will ask you to agree with</p>
                <ul>
                  <li>Condition 1</li>
                  <li>Condition 2</li>
                  <li>Condition 3</li>
                  <li>Condition 4</li>
                </ul>
                <p>and also</p>
                <ul>
                  <li>Condition 1</li>
                  <li>Condition 2</li>
                  <li>Condition 3</li>
                  <li>Condition 4</li>
                </ul> */}
                {manager.terms}
              </div>
            </div>

            <div className="row-padding">
              <div className="box margin-right row">
                <div className="third">
                  <p className="blue">Social networks:</p>
                  <button className="facebook"></button>
                  <button className="twitter"></button>
                  <button className="linkedin"></button>
                </div>
                <div className="two-third">
                  <p className="blue">Biography:</p><p> {manager.biography}</p>
                </div>
              </div>
              {/* <div className="half-box">
                <div className="circle left">
                  <img src={"companies/" + company.img} className="avatar" />
                </div>
                <div className="half">
                  <p className="blue">Company</p>
                  <h3>{company.name}</h3>
                  <a>{company.site}</a>
                </div>
                <div className="row">
                  <p className="blue">Social networks:</p>
                  <button className="facebook"></button>
                  <button className="twitter"></button>
                  <button className="linkedin"></button>
                </div>
              </div>            */}
            </div>

          </div>
          <div className="second-tab">
            <div className="box">
              <div className="circle left">
                <img src={"companies/" + company.img} className="avatar" />
              </div>
              <div className="row">
                <p className="blue">Company</p>
                <h3>{company.name}</h3>
                <div className="row tridot">
                  <a>{company.site}</a>
                </div>
              </div>
              <div className="row">
                <p className="blue">Social networks:</p>
                <button className="facebook"></button>
                <button className="twitter"></button>
                <button className="linkedin"></button>
              </div>
            </div>
            <div className="box">
              <p className="blue">Methodology:</p><p> {manager.methodology}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderAlgorythmPage() {
    var alg = this.state.algorythms[this.state.currentAlgorythm];
    var manager = this.state.managers[alg.creator];
    var investButton;
    if (this.state.user == -1)
      investButton = (<button className="continue" onClick={() => this.setPage("register")}>Invest</button>);
    else
      investButton = (<button className="continue" onClick={() => this.setPage("manager form")}>Invest</button>);

    return (
      <div>
        {this.renderBackButton()}
        <div className="container">
          <div className="box">
            <h3>{alg.name}</h3>
            <div className="question">
              <p className="grey left">by</p>
              <button className="transactions-link left" onClick={() => this.setPage("manager", manager.id)}>{manager.name} {manager.surname}</button>
            </div>
              <p>rating {alg.rating}/10</p>
              <p>1001 users</p>
              <p>minimum investment amount: 1ETH</p>
              <p>minimum investment period: 2 month</p>
              <p>average risk: 10%</p>
              <p>estimated income: +15%</p>
              <div className="row-padding">
              {investButton}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderStaticForm() {
    var form = this.state.staticQuestions.map(question =>
      <div className="form-question">
        <h4>{question.question}</h4>
        {
          question.answers.map(answer =>
          <div className="answer">
            <input type="radio" id={answer} />
            <label for={answer}>{answer}</label>
          </div>
        )
      }
      </div>
    );

    return (
      <div>
        {this.renderBackButton()}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <div className="container">
              <h2>Static Form Questions</h2>
              <h4 className="grey">Asked once</h4>
              {form}
              <div className="row-padding">
                <button className="back" onClick={() => this.prevousPage()}>Back</button>
                <button className="continue" onClick={() => this.setPage("dynamic form")}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderDynamicForm() {
    var form = this.state.dynamicQuestions.map(question =>
      <div className="form-question">
        <h4>{question.question}</h4>
        {
          question.answers.map(answer =>
          <div className="answer">
            <input type="radio" id={answer} />
            <label for={answer}>{answer}</label>
          </div>
        )
      }
      </div>
    );

    return (
      <div>
        {this.renderBackButton()}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <div className="container">
              <h2>Dynamic Form Questions</h2>
              <h4 className="grey">Asked every month (or quarter/year)</h4>
              {form}
              <div className="row-padding">
                <button className="back" onClick={() => this.prevousPage()}>Back</button>
                <button className="continue" onClick={() => this.setPage("manager form")}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderAgreementPage() {
    return (
      <div>
        {this.renderBackButton()}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <h1 className="text-center">Agreement</h1>
            <p>U agree with that by the way</p>
            <ul>
              <li>Condition 1</li>
              <li>Condition 2</li>
              <li>Condition 3</li>
              <li>Condition 4</li>
            </ul>
            <p>U agree with that too</p>
            <ul>
              <li>Condition 1</li>
              <li>Condition 2</li>
              <li>Condition 3</li>
              <li>Condition 4</li>
            </ul>
            <p>U agree with that also</p>
            <ul>
              <li>Condition 1</li>
              <li>Condition 2</li>
              <li>Condition 3</li>
              <li>Condition 4</li>
            </ul>
            <div className="row-padding">
              <button className="back" onClick={() => this.prevousPage()}>Back</button>
              <button className="continue" onClick={() => { this.setPage("static form"); this.setState({ user: 0 }); }}>Agree</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderManagerForm() {
    var manager = this.state.managers[this.state.algorythms[this.state.currentAlgorythm].creator];
    var form = this.state.managerQuestions.map(question =>
      <div className="form-question">
        <h4>{question.question}</h4>
        {
          question.answers.map(answer =>
          <div className="answer">
            <input type="radio" id={answer} />
            <label for={answer}>{answer}</label>
          </div>
        )
      }
      </div>
    );

    return (
      <div>
        {this.renderBackButton()}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <div className="container">
              <h2>Manager Form Questions</h2>
              <h4 className="grey">Asked by manager ({manager.name} {manager.surname})</h4>
              {form}
              <div className="row-padding">
                <button className="back" onClick={() => this.prevousPage()}>Back</button>
                <button className="continue" onClick={() => this.setPage("KYC")}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderThanksPage() {
    return(
      <div>
        {this.renderBackButton()}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <h2>Thanks for your investment</h2>
            <p>By the way, u can invest more:</p>
            <div className="row-padding">
              <button className="continue" onClick={() => this.setPage("investment")}>Invest more!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderRegisterPage() {
    return(
      <div>
        {this.renderBackButton()}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <h2>Registration page</h2>
            <div className="row-padding">
              <b>Name</b>
              <div className="row">
                <input type="text" placeholder="John" />
              </div>
              <b>Surname</b>
              <div className="row">
                <input type="text" placeholder="Appleseed" />
              </div>
              <b>Email</b>
              <div className="row">
                <input type="text" placeholder="me@example.com" />
              </div>
              <b>Password</b>
              <div className="row">
                <input type="password" placeholder="password" />
              </div>
              <b>Repeat password</b>
              <div className="row">
                <input type="password" placeholder="repeat password" />
              </div>
            </div>
            <div className="row-padding">
              <button className="back" onClick={() => this.prevousPage()}>Back</button>
              <button className="continue" onClick={() => this.setPage("agreement")}>Register</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderKYCPage() {
    return(
      <div>
        {this.renderBackButton()}
        <div className="container">
          <div className="box">
            <h2>Know Your Criminals</h2>
            <div className="row-padding">
              <p>by clicking send, u send this data to manager</p>
            </div>
            <div className="row-padding">
              <button className="back" onClick={() => this.prevousPage()}>Back</button>
              <button className="continue" onClick={() => this.setPage("accept")}>Send to manager</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderAcceptPage() {
    return(
      <div>
        {this.renderBackButton()}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <h2>Accept Smart Contract</h2>
            <p>Smart Contract conditions</p>
            <ul>
              <li>U pay 5% to site</li>
              <li>U pay 10% to manager</li>
              <li>U'll get your money back in a month</li>
              <li>All risks are on U!!!</li>
            </ul>
            <div className="row-padding">
              <button className="back" onClick={() => this.prevousPage()}>Back</button>
              <button className="continue" onClick={() => this.setPage("money")}>Accept</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderMoneyPage() {
    return (
      <div>
        {this.renderBackButton()}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <h2>Send Money</h2>
            <div className="row">
              transfer 1 ETH to this address
            </div>
            <div className="row">
              0x3a8b4013eb7bb370d2fd4e2edbdaf6fd8af6a862
            </div>
            <div className="row">
              After money is received, u can see details in your Contracts page
            </div>
            <div className="row-padding">
              <button className="back" onClick={() => this.prevousPage()}>Back</button>
              <button className="continue" onClick={() => this.setPage("contracts")}>Finish</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    document.title = "WealthMan";

    var headerLinks = this.state.user == -1 ? this.state.unloggedLinks : this.state.loggedLinks;
    headerLinks = headerLinks.map(link =>
      <li className="link">
        <button className={link == "login" || link == "invest" ? link : "link"} onClick={() => this.setPage(link)}>
          {capitalize(link)}
        </button>
      </li>
    );
    var logo = this.state.user == -1 ? logoBlue : logoWhite;

    var footerLinks = this.state.footerLinks.map(link =>
      <li className="link">
        <button className="link" onClick={() => this.setPage(link)}>
          {capitalize(link)}
        </button>
      </li>
    );

    var logout = (
      <li className="link">
        <button className="link no-margin" onClick={() => this.logout()}>
          Log out
        </button>
      </li>
    );

    return (
      <article className="page">
        <header className={this.state.user == -1 ? "header transparent" : "header"}>
          <div className="container">
            <img src={logo} className="logo" onClick={() => (this.state.user == -1 ? this.setPage("landing") : this.setPage("my path"))}/>
            <ul className="links right">
              {headerLinks}
              {this.state.user != -1 ? logout : ""}
            </ul>
          </div>
        </header>
        <div className="content">
          {this.renderPage()}
        </div>
        <div className={this.state.user == -1 ? "footer" : "footer logged"}>
          <div className="footer-container">
            <ul className="links">
              {footerLinks}
            </ul>
            <small>
              By using this website, you accept our Terms of Use and Privacy Policy. Past performance is no guarantee of future results. Any historical returns, expected returns, or probability projections may not reflect actual future performance. All securities involve risk and may result in loss. Our financial planning services were designed to aid our clients in preparing for their financial futures and allow them to personalize their assumptions for their portfolios. We do not intend to represent that our financial planning guidance is based on or meant to replace a comprehensive evaluation of a client's entire personal portfolio. While the data WealthMan uses from third parties is believed to be reliable, WealthMan cannot ensure the accuracy or completeness of data provided by clients or third parties. WealthMan does not provide tax advice and does not represent in any manner that the outcomes described herein will result in any particular tax consequence. Prospective investors should confer with their personal tax advisors regarding the tax consequences based on their particular circumstances. WealthMan assumes no responsibility for the tax consequences for any investor of any transaction. Full Disclosure
            </small>
          </div>
        </div>
      </article>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
    }
  }

  render() {
    return (
      <div className="login-box">
        <h3>{this.props.title}</h3>
        <b>Email</b>
        <input type="text" value={this.state.login} onChange={(event) => this.setState({ login: event.target.value })} placeholder="me@example.com" />
        <b>Password</b>
        <input type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} placeholder="password" />
        <button className="login" onClick={() => this.props.tryLogin(this.state.login, this.state.password)}>Log in</button>
      </div>
    );
  }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function newLines(string) {
  var paragraphs = [];
  var prevI = 0;

  for (var i = 0; i < string.length; i++)
    if (string[i] === '\n') {
      paragraphs.push(string.slice(prevI, i));
      prevI = i;
    }
  paragraphs.push(string.slice(prevI));

  return <div>{paragraphs.map(paragraph => <p>{paragraph}</p>)}</div>;
}
function priceUSD(string) {
  var start = string.indexOf(".");
  var counter = 0;
  for (var i = start; i > 0; i++, counter++)
    if (counter % 3 == 0 && counter != 0) {
      string = string.slice(0, i) + " " + string.slice(i);
      i++;
    }
  return string;
}

export default App;
