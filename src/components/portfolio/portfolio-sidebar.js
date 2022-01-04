import React from 'react'

const PortfolioSidebar = props => {
    const portfolioList = props.data.map(portfolioItem => {
        return(
            <div key={portfolioItem.id} className="portfolio-list-wrapper">
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
           {portfolioList}
        </div>
    )
}

export default PortfolioSidebar