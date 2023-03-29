import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Flex, Box, Input, Button, Heading, Text, useToast } from "@chakra-ui/react"
import axios from "axios";
export function SignUp() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate()
    const toast = useToast();
    const successToast = () => {
        return toast({
            title: 'Account created.',
            description: "Created new account!",
            status: 'success',
            duration: 8000,
            isClosable: true,
        });
    };
    const errorToast = () => {
        return toast({
            title: 'Sorry.',
            description: "This email already exists",
            status: 'error',
            duration: 8000,
            isClosable: true,
        });
    };
    const signUp = async (data) => {
        await axios.post("http://localhost:3001/sign-up", data)
            .then(function (res) {
                console.log(res);
                navigate("/sign-in")
                successToast()
                reset()
            })
            .catch(function (error) {
                console.log(error);
                errorToast()
            });
    };
    return (
        <Flex w="100%"
            h="100vh"
            alignItems="center"
            justifyContent="center"
        >
            <Box>
                <form onSubmit={handleSubmit(signUp)}>
                    <Heading
                    >Sign Up</Heading>
                    <Input placeholder="First Name"
                        mt={6}
                        {...register("firstName", {
                            required: "First Name is Required",
                            minLength: {
                                value: 2,
                                message: "Invalid First Name"
                            }
                        })} />
                    {errors?.firstName && (
                        <Text
                            fontSize="xs"
                            color="red"
                        >{errors?.firstName?.message}</Text>
                    )}
                    <Input placeholder="Last Name"
                        mt={6}
                        {...register("lastName", {
                            required: "Last Name is Required",
                            minLength: {
                                value: 3,
                                message: "Invalid Last Name"
                            }
                        })}
                    />
                    {errors?.lastName && (<Text
                        fontSize="xs"
                        color="red"
                    >{errors?.lastName?.message}</Text>)}
                    <Input placeholder="Email Address"
                        mt={6}
                        {...register("email", {
                            required: "Email Address is Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid Email Address",
                            }
                        })}
                    />
                    {errors?.email && (<Text
                        fontSize="xs"
                        color="red"
                    >{errors?.email?.message}</Text>)}
                    <Input placeholder="Age"
                        mt={6}
                        {...register("age", { required: "Age is Required" })}
                    />
                    {errors?.age && (<Text
                        fontSize="xs"
                        color="red"
                    >{errors?.age?.message}</Text>)}
                    <Input placeholder="Password"
                        mt={6}
                        {...register("password", {
                            required: "Password is Required",
                            minLength: {
                                value: 3,
                                message: "Password must be at least 9 symbols"
                            }
                        })}
                    />
                    {errors?.password && (<Text
                        fontSize="xs"
                        color="red"
                    >{errors?.password?.message}</Text>)}
                    <Button type="submit"
                        mt={6}
                    >Sign Up</Button>
                </form>
            </Box>
        </Flex>

    );
}