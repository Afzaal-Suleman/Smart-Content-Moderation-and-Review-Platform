"use client";

import { useQuery } from "@apollo/client/react";
import { CONTENTS_QUERY_ID } from "@/gql/view-contents-query";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Phone } from "lucide-react";

export default function ViewContentsPage() {
    const { isAuthenticated } = useSelector((state: any) => state.auth);
    // const userId = user?.id;

    console.log(isAuthenticated, "userid");

    const { data, loading, error } = useQuery<any>(CONTENTS_QUERY_ID, {
        fetchPolicy: "network-only",
        nextFetchPolicy: "network-only",
    });
    console.log(error, "error");

    const router = useRouter();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading content...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">Failed to load content</p>
            </div>
        );
    }

    const contents = data?.contentByUser ?? [];

    if (contents.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">No content found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">
                    Your Content
                </h1>

            </div>


            <div className="space-y-6">
                {contents.map((item: any) => (
                    <div
                        key={item.id}
                        className="bg-white border rounded-lg shadow-sm p-6"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {item.title}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Type: {item.contentType} · Priority: {item.priority}
                                </p>
                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : item.status === "rejected"
                                        ? "bg-red-100 text-red-700"
                                        : item.status === "needs_review"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                            >
                                {item.status}
                            </span>
                        </div>

                        {/* Description */}
                        {item.description && (
                            <p className="mt-3 text-gray-700">{item.description}</p>
                        )}

                        {/* Content URL */}
                        <div className="mt-3">
                            <a
                                href={item.contentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                View Content
                            </a>
                        </div>

                        {/* Review Info */}
                        {(item.reviewComments || item.rejectionReason) && (
                            <div className="mt-4 bg-gray-50 p-3 rounded-md">
                                {item.reviewComments && (
                                    <p className="text-sm text-green-700">
                                        <strong>Review Notes:</strong> {item.reviewComments}
                                    </p>
                                )}
                                {item.rejectionReason && (
                                    <p className="text-sm text-red-700">
                                        <strong>Rejection:</strong> {item.rejectionReason}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Meta */}
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <p>
                                    <strong>Submitted By:</strong>{" "}
                                    {item.submittedBy.username} ({item.submittedBy.email})
                                </p>
                                <p className="flex items-center gap-2 text-gray-600">
                                    <Phone className="w-4 h-4 text-gray-500" />
                                    {item.submittedBy.phonenumber}
                                </p>
                                <p>
                                    <strong>Submitted:</strong>{" "}
                                    {new Date(item.submittedAt).toLocaleString()}
                                </p>
                            </div>

                            {/* <div>
                                {item.assignedModerator ? (
                                    <>
                                        <p>
                                            <strong>Moderator:</strong>{" "}
                                            {item.assignedModerator.username}
                                        </p>
                                        <p>{item.assignedModerator.email}</p>
                                        <p className="flex items-center gap-2 text-gray-600">
                                            <Phone className="w-4 h-4 text-gray-500" />
                                            {item.submittedBy.phonenumber}
                                        </p>
                                        {item.reviewedAt && (
                                            <p>
                                                <strong>Reviewed:</strong>{" "}
                                                {new Date(item.reviewedAt).toLocaleString()}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <p className="italic text-gray-400">
                                        Not yet assigned to a moderator
                                    </p>
                                )}
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
