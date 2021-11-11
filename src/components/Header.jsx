import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Tabs, TabList, Tab, Button, Heading } from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/hooks";
import { useSelector, useDispatch } from "react-redux";

import MyModal from "./MyModal";
import Login from "../views/Login";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, ...user } = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MyModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <Login onClose={onClose} />
      </MyModal>

      <Box width={["sm", "xl"]} margin="0 auto">
        <Box pb="5" textAlign="end">
          {isAuthenticated ? (
            <Heading as="h4" size="md">
              {user.username}
            </Heading>
          ) : (
            <Button colorScheme="teal" onClick={onOpen}>
              Login
            </Button>
          )}
        </Box>

        <Tabs colorScheme="teal" isFitted>
          {/* variant="enclosed" */}
          <TabList>
            <Tab onClick={() => navigate("/form")}>Formulario</Tab>
            <Tab
              isDisabled={!isAuthenticated}
              onClick={() => navigate("/forms")}
            >
              Formularios
            </Tab>
          </TabList>
          {/* <TabPanels></TabPanels> */}
        </Tabs>
      </Box>
    </>
  );
};

export default Header;
