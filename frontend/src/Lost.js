import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import TabBar from "./TabBar";
import { MdFavorite } from "react-icons/md";
import logo from './image/logo.jpg';
import { FaComment } from "react-icons/fa";
import NavBar from "./NavBar";
import { Navigate } from 'react-router-dom';


function Lost(props){
    const [goTo, setGoTo] = useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/posts/lostlist')
            .then(res => {
                // setItems(res.data)
                console.log(res);
                setPosts(res.data)
            }).catch(err => console.log(err));
    }, [])

    if(goTo){
        return <Navigate to='/main/lost/content' />
    }

    const rows = [];
    for (let i = 0; i < 5; i++) {
        rows.push(<Post title={'我的學生證不見了:（'} cn={35} ln={250}/>)
    }
    return(
        <>
            <NavBar />
            <TabBar />

            {
                posts.map(post => <Post key={post.id} title={post.title} thing={post.objectName} location={post.location.locaName} id={post.id.toString()} cn={post.cNum}/>)
            }
        </>
    );
}
function Post({title, thing, location, cn, goTo, id}){
    // let num = list.length()
    for(let i=0; i<5;i++){
        return(
            <div className='post'>
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
                    <a type="button" className='goto' href={"http://localhost:3000/main/content/" +id}>去看看</a>
                    {/* <button className='goto' onClick={ goTo }>去看看</button> */}
                </div>
            </div>
        );
    }
}
export default Lost;