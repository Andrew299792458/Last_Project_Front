import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Input, Button, Box, Flex } from "@chakra-ui/react"
import { useAuth } from "../contexts/AuthContext"
import ClearMsg from './Clean.jsx';
const socket = io("http://localhost:3001");

export default function Chat({ to, chat, setTo }) {
    const [message, setMessage] = useState("");
    const [me, setMe] = useState([])
    const [companion, setCompanion] = useState([])
    const { user, setNewMessage } = useAuth()

    useEffect(() => {
        axios.get("http://localhost:3001/get-messages", {
            headers: {
                to: to,
                "x-access-token": localStorage.getItem("userToken")
            }
        }).then((res) => {
            const me = res.data.messages.filter(msg => msg.from === user._id)
            setMe(me)
            const companion = res.data.messages.filter(msg => msg.from !== user._id)
            setCompanion(companion)
        })
            .catch((err) => {
                console.log(err)
            });
    }, [chat, user._id, to])

    useEffect(() => {
        function onConnect() {
            console.log("Connected");
        }
        socket.on('message', (message) => {
            console.log("msg>>>", message)
            if (message.from !== user._id) {
                setCompanion((prev) => [...prev, message]);
                setNewMessage(true)
                setTo(message.from)
            } else {
                setMe((prev) => [...prev, message]);
            }

        });
        return () => {
            socket.off('connect', onConnect);
        };
    }, []);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        socket.emit("message", {
            from: user._id,
            to: to,
            createAt: Date.now(),
            description: message
        });
        setMessage("");
    };

    return (
        <div>
            {chat ? <form onSubmit={handleFormSubmit}>
                <Box
                    bg="gray"
                    w="300px"
                    h="200px">
                    {companion && (
                        <Flex justifyContent={"space-between"}>
                            <Box>
                                {companion.map((message, index) => (
                                    <div key={index}>{message.description}</div>
                                ))}
                            </Box>
                            <Box>
                                {me.map((message, index) => (
                                    <div key={index}>{message.description}</div>
                                ))}
                            </Box>
                        </Flex>
                    )}
                    <Input
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        bg="white"
                    />
                    <Button type="submit">&#9658;</Button>
                </Box>
                <ClearMsg to={to} setMe={setMe} setCompanion={setCompanion} />
            </form> : null}
        </div>
    );
};
