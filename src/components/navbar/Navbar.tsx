import { Flex, Image } from "@chakra-ui/react";
import RightContent from "./right-content/RightContent";
import SearchInput from "./SearchInput";
// import RedditFace from "@/assets/reddit-face.svg";

type Props = {};

const Navbar = (props: Props) => {
    return (
        <Flex bg="white" height="50px" padding="6px 12px">
            <Flex alignItems="center">
                <Image src="/images/redditFace.svg" height="30px" />
                <Image
                    src="/images/redditText.svg"
                    height="46px"
                    display={{ base: "none", md: "unset" }}
                />
            </Flex>

            <SearchInput />
            {/* <Directory/> */}
            <RightContent />
        </Flex>
    );
};

export default Navbar;
