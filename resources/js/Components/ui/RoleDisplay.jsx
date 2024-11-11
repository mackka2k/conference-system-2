// resources/js/Components/Dashboard/RoleDisplay.jsx

export default function RoleDisplay({ role }) {
    return (
        <p>
            You're logged in as a{" "}
            <span className="text-green-500 font-semibold">{role}</span>!
        </p>
    );
}
