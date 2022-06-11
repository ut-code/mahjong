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
  const navigate = useNavigate();
  return (
    <div>
      <form>
        <input
          id="comment"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          id="post-button"
          onClick={async () => {
            navigate("/");
            const response = await fetch("http://localhost:3500/questions", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ body: text }),
            });
          }}
        >
          送信
        </button>
      </form>
    </div>
  );
}

export default PostScreen;
