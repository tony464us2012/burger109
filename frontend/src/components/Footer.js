import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Shop 109
                    </Col>
                    <Col className="text-center py-3">
                        <a href="/accessibility">Accessibility</a>
                    </Col>
                    <Col className="text-center py-3">
                        <a href="terms">Term and Conditions</a>
                    </Col>
                    <Col className="text-center py-3">
                        <a href="https://twitter.com/109burgerjoint?lang=en" target='_blank' rel='noreferrer'><i className="fab fa-twitter socials"></i></a>
                        <a href="https://www.facebook.com/109burgerjoint/"><i className="fab fa-facebook-f socials"></i></a>
                        <a href="https://www.facebook.com/109burgerjoint/"><i className="fab fa-instagram socials"></i></a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
