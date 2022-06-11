import { useState } from "react";
import "../styles/PostScreen.css"
import Header from "./Header"

function PostScreen() {
    return (
        <div>
            <Header/>
            <CreateCommentForm/>
        </div>
    )
}

function CreateCommentForm() {
    const [text, setText] = useState("");
    return (
       <div>
       <input id="comment" value={text} onChange={
        (e) => {
          setText(e.target.value);
        }}
      />
      <button id="post-button">送信</button>
      <p>入力されたテキスト: {text}</p>
       </div>
    )

}

export default PostScreen;
