"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { signupSchema, SignupFormData } from "@/schema/signupSchema";
import toast from "react-hot-toast";
const SIGNUP_MUTATION = gql`
 mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    success
    user {
      id
      username
      email
      phonenumber
    }
  }
}
`;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql';

export default function SignupPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            phoneNumber: "+92"
        }
    });
    const [signUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION);
    
    const onSubmit = async (data: SignupFormData) => {
        
        try {
            const result:any = await signUp({
                variables: {
                    input: {
                        username: data.userName,
                        email: data.email,
                        phonenumber: data.phoneNumber,
                        password: data.password,
                    },
                },
            });
            if (result.data.signUp.success) {
                toast.success("Signup successful!");
                reset();
            }
        } catch (error: any) {
            toast.error(`Signup failed: ${error?.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2> */}
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already a member?{" "}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Sign in here
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-2xl rounded-lg sm:px-10 border border-gray-200">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* User Name Field */}
                        <div>
                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                                User Name *
                            </label>
                            <div className="mt-1">
                                <input
                                    id="userName"
                                    type="text"
                                    placeholder="Type User Name"
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.userName ? "border-red-300" : "border-gray-300"
                                        }`}
                                    {...register("userName")}
                                />
                            </div>
                            {errors.userName && (
                                <p className="mt-1 text-sm text-red-600">{errors.userName.message}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address *
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Example@gmail.com"
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.email ? "border-red-300" : "border-gray-300"
                                        }`}
                                    {...register("email")}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Phone Number Field */}
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                Phone Number *
                            </label>
                            <div className="mt-1">
                                <input
                                    id="phoneNumber"
                                    type="tel"
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.phoneNumber ? "border-red-300" : "border-gray-300"
                                        }`}
                                    {...register("phoneNumber")}
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">Format: +[country code][number]</p>
                            {errors.phoneNumber && (
                                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password *
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Please use characters & symbols"
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.password ? "border-red-300" : "border-gray-300"
                                        }`}
                                    {...register("password")}
                                />
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                Must contain: uppercase, lowercase, number, and special character
                            </p>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password *
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Please use characters & symbols"
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.confirmPassword ? "border-red-300" : "border-gray-300"
                                        }`}
                                    {...register("confirmPassword")}
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    "Next"
                                )}
                            </button>
                        </div>
                    </form>

                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        By signing up, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}