import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, User, Globe } from 'lucide-react';

interface NavbarProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export default function Navbar({ onSignIn, onSignUp }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const mainNavItems = [
    {
      label: 'Services',
      href: '/services',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Strategy & Consulting', href: '/services/strategy' },
        { label: 'Creative & Content', href: '/services/creative' },
        { label: 'Technology & Data', href: '/services/technology' },
        { label: 'Media & Performance', href: '/services/media' },
      ]
    },
    {
      label: 'Work',
      href: '/work',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Case Studies', href: '/work/case-studies' },
        { label: 'Portfolio', href: '/work/portfolio' },
        { label: 'Awards', href: '/work/awards' },
      ]
    },
    {
      label: 'Insights',
      href: '/insights',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Articles', href: '/insights/articles' },
        { label: 'Reports', href: '/insights/reports' },
        { label: 'Events', href: '/insights/events' },
      ]
    },
    {
      label: 'About',
      href: '/about',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Our Story', href: '/about/story' },
        { label: 'Leadership', href: '/about/leadership' },
        { label: 'Locations', href: '/about/locations' },
      ]
    },
    {
      label: 'Careers',
      href: '/careers',
      hasDropdown: false,
    },
    {
      label: 'Contact',
      href: '/contact',
      hasDropdown: false,
    }
  ];

  return (
    <>
      {/* Top utility bar */}
      <div className="bg-monks-dark-gray text-white text-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center space-x-6">
              <span className="text-monks-gray">Global</span>
              <div className="flex items-center space-x-1 cursor-pointer hover:text-white transition-colors">
                <Globe size={14} />
                <span>English</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-monks-gray hover:text-white transition-colors">
                Support
              </button>
              <button 
                onClick={onSignIn}
                className="flex items-center space-x-1 text-monks-gray hover:text-white transition-colors"
              >
                <User size={14} />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-white shadow-sm border-b border-monks-gray/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-3xl font-bold text-monks-black">
                Monks
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {mainNavItems.map((item) => (
                <div key={item.label} className="relative group">
                  <Link
                    to={item.href}
                    className="flex items-center space-x-1 text-monks-black hover:text-monks-accent px-3 py-2 text-sm font-medium transition-colors duration-300"
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && <ChevronDown size={16} />}
                  </Link>
                  
                  {/* Dropdown */}
                  {item.hasDropdown && activeDropdown === item.label && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-64 bg-white shadow-elevated rounded-lg border border-monks-gray/10 py-2 z-50"
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block px-4 py-3 text-sm text-monks-black hover:bg-monks-light-gray hover:text-monks-accent transition-colors duration-300"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 text-monks-gray hover:text-monks-black transition-colors duration-300">
                <Search size={20} />
              </button>
              <button
                onClick={onSignUp}
                className="bg-monks-accent hover:bg-monks-hover text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-monks-gray hover:text-monks-black hover:bg-monks-light-gray focus:outline-none transition-colors duration-300"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-monks-gray/10">
            <div className="px-6 py-4 space-y-4 bg-white">
              {mainNavItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    className="flex items-center justify-between text-monks-black hover:text-monks-accent py-2 text-base font-medium transition-colors duration-300"
                    onClick={() => !item.hasDropdown && setIsMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown 
                        size={16} 
                        className={`transform transition-transform duration-300 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleDropdown(item.label);
                        }}
                      />
                    )}
                  </Link>
                  
                  {/* Mobile Dropdown */}
                  {item.hasDropdown && activeDropdown === item.label && (
                    <div className="pl-4 space-y-2 mt-2">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block text-monks-gray hover:text-monks-accent py-2 text-sm transition-colors duration-300"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-monks-gray/10 space-y-3">
                <button
                  onClick={() => {
                    onSignIn();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left text-monks-black hover:text-monks-accent py-2 text-base font-medium transition-colors duration-300"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onSignUp();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-monks-accent hover:bg-monks-hover text-white px-6 py-3 rounded-full text-base font-medium transition-all duration-300"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}