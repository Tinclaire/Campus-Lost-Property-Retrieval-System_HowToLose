import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";
import { Navigate } from 'react-router-dom';
import NavBar from "./NavBar";
import TabBar from "./TabBar";

const Find = () => {
    const [goTo, setGoTo] = React.useState(false)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/api/posts/findlist`)
            .then(res => {
                // setItems(res.data)
                console.log(res);
                setPosts(res.data)
            }).catch(err => console.log(err));
    }, [])
    // useEffect(() => {
    //     axios.get('http://localhost:8080/api/posts/{id}', params)
    //         .then(res => {
    //             // setItems(res.data)
    //             console.log(res);
    //             // setPosts(res.data)
    //         }).catch(err => console.log(err));
    // }, [])

    if (goTo) {
        return <Navigate to={'/main/find/content/' + posts.forEach} />
    }

    return (
        <>
            <NavBar />
            <TabBar />
            {
                posts.map(post => <Post key={post.id} title={post.title} thing={post.objectName} location={post.location.locaName} id={post.id.toString()} cn={post.cNum}/>)
            }
        </>
    );
}
function Post({ title, thing, location, cn, goTo , id}) {
    return (
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
                {/* <div className='infoo'>
                        <MdFavorite className='post-icon' color='red'/>
                        <div className='number'>{ln}</div>
                    </div> */}
                <a className='goto' href={"/main/content/" +id}>去看看</a>
                {/* <div>http://localhost:3000/main/find/content/{id}</div> */}
                {/* <button className='goto' onClick={ goTo }>去看看</button> */}
            </div>
        </div>
    );
    // }
}
async function getFindList(){
    const findList = await fetch(`${process.env.REACT_APP_API}/api/posts/findlist`,
        {method: "GET", headers:{"Content-Type": "application/json"}})
      .then(res => res.json())
      .then(data => data)
    //   .then(res => console.log(res))
      .catch(err => console.log(err))
    return findList
}

function List() {

}
export default Find;