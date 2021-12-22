import React from 'react'
import { Link } from 'react-router-dom'

export default function() {
    return (
        <div>
            <h1>Blog</h1>
            <div>
                <Link to="/About-Me">Read More about Myself</Link>
            </div>
        </div>
    )
}