import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// react-bootstrap
import {
  Card,
  Row,
  Col,
  Button,
  InputGroup,
  Form,
  Alert,
  Spinner,
  Modal
} from 'react-bootstrap';

// third party
import FeatherIcon from 'feather-icons-react';

// assets
import { LayoutDashboard } from 'lucide-react';

// services
import { register } from '../../services/authServices';

// -----------------------|| SIGN UP ||-----------------------//

export default function SignUp1() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(form);
      setShowSuccess(true); // ✅ tampilkan modal sukses
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Register gagal, periksa kembali data'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/login', { replace: true });
  };

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-content text-center">
          <Card className="borderless">
            <Row className="align-items-center text-center">
              <Col>
                <Card.Body>
                  <div className="d-flex align-items-center gap-2 mb-3 ps-4">
                    <LayoutDashboard size={32} strokeWidth={2.2} />
                    <span className="logo-lg fs-3 fw-bold text-uppercase">
                      Nama Website
                    </span>
                  </div>

                  <h4 className="mb-3 f-w-400">Sign Up</h4>

                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FeatherIcon icon="user" />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Username"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FeatherIcon icon="mail" />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        <FeatherIcon icon="lock" />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>

                    <InputGroup className="mb-4">
                      <InputGroup.Text>
                        <FeatherIcon icon="lock" />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Password"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        required
                      />
                    </InputGroup>

                    <Button
                      type="submit"
                      className="btn-block mb-4"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            size="sm"
                            animation="border"
                            className="me-2"
                          />
                          Processing...
                        </>
                      ) : (
                        'Sign Up'
                      )}
                    </Button>
                  </Form>

                  <p className="mb-2">
                    Already have an account?{' '}
                    <NavLink to="/login" className="f-w-400">
                      Sign In
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>

      {/* ✅ MODAL REGISTER SUKSES */}
      <Modal
        show={showSuccess}
        onHide={handleSuccessClose}
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Registrasi Berhasil 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Akun berhasil dibuat. Silakan login untuk melanjutkan.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessClose}>
            Login Sekarang
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
