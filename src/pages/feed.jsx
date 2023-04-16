import axios from "axios"
import { useState, useEffect } from "react";
import {  Button } from "@chakra-ui/react"
import UserInfo from "../components/UserInfo.jsx";
import Like from "../components/Like.jsx"

export function AllPosts() {
    
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/feed", {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        }).then((res) => {
            setPosts(res.data.posts)
        })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    return (<>
        <div>
            {posts ? posts.map((post) => {
                return <div key={post._id}>
                    <UserInfo
                        id={post.userId} />
                    <div>
                        {post.image && (
                            <img width="100" height="200"
                                src={`http://localhost:3001/${post.image}`}
                                alt='img'
                            />
                        )}
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <Like postId={post._id} likesCount={post.likes.length} />
                </div>
            }) : <div>no posts</div>}
        </div>
    </>)

}

