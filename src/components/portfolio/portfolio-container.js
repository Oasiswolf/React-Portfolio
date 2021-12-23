import React, {Component} from 'react'
import axios from 'axios'

import PortfolioItem from './portfolioItem'

export default class PortfolioContainer extends Component {

    constructor() {
        super();
        this.state = {
            pageTitle: "Welcome to my Portfolio",
            isLoading: false,
            data: [
                {title:"Networking", category: 'Network Setup', slug: 'network'},
                {title:"MadLibs", category: 'Game', slug: 'game'},
                {title:"Future Endeavors", category: 'tbd', slug: 'future projects'}]
        }
        console.log("Portfolio container has Rendered!")

        // this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this)
        this.getPortfolioItems = this.getPortfolioItems.bind(this)

        this.handleFilter = this.handleFilter.bind(this)
    }

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item => {
                return item.category === filter
            })
        })
    }

    portfolioItems() {

        return this.state.data.map(item => {
            return <PortfolioItem title={item.title} url={"your-link-here.com"} slug={item.slug} />;
        })
    }

    getPortfolioItems() {
        axios.get('https://nathanlamb.devcamp.space/portfolio/portfolio_items')
      .then(response => {
        // handle success
        console.log(response);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
    
      }
    

    // handlePageTitleUpdate() {
    //     this.setState({
    //         pageTitle: "This is an AWESOME Portfolio"
    //     })        
    // }

    render() {
        if (this.state.isLoading) {
            return <div>Loading....</div>
        }
        this.getPortfolioItems();


        return (
            <div>
                <h2>{this.state.pageTitle}</h2>

                {this.portfolioItems()}

                <hr />

                <button onClick={() => this.handleFilter('Network Setup')}>Networking</button>
                <button onClick={() => this.handleFilter('Game')}>Games</button>
                <button onClick={() => this.handleFilter('tbd')}>Future Endeavors</button>
            </div>
        )
    }
}