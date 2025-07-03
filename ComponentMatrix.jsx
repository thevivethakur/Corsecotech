import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Settings, Eye, Brain, Shield } from "lucide-react";

const components = [
  { name: "CV Models & Defect Zoo", openSource: true, description: "Basic vision models and object detectors", icon: Eye },
  { name: "Forensics Module", openSource: true, description: "GDPR EXIF, GPS, metadata tools", icon: Shield },
  { name: "QC Orchestrator", openSource: true, description: "Manages pipelines, batching, job queue", icon: Settings },
  { name: "Inspector UI (PWA)", openSource: true, description: "Mobile + web uploader for images/docs", icon: Eye },
  { name: "JSON QC Report", openSource: true, description: "Standardized QC output", icon: Settings },
  { name: "API Layer (FastAPI)", openSource: true, description: "Endpoints for integrations", icon: Settings },
  { name: "LLM Scoring Engine", openSource: false, description: "Reasoning logic, vertical prompts", icon: Brain },
  { name: "Trust Passport API", openSource: false, description: "PDF/QR issuance, metadata integrity", icon: Shield },
  { name: "Vertical CV Fine-Tuning", openSource: false, description: "Proprietary domain training data", icon: Brain },
  { name: "Inspector Workflow App", openSource: false, description: "Custom workflows and user cohorts", icon: Settings },
  { name: "Premium UI Dashboard", openSource: false, description: "Insight reports, analytics, alerts", icon: Eye }
];

export default function ComponentMatrix() {
  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Component Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {components.map((component, index) => {
              const Icon = component.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      component.openSource ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        component.openSource ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{component.name}</h3>
                      <p className="text-sm text-slate-600">{component.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {component.openSource ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Open Source
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 border-red-200">
                        <XCircle className="w-3 h-3 mr-1" />
                        Closed Source
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* IP Moat Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              Open Source Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">Drives adoption and extensibility</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">Community-driven development</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">Lower barriers to integration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">Transparent and auditable</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Shield className="w-5 h-5" />
              Closed IP Value
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-red-700">Advanced LLM scoring algorithms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-red-700">Trust Passport generation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-red-700">Domain-specific model tuning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-red-700">Enterprise workflow platform</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}