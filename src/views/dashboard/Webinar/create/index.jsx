import { useState } from 'react';
import {
    Container,
    Card,
    Form,
    Button,
    Spinner,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createWebinar } from '../../../../services/webinarService';

export default function CreateWebinar() {
    const [nama, setNama] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await createWebinar({ nama_webinar: nama });
        navigate('/dashboard/admin/list-webinar');
    };

    return (
        <Container className="py-4">
            <Card className="shadow-sm">
                <Card.Body>
                    <h4 className="fw-bold mb-3">Tambah Webinar</h4>

                    <Form onSubmit={submit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Webinar</Form.Label>
                            <Form.Control
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" disabled={loading}>
                            {loading ? <Spinner size="sm" /> : 'Simpan'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
