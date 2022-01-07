import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import BlogItem from '../blog/blog-item'

export default class Blog extends Component {
    constructor(){
        super()

        this.state ={
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
        }
        this.getBlogItems = this.getBlogItems.bind(this)
        this.activateInfiniteScroll()
    }

    activateInfiniteScroll() {
        window.onscroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                console.log("get more posts loaded unless done!")
            }
        }
    }

    getBlogItems() {
        this.setState({
            currentPage: this.state.currentPage + 1
        });

        axios.get("https://NathanLamb.devcamp.space/portfolio/portfolio_blogs",
        { withCredentials: true }
        ).then(response => {
            this.setState({
                blogItems: response.data.portfolio_blogs,
                totalCount: response.data.meta.total_records,
                isLoading: false,
            })
        })
        .catch(error => {
            console.log("Error getting blogs", error)
        })
    }

    compnonentWillMount() {
        this.getBlogItems()
    }



    render() {

        const blogRecords = this.state.blogItems.map(blogItem => {
            return <BlogItem key={blogItem.id} blogItem={blogItem} />
        })

        return (
            <div className="blog-container">
                <h1>Blog</h1>
            <div className="content-container">
                {blogRecords}
            </div>
            {this.state.isLoading ? (
                <div clasName="contentLoader">
                    <FontAwesomeIcon icon="spinner" spin  />
                </div>)
                : null }
            </div>
        )
    }
}