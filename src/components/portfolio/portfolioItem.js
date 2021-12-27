import React from 'react'
import { Link } from 'react-router-dom'

export default function(props) {
        // Data thats Needed 
        // background img : thumb_image_url
        // logo
        // Description
        // id

        const { id, description, thumb_image_url, logo } = props.item;
    return (
        <div className="portfolio-item-wrapper">
            <img src={thumb_image_url} />
            <img src={logo} />
            <div>{description}</div>
            <Link to={`/portfolio/${id}`}>Link</Link>
        </div>
    )
}