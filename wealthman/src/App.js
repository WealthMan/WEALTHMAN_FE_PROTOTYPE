import React, { Component } from 'react';

import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Loadable from 'react-loadable';

import Sortable from './Sortable.js';
import myDate from './myDate.js';

import logoWhite from './img/logo.svg';
import logoBlue from './img/logo_blue.svg';
import './css/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 1,
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

      showCode: false,
      code: "print(\"hello world\");\n\nfor (int i = 0; i < 10; i++)\n\tprint(\"working...\");\n\nprint(\"Oops!\\nAll your money gone.\");\n\nreturn;",

      currentCurrency: "USD",
      currentCurrencyPrices: [
        {
          name: "USD",
          price: 1
        }, {
          name: "BTC",
          price: 6848.77
        }, {
          name: "ETH",
          price: 415.132
        }, {
          name: "XRP",
          price: 0.491838
        }, {
          name: "BCH",
          price: 651.954
        }, {
          name: "LTC",
          price: 113.974
        },
      ],

      prevousPages: [],

      loggedInvestorLinks: [
        {
          label: "portfolios",
          link: "portfolios",
        }, {
          label: "managers",
          link: "managers"
        }, {
          label: "account",
          link: "account"
        }, {
          label: "logout",
          link: "logout"
        }
      ],
      loggedManagerLinks: [
        {
          label: "my requests",
          link: "requests"
        }, {
          label: "portfolios",
          link: "portfolios"
        }, {
          label: "account",
          link: "account"
        // }, {
        //   label: "algorythms",
        //   link: "algorythms"
        }, {
          label: "logout",
          link: "logout"
        }
      ],
      loggedSuplierLinks: [
        {
          label: "some page",
          link: "sone"
        }
      ],
      unloggedLinks: [
        {
          label: "about us",
          link: "about"
        }, {
          label: "faq",
          link: "faq"
        }, {
          label: "team",
          link: "team"
        }, {
          label: "contact us",
          link: "contact"
        }, {
          label: "wealthman",
          link: ""
        }, {
          label: "login",
          link: "login"
        }
      ],//, "login"],//, "invest"],

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
        {
          id: 0,
          creator: 0,
          name: "choose one chair",
          rating: 8,
          currency: "BTC"
        },
        {
          id: 1,
          creator: 3,
          name: "NNN",
          rating: 9,
          currency: "DOGE"
        },
        {
          id: 2,
          creator: 2,
          name: "blackjack",
          rating: 10,
          currency: "BTC"
        },
        {
          id: 3,
          creator: 4,
          name: "not_a_ponzi_scheme",
          rating: 6,
          currency: "BTC"
        },
        {
          id: 4,
          creator: 4,
          name: "not_a_pyramid",
          rating: 5,
          currency: "BTC"
        },
        {
          id: 5,
          creator: 2,
          name: "moon",
          rating: 7,
          currency: "ETH"
        },
        {
          id: 6,
          creator: 0,
          name: "podpolniy millionare",
          rating: 9,
          currency: "ETH"
        },
        {
          id: 7,
          creator: 0,
          name: "son of Captian Shmidt",
          rating: 6,
          currency: "ETH"
        },
        {
          id: 8,
          creator: 2,
          name: "planet express",
          rating: 5,
          currency: "ETH"
        },
        {
          id: 9,
          creator: 1,
          name: "bitconnnneeeeeeeeeeeeect",
          rating: 4,
          currency: "ETH"
        },
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
          manager: 6,
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
          manager: 5,
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
          manager: 7,
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
          manager: 6,
          date: "15:16 12-11-2017",
          value: 1,
          currency: "ETH",
          status: "cancelled",
        },
        {
          type: "request",
          id: 1,
          investor: 2,
          manager: 7,
          date: "15:16 10-04-2018",
          value: 10,
          currency: "BTC",
          status: "accepted",
        },
        {
          type: "request",
          id: 2,
          investor: 0,
          manager: 6,
          date: "11:16 11-04-2018",
          value: 3,
          currency: "ETH",
          status: "declined",
        },
        {
          type: "request",
          id: 3,
          investor: 1,
          manager: 5,
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

      portfolioCurrencies: [
        {
          id: 0,
          type: "currency",
          currency: "BTC",
          percent: 10,
          analysis: "link.com",
          comments: "no comments",
        },
        {
          id: 1,
          type: "currency",
          currency: "ETH",
          percent: 30,
          analysis: "link.com",
          comments: "no comments",
        },
        {
          id: 2,
          type: "currency",
          currency: "XRP",
          percent: 17,
          analysis: "link.com",
          comments: "no comments",
        },
        {
          id: 3,
          type: "currency",
          currency: "BCH",
          percent: 43,
          analysis: "link.com",
          comments: "no comments",
        },
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

  tryLogin(login, password) {
    if (typeof login === "undefined") {
      login = this.state.login;
      password = this.state.password;
    }

    if (password == "123" && login == "investor")
      this.setState({
        user: 0,
        currentPage: "managers"
      });
    if (password == "123" && login == "manager")
      this.setState({
        user: 1,
        currentPage: "requests"
      });
    if (password == "123" && login == "supplier")
      this.setState({
        user: 2,
        currentPage: "managers"
      });
  }
  logout() {
    this.setState({
      user: -1,
      currentPage: "managers",
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
  setCurrency(event) {
    this.setState({
      currentCurrency: event.target.value,
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
    var pages = ["register", "agreement", "static form", "dynamic form", "manager form", "kyc", "thanks2", "accept", "money"];
    var progress = pages.indexOf(this.state.currentPage.toLowerCase()) + 1;
    var total = pages.length;

    return (
      <div className="progress-bar">
        <div className="progress" style={{width: (100 / total * progress) + "%"}}></div>
      </div>
    );
  }

  renderPage() {
    return (
      <Switch>
        <Route exact path="/" render={() => (this.state.user == -1 ? this.renderManagersPage() : this.renderPortfoliosPage())}/>
        <Route path="/login" render={() => this.renderLoginPage()}/>
        <Route path="/totallydifferentlogin" render={() => this.renderLogin2Page()}/>
        <Route path="/account" render={() => this.renderAccountPage()}/>
        <Route path="/about" render={() => this.renderAboutUsPage()}/>
        <Route path="/origin" render={() => this.renderOriginPage()}/>
        <Route path="/invest" render={() => this.renderInvestPage()}/>

        <Route path="/legal" render={() => this.renderLegalPage()}/>
        <Route path="/contacts" render={() => this.renderContactsPage()}/>
        <Route path="/methodology" render={() => this.renderMethodologyPage()}/>
        <Route path="/press" render={() => this.renderPressPage()}/>
        <Route path="/help center" render={() => this.renderHelpCenterPage()}/>
        <Route path="/blog" render={() => this.renderBlogPage()}/>

        <Route path="/manager/:id" render={({match}) => this.renderManagerPage(match)}/>
        <Route path="/algorythm/:id" render={({match}) => this.renderAlgorythmPage(match)}/>
        <Route path="/portfolio/:id" render={({match}) => this.renderPortfolioPage(match)}/>
        <Route path="/request/:id" render={({match}) => this.renderRequestPage(match)}/>

        <Route path="/portfolios" render={() => this.renderPortfoliosPage()}/>
        <Route path="/managers" render={() => this.renderManagersPage()}/>
        <Route path="/algorythms" render={() => this.renderAlgorythmsPage()}/>
        <Route path="/requests" render={() => this.renderRequestsPage()}/>

        <Route path="/static form" render={() => this.renderStaticFormPage()}/>
        <Route path="/dynamic form" render={() => this.renderDynamicFormPage()}/>
        <Route path="/agreement" render={() => this.renderAgreementPage()}/>
        <Route path="/manager form" render={() => this.renderManagerFormPage()}/>
        <Route path="/thanks" render={() => this.renderThanksPage()}/>
        <Route path="/thanks2" render={() => this.renderThanks2Page()}/>
        <Route path="/register" render={() => this.renderRegisterPage()}/>
        <Route path="/money" render={() => this.renderMoneyPage()}/>
        <Route path="/kyc" render={() => this.renderKYCPage()}/>
        <Route path="/accept" render={() => this.renderAcceptPage()}/>

        <Route path="/chat" render={() => this.renderChatPage()}/>
        <Route path="/decline" render={() => this.renderDeclinePage()}/>
        <Route path="/faq" render={() => this.renderFAQPage()}/>
        <Route path="/contacts" render={() => this.renderContactsPage()}/>
        <Route path="/investor-ua" render={() => this.renderInvestorUserAgreementPage()}/>
        <Route path="/manager-ua" render={() => this.renderManagerUserAgreementPage()}/>

        <Route path="/email" render={() => this.renderEmailPage()}/>
        <Route path="/logout" render={() => this.renderManagersPage()}/>

        <Route path="/portfoliocreation" render={() => this.renderPortfolioCreationPage()}/>
      </Switch>
    );
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
        <LoginForm title="Login for Wealth Managers" tryLogin={(login, password) => this.tryLogin(login, password)} />
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

  renderPortfoliosPage() {
    var currentPage;
    var currencies = this.state.currentCurrencyPrices.map(c =>
      <option value={c.name}>{c.name}</option>
    );
    var currentCurrency = this.state.currentCurrencyPrices.find(c => c.name == this.state.currentCurrency);
    var totalValue = this.state.portfolios
      .map(p => {
        var price = this.state.currentCurrencyPrices.find(c => c.name == p.currency).price;
        // return (p.value - p.cost) * price;
        return p.value * price;
      })
      .reduce((a, b) => a + b);

    var portfolios = this.state.portfolios.map(portfolio => {
      var investor = this.state.investors.find(inv => inv.id == portfolio.investor);
      var manager = this.state.managers.find(m => m.id == portfolio.manager);
      var alg = this.state.algorythms.find(alg => alg.id == portfolio.alg);
      var price = this.state.currentCurrencyPrices.find(c => c.name == portfolio.currency).price;

      return {
        type: "portfolio",
        id: portfolio.id,
        number: "",
        number_portfolio: "1000" + portfolio.id,
        number_smart: "23" + (portfolio.id + 3) + (portfolio.id * 2) + "7" + ((portfolio.id + 1) * 7),
        instrument: alg.name,
        profit: portfolio.profit,
        // currency: portfolio.currency,
        // percent_portfolio: (portfolio.value * price / totalValue * 100).toFixed(1),
        // amount: portfolio.value,
        value: (portfolio.value * price / currentCurrency.price).toFixed(3) + " " + currentCurrency.name,
        status: portfolio.status,
        cost: portfolio.cost,
        // analysis: "link.com",
        // comments: "comment",
      };
    });

    var statistics;

    switch (this.state.currentPortfoliosPage) {
      case "active":
        currentPage = (
          <div className="box">
            <h4>Active Portfolios</h4>
            <Sortable
              listings={portfolios}
              setPage={this.setPage.bind(this)}
            />
          </div>
        );
        break;
      case "archived":
        currentPage = (
          <div className="box">
            <h4>Archived Portfolios</h4>
            <Sortable
              listings={portfolios}
              setPage={this.setPage.bind(this)}
            />
          </div>
        );
        break;
      case "statistics":
        currentPage = (
          <div className="box">
            <h4>Statistics</h4>
            {statistics}
          </div>
        );
        break;
      /* NEW ONES */
      case "proposed":
        currentPage = (
          <div className="box">
            <h4>Proposed Portfolios</h4>
            <Sortable
              listings={portfolios}
              setPage={this.setPage.bind(this)}
            />
          </div>
        );
        break;
        case "revision":
          currentPage = (
            <div className="box">
              <h4>Portfolios on revision</h4>
              <Sortable
                listings={portfolios}
                setPage={this.setPage.bind(this)}
              />
            </div>
          );
          break;
          case "recalculated":
            currentPage = (
              <div className="box">
                <h4>Recalculated Portfolios</h4>
                <Sortable
                  listings={portfolios}
                  setPage={this.setPage.bind(this)}
                />
              </div>
            );
            break;
    }

    return (
      <div>
        <div className="second-header">
          <div className="container">
            <div className="title">
              <h2>My Portfolios</h2>
              <p className="grey">Total value</p>
            </div>
            <div className="description">
              <h2>{(totalValue / currentCurrency.price).toFixed(3) + " " + currentCurrency.name}</h2>
              <select value={this.state.currentCurrency} onChange={this.setCurrency.bind(this)}>
                {currencies}
              </select>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="upper-tab">
            <div className="box">
              <button className="transactions-link" onClick={() => this.setState({ currentPortfoliosPage: "proposed" })}>Proposed (Initial)</button>
              <button className="transactions-link" onClick={() => this.setState({ currentPortfoliosPage: "active" })}>Active</button>
              <button className="transactions-link" onClick={() => this.setState({ currentPortfoliosPage: "revision" })}>Revision</button>
              <button className="transactions-link" onClick={() => this.setState({ currentPortfoliosPage: "recalculated" })}>Recalculated</button>
              <button className="transactions-link" onClick={() => this.setState({ currentPortfoliosPage: "archived" })}>Archived</button>
              <button className="transactions-link" onClick={() => this.setState({ currentPortfoliosPage: "statistics" })}>Statistics</button>
            </div>
          </div>
          {currentPage}
        </div>
      </div>
    );
  }

  renderManagersPage() {
    var managers = this.state.managers.map(manager => {
      return {
        type: "manager",
        id: manager.id,
        number: "",
        img: "manager/" + manager.img,
        name: manager.name + " " + manager.surname,
        rating: manager.rating,
        clients: manager.clients,

        aum: 20.1,
        assets: manager.assets,
        profit: manager.profit,
        initial: manager.initial,
        output: manager.output,
        annual: manager.annual,
      };
    });

    return (
      <div>
        <div className="long-header"></div>
        <div className="container">
          <div className="box">
            <h2 className="text-center">Marketplace</h2>
            <Sortable
              listings={managers}
              setPage={this.setPage.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }

  renderAccountPage() {
    var changed = false;
    var accountPage;
    switch (this.state.currentAccountPage) {
      case "personal":
        accountPage = (
          <div className="box">
            {/* <div className="half padding-side">
              <h3 className="high">Personal Info</h3>
              <input type="text" placeholder="First Name"/>
              <input type="text" placeholder="Last Name"/>
              <input type="text" placeholder="day of birth"/>
              <input type="text" placeholder="month"/>
              <input type="text" placeholder="year"/>
              <input type="text" placeholder="nationality"/>
            </div> */}
            <div className="half padding-side">
              <h3 className="high">Contact information</h3>
              <input type="text" placeholder="email"/>
              <input type="text" placeholder="phone number"/>
              <h3 className="high">Change password</h3>
              <input type="password" placeholder="old password"/>
              <input type="password" placeholder="new password"/>
              <input type="password" placeholder="repeat new password"/>
            </div>
            <div className="row-padding">
              <button className={changed ? "continue" : "continue"}>Save changes</button>
            </div>
          </div>
        );
        break;
        case "kyc":
          accountPage = (
            <div className="box">
              <div className="half padding-side">
                <h3 className="high">Personal Info</h3>
                <input type="text" placeholder="First Name"/>
                <input type="text" placeholder="Last Name"/>
                <input type="text" placeholder="phone number"/>
                <input type="text" placeholder="day of birth"/>
                <input type="text" placeholder="month"/>
                <input type="text" placeholder="year"/>
                <input type="text" placeholder="nationality"/>
              </div>
              <div className="half padding-side">
                <h3 className="high">Address Information</h3>
                <input type="text" placeholder="Street Address"/>
                <input type="text" placeholder="Postal Code"/>
                <input type="text" placeholder="City"/>
                <input type="text" placeholder="State"/>
                <input type="text" placeholder="Country"/>
              </div>
              {/* <div className="row-padding">
                <button className={changed ? "continue" : "continue"}>Save changes</button>
              </div> */}
                <div className="row padding-side">
                  <h3 className="high">ID or Passport</h3>
                  <p>Please upload a photo or a scan of the following:</p>
                  <div className="document-box">
                    <h3 className="text-center">ID or Passport</h3>
                    <div className="row">
                      <button className="continue">UPLOAD DOCUMENT</button>
                    </div>
                  </div>
                  <div className="document-box">
                    <h3 className="text-center">Selfie holding ID or Passport</h3>
                    <div className="row">
                      <button className="continue">UPLOAD DOCUMENT</button>
                    </div>
                  </div>
                </div>
            </div>
          );
          break;
      // case "ID":
      //   accountPage = (
      //     <div className="box">
      //       <div className="row">
      //         <h3>ID or Passport</h3>
      //         <p>Please upload a photo or a scan of the following:</p>
      //         <div className="document-box">
      //           <h3 className="text-center">ID or Passport</h3>
      //           <div className="row">
      //             <button className="continue">UPLOAD DOCUMENT</button>
      //           </div>
      //         </div>
      //         <div className="document-box">
      //           <h3 className="text-center">Selfie holding ID or Passport</h3>
      //           <div className="row">
      //             <button className="continue">UPLOAD DOCUMENT</button>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );
      //   break;
      // case "residency":
      //   accountPage = (
      //     <div className="box">
      //       <h3>Residency</h3>
      //       <p>Please upload proof of residency: an official document showing your name and current address. Note tha the entire document has to be scanned</p>
      //       <h4>Accepted Documents</h4>
      //       <ul>
      //         <li>Current utility bill (e.g. gas, water, electric cable, Internet and telephone)</li>
      //         <li>Mortgage statement</li>
      //         <li>Tax bill</li>
      //         <li>Driver's license</li>
      //         <li>House of motor ensurance certificate</li>
      //         <li>Credit card statement</li>
      //         <li>Bank statement</li>
      //       </ul>
      //       <div className="row">
      //         <div className="document-box">
      //           <h3 className="text-center">Choose one of the listed</h3>
      //           <div className="row">
      //             <button className="continue">UPLOAD DOCUMENT</button>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );
      //   break;
      // case "forms":
      //   accountPage = (
      //     <div className="box">
      //       <h3>Some forms</h3>
      //     </div>
      //   );
      //   break;
      // case "kyc":
      //   accountPage = (
      //     <div className="box">
      //       <h3>Know Your Criminals</h3>
      //       <p>Some managers may requre KYC documents. Please upload them here.</p>
      //       <div className="row">
      //         <div className="document-box">
      //           <h3 className="text-center">KYC Documents</h3>
      //           <div className="row">
      //             <button className="continue">UPLOAD DOCUMENT</button>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );
      //   break;
      case "risk":
        accountPage = (
          <div className="box">
            <h3>Risk Tollerance Profile</h3>
            Your tisk profile: 25%;
            <div className="row-padding">
              <button className="continue">Change results</button>
            </div>
          </div>
        );
        break;
      case "inv":
        accountPage = (
          <div className="box">
            <h3>Investment goals and strategy aims</h3>
            You are investing for:
            <ul>
              <li>living</li>
              <li>journeys</li>
            </ul>
            <div className="row-padding">
              <button className="continue">Change results</button>
            </div>
          </div>
        );
        break;
    }
    return (
      <div>
        {/* {this.renderBackButton()} */}
        <div className="container">
          <h1>Account</h1>
          <div className="first-tab">
            {accountPage}
          </div>
          <div className="second-tab">
            <div className="box">
              {/* <button className="transactions-link" onClick={() => this.setState({ currentAccountPage: "personal" })}>Personal Info</button>
              <button className="transactions-link" onClick={() => this.setState({ currentAccountPage: "address" })}>Address details</button>
              <button className="transactions-link" onClick={() => this.setState({ currentAccountPage: "ID" })}>ID confirmation</button>
              <button className="transactions-link" onClick={() => this.setState({ currentAccountPage: "residency" })}>Residency</button>
              <button className="transactions-link" onClick={() => this.setState({ currentAccountPage: "forms" })}>Fill forms</button>
              <button className="transactions-link" onClick={() => this.setState({ currentAccountPage: "kyc" })}>Know Your Criminals</button> */}
              <button className="transactions-link" onClick={() => this.setState({ currentAccountPage: "personal" })}>Account Information</button>
              {this.state.user == 1 ? "" : <button className="transactions-link" onClick={() => this.setState({ currentAccountPage: "risk" })}>Risk Tollerance Profile</button>}
              {this.state.user == 1 ? "" : <button className="transactions-link" onClick={() => this.setState({ currentAccountPage: "inv" })}>Investment goals and strategy aims</button>}
              <button className="transactions-link" onClick={() => this.setState({ currentAccountPage: "kyc" })}>Detailed information (kyc)</button>
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
    var text = "Wealthman is a decentralized platform for development, execution and marketing of wealth management service. The platform is embedded with strong antifraud features allowing autonomous robo-advisors and human-driven digital asset management services to be secure for investors.\n\nMarketplace of wealth management service with efficiency metrics.\n\nInvestment portfolio is being rebalanced by chosen wealth manager through Wealthman DApp.\n\nManaged assets could be observed and accessed by private key at any time."
    return (
      <div className="container">
        <div className="box">
          <h2>About us</h2>
          <p>{newLines(text)}</p>
          <h4>High competency</h4>
          <p>Wealthman evaluates the degree to which the robo-advisors and wealth managers meet objectives set by investors. Ranking based on such findings makes service effectiveness transparent and motivates the demand for quality. Competition lead to the benefit of the quality of wealth management service</p>
          <h4>Assets security</h4>
          <p>Wealthman embedded with strong antifraud desing, that protects against deception. Decentralized service execution and assets storage eliminate capital risks caused by errors/vulnerability of central party.</p>
          <h4>Trustless</h4>
          <p>Being decentralized, Wealthman wins in situations where there is lack of trust of investor in wealth manager’s competency, honesty, and infrastructure reliability.</p>
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
    this.setPage("managers");
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
                  <img src={"manager/" + manager.img} className="avatar" />
                </div>
                <h2 className="text-center">{manager.name} {manager.surname}</h2>
                <h4 className="text-center">Age {manager.age}</h4>
                <div className="row-padding">
                  <div className="column center">
                    {/* {this.state.user !== -1 ? (<button className="back">Contact</button>) : ""} */}
                    <Link to={"/contact"}>
                      <button className="back">Contact</button>
                    </Link>
                    <Link to="/register">
                      <button className="continue">Invest</button>
                    </Link>
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
                <img src={"manager/companies/" + company.img} className="avatar" />
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

  renderAlgorythmPage(match) {
    var alg = this.state.algorythms.find(algorytm => algorytm.id == match.params.id);
    var manager = this.state.managers.find(manager => manager.id == alg.manager);
    var investButton;
    if (this.state.user == -1)
      investButton = (<Link to={"/register"} className="continue">Invest</Link>);
    else
      investButton = (<button className="continue" onClick={() => this.setPage("manager form")}>Invest</button>);

    return (
      <div>
        {/* {this.renderBackButton()} */}
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

  renderStaticFormPage() {
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
        {/* {this.renderBackButton()} */}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <div className="container">
              <h2>Risk Tolerance Profile Questions</h2>
              <h4 className="grey">Asked once</h4>
              {form}
              <div className="row-padding">
                <Link to={"/agreement"}>
                  <button className="back" onClick={() => this.prevousPage()}>Back</button>
                </Link>
                <Link to={"/dynamic form"}>
                  <button className="continue" onClick={() => this.setPage("dynamic form")}>Continue</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderDynamicFormPage() {
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
        {/* {this.renderBackButton()} */}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <div className="container">
              <h2>Investement Goals & Strategy Aims</h2>
              <h4 className="grey">Asked every month (or quarter/year)</h4>
              {form}
              <div className="row-padding">
                <Link to={"/static form"}>
                  <button className="back" onClick={() => this.prevousPage()}>Back</button>
                </Link>
                <Link to={"/manager form"}>
                  <button className="continue" onClick={() => this.setPage("manager form")}>Continue</button>
                </Link>
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
        {/* {this.renderBackButton()} */}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <h1 className="text-center">Agreement</h1>
            {/* <p>U agree with that by the way</p>
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
            </ul> */}
            {newLines(this.state.agreement)}
            <div className="row-padding">
              <Link to={"/email"}>
                <button className="back" onClick={() => this.prevousPage()}>Back</button>
              </Link>
              <Link to={"/static form"}>
                <button className="continue" onClick={() => { this.setPage("static form"); this.setState({ user: 0 }); }}>Agree</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderManagerFormPage() {
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
        {/* {this.renderBackButton()} */}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <div className="container">
              <h2>Manager Form Questions</h2>
              <h4 className="grey">Asked by manager ({manager.name} {manager.surname})</h4>
              {form}
              <div className="row-padding">
                <Link to={"/dynamic form"}>
                  <button className="back" onClick={() => this.prevousPage()}>Back</button>
                </Link>
                <Link to={"/kyc"}>
                  <button className="continue" onClick={() => this.setPage("KYC")}>Continue</button>
                </Link>
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
        {/* {this.renderBackButton()} */}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <h2>Thanks for your investment</h2>
            <p>By the way, u can invest more:</p>
            <div className="row-padding">
              <Link to={"/managers"}>
                <button className="continue" onClick={() => this.setPage("managers")}>Continue</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderThanks2Page() {
    return(
      <div>
        {/* {this.renderBackButton()} */}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <h2>Thanks for filling forms</h2>
            <div className="row-padding">
              <Link to={"/accept"}>
                <button className="continue" onClick={() => this.setPage("accept")}>Continue</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderRegisterPage() {
    return(
      <div>
        {/* {this.renderBackButton()} */}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <h2>Registration page</h2>
            {/* <div className="row-padding">
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
            </div> */}
              <div className="row">
                <b>Email</b>
              </div>
              <div className="row">
                <input type="text" value={this.state.login} onChange={(event) => this.setState({ login: event.target.value })} placeholder="me@example.com" />
              </div>
              <div className="row">
                <b>Password</b>
              </div>
              <div className="row">
                <input type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} placeholder="password" />
              </div>
              <div className="row-padding">
              <Link to={("/manager" + this.state.currentManager)}>
                <button className="back" onClick={() => this.prevousPage()}>Back</button>
              </Link>
              <Link to={"/email"}>
                <button className="continue" onClick={() => this.setPage("agreement")}>Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderKYCPage() {
    return(
      <div>
        {/* {this.renderBackButton()} */}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <h2>Know Your Criminals</h2>
            <div className="row-padding">
              <p>by clicking send, u send this data to manager</p>
            </div>
            <div className="row-padding">
              <Link to={"/manager form"}>
                <button className="back" onClick={() => this.prevousPage()}>Back</button>
              </Link>
              <Link to={"/thanks2"}>
                <button className="continue" onClick={() => this.setPage("thanks2")}>Send to manager</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderAcceptPage() {
    var portfolio = this.state.portfolios.find(p => p.id == this.state.currentPortfolio);
    var totalValue = this.state.currentCurrencyPrices.find(c => c.name == portfolio.currency).price * portfolio.value;
    var currentCurrency = this.state.currentCurrencyPrices.find(c => c.name == this.state.currentCurrency);
    var currencies = this.state.currentCurrencyPrices.map(c =>
      <option value={c.name}>{c.name}</option>
    );
    var currenciesList = this.state.portfolioCurrencies.map(currency => {
      var price = this.state.currentCurrencyPrices.find(c => c.name == currency.currency).price;

      return {
        id: currency.id,
        type: currency.type,
        number: "",
        currency: currency.currency,
        percent_portfolio: currency.percent,
        amount: (currency.percent / 100 * totalValue / price).toFixed(3),
        value: (currency.percent / 100 * totalValue / currentCurrency.price).toFixed(3) + " " + currentCurrency.name,
        analysis: currency.analysis,
        comments: currency.comments,
      };
    });

    return(
      <div>
        {/* {this.renderBackButton()} */}
        {this.renderProgressBar()}
        <div className="second-header">
          <div className="container">
            <div className="title">
              <h2>Porfolio</h2>
              <p className="grey">Total value</p>
            </div>
            <div className="description">
              <h2>{(totalValue / currentCurrency.price).toFixed(3) + " " + currentCurrency.name}</h2>
              <select value={this.state.currentCurrency} onChange={this.setCurrency.bind(this)}>
                {currencies}
              </select>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="box">
            <h2>Portfolio Preview</h2>
            <Sortable
              listings={currenciesList}
              setPage={this.setPage.bind(this)}
            />

            {/* <div className="user-agreement">
              <h4>User Agreement</h4>
              <ul>
                <li>U pay 5% to site</li>
                <li>U pay 10% to manager</li>
                <li>U'll get your money back in a month</li>
                <li>All risks are on U!!!</li>
              </ul>
              <ul>
                <li>U pay 5% to site</li>
                <li>U pay 10% to manager</li>
                <li>U'll get your money back in a month</li>
                <li>All risks are on U!!!</li>
              </ul>
            </div> */}

            <div className="row-padding">
              <Link to={"/thanks2"}>
                <button className="back" onClick={() => this.prevousPage()}>Back</button>
              </Link>
              <Link to={"/money"}>
                <button className="continue" onClick={() => this.setPage("money")}>Accept</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderMoneyPage() {
    return (
      <div>
        {/* {this.renderBackButton()} */}
        {this.renderProgressBar()}
        <div className="container">
          <div className="box">
            <h2>Send Money</h2>
            <div className="row">
              <button className="show-code" onClick={() => this.setState({showCode: !this.state.showCode})}>{this.state.showCode ? "Hide" : "Show"} Smart-contract code</button>
              <div className={"code-container " + (this.state.showCode ? "show" : "hide")}>
                {newLines(this.state.code)}
              </div>
            </div>
            <div className="row">
              <ol type="1">
                <li>
                  Please choose your Ethereum wallet
                </li>
                <li>
                  Check that you have enough money on it to invest
                </li>
                <li>
                  Copy this address of smart-contract <b className="eth-address">0x3a8b4013eb7bb370d2fd4e2edbdaf6fd8af6a862</b>
                </li>
                <li>
                  Go to your Ethereum wallet and paste the address of smart-contract as destination address
                </li>
                <li>
                  Submit the money transfer
                </li>
              </ol>
            </div>
            <div className="row-padding">
              As soon as transaction is accomplished you can follow the details and statistics at <Link to={"/portfolios"}>Portfolio page</Link>
            </div>
            <div className="row-padding">
              <Link to="/accept">
                <button className="back" onClick={() => this.prevousPage()}>Back</button>
              </Link>
              <Link to="/portfolios">
                <button className="continue" onClick={() => this.setPage("portfolios")}>Finish</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderManagerControlPanelPage() {
    return (
      <div className="container">
        <div className="box">
          <h2>Manager Control Panel</h2>
          <p>В разработке</p>
        </div>
      </div>
    );
  }

  renderRequestsPage() {
    var requests = this.state.requests.slice().map((request, index) => {
      var investor = this.state.investors[request.investor];
      var date = new myDate(request.date);
      var registered = new myDate(investor.registered);
      var daysInSystem = registered.pastMonths();

      return {
        type: "request",
        id: request.id,
        number: "",
        img: "investor/" + investor.img,
        // id_shown: "1000" + investor.id,
        name: investor.name + " " + investor.surname,
        date: date.getTime(),
        // type_shown: daysInSystem >= 6 ? "old" : "new",
        // days: registered,
        // kyc: investor.kyc ? "yes" : "no",
        // value: (request.value * this.state.currentCurrencyPrices[request.currency]).toFixed(1) + " " + this.state.currentCurrency,
        status: request.status,
      };
    });

    return (
      <div>
        <div className="long-header"></div>
        <div className="container">
          <div className="box">
            <h2 className="text-center">Requests</h2>
            <Sortable
              listings={requests}
              setPage={this.setPage.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
  renderRequestPage(match) {
    var request = this.state.requests.find(r => r.id == match.params.id);
    var investor = this.state.investors.find(i => i.id == request.investor);
    var name;
    var age;
    if (investor.kyc == "yes") {
      name = <h4>{investor.name} {investor.surname}</h4>;
      age = <p>{investor.age} years old</p>;
    }
    else {
      name = <h4>{investor.email}</h4>;
      age = <p>KYC unfullfilled</p>;
    }

    return (
      <div>
        {/* {this.renderBackButton()} */}
        <div className="container">
          <div className="first-tab">
            <div className="box">
              <div className="circle left">
                <img src={"../investor/" + investor.img} className="avatar" />
              </div>
              <div className="third">
                {name}
                <p>New client. 1   days on platform</p>
                {age}
                <p>client id 50{investor.id}00{investor.id}</p>
              </div>
              <div className="third text-right">
                <p>request number {this.state.currentRequest}</p>
                <p>{request.date}</p>
              </div>
              <div className="row-padding">
                <Link to={"/chat"}>
                  <button className="continue" onClick={() => this.setPage("chat")}>Start chat</button>
                </Link>
              </div>
              <p>Target value: {request.value}{request.currency}</p>
              <p>Term 4 month</p>
              <p>Risk profile: 25%</p>
              <p>Target earning rate</p>
              <div className="row-padding">
                <Link to={"/portfoliocreation"}>
                  <button className="continue right">Accept</button>
                </Link>
                <Link to={"/decline"}>
                  <button className="back right">Decline</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderPortfolioPage(match) {
    var portfolio = this.state.portfolios.find(p => p.id == match.params.id);
    var investor = this.state.investors.find(i => i.id == portfolio.investor);
    var manager = this.state.managers.find(m => m.id == portfolio.manager);
    var image = this.state.user == 0 ? <img src={"../manager/" + manager.img} className="avatar" /> : <img src={"../investor/" + investor.img} className="avatar" />;
    var info;
    if (this.state.user == 0)
      info = (
        <div>
          <h3>Manager</h3>
          <h4>{manager.name} {manager.surname}</h4>
          {/* <p>New client. 1   days on platform</p> */}
          <p>{manager.age} years old</p>
          <p>manager id 50{manager.id}00{manager.id}</p>
        </div>
      );
    else
    info = (
      <div>
        <h3>Investor</h3>
        <h4>{investor.name} {investor.surname}</h4>
        <p>New client. 1   days on platform</p>
        <p>{investor.age} years old</p>
        <p>client id 50{investor.id}00{investor.id}</p>
      </div>
    );

    var totalValue = this.state.currentCurrencyPrices.find(c => c.name == portfolio.currency).price * portfolio.value;
    var currentCurrency = this.state.currentCurrencyPrices.find(c => c.name == this.state.currentCurrency);
    var currencies = this.state.currentCurrencyPrices.map(c =>
      <option value={c.name}>{c.name}</option>
    );
    var currenciesList = this.state.portfolioCurrencies.map(currency => {
      var price = this.state.currentCurrencyPrices.find(c => c.name == currency.currency).price;

      return {
        id: currency.id,
        type: currency.type,
        number: "",
        currency: currency.currency,
        percent_portfolio: currency.percent,
        amount: (currency.percent / 100 * totalValue / price).toFixed(3),
        value: (currency.percent / 100 * totalValue / currentCurrency.price).toFixed(3) + " " + currentCurrency.name,
        analysis: currency.analysis,
        comments: currency.comments,
      };
    });

    return (
      <div>
        <div className="second-header">
          <div className="container">
            <div className="title">
              <h2>Porfolio</h2>
              <p className="grey">Total value</p>
            </div>
            <div className="description">
              <h2>{(totalValue / currentCurrency.price).toFixed(3) + " " + currentCurrency.name}</h2>
              <select value={this.state.currentCurrency} onChange={this.setCurrency.bind(this)}>
                {currencies}
              </select>
            </div>
          </div>
        </div>
        {/* {this.renderBackButton()} */}
        <div className="container">
          <div className="box">
            <div className="circle left">
              {image}
            </div>
            <div className="third">
              {info}
            </div>
            <div className="row-padding">
              <button className="continue">Start chat</button>
            </div>
            <p>Target value: {portfolio.value}{portfolio.currency}</p>
            <p>Term 4 month</p>
            <p>Risk profile: 25%</p>
            <p>Target earning rate</p>
            {/* <img className="portfolio" src="../portfolio.jpg" />
            <div className="row-padding">
              <button className="back right" onClick={() => this.prevousPage()}>Delete</button>
            </div> */}
          </div>
          <div className="box">
            <Sortable
              listings={currenciesList}
              setPage={this.setPage.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
  renderAlgorythmsPage() {
    var currentPage;
    switch(this.state.currentAlgorythmsPage) {
      case "uploaded":
        currentPage = (
          <div className="box">
            <h2>Current Algorythms</h2>

          </div>
        );
        break;
      case "upload":
        currentPage = (
          <div className="box">
            <h2>Upload Algorythms</h2>
            <div className="row">
              <div className="document-box">
                <h3 className="text-center">Algorythm code</h3>
                <div className="row">
                  <button className="continue">UPLOAD FILE</button>
                </div>
              </div>
            </div>
          </div>
        );
        break;
    }

    return (
      <div className="container">
        <h1>Algorythms page</h1>
        <div className="first-tab">
          {currentPage}
        </div>
        <div className="second-tab">
          <div className="box">
            <button className="transactions-link" onClick={() => this.setState({ currentAlgorythmsPage: "uploaded" })}>Current Algorythms</button>
            <button className="transactions-link" onClick={() => this.setState({ currentAlgorythmsPage: "upload" })}>Upload new</button>
          </div>
        </div>
      </div>
    );
  }

  renderFAQPage() {
    return (
      <div className="container">
        <div className="box">
          <h2>FAQ</h2>
          <p>In development</p>
        </div>
      </div>
    );
  }

  renderContactPage() {
    return (
      <div className="container">
        <div className="box">
          <h2>Contact</h2>
          <p>In development</p>
        </div>
      </div>
    );
  }

  renderDeclinePage() {
    return (
      <div>
        {/* {this.renderBackButton()} */}
        <div className="container">
          <div className="box">
            <h3>Reason for decline</h3>
            <div className="row-padding">
              <label for="1">
                <input type="checkbox" id="1" />
                Insufficient information
              </label>
            </div>
            <div className="row-padding">
              <label for="2">
                <input type="checkbox" id="2" />
                Information is unacceptable
              </label>
            </div>
            <div className="row-padding">
              <label for="3">
                <input type="checkbox" id="3" />
                Other
              </label>
            </div>
            <div className="row-padding">
              <textarea rows="4" cols="50" placeholder="Comment">
                {}
              </textarea>
            </div>
            <div className="row-padding">
              <Link to={"/request/" + this.state.currentRequest}>
                <button className="back">Back</button>
              </Link>
              <Link to={"/requests"}>
                <button className="continue">Submit</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderChatPage() {
    return (
      <div>
        {/* {this.renderBackButton()} */}
        <div className="container">
          <div className="box">
            <h3>Chat page</h3>
          </div>
        </div>
      </div>
    );
  }
  renderInvestorUserAgreementPage() {
    return (
      <div>
        <div className="container">
          <div className="box">
            <h3>Investor User Agreement</h3>
            {newLines(this.state.agreement)}
          </div>
        </div>
      </div>
    );
  }
  renderManagerUserAgreementPage() {
    return (
      <div>
        <div className="container">
          <div className="box">
            <h3>Manager User Agreement</h3>
            {newLines(this.state.agreement)}
          </div>
        </div>
      </div>
    );
  }
  renderEmailPage() {
    return (
      <div>
        <div className="container">
          <div className="box">
            <h3>Confirm Email</h3>
            <p>(Front-end can't send emails. So here is the next step without actually confirming email)</p>
            <div className="row-padding">
              <Link to={"/register"}>
                <button className="back">Back</button>
              </Link>
              <Link to="/agreement">
                <button className="continue">Confirm email</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderPortfolioCreationPage() {
    var set = "USD";
    var tokens = this.state.tokens.map((token, index) =>
      <li>
        <div className="number">
          {index + 1}
        </div>
        <div className="check">
          <input type="checkbox"></input>
        </div>
        <div className="currency">
          {token.name}
        </div>
        <div className="percent">
          <input type="number"></input>
        </div>
        <div className="amount">
          0
        </div>
        <div className="value">
          {set}
        </div>
        <div className="comments last">
          <input type="text"></input>
        </div>
        <div className="analysis last">
          <input type="text"></input>
        </div>
      </li>
    );
    var request = this.state.requests.find(r => r.id == this.state.currentRequest);
    var investor = this.state.investors.find(i => i.id == request.investor);
    var name;
    var age;
    if (investor.kyc == "yes") {
      name = <h4>{investor.name} {investor.surname}</h4>;
      age = <p>{investor.age} years old</p>;
    }
    else {
      name = <h4>{investor.email}</h4>;
      age = <p>KYC unfullfilled</p>;
    }

    return (
      <div>
        <div className="container">
          <div className="box">
            <h3>Portfolio Creation</h3>

            <div className="circle left">
              <img src={"../investor/" + investor.img} className="avatar" />
            </div>
            <div className="third">
              {name}
              <p>New client. 1   days on platform</p>
              {age}
              <p>client id 50{investor.id}00{investor.id}</p>
            </div>
            <div className="third text-right">
              <p>request number {this.state.currentRequest}</p>
              <p>{request.date}</p>
            </div>
            <div className="row-padding">
              <Link to={"/chat"}>
                <button className="continue" onClick={() => this.setPage("chat")}>Start chat</button>
              </Link>
            </div>
            <p>Target value: {request.value}{request.currency}</p>
            <p>Term 4 month</p>
            <p>Risk profile: 25%</p>
            <p>Target earning rate</p>

            <ul className="token-listings">
              <li className="titles">
                <div className="number">
                  #
                </div>
                <div className="check">
                  Include
                </div>
                <div className="currency">
                  Currency
                </div>
                <div className="percent">
                  % in portfolio
                </div>
                <div className="amount">
                  Amount
                </div>
                <div className="value">
                  Value in set currency
                </div>
                <div className="comments last">
                  Comments
                </div>
                <div className="analysis last">
                  Analysis
                </div>
              </li>
              {tokens}
            </ul>
          </div>
          <div className="box">
            <div className="row">
              <div className="half">
                <h4>Fee</h4>
                <ul>
                  <div className="row">
                    <input type="checkbox" />
                      С прибыли
                  </div>
                  <div className="row">
                    <input type="checkbox" />
                      С объема
                  </div>
                  <div className="row">
                    <input type="checkbox" />
                      За вход
                  </div>
                  <div className="row">
                    <input type="checkbox" />
                      За выход
                  </div>
                </ul>
              </div>
              <div className="half">
                <h4>Frequency for recalculation</h4>
                <input placeholder="no more than"></input>
              </div>
            </div>
            <div className="row">
              <input placeholder="Comments"></input>
            </div>
            <div className="row-padding">
              <Link to="/portfolios">
                <button className="continue right margin">Send</button>
              </Link>
              <button className="continue right margin">Save</button>
              <button className="continue right margin">Load Saved form</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    document.title = "Wealthman Platform";

    const Loading = () => <div>Loading...</div>;

    // const Home = Loadable({
    //   loader: () => import('./routes/Home.js'),
    //   loading: Loading,
    // });

    var headerLinks;
    switch(this.state.user) {
      case -1:
        headerLinks = this.state.unloggedLinks;
        break;
      case 0:
        headerLinks = this.state.loggedInvestorLinks;
        break;
      case 1:
        headerLinks = this.state.loggedManagerLinks;
        break;
      case 2:
        headerLinks = this.state.loggedSuplierLinks;
        break;
    }
    headerLinks = headerLinks.map(link =>
      <li className="link">
        <Link to={"/" + link.link} className={link.link == "login" || link.link == "invest" ? link.link : "link"} onClick={() => {(link.link == "logout" ? this.logout() : "")}}>
          {capitalize(link.label)}
        </Link>
      </li>
    );
    var logo = this.state.user == -1 ? logoBlue : logoWhite;

    var logButton;
    if (this.state.user !== -1)
      logButton = (
        <Link to={"/"} className="login" onClick={() => this.logout()}>
          {/* Log out */}
        </Link>
      );
    else
      logButton = (
        <Link to={"/totallydifferentlogin"} className="login" onClick={() => this.setPage("login")}>
          {capitalize("login")}
        </Link>
      );

    return (
      <Router>
        <article className="page">
          <header className={this.state.user == -1 ? "header transparent" : "header"}>
            <div className="container">
              <Link to={(this.state.user == -1 ? "/managers" : "/portfolios")}>
                <img src={logo} className="logo"/>
              </Link>
              <ul className="links right">
                {headerLinks}
              </ul>
            </div>
          </header>
          <div className="content">
            {this.renderPage()}
          </div>
          <div className={this.state.user == -1 ? "footer" : "footer"}>
            <div className="footer-container">
              <div className={"z1" + (this.state.user != -1 ? " full" : "")}>
                  <div className="third">
                    <h4>Documents</h4>
                    <Link to={this.state.user == 1 ? "manager-ua" : "/investor-ua"}>
                      User Agreement
                    </Link>
                    <a href="https://wealthman.io/faq/">FAQ</a>
                    <a href="https://github.com/Wealthman">GitHub</a>
                  </div>
                  <div className="third">
                    <h4>Community</h4>
                    <a className="telegram" href="https://t.me/wealthman_global">Telegram</a>
                    <a className="bitcointalk" href="https://bitcointalk.org/index.php?topic=2006205">Bitcointalk</a>
                    <a className="facebook" href="https://www.facebook.com/WealthMan.io/">Facebook</a>
                    <a className="instagram" href="https://www.instagram.com/wealthman.io/">Instagram</a>
                  </div>
                  <div className="third">
                    <h4>Blog</h4>
                    <a className="medium" href="https://medium.com/@Wealthman">Medium</a>
                    <a className="reddit" href="https://www.reddit.com/r/Wealthman/">Reddit</a>
                    <a className="twitter" href="https://twitter.com/wealthman_io">Twitter</a>
                    <a className="linkedin" href="https://www.linkedin.com/company/wealthman-io">Linkedin</a>
                    <a className="youtube" href="https://www.youtube.com/c/wealthman">YouTube</a>
                  </div>
                  {/* <div className="half">
                    <h4>Wealthman</h4>
                    <a href="https://wealthman.io/#about">About</a>
                    <a href="https://wealthman.io/team/">Team</a>
                    <a href="https://wealthman.io/contact/">Contact</a>
                  </div> */}
              </div>
              <div className={"z2" + (this.state.user != -1 ? " hidden" : "")}>
                <h4>Wealth Managers</h4>
                {logButton}
              </div>
            </div>
            <div className="row text-center white small">
              Copyright © 2018 Wealthman. All Rights Reserved. Privacy Policy
            </div>
          </div>
        </article>
      </Router>
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
        <b>Or via</b>
        <div className="row">
          <button className="facebook"></button>
          <button className="google"></button>
        </div>
        <Link to={"/account"}>
          <button className="login" onClick={() => this.props.tryLogin(this.state.login, this.state.password)}>Log in</button>
        </Link>
        <div className="row-padding">
          <small>Not registered yet?</small>
          <Link to={"/register"}>Register</Link>
        </div>
      </div>
    );
  }
}

function capitalize(string) {
  if (string.toLowerCase() === "id")
    return "ID";
  if (string.toLowerCase() === "kyc")
    return "KYC";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function newLines(string) {
  var paragraphs = [];
  var prevI = 0;

  for (var i = 0; i < string.length; i++) {
    if (string[i] === '\n') {
      paragraphs.push(string.slice(prevI, i));
      prevI = i;
    }
  }
  paragraphs.push(string.slice(prevI));
  var style = {color: "inherit", fontFamily: "inherit"};

  return <div style={style}>{paragraphs.map(paragraph => <p style={style}>{paragraph}</p>)}</div>;
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
