export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Terms of Service
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
              Welcome to Nyumba (&quot;we,&quot; &quot;our,&quot; or
              &quot;us&quot;). By accessing or using our platform, you agree to
              be bound by these Terms of Service and all applicable laws and
              regulations. If you do not agree with any of these terms, you are
              prohibited from using or accessing this site.
            </p>
          </section>

          {/* Use of Platform */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Use of Platform
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nyumba provides a marketplace platform for property listings,
              financing options, and related real estate services in Zambia.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>You must be at least 18 years old to use our services</li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account
              </li>
              <li>You agree to provide accurate and complete information</li>
              <li>You will not use the platform for any unlawful purposes</li>
            </ul>
          </section>

          {/* Property Listings */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Property Listings
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you are a seller or agent listing properties:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>You must have legal rights to list the property</li>
              <li>
                All information provided must be accurate and not misleading
              </li>
              <li>You are responsible for all content in your listings</li>
              <li>
                Nyumba reserves the right to remove listings that violate our
                policies
              </li>
              <li>You agree to our verification and KYC processes</li>
            </ul>
          </section>

          {/* Fees and Payments */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Fees and Payments
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Certain services on our platform may require payment:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                Featured listings and premium services are subject to fees
              </li>
              <li>All fees are clearly displayed before purchase</li>
              <li>
                Payments are processed securely through third-party providers
              </li>
              <li>Refund policies are outlined separately for each service</li>
            </ul>
          </section>

          {/* AI Valuation */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. AI Valuation and Estimates
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our AI-powered property valuations are estimates only:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Valuations are for informational purposes only</li>
              <li>They should not be considered as professional appraisals</li>
              <li>Actual property values may vary significantly</li>
              <li>
                We recommend consulting with licensed professionals for official
                valuations
              </li>
            </ul>
          </section>

          {/* Financing Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Financing Services
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When using our loan matching and financing services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                Nyumba is not a lender and does not provide financing directly
              </li>
              <li>We connect users with third-party financial institutions</li>
              <li>
                Loan approval and terms are determined solely by the lender
              </li>
              <li>
                You are responsible for understanding and agreeing to lender
                terms
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content on the Nyumba platform is protected by intellectual
              property laws:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>The Nyumba name, logo, and branding are our trademarks</li>
              <li>
                You may not use our intellectual property without permission
              </li>
              <li>User-generated content remains the property of the user</li>
              <li>
                By posting content, you grant us a license to use it on our
                platform
              </li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Nyumba is not liable for disputes between users</li>
              <li>
                We are not responsible for the accuracy of user-provided
                information
              </li>
              <li>
                We are not liable for transactions conducted outside our
                platform
              </li>
              <li>
                Our total liability is limited to the amount paid for our
                services
              </li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Termination
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to terminate or suspend access to our service
              immediately, without prior notice or liability, for any reason,
              including breach of these Terms.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting. Your continued use of
              the platform constitutes acceptance of the modified terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@nyumba.co.zm
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
