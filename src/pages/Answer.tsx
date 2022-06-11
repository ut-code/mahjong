import "../styles/Answer.css"
import Header from "./Header"

function Answer(){
    return(
        <div>
            <Header/>
            <CreateAnswer/>
            <CreateOtherAnswer/>
            <CreateOtherAnswer/>
            <CreateOtherAnswer/>
        </div>
    )
}

function CreateAnswer(){
    return(
        <div className="formbox">
            <form>
                <p className="atitle">回答内容</p>
                <textarea name="replycontent" className="replybox" wrap="soft"/>
                <div>
                    <CreateRadioButton/>内容1
                    <CreateRadioButton/>内容2
                    <CreateRadioButton/>内容3
                    <CreateRadioButton/>内容4
                </div>
                <input type="submit"></input>
            </form>
        </div>
    )
}

function CreateRadioButton(){
    return(
        <input type="radio" name="option" value=""/>
    )
}


function CreateOtherAnswer() {
    return(
    <div className="other_answer">
      <div className="other_selection">ここに他の人の選択</div>
      <div className="other_comment">ここに他の人のコメント</div>
    </div>
    )
}
export default Answer;