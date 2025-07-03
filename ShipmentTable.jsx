import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Calendar, Truck, Package, ExternalLink } from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  pending: { color: "bg-gray-100 text-gray-700", icon: Package },
  in_transit: { color: "bg-blue-100 text-blue-700", icon: Truck },
  customs: { color: "bg-yellow-100 text-yellow-700", icon: Package },
  delivered: { color: "bg-green-100 text-green-700", icon: Package },
  delayed: { color: "bg-red-100 text-red-700", icon: Package },
  cancelled: { color: "bg-gray-100 text-gray-700", icon: Package }
};

const typeColors = {
  import: "bg-indigo-50 text-indigo-700 border-indigo-200",
  export: "bg-emerald-50 text-emerald-700 border-emerald-200"
};

export default function ShipmentTable({ shipments, isLoading, onUpdate }) {
  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead>Shipment ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-16" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
                <TableHead className="font-semibold text-slate-700">Shipment ID</TableHead>
                <TableHead className="font-semibold text-slate-700">Type</TableHead>
                <TableHead className="font-semibold text-slate-700">Route</TableHead>
                <TableHead className="font-semibold text-slate-700">Carrier</TableHead>
                <TableHead className="font-semibold text-slate-700">Status</TableHead>
                <TableHead className="font-semibold text-slate-700">ETA</TableHead>
                <TableHead className="font-semibold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    No shipments found. Create your first shipment to get started.
                  </TableCell>
                </TableRow>
              ) : (
                shipments.map((shipment) => {
                  const status = shipment.status || 'pending';
                  const StatusIcon = statusConfig[status]?.icon || Package;
                  
                  return (
                    <TableRow key={shipment.id} className="border-slate-100 hover:bg-slate-50/50">
                      <TableCell>
                        <div className="font-medium text-slate-800">{shipment.shipment_id}</div>
                        {shipment.tracking_number && (
                          <div className="text-xs text-slate-500">{shipment.tracking_number}</div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={typeColors[shipment.type]}>
                          {shipment.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{shipment.origin}</span>
                          <span className="text-slate-400">→</span>
                          <span>{shipment.destination}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-600">{shipment.carrier}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusConfig[status]?.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {shipment.estimated_arrival ? (
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(shipment.estimated_arrival), "MMM d")}
                          </div>
                        ) : (
                          <span className="text-slate-400">TBD</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
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