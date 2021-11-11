import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Button,
  Box,
  Tag,
} from "@chakra-ui/react";

import { CheckCircleIcon } from "@chakra-ui/icons";
// import { MdSettings } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MainHeading from "../components/MainHeading";
import { getAuthHeader } from "../utils";

const FormInfo = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const { formId } = useParams();

  useEffect(() => {
    (async () => {
      const { data: form } = await axios.get(
        `/api/forms/${formId}`,
        getAuthHeader()
      );
      setForm(form);
    })();
  }, []);

  return (
    <>
      <MainHeading text="Info" />

      <List spacing={3}>
        {Object.keys(form).map((key) => (
          <ListItem key={key}>
            <Tag mr="4" variant="solid" colorScheme="teal">
              {key}
            </Tag>
            {form[key]}
          </ListItem>
        ))}
      </List>
      <br />

      <Box display="flex" width="100%" justifyContent="end">
        <Button
          onClick={() => navigate("/forms")}
          colorScheme="teal"
          variant="outline"
        >
          Volver
        </Button>
      </Box>
    </>
  );
};

export default FormInfo;

/*
<ListItem>
          <ListIcon as={MdCheckCircle} color="green.500" /> 
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </ListItem>
        <ListItem>
           <ListIcon as={MdCheckCircle} color="green.500" /> 
          Assumenda, quia temporibus eveniet a libero incidunt suscipit
        </ListItem>
        <ListItem>
           <ListIcon as={MdCheckCircle} color="green.500" /> 
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
         You can also use custom icons from react-icons 
         <ListItem>
          <ListIcon as={MdSettings} color="green.500" />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem> 

*/
