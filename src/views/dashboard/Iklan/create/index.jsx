import { useState } from 'react';
import {
    Container,
    Card,
    Form,
    Button,
    Row,
    Col,
    Spinner,
    Alert,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createIklan } from '../../../../services/iklanServices';

export default function CreateIklan() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nama_iklan: '',
        biaya: '',
        biaya_pendaftaran: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'biaya' || name === 'biaya_pendaftaran') {
            setForm({
                ...form,
                [name]: formatRupiah(value),
            });
        } else {
            setForm({
                ...form,
                [name]: value,
            });
        }
    };

    const formatRupiah = (value) => {
        if (!value) return '';
        return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const parseRupiah = (value) => {
        return Number(value.replace(/\./g, ''));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await createIklan({
                nama_iklan: form.nama_iklan,
                biaya: parseRupiah(form.biaya),
                biaya_pendaftaran: parseRupiah(form.biaya_pendaftaran),
            });

            navigate('/dashboard/admin/list-iklan', { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menyimpan iklan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h4 className="fw-bold mb-3">Tambah Iklan</h4>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Iklan</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nama_iklan"
                                        placeholder="Masukkan nama iklan"
                                        value={form.nama_iklan}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Biaya</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="biaya"
                                        placeholder="Masukkan biaya"
                                        value={form.biaya}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Biaya Pendaftaran</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="biaya_pendaftaran"
                                        placeholder="Masukkan biaya pendaftaran"
                                        value={form.biaya_pendaftaran}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-end gap-2">
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigate(-1)}
                                        disabled={loading}
                                    >
                                        Batal
                                    </Button>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner
                                                    size="sm"
                                                    animation="border"
                                                    className="me-2"
                                                />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            'Simpan'
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
