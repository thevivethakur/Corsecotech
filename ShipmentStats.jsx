import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, Clock, CheckCircle } from "lucide-react";

export default function ShipmentStats({ shipments, isLoading }) {
  const getStats = () => {
    const total = shipments.length;
    const inTransit = shipments.filter(s => s.status === 'in_transit').length;
    const delivered = shipments.filter(s => s.status === 'delivered').length;
    const delayed = shipments.filter(s => s.status === 'delayed').length;
    const imports = shipments.filter(s => s.type === 'import').length;
    const exports = shipments.filter(s => s.type === 'export').length;

    return { total, inTransit, delivered, delayed, imports, exports };
  };

  const stats = getStats();

  const statCards = [
    {
      title: "Total Shipments",
      value: stats.total,
      icon: Package,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "In Transit",
      value: stats.inTransit,
      icon: Truck,
      gradient: "from-amber-500 to-orange-600"
    },
    {
      title: "Delivered",
      value: stats.delivered,
      icon: CheckCircle,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      title: "Delayed",
      value: stats.delayed,
      icon: Clock,
      gradient: "from-red-500 to-pink-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}