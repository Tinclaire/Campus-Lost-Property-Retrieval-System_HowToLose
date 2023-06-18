import { useState } from "react";
import FormInput from "./component/FormInput";
import React from "react";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PopUp from "./PopUp";

function Register(props) {
  const [values, setValues] = useState({
    username: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  });

  const [goTo, setGoTo] = React.useState(false)
  const [isOpen, setIsOpen] = useState(false)

  if (goTo) {
    return <Navigate to='/login' />
  }
  const handlePost = async () => {
    await register(values)
    // await goToBackend(values, getCookies('token'))
    // const registerResult = await register(values)
    // if (registerResult) {
    //   // setCookies('token', registerResult)
    //   setGoTo(true)
    // } else {
    //   setIsOpen(true)
    // }
    setGoTo(true)
  }

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "請輸入用戶名稱",
      errorMessage: "用戶名稱應為 3-16 字元且不可用特殊符號",
      label: "使用者名稱",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "studentId",
      type: "num",
      placeholder: "請輸入學號",
      errorMessage: "學號格式錯誤 請輸入正確的學號",
      label: "學號",
      pattern: "^[0-9]{9}$",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "請輸入密碼",
      errorMessage: "密碼需為8-20字元且至少包含1個數字和1個字母",
      label: "設定密碼",
      pattern: "^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,20}$",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "再次輸入密碼以確認",
      errorMessage: "ㄟ你密碼打錯了",
      label: "確認密碼",
      pattern: values.password,
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
      {isOpen && <PopUp
        handleClose={() => { setIsOpen(false) }}
        content={
          <div>
            註冊失敗！
            {/* 應該是沒有按照格式~ */}
          </div>
        }
      />}
      <div className="Register">
        <form onSubmit={handleSubmit}>
          <h1>用戶註冊</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button className="buttonLR" onClick={handlePost}>註冊</button>
          {/* <button
          className="link-btn"
          onClick={() => props.onFormSwitch("Login")}
        >
          已經有帳號了嗎？點擊這裡登入
        </button> */}
          <p />
          <Link className="link-btnR" to='../login'>
            已經有帳號了嗎？點擊這裡登入
          </Link>
        </form>
      </div>
    </>
  );
};
async function register(values) {
  await fetch('http://localhost:8080/api/user/register',
    {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  //   .then(res => res.json())
  //   .then(data => data)
    // .catch(err => { throw new Error('Register Failed, fit the format!') })
  // // if (data) return true
  // else return undefined
}

export default Register;
