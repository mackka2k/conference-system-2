// resources/js/Pages/ViewConferences.jsx

import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function ViewConferences({ conferences, role: initialRole }) {
    const [role, setRole] = useState(
        localStorage.getItem("role") || initialRole
    );
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showUsers, setShowUsers] = useState(false);

    const handleRoleChange = (event) => {
        setRole(event.target.value);
        localStorage.setItem("role", event.target.value); // save the role in localStorage
    };

    const handleRegister = async (conferenceId) => {
        try {
            await axios.post(route("conferences.register", conferenceId));
            alert("Registered successfully!");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message);
            } else {
                console.error("Error registering:", error);
                alert("An error occurred while registering. Please try again.");
            }
        }
    };

    const handleDelete = async (conferenceId) => {
        if (confirm("Are you sure you want to delete this conference?")) {
            try {
                const response = await axios.delete(
                    route("conferences.destroy", conferenceId)
                );
                alert(response.data.message);
                window.location.reload();
            } catch (error) {
                console.error("Error deleting conference:", error);
                alert("An error occurred while deleting the conference.");
            }
        }
    };

    const handleGetAllUsers = async () => {
        if (showUsers) {
            setShowUsers(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(route("admin.getAllUsers"));
            setUsers(response.data);
            setShowUsers(true);
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("An error occurred while fetching users.");
        } finally {
            setLoading(false);
        }
    };

    const filteredConferences = conferences.filter((conference) => {
        if (role === "Client") {
            return conference.status === "Scheduled";
        } else if (role === "Employee") {
            return (
                conference.status === "Scheduled" ||
                conference.status === "Completed"
            );
        }
        return true;
    });

    return (
        <>
            <Head title="Conferences" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mt-4 mb-8">
                                <h3 className="text-lg font-bold">
                                    List of Conferences
                                </h3>
                                {role === "Admin" && (
                                    <Link
                                        href={route("conferences.create")}
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
                                    >
                                        Create Conference
                                    </Link>
                                )}
                            </div>
                            <div className="flex items-center mb-4">
                                <label htmlFor="role" className="mr-2">
                                    Select Role:
                                </label>
                                <select
                                    id="role"
                                    value={role}
                                    onChange={handleRoleChange}
                                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded p-2"
                                >
                                    <option value="Client">Client</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            {filteredConferences.length > 0 ? (
                                <ul className="space-y-4">
                                    {filteredConferences.map((conference) => (
                                        <li
                                            key={conference.id}
                                            className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <span className="font-semibold text-lg">
                                                        {conference.name}
                                                    </span>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {conference.date ||
                                                            "Date not available"}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                        conference.status ===
                                                        "Scheduled"
                                                            ? "bg-blue-500 text-white"
                                                            : conference.status ===
                                                              "Completed"
                                                            ? "bg-green-500 text-white"
                                                            : "bg-red-500 text-white"
                                                    }`}
                                                >
                                                    {conference.status}
                                                </span>
                                            </div>
                                            <div className="mt-4 flex space-x-2">
                                                {conference.status ===
                                                    "Scheduled" && (
                                                    <button
                                                        onClick={() =>
                                                            handleRegister(
                                                                conference.id
                                                            )
                                                        }
                                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded"
                                                    >
                                                        Register to Conference
                                                    </button>
                                                )}
                                                {(role === "Employee" ||
                                                    role === "Admin") && (
                                                    <Link
                                                        href={route(
                                                            "conferences.registeredUsers",
                                                            conference.id
                                                        )}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                                                    >
                                                        Check Registered Users
                                                    </Link>
                                                )}
                                                {role === "Admin" && (
                                                    <>
                                                        <Link
                                                            href={route(
                                                                "conferences.edit",
                                                                conference.id
                                                            )}
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    conference.id
                                                                )
                                                            }
                                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No conferences available.</p>
                            )}
                            {role === "Admin" && (
                                <div className="mt-4">
                                    <button
                                        onClick={handleGetAllUsers}
                                        className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Loading..."
                                            : "Get All Users"}
                                    </button>
                                    {showUsers && users.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="font-semibold text-lg">
                                                All Users
                                            </h4>
                                            <ul className="space-y-4">
                                                {users.map((user) => (
                                                    <li
                                                        key={user.id}
                                                        className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm"
                                                    >
                                                        <div>
                                                            <span className="font-semibold text-lg">
                                                                {user.name}
                                                            </span>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                {user.email}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
