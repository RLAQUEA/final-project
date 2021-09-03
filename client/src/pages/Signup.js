import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import "./Signup.css"

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log("User from server");
      console.info(data)
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
    <Row>
      <Col md={{ size: 6, offset: 3 }} className="mt-5 mb-5">
        <h4 className="p-2">Sign Up</h4>
        {data ? (
          <p>
            Success! You may will now be redirect to the home page
          </p>
        ) : (
          <Form onSubmit={handleFormSubmit}>
            <FormGroup className="mt-2">
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={formState.email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup className="mt-2">
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
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
              Sign Up
            </Button>
            <div className="mt-1">
            <a href="/login">Login</a>
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

export default Signup;