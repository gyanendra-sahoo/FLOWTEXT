// src/components/DocumentList.js

import React from 'react';
import { Link } from 'react-router-dom';

const DocumentList = ({ documents }) => {
    if (documents.length === 0) {
        return (
            <div className="text-center text-gray-500 p-8 border-2 border-dashed rounded-lg">
                No documents found. Start by creating a new one!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
                <Link key={doc.id} to={`/docs/${doc.id}`} className="block">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{doc.title}</h3>
                        <p className="text-sm text-gray-600">
                            Last modified: {doc.lastModified}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default DocumentList;