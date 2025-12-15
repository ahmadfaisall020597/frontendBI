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
    Table
} from 'react-bootstrap';

import {
    createPendaftaran,
    getPendaftaranSaya
} from '../../../services/pendaftaranService';

import { getIklanList } from '../../../services/iklanServices';
import { getKalanganList } from '../../../services/kalanganService';
import { getWebinarList } from '../../../services/webinarService';

export default function Pendaftaran() {
    const [kalangan, setKalangan] = useState([]);
    const [iklan, setIklan] = useState([]);
    const [webinar, setWebinar] = useState([]);
    const [pendaftaran, setPendaftaran] = useState([]);

    const [form, setForm] = useState({
        kalangan_id: '',
        iklan_id: '',
        webinar_id: '',
        biaya_pendaftaran: ''
    });

    const [loading, setLoading] = useState(false);
    const [loadingList, setLoadingList] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMasterData();
        fetchPendaftaran();
    }, []);

    const fetchMasterData = async () => {
        try {
            const [k, i, w] = await Promise.all([
                getKalanganList(),
                getIklanList(),
                getWebinarList()
            ]);

            setKalangan(k.data || k);
            setIklan(i.data || i);
            setWebinar(w.data || w);
        } catch {
            setError('Gagal memuat data master');
        }
    };

    const fetchPendaftaran = async () => {
        setLoadingList(true);
        try {
            const data = await getPendaftaranSaya();
            setPendaftaran(data);
        } catch {
            setError('Gagal memuat data pendaftaran');
        } finally {
            setLoadingList(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'iklan_id') {
            const selected = iklan.find(i => i.id === Number(value));
            setForm({
                ...form,
                iklan_id: value,
                biaya_pendaftaran: selected ? selected.biaya_pendaftaran : ''
            });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await createPendaftaran(form);
            setSuccess('Pendaftaran berhasil 🎉');
            setForm({
                kalangan_id: '',
                iklan_id: '',
                webinar_id: '',
                biaya_pendaftaran: ''
            });
            fetchPendaftaran(); // 🔄 refresh list
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal melakukan pendaftaran');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col lg={6}>
                    {/* FORM */}
                    <Card className="shadow-sm mb-4">
                        <Card.Body>
                            <h4 className="fw-bold mb-3">Pendaftaran Webinar</h4>

                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kalangan</Form.Label>
                                    <Form.Select
                                        name="kalangan_id"
                                        value={form.kalangan_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">-- Pilih Kalangan --</option>
                                        {kalangan.map(k => (
                                            <option key={k.id} value={k.id}>
                                                {k.nama_kalangan}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Iklan</Form.Label>
                                    <Form.Select
                                        name="iklan_id"
                                        value={form.iklan_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">-- Pilih Iklan --</option>
                                        {iklan.map(i => (
                                            <option key={i.id} value={i.id}>
                                                {i.nama_iklan}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Webinar</Form.Label>
                                    <Form.Select
                                        name="webinar_id"
                                        value={form.webinar_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">-- Pilih Webinar --</option>
                                        {webinar.map(w => (
                                            <option key={w.id} value={w.id}>
                                                {w.nama_webinar}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Biaya Pendaftaran</Form.Label>
                                    <Form.Control
                                        value={
                                            form.biaya_pendaftaran
                                                ? `Rp ${Number(form.biaya_pendaftaran).toLocaleString()}`
                                                : ''
                                        }
                                        disabled
                                    />
                                </Form.Group>

                                <Button type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Spinner size="sm" className="me-2" />
                                            Memproses...
                                        </>
                                    ) : (
                                        'Daftar Sekarang'
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* LIST */}
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5 className="fw-bold mb-3">Pendaftaran Saya</h5>

                            {loadingList ? (
                                <div className="text-center py-3">
                                    <Spinner />
                                </div>
                            ) : (
                                <Table bordered hover responsive>
                                    <thead className="table-dark">
                                        <tr>
                                            <th>No</th>
                                            <th>Kalangan</th>
                                            <th>Iklan</th>
                                            <th>Webinar</th>
                                            <th>Biaya</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendaftaran.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="text-center text-muted">
                                                    Belum ada pendaftaran
                                                </td>
                                            </tr>
                                        )}

                                        {pendaftaran.map((p, i) => (
                                            <tr key={p.id}>
                                                <td>{i + 1}</td>
                                                <td>{p.nama_kalangan}</td>
                                                <td>{p.nama_iklan}</td>
                                                <td>{p.nama_webinar}</td>
                                                <td>
                                                    Rp {Number(p.biaya_pendaftaran).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
