import { useEffect, useState } from 'react';
import {
    Container,
    Table,
    Form,
    Spinner,
    Button,
    Row,
    Col,
    ButtonGroup,
    Modal,
    Pagination,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
    getWebinarList,
    deleteWebinar,
} from '../../../services/webinarService';

export default function ListWebinar() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [showDelete, setShowDelete] = useState(false);
    const [selected, setSelected] = useState(null);

    const navigate = useNavigate();

    const fetchData = async (keyword = search, pageNumber = page) => {
        setLoading(true);
        try {
            const res = await getWebinarList(keyword, pageNumber);
            setData(res.data);
            setPage(res.current_page);
            setLastPage(res.last_page);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    useEffect(() => {
        const delay = setTimeout(() => {
            setPage(1);
            fetchData(search, 1);
        }, 500);
        return () => clearTimeout(delay);
    }, [search]);

    const handleDelete = async () => {
        await deleteWebinar(selected.id);
        setShowDelete(false);
        fetchData();
    };

    return (
        <Container className="py-4">
            <Row className="mb-3 align-items-center">
                <Col>
                    <h4 className="fw-bold">Daftar Webinar</h4>
                </Col>
                <Col className="text-end">
                    <Button
                        onClick={() =>
                            navigate('/dashboard/admin/create-webinar')
                        }
                    >
                        + Tambah Webinar
                    </Button>
                </Col>
            </Row>

            <Form.Control
                className="mb-3"
                placeholder="Cari webinar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Table bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th width="5%">No</th>
                        <th>Nama Webinar</th>
                        <th width="15%">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan="3" className="text-center py-4">
                                <Spinner />
                            </td>
                        </tr>
                    )}

                    {!loading && data.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center text-muted py-4">
                                Data tidak ditemukan
                            </td>
                        </tr>
                    )}

                    {!loading &&
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{(page - 1) * 5 + index + 1}</td>
                                <td>{item.nama_webinar}</td>
                                <td className="text-center">
                                    <ButtonGroup size="sm">
                                        <Button
                                            variant="light"
                                            title="Detail"
                                            onClick={() =>
                                                navigate(
                                                    `/dashboard/admin/webinar/${item.id}?mode=detail`
                                                )
                                            }
                                        >
                                            <i className="bi bi-eye text-info"></i>
                                        </Button>
                                        <Button
                                            variant="light"
                                            title="Edit"
                                            onClick={() =>
                                                navigate(
                                                    `/dashboard/admin/webinar/${item.id}?mode=edit`
                                                )
                                            }
                                        >
                                            <i className="bi bi-pencil-square text-warning"></i>
                                        </Button>
                                        <Button
                                            variant="light"
                                            title="Hapus"
                                            onClick={() => {
                                                setSelected(item);
                                                setShowDelete(true);
                                            }}
                                        >
                                            <i className="bi bi-trash text-danger"></i>
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            <Pagination className="justify-content-center">
                <Pagination.Prev
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                />
                {[...Array(lastPage)].map((_, i) => (
                    <Pagination.Item
                        key={i}
                        active={page === i + 1}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    disabled={page === lastPage}
                    onClick={() => setPage(page + 1)}
                />
            </Pagination>

            <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Hapus Webinar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Yakin ingin menghapus{' '}
                    <strong>{selected?.nama_webinar}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDelete(false)}
                    >
                        Batal
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Hapus
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
