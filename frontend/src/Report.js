import { useState } from "react";
import React from "react";
import FormInput from "./component/FormInput";
import { Navigate } from 'react-router-dom';
import NavBar from "./NavBar";
import { useCookies } from "react-cookie";

function Report (props)  {
    const [values, setValues] = useState({
        reportId: "",
        reportReason: "",
    });

    const [goTo, setGoTo] = React.useState(false)
    const [cookies, setCookies] = useCookies(['token'])

    if(goTo){
        return <Navigate to='/main/find' />
    }

    const handlePost = async () => {
        // await goToBackend(values, getCookies('token'))
        await goToBackend(values, cookies.token)
        setGoTo(true)
    }

  const inputs = [
    {
      id: 1,
      name: "reportId", //要跟上面useState的一樣
      type: "text",
      placeholder: "請輸入檢舉對象ID (學號)",
      errorMessage:"用戶ID格式錯誤 請輸入正確用戶ID",
      label: "檢舉對象用戶ID",
      pattern:"^[0-9]{9}$",
      required: true,
    },
    {
      id: 2,
      name: "reportReason",
      type: "text",
      placeholder: "請輸入檢舉原因",
      errorMessage:"檢舉原因不可為空",
      label: "檢舉原因",
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
        <NavBar/>
        <div className="Report">
        <form onSubmit={handleSubmit}>
              <h1>檢舉使用者</h1>
            {inputs.map((input) => (
            <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
            />
            ))}
        <button className='buttonConfirm' onClick={ handlePost }>檢舉</button>
        <button className='buttonCancel' onClick={ () => {setGoTo(true);} }>返回</button>
      </form>
    </div>
    </>
  );
};
async function goToBackend(values, token){
    await fetch('http://localhost:8080/api/report/action', {method: "POST", body: JSON.stringify(values), headers:{"Content-Type": "application/json", "token": token}})
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
export default Report;
