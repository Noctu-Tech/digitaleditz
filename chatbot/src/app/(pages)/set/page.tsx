"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CreditCard, 
  User, 
  Bell, 
  Key, 
  Settings, 
  Shield, 
  AlertTriangle,
  ChevronRight,
  Check, 
  Plus,
  Toggle
} from "lucide-react";

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

// Custom Switch component instead of using @/components/ui/switch
const CustomSwitch = ({ defaultChecked = false }: { defaultChecked?: boolean }) => {
  const [checked, setChecked] = useState(defaultChecked);
  
  return (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${checked ? 'bg-slate-900' : 'bg-slate-200'}`}
      onClick={() => setChecked(!checked)}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'account' | 'payment' | 'security'>('account');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  // Mock data
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'pm_1',
      type: 'credit',
      name: 'Visa ending in',
      lastFour: '4242',
      expiryDate: '05/25',
      isDefault: true,
    },
    {
      id: 'pm_2',
      type: 'paypal',
      name: 'PayPal',
      isDefault: false,
    }
  ]);
  
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
  
  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
  };
  
  const removePaymentMethod = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };
  
  return (
    <div className="h-screen bg-slate-50 overflow-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Account Settings</h1>
          <p className="text-slate-600 text-sm">Manage your account, subscription, and payment methods.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'account' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-600'}`}
            onClick={() => setActiveTab('account')}
          >
            Account
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'payment' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-600'}`}
            onClick={() => setActiveTab('payment')}
          >
            Payment
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'security' ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-600'}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>
        
        {/* Account Tab Content */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            <Card className="overflow-hidden border border-slate-200 shadow-sm bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 rounded-full p-2">
                      <User className="h-5 w-5 text-slate-700" />
                    </div>
                    <h2 className="text-lg font-medium text-slate-900">Profile Information</h2>
                  </div>
                  <Button variant="outline" className="text-slate-700 text-sm">Edit</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Full Name</p>
                    <p className="text-slate-900">Alex Johnson</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Email Address</p>
                    <p className="text-slate-900">alex.johnson@example.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Company</p>
                    <p className="text-slate-900">Johnson Industries Ltd.</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Role</p>
                    <p className="text-slate-900">Administrator</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-slate-200 shadow-sm bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 rounded-full p-2">
                      <Bell className="h-5 w-5 text-slate-700" />
                    </div>
                    <h2 className="text-lg font-medium text-slate-900">Notification Settings</h2>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-slate-900 font-medium">Email notifications</p>
                      <p className="text-sm text-slate-500">Receive email about account activity</p>
                    </div>
                    <CustomSwitch />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-slate-900 font-medium">Billing alerts</p>
                      <p className="text-sm text-slate-500">Receive billing notifications</p>
                    </div>
                    <CustomSwitch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-slate-900 font-medium">Product updates</p>
                      <p className="text-sm text-slate-500">Receive updates about new features</p>
                    </div>
                    <CustomSwitch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-slate-200 shadow-sm bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-100 rounded-full p-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <h2 className="text-lg font-medium text-slate-900">Delete Account</h2>
                </div>
                
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  
                  {!showDeleteConfirm ? (
                    <Button 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50 text-sm"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      Delete Account
                    </Button>
                  ) : (
                    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                      <p className="text-red-800 font-medium mb-3">Are you sure you want to delete your account?</p>
                      <p className="text-red-600 text-sm mb-4">
                        This will cancel your subscription and delete all your data. You will lose access immediately.
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          className="bg-red-600 hover:bg-red-700 text-white text-sm"
                          onClick={() => setShowDeleteConfirm(false)}
                        >
                          Yes, Delete My Account
                        </Button>
                        <Button 
                          variant="outline" 
                          className="text-slate-700 text-sm"
                          onClick={() => setShowDeleteConfirm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Payment Tab Content */}
        {activeTab === 'payment' && (
          <div className="space-y-6">
            <Card className="overflow-hidden border border-slate-200 shadow-sm bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 rounded-full p-2">
                      <Check className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h2 className="text-lg font-medium text-slate-900">Current Subscription</h2>
                  </div>
                  <div className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    {subscription.status === 'active' ? 'Active' : subscription.status === 'canceled' ? 'Canceled' : 'Past Due'}
                  </div>
                </div>
                
                <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-slate-900 font-medium">{subscription.plan} Plan</p>
                      <p className="text-slate-600 text-sm">Next billing on {subscription.nextBillingDate}</p>
                      <p className="text-slate-600 text-sm">Using {subscription.paymentMethod}</p>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">
                      {formatPrice(subscription.amount)}
                      <span className="text-xs font-normal text-slate-600">/month</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="bg-slate-900 hover:bg-slate-800 text-white text-sm mr-2"
                  onClick={() => setShowUpgradeModal(true)}
                >
                  Upgrade Plan
                </Button>
                <Button variant="outline" className="text-slate-700 text-sm">
                  Cancel Subscription
                </Button>
                
                {showUpgradeModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Upgrade Your Plan</h3>
                      <p className="text-slate-600 mb-4">Choose a plan that best fits your business needs.</p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="border border-slate-200 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-slate-300">
                          <div>
                            <p className="font-medium text-slate-900">Professional</p>
                            <p className="text-sm text-slate-600">$79/month</p>
                          </div>
                          <div className="bg-slate-100 rounded-full h-4 w-4 flex items-center justify-center">
                            <div className="bg-slate-900 rounded-full h-2 w-2"></div>
                          </div>
                        </div>
                        
                        <div className="border border-slate-200 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-slate-300">
                          <div>
                            <p className="font-medium text-slate-900">Enterprise</p>
                            <p className="text-sm text-slate-600">$149/month</p>
                          </div>
                          <div className="bg-slate-100 rounded-full h-4 w-4"></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          className="text-slate-700 text-sm"
                          onClick={() => setShowUpgradeModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          className="bg-slate-900 hover:bg-slate-800 text-white text-sm"
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
            
            <Card className="overflow-hidden border border-slate-200 shadow-sm bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 rounded-full p-2">
                      <CreditCard className="h-5 w-5 text-slate-700" />
                    </div>
                    <h2 className="text-lg font-medium text-slate-900">Payment Methods</h2>
                  </div>
                  <Button variant="outline" className="text-slate-700 text-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 rounded-lg p-2">
                          <CreditCard className="h-5 w-5 text-slate-700" />
                        </div>
                        <div>
                          <p className="text-slate-900">
                            {method.name} {method.lastFour && <span>•••• {method.lastFour}</span>}
                          </p>
                          {method.expiryDate && (
                            <p className="text-sm text-slate-500">Expires {method.expiryDate}</p>
                          )}
                        </div>
                        {method.isDefault && (
                          <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!method.isDefault && (
                          <Button 
                            variant="outline" 
                            className="text-slate-700 text-xs px-2 py-1 h-auto"
                            onClick={() => setDefaultPaymentMethod(method.id)}
                          >
                            Make Default
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          className="text-red-600 border-red-200 hover:bg-red-50 text-xs px-2 py-1 h-auto"
                          onClick={() => removePaymentMethod(method.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-slate-200 shadow-sm bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 rounded-full p-2">
                      <Settings className="h-5 w-5 text-slate-700" />
                    </div>
                    <h2 className="text-lg font-medium text-slate-900">Billing Information</h2>
                  </div>
                  <Button variant="outline" className="text-slate-700 text-sm">Edit</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Billing Name</p>
                    <p className="text-slate-900">Johnson Industries Ltd.</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Billing Email</p>
                    <p className="text-slate-900">billing@johnsonindustries.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Billing Address</p>
                    <p className="text-slate-900">123 Business St.</p>
                    <p className="text-slate-900">Suite 500</p>
                    <p className="text-slate-900">San Francisco, CA 94107</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Tax ID</p>
                    <p className="text-slate-900">US123456789</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Security Tab Content */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card className="overflow-hidden border border-slate-200 shadow-sm bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 rounded-full p-2">
                      <Key className="h-5 w-5 text-slate-700" />
                    </div>
                    <h2 className="text-lg font-medium text-slate-900">Password</h2>
                  </div>
                  <Button variant="outline" className="text-slate-700 text-sm">Change Password</Button>
                </div>
                
                <p className="text-slate-600 text-sm">
                  Last updated 3 months ago. We recommend updating your password regularly.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-slate-200 shadow-sm bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 rounded-full p-2">
                      <Shield className="h-5 w-5 text-slate-700" />
                    </div>
                    <h2 className="text-lg font-medium text-slate-900">Two-Factor Authentication</h2>
                  </div>
                  <CustomSwitch defaultChecked />
                </div>
                
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="text-slate-700 text-sm">
                      Setup Authenticator App
                    </Button>
                    <Button variant="outline" className="text-slate-700 text-sm">
                      Setup SMS Verification
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border border-slate-200 shadow-sm bg-white rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 rounded-full p-2">
                      <Settings className="h-5 w-5 text-slate-700" />
                    </div>
                    <h2 className="text-lg font-medium text-slate-900">Active Sessions</h2>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <p className="text-slate-900">Current Session</p>
                      <p className="text-sm text-slate-500">San Francisco, CA • Chrome on Mac</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-slate-900">Mobile Session</p>
                      <p className="text-sm text-slate-500">San Francisco, CA • iOS App</p>
                    </div>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 text-xs px-2 py-1 h-auto">
                      Log Out
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}