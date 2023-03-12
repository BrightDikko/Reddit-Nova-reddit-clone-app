import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
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
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

type Props = {};

const AuthModal: React.FC = (props: Props) => {
    const [modalState, setModalState] = useRecoilState(authModalState);

    const [user, loading, error] = useAuthState(auth);

    const handleClose = () => {
        setModalState((prevState) => {
            return { ...prevState, open: false };
        });
    };

    useEffect(() => {
        if (user) {
            handleClose();
        }
    }, [user]);

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
                            {modalState.view === "login" ||
                            modalState.view === "signup" ? (
                                <>
                                    <OAuthButtons />
                                    <Text
                                        textAlign="center"
                                        color="gray.500"
                                        fontWeight="700"
                                    >
                                        OR
                                    </Text>
                                    <AuthInputs />
                                </>
                            ) : (
                                <ResetPassword />
                            )}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AuthModal;
