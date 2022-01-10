import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import BlogItem from '../blog/blog-item'
import BlogModal from '../modals/blog-modal'

class Blog extends Component {
    constructor(){
        super()

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            blogModalIsOpen: false,
        }
        this.getBlogItems = this.getBlogItems.bind(this)
        this.onScroll = this.onScroll.bind(this)
        window.addEventListener("scroll", this.onScroll, false)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleNewBlogPost = this.handleNewBlogPost.bind(this)
    }

    handleNewBlogPost(blog) {
        this.setState({
            blogModalIsOpen: false,
            blogItems: [blog].concat(this.state.blogItems)
        })
    }

    handleModalClose() {
        this.setState ({
            blogModalIsOpen: false,
        })
    }

    handleModalOpen() {
        this.setState({
            blogModalIsOpen: true,
        })
    }

    onScroll() {
        if (this.state.isLoading || this.state.blogItems.length === this.state.totalCount){
            return;
        }

        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            console.log("get more posts loaded unless done!");
            this.getBlogItems();
        }
    }

    getBlogItems() {

        this.setState({
                currentPage: this.state.currentPage + 1
            });
            
        axios.get(`https://nathanlamb.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`, {
            withCredentials: true
        })
        .then(response => {
            console.log("response", response)
            this.setState({
                blogItems: this.state.blogItems.concat( response.data.portfolio_blogs),
                totalCount: response.data.meta.total_records,
                isLoading: false,
            })
        })
        .catch(error => {
            console.log("Error getting blogs", error)
        })
    }


    componentWillMount() {
        this.getBlogItems();
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false)
    }



    render() {

        const blogRecords = this.state.blogItems.map(blogItem => {
            return <BlogItem key={blogItem.id} blogItem={blogItem} />
        })

        return (
            <div className="blog-container">
                <h1>Blog</h1>
                <div className="modal-div">
                <FontAwesomeIcon
                    icon="plus-square"                    
                    className='load-icon'
                    onClick={this.handleModalOpen}
                    />
                    <BlogModal 
                    handleNewBlogPost={this.handleNewBlogPost}
                    modalIsOpen={this.state.blogModalIsOpen}
                    modalClose={this.handleModalClose}
                    />
                </div>

                <div className="content-container">
                    {blogRecords}
                </div>
                {this.state.isLoading ? (
                <div className="content-loader">
                    <FontAwesomeIcon
                    icon="spinner"
                    spin
                    pulse
                    className='load-icon'
                    />
                </div>) : null }
                <Link to="/about">Read about me!</Link>
            </div>
        )
    }
}


export default Blog;