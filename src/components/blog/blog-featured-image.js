import React from 'react'

const BlogFeaturedImage = props => {
    if(!props.img){
        return null
    }

    return(
        <div className="featuredImg">
            <img src={props.img} />
        </div> 

    )
    // {featured_image_url ?
    //     <div className="featuredImg">
    //         <img src={featured_image_url} />
    //     </div> : null }


}

export default BlogFeaturedImage;