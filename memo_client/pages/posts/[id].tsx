import Link from "next/link";
import { useRouter } from 'next/router';

const PostPage = (props) => {
    const router = useRouter();

    return(
        <div>
            <h1>タイトル: {props.data.title}</h1>
            <span>作成日: {props.data.created_at}</span>
            <p>本文: {props.data.body} </p>
            <Link href={`/posts/${props.post_id}/edit`}><a>Edit</a></Link>
            <Link href={`/post`}><a>Back</a></Link>
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
            data,
            post_id
        },
    };
}

