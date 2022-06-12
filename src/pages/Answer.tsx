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
    `${import.meta.env.VITE_URL}/question?id=${postId}`,
    fetcher
  );
  // @ts-ignore
  const { data: answers, error_ } = useSWR(
    `${import.meta.env.VITE_URL}/answers?id=${postId}`,
    fetcher
  );
  if (error || error_) return <div>failed to load</div>;
  if (!data || !answers) return <div>loading...</div>;
  return (
    <div>
      <Header />
      <div className="nonpoint"><CreatePreview data={data.post} /></div>
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
       <div className="title-button">
         <p className="atitle">回答入力</p>
         <button
          className="abutton"
            onClick={async () => {
              const response = await fetch(import.meta.env.VITE_URL + "/answers", {
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
       </div>

        <div className="radiobox">
          選択肢: 
          <>
            {props.data.choices.map((choice: any) => (
              <label>
                <input
                 className="radio"
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
        <textarea
          name="replycontent"
          className="replybox"
          wrap="soft"
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
        />
        
      </form>
    </div>
  );
}

const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

function CreateOtherAnswer(props: any) {
  return (
    <div className="other_answer">
      <div className="other_selection">回答: {props.choice}</div>
      <div className="other_comment">{props.comment}</div>
    </div>
  );
}
export default Answer;
