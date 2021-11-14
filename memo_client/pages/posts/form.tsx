const Form = ()=> {
    return(
        <div>
            <h1>メモ新規作成</h1>
            <form action={`http://localhost:3000/posts`} method={"post"}>
                <div>
                    <label htmlFor="title">タイトル</label>
                    <div>
                        <input type="text" />
                    </div>
                </div>
                <div>
                    <label htmlFor="body">本文</label>
                    <div>
                        <textarea name="body" id="body"></textarea>
                    </div>
                </div>
                <button type={"submit"}>登録する</button>
            </form>
        </div>
    )
}

export default Form