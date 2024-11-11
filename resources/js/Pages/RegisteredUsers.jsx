// resources/js/Pages/RegisteredUsers.jsx

import { Head, Link } from "@inertiajs/react";

export default function RegisteredUsers({ conference, registeredUsers }) {
    return (
        <>
            <Head title={`${conference.name} - Registered Users`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                Registered Users for {conference.name}
                            </h2>
                            <div className="mt-4">
                                {registeredUsers.length > 0 ? (
                                    <ul>
                                        {registeredUsers.map((user, index) => (
                                            <li key={user.id} className="py-1">
                                                {index + 1}. {user.name}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>
                                        No users are registered for this
                                        conference.
                                    </p>
                                )}
                            </div>
                            <div className="mt-4">
                                <Link
                                    href={route("conferences.index")}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                >
                                    Back to Conferences
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
