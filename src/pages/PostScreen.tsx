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
    <div className="postBox">
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
      {url !== "" && <img src={url} />}
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
        <input
          className="postOption"
          value={choice}
          onChange={(e) => {
            setChoice(e.target.value);
          }}
        />
        <button
          className="postOpButton"
          onClick={() => {
            setChoices([...choices, choice]);
            setChoice("");
          }}
        >
          選択肢を追加
        </button>
      </div>
      <ul>
        {choices.map((choice, index) => (
          <>
            <li key={index}>{choice}</li>
            <button>削除</button>
          </>
        ))}
      </ul>
      <button
        className="postButton"
        id="post-button"
        onClick={async () => {
          navigate("/");
          const response = await fetch("http://localhost:3500/questions", {
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
