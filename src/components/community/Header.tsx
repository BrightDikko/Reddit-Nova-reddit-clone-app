import { Community } from "@/atoms/communitiesAtom";
import { Flex, Box, Icon, Image, Text, Button } from "@chakra-ui/react";
import { on } from "events";
import React from "react";
import { FaReddit } from "react-icons/fa";
import useCommunityData from "../../hooks/useCommunityData";

type Props = {
    communityData: Community;
};

const Header: React.FC<Props> = ({ communityData }) => {
    const { communityStateValue, onJoinOrLeaveCommunity, loading } =
        useCommunityData();
    const isJoined = !!communityStateValue.mySnippets.find((community) => {
        return community.communityId === communityData.id;
    });

    return (
        <Flex direction="column" width="100%" height="146px">
            <Box height="50%" bg="blue.400" />
            <Flex justify="center" bg="white" flexGrow={1}>
                <Flex width={"95%"} maxWidth="850px">
                    {communityData.imageURL ? (
                        <Image
                            src={communityData.imageURL}
                            alt="Reddit community image"
                        />
                    ) : (
                        <Icon
                            as={FaReddit}
                            fontSize={64}
                            position="relative"
                            top={-3}
                            color="blue.500"
                            border="4px solid white"
                            borderRadius="50%"
                        />
                    )}

                    <Flex padding="10px 16px">
                        <Flex direction="column" mr={6}>
                            <Text fontWeight={800} fontSize="16pt">
                                {communityData.id}
                            </Text>
                            <Text
                                fontWeight={600}
                                fontSize="10pt"
                                color="gray.400"
                            >
                                r/{communityData.id}
                            </Text>
                        </Flex>
                        <Button
                            variant={isJoined ? "outline" : "solid"}
                            height="30px"
                            pr={6}
                            pl={6}
                            isLoading={loading}
                            onClick={() => {
                                onJoinOrLeaveCommunity(communityData, isJoined);
                            }}
                        >
                            {isJoined ? "joined" : "Join"}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Header;
