import React from "react";
import { QUERY_SOUNDS } from "../utils/queries";
import { ADD_USER_SOUND } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Row, Col, Button } from "reactstrap";
import "./Study.css"
import swal from 'sweetalert';

const Study = () => {
  const { data } = useQuery(QUERY_SOUNDS, {
    fetchPolicy: "no-cache",
  });
  const soundList = data?.sounds || [];

  const [addUserSound] = useMutation(ADD_USER_SOUND);

  const handleClick = async (id) => {
    try {
      console.log(id);
      const { data } = await addUserSound({
        variables: { soundData: id },
      });
      swal("Sound Added!", "Go to your favorites page!", "success");
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
   

    <div>
    <h1 className="mt-5">Study</h1>
    <Container className="study-container">
      <Row>
        <Col className="d-flex justify-content-center sounds-wrapper">
        <div className="square">
          {soundList
            .filter((sound) => sound.tags.includes("calm"))
            .map((filteredSounds) => {
              console.log(filteredSounds);
              return (
                <figure key={filteredSounds._id} className="sound-tile">
                  <figcaption>{filteredSounds.name}:</figcaption>
                  <audio controls src={filteredSounds.link}>
                    Your browser does not support the
                    <code>audio</code> element.
                  </audio>
                  <Button
                    onClick={() => handleClick(filteredSounds._id)}
                    className="add-button"
                  >
                    +
                  </Button>
                </figure>
              );
            })}
            </div>
            
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Study;