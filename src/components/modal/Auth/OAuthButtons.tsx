import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

type Props = {};

const OAuthButtons = (props: Props) => {
    return (
        <Flex direction="column" width="100%" mb={4} rowGap={3}>
            <Button variant="oauth">
                <Image src="/images/googlelogo.png" height="18px" mr={2} />
                Continue with Google
            </Button>

            <Button variant="oauth">
                <Image
                    src="/images/applelogo.png"
                    height="28px"
                    ml={-3}
                    mr="4px"
                />
                Continue with Apple
            </Button>
        </Flex>
    );
};

export default OAuthButtons;
