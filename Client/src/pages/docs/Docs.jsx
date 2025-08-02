import React, { useState } from "react";
import { 
  Plus, 
  MoreVertical, 
  ChevronDown, 
  Grid3X3, 
  List, 
  ArrowUpDown,
  Folder,
  FileText,
  File,
  MoreHorizontal
} from "lucide-react";

const templates = [
  {
    id: 'blank',
    title: 'Blank document',
    type: 'blank',
    preview: null
  },
  {
    id: 'resume-serif',
    title: 'Resume',
    subtitle: 'Serif',
    type: 'template',
    preview: '/api/placeholder/200/250'
  },
  {
    id: 'resume-coral',
    title: 'Resume',
    subtitle: 'Coral',
    type: 'template',
    preview: '/api/placeholder/200/250'
  },
  {
    id: 'letter-spearmint',
    title: 'Letter',
    subtitle: 'Spearmint',
    type: 'template',
    preview: '/api/placeholder/200/250'
  },
  {
    id: 'project-tropic',
    title: 'Project proposal',
    subtitle: 'Tropic',
    type: 'template',
    preview: '/api/placeholder/200/250'
  },
  {
    id: 'brochure-geometric',
    title: 'Brochure',
    subtitle: 'Geometric',
    type: 'template',
    preview: '/api/placeholder/200/250'
  },
  {
    id: 'report-luxe',
    title: 'Report',
    subtitle: 'Luxe',
    type: 'template',
    preview: '/api/placeholder/200/250'
  }
];

const recentDocuments = [
  {
    id: 1,
    title: "Gyanendra Sahoo R",
    type: "docs",
    lastOpened: "Jul 30, 2025",
    preview: '/api/placeholder/300/200'
  },
  {
    id: 2,
    title: "Supervisor_Acceptance_",
    type: "word",
    lastOpened: "Jul 18, 2025",
    preview: '/api/placeholder/300/200'
  },
  { 
    id: 3, 
    title: "Fixfy", 
    type: "docs", 
    lastOpened: "Opened Jun 11, 2025",
    preview: '/api/placeholder/300/200'
  },
];

const Docs = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('anyone');

  const BlankDocumentCard = () => (
    <div
      onClick={() => console.log('Create new document')}
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer"
      style={{ aspectRatio: '3/4' }}
    >
      <div className="h-full flex flex-col items-center justify-center p-6">
        <div className="relative mb-4">
          <div className="w-16 h-20 bg-white border-2 border-gray-300 rounded-sm flex items-center justify-center">
            <Plus className="w-12 h-12 text-blue-500" strokeWidth={1.5} />
          </div>
        </div>
        <span className="text-sm font-medium text-gray-700 text-center">
          Blank document
        </span>
      </div>
    </div>
  );

  const TemplateCard = ({ template }) => (
    <div
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer"
      style={{ aspectRatio: '3/4' }}
    >
      <div className="h-full flex flex-col">
        <div className="flex-1 bg-gray-50 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
        </div>
        <div className="p-3 border-t border-gray-100">
          <div className="text-sm font-medium text-gray-900 truncate">
            {template.title}
          </div>
          {template.subtitle && (
            <div className="text-xs text-gray-500 truncate">
              {template.subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const DocumentCard = ({ doc }) => (
    <div
      onClick={() => console.log(`Open document ${doc.id}`)}
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="aspect-[4/3] bg-gray-50 border-b border-gray-100 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
          <FileText className="w-12 h-12 text-blue-400" />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {doc.title}
            </h3>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              {doc.type === "docs" ? (
                <FileText className="w-3 h-3 mr-1 text-blue-500" />
              ) : (
                <File className="w-3 h-3 mr-1 text-blue-600" />
              )}
              <span className="mr-2">
                {doc.type === "docs" ? "Google Docs" : "Microsoft Word"}
              </span>
              <span>{doc.lastOpened}</span>
            </div>
          </div>
          <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 transition-opacity">
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Start a new document section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-normal text-gray-900">
              Start a new document
            </h2>
            <div className="flex items-center">
              <button className="flex items-center text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded hover:bg-gray-100">
                Template gallery
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <button className="p-2 ml-2 rounded hover:bg-gray-100">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2">
            <div className="flex-shrink-0" style={{ width: '200px' }}>
              <BlankDocumentCard />
            </div>
            {templates.slice(1).map((template) => (
              <div key={template.id} className="flex-shrink-0" style={{ width: '200px' }}>
                <TemplateCard template={template} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent documents section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-normal text-gray-900">
              Recent documents
            </h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                >
                  <option value="anyone">Owned by anyone</option>
                  <option value="me">Owned by me</option>
                  <option value="others">Owned by others</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 border-l border-gray-300 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
              
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                <ArrowUpDown className="w-4 h-4" />
              </button>
              
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                <Folder className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {recentDocuments.map((doc) => (
              <DocumentCard key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;