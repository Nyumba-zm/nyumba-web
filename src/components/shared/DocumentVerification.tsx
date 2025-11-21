"use client";

import { useState } from "react";

interface Document {
  id: string;
  name: string;
  type: string;
  status: "pending" | "uploading" | "verifying" | "verified" | "failed";
  icon: string;
  checks: string[];
}

export function DocumentVerification() {
  const [currentDoc, setCurrentDoc] = useState(-1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "National ID",
      type: "Identity Verification",
      status: "pending",
      icon: "🪪",
      checks: [
        "Document authenticity verified",
        "Photo matches facial recognition",
        "ID number validated with RTSA",
        "Expiry date checked",
      ],
    },
    {
      id: "2",
      name: "Title Deed",
      type: "Property Ownership",
      status: "pending",
      icon: "📜",
      checks: [
        "Document authenticity confirmed",
        "Land registry cross-reference",
        "Ownership chain validated",
        "Encumbrances checked",
      ],
    },
    {
      id: "3",
      name: "Proof of Address",
      type: "Residence Confirmation",
      status: "pending",
      icon: "🏠",
      checks: [
        "Utility bill verified",
        "Address matches ID",
        "Recent document (< 3 months)",
        "Provider confirmed",
      ],
    },
    {
      id: "4",
      name: "Bank Statement",
      type: "Financial Verification",
      status: "pending",
      icon: "🏦",
      checks: [
        "Bank logo authenticated",
        "Account holder verified",
        "Statement period validated",
        "Sufficient funds confirmed",
      ],
    },
  ]);

  const startVerification = () => {
    setIsVerifying(true);
    setCurrentDoc(-1);
    setDocuments((prev) =>
      prev.map((doc) => ({ ...doc, status: "pending" as const }))
    );

    let docIndex = 0;
    const processNextDoc = () => {
      if (docIndex >= documents.length) {
        setIsVerifying(false);
        return;
      }

      setCurrentDoc(docIndex);

      // Uploading
      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((doc, idx) =>
            idx === docIndex ? { ...doc, status: "uploading" as const } : doc
          )
        );
      }, 300);

      // Verifying
      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((doc, idx) =>
            idx === docIndex ? { ...doc, status: "verifying" as const } : doc
          )
        );
      }, 1500);

      // Verified
      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((doc, idx) =>
            idx === docIndex ? { ...doc, status: "verified" as const } : doc
          )
        );

        docIndex++;
        processNextDoc();
      }, 4000);
    };

    processNextDoc();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "border-green-500 bg-green-50";
      case "verifying":
        return "border-primary-500 bg-primary-50";
      case "uploading":
        return "border-blue-500 bg-blue-50";
      case "failed":
        return "border-red-500 bg-red-50";
      default:
        return "border-gray-300 bg-white";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full flex items-center gap-1">
            ✓ Verified
          </span>
        );
      case "verifying":
        return (
          <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full flex items-center gap-1 animate-pulse">
            🔄 Verifying...
          </span>
        );
      case "uploading":
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full flex items-center gap-1">
            ⬆️ Uploading...
          </span>
        );
      case "failed":
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full flex items-center gap-1">
            ✗ Failed
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-semibold rounded-full">
            Pending
          </span>
        );
    }
  };

  const allVerified = documents.every((doc) => doc.status === "verified");

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-8 shadow-lg">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-3">
          Document Verification Process
        </h3>
        <p className="text-gray-600">
          See how we verify documents using AI and blockchain technology
        </p>
      </div>

      {!isVerifying && !allVerified && (
        <div className="text-center py-12">
          <div className="text-6xl mb-6">🔒</div>
          <p className="text-gray-600 mb-6 text-lg">
            Watch AI-powered document verification in action
          </p>
          <button
            onClick={startVerification}
            className="px-8 py-4 text-black rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Start Verification Demo
          </button>
        </div>
      )}

      {(isVerifying || allVerified) && (
        <div className="space-y-6">
          {documents.map((doc, index) => (
            <div
              key={doc.id}
              className={`border-2 rounded-xl p-6 transition-all duration-500 ${getStatusColor(
                doc.status
              )} ${currentDoc === index ? "ring-4 ring-primary-200" : ""}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{doc.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {doc.name}
                    </h4>
                    <p className="text-sm text-gray-600">{doc.type}</p>
                  </div>
                </div>
                <div>{getStatusBadge(doc.status)}</div>
              </div>

              {/* Progress Bar */}
              {(doc.status === "uploading" || doc.status === "verifying") && (
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        doc.status === "uploading"
                          ? "bg-blue-500 w-1/3"
                          : "bg-primary-500 w-full animate-pulse"
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* Verification Checks */}
              {(doc.status === "verifying" || doc.status === "verified") && (
                <div className="bg-white rounded-lg p-4 animate-slideIn">
                  <div className="text-sm font-semibold text-gray-700 mb-3">
                    Security Checks:
                  </div>
                  <ul className="space-y-2">
                    {doc.checks.map((check, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-600 animate-slideIn"
                        style={{
                          animationDelay: `${idx * 200}ms`,
                        }}
                      >
                        <span
                          className={`text-lg ${
                            doc.status === "verified"
                              ? "text-green-500"
                              : "text-primary-500"
                          }`}
                        >
                          {doc.status === "verified" ? "✓" : "🔄"}
                        </span>
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Success Summary */}
          {allVerified && (
            <div className="mt-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  All Documents Verified!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your identity and documents have been successfully verified
                  using AI and blockchain technology
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-3xl mb-2">🤖</div>
                    <div className="font-semibold text-gray-900">
                      AI Verification
                    </div>
                    <div className="text-sm text-gray-600">
                      100% accuracy rate
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-3xl mb-2">⛓️</div>
                    <div className="font-semibold text-gray-900">
                      Blockchain Secured
                    </div>
                    <div className="text-sm text-gray-600">
                      Immutable records
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="font-semibold text-gray-900">
                      Instant Process
                    </div>
                    <div className="text-sm text-gray-600">Under 2 minutes</div>
                  </div>
                </div>

                <button
                  onClick={startVerification}
                  className="px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition border-2 border-gray-300"
                >
                  Verify Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
