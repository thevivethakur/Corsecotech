import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock, TrendingUp, RefreshCw } from "lucide-react";

const statusConfig = {
  pass: { 
    icon: CheckCircle, 
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    bgClass: "bg-emerald-50"
  },
  fail: { 
    icon: AlertTriangle, 
    color: "text-red-600 bg-red-50 border-red-200",
    bgClass: "bg-red-50"
  },
  needs_review: { 
    icon: Clock, 
    color: "text-amber-600 bg-amber-50 border-amber-200",
    bgClass: "bg-amber-50"
  }
};

const severityColors = {
  low: "bg-blue-100 text-blue-700 border-blue-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  critical: "bg-red-100 text-red-700 border-red-200"
};

export default function AnalysisResults({ result, itemName, industryType, imageUrl, onNewInspection }) {
  const status = result.overall_status || 'needs_review';
  const StatusIcon = statusConfig[status]?.icon || Clock;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className={`border-0 shadow-xl ${statusConfig[status]?.bgClass}`}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img 
              src={imageUrl} 
              alt={itemName}
              className="w-24 h-24 object-cover rounded-xl border-2 border-white shadow-lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-slate-800">{itemName}</h2>
                <Badge variant="outline" className="capitalize">
                  {industryType.replace('_', ' ')}
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <StatusIcon className={`w-5 h-5 ${statusConfig[status]?.color.split(' ')[0]}`} />
                  <span className="font-semibold capitalize">
                    {status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-slate-600" />
                  <span className="text-2xl font-bold text-slate-800">
                    {result.quality_score}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Defects Detected */}
      {result.defects_detected && result.defects_detected.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">Defects Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {result.defects_detected.map((defect, index) => (
                <div key={index} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{defect.defect_type}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={severityColors[defect.severity]}>
                        {defect.severity}
                      </Badge>
                      <span className="text-sm text-slate-600">
                        {defect.confidence}% confidence
                      </span>
                    </div>
                  </div>
                  {defect.location && (
                    <p className="text-sm text-slate-600 mb-1">
                      <strong>Location:</strong> {defect.location}
                    </p>
                  )}
                  <p className="text-sm text-slate-700">{defect.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-800">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-teal-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-slate-700">{recommendation}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-6 text-center">
          <Button
            onClick={onNewInspection}
            className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white px-8 py-3"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            New Inspection
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}