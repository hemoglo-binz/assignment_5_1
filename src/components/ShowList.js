import React, { useState, useEffect } from "react";

const ShowList = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // MockAPI URL
  const mockApiUrl = "https://67288605270bd0b97555ef13.mockapi.io/sample";

  // Fetch all users from MockAPI
  const fetchUsers = () => {
    fetch(mockApiUrl)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add a new user
  const addUser = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill out all fields.");
      return;
    }
    fetch(mockApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newUser) => {
        setUsers([...users, newUser]);
        setFormData({ name: "", email: "", phone: "", address: "" });
      })
      .catch((error) => console.error("Error adding user:", error));
  };

  // Modify an existing user
  const modifyUser = (id) => {
    const updatedName = prompt("Enter new name:");
    if (!updatedName) return;

    const updatedUser = { ...users.find((user) => user.id === id), name: updatedName };
    fetch(`${mockApiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((modifiedUser) => {
        setUsers(users.map((user) => (user.id === id ? modifiedUser : user)));
      })
      .catch((error) => console.error("Error modifying user:", error));
  };

  // Delete a user
  const deleteUser = (id) => {
    fetch(`${mockApiUrl}/${id}`, { method: "DELETE" })
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">User List</h1>

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

      <button className="btn btn-primary mb-3" onClick={fetchUsers}>
        Bring user data
      </button>

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
