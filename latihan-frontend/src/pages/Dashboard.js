import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Container, Navbar } from "react-bootstrap";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  // Fungsi yang digunakan untuk mendapatkan token dari localStorage
  const getTokenHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Fungsi READ 
  const fetchData = async () => {
    try {
      const res = await api.get("/items", getTokenHeader());
      setItems(res.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error.response);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  // Fungsi CREATE dan UPDATE 
  const handleSave = async () => {
    try {
      if (editId) {
        await api.put(`/items/${editId}`, form, getTokenHeader());
      } else {
        await api.post("/items", form, getTokenHeader());
      }

      setForm({ title: "", description: "" });
      setEditId(null);
      setShow(false);
      fetchData(); 
    } catch (error) {
      alert("Gagal menyimpan data.");
    }
  };

  // Fungsi DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await api.delete(`/items/${id}`, getTokenHeader());
      fetchData(); 
    } catch (error) {
      alert("Gagal menghapus data.");
    }
  };

  // Konfigurasi Logika saat tombol Edit diklik
  const handleEdit = (item) => {
    setForm({ title: item.title, description: item.description });
    setEditId(item.id);
    setShow(true);
  };

  // Konfigurasi Logika saat modal ditutup
  const handleClose = () => {
    setForm({ title: "", description: "" });
    setEditId(null);
    setShow(false);
  };

  // Konfigurasi Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>CRUD Dashboard</Navbar.Brand>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </Navbar>

      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Daftar Item</h3>
          <Button onClick={() => setShow(true)}>Tambah Data</Button>
        </div>

        {/* Bagian Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Bagian Modal CRUD */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{editId ? "Edit Data" : "Tambah Data"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Judul</Form.Label>
                <Form.Control
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Dashboard;
