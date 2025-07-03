
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Server, Database, Cloud, Shield, Smartphone } from "lucide-react";

const techCategories = [
  {
    name: "CV Models",
    icon: Code,
    items: ["YOLOv8", "EfficientNet", "MMDetection"],
    color: "bg-blue-100 text-blue-700"
  },
  {
    name: "Backend",
    icon: Server,
    items: ["Python", "FastAPI", "Celery", "Postgres"],
    color: "bg-green-100 text-green-700"
  },
  {
    name: "Frontend",
    icon: Smartphone,
    items: ["React", "Tailwind CSS", "Next.js PWA"],
    color: "bg-purple-100 text-purple-700"
  },
  {
    name: "OCR & Forensics",
    icon: Shield,
    items: ["PaddleOCR", "Tesseract", "ExifTool", "Pillow"],
    color: "bg-orange-100 text-orange-700"
  },
  {
    name: "LLM Orchestration",
    icon: Database,
    items: ["LangChain", "OpenRouter", "(Closed Layer)"],
    color: "bg-red-100 text-red-700"
  },
  {
    name: "Infrastructure",
    icon: Cloud,
    items: ["S3/Supabase", "Docker", "Vercel/Render", "GitHub CI/CD"],
    color: "bg-cyan-100 text-cyan-700"
  }
];

export default function TechStack() {
  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Core Technology Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="font-semibold text-slate-800">{category.name}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <Badge 
                        key={itemIndex} 
                        variant="outline" 
                        className={`${category.color} border-current`}
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
