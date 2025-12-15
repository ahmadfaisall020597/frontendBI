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
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getIklanList, deleteIklan } from '../../../services/iklanServices';
import Pagination from 'react-bootstrap/Pagination';

export default function ListIklan() {
    const [iklan, setIklan] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selected, setSelected] = useState(null);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const navigate = useNavigate();

    const fetchData = async (keyword = '', pageNumber = 1) => {
        setLoading(true);
        try {
            const res = await getIklanList(keyword, pageNumber);
            setIklan(res.data);
            setPage(res.current_page);
            setLastPage(res.last_page);
        } catch (error) {
            console.error('Gagal load iklan', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(search, page);
    }, [page]);

    useEffect(() => {
        const delay = setTimeout(() => {
            setPage(1);
            fetchData(search, 1);
        }, 500);
        return () => clearTimeout(delay);
    }, [search]);

    const handleDelete = async () => {
        try {
            await deleteIklan(selected.id);
            setShowDelete(false);
            fetchData(search);
        } catch (error) {
            console.error('Gagal hapus iklan', error);
        }
    };

    return (
        <Container className="py-4">
            {/* Header */}
            <Row className="mb-3 align-items-center">
                <Col>
                    <h4 className="fw-bold mb-0">Daftar Iklan</h4>
                </Col>
                <Col className="text-end">
                    <Button
                        variant="primary"
                        onClick={() => navigate('/dashboard/admin/create-iklan')}
                    >
                        + Tambah Iklan
                    </Button>
                </Col>
            </Row>

            {/* Search */}
            <Form.Control
                className="mb-3"
                placeholder="Cari iklan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={loading}
            />

            {/* Table */}
            <Table bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th width="5%">No</th>
                        <th>Nama Iklan</th>
                        <th>Biaya</th>
                        <th>Biaya Pendaftaran</th>
                        <th width="20%">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                                <Spinner animation="border" />
                            </td>
                        </tr>
                    )}

                    {!loading && iklan.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center text-muted py-4">
                                Data iklan tidak ditemukan
                            </td>
                        </tr>
                    )}

                    {!loading &&
                        iklan.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.nama_iklan}</td>
                                <td>Rp {Number(item.biaya).toLocaleString()}</td>
                                <td>Rp {Number(item.biaya_pendaftaran).toLocaleString()}</td>
                                <td>
                                    <td className="text-center">
                                        <ButtonGroup size="sm">
                                            {/* DETAIL */}
                                            <Button
                                                variant="light"
                                                title="Detail"
                                                onClick={() =>
                                                    navigate(`/dashboard/admin/iklan/${item.id}?mode=detail`)
                                                }
                                            >
                                                <i className="bi bi-eye text-info"></i>
                                            </Button>

                                            {/* EDIT */}
                                            <Button
                                                variant="light"
                                                title="Edit"
                                                onClick={() =>
                                                    navigate(`/dashboard/admin/iklan/${item.id}?mode=edit`)
                                                }
                                            >
                                                <i className="bi bi-pencil-square text-warning"></i>
                                            </Button>

                                            {/* DELETE */}
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
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            {lastPage > 1 && (
                <Pagination className="justify-content-center">
                    <Pagination.Prev
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    />

                    {[...Array(lastPage)].map((_, i) => (
                        <Pagination.Item
                            key={i}
                            active={i + 1 === page}
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
            )}

            {/* Delete Modal */}
            <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Hapus</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Yakin ingin menghapus iklan{' '}
                    <strong>{selected?.nama_iklan}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDelete(false)}>
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
