import "../styles/Answer.css";
import Header from "./Header";
import useSWR from "swr";
import { useSearchParams } from "react-router-dom";
import { CreatePreview } from "./Home";

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
      <CreateAnswer />
      <CreateOtherAnswer />
      <CreateOtherAnswer />
      <CreateOtherAnswer />
    </div>
  );
}

function CreateAnswer() {
  return (
    <div className="formbox">
      <form>
        <p>回答内容</p>
        <input type="text" name="replycontent" className="replybox"></input>
        <div>
          <CreateRadioButton />
          内容1
          <CreateRadioButton />
          内容2
          <CreateRadioButton />
          内容3
          <CreateRadioButton />
          内容4
        </div>
        <input type="submit"></input>
      </form>
    </div>
  );
}

function CreateRadioButton() {
  return <input type="radio" name="option" value="" />;
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

