import React, { Component } from 'react';
import moment from "moment";
import NavigationContainer from './navigation/navigation.container';
import PortfolioContainer from './portfolio/portfolio-container';


export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <NavigationContainer />
        <h1>Nathan Lamb's Portfolio</h1>
        <div>{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>

        <PortfolioContainer />
      </div>
    );
  }
}
