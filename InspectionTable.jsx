
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  pass: { icon: CheckCircle, color: "bg-emerald-100 text-emerald-700" },
  fail: { icon: AlertTriangle, color: "bg-red-100 text-red-700" },
  needs_review: { icon: Clock, color: "bg-amber-100 text-amber-700" }
};

const defaultIndustryColors = {
  furniture: "bg-amber-50 text-amber-700",
  scrap_metal: "bg-emerald-50 text-emerald-700",
  pulp_paper: "bg-blue-50 text-blue-700",
  apparel: "bg-pink-50 text-pink-700"
};

const generateColorForString = (str) => {
  // This function can be expanded later to generate dynamic colors based on the string
  // For now, as per the outline, it returns a fixed color.
  return "bg-slate-100 text-slate-700";
};

export default function InspectionTable({ inspections, isLoading }) {
  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead>Item</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Quality Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-200">
                <TableHead className="font-semibold text-slate-700">Item</TableHead>
                <TableHead className="font-semibold text-slate-700">Industry</TableHead>
                <TableHead className="font-semibold text-slate-700">Quality Score</TableHead>
                <TableHead className="font-semibold text-slate-700">Status</TableHead>
                <TableHead className="font-semibold text-slate-700">Date</TableHead>
                <TableHead className="font-semibold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspections.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No inspections found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              ) : (
                inspections.map((inspection) => {
                  const status = inspection.ai_analysis?.overall_status || 'needs_review';
                  const StatusIcon = statusConfig[status]?.icon || Clock;
                  const industryColor = defaultIndustryColors[inspection.industry_type] || generateColorForString(inspection.industry_type);
                  
                  return (
                    <TableRow key={inspection.id} className="border-slate-100 hover:bg-slate-50/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img 
                            src={inspection.image_url} 
                            alt={inspection.item_name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="font-medium text-slate-800">{inspection.item_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${industryColor} capitalize`}>
                          {inspection.industry_type.replace(/_/g, ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-slate-800">
                          {inspection.ai_analysis?.quality_score || 0}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusConfig[status]?.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {format(new Date(inspection.created_date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <a
                          href={inspection.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-teal-800 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
