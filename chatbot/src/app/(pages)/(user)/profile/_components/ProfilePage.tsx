"use client";
import { useState } from 'react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    businessName: 'Acme Corporation',
    email: 'contact@acme.com',
    description: 'Leading provider of innovative solutions.',
    address: 'New York',
    phone: '+1 (555) 123-4567',
    website: 'www.acme.com',
    industry: 'Technology',
    founded: '2020'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // TODO: Add API call to save profile changes
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Business Profile Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={profile.businessName}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${
              !isEditing ? 'bg-foreground-muted' : ''
            }`}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Business Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${
              !isEditing ? 'bg-foreground-muted' : ''
            }`}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={profile.description}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded h-24 ${
              !isEditing ? 'bg-foreground-muted' : ''
            }`}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Business Address</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${
              !isEditing ? 'bg-foreground-muted' : ''
            }`}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${
              !isEditing ? 'bg-foreground-muted' : ''
            }`}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Website</label>
          <input
            type="url"
            name="website"
            value={profile.website}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${
              !isEditing ? 'bg-foreground-muted' : ''
            }`}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Industry</label>
          <input
            type="text"
            name="industry"
            value={profile.industry}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${
              !isEditing ? 'bg-foreground-muted' : ''
            }`}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Founded Year</label>
          <input
            type="text"
            name="founded"
            value={profile.founded}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full p-2 border rounded ${
              !isEditing ? 'bg-foreground-muted' : ''
            }`}
          />
        </div>

        <div className="flex gap-4">
          {isEditing ? (
            <>
              <button
                type="submit"
                className="px-4 py-2 border rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 border rounded"
            >
              Edit Business Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
