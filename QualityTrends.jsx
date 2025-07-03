
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { format, subDays } from "date-fns";

export default function QualityTrends({ inspections, isLoading }) {
  const getTrendData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(new Date(), 6 - i);
      return {
        date: format(date, 'MMM dd'),
        fullDate: date,
        avgScore: 0,
        count: 0
      };
    });

    inspections.forEach(inspection => {
      const inspectionDate = new Date(inspection.created_date);
      const dayData = last7Days.find(day => 
        format(day.fullDate, 'yyyy-MM-dd') === format(inspectionDate, 'yyyy-MM-dd')
      );
      
      if (dayData) {
        dayData.avgScore += inspection.ai_analysis?.quality_score || 0;
        dayData.count++;
      }
    });

    return last7Days.map(day => ({
      ...day,
      avgScore: day.count > 0 ? day.avgScore / day.count : 0
    }));
  };

  const trendData = getTrendData();

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-slate-800">Quality Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <YAxis 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value) => [`${value.toFixed(1)}%`, 'Quality Score']}
              />
              <Line 
                type="monotone" 
                dataKey="avgScore" 
                stroke="#06b6d4" 
                strokeWidth={2}
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#06b6d4', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
