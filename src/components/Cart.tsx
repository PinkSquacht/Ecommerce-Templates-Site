import { useNavigate, Link } from "react-router-dom";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { useCart } from "../contexts/useCart";

const Cart = () => {
  // Pull the shared cart state so the page stays in sync with the navbar and product buttons.
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    isAuthenticated,
    isLoading,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const handleContinueShopping = () => {
    // Send the customer back into the storefront when the cart is empty or they want to browse more.
    navigate("/");
  };

  const handleCheckout = () => {
    // Checkout will connect to a payment provider once the backend flow is ready.
    console.log("Checkout clicked");
  };

  if (!isAuthenticated) {
    return (
      <div className="container storefront-shell cart-shell">
        {/* Signed-out users get a short explanation and a login path instead of an empty cart screen. */}
        <Alert variant="info" className="cart-empty-alert">
          <Alert.Heading>Sign in to see your cart</Alert.Heading>
          <p>Your cart is tied to your account, so log in first to review saved items.</p>
          <div className="d-flex gap-2 flex-wrap">
              <Link to="/login" className="text-decoration-none">
                <Button className="btn-theme-solid" variant="light">
                  Go to Login
                </Button>
              </Link>
            <Button onClick={handleContinueShopping} className="btn-theme-outline" variant="light">
              Continue Shopping
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container storefront-shell cart-shell">
        {/* Keep the loading state simple because the cart contents are coming from Firestore. */}
        <div className="cart-empty-state">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div className="container storefront-shell cart-shell">
      <section className="cart-header-card">
        <p className="hero-eyebrow">Your Cart</p>
        <h1>{cartCount} items ready for checkout</h1>
        <p>
          Review quantities, remove anything you do not need, and continue when you are ready.
        </p>
      </section>

      {cartItems.length > 0 ? (
        <Row className="g-3 align-items-start">
          <Col lg={8}>
            {/* The left column shows each line item with quantity controls. */}
            <div className="cart-item-list">
              {cartItems.map((item) => (
                <Card key={item.id} className="cart-item-card storefront-product-card">
                  <Row className="g-0 align-items-center">
                    <Col xs={4} md={3} className="p-3">
                      <Card.Img src={item.image} alt={item.title} className="cart-item-image" />
                    </Col>
                    <Col xs={8} md={9}>
                      <Card.Body>
                        <Card.Title className="storefront-product-title">{item.title}</Card.Title>
                        <Card.Text className="cart-item-description">{item.description}</Card.Text>
                        <div className="cart-item-meta-row">
                          <span>Price: ${item.price.toFixed(2)}</span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <div className="cart-item-actions">
                          <Button onClick={() => decreaseQuantity(item.id)} variant="light" className="btn-theme-outline">
                            -
                          </Button>
                          <Button onClick={() => increaseQuantity(item.id)} variant="light" className="btn-theme-solid">
                            +
                          </Button>
                          <Button onClick={() => removeFromCart(item.id)} variant="outline-danger">
                            Remove
                          </Button>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>
          </Col>

          <Col lg={4}>
            {/* The right column summarizes the order and provides the checkout action. */}
            <Card className="cart-summary-card storefront-product-card">
              <Card.Body>
                <p className="hero-eyebrow">Order Summary</p>
                <h2>Total: ${cartSubtotal.toFixed(2)}</h2>
                <p className="cart-summary-copy">
                  This is the checkout-ready subtotal before taxes, shipping, or discounts.
                </p>
                <div className="cart-summary-lines">
                  <div>
                    <span>Items</span>
                    <strong>{cartCount}</strong>
                  </div>
                  <div>
                    <span>Subtotal</span>
                    <strong>${cartSubtotal.toFixed(2)}</strong>
                  </div>
                </div>
                <Button onClick={handleCheckout} className="btn-theme-solid w-100 mt-3" variant="light">
                  Proceed to Checkout
                </Button>
                <Button onClick={handleContinueShopping} className="btn-theme-outline w-100 mt-2" variant="light">
                  Continue Shopping
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="cart-empty-state">
          <h2>Your cart is empty.</h2>
          <p>Browse the storefront and add a few items to see the cart in action.</p>
          <Button onClick={handleContinueShopping} className="btn-theme-solid" variant="light">
            Go to Home Page
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
