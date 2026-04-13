function Privacy() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

            <p className="text-gray-600 mb-6">
                Your privacy is important to us. This Privacy Policy explains how we collect,
                use, and protect your information when you use our book store platform.
            </p>

            {/* Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
                <p className="text-gray-600">
                    We may collect personal information such as your name, email address,
                    phone number, and payment details when you create an account or make a purchase.
                </p>
            </section>

            {/* Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                    <li>To process and deliver your orders</li>
                    <li>To improve our services and user experience</li>
                    <li>To communicate updates, offers, and support</li>
                </ul>
            </section>

            {/* Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">3. Data Protection</h2>
                <p className="text-gray-600">
                    We implement industry-standard security measures to protect your data
                    from unauthorized access, alteration, or disclosure.
                </p>
            </section>

            {/* Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">4. Cookies</h2>
                <p className="text-gray-600">
                    We use cookies to enhance your browsing experience, remember preferences,
                    and analyze site traffic.
                </p>
            </section>

            {/* Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">5. Third-Party Services</h2>
                <p className="text-gray-600">
                    We may use trusted third-party services for payments, analytics, and delivery.
                    These services have their own privacy policies.
                </p>
            </section>

            {/* Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
                <p className="text-gray-600">
                    You have the right to access, update, or delete your personal information
                    at any time by contacting us.
                </p>
            </section>

            {/* Section */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">7. Changes to This Policy</h2>
                <p className="text-gray-600">
                    We may update this Privacy Policy from time to time. Changes will be posted on this page.
                </p>
            </section>

            {/* Footer */}
            <div className="mt-10 border-t pt-6 text-sm text-gray-500">
                Last updated: {new Date().getFullYear()}
            </div>
        </div>
    );
}

export default Privacy;