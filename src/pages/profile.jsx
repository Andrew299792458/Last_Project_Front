
import { useForm } from "react-hook-form";
import {
    Flex, Box, Input, Button, Heading, Text, useToast
} from "@chakra-ui/react"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"
import { PasswordChangeModal } from "../components/changePassword"

export default function Profile() {

    const toast = useToast();
    const successToast = () => {
        return toast({
            title: "Updated",
            description: "Your account updated",
            status: "success",
            duration: 8000,
            isClosable: true,
        });
    };
    const errorToast = () => {
        return toast({
            title: "Sorry.",
            description: "Wrong changes",
            status: "error",
            duration: 8000,
            isClosable: true,
        });
    };
    const { user, updateUser } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age
            }
        }
    );
    const userUpdate = (data) => {
        axios.put("http://localhost:3001/user-update", {
            id: user._id,
            ...data
        }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        })
            .then((res) => {
                updateUser(res.data.user)
                successToast()
            })
            .catch((error) => {
                console.error(error);
                errorToast()
            });
    };
    return (
        <>
            <Flex w="100%"
                h="100vh"
                alignItems="center"
                justifyContent="center"
            >
                <Box>
                    <form onSubmit={handleSubmit(userUpdate)}>
                        <Heading
                        >Update</Heading>
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

                        <Input placeholder="Age"
                            mt={6}
                            {...register("age", { required: "Age is Required" })}
                        />
                        {errors?.age && (<Text
                            fontSize="xs"
                            color="red"
                        >{errors?.age?.message}</Text>)}
                        <Button type="submit"
                            mt={6}
                        >Update</Button>

                    </form>

                    <PasswordChangeModal />

                </Box>
            </Flex>

        </>
    )
}