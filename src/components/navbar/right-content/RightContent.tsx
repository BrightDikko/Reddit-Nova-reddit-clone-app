import { Flex, Button } from "@chakra-ui/react";
import React from "react";
import AuthModal from "@/components/modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";

type Props = {};

const RightContent: React.FC = (props: Props) => {
    return (
        <Flex justifyContent="center" align="center">
            <AuthModal />
            <AuthButtons />
        </Flex>
    );
};

export default RightContent;
