import axios from "axios"
import { useState, useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react"
import Chat from "../components/Chat.jsx"
import { useAuth } from "../contexts/AuthContext"


export function AllUsers() {
    const [chat, setChat] = useState(false)
    const [users, setUsers] = useState([])
    const [to, setTo] = useState("")
    const { user } = useAuth()


    useEffect(() => {
        axios.get("http://localhost:3001/users", {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        }).then((res) => {
            setUsers(res.data.users.filter(use => use._id !== user._id))
        })
            .catch((err) => {
                console.log(err)
            });
    }, [])
    const Send = (id) => {
        setChat(true)
        setTo(id)
    }

    return (<>

        <Flex
            gap={10}>
            {users ? users.map((user) => {
                return <div key={user._id}>
                    <div>
                        {user.image && (
                            <img width="100" height="200"
                                src={`http://localhost:3001/${user.image}`}
                                alt='img'
                            />
                        )}
                    </div>
                    <h2>{user.firstName}</h2>
                    <p>{user.lastName}</p>
                    <p>{user.age}</p>
                    <Button onClick={() => Send(user._id)}>Write Message</Button>
                </div>
            }) : <div>no users</div>}

        </Flex>
        <Box>
            {chat ? <Chat to={to} /> : null}
        </Box>
    </>)

}

