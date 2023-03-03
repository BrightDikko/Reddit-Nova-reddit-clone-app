import { authModalState } from "@/atoms/authModalAtom";
import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";

type Props = {};

const AuthModal: React.FC = (props: Props) => {
    const [modalState, setModalState] = useRecoilState(authModalState);

    const handleClose = () => {
        setModalState((prevState) => {
            return { ...prevState, open: false };
        });
    };

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent pb={2}>
                    <ModalHeader textAlign={"center"}>
                        {modalState.view === "login" && "Log in"}
                        {modalState.view === "signup" && "Sign up"}
                        {modalState.view === "resetPassword" &&
                            "Reset password"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            width="70%"
                        >
                            <OAuthButtons />
                            <Text
                                textAlign="center"
                                color="gray.500"
                                fontWeight="700"
                            >
                                OR
                            </Text>
                            <AuthInputs />
                            {/* <ResetPassword/> */}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AuthModal;
