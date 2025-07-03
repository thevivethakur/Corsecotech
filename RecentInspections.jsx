
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  pass: { 
    icon: CheckCircle, 
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    label: "Pass"
  },
  fail: { 
    icon: AlertTriangle, 
    color: "bg-red-100 text-red-700 border-red-200",
    label: "Fail"
  },
  needs_review: { 
    icon: Clock, 
    color: "bg-amber-100 text-amber-700 border-amber-200",
    label: "Review"
  }
};

const defaultIndustryColors = {
  furniture: "bg-amber-50 text-amber-700 border-amber-200",
  scrap_metal: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pulp_paper: "bg-blue-50 text-blue-700 border-blue-200",
  apparel: "bg-pink-50 text-pink-700 border-pink-200",
};

const generateColorForString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // This is a simple version. For better contrast, one might use HSL calculations.
  // Returning a fixed style for now for simplicity.
  return "bg-slate-100 text-slate-700 border-slate-200";
};

export default function RecentInspections({ inspections, isLoading }) {
  const recentInspections = inspections.slice(0, 8);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-slate-800">Recent Inspections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))
          ) : recentInspections.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p>No inspections yet. Start by uploading an item for analysis.</p>
            </div>
          ) : (
            recentInspections.map((inspection) => {
              const status = inspection.ai_analysis?.overall_status || 'needs_review';
              const StatusIcon = statusConfig[status]?.icon || Clock;
              const industryColor = defaultIndustryColors[inspection.industry_type] || generateColorForString(inspection.industry_type);
              
              return (
                <div key={inspection.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={inspection.image_url} 
                        alt={inspection.item_name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <a
                        href={inspection.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-slate-50"
                      >
                        <ExternalLink className="w-3 h-3 text-slate-600" />
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{inspection.item_name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={`${industryColor} capitalize`}>
                          {inspection.industry_type.replace(/_/g, ' ')}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {format(new Date(inspection.created_date), "MMM d, HH:mm")}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-700">
                      {inspection.ai_analysis?.quality_score || 0}%
                    </span>
                    <Badge variant="outline" className={statusConfig[status]?.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig[status]?.label}
                    </Badge>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
