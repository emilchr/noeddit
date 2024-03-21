import React from "react";
import './NotFound.css'
import { useNavigate } from "react-router-dom";

function NotFound() {

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();

        navigate('/')
    }

    return (
        <div className="not-found">
            <h2>Not found</h2>
            <p>The page you are looking for was not found.</p>
            <br />
            <button onClick={handleClick}>Return to the land of the living.</button>
        </div>
    )
} 

export default NotFound;