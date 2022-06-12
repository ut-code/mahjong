import { useState, useEffect } from "react";
import "../styles/Home.css";
import Header from "./Header";
import useSWR from "swr";
import { useNavigate } from "react-router";

function Home() {
  const { data, error } = useSWR("http://localhost:3500/questions", fetcher);
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div>
      <Header />
      <CreatePostButton />
      {
        data.posts.map((data: any) => (
          <CreatePreview data={data}></CreatePreview>
        ))
      }
    </div>
  );
}

export function CreatePreview(props: any): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="preview" onClick={() => navigate(`/answer/${props.data.id}`)}>
      <div className="qtitle">ここにタイトル</div>
      <div className="qproperty">
        <div className="qimage">ここに画像</div>
        <div className="qcomment">{props.data.body}</div>
      </div>
      <ul>
      {props.data.choices.map((choice: string) => (
        <li>{choice}</li>
      ))}
      </ul>
    </div>
  );
}

function CreatePostButton() {
    const navigate = useNavigate();
  return <div className="postbutton" onClick={() => navigate('/postscreen')}><p className="buttonname">質 問</p></div>;
}

const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

export default Home;
