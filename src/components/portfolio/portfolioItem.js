import React from 'react'
import { Link } from 'react-router-dom'

export default function(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <h5>{props.url}</h5>

            <Link to={`/portfolio/${props.slug}`}>Link</Link>
        </div>
    )
}