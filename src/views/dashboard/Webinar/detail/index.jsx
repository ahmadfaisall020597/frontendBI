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
    getWebinarDetail,
    updateWebinar,
} from '../../../../services/webinarService';

export default function DetailEditWebinar() {
    const { id } = useParams();
    const [params] = useSearchParams();
    const isEdit = params.get('mode') === 'edit';

    const [nama, setNama] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getWebinarDetail(id).then((res) => {
            setNama(res.nama_webinar);
            setLoading(false);
        });
    }, [id]);

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);
        await updateWebinar(id, { nama_webinar: nama });
        navigate('/dashboard/admin/list-webinar');
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner />
            </div>
        );
    }

    return (
        <Container className="py-4">
            <Card className="shadow-sm">
                <Card.Body>
                    <h4 className="fw-bold mb-3">
                        {isEdit ? 'Edit Webinar' : 'Detail Webinar'}
                    </h4>

                    <Form onSubmit={submit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Webinar</Form.Label>
                            <Form.Control
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                disabled={!isEdit}
                            />
                        </Form.Group>

                        <Button
                            variant="secondary"
                            className="me-2"
                            onClick={() => navigate(-1)}
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
