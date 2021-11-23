import {useState} from 'react';
import Router from 'next/router';

const Form = ()=> {
    // content...title,bodyのそれぞれの値
    // setContent...title,bodyを更新するための関数(宣言するだけで利用可能)
    const [content, setContent] = useState({
        title: '',
        body: ''
    });

    // response...API側でエラーメッセージが返ってきた時、格納するそれぞれの値
    // setResponse...API側でエラーメッセージが返ってきた時にresponseの値を更新する
    const [response, setResponse] = useState({
        type: '',
        message: '',
    });

    const handleChange = e =>
        // 「...content」...スプレッド演算子でtitle,bodyの値を格納
        setContent({...content, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                body: JSON.stringify(content),
                headers: {'Content-Type': 'application/json'},
            });

            const json = await res.json();

            if (res.status == 201) {
                //成功したらsuccessページに飛ぶ
                Router.push('http://localhost:3001/post');
            } else {
                setResponse({
                    type: 'error',
                    message: json.message,
                });
            }
        } catch (e) {
            console.log('An error occurred', e);
            setResponse({
                type: 'error',
                message: 'An error occured while submitting the form',
            });
        }
    };

    return(
        <div>
            <p>{response.message}</p>
            <h1>メモ新規作成</h1>
            <form action="http://localhost:3000/posts" method={"post"} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">タイトル</label>
                    <div>
                        <input name="title" type="text" onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <label htmlFor="body">本文</label>
                    <div>
                        <textarea name="body" id="body" onChange={handleChange} />
                    </div>
                </div>
                <button type={"submit"}>登録する</button>
            </form>
        </div>
    )
}

export default Form