import { Shield, Twitter, Linkedin, Github, Mail } from 'lucide-react';

function Footer({ onNavigate }) {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6" />
              <span className="text-xl font-bold">TrustNet</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enterprise-grade phishing detection and threat prevention for modern organizations
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Menu</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('detect')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Detect
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('report')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Report
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Mail className="w-4 h-4" />
              <span>contact@trustnet.security</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              2025 TrustNet. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs max-w-md text-center md:text-right">
              Privacy-first security. We never store or share your scan data. All analysis
              is performed in real-time and discarded immediately after processing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;