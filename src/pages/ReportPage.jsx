import { useState } from 'react';
import { AlertTriangle, Send, CheckCircle } from 'lucide-react';

function ReportPage() {
  const [formData, setFormData] = useState({
    reportType: 'phishing',
    url: '',
    description: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        reportType: 'phishing',
        url: '',
        description: '',
        email: '',
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <AlertTriangle className="w-12 h-12 text-black" />
            <h1 className="text-5xl font-bold text-black">REPORT A THREAT</h1>
          </div>
          <p className="text-lg text-gray-600">
            Help us protect the community by reporting suspicious content
          </p>
        </div>
        {submitted ? (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-12 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-black mb-2">Report Submitted</h2>
            <p className="text-gray-600">
              Thank you for helping keep the community safe. Our team will investigate this report.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="reportType"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Threat Type
                </label>
                <select
                  id="reportType"
                  name="reportType"
                  value={formData.reportType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="phishing">Phishing Website</option>
                  <option value="email">Phishing Email</option>
                  <option value="malware">Malware Distribution</option>
                  <option value="impersonation">Brand Impersonation</option>
                  <option value="other">Other Threat</option>
                </select>
              </div>
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                  URL or Source
                </label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://suspicious-site.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide details about the threat..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email (optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Provide your email if you'd like updates on this report
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded font-medium hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Submit Report</span>
              </button>
            </form>
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-gray-700">
                <strong>Privacy Notice:</strong> All reports are handled confidentially. We use
                this information solely for threat analysis and prevention purposes.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportPage;