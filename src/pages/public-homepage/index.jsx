import React from 'react';
import PublicNavigationHeader from '../../components/ui/PublicNavigationHeader';
import HeroSection from './components/HeroSection';
import InteractiveMap from './components/InteractiveMap';
import WeatherWidget from './components/WeatherWidget';
import CriticalInfoCards from './components/CriticalInfoCards';
import NewsUpdatesSection from './components/NewsUpdatesSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PublicHomepage = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { label: "Emergency Hotlines", path: "/contact" },
        { label: "Evacuation Centers", path: "/resources/centers" },
        { label: "Weather Updates", path: "/public-advisories/weather" },
        { label: "Report Incident", path: "/contact/report" }
      ]
    },
    {
      title: "Services",
      links: [
        { label: "Incident Management", path: "/incident-management" },
        { label: "Public Advisories", path: "/public-advisories" },
        { label: "Emergency Response", path: "/response/emergency" },
        { label: "Community Training", path: "/preparedness/training" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Preparedness Guide", path: "/preparedness" },
        { label: "Hazard Maps", path: "/preparedness/maps" },
        { label: "Emergency Kits", path: "/preparedness/kits" },
        { label: "FAQ", path: "/resources/faq" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "#" },
    { name: "Twitter", icon: "Twitter", url: "#" },
    { name: "Instagram", icon: "Instagram", url: "#" },
    { name: "YouTube", icon: "Youtube", url: "#" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <PublicNavigationHeader />
      {/* Main Content */}
      <main className="pt-32">
        {/* Hero Section */}
        <HeroSection />

        {/* Map and Weather Section */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Interactive Map - Takes 2 columns */}
              <div className="lg:col-span-2">
                <InteractiveMap />
              </div>
              
              {/* Weather Widget - Takes 1 column */}
              <div className="lg:col-span-1">
                <WeatherWidget />
              </div>
            </div>
          </div>
        </section>

        {/* Critical Information Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4">
            <CriticalInfoCards />
          </div>
        </section>

        {/* News and Updates Section */}
        <section className="py-12 bg-muted/30">
          <NewsUpdatesSection />
        </section>

        {/* Call to Action Section */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Prepared, Stay Safe</h2>
            <p className="text-lg opacity-90 mb-8">
              Join our community preparedness program and receive real-time alerts, training opportunities, and emergency updates.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="secondary" size="lg">
                <Icon name="Bell" size={20} className="mr-2" />
                Subscribe to Alerts
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Icon name="Users" size={20} className="mr-2" />
                Join Volunteer Program
              </Button>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Organization Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={24} color="white" />
                </div>
                <div>
                  <div className="text-lg font-bold">MDRRMO</div>
                  <div className="text-sm opacity-80">Operations Hub</div>
                </div>
              </div>
              <p className="text-sm opacity-80 mb-4">
                Municipal Disaster Risk Reduction and Management Office - Protecting and serving the community of Pio Duran, Albay.
              </p>
              <div className="flex space-x-3">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    className="w-8 h-8 bg-background/10 rounded-lg flex items-center justify-center hover:bg-background/20 transition-colors duration-200"
                    title={social?.name}
                  >
                    <Icon name={social?.icon} size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks?.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{section?.title}</h3>
                <ul className="space-y-2">
                  {section?.links?.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link?.path}
                        className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-all duration-200"
                      >
                        {link?.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Emergency Contact Bar */}
          <div className="border-t border-background/20 pt-6 mb-6">
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
                <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                  <Icon name="Phone" size={20} className="text-error" />
                  <div>
                    <div className="text-sm font-medium">24/7 Emergency Hotline</div>
                    <div className="text-lg font-bold text-error">911</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <div className="text-sm opacity-80">
                    MDRRMO Office, Municipal Hall, Pio Duran, Albay
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-background/20 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm opacity-80">
            <div>
              © {currentYear} Municipal Disaster Risk Reduction and Management Office. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 mt-3 sm:mt-0">
              <a href="/privacy" className="hover:opacity-100 transition-opacity duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:opacity-100 transition-opacity duration-200">
                Terms of Service
              </a>
              <a href="/accessibility" className="hover:opacity-100 transition-opacity duration-200">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicHomepage;