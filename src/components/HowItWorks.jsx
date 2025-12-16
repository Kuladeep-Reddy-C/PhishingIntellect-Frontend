import { Search, Microscope, AlertCircle, ShieldCheck } from 'lucide-react';

function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'SCAN',
      description: 'Submit URLs, files, emails, or images for instant analysis',
      details: 'Our system accepts multiple input types and immediately begins processing',
    },
    {
      icon: Microscope,
      title: 'ANALYZE',
      description: 'Advanced AI examines content for phishing indicators',
      details: 'Machine learning models detect sophisticated attack patterns in real-time',
    },
    {
      icon: AlertCircle,
      title: 'DETECT',
      description: 'Identify threats with precision and speed',
      details: 'Pattern recognition algorithms flag malicious content with high accuracy',
    },
    {
      icon: ShieldCheck,
      title: 'PROTECT',
      description: 'Block threats before they reach end users',
      details: 'Automated response system neutralizes identified threats immediately',
    },
  ];

  return (
    <section id="how-trustnet-helps" className="py-20 px-6 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">
            HOW TRUSTNET HELPS YOU STAY SECURE
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive threat detection system processes inputs through multiple
            layers of analysis to ensure maximum protection against phishing attacks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative overflow-hidden border border-gray-200 rounded-lg hover:border-blue-400 transition-all duration-300 cursor-pointer"
            >
              <div className="p-8 bg-gradient-to-br from-white to-blue-50">
                <div className="mb-6">
                  <step.icon className="w-12 h-12 text-black group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{step.description}</p>
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-95 p-8 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="mb-4">
                  <step.icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-gray-300">{step.details}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 max-w-2xl">
              Every scan goes through our proprietary threat detection pipeline,
              combining signature-based detection with behavioral analysis and
              machine learning for comprehensive protection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;