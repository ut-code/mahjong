import "../styles/Answer.css";
import Header from "./Header";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { CreatePreview } from "./Home";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Answer() {
  const { postId } = useParams();
  const { data, error } = useSWR(
    `http://localhost:3500/question?id=${postId}`,
    fetcher
  );
  // @ts-ignore
  const { data: answers, error_ } = useSWR(
    `http://localhost:3500/answers?id=${postId}`,
    fetcher
  );
  if (error || error_) return <div>failed to load</div>;
  if (!data || !answers) return <div>loading...</div>;
  return (
    <div>
      <Header />
      <CreatePreview data={data.post} />
      <CreateAnswer data={data.post} />
      {answers.answers.map((answer: { choice: number; body: String }) => (
        <CreateOtherAnswer
          choice={data.post.choices[answer.choice]}
          comment={answer.body}
        />
      ))}
    </div>
  );
}

function CreateAnswer(props: any) {
  const [radioval, setRadioval] = useState(props.data.choices[0]);
  const [textarea, setTextarea] = useState("");
  const handleChange = (e: any) => setRadioval(e.target.value);
  return (
    <div className="formbox">
      <form>
        <p className="atitle">回答内容</p>
        <textarea
          name="replycontent"
          className="replybox"
          wrap="soft"
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
        />
        <div>
          <>
            {props.data.choices.map((choice: any) => (
              <label>
                <input
                  type="radio"
                  value={choice}
                  onChange={handleChange}
                  checked={radioval === choice}
                />
                {choice}
              </label>
            ))}
          </>
        </div>
        <button
          onClick={async () => {
            const response = await fetch("http://localhost:3500/answers", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                choice: props.data.choices.indexOf(radioval),
                body: textarea,
                postId: props.data.id,
              }),
            });
          }}
        >
          送信
        </button>
      </form>
    </div>
  );
}

const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

function CreateOtherAnswer(props: any) {
  return (
    <div className="other_answer">
      <div className="other_selection">{props.choice}</div>
      <div className="other_comment">{props.comment}</div>
    </div>
  );
}
export default Answer;
