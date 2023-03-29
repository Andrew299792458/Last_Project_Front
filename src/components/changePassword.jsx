import {
    Input, Button, Text, FormControl,
    FormLabel, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"



export const PasswordChangeModal = () => {
    const toast = useToast()
    const { user, updateUser } = useAuth()
    const successToast = () => {
        return toast({
            title: "Yes",
            description: "Your password changed",
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

    const { onOpen, onClose, isOpen } = useDisclosure();
    const { register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const changePassword = (data) => {
        console.log(user)
        axios.put("http://localhost:3001/change-password", {

            lastPassword: data.lastPassword,
            password: data.password
        }, {
            headers: {
                "x-access-token": localStorage.getItem("userToken")
            }
        })
            .then((res) => {
                updateUser(res.data.user)
                successToast()
                reset()
                onClose()
            })
            .catch((error) => {
                console.error(error);
                errorToast()
                reset()
            });
    }

    return (
        <>
            <Button onClick={onOpen}>Change Password</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change your password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(changePassword)}>
                            <FormControl>
                                <FormLabel >Last password</FormLabel>
                                <Input placeholder="Last Password"
                                    type="text"
                                    w="100%"
                                    p={9}
                                    {...register("lastPassword",
                                        {
                                            required: "Last Password is required",
                                        })} /><br></br>
                                <Text color="red">{errors?.lastPassword && errors?.lastPassword?.message}</Text><br></br>

                                <FormLabel >Password</FormLabel>
                                <Input placeholder="Password"
                                    type="text"
                                    w="100%"
                                    p={9}
                                    {...register("password",
                                        {
                                            required: "Password is required",
                                            minLength: {
                                                value: 3,
                                                message: "Password must be at least 9 symbols"
                                            }
                                        })} /><br></br>
                                <Text color="red">{errors?.password && errors?.password?.message}</Text><br></br>

                                <FormLabel >Confirm Password</FormLabel>
                                <Input placeholder="Confirm Password"
                                    w="100%"
                                    p={9}
                                    {...register("confirmPassword",
                                        {
                                            required: "password is required",
                                            validate: (value) => value === watch("password")
                                        })}
                                /><br></br>
                                <Text color="red">{errors?.confirmPassword && "Passwords not the same"}</Text><br></br>
                                <ModalFooter>
                                    <Button colorScheme="red" mr={5} onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button type="submit">Save changes</Button>
                                </ModalFooter>
                            </FormControl>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}