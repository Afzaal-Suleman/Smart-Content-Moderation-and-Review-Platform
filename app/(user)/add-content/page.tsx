"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { contentSchema, ContentFormData } from "@/schema/contentSchema";
import { CREATE_CONTENT_MUTATION } from "@/gql/create-content";
import { CONTENTS_QUERY } from "@/gql/view-contents-query";
import { useEffect } from "react";
import toast from 'react-hot-toast';

const LOCAL_STORAGE_KEY = "draftContent";

export default function Page() {
  const router = useRouter();

  const [createContent, { loading }] = useMutation(CREATE_CONTENT_MUTATION, {
    refetchQueries: [{ query: CONTENTS_QUERY }],
  });

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      priority: "medium",
    },
  });

  // Load draft from localStorage on mount
  useEffect(() => {
    const draft = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (draft) {
      const draftData: ContentFormData = JSON.parse(draft);
      Object.keys(draftData).forEach((key) => {
        // @ts-ignore
        setValue(key, draftData[key]);
      });
    }
  }, [setValue]);

  // Save draft to localStorage
  const handleSaveDraft = () => {
    const formData = getValues();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    toast.success("Draft saved locally! You can continue editing later.");
  };

  const onSubmit = async (data: ContentFormData) => {
    try {
      const res: any = await createContent({
        variables: {
          input:data,
        },
      });

      if (res.data?.submitContent?.success) {
        toast.success("Content submitted for review successfully!");
        localStorage.removeItem(LOCAL_STORAGE_KEY); // clear draft
        reset();
        router.push("/my-content");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit content");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4 text-gray-800">
      <div className="w-full bg-white shadow-lg rounded-lg p-8 lg:p-12 max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Submit Content for Review
        </h2>

        <form
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium">Title *</label>
            <input
              className="text-gray-800 mt-1 w-full border rounded-md px-3 py-2"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium">Content Type *</label>
            <select
              className="mt-1 w-full border rounded-md px-3 py-2"
              {...register("contentType")}
            >
              <option value="">Select type</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="text">Text</option>
              <option value="audio">Audio</option>
              <option value="document">Document</option>
            </select>
            {errors.contentType && (
              <p className="text-sm text-red-600">{errors.contentType.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              rows={3}
              className="mt-1 w-full border rounded-md px-3 py-2"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Content URL */}
          <div>
            <label className="block text-sm font-medium">Content URL *</label>
            <input
              className="mt-1 w-full border rounded-md px-3 py-2"
              {...register("contentUrl")}
            />
            {errors.contentUrl && (
              <p className="text-sm text-red-600">{errors.contentUrl.message}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              className="mt-1 w-full border rounded-md px-3 py-2"
              {...register("priority")}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 lg:col-span-2">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-md
               text-gray-700 hover:bg-gray-100 transition"
            >
              Save as Draft
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md
               hover:bg-blue-700 transition"
            >
              Submit for Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
