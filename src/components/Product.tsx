import { BsPlus } from "react-icons/bs";
import { Card, Button, Col, Row } from "react-bootstrap";
import { useStorefront } from "../contexts/useStorefront";
import { useCart } from "../contexts/useCart";

const Product = ({ product }: { product: any }) => {
  // Product cards adapt to the current template so the same catalog can feel different by brand.
  const { id, title, price, image, description } = product;
  const { activeTemplate } = useStorefront();
  const { addToCart, isAuthenticated } = useCart();
  const isEditorialCard = activeTemplate.productCardStyle === "editorial" || activeTemplate.productCardStyle === "mobile";

  const handleAddToCart = async () => {
    // Guard against anonymous cart writes so the Firestore path stays tied to a user account.
    if (!isAuthenticated) {
      console.error("User must be signed in to add items to cart.");
      return;
    }

    try {
      // Delegate all cart mutation logic to the shared cart context.
      await addToCart({ id, title, price, image, description, category: product.category });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  if (isEditorialCard) {
    return (
      <Col xs={12} className="d-flex justify-content-center">
        <Card
          className={`w-100 my-2 storefront-product-card storefront-product-card--${activeTemplate.productCardStyle}`}
          style={{ maxWidth: activeTemplate.productCardStyle === "mobile" ? "920px" : "980px" }}
        >
          {/* Editorial and mobile templates use a wider layout to make the product feel more premium. */}
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
                <Card.Title className="storefront-product-title">{title}</Card.Title>
                <Card.Text style={{ wordBreak: "break-word", fontSize: "0.9rem" }}>
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
        className={`h-100 my-3 text-center storefront-product-card storefront-product-card--${activeTemplate.productCardStyle}`}
        style={{ width: "100%", maxWidth: activeTemplate.productCardStyle === "performance" ? "200px" : "218px" }}
      >
        {/* Shelf-style templates use compact cards so shoppers can scan rows quickly. */}
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          className="img-fluid p-3"
          style={{ height: "160px", objectFit: "contain" }}
        />
        <Card.Body>
          <Card.Title className="storefront-product-title">{title}</Card.Title>
          <Card.Text style={{ wordBreak: "break-word", fontSize: "0.84rem" }}>
            {description}
          </Card.Text>
          {(activeTemplate.productCardStyle === "trust" || activeTemplate.productCardStyle === "proof") ? (
            // Trust and proof templates add quick reassurance close to the CTA.
            <div className="product-proof-row">
              <span>4.8/5 rating</span>
              <span>Ships fast</span>
              <span>Easy returns</span>
            </div>
          ) : null}
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
