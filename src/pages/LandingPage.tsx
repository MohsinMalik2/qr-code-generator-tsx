import React from 'react';
import { ArrowRight, Smartphone, Globe, Palette, ImageIcon, Check, Users, Store, Share2, DownloadIcon } from 'lucide-react';
import logo from '../assets/Get QR lOGI/get-qr-logo.png'
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20">
        <div className="text-center mb-16">
            <div className="flex justify-center my-10">
                {logo && (
                    <img
                    src={logo}
                    alt="Brand Logo"/>
                )}
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Transform Your Business with QR Codes
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Bridge the gap between physical and digital worlds. Create custom QR codes that enhance customer experience and boost engagement.
          </p>
          <Link to="/generate-qr-code">
            <button className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 flex items-center mx-auto">
                Create Your First QR Code Free
                <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>

        {/* Why QR Codes Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-16">Why Your Business Needs QR Codes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="bg-purple-100 p-4 rounded-full w-fit mb-6">
                <Store className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Enhance Physical Presence</h3>
              <p className="text-gray-600">
                Turn physical materials into interactive experiences. Add QR codes to business cards, product packaging, or store displays to provide instant access to your digital content.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="bg-purple-100 p-4 rounded-full w-fit mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Boost Customer Engagement</h3>
              <p className="text-gray-600">
                Make it effortless for customers to follow you on social media, leave reviews, or access exclusive content. Increase engagement with one simple scan.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="bg-purple-100 p-4 rounded-full w-fit mb-6">
                <Share2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Track & Analyze</h3>
              <p className="text-gray-600">
                Understand customer behavior by tracking QR code scans. Get insights on when and where customers interact with your business.
              </p>
            </div>
          </div>
        </div>

        {/* Current Pricing Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-16">Start For Free</h2>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Freemium</h3>
                <span className="bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium">
                  Current Plan
                </span>
              </div>
              <div className="mb-8">
                <p className="text-4xl font-bold mb-2">$0</p>
                <p className="text-gray-600">No credit card required</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Unlimited QR Code Generation</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Custom Colors & Designs</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Logo Integration</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>High-Resolution Downloads</span>
                </div>
              </div>
              <Link to="/generate-qr-code">
                <button className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                    Get Started Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-16">Create Your QR Code in 3 Simple Steps</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Enter Your Content</h3>
              <p className="text-gray-600">
                Add your URL, contact information, or any content you want to share
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Palette className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Customize Design</h3>
              <p className="text-gray-600">
                Choose colors and add your logo to match your brand identity
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <DownloadIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Download & Share</h3>
              <p className="text-gray-600">
                Get your QR code in high quality, ready to use anywhere
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-12 text-center mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses using QR codes to connect with customers in innovative ways.
            </p>
            <Link to='/generate-qr-code'>
                <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transform hover:scale-105 transition-all duration-200">
                Create Your First QR Code Now - It's Free!
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;