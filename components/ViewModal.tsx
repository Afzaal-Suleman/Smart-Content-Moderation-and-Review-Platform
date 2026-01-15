"use client";

import { useQuery } from "@apollo/client/react";
import { GET_CONTENT_BY_ID } from "@/gql/view-contents-query";
import { X, ExternalLink, Calendar, User, AlertCircle, Clock, CheckCircle, XCircle } from "lucide-react";

interface ContentModalProps {
  contentId: string;
  onClose: () => void;
}

export default function ViewContentModal({ contentId, onClose }: ContentModalProps) {
  const { data, loading, error } = useQuery<any>(GET_CONTENT_BY_ID, {
    variables: { contentId: contentId },
    fetchPolicy: "network-only",
  });

  // Status styling configuration
  const statusConfig = {
    PENDING: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
    APPROVED: { color: "bg-green-100 text-green-800", icon: CheckCircle },
    REJECTED: { color: "bg-red-100 text-red-800", icon: XCircle },
    UNDER_REVIEW: { color: "bg-blue-100 text-blue-800", icon: AlertCircle },
  };

  // Priority styling configuration
  const priorityConfig = {
    HIGH: "bg-red-50 text-red-700 border-red-200",
    MEDIUM: "bg-yellow-50 text-yellow-700 border-yellow-200",
    LOW: "bg-green-50 text-green-700 border-green-200",
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 font-medium">Loading content details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Error Loading Content</h3>
            <p className="text-gray-600 text-center">{error.message}</p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const content = data.content;
  const StatusIcon = statusConfig[content.status as keyof typeof statusConfig]?.icon || AlertCircle;
  const statusColor = statusConfig[content.status as keyof typeof statusConfig]?.color || "bg-gray-100 text-gray-800";
  const priorityClass = priorityConfig[content.priority as keyof typeof priorityConfig] || "bg-gray-50 text-gray-700";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-gray-50 to-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 line-clamp-1">{content.title}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor} flex items-center gap-1.5`}>
                  <StatusIcon className="h-4 w-4" />
                  {content.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityClass}`}>
                  {content.priority} Priority
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
              Description
            </h3>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
              {content.description}
            </p>
          </div>

          {/* Content URL */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
              Content URL
            </h3>
            <a
              href={content.contentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="truncate max-w-xs">{content.contentUrl}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Type */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Content Type</p>
              <p className="font-medium text-gray-900">{content.contentType}</p>
            </div>

            {/* Submitted By */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                Submitted By
              </p>
              <p className="font-medium text-gray-900">
                {content.submittedBy.username} <span className="text-gray-500 text-sm">({content.submittedBy.role})</span>
              </p>
            </div>
          </div>

          {/* Assigned Moderator */}
          {content.assignedModerator && (
            <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-600 font-medium mb-1">Assigned Moderator</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{content.assignedModerator.username}</p>
                  <p className="text-sm text-gray-600">Responsible for review</p>
                </div>
              </div>
            </div>
          )}

          {/* Review Comments */}
          {content.reviewComments && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Review Comments</h3>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-gray-700">{content.reviewComments}</p>
              </div>
            </div>
          )}

          {/* Rejection Reason */}
          {content.rejectionReason && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 text-red-600">Rejection Reason</h3>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-red-700">{content.rejectionReason}</p>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Submitted At</span>
                <span className="font-medium text-gray-900">
                  {new Date(Number(content.submittedAt)).toLocaleString()}
                </span>
              </div>
              {content.reviewedAt && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Reviewed At</span>
                  <span className="font-medium text-gray-900">
                    {new Date(Number(content.reviewedAt)).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}