import React from "react";
import { QUERY_SOUNDS } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Row, Col, Button } from "reactstrap";
import { ADD_USER_SOUND } from "../utils/mutations";
import MusicButton from "../components/Button";
import SoundWaves from "../assets/sound-waves.jpg";
import swal from 'sweetalert';


import "./Home.css";

function Home() {
  let randomName;
  let randomTags;
  let randomLink;
  let randomId; 

  const { loading, data } = useQuery(QUERY_SOUNDS, {
    fetchPolicy: "no-cache",
  });
  const soundList = data?.sounds || [];
  const randomSound = soundList[Math.floor(Math.random() * soundList.length)];

  if (typeof(randomSound) == 'object') {
    console.log(randomSound);
    randomName = randomSound.name;
    randomTags = randomSound.tags;
    randomLink = randomSound.link;
    randomId   = randomSound._id;
  }

  // Add sounds by user
  const [addUserSound, { error }] = useMutation(ADD_USER_SOUND);

  const handleClick = async (id) => {
    try {
      console.log(id);
      const { data } = await addUserSound({
        variables: { soundData: id },
      });
      swal("Sound Added!", "Go to your favorites page!", "success");
      console.log(data);
      // history.push(`/favorites/${data.addUserSound._id}`);
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <Container className="homepage-container">
      <Row>
        <Col lg="9" md="12" sm="12" className="main-section">
          <h4>Daily Sound:</h4>
          <Row>
            <Col>
              <div className="main-img-container">
                <img src={SoundWaves} alt="soundwaves" />
                <div className="audio-player">
                  <figure>
                    <figcaption>{randomName}</figcaption>
                    <audio
                      controls
                      src={randomLink}
                    >
                      Your browser does not support the
                      <code>audio</code> element.
                    </audio>
                  </figure>
                </div>
                <div className="tags">
                  <p className="tag">Tags: {randomTags}</p>
                </div>
                <div className="favorite-button">
                <Button onClick={() => handleClick(randomId)} className="add-button">+</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg="3" md="12" className="sidebar">
          <h4>Explore by Intention:</h4>
          <Row>
            <Col md="12">
              <Row className="music-button-row">
                <Col className="music-button-col">
                  <MusicButton color="primary" title="Calm" link="/calm" />
                </Col>
              </Row>
              <Row>
                <Col className="music-button-col">
                  <MusicButton color="secondary" title="Study" link="study" />
                </Col>
              </Row>
              <Row>
                <Col className="music-button-col">
                  <MusicButton
                    color="success"
                    title="Energize"
                    link="/energize"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
