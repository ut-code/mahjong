import "../styles/Answer.css";
import Header from "./Header";
import useSWR from "swr";
import { useSearchParams } from "react-router-dom";
import { CreatePreview } from "./Home";
import { useState } from "react";

function Answer() {
  const [searchParams] = useSearchParams();
  const { data, error } = useSWR(
    `http://localhost:3500/question?id=${searchParams.get("id")}`,
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
  const handleChange = (e: any) => setRadioval(e.target.value);
  return (
    <div className="formbox">
      <form>
        <p className="atitle">回答内容</p>
        <textarea name="replycontent" className="replybox" wrap="soft" />
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
        <input type="submit"></input>
      </form>
    </div>
  );
}

function CreateRadioButton() {
  return <input type="radio" name="option" value="value" />;
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
