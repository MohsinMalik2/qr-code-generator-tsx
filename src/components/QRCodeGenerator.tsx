import React, { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, Mail, Phone, Text, ImageIcon, ArrowRight, UploadIcon, DownloadIcon } from 'lucide-react';
import QRCode from "qrcode";
import imageCompression from "browser-image-compression";

type DataType = "url" | "text" | "email" | "phone";

interface QRData {
  type: DataType;
  value: string;
}

export const QRCodeGenerator = () => {
  const [data, setData] = useState<QRData>({ type: "url", value: "" });
  const [qrCode, setQrCode] = useState("");
  const [color, setColor] = useState("#4F46E5");
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      console.log("Compressing logo image...");
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 200,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
        toast({
          title: "Logo uploaded successfully",
          description: "Your logo has been added to the QR code.",
        });
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error("Error uploading logo:", err);
      toast({
        title: "Error uploading logo",
        description: "Please try again with a different image",
        variant: "destructive",
      });
    }
  };

  const generateQRCode = async () => {
    try {
      if (!data.value) {
        toast({
          title: "Please enter a value",
          variant: "destructive",
        });
        return;
      }
  
      let finalValue = data.value;
      if (data.type === "email") finalValue = `mailto:${data.value}`;
      if (data.type === "phone") finalValue = `tel:${data.value}`;
  
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to get canvas context");
  
      // Generate the QR code
      const qrDataUrl = await QRCode.toDataURL(finalValue, {
        width: 300,
        margin: 2,
        color: {
          dark: color,
          light: "#FFFFFF",
        },
      });
  
      const qrImage = new Image();
      qrImage.src = qrDataUrl;
      await new Promise((resolve) => (qrImage.onload = resolve));
  
      // Set canvas size
      canvas.width = qrImage.width;
      canvas.height = qrImage.height;
  
      // Draw the QR code on the canvas
      ctx.drawImage(qrImage, 0, 0);
  
      // If a logo is uploaded, draw it on top of the QR code
      if (logo) {
        const logoImage = new Image();
        logoImage.src = logo;
        await new Promise((resolve) => (logoImage.onload = resolve));
  
        const logoSize = canvas.width * 0.2; // 20% of QR code size
        const logoX = (canvas.width - logoSize) / 2;
        const logoY = (canvas.height - logoSize) / 2;
  
        ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
      }
  
      // Set the final QR code data URL
      setQrCode(canvas.toDataURL());
  
      toast({
        title: "QR Code generated!",
        description: "Your QR code is ready to download.",
      });
    } catch (err) {
      console.error("Error generating QR code:", err);
      toast({
        title: "Error generating QR code",
        description: "Please try again with valid input",
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = () => {
    if (!qrCode) return;
    
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code downloaded!",
      description: "Check your downloads folder.",
    });
  };

  const getPlaceholder = () => {
    switch (data.type) {
      case "url":
        return "https://example.com";
      case "email":
        return "example@email.com";
      case "phone":
        return "+1234567890";
      default:
        return "Enter your text here";
    }
  };

  const getIcon = () => {
    switch (data.type) {
      case "url":
        return <Link className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "phone":
        return <Phone className="w-4 h-4" />;
      default:
        return <Text className="w-4 h-4" />;
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Create Your Custom QR Code
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate professional QR codes for your business. Add your brand colors and logo to make them truly yours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6 space-y-6">
            <div className="space-y-6">
              {/* Data Type Selector */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">What would you like to share?</Label>
                <Select
                  value={data.type}
                  onValueChange={(value: DataType) => setData({ ...data, type: value, value: "" })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="url">Website URL</SelectItem>
                    <SelectItem value="text">Plain Text</SelectItem>
                    <SelectItem value="email">Email Address</SelectItem>
                    <SelectItem value="phone">Phone Number</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Content Input */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">
                  Enter your {data.type === "url" ? "website address" : data.type}
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {getIcon()}
                  </span>
                  <Input
                    value={data.value}
                    onChange={(e) => setData({ ...data, value: e.target.value })}
                    placeholder={getPlaceholder()}
                    className="pl-10 h-12"
                  />
                </div>
              </div>

              {/* Customization Section */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold">Customize Your QR Code</h3>
                
                {/* Color Picker */}
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Label htmlFor="color" className="sr-only">Color</Label>
                    <Input
                      id="color"
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-12 h-12 p-1 rounded-lg"
                    />
                  </div>
                  <span className="text-sm text-gray-600">
                    Pick a color that matches your brand
                  </span>
                </div>

                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600">Add your logo (optional)</Label>
                  <div className="flex space-x-2">
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadIcon className="w-4 h-4 mr-2" />
                      {logo ? "Change Logo" : "Upload Logo"}
                    </Button>
                    {logo && (
                      <Button
                        type="button"
                        variant="destructive"
                        className="h-12"
                        onClick={() => setLogo(null)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={generateQRCode} 
                  className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Generate QR Code
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Preview Section */}
          <Card className="p-6 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm">
            {qrCode ? (
              <div className="space-y-6 w-full">
                <div className="flex justify-center">
                  <div className="relative bg-white p-8 rounded-xl shadow-lg">
                    <img src={qrCode} alt="QR Code" className="w-64 h-64" />
                    {logo && (
                      <img
                        src={logo}
                        alt="Brand Logo"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 object-contain"
                      />
                    )}
                  </div>
                </div>
                <Button
                  onClick={downloadQRCode}
                  className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="w-48 h-48 border-4 border-dashed border-gray-200 rounded-lg mb-4 flex items-center justify-center mx-auto">
                  <span className="text-gray-400">Your QR Code will appear here</span>
                </div>
                <p className="text-sm text-gray-500">
                  Fill in your details and click Generate to create your QR code
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;