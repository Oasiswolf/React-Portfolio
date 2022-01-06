import React, { Component } from 'react'
import axios from 'axios'
import { DropzoneComponent } from 'react-dropzone-component'

import "../../../node_modules/react-dropzone-component/styles/filepicker.css"
import "../../../node_modules/dropzone/dist/min/dropzone.min.css"


export default class PortfolioForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            description: "",
            url: "",
            category: "Networking",
            position: "",
            thumb_image: "",
            banner_image: "",
            logo: ""
        }


        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.componentConfig = this.componentConfig.bind(this)
        this.djsConfig = this.djsConfig.bind(this)
        this.handleThumbDrop = this.handleThumbDrop.bind(this)
        this.handleBannerDrop = this.handleBannerDrop.bind(this)
        this.handleLogoDrop = this.handleLogoDrop.bind(this)



        this.thumbRef = React.createRef();
        this.bannerRef = React.createRef();
        this.logoRef = React.createRef();
    }

    componentDidUpdate() {
        if(Object.keys(this.props.portfolioToEdit).length > 0) {
            const {
                id,
                name,
                desciption,
                category,
                position,
                url,
                thumb_image_url,
                banner_image_url,
                logo_url
            } = this.props.portfolioToEdit;
            this.props.clearPortfolioEdit();
            this.setState({
                id: id,
                name: name || "",
                desciption: desciption || "",
                category: category || "Networking",
                position: position || "",
                url: url || "",
            })
        }
    }

    handleThumbDrop() {
        return {
            addedfile: file => this.setState({ thumb_image: file })
        }
    }

    handleBannerDrop() {
        return {
            addedfile: file => this.setState({ banner_image: file })
        }
    }

    handleLogoDrop() {
        return {
            addedfile: file => this.setState({ logo: file })
        }
    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    buildForm() {
        let formData = new FormData();
            formData.append("portfolio_item[name]", this.state.name);
            formData.append("portfolio_item[description]", this.state.description);
            formData.append("portfolio_item[url]", this.state.url);
            formData.append("portfolio_item[category]", this.state.category);
            formData.append("portfolio_item[position]", this.state.position);

            if(this.state.thumb_image) {
                formData.append("portfolio_item[thumb_image]", this.state.thumb_image)
            }

            if(this.state.banner_image) {
                formData.append("portfolio_item[banner_image]", this.state.banner_image)
            }

            if(this.state.logo) {
                formData.append("portfolio_item[logo]", this.state.logo)
            }

        return formData;
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        // https://nathanlamb.devcamp.space/portfolio/portfolio_items
        axios.post("https://nathanlamb.devcamp.space/portfolio/portfolio_items", this.buildForm(), { withCredentials: true })
        .then(response => {
            this.props.handleSuccessfulFormSubmit(response.data.portfolio_item);
            
            this.setState({
                name: "",
                description: "",
                url: "",
                category: "Networking",
                position: "",
                thumb_image: "",
                banner_image: "",
                logo: ""
            });
           
            [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
                ref.current.dropzone.removeAllFiles()
            });
        })
        .catch(error => {console.log("portfolio form handleSubmit error", error)})
        
        event.preventDefault();

    }



    render() {
        return(
                <form className="portfolio-form-wrapper" onSubmit={this.handleSubmit}>
                    <div className="two-column">
                        <input
                        type="text"
                        name="name"
                        placeholder="Portfolio Item Name"
                        value={this.state.name}
                        onChange={this.handleChange} />
                        <input
                        type="text"
                        name="url"
                        placeholder="URL"
                        value={this.state.url}
                        onChange={this.handleChange} />
                    </div>
                    <div className="two-column">
                        <input
                        type="text"
                        name="position"
                        placeholder="Position"
                        value={this.state.position}
                        onChange={this.handleChange} />
                        <select
                        className="select-element"
                        name="category"
                        value={this.state.category}
                        onChange={this.handleChange}>
                            <option value="Networking">Networking</option>
                            <option value="Webpage Manager">Webpage Manager</option>
                            <option value="Future Endevers">Future Endevers</option>

                        </select>    
                    </div>
                    <div className="one-column">
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.handleChange} />
                    </div>
                    <div className="imguploader">

                        <DropzoneComponent
                            ref={this.thumbRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleThumbDrop()}>
                            <div className="dz-message">ThumbNail</div>
                        </DropzoneComponent>

                        <DropzoneComponent
                            ref={this.bannerRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleBannerDrop()}>
                            <div className="dz-message">Banner</div>
                        </DropzoneComponent>

                        <DropzoneComponent
                            ref={this.logoRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleLogoDrop()}>
                            <div className="dz-message">Logo</div>
                        
                        </DropzoneComponent>
                    </div>

                    <div>
                        <button className="btn" type="submit">Save</button>
                    </div>

                </form>
        )
    }
}