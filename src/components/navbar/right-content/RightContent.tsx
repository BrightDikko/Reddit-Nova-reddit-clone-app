import { authModalState } from "@/atoms/authModalAtom";
import AuthModal from "@/components/modal/Auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import { useSetRecoilState } from "recoil";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {
    user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
    return (
        <Flex justifyContent="center" align="center">
            <AuthModal />
            {user ? <Icons /> : <AuthButtons />}
            <UserMenu user={user} />
        </Flex>
    );
};

export default RightContent;
