import React from "react";
import {NavLink} from "react-router-dom";
import './Landing.css';

const Landing=()=>{
    return (
        <div className="landing-page">
            
            <div className="content">
                <h1 className="titulo">Pokémon App</h1>
                <p className="subtitulo">Gotta catch 'em all</p>
                <NavLink to="/home">
                    <button className="button-home">HOME</button>
                </NavLink>
            </div>
        </div>
    )
}

export default Landing;