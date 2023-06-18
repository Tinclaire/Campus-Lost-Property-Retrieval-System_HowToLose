import React from "react";
import './NavBar.css';
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { TbSettingsFilled } from "react-icons/tb";
import { BsFillPencilFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import logo from './image/logo.jpg'
import './TabBar.css';

export default function TabBar(){
    return(
        
        <nav className='tab'>
            {/* <div className="size"> */}
                <CustomLink to='../main/find'>撿東西</CustomLink>
                <CustomLink to='../main/lost'>掉東西</CustomLink>
                    {/* <a href='/main/find'>撿東西</a>
                
                    <a href='/main/lost'>掉東西</a> */}
            {/* </div> */}
        </nav>
    );
}

function CustomLink({ to, children, ...props }){
    const path = window.location.pathname
    return(
        <li className={path === to ? "" : ""}> 
            <Link to={to} {...props}>{children}</Link>
        </li>
    );
}