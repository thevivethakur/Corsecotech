import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, Image, X } from "lucide-react";

export default function ImageUpload({ onImageUpload, uploadedImage, imageUrl }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-800">Upload Item Image</CardTitle>
      </CardHeader>
      <CardContent>
        {!imageUrl ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              dragActive 
                ? 'border-teal-400 bg-teal-50' 
                : 'border-slate-300 hover:border-slate-400'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Image className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Drop your image here
                </h3>
                <p className="text-slate-600 mb-4">
                  or click to browse from your device
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // Mobile camera capture
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.capture = 'environment';
                    input.onchange = (e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    };
                    input.click();
                  }}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
              </div>
              
              <p className="text-xs text-slate-500">
                Supports JPG, PNG, WEBP up to 10MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={imageUrl} 
                alt="Uploaded item"
                className="w-full h-64 object-cover rounded-xl border border-slate-200"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  onImageUpload(null);
                }}
                className="absolute top-2 right-2 bg-white/90 hover:bg-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-slate-600 text-center">
              Image uploaded successfully. Ready for AI analysis.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}