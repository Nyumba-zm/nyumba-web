import { EmptyState } from "@/components/shared/EmptyState";

/**
 * In-app messaging is parked (no backend endpoints). Enquiries go to sellers directly
 * via the WhatsApp / call / email options on each listing.
 */
export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <EmptyState
        title="Messaging isn't available yet"
        description="Contact sellers directly from any listing using WhatsApp, a phone call or email."
        actionLabel="Browse properties"
        actionHref="/properties"
      />
    </div>
  );
}
