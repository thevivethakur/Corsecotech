import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadFile } from "@/api/integrations";
import { Upload, FileText } from "lucide-react";

const projectTypes = ["open_source", "premium", "enterprise"];
const industryVerticals = ["manufacturing", "trade", "exports", "textiles", "automotive", "electronics"];

export default function NewProjectForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    project_name: '',
    project_type: '',
    industry_vertical: '',
  });
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    let codebase_url = '';
    
    try {
      if (file) {
        const { file_url } = await UploadFile({ file });
        codebase_url = file_url;
      }
      
      await onSubmit({
        ...formData,
        codebase_url
      });
    } catch (error) {
      console.error("Error creating QC project:", error);
    }
    setIsUploading(false);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New QC Forge Project</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project_name">Project Name</Label>
            <Input
              id="project_name"
              value={formData.project_name}
              onChange={(e) => setFormData(prev => ({ ...prev, project_name: e.target.value }))}
              placeholder="e.g., Textile Defect Detector"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_type">Project Type</Label>
            <Select value={formData.project_type} onValueChange={(value) => setFormData(prev => ({ ...prev, project_type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type} value={type} className="capitalize">{type.replace('_', ' ')}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry_vertical">Industry Vertical</Label>
            <Select value={formData.industry_vertical} onValueChange={(value) => setFormData(prev => ({ ...prev, industry_vertical: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industryVerticals.map((industry) => (
                  <SelectItem key={industry} value={industry} className="capitalize">{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Codebase (Optional)</Label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-slate-400 transition-colors"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip,.rar,.tar.gz"
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
                  <p className="text-sm text-slate-600">Click to upload codebase (.zip, .rar)</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!formData.project_name || !formData.project_type || !formData.industry_vertical || isUploading}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isUploading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}