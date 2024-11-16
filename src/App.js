import React, { useState } from "react";
import UserList from "./components/UserList";
import Modal from "./components/Modal";
import UserForm from "./components/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // 사용자 추가
  const handleAddUser = (user) => {
    setUsers([...users, { ...user, id: Date.now().toString() }]);
    setShowModal(false);
  };

  // 사용자 삭제
  const handleDeleteUser = () => {
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setShowModal(false);
  };

  // 사용자 수정
  const handleEditUser = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h1>User Management</h1>
      <UserForm
        onSubmit={(user) => {
          setModalType("add");
          setSelectedUser(user);
          setShowModal(true);
        }}
      />
      <UserList
        users={users}
        onEdit={(user) => {
          setModalType("edit");
          setSelectedUser(user);
          setShowModal(true);
        }}
        onDelete={(user) => {
          setModalType("delete");
          setSelectedUser(user);
          setShowModal(true);
        }}
      />
      <Modal
        show={showModal}
        type={modalType}
        user={selectedUser}
        onAdd={handleAddUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default App;
