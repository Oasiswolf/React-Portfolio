import React, {Component} from 'react'
import PortfolioItem from './portfolioItem'


export default class PortfolioContainer extends Component {

    constructor() {
        super();
        this.state = {
            pageTitle: "Welcome to my Portfolio"
        }
        console.log("Portfolio container has Rendered!")
    }

    portfolioItems() {
        const data = [
            {title:"Networking"},
            {title:"MadLibs"},
            {title:"Future Endeavors"}]

        return data.map(item => {
            return <PortfolioItem title={item.title} url={"your-link-here.com"}/>;
        })
    }

    render() {
        return (
            <div>
                <h2>{this.state.pageTitle}</h2>

                {this.portfolioItems()}
            </div>
        )
    }
}