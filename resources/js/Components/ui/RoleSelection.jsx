// resources/js/Components/Dashboard/RoleSelection.jsx

export default function RoleSelection({ role, handleRoleChange }) {
    return (
        <div className="mt-4">
            <label
                htmlFor="role"
                className="block text-gray-700 dark:text-gray-300"
            >
                Choose your role:
            </label>
            <select
                id="role"
                value={role}
                onChange={handleRoleChange}
                className="mt-1 block w-full rounded-md dark:bg-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
                <option value="Client">Client</option>
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
            </select>
            <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Selecting a role will change your permissions.
                </span>
            </div>
        </div>
    );
}
