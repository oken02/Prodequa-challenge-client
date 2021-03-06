import React from "react";

import { Grid, GridItem, Button, Box } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, CheckIcon } from "@chakra-ui/icons";
import { Formik, Form as FormikForm, useField } from "formik";
import * as Yup from "yup";

import axios from "axios";
import MyTextInput from "../components/MyTextInput";
import { useNavigate } from "react-router";
import MainHeading from "../components/MainHeading";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import Map from "../components/Map";

const Form = ({ toast }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <>
      <MainHeading text="Formulario" />

      <Box border="3px solid gray" borderColor="teal" borderTop="none" p="7">
        <Formik
          initialValues={{
            fullName: "",
            reason: "",
            position: "",
            need: "",
            phone: "",
            message: "",
            email: "",
          }}
          validationSchema={Yup.object({
            fullName: Yup.string().required("Requerido"),
            reason: Yup.string().required("Requerido"),
            position: Yup.string().required("Requerido"),
            need: Yup.string().required("Requerido"),
            phone: Yup.number().required("Requerido"),
            message: Yup.string().required("Requerido"),
            email: Yup.string().email("correo no valido").required("Requerido"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const { data: formCreated } = await axios.post(
              "/api/forms",
              values
            );

            setSubmitting(false);
            socket.emit("new-form", formCreated);
            toast({
              title: "Formulario enviado",
              status: "success",
              isClosable: true,
            });

            isAuthenticated ? navigate("/forms") : resetForm();
          }}
        >
          {(formik) => (
            <FormikForm noValidate>
              <Grid
                templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                gap={4}
                width="100%"
              >
                <GridItem colSpan={1}>
                  <MyTextInput
                    label="Nombre y Apellido"
                    name="fullName"
                    type="text"
                    placeholder="Nombre y Apellido"
                    controlProps={{ isRequired: true }}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <MyTextInput
                    label="Raz??n Social"
                    name="reason"
                    type="text"
                    placeholder="Raz??n Social"
                    controlProps={{ isRequired: true }}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <MyTextInput
                    label="Cargo"
                    name="position"
                    type="text"
                    placeholder="Cargo"
                    controlProps={{ isRequired: true }}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <MyTextInput
                    select
                    label="Necesidad"
                    name="need"
                    placeholder="Necesidad"
                    controlProps={{ isRequired: true }}
                  >
                    <option>Atracci??n y Selecci??n</option>
                    <option>Evaluaci??n Psicolaboral</option>
                    <option>Capacitaci??n & E-Learning</option>
                    <option>Consultor??a & Desarrollo</option>
                    <option>Outplacement</option>
                  </MyTextInput>
                </GridItem>
                <GridItem colSpan={1}>
                  <MyTextInput
                    label="Celular"
                    name="phone"
                    type="text"
                    placeholder="Celular"
                    controlProps={{ isRequired: true }}
                  />
                </GridItem>
                <GridItem rowSpan={2} colSpan={1}>
                  <MyTextInput
                    textarea
                    label="Mensaje"
                    name="message"
                    type="text"
                    placeholder="Mensaje"
                    flex="1"
                    controlProps={{
                      isRequired: true,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <MyTextInput
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="Email"
                    controlProps={{ isRequired: true }}
                  />
                </GridItem>
              </Grid>
              <br />

              <Button
                type="submit"
                isFullWidth
                isLoading={formik.isSubmitting}
                loadingText="Submitting"
                colorScheme="teal"
                variant="outline"
              >
                Submit
              </Button>
            </FormikForm>
          )}
        </Formik>
      </Box>

      <div style={{ width: "100%" }}>
        <Map />
      </div>
    </>
  );
};

export default Form;
