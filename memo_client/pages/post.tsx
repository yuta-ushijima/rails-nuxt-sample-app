import {string} from "prop-types";
import Link from "next/link";

type title = { string }

const Post = (props) => {
    return(
        <div>
            <h1>メモ一覧</h1>
            {props.posts.map((post, index) =>
                <div key={index}>
                    <h2>{post.title}</h2>
                    <p>{post.createdAt}</p>
                    <p>{post.body}</p>
                    <Link href={`/posts/${post.slug}`}><a>Read More</a></Link>
                </div>
            )}
        </div>
    )
}

export default Post

export async function getServerSideProps() {
    const posts_path = "http://localhost:3000/posts";
    const res = await fetch(posts_path);
    const data = await res.json();

    const posts = data.map((post) => {
        let slug = post.id
        return{
            title: post.title,
            body: post.title,
            createdAt: post.created_at,
            slug: slug
        }
    })
    return {
        props: {
            posts: posts
        }
    }
}