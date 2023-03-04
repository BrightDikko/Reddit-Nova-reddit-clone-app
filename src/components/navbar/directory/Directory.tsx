import CreateCommunity from "@/components/modal/create-community/CreateCommunityModal";
import { auth } from "@/firebase/clientApp";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";

const Directory = () => {
    const signOutHandler = () => {
        signOut(auth);
    };

    return (
        <Menu>
            <MenuButton
                cursor="pointer"
                padding={1}
                ml={2}
                borderRadius="4px"
                _hover={{
                    outline: "1px solid",
                    outlineColor: "gray.200",
                }}
            >
                <Flex
                    alignItems="center"
                    justify="space-between"
                    width={{ base: "auto", lg: "200px" }}
                    mr={{ base: 0, md: 2 }}
                >
                    <Flex align="center" mb={1}>
                        <Icon as={TiHome} fontSize={24} mt={1} />
                        <Flex display={{ base: "none", lg: "flex" }}>
                            <Text
                                fontSize="10pt"
                                fontWeight={600}
                                padding={2}
                                mt={2}
                            >
                                Home
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex mr={-1}>
                        <ChevronDownIcon color="gray.500" />
                    </Flex>
                </Flex>
            </MenuButton>
            <MenuList>
                <Communities />
            </MenuList>
        </Menu>
    );
};

export default Directory;
