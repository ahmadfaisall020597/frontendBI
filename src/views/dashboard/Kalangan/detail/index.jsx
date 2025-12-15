import { useEffect, useState } from 'react';
import {
    Container,
    Card,
    Form,
    Button,
    Spinner,
} from 'react-bootstrap';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
    getKalanganDetail,
    updateKalangan,
} from '../../../../services/kalanganService';

export default function DetailEditKalangan() {
    const { id } = useParams();
    const [params] = useSearchParams();
    const isEdit = params.get('mode') === 'edit';

    const [nama, setNama] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getKalanganDetail(id).then((res) => {
            setNama(res.nama_kalangan);
            setLoading(false);
        });
    }, [id]);

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        await updateKalangan(id, { nama_kalangan: nama });
        navigate('/dashboard/admin/list-kalangan');
    };

    if (loading) return <Spinner className="m-5" />;

    return (
        <Container className="py-4">
            <Card className="shadow-sm">
                <Card.Body>
                    <h4 className="fw-bold mb-3">
                        {isEdit ? 'Edit Kalangan' : 'Detail Kalangan'}
                    </h4>

                    <Form onSubmit={submit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Kalangan</Form.Label>
                            <Form.Control
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                disabled={!isEdit}
                            />
                        </Form.Group>

                        <Button
                            variant="secondary"
                            onClick={() => navigate(-1)}
                            className="me-2"
                        >
                            Kembali
                        </Button>

                        {isEdit && (
                            <Button type="submit" disabled={saving}>
                                {saving ? <Spinner size="sm" /> : 'Simpan'}
                            </Button>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
