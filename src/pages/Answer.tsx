import "../styles/Answer.css"
import Header from "./Header"

function Answer(){
    return(
        <div>
            <Header/>
            <CreateAnswer/>
        </div>
    )
}

function CreateAnswer(){
    return(
        <div className="formbox">
            <form>
                <p>回答内容</p>
                <input type="text" name="replycontent" className="replybox"></input>
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

export default Answer;