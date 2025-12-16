import { Link, Image, Mail, QrCode, FileText } from 'lucide-react';

function DetectionCards() {
  const cards = [
    { icon: Link, label: 'URL Scan', description: 'Analyze suspicious links' },
    { icon: Image, label: 'Image Scan', description: 'Detect visual phishing' },
    { icon: Mail, label: 'Email Analysis', description: 'Inspect email threats' },
    { icon: QrCode, label: 'QR Code Scan', description: 'Verify QR safety' },
    { icon: FileText, label: 'File Scan', description: 'Check file integrity' },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            COMPREHENSIVE THREAT DETECTION
          </h2>
          <p className="text-lg text-gray-600">
            Multiple scan types to protect against all attack vectors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {cards.slice(0, 3).map((card, index) => (
            <div
              key={index}
              className="group p-8 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-blue-50"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-black rounded-lg group-hover:bg-blue-600 transition-colors">
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{card.label}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {cards.slice(3).map((card, index) => (
            <div
              key={index + 3}
              className="group p-8 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-blue-50"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-black rounded-lg group-hover:bg-blue-600 transition-colors">
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{card.label}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DetectionCards;