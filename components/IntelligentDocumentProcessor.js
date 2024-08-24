import React, { useState, useEffect } from 'react';
import { FileText, Database, ArrowRight, Cpu } from 'lucide-react';

const IntelligentDocumentProcessor = () => {
  const [step, setStep] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentLLM, setCurrentLLM] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step === 0) {
      const scanInterval = setInterval(() => {
        setScanProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(scanInterval);
            return 100;
          }
          return prevProgress + 5;
        });
      }, 20);
      return () => clearInterval(scanInterval);
    } else {
      setScanProgress(0);
    }
  }, [step]);

  useEffect(() => {
    if (step === 1) {
      const llms = ['LLAMA 3.1', 'GPT', 'Claude Sonnet'];
      let llmIndex = 0;
      const llmInterval = setInterval(() => {
        setCurrentLLM(llms[llmIndex]);
        llmIndex = (llmIndex + 1) % llms.length;
      }, 1000);
      return () => clearInterval(llmInterval);
    }
  }, [step]);

  const DocumentImage = () => (
    <div className={`relative w-full bg-white rounded-lg shadow-lg p-4 transition-all duration-500 ${step > 0 ? 'opacity-25 blur-sm' : ''}`}>
      {step === 0 && (
        <div 
          className="absolute inset-0 bg-blue-200 opacity-50 z-10 pointer-events-none"
          style={{
            clipPath: `inset(0 0 ${100 - scanProgress}% 0)`,
            transition: 'clip-path 0.02s linear'
          }}
        />
      )}
      <img src="/path/to/your/document/image.png" alt="Sample Document" className="w-full h-auto" />
    </div>
  );

  const ProcessingStep = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white">
        {step === 0 && <p className="text-xl font-semibold">Scanning document... {scanProgress}%</p>}
        {step === 1 && (
          <>
            <Cpu className="w-16 h-16 text-blue-500 mx-auto mb-2" />
            <p className="text-xl font-semibold">Processing with {currentLLM}</p>
          </>
        )}
        {step === 2 && <p className="text-xl font-semibold">Extracting information...</p>}
        {step === 3 && (
          <>
            <Database className="w-16 h-16 text-purple-500 mx-auto mb-2" />
            <p className="text-xl font-semibold">Storing data...</p>
          </>
        )}
        {step === 4 && <p className="text-xl font-semibold">Process complete!</p>}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <FileText className={`w-8 h-8 ${step >= 0 ? 'text-purple-500' : 'text-gray-300'}`} />
        <ArrowRight className={`w-8 h-8 ${step >= 1 ? 'text-blue-500' : 'text-gray-300'}`} />
        <Cpu className={`w-8 h-8 ${step >= 2 ? 'text-green-500' : 'text-gray-300'}`} />
        <ArrowRight className={`w-8 h-8 ${step >= 3 ? 'text-blue-500' : 'text-gray-300'}`} />
        <Database className={`w-8 h-8 ${step >= 4 ? 'text-green-500' : 'text-gray-300'}`} />
      </div>
      <div className="h-2 bg-gray-200 rounded mb-4">
        <div 
          className="h-2 bg-purple-500 rounded transition-all duration-500 ease-in-out"
          style={{ width: `${(step + 1) * 25}%` }}
        ></div>
      </div>
      <div className="relative">
        <DocumentImage />
        <ProcessingStep />
      </div>
    </div>
  );
};

export default IntelligentDocumentProcessor;
