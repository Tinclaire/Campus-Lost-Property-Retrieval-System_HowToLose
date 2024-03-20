import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from 'react-router-dom';
import NavBar from "./NavBar";
import PopUp from "./PopUp";
import FormInput from "./component/FormInput";

function Setting(props) {
    const [values, setValues] = useState({
        newUsername: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [goToPersonal, setGoToPersonal] = React.useState(false)
    const [goTo, setGoTo] = React.useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(["token"])
    const [isOpenName, setIsOpenName] = useState(false)
    const [isOpenNameFailed, setIsOpenNameFailed] = useState(false)
    const [isOpenPw, setIsOpenPw] = useState(false)
    const [isOpenPwFailed, setIsOpenPwFailed] = useState(false)

    useEffect(() => {
        console.log('isOpenName ' + isOpenName)
    }, [isOpenName])

    if (goTo) {
        return <Navigate to='/' />
    }
    if (goToPersonal) {
        return <Navigate to='/personal' />
    }
    const handlePostName = async () => {
        await changeName(values, cookies.token)
            .then((res) => {
                setGoToPersonal(true)
                if (res) {
                    setIsOpenName(true)
                } else setIsOpenNameFailed(true)
            }) //await確定回傳了 才會執行下個步驟

    }

    const handlePostPw = async () => {
        await changePww(values, cookies.token)
            .then((res) => {
                if (res) {
                    setIsOpenPw(true)
                } else setIsOpenPwFailed(true)
            }) //await確定回傳了 才會執行下個步驟

    }

    const logout = () => {
        removeCookie("token")
        setGoTo(true)
    }

    const changeUserName = [
        {
            id: 1,
            name: "newUsername",
            type: "text",
            placeholder: "請輸入新的用戶名稱",
            errorMessage: "名字長度要在3~16單位之間喔",
            label: "想叫什麼新名字",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
    ];

    const changePw = [
        {
            id: 1,
            name: "newPassword",
            type: "password",
            placeholder: "請輸入新密碼",
            errorMessage: "密碼長度要在3~16個單位之間",
            label: "設定新密碼",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "confirmNewPassword",
            type: "password",
            placeholder: "再次輸入新密碼以確認",
            errorMessage: "你密碼打錯啦",
            label: "確認密碼",
            pattern: values.newPassword,
            required: true,
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    console.log(values);

    return (
        <>
            <NavBar />
            {/* <h1>Setting</h1> */}

            {isOpenName && <PopUp handleCLose={setIsOpenName(false)} content={<div>改名成功！</div>} />}
            {isOpenNameFailed && <PopUp handleClose={setIsOpenNameFailed(false)} content={<div>改名失敗！</div>} />}
            {isOpenPw && <PopUp handleCLose={setIsOpenPw(false)} content={<div>改密碼成功！</div>} />}
            {isOpenPwFailed && <PopUp handleCLose={setIsOpenPwFailed(false)} content={<div>改密碼失敗！</div>} />}

            <div className="newUsername">
                <form onSubmit={handleSubmit} className="formChange">
                    <h1>！改名字！</h1>
                    {changeUserName.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <button className="buttonConfirm" onClick={handlePostName}>確認更改</button>
                    <button className="buttonCancel">不改啦</button>
                </form>
                {/* </div> */}

                {/* <div className="newPw"> */}
                <form onSubmit={handleSubmit} className="formChange">
                    <h1>！改密碼！</h1>
                    {changePw.map((input) => (
                        <FormInput
                            key={input.id}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}
                    <button className="buttonConfirm" onClick={handlePostPw}>確認更改</button>
                    <button className="buttonCancel">不改啦</button>
                </form>
            </div>

            {/* <div className="span" /> */}
            <div className="logout">
                <button onClick={logout}>登出</button>
            </div>
            <div className="span" />


        </>
    );
}

// function Popup({is, setIs, content}) { //is means isOpen?
//     return <PopUp
//         handleClose={{ setIs }}
//         content={
//             <div>
//                 {content}
//             </div>
//         }
//     />
// }

async function changeName(values, token) {
    const data = await fetch(`${process.env.REACT_APP_API}/api/user/changeName`,
        {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json", "token": token }
        })
        // .then(res => {return res.json()})
        .then(res => res.json())
        .then(data => data)
        .catch(err => { throw new Error('Failed') })
    if (data) return data.result
    else return undefined
}

async function changePww(values, token) {
    const data = await fetch(`${process.env.REACT_APP_API}/api/user/changePw`,
        {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json", "token": token }
        })
        // .then(res => {return res.json()})
        .then(res => res.json())
        .then(data => data)
        .catch(err => { throw new Error('Failed') })
    if (data) return data.result
    else return undefined
}

export default Setting;