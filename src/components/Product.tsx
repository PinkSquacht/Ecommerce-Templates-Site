import { BsPlus } from "react-icons/bs";
import { Card, Button, Col, Row } from "react-bootstrap";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { useStorefront } from "../contexts/StorefrontContext";

const Product = ({ product }: { product: any }) => {
  const { id, title, price, image, description } = product;
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const { activeLayoutPreset } = useStorefront();
  const isHorizontalStack = activeLayoutPreset === "horizontal-stack";

  const handleAddToCart = async () => {
    if (!userId) {
      console.error("User not authenticated.");
      return;
    }

    const cartItemRef = doc(db, "users", userId, "cartItems", id.toString());

    try {
      const cartItemDoc = await getDoc(cartItemRef);

      if (cartItemDoc.exists()) {
        const currentQuantity = cartItemDoc.data()?.quantity || 0;
        const newQuantity = currentQuantity + 1;

        await updateDoc(cartItemRef, {
          quantity: newQuantity,
        });

        console.log("Item quantity updated in Firestore!");
      } else {
        await setDoc(cartItemRef, {
          id,
          title,
          price,
          image,
          description,
          quantity: 1,
        });

        console.log("Item added to Firestore!");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  if (isHorizontalStack) {
    return (
      <Col xs={12} className="d-flex justify-content-center">
        <Card
          className="w-100 my-2"
          style={{ maxWidth: "980px", borderRadius: "14px", border: "1px solid #d6d0c2" }}
        >
          <Row className="g-0 align-items-center">
            <Col xs={12} md={3} className="p-3">
              <Card.Img
                variant="top"
                src={image}
                alt={title}
                className="img-fluid"
                style={{ height: "160px", objectFit: "contain" }}
              />
            </Col>
            <Col xs={12} md={7}>
              <Card.Body>
                <Card.Title style={{ fontSize: "1rem" }}>{title}</Card.Title>
                <Card.Text style={{ wordBreak: "break-word", fontSize: "0.9rem", color: "#5d6571" }}>
                  {description}
                </Card.Text>
                <Card.Text>
                  <strong>Price:</strong> ${price}
                </Card.Text>
              </Card.Body>
            </Col>
            <Col xs={12} md={2} className="d-flex justify-content-center pb-3 pb-md-0">
              <Button
                onClick={handleAddToCart}
                variant="light"
                className="btn-theme-solid"
              >
                <BsPlus /> Add to Cart
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    );
  }

  return (
    <Col xs="auto" className="d-flex justify-content-center amazon-card-col">
      <Card
        className="h-100 my-3 text-center"
        style={{ width: "100%", maxWidth: "210px", borderRadius: "14px", border: "1px solid #d6d0c2" }}
      >
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          className="img-fluid p-3"
          style={{ height: "160px", objectFit: "contain" }}
        />
        <Card.Body>
          <Card.Title style={{ fontSize: "0.95rem" }}>{title}</Card.Title>
          <Card.Text style={{ wordBreak: "break-word", fontSize: "0.84rem", color: "#5d6571" }}>
            {description}
          </Card.Text>
          <Card.Text>
            <strong>Price:</strong> ${price}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center">
          <Button
            onClick={handleAddToCart}
            variant="light"
            className="btn-theme-solid"
            style={{ marginRight: "5px" }}
          >
            <BsPlus /> Add to Cart
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Product;
