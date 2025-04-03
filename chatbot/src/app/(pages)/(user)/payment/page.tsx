"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: number;
  billing: string;
  description: string;
  features: string[];
  annualDiscount?: boolean;
  popular?: boolean;
};

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('enterprise');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans: Record<string, Plan> = {
    starter: {
      id: 'starter',
      name: 'Starter',
      price: 29,
      billing: 'per user/month',
      description: 'Perfect for small teams getting started.',
      features: [
        "Up to 10 users",
        "Basic security features",
        "Email support",
        "Standard API access",
        "50GB cloud storage",
        "24-hour response time",
        "Basic analytics",
        "99.5% uptime"
      ]
    },
    professional: {
      id: 'professional',
      name: 'Professional',
      price: 79,
      billing: 'per user/month',
      description: 'For teams that need more power and flexibility.',
      features: [
        "Up to 50 users",
        "Enhanced security features",
        "Chat support",
        "Advanced API access",
        "200GB cloud storage",
        "12-hour response time",
        "Advanced analytics",
        "99.7% uptime",
        "Team collaboration tools"
      ],
      popular: true
    },
    enterprise: {
      id: 'enterprise',
      name: 'Enterprise',
      price: 149,
      billing: 'flat monthly rate',
      description: 'Tailored for growing businesses with advanced needs.',
      features: [
        "Unlimited workspace capacity",
        "Advanced security and compliance",
        "Dedicated account manager",
        "Custom API integrations",
        "500GB secure cloud storage",
        "Priority 4-hour response time",
        "Advanced analytics dashboard",
        "99.9% uptime SLA guarantee"
      ],
      annualDiscount: true
    }
  };

  const currentPlan = plans[selectedPlan];

  const calculatePrice = () => {
    if (billingCycle === 'annual' && currentPlan.annualDiscount) {
      return currentPlan.price * 10; // 10 months for annual billing (2 free)
    }
    return currentPlan.price;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="h-screen bg-slate-50 overflow-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Pricing Plans</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">Choose the perfect plan for your business needs.</p>
        </div>

        {/* Plan selector */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          {Object.values(plans).map((plan) => (
            <div 
              key={plan.id}
              className={`flex-1 border rounded-lg p-4 cursor-pointer transition-all ${selectedPlan === plan.id ? 'border-slate-900 bg-white shadow-md' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{plan.name}</h3>
                  <p className="text-slate-600 text-xs mt-1">{plan.description}</p>
                </div>
                {plan.popular && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-slate-900">
                  {formatPrice(plan.price)}
                  <span className="text-xs font-normal text-slate-600">/{plan.billing}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Billing toggle */}
        {currentPlan.annualDiscount && (
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-slate-100 p-1 rounded-lg">
              <button
                className={`px-3 py-1 text-sm font-medium rounded-md ${billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Monthly Billing
              </button>
              <button
                className={`px-3 py-1 text-sm font-medium rounded-md ${billingCycle === 'annual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
                onClick={() => setBillingCycle('annual')}
              >
                Annual Billing (Save 20%)
              </button>
            </div>
          </div>
        )}

        <Card className="overflow-hidden border border-slate-200 shadow-lg bg-white rounded-lg">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Plan details side */}
              <div className="flex-1 bg-white p-4 md:p-6 border-b md:border-b-0 md:border-r border-slate-200">
                <h3 className="text-lg font-semibold mb-4 text-slate-900">{currentPlan.name} Plan Includes</h3>
                
                <div className="space-y-3">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoice side */}
              <div className="flex-1 p-4 md:p-6 bg-slate-50">
                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                  <div>
                    <h3 className="text-base font-medium text-slate-900 mb-3">Invoice Details</h3>
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-slate-900">
                        {formatPrice(calculatePrice())}
                        <span className="text-xs font-normal text-slate-600">
                          {billingCycle === 'annual' && currentPlan.annualDiscount ? '/year' : '/month'}
                        </span>
                      </div>
                      {billingCycle === 'annual' && currentPlan.annualDiscount && (
                        <p className="text-slate-500 text-xs mt-1">
                          Equivalent to {formatPrice(currentPlan.price)}/month (2 months free)
                        </p>
                      )}
                    </div>
                    <div className="space-y-2 text-xs mb-3">
                      <div className="flex justify-between text-slate-700">
                        <span>Base subscription</span>
                        <span>{formatPrice(calculatePrice())}</span>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>{currentPlan.name} support</span>
                        <span>Included</span>
                      </div>
                      {currentPlan.id === 'enterprise' && (
                        <div className="flex justify-between text-slate-700">
                          <span>Additional users (5)</span>
                          <span>Included</span>
                        </div>
                      )}
                      <div className="border-t border-slate-200 my-2 pt-2 flex justify-between font-medium text-slate-900">
                        <span>Total (USD)</span>
                        <span>{formatPrice(calculatePrice())}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 rounded-md">
                    Purchase {currentPlan.name} Plan
                  </Button>
                  <p className="text-center text-xs text-slate-500">
                    All plans include a 30-day trial period
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" className="text-slate-700 border-slate-300 text-sm py-2">
            Contact Sales
          </Button>
          <Button variant="outline" className="text-slate-700 border-slate-300 text-sm py-2">
            Compare Plans
          </Button>
        </div>
      </div>
    </div>
  );
}