import { useState } from "react";
import "../styles/PostScreen.css";
import Header from "./Header";
import { useNavigate } from "react-router";

function PostScreen() {
  return (
    <div>
      <Header />
      <CreateCommentForm />
    </div>
  );
}

function CreateCommentForm() {
  const [text, setText] = useState("");
  const [choice, setChoice] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const navigate = useNavigate();
  return (
    <div className="postbox">
      <p className="cqtitle">質問入力</p>
      <div className="commentarea">
        <p className="message">コメントを入力してください</p>
        <textarea
          className="posttext"
          id="comment"
          wrap="soft"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
      <div className="optionarea">
       <p className="message">回答の選択肢を追加してください</p>
         <div>
           <input className="postoption" value={choice} onChange={e => {
               setChoice(e.target.value)
           }} />
           <button className="optionbutton" onClick={() => {
               setChoices([...choices, choice])
               setChoice("")
           }}>選択肢を追加</button>
         </div>
        <ul>{
          choices.map((choice, index) => (
             <>
                 <li key={index}>
                   <button className="cleanbutton"></button>
                   {choice}
                 </li>
             </>
         ))
        }</ul>
      </div>
      <div className="filearea">
        <p className="message">アップロードする画像を選択してください</p>
        <label className="instead-button">
         <input type="file" name="filebutton1"/>
         画像を選択
        </label>
      </div>
      
      <button
        className="postbutton"
       id="post-button"
        onClick={async () => {
          navigate("/");
          const response = await fetch("http://localhost:3500/questions", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ body: text, choices: choices , url: ""}),
          });
        }}
      >
        送信
      </button>
    </div>
  );
}

export default PostScreen;
