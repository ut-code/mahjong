import "../styles/Home.css"
function Home() {
    // この辺でheaderを呼ぶ。
    return (
    <div>
    {/* データベースに存在する投稿の数だけCreatePreviewを呼ぶ操作 */}
    <CreatePreview></CreatePreview>
     <CreatePostButton></CreatePostButton>
     </div>
    )
}

function CreatePreview() {
    return (
    <div className="preview">
        <div className="qtitle">ここにタイトル</div>
        <div className="qproperty">
            <div className="qimage">ここに画像</div>
            <div className="qcomment">ここにコメント</div>
        </div>
        
    </div>
    )
}

function CreatePostButton(){
    return (
        <div className="postbutton">
            質問を作成
        </div>
    )
}


export default Home;
