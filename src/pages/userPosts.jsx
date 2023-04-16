import axios from "axios"
import { useState, useEffect } from "react";
import { UpdatePostModal } from "../components/PostUpdate.jsx"
import { DeletePostModal } from "../components/DeletePostModal.jsx";
import { useToast } from "@chakra-ui/react"
import { User } from "./User"

export function UserPosts() {
    const toast = useToast()

    const successToast = () => {
        return toast({
            title: "Yes",
            description: "Your post updated",
            status: "success",
            duration: 8000,
            isClosable: true,
        });
    };
    const errorToast = () => {
        return toast({
            title: "Wrong changes",
            description: "Try again",
            status: "error",
            duration: 8000,
            isClosable: true,
        });
    };
    const [user, setUser] = useState([localStorage.getItem("user")])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/posts", {
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

    const onUpdatePost = (id, data, onClose) => {

        axios.put("http://localhost:3001/update-post", {
            ...data,
            id: id,
            updateAt: Date.now()
        }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        })
            .then((res) => {
                const notUpdatedPost = posts.filter((post) => post._id !== id);
                const updatedPost = posts.find((post) => post._id === id);
                setPosts([
                    {
                        ...updatedPost,
                        ...data
                    },
                    ...notUpdatedPost
                ])
                successToast()
                onClose()
            })
            .catch((error) => {
                console.error(error);
                errorToast()
            });
    }
    const deletePost = (id, onClose) => {

        axios.delete("http://localhost:3001/delete-post", {
            data: { id }
        }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        })
            .then(res => {
                const notDeletedPosts = posts.filter((post) => post._id !== id);
                setPosts([
                    ...notDeletedPosts
                ])

                onClose()
                return toast({
                    title: "Post",
                    description: "Deleted",
                    status: "success",
                    duration: 8000,
                    isClosable: true,
                });
            })
            .catch(err => {
                console.log("error>>>", err)
                return toast({
                    title: "Wrong changes",
                    description: "Try again",
                    status: "error",
                    duration: 8000,
                    isClosable: true,
                });
            })
    }
    console.log("user>>>", user)
    console.log("posts>>>", posts)
    return (<>

        <div>
            {posts ? posts.map((post) => {
                return <div key={post._id}>
                    <User />
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
                    <UpdatePostModal
                        title={post.title}
                        description={post.description}
                        id={post._id}
                        onUpdatePost={onUpdatePost}
                    />
                    <DeletePostModal
                        id={post._id}
                        deletePost={deletePost} />
                </div>
            }) : <div>no posts</div>}
        </div>
    </>)

}

