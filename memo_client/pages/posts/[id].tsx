const PostPage = (props) => {
    return(
        <div>
            <h1>タイトル: {props.data.title}</h1>
            <span>作成日: {props.data.created_at}</span>
            <p>本文: {props.data.body} </p>
        </div>
    );
};

export default PostPage;

export async function getServerSideProps(context) {
    const post_id = context.params.id
    const url = `http://localhost:3000/posts/${post_id}`;
    const res = await fetch(url);
    const data = await res.json();
    return {
        props: {
            data
        },
    };
}

