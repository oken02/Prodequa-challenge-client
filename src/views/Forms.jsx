import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainHeading from "../components/MainHeading";

const Forms = ({ forms }) => {
  const navigate = useNavigate();

  // const { isAuthenticated } = useSelector((state) => state.user);

  // const [forms, setForms] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const { data: forms } = await axios.get("/api/forms");
  //     setForms(forms);
  //   })();

  // }, []);

  return (
    <div>
      {/* <h2>Forms</h2> */}
      <MainHeading text="Formularios" />

      <Table colorScheme="teal" variant="striped">
        <Thead>
          <Tr>
            <Th>Nombre y Apellido</Th>
            <Th>Razon Social</Th>
            <Th>Necesidad</Th>
            <Th>...</Th>
          </Tr>
        </Thead>
        <Tbody>
          {forms.map((form) => (
            <Tr
              key={form._id}
              cursor="pointer"
              onClick={() => navigate(form._id)}
            >
              <Td>{form.fullName}</Td>
              <Td>{form.reason}</Td>
              <Td>{form.need}</Td>
              <Td>...</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Forms;
