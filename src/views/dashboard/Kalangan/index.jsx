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
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { getKalanganList, deleteKalangan } from '../../../services/kalanganService';

export default function ListKalangan() {
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
            const res = await getKalanganList(keyword, pageNumber);
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
        await deleteKalangan(selected.id);
        setShowDelete(false);
        fetchData();
    };

    return (
        <Container className="py-4">
            <Row className="mb-3">
                <Col>
                    <h4 className="fw-bold">Daftar Kalangan</h4>
                </Col>
                <Col className="text-end">
                    <Button
                        onClick={() =>
                            navigate('/dashboard/admin/create-kalangan')
                        }
                    >
                        + Tambah
                    </Button>
                </Col>
            </Row>

            <Form.Control
                className="mb-3"
                placeholder="Cari kalangan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Table bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th width="5%">No</th>
                        <th>Nama Kalangan</th>
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

                    {!loading &&
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{(page - 1) * 5 + index + 1}</td>
                                <td>{item.nama_kalangan}</td>
                                <td className="text-center">
                                    <ButtonGroup size="sm">
                                        <Button
                                            variant="light"
                                            title="Detail"
                                            onClick={() =>
                                                navigate(
                                                    `/dashboard/admin/kalangan/${item.id}?mode=detail`
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
                                                    `/dashboard/admin/kalangan/${item.id}?mode=edit`
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
                    <Modal.Title>Hapus Kalangan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Yakin hapus <strong>{selected?.nama_kalangan}</strong>?
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
