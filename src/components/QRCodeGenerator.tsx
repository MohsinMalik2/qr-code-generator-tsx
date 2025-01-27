import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QRCode from "qrcode";
import { Download, Link, Mail, Phone, Text, Upload } from "lucide-react";
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
    <Card className="w-full max-w-md p-6 space-y-6 animate-fade-in">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Data Type</Label>
          <Select
            value={data.type}
            onValueChange={(value: DataType) => setData({ ...data, type: value, value: "" })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="url">URL</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="value">Enter {data.type}</Label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {getIcon()}
              </span>
              <Input
                id="value"
                type={data.type === "email" ? "email" : "text"}
                placeholder={getPlaceholder()}
                value={data.value}
                onChange={(e) => setData({ ...data, value: e.target.value })}
                className="pl-10"
              />
            </div>
            <Button onClick={generateQRCode} className="bg-primary hover:bg-primary-600">
              Generate
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="color">QR Code Color</Label>
          <div className="flex space-x-2">
            <Input
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 p-1 h-10"
            />
            <span className="flex items-center text-sm text-gray-500">
              Choose QR code color
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Brand Logo</Label>
          <div className="flex space-x-2">
            <Input
              ref={fileInputRef}
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              {logo ? "Change Logo" : "Upload Logo"}
            </Button>
            {logo && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => setLogo(null)}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      {qrCode && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
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
            className="w-full bg-secondary hover:bg-secondary/90"
          >
            <Download className="w-4 h-4 mr-2" />
            Download QR Code
          </Button>
        </div>
      )}
    </Card>
  );
};