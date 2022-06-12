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
    <div className="postBox">
      <textarea
        className="postText"
          id="comment"
          wrap="soft"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div>
          <input className="postOption" value={choice} onChange={e => {
              setChoice(e.target.value)
          }} />
          <button className="postOpButton" onClick={() => {
              setChoices([...choices, choice])
              setChoice("")
          }}>選択肢を追加</button>
        </div>
      <ul>{
        choices.map((choice, index) => (
            <li key={index}>{choice}</li>
        ))
      }</ul>
      <button
        className="postButton"
       id="post-button"
        onClick={async () => {
          navigate("/");
          const response = await fetch("http://localhost:3500/questions", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ body: text, choices: choices }),
          });
        }}
      >
        送信
      </button>
    </div>
  );
}

export default PostScreen;
