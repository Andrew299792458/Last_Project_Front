
import {
    Button,
    useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"

export const DeletePostModal = ({ id, deletePost }) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const onDelete = () => deletePost(id, onClose)
    return (
        <>
            <Button onClick={onOpen}>Delete</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Button onClick={onDelete}>delete</Button>
                        <Button onClick={onClose} >Close</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
