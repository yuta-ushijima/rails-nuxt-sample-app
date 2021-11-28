import { useState } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';

const Edit = (props)=> {
    // content...title,bodyのそれぞれの値
    // setContent...title,bodyを更新するための関数(宣言するだけで利用可能)
    const [content, setContent] = useState({
        title: props.data.title,
        body: props.data.body
    });

    // response...API側でエラーメッセージが返ってきた時、格納するそれぞれの値
    // setResponse...API側でエラーメッセージが返ってきた時にresponseの値を更新する
    const [response, setResponse] = useState({
        type: '',
        message: '',
    });

    const [initValue, setValue] = useState({
        title: '',
        body: '',
    });

    const handleChange = e =>
        // 「...content」...スプレッド演算子でtitle,bodyの値を格納
        setContent({...content, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postId = props.post_id
            const res = await fetch(`http://localhost:3000/posts/${postId}`, {
                method: 'PUT',
                body: JSON.stringify(content),
                headers: {'Content-Type': 'application/json'},
            });

            const json = await res.json();

            if (res.status == 200) {
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
            <h1>メモ編集</h1>
            <form action="http://localhost:3000/posts" method={"PUT"} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">タイトル</label>
                    <div>
                        <input name="title" type="text" value={content.title} onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <label htmlFor="body">本文</label>
                    <div>
                        <textarea name="body" value={content.body} onChange={handleChange} />
                    </div>
                </div>
                <button type={"submit"}>更新する</button>
            </form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const post_id = context.params.id
    const url = `http://localhost:3000/posts/${post_id}`;
    const res = await fetch(url);
    const data = await res.json();
    return {
        props: {
            data,
            post_id
        },
    };
}

export default Edit