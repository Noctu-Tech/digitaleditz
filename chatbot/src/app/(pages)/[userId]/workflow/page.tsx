'use client'
import React, { useState } from 'react';
import { Plus, Layout, ArrowRight, Copy, MoreVertical, Clock, Users, Folder } from 'lucide-react';
import Link from 'next/link';

const WorkflowPage = () => {
  const [activeTab, setActiveTab] = useState('my-workflows');
  // Mock user's existing workflows
  const userWorkflows = [
    {
      id: 1,
      title: "Client Onboarding 2024",
      description: "Updated onboarding process for enterprise clients",
      lastEdited: "2 hours ago",
      collaborators: 4,
      status: "Active",
    },
    {
      id: 2,
      title: "Marketing Campaign Flow",
      description: "Q1 2024 social media campaign workflow",
      lastEdited: "1 day ago",
      collaborators: 2,
      status: "Draft",
    },
    {
      id: 3,
      title: "HR Interview Process",
      description: "Technical interview workflow for engineering",
      lastEdited: "3 days ago",
      collaborators: 6,
      status: "Active",
    }
  ];

  // Mock template data
  const templates = [
    {
      id: 1,
      title: "Basic Newsletter",
      description: "A simple newsletter workflow with subscriber management",
      usage: "2.5k uses",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Sales Pipeline",
      description: "Track leads from initial contact to close",
      usage: "1.8k uses",
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Task Manager",
      description: "Organize and track team tasks efficiently",
      usage: "3.2k uses",
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Customer Onboarding",
      description: "Streamline your customer onboarding process",
      usage: "1.5k uses",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with Tabs */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-4">Workflows</h1>
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab('my-workflows')}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === 'my-workflows' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            My Workflows
            {activeTab === 'my-workflows' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
              activeTab === 'templates' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            Templates Gallery
            {activeTab === 'templates' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
            )}
          </button>
        </div>
      </div>

      {activeTab === 'my-workflows' ? (
        <div className="space-y-6">
          {/* Quick Actions */}
         
          {/* User's Workflows */}
          <div className="bg-white rounded-xl shadow-sm divide-y">
            {userWorkflows.map((workflow) => (
              <div key={workflow.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-medium">{workflow.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        workflow.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {workflow.status}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{workflow.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {workflow.lastEdited}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={16} />
                        {workflow.collaborators} collaborators
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={20} className="text-gray-700" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Templates Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create New Template Card */}
          <Link href="../studio"><div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition-colors cursor-pointer group">
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-500 group-hover:text-blue-500">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-blue-50">
                <Plus size={24} className="group-hover:text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Create New Workflow</h3>
              <p className="text-sm text-center">Start from scratch and build your custom workflow</p>
            </div>
          </div></Link>
          {/* Template Cards */}
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className={`h-3 ${template.color} rounded-t-xl`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 ${template.color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                    <Layout size={20} className={template.color.replace('bg-', 'text-')} />
                  </div>
                  <button className="text-gray-700 hover:text-gray-600">
                    <Copy size={18} />
                  </button>
                </div>
                
                <h3 className="text-lg font-medium mb-2">{template.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{template.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{template.usage}</span>
                  <button className="flex items-center gap-2 text-sm font-medium text-blue-500 hover:text-blue-600">
                    Use template
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkflowPage;