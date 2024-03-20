import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FaComment } from "react-icons/fa";
import { Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import './Personal.css';
import logo from './image/logo.jpg';

function Personal(props) {
    const [goTo, setGoTo] = React.useState(false)
    const [posts, setPosts] = useState([])
    const [cookies, setCookies] = useCookies(['token'])
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/api/posts/personallist`, { headers: { "Content-Type": "application/json", "token": cookies.token } })
            .then(res => {
                // setItems(res.data)
                console.log(res);
                setPosts(res.data)
            }).catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/api/user/personal`, { headers: { "Content-Type": "application/json", "token": cookies.token } })
            .then(res => {
                // setItems(res.data)
                console.log(res);
                setUser(res.data)
            }).catch(err => console.log(err));
    }, [])

    if (goTo) {
        return <Navigate to='/main/find/content' />
    }

    const rows = [];
    for (let i = 0; i < 5; i++) {
        rows.push(<Post title={'我的學生證不見了:（'} cn={35} ln={250} idp={i} />)
    }
    return (
        <>
            {/* <header> */}
            <NavBar />
            {/* </header> */}
            <UserInfo id={user.id} name={user.name} />
            <div className='post-container'>
                <div className='post-title'>尼發過的文</div>
                {/* {rows} */}

                {
                    posts.map(post => <Post key={post.id} title={post.title} thing={post.objectName} location={post.location.locaName} id={post.id.toString()} cn={post.cNum}/>)
                }
            </div>
        </>
    );
}

function UserInfo({ id, name }) {
    return (
        <div className='user'>
            <div className='avatar'>
                <img classname='avatar_image' src={logo} />
                {/* <FaComment className='avatar_image' /> */}
            </div>
            <div className='info'>{id}</div> {/*ID*/}
            <div className='info'>{name}</div> {/*name*/}
        </div>
    );
}

function Post({ title, thing, location, cn, goTo, ln, idp, list, id}) { //ln, idp, list不用管
    // let num = list.length()
    // for(let i=0; i<5;i++){
    return (
        <div className='post-personal'>
            <div>
                <div className='ti'>{title}</div> {/*標題 list[i].title*/}
                <div className="detail">物品名稱/地點</div>
                <div>{thing}/{location}</div>
            </div>
            <div className="commentNumber_goto">
                <div className='infoo'>
                    <FaComment className='post-icon' />
                    <div className='number'>{cn}</div>
                </div>
                <a type="button" className='goto' href={"/main/content/" +id}>去看看</a>
                {/* <button className='goto' onClick={goTo}>去看看</button> */}
            </div>
        </div>
    );
    {/*下面這邊是原本的 有加上id的*/ }
    {/*<div className='post'>
                <div className='ti'>
                    <div>{idp}</div>
                    <div>{title}</div> */} {/*標題 list[i].title*/ }
    {/*</div>
                <div>
                    <div className='infoo'>
                        <FaComment className='post-icon' />
                        <div className='number'>{cn}</div>
                    </div>
                    <div className='infoo'>
                        <MdFavorite className='post-icon' color='red'/>
                        <div className='number'>{ln}</div>
                    </div>
                </div>
            </div>*/}
    // }
}
export default Personal;

