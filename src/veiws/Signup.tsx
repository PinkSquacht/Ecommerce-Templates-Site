import * as React from "react";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc} from "firebase/firestore";
import { db } from "../firebase";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

export default function SignUp() {
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      // Create a user document in Firestore
      const userId = userCredential.user.uid;
      const userDocRef = doc(db, "users", userId);
      await setDoc(userDocRef, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: "", // Add any other default fields if needed
        state: "",
        country: "",
        zip: "",
      });

      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.code, error.message);
      } else {
        console.error("Unexpected signup error", error);
      }
    }
  };
  return (
    <Container className="py-5" style={{ maxWidth: "620px" }}>
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4 p-md-5">
          <h1 className="h4 mb-4 text-center">Sign up</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  autoComplete="given-name"
                  required
                  autoFocus
                  onChange={(event) => setUser({ ...user, firstName: event.target.value })}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  autoComplete="family-name"
                  required
                  onChange={(event) => setUser({ ...user, lastName: event.target.value })}
                />
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                autoComplete="email"
                required
                onChange={(event) => setUser({ ...user, email: event.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="new-password"
                required
                onChange={(event) => setUser({ ...user, password: event.target.value })}
              />
            </Form.Group>

            <Button type="submit" variant="success" className="w-100 mb-3">
              Sign Up
            </Button>
            <div className="text-end">
              <Link to="/login" className="small">Already have an account? Sign in</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
