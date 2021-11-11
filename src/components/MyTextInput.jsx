import React from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { Formik, Form as FormikForm, useField } from "formik";

const MyTextInput = ({
  label,
  textarea,
  select,
  controlProps = {},
  ...props
}) => {
  const [field, meta] = useField(props);
  const InputEl = textarea ? Textarea : select ? Select : Input;
  return (
    <>
      <FormControl
        // display="flex"
        // flexDirection="column"
        isInvalid={meta.error && meta.touched}
        {...controlProps}
      >
        <FormLabel>{label}</FormLabel>
        <InputEl {...field} {...props} />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default MyTextInput;
