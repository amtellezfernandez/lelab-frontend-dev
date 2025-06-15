
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal } from "lucide-react";

const UsageInstructions = () => {
    return (
        <Card className="bg-gray-900 border-gray-700 text-gray-300 h-full">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    Running LeLab Locally
                </CardTitle>
                <CardDescription>
                    Instructions for setting up and running the project on your machine.
                </CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-4">
                <div>
                    <h4 className="font-semibold text-gray-200 mb-2">1. Install the Python Backend</h4>
                    <p className="mb-2">
                        Clone the repository from GitHub: <a href="https://github.com/nicolas-rabault/leLab" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">nicolas-rabault/leLab</a>
                    </p>
                    <pre className="bg-gray-800 p-3 rounded-md text-xs overflow-x-auto">
                        <code>
                            git clone https://github.com/nicolas-rabault/leLab
                            <br />
                            cd leLab
                        </code>
                    </pre>
                    <p className="mt-2 mb-2">Install dependencies (virtual environment recommended):</p>
                    <pre className="bg-gray-800 p-3 rounded-md text-xs overflow-x-auto">
                        <code>
                            # Create and activate virtual environment
                            <br />
                            python -m venv .venv
                            <br />
                            source .venv/bin/activate
                            <br />
                            <br />
                            # Install in editable mode
                            <br />
                            pip install -e .
                        </code>
                    </pre>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-200 mb-2">2. Running the Application</h4>
                    <p className="mb-2">After installation, you can use the lelab command-line tools:</p>
                     <ul className="list-disc list-inside space-y-2 text-xs">
                        <li><code className="bg-gray-800 p-1 rounded">lelab</code>: Starts only the FastAPI backend server on http://localhost:8000.</li>
                        <li><code className="bg-gray-800 p-1 rounded">lelab-fullstack</code>: Starts both FastAPI backend (port 8000) and Vite frontend (port 8080).</li>
                        <li><code className="bg-gray-800 p-1 rounded">lelab-frontend</code>: Starts only the frontend development server.</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default UsageInstructions;
