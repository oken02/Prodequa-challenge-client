import logo from "./logo.svg";
import { useEffect, useState } from "react";

import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Form from "./views/Form";
import Forms from "./views/Forms";
import { Box, ChakraProvider, Container, useToast } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import FormInfo from "./views/FormInfo";
import { connect, socket } from "./socket";
import { sendValidation } from "./store/user.reducer";

function App() {
  const toast = useToast();
  const [forms, setForms] = useState([]);
  const dispatch = useDispatch();
  const { isAuthenticated, isValidated, ...user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    connect();
    socket.emit("get-forms");
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // validar que no se agreguen mas listeners
      socket.on("new-forms", (forms, first) => {
        setForms(forms);
        !first &&
          toast({
            title: "nuevo formulario registrado",
            status: "info",
            isClosable: true,
          });
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isValidated) dispatch(sendValidation());
  }, []);

  if (!isValidated) return <p>VALIDANDO</p>;

  return (
    <>
      <Router>
        <Box pt={["5", "10"]}>
          <Header />
        </Box>

        <Container maxW="container.lg" centerContent>
          <Routes>
            <Route index element={<Form />} />
            <Route path="/form" element={<Form toast={toast} />} />
            <Route path="/forms" element={<Forms forms={forms} />} />
            <Route path="/forms/:formId" element={<FormInfo />} />
          </Routes>
        </Container>
      </Router>
      <br />
      <br />
    </>
  );
}

export default App;

{
  /* <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div> */
}
