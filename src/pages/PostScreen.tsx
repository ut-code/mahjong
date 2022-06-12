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
  const [url, setUrl] = useState("");
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
         <input
        type="file"
        onChange={async (ev) => {
          const formdata = new FormData();
          // @ts-ignore
          formdata.append("file", ev.target.files[0]);
          formdata.append("upload_preset", "sb0kpinr");
          const config = {
            method: "POST",
            body: formdata,
          };
          // @ts-ignore
          fetch(
            "https://api.cloudinary.com/v1_1/dby66ohpf/image/upload",
            config
          )
            .then((data) => data.json())
            .then((data) => {
              setUrl(data.url);
            });
        }}
      ></input>
         画像を選択
        </label>
        {url !== "" && <img src={url} />}
      </div>
      
      <button
        className="postbutton"
        id="post-button"
        onClick={async () => {
          navigate("/");
          const response = await fetch(import.meta.env.VITE_URL + "/questions", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ body: text, choices: choices, url: url }),
          });
        }}
      >
        送信
      </button>
    </div>
  );
}

export default PostScreen;
