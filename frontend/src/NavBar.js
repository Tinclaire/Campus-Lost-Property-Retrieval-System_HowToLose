import logo from './image/logo.jpg';
import './NavBar.css';
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { TbSettingsFilled } from "react-icons/tb";
import { BsFillPencilFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { MdFavorite } from "react-icons/md";

export default function NavBar(){
    return (
        <nav className='nav'>
            <Link to='/main/find' className='site-title'>
                <img src={logo}/> How To Lose
            </Link>
            <ul>
                <CustomLink to='../main/find' IconType={AiFillHome}></CustomLink>
                <CustomLink to='../post' IconType={BsFillPencilFill}></CustomLink>
                <CustomLink to='../personal' IconType={BsFillPersonFill}></CustomLink>
                <CustomLink to='../setting' IconType={TbSettingsFilled}></CustomLink>
                {/* <li>
                    <a href='/main'><AiFillHome className='icon'/></a>
                </li>
                <li>
                    <a href='/post'><BsFillPencilFill className='icon'/></a>
                </li>
                <li className='active'>
                    <a href='/personal'><BsFillPersonFill className='icon'/></a>
                </li>
                <li className='active'>
                    <a href='/setting'><TbSettingsFilled className='icon'/></a>
                </li> */}
            </ul>
        </nav>
    )
}
function CustomLink({ to, IconType, ...props }){
    const path = window.location.pathname;
    return(
        <li>
            <Link to={to} {...props}><IconType className={path === to ? 'icona' : 'icon'}/></Link>
        </li>
    );
}