import {
    Input, Button, Text, FormControl,
    FormLabel, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

export const UpdatePostModal = ({ title, description, onUpdatePost, id }) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: title,
            description: description,
        }
    });
    const onUpdate = (data) => onUpdatePost(id, data, onClose)
    return (
        <>
            <Button onClick={onOpen}>Update Post</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onUpdate)}>
                            <FormControl>
                                <FormLabel >Title</FormLabel>
                                <Input
                                    type="text"
                                    w="100%"
                                    p={9}
                                    {...register("title",
                                        {
                                            required: "title is required",
                                        })} /><br></br>
                                <Text color="red">{errors?.title && errors?.title?.message}</Text><br></br>

                                <FormLabel >Description</FormLabel>
                                <Input
                                    type="text"
                                    w="100%"
                                    p={9}
                                    {...register("description",
                                        {
                                            required: "description is required",

                                        })} /><br></br>
                                <Text color="red">{errors?.description && errors?.description?.message}</Text><br></br>

                                <ModalFooter>
                                    <Button colorScheme="red" mr={5} onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button type="submit">Update</Button>
                                </ModalFooter>
                            </FormControl>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}