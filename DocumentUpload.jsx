
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UploadFile } from "@/api/integrations";
import { Upload, FileText, CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const documentTypes = [
  { value: "commercial_invoice", label: "Commercial Invoice" },
  { value: "packing_list", label: "Packing List" },
  { value: "bill_of_lading", label: "Bill of Lading" },
  { value: "certificate_of_origin", label: "Certificate of Origin" },
  { value: "customs_declaration", label: "Customs Declaration" },
  { value: "quality_certificate", label: "Quality Certificate" },
  { value: "inspection_report", label: "Inspection Report" },
  { value: "insurance_certificate", label: "Insurance Certificate" },
  { value: "export_license", label: "Export License" },
  { value: "import_permit", label: "Import Permit" }
];

export default function DocumentUpload({ shipments, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    document_name: '',
    document_type: '',
    shipment_id: '',
    issued_by: '',
    valid_until: null,
    status: 'draft'
  });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!formData.document_name) {
        setFormData(prev => ({ ...prev, document_name: selectedFile.name }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      await onSubmit({
        ...formData,
        file_url
      });
    } catch (error) {
      console.error("Error uploading document:", error);
    }
    setIsUploading(false);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Document File</Label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-slate-400 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.rar,.tar.gz"
                onChange={handleFileSelect}
                className="hidden"
              />
              {file ? (
                <div className="flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5 text-slate-600" />
                  <span className="font-medium">{file.name}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-8 h-8 mx-auto text-slate-400" />
                  <p className="text-sm text-slate-600">Click to upload document or codebase (.zip, .rar)</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="document_name">Document Name</Label>
            <Input
              id="document_name"
              value={formData.document_name}
              onChange={(e) => setFormData(prev => ({ ...prev, document_name: e.target.value }))}
              placeholder="Enter document name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document_type">Document Type</Label>
            <Select value={formData.document_type} onValueChange={(value) => setFormData(prev => ({ ...prev, document_type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shipment_id">Link to Shipment (Optional)</Label>
            <Select value={formData.shipment_id} onValueChange={(value) => setFormData(prev => ({ ...prev, shipment_id: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select shipment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>No shipment</SelectItem>
                {shipments.map((shipment) => (
                  <SelectItem key={shipment.id} value={shipment.id}>
                    {shipment.shipment_id} - {shipment.origin} → {shipment.destination}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issued_by">Issued By</Label>
            <Input
              id="issued_by"
              value={formData.issued_by}
              onChange={(e) => setFormData(prev => ({ ...prev, issued_by: e.target.value }))}
              placeholder="Issuing authority or organization"
            />
          </div>

          <div className="space-y-2">
            <Label>Valid Until (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.valid_until ? format(formData.valid_until, 'PPP') : 'Select expiry date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.valid_until}
                  onSelect={(date) => setFormData(prev => ({ ...prev, valid_until: date }))}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!file || !formData.document_name || !formData.document_type || isUploading}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {isUploading ? "Uploading..." : "Upload Document"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
