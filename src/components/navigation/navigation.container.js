import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class NavigationContainer extends Component {
    constructor() {
        super()
    }

    render() {

        return(

            <div>
                <NavLink exact to='/'>
                    Home
                </NavLink>
                <NavLink exact to='/About-Me'>
                    About
                </NavLink>
                <NavLink exact to='/Contact'>
                    Contact
                </NavLink>
                <NavLink exact to='/Blog'>
                    Blog
                </NavLink>

                {false ? <button>Add Blog</button> : null}                
            </div>
        )
    }
}