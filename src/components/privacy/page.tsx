export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-lg">Last Updated: December 9, 2025</p>
      </div>
      {/* Content Section */}
      <div className="space-y-8 text-slate-300">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            1. Introduction
          </h2>
          <p className="leading-relaxed">
            Welcome to Lords Hub. We are committed to protecting your personal
            information and your right to privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you visit our website and use our services for Lords Mobile
            accounts, gems, diamonds, and bot services.
          </p>
        </section>

        {/* Information We Collect */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            2. Information We Collect
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-amber-400 mb-2">
                2.1 Personal Information
              </h3>
              <p className="leading-relaxed mb-2">
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Register for an account</li>
                <li>Make a purchase or transaction</li>
                <li>Contact our customer support</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="leading-relaxed mt-3">
                This information may include: name, email address, phone number,
                payment information, Lords Mobile game ID, and transaction
                history.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-amber-400 mb-2">
                2.2 Automatically Collected Information
              </h3>
              <p className="leading-relaxed">
                When you visit our website, we automatically collect certain
                information about your device, including IP address, browser
                type, operating system, access times, and pages viewed. We may
                also collect information about your interactions with our
                services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-amber-400 mb-2">
                2.3 Cookies and Tracking Technologies
              </h3>
              <p className="leading-relaxed">
                We use cookies, web beacons, and similar tracking technologies
                to enhance your experience, analyze site traffic, and understand
                user behavior. You can control cookie preferences through your
                browser settings.
              </p>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            3. How We Use Your Information
          </h2>
          <p className="leading-relaxed mb-3">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Processing and fulfilling your orders and transactions</li>
            <li>Providing customer support and responding to inquiries</li>
            <li>Sending transactional emails and order confirmations</li>
            <li>Improving our website, products, and services</li>
            <li>Personalizing your experience on our platform</li>
            <li>Detecting and preventing fraud and security threats</li>
            <li>Complying with legal obligations and enforcing our terms</li>
            <li>Sending promotional communications (with your consent)</li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            4. Information Sharing and Disclosure
          </h2>
          <p className="leading-relaxed mb-3">
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong className="text-white">Service Providers:</strong> With
              third-party vendors who perform services on our behalf (payment
              processing, hosting, analytics)
            </li>
            <li>
              <strong className="text-white">Business Transfers:</strong> In
              connection with mergers, acquisitions, or sale of assets
            </li>
            <li>
              <strong className="text-white">Legal Requirements:</strong> When
              required by law or to protect our rights and safety
            </li>
            <li>
              <strong className="text-white">With Your Consent:</strong> When
              you explicitly agree to share your information
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            We do not sell your personal information to third parties for
            marketing purposes.
          </p>
        </section>

        {/* Data Security */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            5. Data Security
          </h2>
          <p className="leading-relaxed">
            We implement appropriate technical and organizational security
            measures to protect your personal information against unauthorized
            access, alteration, disclosure, or destruction. However, no method
            of transmission over the internet or electronic storage is 100%
            secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            6. Data Retention
          </h2>
          <p className="leading-relaxed">
            We retain your personal information for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, unless a
            longer retention period is required or permitted by law. When your
            information is no longer needed, we will securely delete or
            anonymize it.
          </p>
        </section>

        {/* Your Privacy Rights */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            7. Your Privacy Rights
          </h2>
          <p className="leading-relaxed mb-3">
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong className="text-white">Access:</strong> Request access to
              your personal information
            </li>
            <li>
              <strong className="text-white">Correction:</strong> Request
              correction of inaccurate information
            </li>
            <li>
              <strong className="text-white">Deletion:</strong> Request deletion
              of your personal information
            </li>
            <li>
              <strong className="text-white">Opt-Out:</strong> Unsubscribe from
              marketing communications
            </li>
            <li>
              <strong className="text-white">Data Portability:</strong> Request
              a copy of your data in a portable format
            </li>
            <li>
              <strong className="text-white">Withdraw Consent:</strong> Withdraw
              consent for data processing
            </li>
          </ul>
          <p className="leading-relaxed mt-3">
            To exercise these rights, please contact us at privacy@lordshub.com
          </p>
        </section>

        {/* Third-Party Links */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            8. Third-Party Links
          </h2>
          <p className="leading-relaxed">
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of these external
            sites. We encourage you to review the privacy policies of any
            third-party sites you visit.
          </p>
        </section>

        {/* Children's Privacy */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            9. Children's Privacy
          </h2>
          <p className="leading-relaxed">
            Our services are not intended for individuals under the age of 18.
            We do not knowingly collect personal information from children. If
            you believe we have collected information from a child, please
            contact us immediately so we can delete it.
          </p>
        </section>

        {/* International Data Transfers */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            10. International Data Transfers
          </h2>
          <p className="leading-relaxed">
            Your information may be transferred to and processed in countries
            other than your country of residence. These countries may have
            different data protection laws. By using our services, you consent
            to the transfer of your information to our facilities and service
            providers globally.
          </p>
        </section>

        {/* Changes to Privacy Policy */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">
            11. Changes to This Privacy Policy
          </h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. We will notify you
            of any material changes by posting the new Privacy Policy on this
            page and updating the "Last Updated" date. Your continued use of our
            services after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        {/* Contact Information */}
        <section className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
          <h2 className="text-2xl font-semibold text-white mb-4">
            12. Contact Us
          </h2>
          <p className="leading-relaxed mb-4">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our data practices, please contact us:
          </p>
          <div className="space-y-2 text-amber-400">
            <p>
              <strong className="text-white">Email:</strong>{" "}
              privacy@lordshub.com
            </p>
            <p>
              <strong className="text-white">Support:</strong>{" "}
              support@lordshub.com
            </p>
            <p>
              <strong className="text-white">Website:</strong> www.lordshub.com
            </p>
          </div>
        </section>

        {/* Consent */}
        <section className="text-center pt-8 border-t border-slate-700">
          <p className="text-slate-400 italic">
            By using Lords Hub, you acknowledge that you have read and
            understood this Privacy Policy and agree to its terms.
          </p>
        </section>
      </div>
         
    </div>
  );
}
