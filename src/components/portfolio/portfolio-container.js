import React, {Component} from 'react'
import axios from 'axios'

import PortfolioItem from './portfolioItem'

export default class PortfolioContainer extends Component {

    constructor() {
        super();
        this.state = {
            pageTitle: "Welcome to my Portfolio",
            isLoading: false,
            data: []
        }
        console.log("Portfolio container has Rendered!")

        // this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this)

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
            
            return <PortfolioItem 
            key={item.id}
            item={item} 
            />
        })
    }

    getPortfolioItems() {
        axios.get('https://nathanlamb.devcamp.space/portfolio/portfolio_items')
      .then(response => {
        // handle success
        console.log("response Data", response);
        this.setState({
            data: response.data.portfolio_items
        })
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
    
      }
    
    componentDidMount() {
        this.getPortfolioItems();

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


        return (
            <div>
                <h2>{this.state.pageTitle}</h2>
                <div className="portfolio-items-wrapper">
                {this.portfolioItems()}
                </div>

                <hr />

                <button onClick={() => this.handleFilter('Network Setup')}>Networking</button>
                <button onClick={() => this.handleFilter('Game')}>Games</button>
                <button onClick={() => this.handleFilter('tbd')}>Future Endeavors</button>
            </div>
        )
    }
}