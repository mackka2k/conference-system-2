// resources/js/Pages/CreateConference.jsx

import { Head, Link, useForm } from "@inertiajs/react";

export default function CreateConference() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        date: "",
        status: "Scheduled",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("conferences.store"));
    };

    return (
        <>
            <Head title="Create Conference" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                                Create a New Conference
                            </h2>
                            <form onSubmit={handleSubmit} className="mt-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Conference Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) =>
                                            setData("date", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                    />
                                    {errors.date && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.date}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Status
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                    >
                                        <option value="Scheduled">
                                            Scheduled
                                        </option>
                                        <option value="Completed">
                                            Completed
                                        </option>
                                        <option value="Canceled">
                                            Canceled
                                        </option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Creating..."
                                        : "Create Conference"}
                                </button>
                            </form>
                            <div className="mt-4">
                                <Link
                                    href={route("conferences.index")}
                                    className="text-blue-500 hover:underline"
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
