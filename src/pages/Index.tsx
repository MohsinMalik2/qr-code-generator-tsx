import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { Link } from "react-router-dom";
import { ArrowRight, Smartphone, Globe, Palette, ImageIcon, Check, Users, Store, Share2, DownloadIcon } from 'lucide-react';
import logo from '../assets/Get QR lOGI/get-qr-logo.png'

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20">
        <div className="text-center">
            <div className="flex justify-center my-10">
                {logo && (
                    <Link to="/">
                      <img
                        src={logo}
                        alt="Brand Logo"/>
                    </Link>
                )}
          </div>
        </div>
        <div>
          <QRCodeGenerator />
         </div>
      </div>
      </div>
  );
};

export default Index;