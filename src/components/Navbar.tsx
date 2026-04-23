import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { BsCart3, BsShop } from "react-icons/bs";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useStorefront } from "../contexts/useStorefront";
import { useCart } from "../contexts/useCart";

// Navbar combines template branding with auth status and cart summary.

const pages = [
  // Public-facing navigation links for core storefront/account navigation.
  { name: "Home", path: "/" },
  { name: "Account", path: "/user" },
  { name: "Signup", path: "/signup" },
];

interface IUser {
  uid: string;
  email: string;
}

function ResponsiveAppBar() {
  // The navbar shows the current brand identity plus lightweight account/cart status.
  const [user, setUser] = useState<IUser>({ uid: "", email: "" });
  const { activeTemplate, activeTier } = useStorefront();
  const { cartCount } = useCart();

  useEffect(() => {
    // Keep the top bar synced with Firebase auth so the login/logout view stays current.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (typeof user.email === "string") {
          // Store only the user fields the navbar actually needs.
          setUser({
            uid: user.uid,
            email: user.email,
          });

        }
      }
    });

    // Clean up function
    return () => unsubscribe();
  }, []);

  const handleSignout = () => {
    // Sign out and reset the local navbar identity state.
    signOut(auth)
      .then(() => {
        setUser({ uid: "", email: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Navbar expand="lg" sticky="top" className="py-2 theme-navbar">
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
                <Button variant="light" size="sm" className="btn-theme-outline">
                  Login
                </Button>
              </Link>
            )}

            <Link to="/cart" className="text-decoration-none" title={`Open Cart (${cartCount} items)`}>
              <Button
                variant="light"
                size="sm"
                className="d-flex align-items-center gap-2 btn-theme-solid"
              >
                <BsCart3 />
                <Badge bg="light" text="dark">{cartCount}</Badge>
              </Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ResponsiveAppBar;
