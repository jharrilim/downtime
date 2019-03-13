import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  private client = new ApolloClient({
    uri: process.env.SERVER_URL || 'http://server:8080'
  });

  render() {
    return (
      <ApolloProvider client={this.client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
          </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >

            </a>
          </header>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
