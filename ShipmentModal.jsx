import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Minus } from "lucide-react";
import { format } from "date-fns";

export default function ShipmentModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    shipment_id: '',
    type: 'import',
    origin: '',
    destination: '',
    carrier: '',
    tracking_number: '',
    status: 'pending',
    estimated_arrival: null,
    items: [{ item_name: '', industry_type: 'furniture', quantity: 1, weight: 0, value: 0 }]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      shipment_id: '',
      type: 'import',
      origin: '',
      destination: '',
      carrier: '',
      tracking_number: '',
      status: 'pending',
      estimated_arrival: null,
      items: [{ item_name: '', industry_type: 'furniture', quantity: 1, weight: 0, value: 0 }]
    });
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { item_name: '', industry_type: 'furniture', quantity: 1, weight: 0, value: 0 }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Shipment</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shipment_id">Shipment ID</Label>
              <Input
                id="shipment_id"
                value={formData.shipment_id}
                onChange={(e) => setFormData(prev => ({ ...prev, shipment_id: e.target.value }))}
                placeholder="SHP-2024-001"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="import">Import</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                value={formData.origin}
                onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                placeholder="Shanghai, China"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                placeholder="Los Angeles, USA"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carrier">Carrier</Label>
              <Input
                id="carrier"
                value={formData.carrier}
                onChange={(e) => setFormData(prev => ({ ...prev, carrier: e.target.value }))}
                placeholder="Maersk Line"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tracking_number">Tracking Number</Label>
              <Input
                id="tracking_number"
                value={formData.tracking_number}
                onChange={(e) => setFormData(prev => ({ ...prev, tracking_number: e.target.value }))}
                placeholder="MSKU1234567"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Estimated Arrival</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.estimated_arrival ? format(formData.estimated_arrival, 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.estimated_arrival}
                  onSelect={(date) => setFormData(prev => ({ ...prev, estimated_arrival: date }))}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Items in Shipment</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </Button>
            </div>
            
            {formData.items.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Item {index + 1}</span>
                  {formData.items.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeItem(index)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Item name"
                    value={item.item_name}
                    onChange={(e) => updateItem(index, 'item_name', e.target.value)}
                  />
                  <Select 
                    value={item.industry_type} 
                    onValueChange={(value) => updateItem(index, 'industry_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="scrap_metal">Scrap Metal</SelectItem>
                      <SelectItem value="pulp_paper">Pulp Paper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                  />
                  <Input
                    type="number"
                    placeholder="Weight (kg)"
                    value={item.weight}
                    onChange={(e) => updateItem(index, 'weight', parseFloat(e.target.value) || 0)}
                  />
                  <Input
                    type="number"
                    placeholder="Value ($)"
                    value={item.value}
                    onChange={(e) => updateItem(index, 'value', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Create Shipment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}