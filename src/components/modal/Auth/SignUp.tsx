import { authModalState } from "@/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";

type Props = {};

const SignUp = (props: Props) => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [signupForm, setSignupForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    //Firebase Logic
    const [error, setError] = useState("");
    const [createUserWithEmailAndPassword, user, loading, userError] =
        useCreateUserWithEmailAndPassword(auth);

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (error) {
            setError("");
        }
        if (signupForm.password !== signupForm.confirmPassword) {
            setError("⚠️ Passwords do not match!");
            return;
        }
        createUserWithEmailAndPassword(signupForm.email, signupForm.password);
    };

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignupForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const switchToLogin = () => {
        setAuthModalState((prevState) => ({
            ...prevState,
            view: "login",
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
            <Input
                required
                name="confirmPassword"
                placeholder="confirm password"
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
                {error ||
                    FIREBASE_ERRORS[
                        userError?.message as keyof typeof FIREBASE_ERRORS
                    ]}
            </Text>

            <Button
                type="submit"
                width="100%"
                height="36px"
                mb={4}
                isLoading={loading}
            >
                Sign up
            </Button>

            <Flex justify="center" mb={4} fontSize="13px" columnGap={1}>
                <Text>Already a redditor?</Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={switchToLogin}
                >
                    Log in
                </Text>
            </Flex>
        </form>
    );
};

export default SignUp;
