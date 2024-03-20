import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import FormInput from "./component/FormInput";


function Post(props){
    const [values, setValues] = useState({
      title: "",
      object: "",
      contact: "",
      // pic: "",
      time: "",
      location: "",
      findOrLost: "",
    });

    const [goTo, setGoTo] = React.useState(false)
    // const [getCookies] = useCookies(['token'])
    const [cookies, setCookies] = useCookies(['token'])

    if(goTo){
        return <Navigate to='/main' />
    }

    const handlePost = async () => {
      // await goToBackend(values, getCookies('token'))
      await goToBackend(values, cookies.token)
      setGoTo(true)
    }

    const inputs = [
      {
        id: 1,
        name: "title", //要跟上面useState的一樣
        type: "text",
        placeholder: "請輸入貼文標題",
        errorMessage: "文章標題不可為空",
        label: "文章標題",
        required: true,
      },
      {
        id: 2,
        name: "object",
        type: "text",
        placeholder: "請輸入物品名稱",
        errorMessage: "物品名稱不可為空",
        label: "尋找/拾獲之物品名稱",
        required: true,
      },
      {
        id: 3,
        name: "contact",
        type: "text",
        placeholder: "請輸入聯繫方式",
        errorMessage: "聯繫方式不可為空",
        label: "聯繫方式",
        required: true,
      },
      // {
      //   id: 4,
      //   name: "pic",
      //   type: "file",
      //   label: "物品照片(非必須)",
      //   required: false,
      // },
      {
        id: 4,
        name: "time",
        type: "datetime-local",
        errorMessage: "時間不可為空",
        label: "尋找/拾獲時間",
        required: true,
      },
      {
        id: 5,
        name: "location",
        type: "text",
        placeholder: "請輸入地點",
        errorMessage: "地點不可為空",
        label: "尋找/拾獲地點",
        required: true,
      },
      {
        id: 6,
        name: "findOrLost",
        type: "text",
        placeholder: "請輸入'撿'或是'掉'",
        errorMessage: "你到底是撿東西還掉東西啦",
        label: "撿東西/掉東西",
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

    

    return(
        <>
            <NavBar />
            <div className="Report">
              {/* <image href={Dog} /> */}
            <form className='formPost' onSubmit={handleSubmit}>
                <h1>發布貼文</h1>
                {inputs.map((input) => (
                    <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                    />
                ))}
                {/* <p className="location">撿東西/掉東西</p>
                <select className="locationSel" onChange={handleSubmit}>
                  <option value="01">撿東西</option>
                  <option value="02">掉東西</option>
                </select> */}

                <button className="buttonConfirm" onClick={handlePost}>發送貼文</button>
                <button 
                  className="buttonCancel" 
                  onClick={ () => {setValues({
                    title: "",
                    object: "",
                    contact: "",
                    pic: "",
                    time: "",
                    location: "",
                })}  }>取消</button>
            </form>
            </div>
        </>
    );
}
async function goToBackend(values, token){
  await fetch(`${process.env.REACT_APP_API}/api/posts/post`, {method: "POST", body: JSON.stringify(values), headers:{"Content-Type": "application/json", "token": token}})
    .then(res => console.log(res))
    .catch(err => console.log(err))
}
export default Post;