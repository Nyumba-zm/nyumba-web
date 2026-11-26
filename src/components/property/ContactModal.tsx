"use client";

import { useEffect } from "react";
import type { PropertyDetail } from "@/types/property";
import { formatPhoneNumber } from "@/lib/utils/format";
import { buildWhatsAppEnquiryLink, listingUrl } from "@/lib/utils/property";
import { Button } from "@/components/ui/Button";

interface ContactModalProps {
  property: PropertyDetail;
  onClose: () => void;
}

/**
 * Seller contact options from GET /properties/{id}. Nyumba has no in-app messaging
 * (parked), so enquiries go straight to the seller by WhatsApp, phone or email.
 */
export function ContactModal({ property, onClose }: ContactModalProps) {
  const { seller } = property;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const whatsAppHref = seller.whatsappLink
    ? buildWhatsAppEnquiryLink(seller.whatsappLink, property, listingUrl(property.id))
    : undefined;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-seller-title"
        className="bg-white rounded-lg max-w-md w-full p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 id="contact-seller-title" className="text-2xl font-bold text-gray-900 mb-1">
              Contact {seller.name}
            </h2>
            <p className="text-gray-600 text-sm">About: {property.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-600"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {whatsAppHref && (
            <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white" size="lg">
                Chat on WhatsApp
              </Button>
            </a>
          )}
          {seller.phone && (
            <a href={`tel:${seller.phone}`} className="block">
              <Button variant="outline" className="w-full" size="lg">
                Call {formatPhoneNumber(seller.phone)}
              </Button>
            </a>
          )}
          <a
            href={`mailto:${seller.email}?subject=${encodeURIComponent(property.title)}`}
            className="block"
          >
            <Button variant="outline" className="w-full" size="lg">
              Email {seller.email}
            </Button>
          </a>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Nyumba never charges viewing fees. Don&apos;t pay anyone to view a property.
        </p>
      </div>
    </div>
  );
}
