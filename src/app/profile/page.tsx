"use client";

import { AuthGuard } from "@/components/auth";
import { useCurrentUser } from "@/lib/hooks";
import { useAuthStore } from "@/store/authStore";
import { formatPhoneNumber } from "@/lib/utils/format";
import { USER_ROLE_LABELS } from "@/types/user";

function ProfileRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-3 border-b last:border-b-0">
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-medium text-gray-900">{value}</dd>
    </div>
  );
}

function ProfileContent() {
  // Refreshes the stored user from GET /auth/me; renders the cached copy meanwhile.
  const { isFetching } = useCurrentUser();
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-600 mt-1">
            {isFetching ? "Refreshing…" : "Account details"}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-600">
              {user.firstName[0]?.toUpperCase() ?? "U"}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.fullName}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className="inline-block mt-1 px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded">
              {USER_ROLE_LABELS[user.role]}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <dl className="text-sm">
            <ProfileRow label="First name" value={user.firstName} />
            <ProfileRow label="Last name" value={user.lastName} />
            <ProfileRow label="Email" value={user.email} />
            <ProfileRow
              label="Phone"
              value={user.phone ? formatPhoneNumber(user.phone) : "Not provided"}
            />
            <ProfileRow
              label="Verified"
              value={
                <span className={user.isVerified ? "text-green-600" : "text-yellow-600"}>
                  {user.isVerified ? "Verified" : "Not verified"}
                </span>
              }
            />
          </dl>
          <p className="mt-4 text-xs text-gray-500">
            Editing your profile and changing your password aren&apos;t available yet.
          </p>
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
