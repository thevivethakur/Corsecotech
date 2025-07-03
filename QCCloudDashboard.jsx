import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Cloud, 
  Zap, 
  BarChart3, 
  Users, 
  Settings,
  Play,
  Pause,
  TrendingUp
} from "lucide-react";

export default function QCCloudDashboard({ projects, isLoading }) {
  const cloudStats = {
    activeProjects: projects.filter(p => p.components_used?.some(c => c.status === 'active')).length,
    totalInspections: 15420,
    avgAccuracy: 94.7,
    apiCalls: 28500
  };

  return (
    <div className="space-y-6">
      {/* Cloud Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Projects</p>
                <p className="text-2xl font-bold text-slate-800">{cloudStats.activeProjects}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Cloud className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Inspections</p>
                <p className="text-2xl font-bold text-slate-800">{cloudStats.totalInspections.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Avg Accuracy</p>
                <p className="text-2xl font-bold text-slate-800">{cloudStats.avgAccuracy}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">API Calls</p>
                <p className="text-2xl font-bold text-slate-800">{cloudStats.apiCalls.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QC Cloud Projects */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            QC Cloud Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-8 w-16" />
                </div>
              ))
            ) : projects.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Cloud className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>No QC Cloud projects yet. Create your first project to get started.</p>
              </div>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{project.project_name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {project.industry_vertical}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            project.project_type === 'enterprise' ? 'bg-purple-50 text-purple-700' :
                            project.project_type === 'premium' ? 'bg-blue-50 text-blue-700' :
                            'bg-green-50 text-green-700'
                          }`}
                        >
                          {project.project_type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-4">
                      <p className="text-sm font-medium text-slate-800">
                        {project.performance_metrics?.accuracy_score || 0}% accuracy
                      </p>
                      <p className="text-xs text-slate-500">
                        {project.cv_models?.length || 0} CV models
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Processing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5 text-green-600" />
              Live Processing Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Textile Quality Check</span>
                </div>
                <span className="text-xs text-green-600">Processing...</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Metal Defect Detection</span>
                </div>
                <span className="text-xs text-blue-600">In Queue</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-sm font-medium">Paper Quality Analysis</span>
                </div>
                <span className="text-xs text-amber-600">Waiting</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Connected Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Connections</span>
                <span className="font-semibold text-green-600">12 active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">WebSocket Streams</span>
                <span className="font-semibold text-blue-600">8 active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Batch Jobs</span>
                <span className="font-semibold text-purple-600">3 running</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Throughput</span>
                <span className="font-semibold text-slate-800">247 req/min</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}