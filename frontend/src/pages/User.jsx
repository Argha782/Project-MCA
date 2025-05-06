import React, { useEffect, useState } from "react";
import API from "../services/api.js";
import { FaEdit, FaTrash } from "react-icons/fa";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "vendor",
  });
  // const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // console.log("Fetching users...");
        const res = await API.get("/users");
        // console.log("Users data:", res.data);
        const users = res.data.data; //  Get actual Users list

        console.log("Users data: ", users);
        if (!Array.isArray(users)) {
          throw new Error("Invalid data format received from API");
        }
        setUsers(users);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        alert("Error loading users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers().catch((err) => {
      console.error("Unhandled error in fetchUsers:", err);
    });
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "vendor",
    });
  };

  const validateUser = () => {
    if (!newUser.password || newUser.password.length < 6) {
      alert("User password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  // Add new User to the list
  const addUser = async () => {
    const isValid = validateUser();
    if (!isValid) return;

    try {
      // const formData = new FormData();

      // Object.entries(newUser).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });

      // for (var pair of formData.entries()) {
      //   console.log(`${pair[0]}: ${pair[1]}`);
      // }

      // const res = await API.post("/users", formData);
      const res = await API.post("/users", newUser);
      setUsers([...users, res.data]);
      setShowForm(false); // Hide the form after adding
      resetForm();
    } catch (err) {
      console.error("Error adding user", err);
      alert("Failed to add user");
    }
  };

  // Function to save the edited User

  const saveEditedUser = async () => {
    const isValid = validateUser();
    if (!isValid) return;

    try {
      //  Build FormData exactly like in addUser
      // const formData = new FormData();

      // Object.entries(newUser).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });

      // documentFile.forEach((file) => {
      //   formData.append("documents", file);
      // });


      const res = await API.put(`/users/${editId}`, newUser);
      
       //  Update local list using the returned record
       setUsers((prev) =>
        prev.map((u) => (u._id === editId ? res.data.data : u))
      );

      //  Reset UI state
      setEditMode(false);
      setShowForm(false);
      resetForm();
    } catch (err) {
      console.error("Error updating user", err);
      alert("Failed to update user");
    }
  };

  // Function to edit a User
  const editUser = (user) => {
    setEditMode(true);
    setEditId(user._id);
    setNewUser(user);
    setShowForm(true);
  };

  // const handleEdit = (user) => {
  //   setEditId(user);
  //   setNewUser({
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     password: "", // leave blank
  //     role: user.role,
  //   });
  // };

  // Function to delete
  const deleteUser = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${_id}`);
      alert("User deleted.");
      setUsers(users.filter((user) => user._id !== _id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting user.");
    }
  };

  // Filter
  const filteredUsers = users.filter((user) =>
    [user.firstName,user.lastName, user.email].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      {/* Add and Edit User Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setShowForm(!showForm);
          setEditMode(false); // Reset edit mode when canceling
          resetForm();
          setSearch(""); // Clear search bar when toggling form
        }}
      >
        {showForm ? "Cancel" : "+ Add User"}
      </button>

      {/* Add User Form */}
      {showForm && (
        <div className="bg-gray-100 p-4 rounded mb-2">
          <h2 className="text-xl font-semibold mb-2">
            {editMode ? "Edit User" : "New User"}
          </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          name="firstName"
          value={newUser.firstName}
          onChange={handleInputChange}
          required
          placeholder="First Name"
          className="border p-2 rounded"
        />
        <input
          name="lastName"
          value={newUser.lastName}
          onChange={handleInputChange}
          required
          placeholder="Last Name"
          className="border p-2 rounded"
        />
        <input
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          required
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
       
        <input
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            required
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
        />
        
        <select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
          required
          className="border p-2 rounded"
        >
          <option value="vendor">Vendor</option>
          <option value="tenderowner">Tender Owner</option>
        </select>
      </div>
      <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={editMode ? saveEditedUser : addUser}
          >
            {editMode ? "Save Changes" : "Save User"}
          </button>
      </div>
    )}
      
      {/* Search */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 ml-5 p-2 border rounded w-full md:w-1/2"
      />

      {/* Users Display */}
      {loading ? (
        <p className="p-5 text-center text-2xl">Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="border p-4 rounded shadow bg-white relative"
            >
              <h2 className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="mt-2">
                Role:{" "}
                <span
                  className={`inline-block px-2 py-1 rounded text-white text-xs ${
                    user.role === "tenderowner"
                      ? "bg-blue-600"
                      : user.role === "vendor"
                      ? "bg-green-600"
                      : "bg-gray-400"
                  }`}
                >
                  {user.role === "tenderowner"
                    ? "Tender Owner"
                    : user.role === "vendor"
                    ? "Vendor"
                    : "Super Admin"}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Registered: {new Date(user.createdAt).toLocaleDateString()}
              </p>

              {/* Actions */}
              <div className="absolute top-2 right-2 space-x-2">
                <button
                  onClick={() => editUser(user)}
                  className="text-blue-600 hover:underline text-2xl"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="text-red-600 hover:underline text-2xl"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default User;
