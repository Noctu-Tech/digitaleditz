"use client"

import React, { useState } from 'react';
import SecurityTab from './_components/SecurityTab';
import AccountTab from './_components/AccountTab';
import ProfilePage from './_components/ProfilePage';
import PaymentTab from './_components/PaymentTab';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile'|'account' | 'payment' | 'security'>('profile');
  
  return (
    <div className="h-screen overflow-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
     
        
        <div className="flex border-b mb-6 pt-8">
        <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'account' ? 'border-b-2' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile</button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'account' ? 'border-b-2' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            Account
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'payment' ? 'border-b-2' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            Payment
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'security' ? 'border-b-2' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>
        {activeTab=="profile" && (<ProfilePage/>)}
        {/* Account Tab Content */}
        {activeTab === 'account' && (
          <AccountTab/>
        )}
        
        {/* Payment Tab Content */}
        {activeTab === 'payment' && (
          <PaymentTab/>
        )}
        
        {/* Security Tab Content */}
        {activeTab === 'security' && (
         <SecurityTab/>
        )}
      </div>
    </div>
  );
}