import React from 'react'  //<-- 引入React

function HelloWorld(props) {
    return (
        <div>
        {<h1>{"Hello World!" + props.msg}</h1>}
        </div>
    )
}

export default HelloWorld //<-- 輸出讓其他的js檔案使用