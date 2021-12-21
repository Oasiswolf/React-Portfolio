import React, {Component} from 'react'
import PortfolioItem from './portfolioItem'


export default class PortfolioContainer extends Component {

    constructor() {
        super();
        console.log("Portfolio container has Rendered!")
    }

    portfolioItems() {
        const data = ["Networking", "MadLibs", "Future Endeavors"]

        return data.map(item => {
            return <PortfolioItem/>;
        })
    }

    render() {
        return (
            <div>
                <h2>Portfolio items go here updated ...</h2>

                {this.portfolioItems()}
            </div>
        )
    }
}