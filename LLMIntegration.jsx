
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, MessageSquare, FileSearch, Shield, Users } from "lucide-react";

const llmComponents = [
  {
    name: "Prompt Generator",
    icon: MessageSquare,
    description: "Converts CV tags into textual descriptions",
    status: "active",
    accuracy: 96.2
  },
  {
    name: "Reasoning LLM",
    icon: Brain,
    description: "Matches descriptions to product specs and flags anomalies",
    status: "active",
    accuracy: 94.8
  },
  {
    name: "Doc Cross-checker",
    icon: FileSearch,
    description: "Validates images against invoices/certs",
    status: "testing",
    accuracy: 91.5
  },
  {
    name: "Forensics Judge",
    icon: Shield,
    description: "Detects inconsistency via metadata",
    status: "active",
    accuracy: 98.1
  },
  {
    name: "Inspector Assistant",
    icon: Users,
    description: "Offers human-readable defect summaries",
    status: "active",
    accuracy: 95.7
  }
];

export default function LLMIntegration() {
  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            LLM Integration Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 mb-6">
            QCForge provides patterns for layering intelligence onto inspection results.
            Integrate your own open-source or premium LLMs into your quality control workflows using these flexible architectures.
          </p>
          
          <div className="grid gap-4">
            {llmComponents.map((component, index) => {
              const Icon = component.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {index + 1}. {component.name}
                      </h3>
                      <p className="text-sm text-slate-600">{component.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-800">{component.accuracy}%</p>
                      <p className="text-xs text-slate-500">accuracy</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        component.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' :
                        component.status === 'testing' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {component.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Monetization Strategy */}
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Brain className="w-5 h-5" />
            Monetization via Premium LLM Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Hosted Scoring APIs</h4>
              <p className="text-sm text-slate-600">Premium LLM scoring and analysis</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileSearch className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Enterprise CV Tuning</h4>
              <p className="text-sm text-slate-600">Custom model fine-tuning services</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">Workflow Platform</h4>
              <p className="text-sm text-slate-600">Full inspection workflow management</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
