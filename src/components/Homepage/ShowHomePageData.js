import React from 'react'
import { Link } from 'react-router-dom'
import "./ShowHomePageData.css"
function ShowHomePageData(props) {
    return (
        <div className="homepage__display">
                <span>{props.user.id}</span>
                <span>{props.user.name}</span>
                <span>{props.user.company.name}</span>
               <span><Link to={`/post/${props.user.id}`}>Details</Link></span> 
                
            
        </div>
    )
}

export default ShowHomePageData
