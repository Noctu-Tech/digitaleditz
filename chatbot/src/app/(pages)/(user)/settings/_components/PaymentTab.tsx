"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, CreditCard, Plus, Settings } from 'lucide-react'
import React, { useState } from 'react'
type PaymentMethod = {
  id: string;
  type: 'credit' | 'paypal';
  name: string;
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
};

type Subscription = {
  plan: string;
  status: 'active' | 'canceled' | 'past_due';
  nextBillingDate: string;
  amount: number;
  paymentMethod: string;
};

function PaymentTab() {
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
    const [subscription, setSubscription] = useState<Subscription>({
      plan: 'Professional',
      status: 'active',
      nextBillingDate: 'April 15, 2025',
      amount: 79,
      paymentMethod: 'Visa ending in 4242',
    });
    
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(price);
    };
    
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2">
                <Check className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-medium">Current Subscription</h2>
            </div>
            <div className="rounded-full px-2 py-1 text-xs">
              {subscription.status === 'active' ? 'Active' : subscription.status === 'canceled' ? 'Canceled' : 'Past Due'}
            </div>
          </div>
          
          <div className="rounded-lg p-4 mb-4 border">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{subscription.plan} Plan</p>
                <p className="text-opacity-75 text-sm">Next billing on {subscription.nextBillingDate}</p>
                <p className="text-opacity-75 text-sm">Using {subscription.paymentMethod}</p>
              </div>
              <div className="text-2xl font-bold">
                {formatPrice(subscription.amount)}
                <span className="text-xs font-normal text-opacity-75">/month</span>
              </div>
            </div>
          </div>
          
          <Button 
            className="mr-2"
            onClick={() => setShowUpgradeModal(true)}
          >
            Upgrade Plan
          </Button>
          <Button variant="outline">
            Cancel Subscription
          </Button>
          
          {showUpgradeModal && (
            <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
              <div className="rounded-lg p-6 max-w-md w-full m-4">
                <h3 className="text-lg font-bold mb-4">Upgrade Your Plan</h3>
                <p className="text-opacity-75 mb-4">Choose a plan that best fits your business needs.</p>
                
                <div className="space-y-3 mb-4">
                  <div className="border rounded-lg p-3 flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="font-medium">Professional</p>
                      <p className="text-sm text-opacity-75">$79/month</p>
                    </div>
                    <div className="rounded-full h-4 w-4 flex items-center justify-center">
                      <div className="rounded-full h-2 w-2"></div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3 flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="font-medium">Enterprise</p>
                      <p className="text-sm text-opacity-75">$149/month</p>
                    </div>
                    <div className="rounded-full h-4 w-4"></div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    className="text-sm"
                    onClick={() => setShowUpgradeModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="text-sm"
                    onClick={() => setShowUpgradeModal(false)}
                  >
                    Confirm Upgrade
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2">
                <Settings className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-medium">Billing Information</h2>
            </div>
            <Button variant="outline" className="text-sm">Edit</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-opacity-75 mb-1">Billing Name</p>
              <p>Johnson Industries Ltd.</p>
            </div>
            <div>
              <p className="text-sm text-opacity-75 mb-1">Billing Email</p>
              <p>billing@johnsonindustries.com</p>
            </div>
            <div>
              <p className="text-sm text-opacity-75 mb-1">Billing Address</p>
              <p>123 Business St.</p>
              <p>Suite 500</p>
              <p>San Francisco, CA 94107</p>
            </div>
            <div>
              <p className="text-sm text-opacity-75 mb-1">Tax ID</p>
              <p>US123456789</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentTab
