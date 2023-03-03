import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

type Props = {};

const SearchInput = (props: Props) => {
    return (
        <Flex flexGrow={1} mx={2} align="center">
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" mb={1} />}
                />
                <Input
                    placeholder="Search Reddit"
                    _placeholder={{ color: "gray.500" }}
                    fontSize="10pt"
                    _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                    }}
                    _focus={{
                        outline: "none",
                        border: "1px solid",
                        borderColor: "blue.500",
                    }}
                    height="34px"
                    bg="gray.50"
                />
            </InputGroup>
        </Flex>
    );
};

export default SearchInput;
