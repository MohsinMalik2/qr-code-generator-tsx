import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { Link } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 py-16 mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            QR Code Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate beautiful QR codes for your website, business, or personal use. Simply enter your URL and customize your QR code.
          </p>
        </div>
        
        <div className="flex justify-center">
          <QRCodeGenerator />
        </div>
      </div>
    </div>
  );
};

export default Index;