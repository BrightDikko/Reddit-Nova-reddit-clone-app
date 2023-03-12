import CreateCommunityModal from "@/components/modal/create-community/CreateCommunityModal";
import { Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";

type Props = {};

const Communities = (props: Props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModalHandler = () => {
        setModalIsOpen(true);
    };
    const closeModalHandler = () => {
        setModalIsOpen(false);
    };
    return (
        <>
            {modalIsOpen && (
                <CreateCommunityModal
                    modalIsOpen={modalIsOpen}
                    closeModal={closeModalHandler}
                />
            )}
            <MenuItem onClick={openModalHandler}>
                <Flex align="center" columnGap={2}>
                    <Icon as={GrAdd} />
                    <Text>Create Community</Text>
                </Flex>
            </MenuItem>
        </>
    );
};

export default Communities;
