import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { MdOutlineReportProblem } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import './Content.css';
import NavBar from "./NavBar";
import bear from './image/bear.jpg';
import panda from './image/panda.jpg';
import pet2 from './image/pet2.jpg';

const Content = () => {
    const params = useParams()
    const postId = params.id
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [cookies, getCookies] = useCookies(['token'])
    const [value, setValue] = useState("")
    const [id, setId] = useState(1)
    // const [id]

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/api/posts/post`, { headers: { "Content-Type": "application/json", "id": postId } })
            // .then(res => JSON.stringify(res))
            .then(res => {
                // setItems(res.data)
                console.log(res);
                setPost(res.data)
            }).catch(err => console.log(err));
        console.log(post)
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/api/comment/conc`, { headers: { "Content-Type": "application/json", "id": postId } })
            // .then(res => JSON.stringify(res))
            .then(res => {
                // setItems(res.data)
                console.log(res);
                setComments(res.data)
            }).catch(err => console.log(err));
    }, [])

    const handlePost = async () => {
        // await goToBackend(values, getCookies('token'))
        goToBackend(value, cookies.token, postId) //value指的是textarea的內容
        // setGoTo(true)
    }

    return (
        <>
            <NavBar />
            {/* <div>{postId}</div> */}
            {post.poster && <PostContent id={post.poster.id} userLogo={bear} title={post.title} thing={post.objectName}
                time={post.time} contact={post.contact} location={post.location.locaName} image={pet2} />}

            {
                comments.map(comment => <Comments key={comment.id} userLogo={panda} id={comment.currUser.id} text={comment.comment} />)
            }
            {/* <Comments userLogo={panda} id={110306073} text={'好多人學生證不見'} bx={1}/>
            <Comments userLogo={logo} id={110306043} text={'...'} bx={2}/> */}

            <div className="span" />
            <div className="span" />

            <div className="input">
                <textarea name="postContent" cols={161} onChange={e => setValue(e.currentTarget.value)} placeholder="回覆" />
                <button className="enter" onClick={handlePost}>送出</button>
            </div>
        </>
    )
}

function PostContent({ id, userLogo, title, thing, contact, time, location, image }) {
    return (
        <div className="postContent">
            <div className="info_report">
                <div className="userInfo">
                    <div className='avatarContent'>
                        <img className='avatar_image' src={userLogo} />
                    </div>
                    <div className="space" />
                    <div className="userId">{id}</div>
                </div>
                <Link to='../main/report'><MdOutlineReportProblem className="report_icon" /></Link>
            </div>
            <div className="titleC">{title}</div> {/*這邊要輸入標題*/}
            <div className="content">
                <div>拾獲物品：{thing}</div>
                <div>聯繫方式：{contact}</div>
                <div>拾獲時間：{time}</div>
                <div>拾獲地點：{location}</div>
                {/* <div>照片：</div>
                <img src={image}/> */}
            </div>
        </div>
    );
}

function Comments({ userLogo, id, text, bx }) { //bx是B1, B2, B3...
    return (
        <div className="comment">
            <div className="info_report">
                <div className="userInfo">
                    <div className='avatarContent'>
                        <img className='avatar_image' src={userLogo} />
                    </div>
                    <div className="space" />
                    <div className="userId">{id}</div>
                </div>
                <Link to='../main/report'><MdOutlineReportProblem className="report_icon" /></Link>
            </div>
            <div className="text">
                <div>{text}</div>
                {/* <div>B{bx}</div> */}
            </div>
        </div>
    );
}

async function goToBackend(values, token, id) {
    console.log('value:' + values, 'token: ' + token, 'id: ' + id)
    axios.post(`${process.env.REACT_APP_API}/api/comment/saysomething`, { values: values }, { headers: { "Content-Type": "application/json", "token": token, "id": id } })
        .then(res => console.log(res))
        .catch(err => console.log(err.message))
}

export default Content;