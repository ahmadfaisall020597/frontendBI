import { useEffect, useState } from 'react';
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
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getIklanDetail, updateIklan } from '../../../../services/iklanServices';

const formatRupiah = (value) => {
    if (!value) return '';
    return value
        .toString()
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const parseRupiah = (value) => {
    return Number(value.toString().replace(/\./g, ''));
};

export default function IklanDetailEdit() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'detail';
    const isEdit = mode === 'edit';

    const navigate = useNavigate();

    const [form, setForm] = useState({
        nama_iklan: '',
        biaya: '',
        biaya_pendaftaran: '',
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const fetchDetail = async () => {
        try {
            const data = await getIklanDetail(id);
            setForm({
                nama_iklan: data.nama_iklan,
                biaya: formatRupiah(data.biaya),
                biaya_pendaftaran: formatRupiah(data.biaya_pendaftaran),
            });
        } catch {
            setError('Gagal memuat detail iklan');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetail();
    }, [id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        try {
            await updateIklan(id, {
                nama_iklan: form.nama_iklan,
                biaya: parseRupiah(form.biaya),
                biaya_pendaftaran: parseRupiah(form.biaya_pendaftaran),
            });

            navigate('/dashboard/admin/list-iklan');
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal update iklan');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h4 className="fw-bold mb-3">
                                {isEdit ? 'Edit Iklan' : 'Detail Iklan'}
                            </h4>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Iklan</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nama_iklan"
                                        value={form.nama_iklan}
                                        onChange={handleChange}
                                        disabled={!isEdit}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Biaya</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="biaya"
                                        value={form.biaya}
                                        onChange={handleChange}
                                        disabled={!isEdit}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Biaya Pendaftaran</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="biaya_pendaftaran"
                                        value={form.biaya_pendaftaran}
                                        onChange={handleChange}
                                        disabled={!isEdit}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-end gap-2">
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigate(-1)}
                                        disabled={saving}
                                    >
                                        Kembali
                                    </Button>

                                    {isEdit && (
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            disabled={saving}
                                        >
                                            {saving ? (
                                                <>
                                                    <Spinner
                                                        size="sm"
                                                        animation="border"
                                                        className="me-2"
                                                    />
                                                    Menyimpan...
                                                </>
                                            ) : (
                                                'Simpan Perubahan'
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
