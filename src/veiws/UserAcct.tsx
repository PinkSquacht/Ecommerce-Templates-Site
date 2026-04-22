import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase"; // adjust the import path if needed
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  state: string;
  country: string;
  zip: string;
}

const UserAcct = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser(userData);
          setEditUser(userData);
        }
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const field = name as keyof User;

    setEditUser((prevState) => {
      if (!prevState) {
        return prevState;
      }

      return {
        ...prevState,
        [field]: value || "",
      };
    });
  };

  const handleUserUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userId && editUser) {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { ...editUser });
      setUser(editUser);
      alert('User information updated!');
    }
  };

  if (!user || !editUser) {
    return <div>
      <h1>Please Login to view or update account information</h1>
    </div>;
  }

  return (
    <Container className="py-5" style={{ maxWidth: "720px" }}>
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4 p-md-5">
          <h1 className="h4 mb-4">User Information</h1>
          <Form onSubmit={handleUserUpdate}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  value={editUser.firstName}
                  onChange={handleInputChange}
                  required
                  autoFocus
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  value={editUser.lastName}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                autoComplete="address-line1"
                value={editUser.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={4} className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  id="state"
                  name="state"
                  autoComplete="address-level1"
                  value={editUser.state}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  id="country"
                  name="country"
                  autoComplete="country"
                  value={editUser.country}
                  onChange={handleInputChange}
                  required
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  id="zip"
                  name="zip"
                  autoComplete="postal-code"
                  value={editUser.zip}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </Row>

            <Button type="submit" variant="success" className="w-100">
              Update Information
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserAcct;