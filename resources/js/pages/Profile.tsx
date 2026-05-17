import { Link, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

interface Props {
  user: User;
}

export default function Profile({ user }: Props): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const { data, setData, patch, errors, processing, reset } = useForm({
    name: user.name,
    email: user.email,
  });
  
  console.log(isEditing);

  useEffect(() => {
    setData({
      name: user.name,
      email: user.email,
    });
  }, [user.name, user.email]);

 /*  useEffect(() => {
    if (isEditing && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditing]); */

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch('/profile', {
      onSuccess: () => setIsEditing(false),
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setData({
      name: user.name,
      email: user.email,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              User Profile
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Welcome back, <span className="font-semibold">{user.name}</span>
            </p>
          </div>
          <Link href="/" className="text-blue-600 hover:text-blue-500 transition text-sm font-medium">
            Back to home
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {/* User Avatar Section */}
          <div className="flex items-center mb-8 pb-8 border-b border-slate-200">
            <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-slate-600 mt-1">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Profile Information Grid */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              {/* User ID - Read Only */}
              {!isEditing && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    User ID
                  </label>
                  <div className="bg-slate-50 rounded-lg px-4 py-3 text-slate-900 font-mono text-sm">
                    {user.id}
                  </div>
                </div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <>
                    <input
                      id="name"
                      type="text"
                      ref={nameInputRef}
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition outline-none"
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </>
                ) : (
                  <div className="bg-slate-50 rounded-lg px-4 py-3 text-slate-900">
                    {user.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <>
                    <input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition outline-none"
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </>
                ) : (
                  <div className="bg-slate-50 rounded-lg px-4 py-3 text-slate-900">
                    {user.email}
                  </div>
                )}
              </div>

              {/* Member Since - Read Only */}
              {!isEditing && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Member Since
                  </label>
                  <div className="bg-slate-50 rounded-lg px-4 py-3 text-slate-900">
                    {formatDate(user.created_at)}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {isEditing ? (
                <>
                  <button
                    type="submit"
                    disabled={processing}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-600/50 disabled:opacity-50"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-2.5 px-4 rounded-lg transition border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={(e) => {e.preventDefault();  setIsEditing(true)}}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-600/50"
                  >
                    Edit Profile
                  </button>
                  <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 px-4 rounded-lg transition border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  >
                    Logout
                  </Link>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Note:</span> Your profile information is secure and visible only to you.
          </p>
        </div>
      </div>
    </div>
  );
}
