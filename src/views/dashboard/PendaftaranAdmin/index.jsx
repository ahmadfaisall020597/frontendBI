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
} from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';
import {
    getListPendaftaranAdmin
} from '../../../services/pendaftaranService';

export default function ListPendaftaranAdmin() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [showDelete, setShowDelete] = useState(false);
    const [selected, setSelected] = useState(null);

    const navigate = useNavigate();

    const fetchData = async (keyword = '', pageNumber = 1) => {
        setLoading(true);
        try {
            const res = await getListPendaftaranAdmin(keyword, pageNumber);
            console.log('res : ', res);
            setData(res.data);
            setPage(res.current_page);
            setLastPage(res.last_page);
        } catch (error) {
            console.error('Gagal load pendaftaran', error);
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

    return (
        <Container className="py-4">
            {/* Header */}
            <Row className="mb-3 align-items-center">
                <Col>
                    <h4 className="fw-bold mb-0">Daftar Pendaftaran</h4>
                </Col>
            </Row>

            {/* Search */}
            <Form.Control
                className="mb-3"
                placeholder="Cari nama peserta..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={loading}
            />

            {/* Table */}
            <Table bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th width="5%">No</th>
                        <th>Username</th>
                        <th>Nama Iklan</th>
                        <th>Nama Kalangan</th>
                        <th>Nama Webinar</th>
                        <th>Tanggal Daftar</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan="6" className="text-center py-4">
                                <Spinner animation="border" />
                            </td>
                        </tr>
                    )}

                    {!loading && data.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center text-muted py-4">
                                Data pendaftaran tidak ditemukan
                            </td>
                        </tr>
                    )}

                    {!loading &&
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{(page - 1) * 5 + index + 1}</td>
                                <td>{item.nama_peserta}</td>
                                <td>{item.nama_iklan}</td>
                                <td>{item.nama_kalangan}</td>
                                <td>{item.nama_webinar}</td>
                                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            {/* Pagination */}
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
        </Container>
    );
}
