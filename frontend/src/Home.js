// import React, { setState } from 'react';
import React from 'react'
import logo from "./image/logo.jpg"
import { Link } from 'react-router-dom';
import "./Home.css"
import './App.css'
import { Navigate } from 'react-router-dom';

function Home( props) {
    const [goTo, setGoTo] = React.useState(false)

    if(goTo){
        return <Navigate to='/login' />
    }
    return(
        <div className='bg'>
            <div className='container'>
                <img src={ logo } className='logo' alt="How to lose"/>
                <p />
                <div className='title'>How To Lose</div>
                <div className='subTitle'>蒿兔鷺鷥 幫你找回丟掉的小Wu</div>
                <p />
                {/* <img src={ play } className='play' alt="start"/> */}
                {/* <Link to='/main'> */}
                    <button onClick={ () => {setGoTo(true);} }>START</button>
                {/* </Link> */}
                <div className='pp'/>
                <div className='small'>Let's get started!</div>
                {/* <img src={ logo } />
                <img src={ logo } /> */}
            </div>
        </div>
    );
}

export default Home;
