
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Calendar, User, BrainCircuit, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { format } from "date-fns";

const complianceConfig = {
  pending: { label: "Pending", color: "bg-gray-100 text-gray-700", icon: Clock },
  verified: { label: "Verified", color: "bg-green-100 text-green-700", icon: CheckCircle },
  mismatch_detected: { label: "Mismatch Detected", color: "bg-amber-100 text-amber-700", icon: AlertTriangle },
  error: { label: "Error", color: "bg-red-100 text-red-700", icon: AlertTriangle }
};

export default function DocumentPreview({ document }) {
  const compliance = complianceConfig[document.compliance_status] || complianceConfig.pending;
  const ComplianceIcon = compliance.icon;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg max-h-[80vh] overflow-y-auto">
      <CardHeader className="pb-4 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Document Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        <div>
          <h3 className="font-semibold text-slate-800 mb-2">{document.document_name}</h3>
          <p className="text-sm text-slate-600 capitalize">
            {document.document_type.replace(/_/g, ' ')}
          </p>
        </div>

        {/* DocIQ Analysis Section */}
        <div className="border border-slate-200 rounded-xl p-4 space-y-4">
            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-teal-600" />
                DocIQ Analysis
            </h4>
            
            <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Compliance Status</p>
                <Badge variant="outline" className={compliance.color}>
                    <ComplianceIcon className="w-3 h-3 mr-1.5" />
                    {compliance.label}
                </Badge>
            </div>

            {document.validation_checks && document.validation_checks.length > 0 && (
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-2">Validation Checks</p>
                    <ul className="space-y-2">
                        {document.validation_checks.map((check, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                                {check.status === 'pass' && <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />}
                                {check.status !== 'pass' && <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
                                <div>
                                    <span className="font-medium text-slate-700">{check.check}:</span>
                                    <span className="text-slate-600 ml-1">{check.details}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {document.anomalies_detected && document.anomalies_detected.length > 0 && (
                <div>
                    <p className="text-sm font-medium text-slate-500 mb-2">Detected Anomalies</p>
                    <ul className="space-y-1 list-disc list-inside">
                        {document.anomalies_detected.map((anomaly, index) => (
                            <li key={index} className="text-sm text-red-600">{anomaly}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        {document.ai_extracted_data && (
          <div>
            <p className="text-sm font-medium text-slate-500 mb-2">Extracted Data</p>
            <div className="bg-slate-50 rounded-lg p-3 text-sm max-h-40 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-slate-700">
                {JSON.stringify(document.ai_extracted_data, null, 2)}
              </pre>
            </div>
          </div>
        )}
        
        {document.issued_by && (
            <div>
              <p className="text-sm font-medium text-slate-500">Issued By</p>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <p className="text-slate-800">{document.issued_by}</p>
              </div>
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-slate-500">Upload Date</p>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <p className="text-slate-800">
                {format(new Date(document.created_date), "MMM d, yyyy 'at' HH:mm")}
              </p>
            </div>
          </div>

          {document.valid_until && (
            <div>
              <p className="text-sm font-medium text-slate-500">Valid Until</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <p className="text-slate-800">
                  {format(new Date(document.valid_until), "MMM d, yyyy")}
                </p>
              </div>
            </div>
          )}

        <div className="pt-4">
          <a
            href={document.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Original Document
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
