import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Card, Row, Col, Button, Form, InputGroup, Alert } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import { LayoutDashboard } from 'lucide-react';

import { login } from '../../services/authServices';
import { setAuth } from '../../utils/authStorage';
import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn1() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login({ email, password });

      // 1️⃣ simpan ke localStorage
      setAuth(data);

      // 2️⃣ SET CONTEXT LANGSUNG (INI KUNCI)
      setUser(data.user);

      // 3️⃣ redirect sesuai role
      if (data.user.role === 'admin') {
        navigate('/dashboard/admin', { replace: true });
      } else {
        navigate('/dashboard/member', { replace: true });
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-content text-center">
        <Card className="borderless">
          <Row className="align-items-center">
            <Col>
              <Card.Body>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <LayoutDashboard size={32} />
                  <span className="fs-3 fw-bold">Nama Website</span>
                </div>

                <h4 className="mb-3">Signin</h4>

                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FeatherIcon icon="mail" />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FeatherIcon icon="lock" />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </InputGroup>

                  <Button
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Signin'}
                  </Button>
                </Form>

                <p className="mt-3 text-muted">
                  Don’t have an account?{' '}
                  <NavLink to="/register">Signup</NavLink>
                </p>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}
