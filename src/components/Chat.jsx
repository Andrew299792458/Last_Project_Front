import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Input, Button, Box } from "@chakra-ui/react"
import { useAuth } from "../contexts/AuthContext"
const socket = io("http://localhost:3001");

export default function Chat({ to }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const { user } = useAuth()

    useEffect(() => {
        axios.get("http://localhost:3001/get-messages",  {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        }).then((res) => {
            setMessages(res.data.messages)
        })
            .catch((err) => {
                console.log(err)
            });
    }, [])

    useEffect(() => {
        function onConnect() {
            console.log("Connected");
        }
        socket.on("message", (message) => {
            setMessages((prev) => [...prev, message]);
        });
        return () => {
            socket.off('connect', onConnect);
        };
    }, []);

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        socket.emit("message", {
            from: user._id,
            to: to,
            createAt: Date.now(),
            description: message
        })
        setMessage("");
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <Box
                    bg="gray"
                    w="300px"
                    h="200px">
                    {Array.isArray(messages) && messages.map((message, index) => (
                        <div key={index}>{message.description}</div>
                    ))}
                    <Input
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        bg="white"
                    />
                    <Button type="submit">&#9658;</Button>
                </Box>
            </form>
        </div>
    );
};
