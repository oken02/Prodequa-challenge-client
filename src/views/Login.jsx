import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import MyTextInput from "../components/MyTextInput";
import { useDispatch } from "react-redux";
import { sendLogin } from "../store/user.reducer";

export default function Login({ onClose }) {
  const dispatch = useDispatch();
  return (
    <Flex
      // minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string().required("Enter your password"),
            })}
            onSubmit={(values, form) => {
              // { setSubmitting, setFieldError, setFieldValue }
              dispatch(sendLogin(values)).then((action) => {
                if (action.error) {
                  form.setSubmitting(false);
                  form.setFieldValue("password", "", false);
                  // setFieldError("password", "email o password incorrectos");
                } else {
                  onClose();
                }
              });
            }}
          >
            {(formik) => (
              <Form noValidate>
                <Stack spacing={4}>
                  <MyTextInput label="Email" name="email" type="text" />
                  <MyTextInput
                    label="Password"
                    name="password"
                    type="password"
                  />
                  <Stack spacing={10}>
                    {/* <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link color={"blue.400"}>Forgot password?</Link>
                    </Stack> */}
                    <Button
                      isLoading={formik.isSubmitting}
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign in
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
          {/* <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack> */}
        </Box>
      </Stack>
    </Flex>
  );
}
