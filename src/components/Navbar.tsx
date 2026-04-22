import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { BsCart3, BsShop } from "react-icons/bs";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useStorefront } from "../contexts/StorefrontContext";

// Navbar combines template branding with auth status and cart summary.

const pages = [
  { name: "Home", path: "/" },
  { name: "Account", path: "/user" },
  { name: "Signup", path: "/signup" },
];

interface IUser {
  uid: string;
  email: string;
}

function ResponsiveAppBar() {
  const [user, setUser] = useState<IUser>({ uid: "", email: "" });
  const [cartItemCount, setCartItemCount] = useState(0);
  const { activeTemplate, activeTier } = useStorefront();

  const fetchCartItemCount = async (userId: string) => {
    // Cart quantity is aggregated from user cartItems docs in Firestore.
    const db = getFirestore();
    const cartItemsCollection = collection(db, 'users', userId, 'cartItems');
    const cartItemsSnapshot = await getDocs(cartItemsCollection);
    const itemCount = cartItemsSnapshot.docs.reduce((count, doc) => count + (doc.data().quantity || 0), 0);
    setCartItemCount(itemCount);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (typeof user.email === "string") {
          setUser({
            uid: user.uid,
            email: user.email,
          });

          // Fetch cart item count from Firestore
          fetchCartItemCount(user.uid);
        }
      }
    });

    // Clean up function
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const userId = user.uid;

    if (userId) {
      // Update the cart item count whenever there's a change in cart items
      fetchCartItemCount(userId);
    }
  }, [user]);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        setUser({ uid: "", email: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="py-2"
      style={{ backgroundColor: "#f1ece1", borderBottom: `4px solid ${activeTemplate.accentColor}` }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-bold">
          <BsShop />
          {activeTemplate.name}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {pages.map((page) => (
              <Nav.Link as={Link} to={page.path} key={page.name}>
                {page.name}
              </Nav.Link>
            ))}
            {activeTier.hasAdminDashboard ? <Nav.Link as={Link} to="/admin">Admin</Nav.Link> : null}
          </Nav>

          <div className="d-flex align-items-center gap-2">
            {user.email ? (
              <>
                <span className="small text-muted">{user.email}</span>
                <Button variant="outline-danger" size="sm" onClick={handleSignout}>
                  SignOut
                </Button>
              </>
            ) : (
              <Link to="/login" className="text-decoration-none">
                <Button variant="outline-success" size="sm">
                  Login
                </Button>
              </Link>
            )}

            <Link to="/cart" className="text-decoration-none" title={`Open Cart (${cartItemCount} items)`}>
              <Button
                variant="dark"
                size="sm"
                className="d-flex align-items-center gap-2"
              >
                <BsCart3 />
                <Badge bg="light" text="dark">{cartItemCount}</Badge>
              </Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ResponsiveAppBar;
