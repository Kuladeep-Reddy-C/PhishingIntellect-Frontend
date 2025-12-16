import { Activity, AlertTriangle, Shield, CheckCircle } from 'lucide-react';

function ThreatSummary() {
  const stats = [
    { icon: Activity, label: 'Scans Performed', value: '128', color: 'text-blue-600' },
    { icon: AlertTriangle, label: 'Threats Detected', value: '19', color: 'text-red-600' },
    { icon: Shield, label: 'High-Risk Attempts', value: '5', color: 'text-orange-600' },
    { icon: CheckCircle, label: 'Safe Results', value: '104', color: 'text-green-600' },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg p-10 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-black">
              Threat Summary (Today)
            </h2>
            <span className="text-sm text-gray-500 italic">Updated in real time</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg"
              >
                <stat.icon className={`w-10 h-10 mb-4 ${stat.color}`} />
                <div className="text-4xl font-bold text-black mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 text-center">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThreatSummary;