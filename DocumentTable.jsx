
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, ExternalLink, Eye, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  draft: "bg-gray-100 text-gray-700",
  submitted: "bg-blue-100 text-blue-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  expired: "bg-orange-100 text-orange-700"
};

const complianceConfig = {
  pending: { label: "Pending", color: "bg-gray-100 text-gray-700", icon: Clock },
  verified: { label: "Verified", color: "bg-green-100 text-green-700", icon: CheckCircle },
  mismatch_detected: { label: "Mismatch", color: "bg-amber-100 text-amber-700", icon: AlertTriangle },
  error: { label: "Error", color: "bg-red-100 text-red-700", icon: AlertTriangle }
};

const documentTypeLabels = {
  commercial_invoice: "Commercial Invoice",
  packing_list: "Packing List",
  bill_of_lading: "Bill of Lading",
  certificate_of_origin: "Certificate of Origin",
  customs_declaration: "Customs Declaration",
  quality_certificate: "Quality Certificate",
  inspection_report: "Inspection Report",
  insurance_certificate: "Insurance Certificate",
  export_license: "Export License",
  import_permit: "Import Permit"
};

export default function DocumentTable({ documents, shipments, isLoading, onDocumentSelect }) {
  const getShipmentInfo = (shipmentId) => {
    return shipments.find(s => s.id === shipmentId || s.shipment_id === shipmentId);
  };

  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Shipment</TableHead>
                  <TableHead>Compliance</TableHead> {/* Changed from Status to Compliance */}
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell> {/* Skeleton for Compliance */}
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
                <TableHead className="font-semibold text-slate-700">Document</TableHead>
                <TableHead className="font-semibold text-slate-700">Type</TableHead>
                <TableHead className="font-semibold text-slate-700">Shipment</TableHead>
                <TableHead className="font-semibold text-slate-700">Compliance</TableHead> {/* Changed from Status to Compliance */}
                <TableHead className="font-semibold text-slate-700">Date</TableHead>
                <TableHead className="font-semibold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No documents found. Upload your first document to get started.
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((document) => {
                  const shipment = getShipmentInfo(document.shipment_id);
                  const compliance = complianceConfig[document.compliance_status] || complianceConfig.pending; // Get compliance config
                  const ComplianceIcon = compliance.icon; // Get the icon component

                  return (
                    <TableRow key={document.id} className="border-slate-100 hover:bg-slate-50/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-slate-400" />
                          <span className="font-medium text-slate-800">{document.document_name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {documentTypeLabels[document.document_type] || document.document_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {shipment ? (
                          <div className="text-sm">
                            <div className="font-medium">{shipment.shipment_id}</div>
                            <div className="text-slate-500">{shipment.origin} → {shipment.destination}</div>
                          </div>
                        ) : (
                          <span className="text-slate-400">Unlinked</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={compliance.color}>
                          <ComplianceIcon className="w-3 h-3 mr-1" /> {/* Display the icon */}
                          {compliance.label} {/* Display the label */}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {format(new Date(document.created_date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDocumentSelect(document)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <a
                            href={document.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                        </div>
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
