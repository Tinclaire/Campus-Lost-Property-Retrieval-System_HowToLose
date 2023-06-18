import { useState } from "react";
import FormInput from "./component/FormInput";
import React from "react";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import PopUp from "./PopUp";

function Login(props) {
  const [values, setValues] = useState({
    id: "",
    password: "",
  });
  const [goTo, setGoTo] = React.useState(false)
  const [cookies, setCookies] = useCookies(['token'])
  const [isOpen, setIsOpen] = useState(false)

  if (goTo) {
    return <Navigate to='/main' />
  }
  const handlePost = async () => {
    const loginResult = await login(values) //await確定回傳了 才會執行下個步驟
    if (loginResult) {
      setCookies('token', loginResult)
      setGoTo(true)
    } else {
      setIsOpen(true)
    }
  }

  const inputs = [
    {
      id: 1,
      name: "id",
      type: "text",
      placeholder: "請輸入學號",
      errorMessage: "學號格式錯誤 請輸入正確的學號",
      label: "你的學號",
      pattern: "^[0-9]{9}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "請輸入密碼",
      errorMessage: "密碼需為8-20字元且至少包含1個數字和1個字母",
      label: "你的密碼",
      pattern: "^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,20}$",
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
            登入失敗！
          </div>
        }
      />}
      <div className="Login">
        <form onSubmit={handleSubmit}>
          <h1>How To Lose 登入</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button className="buttonLR" onClick={handlePost}>登入</button>
          <p />
          <Link className="link-btnL" to='../register'>
            還沒有帳號嗎？點擊這裡註冊
          </Link>
        </form>
      </div>
    </>
  );
};

async function login(values) {
  const data = await fetch('http://localhost:8080/api/user/login',
    {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" }
    })
    // .then(res => {return res.json()})
    .then(res => res.json())
    .then(data => data)
    .catch(err => { throw new Error('Login Failed') })
  if (data) return data.result
  else return undefined
}

export default Login;
