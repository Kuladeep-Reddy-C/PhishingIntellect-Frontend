// src/pages/HomePage.jsx
import Hero from '../components/Hero';
import DetectionCards from '../components/DetectionCards';
import ThreatSummary from '../components/ThreatSummary';
import HowItWorks from '../components/HowItWorks';
import ConnectWithUs from '../components/ConnectWithUs';
import Footer from '../components/Footer';

function HomePage({ onNavigate, onScrollToSection }) {
    return (
        <>
            <Hero
                onDetectClick={() => onNavigate('detect')}
                onHowItWorksClick={() => onScrollToSection('how-trustnet-helps')}
            />
            <DetectionCards />
            <ThreatSummary />
            <HowItWorks />
            <ConnectWithUs />
            <Footer onNavigate={onNavigate} />
        </>
    );
}

export default HomePage;
