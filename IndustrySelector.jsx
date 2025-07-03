
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sofa, Wrench, FileText, Shirt, PlusCircle, Cog } from "lucide-react";

const industries = [
  {
    id: "furniture",
    name: "Furniture",
    icon: Sofa,
    description: "Wooden furniture, upholstery",
    color: "from-amber-500 to-orange-600"
  },
  {
    id: "scrap_metal",
    name: "Scrap Metal",
    icon: Wrench,
    description: "Steel, aluminum, copper, iron",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: "pulp_paper",
    name: "Pulp Paper",
    icon: FileText,
    description: "Paper products, cardboard, pulp",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "apparel",
    name: "Apparel",
    icon: Shirt,
    description: "Clothing, textiles, garments",
    color: "from-pink-500 to-rose-600"
  },
  {
    id: "machine_inspection",
    name: "Machinery",
    icon: Cog,
    description: "Industrial parts, engines, tools",
    color: "from-gray-500 to-slate-600"
  },
  {
    id: "other",
    name: "Create New",
    icon: PlusCircle,
    description: "Add a custom industry type",
    color: "from-slate-500 to-slate-600"
  }
];

export default function IndustrySelector({ selectedIndustry, onIndustryChange, itemName, onItemNameChange }) {
  const [customIndustry, setCustomIndustry] = useState('');

  const handleSelectIndustry = (id) => {
    if (id === 'other') {
      onIndustryChange(customIndustry || '');
    } else {
      onIndustryChange(id);
      setCustomIndustry('');
    }
  };

  const handleCustomIndustryChange = (e) => {
    const value = e.target.value;
    setCustomIndustry(value);
    onIndustryChange(value);
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-800">Select Industry Type</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {industries.map((industry) => {
            const Icon = industry.icon;
            const isSelected = selectedIndustry === industry.id || (industry.id === 'other' && selectedIndustry && !industries.slice(0,-1).map(i => i.id).includes(selectedIndustry));
            
            return (
              <button
                key={industry.id}
                onClick={() => handleSelectIndustry(industry.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  isSelected 
                    ? 'border-teal-300 bg-teal-50 shadow-lg' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${industry.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-800">{industry.name}</h3>
                </div>
                <p className="text-sm text-slate-600 h-10">{industry.description}</p>
              </button>
            );
          })}
        </div>

        {(selectedIndustry && !industries.map(i => i.id).includes(selectedIndustry)) && (
          <div className="space-y-2 pt-4 border-t">
            <Label htmlFor="customIndustryName" className="text-sm font-medium text-slate-700">
              Custom Industry Name
            </Label>
            <Input
              id="customIndustryName"
              placeholder="e.g., Electronics"
              value={selectedIndustry}
              onChange={handleCustomIndustryChange}
              className="border-slate-300 focus:border-teal-500 bg-teal-50/50"
            />
          </div>
        )}

        {selectedIndustry && (
          <div className="space-y-2">
            <Label htmlFor="itemName" className="text-sm font-medium text-slate-700">
              Item Name or Description
            </Label>
            <Input
              id="itemName"
              placeholder={`e.g., ${selectedIndustry === 'furniture' ? 'Oak dining chair' : 'Item name'}`}
              value={itemName}
              onChange={(e) => onItemNameChange(e.target.value)}
              className="border-slate-200 focus:border-teal-500"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
