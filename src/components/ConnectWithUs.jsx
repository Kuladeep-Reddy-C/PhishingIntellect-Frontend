import { Send } from 'lucide-react';
import { useState } from 'react';

function ConnectWithUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-black mb-4 tracking-tight">
            LET'S BOOST SECURITY
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CONNECT WITH US TO BEGIN YOUR JOURNEY TOWARD CYBERSECURITY PROTECTION
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="border-l-4 border-black pl-6">
              <h3 className="text-2xl font-bold text-black mb-3">
                Enterprise-Grade Protection
              </h3>
              <p className="text-gray-600">
                Join leading organizations that trust TrustNet to safeguard their
                digital infrastructure against evolving phishing threats
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-2xl font-bold text-black mb-3">
                24/7 Threat Monitoring
              </h3>
              <p className="text-gray-600">
                Round-the-clock protection with real-time alerts and automated
                response systems to keep your organization secure
              </p>
            </div>

            <div className="border-l-4 border-black pl-6">
              <h3 className="text-2xl font-bold text-black mb-3">
                Seamless Integration
              </h3>
              <p className="text-gray-600">
                Deploy TrustNet across your existing security stack with minimal
                configuration and maximum compatibility
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded font-medium hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConnectWithUs;