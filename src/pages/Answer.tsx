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
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Answer;