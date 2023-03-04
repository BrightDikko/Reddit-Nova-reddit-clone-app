import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
// import { Box } from "framer-motion";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaRedditSquare } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md";
import { useSetRecoilState } from "recoil";

type UserMenuProps = {
    user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const loginHandler = () => {
        setAuthModalState({
            open: true,
            view: "login",
        });
    };

    const signOutHandler = () => {
        signOut(auth);
    };

    return (
        <Menu>
            <MenuButton
                cursor="pointer"
                padding="0px 6px"
                borderRadius="4px"
                _hover={{
                    outline: "1px solid",
                    outlineColor: "gray.200",
                }}
            >
                <Flex alignItems="center">
                    {user ? (
                        <Flex alignItems="center">
                            <>
                                <Icon
                                    fontSize={24}
                                    mr={1}
                                    color="gray.300"
                                    as={FaRedditSquare}
                                />
                                <Box
                                    display={{
                                        base: "none",
                                        lg: "flex",
                                    }}
                                    flexDirection="column"
                                    fontSize="8pt"
                                    alignItems="flex-start"
                                    mr={8}
                                >
                                    <Text fontWeight={700}>
                                        {user?.displayName ||
                                            user?.email?.split("@")[0]}
                                    </Text>
                                    <Flex alignItems="center">
                                        <Icon
                                            as={IoSparkles}
                                            color="brand.100"
                                            mr={1}
                                        />
                                        <Text color="gray.400">1 karma</Text>
                                    </Flex>
                                </Box>
                            </>
                        </Flex>
                    ) : (
                        <Flex align="center" mb={1}>
                            <Icon as={CgProfile} mt={1} fontSize={22} />
                        </Flex>
                    )}
                    <ChevronDownIcon color="gray.500" />
                </Flex>
            </MenuButton>
            <MenuList>
                {user ? (
                    <>
                        <MenuItem
                            fontSize="10pt"
                            fontWeight={700}
                            _hover={{ bg: "blue.500", color: "white" }}
                        >
                            <Flex alignItems="center">
                                <Icon fontSize={20} mr={2} as={CgProfile} />
                                Profile
                            </Flex>
                        </MenuItem>
                        <MenuDivider />

                        <MenuItem
                            fontSize="10pt"
                            fontWeight={700}
                            _hover={{ bg: "blue.500", color: "white" }}
                            onClick={signOutHandler}
                        >
                            <Flex alignItems="center">
                                <Icon
                                    fontSize={20}
                                    mr={2}
                                    as={MdOutlineLogin}
                                />
                                Log Out
                            </Flex>
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem
                        fontSize="10pt"
                        fontWeight={700}
                        _hover={{ bg: "blue.500", color: "white" }}
                        onClick={loginHandler}
                    >
                        <Flex alignItems="center">
                            <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                            Log In
                        </Flex>
                    </MenuItem>
                )}
            </MenuList>
        </Menu>
    );
};

export default UserMenu;