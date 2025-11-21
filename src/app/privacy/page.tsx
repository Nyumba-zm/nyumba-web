export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600">Last updated: November 20, 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Nyumba, we are committed to protecting your privacy and
              personal information. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our
              platform.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using Nyumba, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Information We Collect
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Personal Information
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect information that you provide directly to us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Name, email address, and phone number</li>
              <li>National Registration Card (NRC) for KYC verification</li>
              <li>Property ownership documents</li>
              <li>Financial information for loan applications</li>
              <li>Profile pictures and other uploaded content</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Automatically Collected Information
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>IP address and device information</li>
              <li>Browser type and operating system</li>
              <li>Pages viewed and actions taken on our platform</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Location data (with your permission)</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and facilitate property transactions</li>
              <li>Verify user identities and prevent fraud</li>
              <li>Match users with appropriate financing options</li>
              <li>Generate AI-powered property valuations</li>
              <li>Send notifications and updates about your account</li>
              <li>Personalize your experience on our platform</li>
              <li>Analyze usage patterns and improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* KYC and Verification */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. KYC and Verification
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To maintain trust and security on our platform:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                We conduct Know Your Customer (KYC) verification for sellers and
                agents
              </li>
              <li>We verify property ownership documents</li>
              <li>We may use third-party services for identity verification</li>
              <li>
                Verified information is stored securely and used only for
                verification purposes
              </li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. How We Share Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Other Users:</strong> When you list a property or
                express interest in one
              </li>
              <li>
                <strong>Financial Institutions:</strong> When you apply for
                loans through our platform
              </li>
              <li>
                <strong>Service Providers:</strong> Third parties that help us
                operate our platform
              </li>
              <li>
                <strong>Legal Authorities:</strong> When required by law or to
                protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with mergers
                or acquisitions
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate security measures to protect your
              information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure server infrastructure</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              However, no method of transmission over the internet is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Your Privacy Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>
                Request deletion of your information (subject to legal
                obligations)
              </li>
              <li>Object to or restrict certain processing of your data</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>
                Data portability (receive your data in a structured format)
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us using the information
              provided below.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Cookies and Tracking
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our platform</li>
              <li>Improve our services and user experience</li>
              <li>Show relevant advertisements</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              You can control cookies through your browser settings, but
              disabling them may affect your experience on our platform.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Children&apos;s Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not intended for individuals under 18 years of
              age. We do not knowingly collect personal information from
              children. If we become aware that a child has provided us with
              personal information, we will take steps to delete such
              information.
            </p>
          </section>

          {/* International Users */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. International Users
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Nyumba operates primarily in Zambia. If you access our services
              from outside Zambia, your information may be transferred to and
              processed in Zambia. By using our services, you consent to such
              transfer and processing.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Changes to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes by posting the new policy on
              this page and updating the &quot;Last updated&quot; date. Your
              continued use of our services after changes constitutes acceptance
              of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy or our
              data practices, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@nyumba.co.zm
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +260 XXX XXX XXX
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> Lusaka, Zambia
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
