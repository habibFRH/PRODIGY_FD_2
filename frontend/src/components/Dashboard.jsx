import React, { useState, useEffect } from "react";

// Modal Component
const Modal = ({ isOpen, onClose, onSubmit, formData, handleChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-11/12 md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">
          {formData.id ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label
              htmlFor="name"
              className="relative block rounded-md border border-gray-200 bg-white shadow-sm"
            >
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-12 w-full"
                placeholder="Name"
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white rounded-md p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Name
              </span>
            </label>
            <label
              htmlFor="username"
              className="relative block rounded-md border border-gray-200 bg-white shadow-sm"
            >
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-12 w-full"
                placeholder="Username"
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Username
              </span>
            </label>
            <label
              htmlFor="email"
              className="relative block rounded-md border border-gray-200 bg-white shadow-sm"
            >
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-12 w-full"
                placeholder="Email"
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Email
              </span>
            </label>
            <label
              htmlFor="age"
              className="relative block rounded-md border border-gray-200 bg-white shadow-sm"
            >
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-12 w-full"
                placeholder="Age"
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Age
              </span>
            </label>
            <label
              htmlFor="password"
              className="relative block rounded-md border border-gray-200 bg-white shadow-sm"
            >
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-12 w-full"
                placeholder="Password"
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Password
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring w-full"
          >
            <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
            <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
              {formData.id ? "Update User" : "Add User"}
            </span>
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    age: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users
  const fetchUsers = () => {
    fetch("http://localhost:8080/api/auth/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = formData.id ? "PUT" : "POST";
    const url = formData.id
      ? `http://localhost:8080/api/auth/user/${formData.id}`
      : "http://localhost:8080/api/auth/register";

    const payload = { ...formData };

    // Remove password from payload if it's empty
    if (!payload.password) {
      delete payload.password;
    }

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        // Check if the response is in JSON format
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json(); // Parse JSON response
        } else {
          return response.text(); // Parse as plain text
        }
      })
      .then((data) => {
        // Reset the form data
        setFormData({
          id: "",
          name: "",
          username: "",
          email: "",
          age: "",
          password: "",
        });

        // Close the modal
        setIsModalOpen(false);

        // Refresh the user list by fetching the updated list of users
        fetchUsers();

        // Optionally handle the response
        console.log("Response:", data);
      })
      .catch((error) => console.error("Error saving user:", error));
  };

  // Handle edit action
  const handleEdit = (user) => {
    setFormData(user);
    setIsModalOpen(true);
  };

  // Handle delete action
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/auth/user/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  // Open modal for adding a user
  const handleAddUser = () => {
    setFormData({
      id: "",
      name: "",
      username: "",
      email: "",
      age: "",
      password: "",
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-200">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      <div className="flex justify-end mb-6 mr-14">
        <button
          onClick={handleAddUser}
          className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 mt-6 focus:outline-none focus:ring"
        >
          <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
          <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
            Add User
          </span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-[500px] overflow-y-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-center">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Username
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Email
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Age
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="odd:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {user.username}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {user.age}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Dashboard;
