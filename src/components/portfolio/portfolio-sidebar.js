import React from 'react'

const PortfolioSidebar = props => {
    const portfolioList = props.data.map(portfolioItem => {
        return(
            <div className="portfolio-list-wrapper">
                <div calssName="portfolio-thumb-img">
                    <img src={portfolioItem.thumb_image_url} />
                </div>
                <h1 className="title">{portfolioItem.name}</h1>
                <h2>{portfolioItem.id}</h2>
            </div>
        )
    })
    return (
        <div className="portfolio-sidebar-wrapper">
            <h2>Portfolio Items List</h2>
           {portfolioList}
        </div>
    )
}

export default PortfolioSidebar