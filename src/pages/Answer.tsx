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
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div>
      <Header />
      <CreatePreview data={data.post} />
      <CreateAnswer data={data.post} />
      <CreateOtherAnswer />
      <CreateOtherAnswer />
      <CreateOtherAnswer />
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

function CreateOtherAnswer() {
  return (
    <div className="other_answer">
      <div className="other_selection">ここに他の人の選択</div>
      <div className="other_comment">ここに他の人のコメント</div>
    </div>
  );
}
export default Answer;
