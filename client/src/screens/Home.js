import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import  bgVideo from "../assets/homecab.mp4";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(
      112deg,
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0.7)
    ),
    
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the left */
  justify-content: flex-start; /* Align content to the top */
  color: white;
  text-align: left;
  padding: 60px 80px; /* Increased padding for better placement */
  position: relative;
  overflow: hidden;
`;

// Styled component for the background video
const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  width: 100%;
  height: 130%;
  object-fit: cover;
  z-index: -1;
`;
const Content = styled.div`
  max-width: 600px;
  z-index: 1;
  font-size: 2rem; /* Increased text size */
  font-weight: bold;
  color: rgba(255, 255, 255, 0.7); /* Dim white color */
`;


const Title = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 8rem;
  font-weight: 500;
  margin-bottom: 1px;
  text-transform: lowercase;
  letter-spacing: 1px;
  color: black;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: ${fadeInUp} 1s ease;
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;


const Subtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 30px;
  max-width: 800px;
  line-height: 1.6;
  color: rgba(5, 4, 4, 0.9);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  animation: ${fadeInUp} 1s ease 0.2s;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;


const GradientButton = styled.button`
  padding: 10px 20px;
  font-size: 2rem;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  color: white;
  border: none;
  border-radius: 80px;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  animation: ${fadeInUp} 1s ease 0.4s;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 15px 30px rgba(255, 107, 107, 0.4);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: 0.4s;
  }

  &:hover::after {
    left: 100%;
  }
`;

const Section = styled.section`
  padding: 100px 20px;
  background: ${(props) => props.bg || "#f8f9fa"};
  color: ${(props) => props.color || "#2d3436"};
  text-align: center;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 60px;
  color: ${(props) => props.color || "#2d3436"};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(45deg, #ff6b6b, #ff8e53);
    border-radius: 2px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: ${(props) => props.bg || "white"};
  padding: 40px;
  border-radius: 25px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 30px;
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const FeatureTitle = styled.h3`
  font-family: "Inter", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${(props) => props.color || "#2d3436"};
`;

const FeatureDescription = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  color: ${(props) => props.color || "#666"};
  line-height: 1.8;
  margin-bottom: 25px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 60px auto;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
`;

const StatNumber = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: #ff6b6b;
  margin-bottom: 15px;
`;

const StatLabel = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
  color: #666;
`;

const TestimonialSection = styled.div`
  background: #2d3436;
  padding: 80px 20px;
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 25px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const TestimonialText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.4rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 30px;
`;

// New styled components for testimonial navigation
const TestimonialNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ArrowButton = styled.button`
  background: transparent;
  border: none;
  font-size: 2rem;
  color: #2d3436;
  cursor: pointer;
  margin: 0 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: "📹",
      title: "AI-Powered Safety Monitoring",
      description:
        "Our advanced computer vision system analyzes driver behavior and road conditions in real-time, automatically detecting fatigue signs, distracted driving, and potential hazards."
    },
    {
      icon: "🛡️",
      title: "Military-Grade Security",
      description:
        "End-to-end encryption for all communications, biometric authentication, and regular security audits conducted by third-party cybersecurity experts."
    },
    {
      icon: "🚨",
      title: "Emergency Response Network",
      description:
        "24/7 connection to local emergency services with automatic location sharing and instant video verification through our dedicated response center."
    },
    {
      icon: "📊",
      title: "Smart Route Optimization",
      description:
        "Machine learning algorithms that analyze historical data and real-time traffic patterns to ensure the fastest and safest routes with dynamic rerouting capabilities."
    },
    {
      icon: "🌱",
      title: "Eco-Friendly Fleet",
      description:
        "100% electric and hybrid vehicles equipped with carbon offset tracking and real-time energy consumption monitoring for sustainable transportation."
    },
    {
      icon: "💎",
      title: "Premium Member Benefits",
      description:
        "Exclusive access to priority booking, luxury vehicles, personal concierge services, and VIP airport transfers with dedicated lanes."
    }
  ];

  const securityFeatures = [
    {
      icon: "📷",
      title: "Live Camera Feed",
      description:
        "Real-time video streaming from the vehicle to ensure transparency and safety during the ride."
    },
    {
      icon: "🆔",
      title: "Driver Verification",
      description:
        "Every driver is thoroughly vetted with background checks and identity verification."
    },
    {
      icon: "🚨",
      title: "In-App Emergency Button",
      description:
        "Instant access to emergency services with one tap, sharing your location and ride details."
    },
    {
      icon: "👥",
      title: "Trip Sharing",
      description:
        "Share your trip details with trusted contacts for added security."
    },
    {
      icon: "⭐",
      title: "Safety Ratings and Reviews",
      description:
        "Rate your ride and driver based on safety and service quality."
    },
    {
      icon: "📍",
      title: "Route Tracking",
      description:
        "Real-time GPS tracking of your ride to ensure you're on the safest and fastest route."
    },
    {
      icon: "🔒",
      title: "Two-Factor Authentication",
      description:
        "Secure your account with an extra layer of protection."
    },
    {
      icon: "👤",
      title: "Anonymous Ride Requests",
      description:
        "Protect your privacy by hiding personal details from drivers."
    },
    {
      icon: "🌍",
      title: "GPS Monitoring",
      description:
        "Continuous monitoring of the vehicle's location for enhanced safety."
    }
  ];

  const testimonials = [
    {
      text: "Itaegsi transformed my daily commute. The safety features give me peace of mind, and the premium vehicles make every ride feel like a luxury experience.",
      author: "Sarah Johnson, CEO"
    },
    {
      text: "As a frequent traveler, I appreciate the global consistency and exceptional service. The real-time monitoring is unlike anything I've seen in the industry.",
      author: "Michael Chen, Frequent User"
    }
  ];

  // Functions for manual navigation of testimonials
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-cycle testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <>
       <Container>
        <VideoBackground autoPlay loop muted>
          <source src={bgVideo} type="video/mp4" />
        </VideoBackground>
        <Content>
          <Title>Itaegsi</Title>
          <Subtitle>Smart, sustainable urban travel.</Subtitle>
          <GradientButton onClick={() => navigate("/map")}>Start</GradientButton>
        </Content>
      </Container>
      
      <Section bg="#ffffff">
        <SectionTitle>Why Itaegsi?</SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Section>

      <Section bg="#f8f9fa">
        <SectionTitle color="#2d3436">Security Features</SectionTitle>
        <FeaturesGrid>
          {securityFeatures.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Section>

      <Section bg="#ffffff">
        <SectionTitle>By The Numbers</SectionTitle>
        <StatsContainer>
          <StatCard>
            <StatNumber>15M+</StatNumber>
            <StatLabel>Safe Rides Completed</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>99.9%</StatNumber>
            <StatLabel>Customer Satisfaction</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>240k+</StatNumber>
            <StatLabel>Verified Drivers</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>50+</StatNumber>
            <StatLabel>Cities Worldwide</StatLabel>
          </StatCard>
        </StatsContainer>
      </Section>

      <TestimonialSection>
        <SectionTitle color="#ffffff">User Experiences</SectionTitle>
        <TestimonialCard>
          <TestimonialText>
            "{testimonials[activeTestimonial].text}"
          </TestimonialText>
          <FeatureTitle color="#2d3436">
            {testimonials[activeTestimonial].author}
          </FeatureTitle>
        </TestimonialCard>
        <TestimonialNav>
          <ArrowButton onClick={prevTestimonial}>◀</ArrowButton>
          <ArrowButton onClick={nextTestimonial}>▶</ArrowButton>
        </TestimonialNav>
      </TestimonialSection>

      <Section bg="#1a1a1a">
        <SectionTitle color="#ffffff">Technology Ecosystem</SectionTitle>
        <FeaturesGrid>
          <FeatureCard bg="#2d2d2d">
            <FeatureIcon>🤖</FeatureIcon>
            <FeatureTitle color="#ffffff">Autonomous Ready</FeatureTitle>
            <FeatureDescription color="#ccc">
              Future-proof platform designed for seamless integration with self-driving technology
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard bg="#2d2d2d">
            <FeatureIcon>🌐</FeatureIcon>
            <FeatureTitle color="#ffffff">Global Network</FeatureTitle>
            <FeatureDescription color="#ccc">
              Multi-cloud infrastructure ensuring <br />99.999% uptime worldwide
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </Section>
    </>
  );
};

export default Home;
