import React, { useState } from 'react';
import StarburstBubble from './StarBubble';

const ServicesComponent = () => {
  const [expandedService, setExpandedService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'UI/UX Design',
      subtitle: 'Designs That Click — And Stick',
      description: 'We craft intuitive, stunning interfaces that users love. From wireframes to high-fidelity prototypes, our UI/UX design services ensure your digital product is not only beautiful but also delivers an exceptional user experience. We focus on user research, persona development, information architecture, and iterative testing to create designs that convert.',
      features: [
        'User Research & Persona Development',
        'Wireframing & Prototyping',
        'Visual Design & Branding',
        'Usability Testing & Optimization',
        'Mobile & Responsive Design',
        'Design System Creation'
      ]
    },
    {
      id: 2,
      title: 'Website Development',
      subtitle: 'Tailor-Made Modern Websites for Brands That Demand More',
      description: 'We build lightning-fast, scalable, and secure websites that drive results. Our development team specializes in modern frameworks and best practices to deliver websites that look great and perform even better. From e-commerce platforms to corporate websites, we create digital experiences that elevate your brand.',
      features: [
        'Custom Web Development',
        'E-commerce Solutions',
        'CMS Integration (WordPress, Shopify, etc.)',
        'Progressive Web Apps (PWA)',
        'API Development & Integration',
        'Performance Optimization & SEO'
      ]
    },
    {
      id: 3,
      title: 'App Development',
      subtitle: 'Native & Cross-Platform Apps That Scale',
      description: 'Transform your ideas into powerful mobile applications. We develop native iOS, Android, and cross-platform apps that engage users and drive business growth. Our agile development process ensures rapid delivery without compromising on quality or user experience.',
      features: [
        'iOS & Android Native Development',
        'React Native & Flutter Apps',
        'App Store Optimization',
        'Push Notifications & Analytics',
        'Cloud Backend Integration',
        'Ongoing Maintenance & Support'
      ]
    },
    {
      id: 4,
      title: 'Digital Marketing',
      subtitle: 'Growth-Driven Strategies That Deliver Results',
      description: 'Amplify your brand with data-driven digital marketing strategies. From SEO to social media marketing, we create campaigns that increase visibility, drive traffic, and convert leads into loyal customers. Our holistic approach ensures consistent brand messaging across all channels.',
      features: [
        'Search Engine Optimization (SEO)',
        'Pay-Per-Click Advertising (PPC)',
        'Social Media Marketing',
        'Content Marketing Strategy',
        'Email Marketing Campaigns',
        'Analytics & Performance Tracking'
      ]
    },
    {
      id: 5,
      title: 'Brand Identity',
      subtitle: 'Memorable Brands That Stand Out',
      description: 'Build a brand that resonates. We create comprehensive brand identities that tell your story and connect with your audience. From logo design to brand guidelines, we ensure consistency across all touchpoints while making your brand unforgettable.',
      features: [
        'Logo Design & Brand Mark',
        'Brand Strategy & Positioning',
        'Visual Identity Systems',
        'Brand Guidelines & Style Guides',
        'Packaging & Print Design',
        'Brand Collateral Design'
      ]
    },
    {
      id: 6,
      title: 'Content Creation',
      subtitle: 'Compelling Content That Converts',
      description: 'Engage your audience with high-quality content. From video production to copywriting, we create content that tells your brand story, educates your audience, and drives engagement. Our content strategies are designed to build authority and trust.',
      features: [
        'Video Production & Editing',
        'Photography & Image Editing',
        'Copywriting & Storytelling',
        'Motion Graphics & Animation',
        'Social Media Content',
        'Blog & Article Writing'
      ]
    }
  ];

  const toggleService = (id) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
          <section className="relative  flex items-center justify-center px-6 py-20 overflow-hidden">
      
      <div className="relative text-center">

        {/* First Line */}
        <h1 className="text-[50px] sm:text-[70px] md:text-[100px] lg:text-[100px] 
                       font-extrabold leading-[0.9] tracking-tight text-black">
          What we&apos;re
        </h1>

        {/* Second Line */}
        <h2 className="text-[50px] sm:text-[70px] md:text-[100px] lg:text-[100px] 
                       font-extrabold leading-[0.9] tracking-tight text-black">
          absolutely killer at
        </h2>

        {/* Yellow Bubble */}
        <div className="absolute 
                        top-[52%] 
                        left-[42%] 
                        -translate-x-1/2 
                        -translate-y-1/2 
                        rotate-[-12deg] ">
          
          <div className="relative w-16 h-20 md:w-16 md:h-16 ">
            
            {/* Star Shape */}
          <StarburstBubble/>

            {/* Services Text */}
            
             
          </div>
        </div>

      </div>
    </section>
        {/* Services Accordion */}
        <div className="space-y-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-amber-50 rounded-3xl overflow-hidden transition-all duration-300 ease-in-out"
            >
              {/* Service Header - Clickable */}
              <button
                onClick={() => toggleService(service.id)}
                className="w-full px-8 sm:px-12 py-8 flex items-center justify-between hover:bg-amber-100 transition-colors duration-200 cursor-pointer group"
              >
                <div className="flex-1 text-left">
                  <h3 className="text-3xl sm:text-4xl font-bold text-black mb-2 group-hover:text-gray-800 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-lg sm:text-xl text-black font-normal">
                    {service.subtitle}
                  </p>
                </div>
                
                {/* Plus/Minus Icon */}
                <div className="ml-6 flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {expandedService === service.id ? (
                      <svg
                        className="w-10 h-10 text-black transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M20 12H4"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-10 h-10 text-black transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </button>

              {/* Divider Line */}
              <div className="px-8 sm:px-12">
                <div className="h-px bg-black opacity-20"></div>
              </div>

              {/* Expandable Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedService === service.id
                    ? 'max-h-[1000px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 sm:px-12 py-8">
                  <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mt-6">
                    <h4 className="text-xl font-bold text-black mb-4">What We Offer:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-black mt-1 mr-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-800">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;
