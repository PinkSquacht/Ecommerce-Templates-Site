import { Container, Row, Col, Card, Button } from "react-bootstrap";

// Bootstrap Studio handoff surface.
// Replace this markup with JSX converted from your Studio export.
const StudioDesign = () => {
  return (
    <main className="studio-root">
      <Container fluid>
        <div className="studio-placeholder mb-3">
          <h1 className="h3 mb-2">Bootstrap Studio Integration Ready</h1>
          <p className="mb-0">
            This route is your isolated canvas for Bootstrap Studio layouts.
          </p>
        </div>
        <Row className="g-3">
          <Col md={6} lg={4}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Export CSS</Card.Title>
                <Card.Text>Paste your generated stylesheet into the studio css folder.</Card.Text>
                <Button variant="primary">Primary CTA</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Convert Markup</Card.Title>
                <Card.Text>Bring Studio HTML in as JSX component sections.</Card.Text>
                <Button variant="outline-secondary">Secondary Action</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12} lg={4}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Keep Components</Card.Title>
                <Card.Text>Once stable, extract blocks into reusable React components.</Card.Text>
                <Button variant="success">Save Section</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default StudioDesign;
