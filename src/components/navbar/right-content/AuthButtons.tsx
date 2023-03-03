import { authModalState } from "@/atoms/authModalAtom";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";

type Props = {};

const AuthButtons: React.FC = (props: Props) => {
    const setAuthModalState = useSetRecoilState(authModalState);

    const openLoginModalHandler = () => {
        setAuthModalState({ open: true, view: "login" });
    };
    const openSignupModalHandler = () => {
        setAuthModalState({ open: true, view: "signup" });
    };
    return (
        <>
            <Button
                variant={"outline"}
                height={"28px"}
                mr={2}
                display={{ base: "none", sm: "flex" }}
                width={{ base: "70px", md: "110px" }}
                onClick={openLoginModalHandler}
            >
                Log in
            </Button>
            <Button
                height={"28px"}
                mr={2}
                display={{ base: "none", sm: "flex" }}
                width={{ base: "70px", md: "110px" }}
                onClick={openSignupModalHandler}
            >
                Sign up
            </Button>
        </>
    );
};

export default AuthButtons;
