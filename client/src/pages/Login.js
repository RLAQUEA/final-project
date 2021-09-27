import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import "./Login.css"

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 6 , offset: 3 }} className="mt-5 mb-5">
          <h4 className="p-2 login">Login</h4>
          {data ? (
            <p>
              Success! You may will now be redirect to the home page
            </p>
          ) : (
            <Form className="email" onSubmit={handleFormSubmit}>
              <FormGroup className="mt-2">
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                
              </FormGroup>
              <FormGroup className="mt-2">
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </FormGroup>
              <Button
                className="mt-3"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Login
              </Button>
              <div className="mt-1">
          <Button
              className="mt-3"
                style={{ cursor: "pointer" }}
                type="submit"
                >
                Signup
                </Button>
                
              </div>
            </Form>
          )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
