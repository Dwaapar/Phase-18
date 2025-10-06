import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, DollarSign, FileText, AlertCircle } from "lucide-react";

export default function FinanceOpsPage() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Finance Operations Automation</h1>
            <p className="text-xl text-white/80">
              Streamline invoicing, expense tracking, and financial reporting with intelligent automation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-display font-bold text-monks-black mb-6">The Problem</h2>
                <p className="text-xl text-monks-gray leading-relaxed">
                  Manual invoice processing creates bottlenecks. Expense reports pile up. 
                  Financial reporting takes days instead of minutes.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <FileText className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-monks-black mb-2">Invoice Processing</h3>
                    <p className="text-monks-gray">Extract, validate, and process invoices automatically with OCR and AI validation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <DollarSign className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-monks-black mb-2">Expense Tracking</h3>
                    <p className="text-monks-gray">Automated expense categorization and approval workflows with policy compliance.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <AlertCircle className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-monks-black mb-2">Budget Alerts</h3>
                    <p className="text-monks-gray">Real-time budget monitoring with automated alerts and variance reporting.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-monks-light-gray rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-monks-black mb-6">Workflow Map</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <span>Document received via email/upload</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <span>OCR extraction and data validation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <span>Policy compliance checking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <span>Automated approval routing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">5</div>
                  <span>ERP integration and reporting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-monks-accent mb-2">75%</div>
              <div className="text-monks-gray">Processing Time Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-monks-accent mb-2">95%</div>
              <div className="text-monks-gray">Data Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-monks-accent mb-2">60%</div>
              <div className="text-monks-gray">Cost Savings</div>
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/automation/pilot"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 group"
            >
              Book 72h Pilot
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}