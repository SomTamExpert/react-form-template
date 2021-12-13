import {
  Alert,
  Button,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
  ProgressBar,
  Badge,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import React, { useState, useRef } from "react";
import "./style.css";

const BodyMassIndexWithForms = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [gender, setGender] = useState("");
  const [BMIcolor, setBMIcolor] = useState("");
  const [bmiText, setBmiText] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [canton, setCanton] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [validated, setValidated] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const calculeteButtonOverlay = (props) => (
    <Tooltip {...props}>berechnet Ihren BMI</Tooltip>
  );

  const deleteButtonOverlay = (props) => (
    <Tooltip {...props}>löscht Ihre Angaben</Tooltip>
  );

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleCanton = (event) => {
    setCanton(event.target.value);
  };
  const handleZipCode = (event) => {
    setZipCode(event.target.value);
  };

  const handleWeight = (event) => {
    setWeight(event.target.value);
  };

  const handleHeight = (event) => {
    setHeight(event.target.value);
  };

  const handleRound = () => {
    setIsChecked(!isChecked);
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  const handleDelte = () => {
    setBmi("");
    setWeight("");
    setHeight("");
    setBMIcolor("");
    setIsChecked(false);
    setBmiText("");
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    handleShowAlert();
    const value = weight / (height * height);
    if (isChecked) {
      setBmi(Math.round(value));
    } else if (!isChecked) {
      setBmi(value);
    }
    if (value < 19) {
      setBMIcolor("cyan");
      setBmiText(
        "Die Berechnung Ihres BMIs hat ergeben, dass Ihr Gewicht auf Untergewicht hindeutet. Wir empfehlen Ihnen, einen Ernährungsberater oder Arzt aufzusuchen."
      );
    } else if (value > 19 && value < 24) {
      setBMIcolor("green");
      setBmiText(
        "Super, das Ergebnis der BMI-Berechnung deutet auf ein normales Gewicht hin. Bleiben Sie also so wie Sie sind. Mit einer ausgewogenen, bedarfsdeckenden Ernährung und ein bisschen Bewegung klappt das sicher. Auch Stress lässt sich mit körperlicher Aktivität super ausgleichen."
      );
    } else if (value > 14 && value < 31) {
      setBMIcolor("yellow");
      setBmiText(
        "Die Berechnung Ihres BMIs hat ergeben, dass Ihr Gewicht auf leichtes bis mittleres Übergewicht (sogenannte Präadipositas) hindeutet. Das ist kein Grund zur Panik, jedoch sollten Sie nicht weiter zunehmen und Ihre Bewegungs- und Ernährungsgewohnheiten beobachten und gegebenenfalls anpassen. Versuchen Sie, nicht zuzunehmen. Wir empfehlen Ihnen, einen Ernährungsberater oder Arzt aufzusuchen."
      );
    } else if (value > 30 && value < 35) {
      setBMIcolor("red");
      setBmiText(
        "Die Berechnung Ihres BMIs hat ergeben, dass Ihr Gewicht auf schweres Übergewicht (Adipositas Grad 1) hindeutet. Wir empfehlen Ihnen, Ihre Ernährungs- und Bewegungsgewohnheiten zu ändern. So können Sie langsam Ihr Gewicht reduzieren und mobiler werden. Besprechen Sie das am besten mit Ihrem Arzt und einem Ernährungsberater."
      );
    } else if (value > 35) {
      setBMIcolor("red");
      setBmiText(
        "Die Berechnung Ihres BMIs hat ergeben, dass Ihr Gewicht auf extremes Übergewicht (Adipositas Grad 3) hindeutet. Wir empfehlen Ihnen, an Gewicht abzunehmen. Besprechen Sie das am besten mit Ihrem Arzt und einem Ernährungsberater. Diese können Ihnen ganz gezielt weiterhelfen."
      );
    }
    event.preventDefault();
    executeScroll();
  };

  return (
    <>
      <Alert variant="success" show={showAlert}>
        <Alert.Heading className="mt-0">
          Herzlichen Dank für Ihre Teilnahme
        </Alert.Heading>
        <p>Auf
          <Alert.Link href="https://de.wikipedia.org/wiki/Body-Mass-Index">
            {" "}
            Wikipedia - Body-Mass-Index
          </Alert.Link>{" "}
          finden Sie weiterführende Informationen
        </p>
        <hr />
        <p className="mb-0">
          Bemerkung: Der Rechner benutzt JavaScript. Wenn Sie JavaScript
          abgeschaltet haben könnte es zu Problemen mit dem Formular kommen.
        </p>
        <div className="d-flex justify-content-end">
          <Button className="SubmitButton" onClick={() => setShowAlert(false)}>
            Schliessen
          </Button>
        </div>
      </Alert>
      <div className="Wrapper">
        <div>
          <h1 id="title">
            Body Mass Index Calculator <Badge variant="secondary">v.2.0</Badge>
          </h1>
        </div>

        <Form
          className="BmiForm"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <div className="Inputwrapper">
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Ihr Vorname:*
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  type="text"
                  value={firstName}
                  placeholder="Hans"
                  onChange={(event) => handleFirstName(event)}
                ></Form.Control>
                <Form.Control.Feedback>sieht gut aus!</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Ihr Nachname:*
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  type="text"
                  value={lastName}
                  placeholder="Muster"
                  onChange={(event) => handleLastName(event)}
                ></Form.Control>
                <Form.Control.Feedback>sieht gut aus!</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Ihre E-Mail:*
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  type="text"
                  value={email}
                  placeholder="hans.muster@muster.com"
                  onChange={(event) => handleEmail(event)}
                ></Form.Control>
                <Form.Control.Feedback>sieht gut aus!</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Ihr Wohnort:*
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  type="text"
                  value={location}
                  placeholder="Zürich"
                  onChange={(event) => handleLocation(event)}
                ></Form.Control>
                <Form.Control.Feedback>sieht gut aus!</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Ihre Postleitzahl:*
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  type="number"
                  value={zipCode}
                  placeholder="8001"
                  onChange={(event) => handleZipCode(event)}
                ></Form.Control>
                <Form.Control.Feedback>sieht gut aus!</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Ihr Kanton:*
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  required
                  value={canton}
                  onChange={(event) => handleCanton(event)}
                >
                  <option></option>
                  <option value="Aargau">Aargau</option>
                  <option value="Appenzell Ausserrhoden">
                    Appenzell Ausserrhoden
                  </option>
                  <option value="Appenzell Innerrhoden">
                    Appenzell Innerrhoden
                  </option>
                  <option value="Basel-Landschaft">Basel-Landschaft</option>
                  <option value="Basel-Stadt">Basel-Stadt</option>
                  <option value="Bern">Bern</option>
                  <option value="Freiburg">Freiburg</option>
                  <option value="Genf">Genf</option>
                  <option value="Glarus">Glarus</option>
                  <option value="Graubünden">Graubünden</option>
                  <option value="Jura">Jura</option>
                  <option value="Luzern">Luzern</option>
                  <option value="Neuenburg">Neuenburg</option>
                  <option value="Nidwalden">Nidwalden</option>
                  <option value="Obwalden">Obwalden</option>
                  <option value="Schaffhausen">Schaffhausen</option>
                  <option value="Schwyz">Schwyz</option>
                  <option value="Solothurn">Solothurn</option>
                  <option value="St. Gallen">St. Gallen</option>
                  <option value="Tessin">Tessin</option>
                  <option value="Thurgau">Thurgau</option>
                  <option value="Uri">Uri</option>
                  <option value="Waadt">Waadt</option>
                  <option value="Wallis">Wallis</option>
                  <option value="Zug">Zug</option>
                  <option value="Zürich">Zürich</option>
                </Form.Select>
                <Form.Control.Feedback>sieht gut aus!</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Ihr Gewicht:* (kg)
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  type="number"
                  value={weight}
                  step={0.5}
                  precision={2}
                  placeholder="80"
                  onChange={(event) => handleWeight(event)}
                ></Form.Control>
                <Form.Control.Feedback>sieht gut aus!</Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Ihre Grösse:* (m)
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  required
                  type="number"
                  value={height}
                  step={0.01}
                  precision={2}
                  placeholder="1.75"
                  onChange={(event) => handleHeight(event)}
                ></Form.Control>
                <Form.Control.Feedback>sieht gut aus!</Form.Control.Feedback>
              </Col>
            </Form.Group>

            {["radio"].map((type) => (
              <Form.Group as={Row} key={`inline-${type}`} className="mb-3">
                <Form.Label column sm="2">
                  Ihr Geschlecht:
                </Form.Label>
                <Col sm="10">
                  <Form.Check
                    inline
                    label="männlich"
                    value="männlich"
                    name="gender"
                    checked={gender === "männlich"}
                    onChange={(event) => handleGender(event)}
                    type={type}
                    id={`inline-${type}-1`}
                  />

                  <Form.Check
                    inline
                    label="weiblich"
                    value="weiblich"
                    name="gender"
                    checked={gender === "weiblich"}
                    onChange={(event) => handleGender(event)}
                    type={type}
                    id={`inline-${type}-2`}
                  />
                </Col>
              </Form.Group>
            ))}

            {["checkbox"].map((type) => (
              <Form.Group as={Row} key={`inline-${type}`} className="mb-3">
                <Form.Label column sm="2">
                  BMI gerundet anzeigen:
                </Form.Label>
                <Col md="6">
                  <Form.Check
                    inline
                    name="round"
                    checked={isChecked}
                    onChange={(event) => handleRound(event)}
                    type={type}
                    id={`inline-${type}-1`}
                  />
                </Col>
                <Col md="auto">
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={calculeteButtonOverlay}
                  >
                    <Button className="SubmitButton" type="submit">
                      Berechnen
                    </Button>
                  </OverlayTrigger>
                </Col>
                <Col md="auto" style={{ padding: "0px" }}>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={deleteButtonOverlay}
                  >
                    <Button
                      className="SubmitButton"
                      type="submit"
                      onClick={handleDelte}
                    >
                      Werte löschen
                    </Button>
                  </OverlayTrigger>
                </Col>
              </Form.Group>
            ))}

            <div className="BMIContainer">
              <div className="cyan">14, 16, 18</div>
              <div className="green">20, 22, 24</div>
              <div className="yellow">26, 28, 30</div>
              <div className="red">32, 34, 36</div>
            </div>
            <div className="BMIContainer" ref={myRef}>
              <div>
                <span
                  style={{ background: BMIcolor === "cyan" ? "cyan" : null }}
                ></span>
              </div>
              <div>
                <span
                  style={{
                    background: BMIcolor === "green" ? "green" : null,
                  }}
                ></span>
              </div>
              <div>
                <span
                  style={{
                    background: BMIcolor === "yellow" ? "yellow" : null,
                  }}
                ></span>
              </div>
              <div>
                <span
                  style={{ background: BMIcolor === "red" ? "red" : null }}
                ></span>
              </div>
            </div>

            <div className="Result">
              Ihr BMI beträgt:
              <ProgressBar
                animated
                now={bmi}
                label={`${bmi}`}
                min="14"
                max="36"
              />
            </div>
            <div className="ResultContainer"></div>
          </div>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Ihre Angaben</Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>Vorname: {firstName}</ListGroup.Item>
                  <ListGroup.Item>Nachname: {lastName}</ListGroup.Item>
                  <ListGroup.Item>E-Mail: {email}</ListGroup.Item>
                  <ListGroup.Item>Wohnort: {location}</ListGroup.Item>
                  <ListGroup.Item>Postleitzahl: {zipCode}</ListGroup.Item>
                  <ListGroup.Item>Kanton: {canton}</ListGroup.Item>
                  <ListGroup.Item>Gewicht: {weight}kg</ListGroup.Item>
                  <ListGroup.Item>Grösse: {height}m</ListGroup.Item>
                  <ListGroup.Item>BMI: {bmi}</ListGroup.Item>
                  <ListGroup.Item>Geschlecht: {gender}</ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Form>
      </div>
    </>
  );
};
export default BodyMassIndexWithForms;
