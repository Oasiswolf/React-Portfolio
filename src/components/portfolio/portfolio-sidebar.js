import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const PortfolioSidebar = props => {
    const portfolioList = props.data.map(portfolioItem => {
        return(
            <div key={portfolioItem.id} className="portfolio-list-wrapper">
                
                <div className="portfolio-thumb-img">
                    <img src={portfolioItem.thumb_image_url} />
                </div>
                
                <div className="text-content">
                
                    <div className="title">
                        {portfolioItem.name}
                    </div>
                    <div className="sidebarActions">

                        <a className="updateItem" onClick={() => props.update(portfolioItem)}>
                            <FontAwesomeIcon icon="edit"  />
                        </a>

                        <a className="deleteIcon" onClick={() => props.delete(portfolioItem)}>
                            <FontAwesomeIcon icon="trash"  />
                        </a>
                    </div>
                
                </div>

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