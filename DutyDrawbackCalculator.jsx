import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DollarSign, Percent, ArrowRight, TrendingUp } from "lucide-react";

export default function DutyDrawbackCalculator() {
  const [importValue, setImportValue] = useState('');
  const [dutyRate, setDutyRate] = useState('');

  const { dutiesPaid, potentialDrawback } = useMemo(() => {
    const numImportValue = parseFloat(importValue);
    const numDutyRate = parseFloat(dutyRate);

    if (isNaN(numImportValue) || isNaN(numDutyRate) || numImportValue <= 0 || numDutyRate <= 0) {
      return { dutiesPaid: 0, potentialDrawback: 0 };
    }

    const paid = numImportValue * (numDutyRate / 100);
    const drawback = paid * 0.99; // Up to 99% can be recovered

    return { dutiesPaid: paid, potentialDrawback: drawback };
  }, [importValue, dutyRate]);
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Estimate Your Savings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="importValue" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Total Value of Imported Goods (USD)
            </Label>
            <Input
              id="importValue"
              type="number"
              placeholder="e.g., 50000"
              value={importValue}
              onChange={(e) => setImportValue(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dutyRate" className="flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Import Duty Rate Paid (%)
            </Label>
            <Input
              id="dutyRate"
              type="number"
              placeholder="e.g., 7.5"
              value={dutyRate}
              onChange={(e) => setDutyRate(e.target.value)}
            />
          </div>
          
          {potentialDrawback > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
               <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Duties Paid:</span>
                <span className="font-semibold text-slate-800">{formatCurrency(dutiesPaid)}</span>
              </div>
              <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800">
                 <AlertTitle className="flex items-center gap-2 font-bold">
                  <TrendingUp className="w-5 h-5" />
                   Potential Duty Drawback:
                </AlertTitle>
                <AlertDescription className="text-3xl font-bold text-center py-4">
                  {formatCurrency(potentialDrawback)}
                </AlertDescription>
              </Alert>
               <p className="text-xs text-center text-slate-500">
                This is an estimate. Actual amounts depend on specific regulations and claim details.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800">What is Duty Drawback?</h3>
        <p className="text-slate-600">
          Duty drawback is the refund of up to 99% of customs duties paid on imported goods that are subsequently exported. If you import raw materials or components to manufacture goods that you then export, you may be eligible to recover the duties you paid.
        </p>
        <h4 className="text-lg font-semibold text-slate-700 pt-2">How DocIQ Helps</h4>
        <ul className="space-y-2 list-disc list-inside text-slate-600">
          <li>
            <span className="font-semibold">Automated Data Extraction:</span> Gathers required data from invoices and shipping documents.
          </li>
          <li>
            <span className="font-semibold">Compliance Validation:</span> Ensures your claim documentation is consistent and accurate.
          </li>
          <li>
            <span className="font-semibold">Audit-Proof Trail:</span> Creates a verifiable chain of custody for all related documents.
          </li>
        </ul>
        <Button variant="outline" className="w-full">
            Learn More About Filing a Claim
            <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}