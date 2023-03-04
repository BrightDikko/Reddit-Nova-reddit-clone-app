import { authModalState } from "@/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";

type Props = {};

const LogIn = (props: Props) => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    //Firebase Logic
    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
    };

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const switchToSignup = () => {
        setAuthModalState((prevState) => ({
            ...prevState,
            view: "signup",
        }));
    };

    const switchToResetPassword = () => {
        setAuthModalState((prev) => ({
            ...prev,
            view: "resetPassword",
        }));
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <Input
                required
                name="email"
                placeholder="email"
                type="email"
                mb={4}
                onChange={onChangeHandler}
                fontSize="12px"
                bgColor="gray.50"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
            />
            <Input
                required
                name="password"
                placeholder="password"
                type="password"
                mb={4}
                onChange={onChangeHandler}
                fontSize="12px"
                bgColor="gray.50"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
            />

            <Text fontSize="12px" textAlign="center" color="red" mb={4}>
                {
                    FIREBASE_ERRORS[
                        error?.message as keyof typeof FIREBASE_ERRORS
                    ]
                }
            </Text>

            <Button type="submit" width="100%" height="36px" mb={4}>
                Log in
            </Button>

            <Flex justify="center" mb={2} fontSize="13px" columnGap={1}>
                <Text>Forgot your password?</Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={switchToResetPassword}
                >
                    Reset Password
                </Text>
            </Flex>

            <Flex justify="center" mb={4} fontSize="13px" columnGap={1}>
                <Text>New to reddit?</Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={switchToSignup}
                >
                    Sign up
                </Text>
            </Flex>
        </form>
    );
};

export default LogIn;
