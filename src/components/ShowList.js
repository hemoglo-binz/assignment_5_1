import React, { useState, useEffect } from "react";

const ShowList = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // 데이터 가져오기 (READ)
  const fetchUsers = () => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchUsers(); // 초기 렌더링 시 데이터 가져오기
  }, []);

  // 사용자 추가 (CREATE)
  const addUser = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill out all fields.");
      return;
    }
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newUser) => {
        setUsers([...users, newUser]);
        setFormData({ name: "", email: "", phone: "", address: "" });
      });
  };

  // 사용자 수정 (UPDATE)
  const modifyUser = (id) => {
    const updatedName = prompt("Enter new name:");
    if (!updatedName) return;

    const updatedUser = { ...users.find((user) => user.id === id), name: updatedName };
    fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((modifiedUser) => {
        setUsers(users.map((user) => (user.id === id ? modifiedUser : user)));
      });
  };

  // 사용자 삭제 (DELETE)
  const deleteUser = (id) => {
    fetch(`http://localhost:3000/users/${id}`, { method: "DELETE" })
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">User List</h1>

      {/* Add User Form */}
      <div className="mb-3 d-flex justify-content-between">
        <input
          type="text"
          placeholder="Name"
          className="form-control me-2"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="form-control me-2"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="form-control me-2"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          className="form-control me-2"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
        <button className="btn btn-success" onClick={addUser}>
          Add user
        </button>
      </div>

      {/* Bring User Data Button */}
      <button className="btn btn-primary mb-3" onClick={fetchUsers}>
        Bring user data
      </button>

      {/* User Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => modifyUser(user.id)}>
                  Modify
                </button>
                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowList;
