import { Shield, Target, Users, Award, Zap, Lock } from 'lucide-react';

function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Every decision we make prioritizes the security and privacy of our users',
    },
    {
      icon: Target,
      title: 'Precision Detection',
      description: 'Advanced algorithms deliver industry-leading accuracy in threat identification',
    },
    {
      icon: Zap,
      title: 'Real-Time Response',
      description: 'Instant analysis and automated protection against emerging threats',
    },
  ];

  const features = [
    {
      icon: Lock,
      title: 'Privacy-First Architecture',
      description:
        'All scans are processed in real-time without storing sensitive data. Your information is never logged or retained.',
    },
    {
      icon: Users,
      title: 'Enterprise-Ready',
      description:
        'Scalable infrastructure designed for organizations of all sizes, from startups to Fortune 500 companies.',
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description:
        'Trusted by security professionals worldwide and recognized for excellence in threat prevention.',
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-black mb-6">ABOUT TRUSTNET</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are building the future of defensive cybersecurity with intelligent,
            automated threat detection that adapts to evolving attack patterns
          </p>
        </div>

        <div className="mb-20">
          <div className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 rounded-lg p-12">
            <h2 className="text-4xl font-bold text-black mb-6">OUR MISSION</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              TrustNet was founded on the principle that everyone deserves protection from
              phishing attacks. We leverage cutting-edge machine learning and behavioral
              analysis to identify threats that traditional security tools miss.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our platform processes millions of potential threats daily, learning and
              adapting to new attack vectors in real-time. We believe cybersecurity should
              be proactive, not reactive.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-black text-center mb-12">CORE VALUES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-lg transition-all bg-gradient-to-br from-white to-blue-50"
              >
                <value.icon className="w-12 h-12 text-black mb-4" />
                <h3 className="text-2xl font-bold text-black mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-black text-center mb-12">
            WHY CHOOSE TRUSTNET
          </h2>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-6 p-8 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-400 transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="p-4 bg-black rounded-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black text-white rounded-lg p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">JOIN THE TRUSTNET COMMUNITY</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Thousands of organizations worldwide trust TrustNet to protect their digital
            infrastructure. Join us in building a safer internet.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">10M+</div>
              <div className="text-gray-400">Scans Performed</div>
            </div>
            <div className="w-px bg-gray-700 mx-8"></div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">99.9%</div>
              <div className="text-gray-400">Detection Rate</div>
            </div>
            <div className="w-px bg-gray-700 mx-8"></div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">5000+</div>
              <div className="text-gray-400">Organizations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;