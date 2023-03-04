import {
    Box,
    Button,
    Checkbox,
    Flex,
    Icon,
    Input,
    MenuDivider,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillEyeFill, BsPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type Props = {
    modalIsOpen: boolean;
    closeModal: () => void;
};

const CreateCommunityModal: React.FC<Props> = ({ modalIsOpen, closeModal }) => {
    const [selectedCommunityType, setSelectedCommunityType] = useState("");
    const [name, setName] = useState("");
    const [charsRemaining, setCharsRemaining] = useState(21);

    const communityTypeHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const {
            target: { name },
        } = event;
        if (name === selectedCommunityType) return;
        setSelectedCommunityType(name);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) return;
        setName(event.target.value);
        setCharsRemaining(21 - event.target.value.length);
    };

    const handleCreateCommunity = async () => {
        // Validate the community
        // Create the community document in firestore
    };

    return (
        <>
            <Modal isOpen={modalIsOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent overflow={"hidden"}>
                    <ModalHeader fontSize="12pt" fontWeight="medium">
                        Create a community
                    </ModalHeader>
                    <ModalCloseButton mt={1} />

                    <MenuDivider mt={-0.5} />

                    <ModalBody paddingX={4}>
                        <Box>
                            <Text mb={1} fontWeight="medium">
                                Name
                            </Text>
                            <Text fontSize="9pt" color="gray.500">
                                Community names including capitalization cannot
                                be changed.
                            </Text>
                        </Box>

                        <Box>
                            <Text
                                mb={1}
                                fontSize="18px"
                                color="gray.500"
                                position="relative"
                                top="36.5px"
                                pl={2}
                                width="22px"
                            >
                                r/
                            </Text>
                            <Input
                                position="relative"
                                pl="25px"
                                mb={2}
                                name="name"
                                value={name}
                                type={""}
                                onChange={handleChange}
                            />
                            <Text
                                mb={1}
                                fontSize="9pt"
                                color={
                                    charsRemaining === 0 ? "red" : "gray.500"
                                }
                                pt={2}
                            >
                                {charsRemaining} Characters remaining
                            </Text>
                        </Box>

                        <Box mt={6}>
                            <Stack spacing={1}>
                                <Text>Community Type</Text>

                                <Checkbox
                                    name="public"
                                    isChecked={
                                        selectedCommunityType === "public"
                                    }
                                    onChange={communityTypeHandler}
                                >
                                    <Flex align="center">
                                        <Flex align="center" columnGap={2}>
                                            <Icon
                                                as={BsPersonFill}
                                                color="gray.500"
                                            />
                                            <Text
                                                fontSize="14px"
                                                fontWeight="semibold"
                                                color="gray.600"
                                            >
                                                Public
                                            </Text>
                                        </Flex>
                                        <Text
                                            fontSize="8pt"
                                            ml={2}
                                            color="gray.500"
                                        >
                                            Anyone can view, post, and comment
                                            to this community
                                        </Text>
                                    </Flex>
                                </Checkbox>

                                <Checkbox
                                    name="restricted"
                                    isChecked={
                                        selectedCommunityType === "restricted"
                                    }
                                    onChange={communityTypeHandler}
                                >
                                    <Flex align="center">
                                        <Flex align="center" columnGap={2}>
                                            <Icon
                                                as={BsFillEyeFill}
                                                color="gray.500"
                                            />
                                            <Text
                                                fontSize="14px"
                                                fontWeight="semibold"
                                                color="gray.600"
                                            >
                                                Restricted
                                            </Text>
                                        </Flex>

                                        <Text
                                            fontSize="8pt"
                                            ml={2}
                                            color="gray.500"
                                        >
                                            Anyone can view, but only approved
                                            users can post
                                        </Text>
                                    </Flex>
                                </Checkbox>

                                <Checkbox
                                    name="private"
                                    isChecked={
                                        selectedCommunityType === "private"
                                    }
                                    onChange={communityTypeHandler}
                                >
                                    <Flex align="center">
                                        <Flex align="center" columnGap={2}>
                                            <Icon
                                                as={HiLockClosed}
                                                color="gray.500"
                                            />
                                            <Text
                                                fontSize="14px"
                                                fontWeight="semibold"
                                                color="gray.600"
                                            >
                                                Private
                                            </Text>
                                        </Flex>

                                        <Text
                                            fontSize="8pt"
                                            ml={2}
                                            mt={0.5}
                                            color="gray.500"
                                        >
                                            Only approved users can view and
                                            submit to this community
                                        </Text>
                                    </Flex>
                                </Checkbox>
                            </Stack>
                        </Box>
                    </ModalBody>

                    <ModalFooter bg="gray.100">
                        <Button
                            variant="communityOutline"
                            mr={3}
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button variant="communitySolid">
                            Create Community
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateCommunityModal;
