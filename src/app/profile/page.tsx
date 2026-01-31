"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthGuard } from "@/components/auth";
import { useAuthStore } from "@/store/authStore";
import { useUpdateProfile, useChangePassword } from "@/lib/hooks";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  updateProfileSchema,
  changePasswordSchema,
  type UpdateProfileFormData,
  type ChangePasswordFormData,
} from "@/lib/validations/authSchemas";
import { USER_ROLE_LABELS } from "@/types/user";

function ProfileContent() {
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  // Profile form
  const profileForm = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
    },
  });

  // Password form
  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onProfileSubmit = (data: UpdateProfileFormData) => {
    updateProfile.mutate(data, {
      onSuccess: () => {
        addToast("Profile updated successfully", "success");
      },
      onError: (error) => {
        const message =
          error instanceof Error ? error.message : "Failed to update profile";
        addToast(message, "error");
      },
    });
  };

  const onPasswordSubmit = (data: ChangePasswordFormData) => {
    changePassword.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          addToast("Password changed successfully", "success");
          passwordForm.reset();
        },
        onError: (error) => {
          const message =
            error instanceof Error ? error.message : "Failed to change password";
          addToast(message, "error");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-primary-600">
                  {user?.firstName?.[0]?.toUpperCase() || "U"}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {user?.fullName || user?.email}
              </h2>
              <p className="text-gray-500">{user?.email}</p>
              <span className="inline-block mt-1 px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded">
                {USER_ROLE_LABELS[user?.role || "buyer"]}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === "profile"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === "password"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Change Password
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "profile" ? (
              <form
                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      {...profileForm.register("firstName")}
                      error={profileForm.formState.errors.firstName?.message}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      {...profileForm.register("lastName")}
                      error={profileForm.formState.errors.lastName?.message}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+260971234567"
                    {...profileForm.register("phone")}
                    error={profileForm.formState.errors.phone?.message}
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={updateProfile.isPending}
                  >
                    {updateProfile.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            ) : (
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-4 max-w-md"
              >
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Current Password
                  </label>
                  <Input
                    id="currentPassword"
                    type="password"
                    {...passwordForm.register("currentPassword")}
                    error={passwordForm.formState.errors.currentPassword?.message}
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password
                  </label>
                  <Input
                    id="newPassword"
                    type="password"
                    {...passwordForm.register("newPassword")}
                    error={passwordForm.formState.errors.newPassword?.message}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    At least 8 characters with uppercase, lowercase, and number
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirmNewPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <Input
                    id="confirmNewPassword"
                    type="password"
                    {...passwordForm.register("confirmNewPassword")}
                    error={passwordForm.formState.errors.confirmNewPassword?.message}
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={changePassword.isPending}
                  >
                    {changePassword.isPending ? "Changing..." : "Change Password"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Account Information
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Account Type</span>
              <span className="font-medium text-gray-900">
                {USER_ROLE_LABELS[user?.role || "buyer"]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email Verified</span>
              <span
                className={`font-medium ${
                  user?.isVerified ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {user?.isVerified ? "Verified" : "Not Verified"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Member Since</span>
              <span className="font-medium text-gray-900">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
