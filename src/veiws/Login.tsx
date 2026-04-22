import * as React from "react";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Container, Form } from "react-bootstrap";

export default function SignIn() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage + " " + errorCode);
      });

  };

  return (
    <Container className="py-5" style={{ maxWidth: "520px" }}>
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4 p-md-5">
          <h1 className="h4 mb-4 text-center">Sign in</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                autoComplete="email"
                required
                autoFocus
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="current-password"
                required
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </Form.Group>

            <Button type="submit" variant="success" className="w-100 mb-3">
              Sign In
            </Button>
            <div className="text-end">
              <Link to="/signup" className="small">Don't have an account? Sign Up</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
