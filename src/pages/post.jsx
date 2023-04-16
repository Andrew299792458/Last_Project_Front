import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Flex, Box, Input, Button, Heading, useToast } from "@chakra-ui/react"
import FormData from "form-data"

export function CreatePost() {
    const toast = useToast()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const { register, handleSubmit, reset } = useForm();
    const file = useRef(null);
    const create = async (data) => {
        const formData = new FormData();

        formData.append('image', file.current);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('createAt', Date.now())
        formData.append('userEmail', user.email)

        console.log("userEmail>>>", user.email)



        await axios.post("http://localhost:3001/create-post", formData, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        })
            .then(function (res) {

                reset()
                return toast({
                    title: "Yes",
                    description: "Your post created",
                    status: "success",
                    duration: 8000,
                    isClosable: true,
                });
            })
            .catch(function (error) {
                console.log(error)
                return toast({
                    title: "Sorry",
                    description: "Your post not created",
                    status: "error",
                    duration: 8000,
                    isClosable: true,
                })
            })
    }

    const saveImage = (event) => {
        const image = event.target.files[0];
        file.current = image;
    }
    return (
        <>
            <Flex w="100%"
                h="100vh"
                alignItems="center"
                justifyContent="center"
            >
                <Box>
                    <form onSubmit={handleSubmit(create)}>
                        <Heading
                        >Create Post</Heading>
                        <Input placeholder="Title"
                            mt={6}
                            {...register("title")} />
                        <Input placeholder="Description"
                            mt={6}
                            {...register("description")}
                        />
                        <Input
                            type="file"
                            onChange={saveImage}
                            mt={6}
                        />
                        <Button type="submit"
                            mt={6}
                        >Create</Button>
                    </form>
                </Box>
            </Flex>
        </>
    )
}