import React, { useState } from "react";
import GenerateSound from "../utils/generateRandSound";
import { QUERY_SOUNDS } from "../utils/queries";
import { ADD_USER_SOUND } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import "./Explore.css"
import swal from 'sweetalert';

const Explore = () => {
  const history = useHistory();

  //Query to retrieve all sounds
  const { loading, data } = useQuery(QUERY_SOUNDS, {
    fetchPolicy: "no-cache",
  });
  const soundList = data?.sounds || [];

  // Add sounds by user
  const [addUserSound, { error }] = useMutation(ADD_USER_SOUND);

  const handleClick = async (id) => {
    try {
      console.log(id);
      const { data } = await addUserSound({
        variables: { soundData: id },
      });
      console.log(data);
      swal("Sound Added!", "Go to your favorites page!", "success");
      // history.push(`/favorites/${data.addUserSound._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="explore-container mt-5">
      <Col className="header">
        <h4>
          There's a world of sound out there just waiting to be discovered.
        </h4>
      </Col>
      <Row>
        <Col className="d-flex justify-content-center sounds-wrapper">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="square">
              {soundList.map((sound) => {
                return (
                  <figure key={sound._id} className="sound-tile">
                    <figcaption>{sound.name}:</figcaption>
                    <audio controls src={sound.link}>
                      Your browser does not support the
                      <code>audio</code> element.
                    </audio>
                    <Button onClick={() => handleClick(sound._id)} className="add-button">+</Button>
                  </figure>
                );
              })}
              {error && <div>Something went wrong...</div>}
            </div>
          )}
          ;
        </Col>
      </Row>
    </Container>
  );
};

export default Explore;
