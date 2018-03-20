import React, { Component } from 'react';
import logoWhite from './logo.svg';
import logoBlue from './logo_blue.svg';
import './css/App.css';
import './css/main.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: -1,
      login: "", password: "", loginError: false,

      users: [
        {
          id: 0,
          name: "John",
          surname: "Galt"
        },
      ],
      currentPage: "login",
      prevousPages: [],

      loggedLinks: ["contracts", "investment", "documents"],
      unloggedLinks: ["about us", "origin", "login", "invest"],
      footerLinks: ["about us", "legal", "contacts", "methodology", "press", "help center", "blog"],

      currentManager: -1,
      currentAlgorythm: -1,

      managers: [
        {
          id: 0,
          name: "Ostap",
          surname: "Bender",
          rating: 10,
          img: "0.jpg",
          company: "12 chairs"
        },
        {
          id: 1,
          name: "Carlos",
          surname: "Matos",
          rating: 9,
          img: "1.jpg",
          company: "bitconnect"
        },
        {
          id: 2,
          name: "Bender",
          surname: "Rodríguez",
          rating: 7,
          img: "2.jpg",
          company: "Planet Express"
        },
        {
          id: 3,
          name: "Sergey",
          surname: "Mavrodi",
          rating: 6,
          img: "3.jpg",
          company: "MMM"
        },
        {
          id: 4,
          name: "Charles",
          surname: "Ponzi",
          rating: 10,
          img: "4.jpg",
          company: "Banco Zarossi"
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
          question: "What is your monthly income?",
          answers: ["$1-10", "$10-100", "$100-1000", "$1000-10000"]
        },
        {
          question: "What is your favourite color?",
          answers: ["red", "green", "blue"]
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
    };
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
      }

    this.setState({
      currentPage: page,
      prevousPages: prevousPages
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
      <div className="login-box">
        <h3>Welcome back</h3>
        <b>Email</b>
        <input type="text" value={this.state.login} onChange={(event) => this.setState({ login: event.target.value })} placeholder="me@example.com" />
        <b>Password</b>
        <input type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} placeholder="password" />
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

  renderManagerPage() {
    var manager = this.state.managers[this.state.currentManager];
    var algs = this.state.algorythms.filter(alg => {
      return alg.creator == manager.id;
    }).map(alg =>
      <div className="manager" onClick={() => this.setPage("algorythm", alg.id)}>
        <h4>{alg.name}</h4>
        <p className="grey">rating {alg.rating}/10</p>
      </div>
    );

    return (
      <div>
        {this.renderBackButton()}
        <div className="container">
          <div className="box">
            <div className="circle left">
              <img src={"managers/" + manager.img} className="avatar" />
            </div>
            <div className="half">
              <h3>{manager.name} {manager.surname}</h3>
              <p>rating {manager.rating}/10</p>
              <p>company "{manager.company}"</p>
            </div>
            <div className="row">
              <h4>Manager Algorythms</h4>
              {algs}
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

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default App;
