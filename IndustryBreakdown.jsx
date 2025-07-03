
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const defaultColors = ["bg-amber-400", "bg-emerald-400", "bg-blue-400", "bg-pink-400", "bg-indigo-400"];

const generateColorForString = (str, index) => {
  if (index < defaultColors.length) return defaultColors[index];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Ensure the hash is non-negative before modulo
  const positiveHash = hash >>> 0; 
  return defaultColors[positiveHash % defaultColors.length];
};

export default function IndustryBreakdown({ inspections, isLoading }) {
  const getIndustryStats = () => {
    const stats = {};

    inspections.forEach(inspection => {
      const industry = inspection.industry_type;
      const score = inspection.ai_analysis?.quality_score || 0;
      
      if (!stats[industry]) {
        stats[industry] = { count: 0, totalScore: 0 };
      }
      
      stats[industry].count++;
      stats[industry].totalScore += score;
    });

    const statArray = Object.keys(stats).map((industry, index) => ({
      name: industry,
      count: stats[industry].count,
      avgScore: stats[industry].count > 0 ? stats[industry].totalScore / stats[industry].count : 0,
      color: generateColorForString(industry, index)
    })).sort((a,b) => b.count - a.count); // Sort by count in descending order

    return statArray;
  };

  const stats = getIndustryStats();
  const total = inspections.length;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-slate-800">Industry Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-2 w-full rounded" />
              </div>
            ))
          ) : (
            stats.map((data) => {
              const percentage = total > 0 ? (data.count / total) * 100 : 0;
              
              return (
                <div key={data.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700 capitalize">
                      {data.name.replace('_', ' ')}
                    </span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-800">{data.count}</span>
                      <span className="text-xs text-slate-500 ml-1">
                        ({data.avgScore.toFixed(0)}% avg)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`${data.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
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
