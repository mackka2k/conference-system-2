// resources/js/Pages/Dashboard.jsx

import { Head, Link } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                Dashboard
                            </h2>
                            <p>Welcome to your dashboard!</p>

                            {/* View Conferences Button */}
                            <div className="mt-4">
                                <Link
                                    href={route("conferences.index")}
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                                >
                                    View Conferences
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
