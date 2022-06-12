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
      <div className="qtitle">{props.data.body}</div>
      <div className="qproperty">

        <div className="imagecenter">
        {props.data.imgurl !== "" && <img src={props.data.imgurl} className="image"/>}
        </div>
        <div className="optioncomment">選択肢：</div>
      <ul className="options">
      {props.data.choices.map((choice: string) => (
        <li className="option">{choice}</li>
      ))}
      </ul>
      </div>
      
    </div>
  );
}

function CreatePostButton() {
    const navigate = useNavigate();
  return <div className="createpostbutton" onClick={() => navigate('/postscreen')}><p className="buttonname">作<span className="chousei"> </span>成</p></div>;
}

const fetcher = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

export default Home;
