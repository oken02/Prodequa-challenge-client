import React from "react";
import { Heading } from "@chakra-ui/react";
const MainHeading = ({ text }) => {
  return (
    <>
      <Heading textAlign="center" padding={["5", "10"]} as="h3" size="lg">
        {text}
      </Heading>
    </>
  );
};

export default MainHeading;
