import { auth } from "@/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./directory/Directory";
import RightContent from "./right-content/RightContent";
import SearchInput from "./SearchInput";

type Props = {};

const Navbar = (props: Props) => {
    const [user, loading, error] = useAuthState(auth);
    return (
        <Flex bg="white" height="50px" padding="6px 12px">
            <Flex align="center">
                <Image src="/images/redditFace.svg" height="30px" />
                <Image
                    src="/images/redditText.svg"
                    height="46px"
                    mb={0.5}
                    display={{ base: "none", md: "unset" }}
                />
            </Flex>
            {user && <Directory />}
            <SearchInput user={user} />
            <RightContent user={user} />
        </Flex>
    );
};

export default Navbar;
