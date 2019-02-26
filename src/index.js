import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

var pages = {
  start: {
    content:
      "Welcome, traveler! How would you like to get to your destination?",
    label1: "Train",
    label2: "Ship",
    page1: "onthetrain",
    page2: "ontheship"
  },
  onthetrain: {
    content:
      "Welcome aboard the choo-choo train! Please make your way to your seat. What's the number?",
    image: "train.png",
    input: {
      type: "select",
      values: ["", "12A", "12B", "12C", "11A", "11B", "11C"],
      saveKey: "seat"
    },
    label1: "Next",
    page1: "ontheseat"
  },
  ontheship: {
    content: "Welcome abord, sir! What is your destination?",
    input: {
      type: "text",
      saveKey: "destination"
    },
    label1: "Next",
    page1: "titanic"
  },

  ontheseat: {
    content:
      "Welcome on board. Would you like something to eat or drink?   Don't take others' seats. Yout seat number is:",
    keyvalue: "seat",
    label1: "food",
    page1: "eat",
    label2: "drink",
    page2: "breverage"
  },

  eat: {
    content:
      "Here's your food, sorry you can't choose. Enjoy or waste your money.",
    image:
      "https://coursehorse.imgix.net/images/course/265/main/PhotoManhattan_Art3_.png?auto=format%2Cenhance&crop=entropy&fit=crop&h=220&ixlib=php-1.2.1&q=90&w=330",
    label1: "I want some more",
    page1: "ontheseat"
  },

  breverage: {
    content: "Alcohol or soft drinks?",
    label1: "alcohol",
    page1: "alcohol",
    label2: "soft drinks",
    page2: "softdrinks"
  },

  alcohol: {
    content: "Don't get too drunk. We are on a train, not a bar.",
    image:
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    label1: "I want some more",
    page1: "ontheseat"
  },

  softdrinks: {
    content: "Good choice.",
    image:
      "http://tobyscottphotography.com/content/images/uploads/Drinks/peach___spiced_ice_tea.jpg",
    label1: "I want some more",
    page1: "ontheseat"
  }
};

class Page extends Component {
  render() {
    var pageData = pages[this.props.pageName];
    if (!pageData) {
      throw new Error("Eek! No page here!");
    }

    var goToPage = this.props.goToPage;
    var saveUserData = this.props.saveUserData;

    function goToPage1() {
      goToPage(pageData.page1);
    }
    function goToPage2() {
      goToPage(pageData.page2);
    }
    function handleChange(event) {
      saveUserData(pageData.input.saveKey, event.target.value);
    }

    var image = "";
    if (pageData.image) {
      image = (
        <div>
          <img className="main-page-image" src={pageData.image} />
        </div>
      );
    }
    var button1 = "";
    if (pageData.page1) {
      button1 = <button onClick={goToPage1}>{pageData.label1}</button>;
    }
    var button2 = "";
    if (pageData.page2) {
      button2 = <button onClick={goToPage2}>{pageData.label2}</button>;
    }

    var keyvalue = "";
    if (pageData.keyvalue) {
      keyvalue = this.props.userData[pageData.keyvalue];
    }

    var input = "";
    if (pageData.input) {
      var inputData = pageData.input;
      if (inputData.type == "select") {
        input = (
          <p>
            <select
              value={this.props.userData[inputData.saveKey]}
              onChange={handleChange}
            >
              {inputData.values.map(v => (
                <option value={v}>{v}</option>
              ))}
            </select>
          </p>
        );
      } else if (inputData.type == "text") {
        input = (
          <p>
            <input
              type="text"
              value={this.props.userData[inputData.saveKey]}
              onChange={handleChange}
            />
          </p>
        );
      }
    }

    return (
      <div>
        <p>
          {pageData.content}
          {keyvalue}
        </p>
        {input}
        {image}
        {button1}
        {button2}
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "start",
      userData: {}
    };

    this.goToPage = this.goToPage.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
  }

  goToPage(pageName) {
    this.setState({
      page: pageName
    });
  }

  saveUserData(key, value) {
    function updateState(state) {
      var newState = { userData: { ...state.userData, [key]: value } };
      return newState;
    }
    this.setState(updateState);
  }

  render() {
    return (
      <div className="App">
        <Page
          pageName={this.state.page}
          goToPage={this.goToPage}
          userData={this.state.userData}
          saveUserData={this.saveUserData}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
