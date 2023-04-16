import { Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Like({ postId, likesCount }) {

    const [likes, setLikes] = useState()

    useEffect(() => {

        setLikes(likesCount)
    }, [likesCount])

    const AddLike = () => {
        axios.put("http://localhost:3001/like-post", {
            postId
        }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        })
            .then((res) => {
                setLikes(res.data.post.likes.length)
                console.log("res.data>>>", res.data.post.likes.length)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <>
            <p>{likes}</p>
            <Button onClick={AddLike}>Like</Button>
        </>
    )
}