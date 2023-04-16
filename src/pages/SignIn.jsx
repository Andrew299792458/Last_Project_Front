import { useForm } from "react-hook-form";
import axios from "axios";
import { Flex, Box, Input, Button, Heading, Text, useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";


export function SignIn() {

    const navigate = useNavigate()

    const toast = useToast();

    const successToast = () => {
        return toast({
            title: "Success",
            status: "success",
            duration: 8000,
            isClosable: true,
        });
    };
    const errorToast = () => {
        return toast({
            title: "Sorry",
            description: "Email or password is incorrect",
            status: "error",
            duration: 8000,
            isClosable: true,
        });
    };
    const { register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();
    const signIn = async (data) => {
        await axios.post("http://localhost:3001/sign-in", data)
            .then(function (res) {
                successToast();
                navigate("/profile")
                const { user, token } = res.data
                console.log(user, token)
                localStorage.setItem("userToken", token)
                localStorage.setItem("user", JSON.stringify(user))
                reset();
            })
            .catch(function (error) {
                errorToast();
                console.log(error);
            });
    };
    return (
        <Flex w="100%"
            h="100vh"
            alignItems="center"
            justifyContent="center">
            <Box>
                <form onSubmit={handleSubmit(signIn)}>
                    <Heading
                    >Sign In</Heading>
                    <Input placeholder="Email Address"
                        mt={6}
                        {...register("email", {
                            required: "Email Address is Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            },
                        })} />
                    {errors?.email && (<Text
                        fontSize="xs"
                        color="red"
                    >{errors?.email?.message}</Text>)}
                    <Input placeholder="Password"
                        mt={6}
                        {...register("password", {
                            required: "Password is Required",
                            minLength: {
                                value: 3,
                                message: "Password must be at least 9 symbols"
                            }
                        })} />
                    {errors?.password && (<Text
                        fontSize="xs"
                        color="red"
                    >{errors?.password?.message}</Text>)}
                    <Button type="submit"
                        mt={6}
                    >Sign In</Button>
                </form>
            </Box>
        </Flex>
    );
}