import { auth, firestore } from "@/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";

type Props = {};

const OAuthButtons = (props: Props) => {
    const [signInWithGoogle, userCred, loading, error] =
        useSignInWithGoogle(auth);
    const googleSigninHandler = () => {
        signInWithGoogle();
    };
    const appleSigninHandler = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const createUserDocument = async (user: User) => {
        const userDocRef = doc(firestore, "users", user.uid);
        await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    };

    useEffect(() => {
        if (userCred) {
            createUserDocument(userCred.user);
        }
    }, [userCred]);

    return (
        <Flex direction="column" width="100%" mb={4} rowGap={3}>
            <Button variant="oauth" onClick={googleSigninHandler}>
                <Image
                    src="/images/googlelogo.png"
                    alt="Google logo"
                    height="18px"
                    mr={2}
                />
                Continue with Google
            </Button>

            <Button variant="oauth" onClick={appleSigninHandler}>
                <Image
                    src="/images/applelogo.png"
                    height="28px"
                    ml={-3}
                    mr="4px"
                    alt="Apple logo"
                />
                Continue with Apple
            </Button>

            {error && (
                <Text fontSize="12px" textAlign="center" color="red" mb={4}>
                    {FIREBASE_ERRORS[
                        error.message as keyof typeof FIREBASE_ERRORS
                    ]
                        ? FIREBASE_ERRORS[
                              error.message as keyof typeof FIREBASE_ERRORS
                          ]
                        : error.message}
                </Text>
            )}
        </Flex>
    );
};

export default OAuthButtons;
