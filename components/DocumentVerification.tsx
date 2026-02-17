import React, { useState, useRef } from 'react';
import { Upload, FileCheck, AlertTriangle, Loader2, CheckCircle2 } from 'lucide-react';
import { verifyDocumentWithGemini } from '../services/geminiService';

export const DocumentVerification: React.FC<{ isLightMode?: boolean }> = ({ isLightMode }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleVerify = async () => {
    if (!file || !preview) return;
    setIsAnalyzing(true);
    try {
      const base64Data = preview.split(',')[1];
      const analysis = await verifyDocumentWithGemini(base64Data, file.type, "Check authenticity.");
      setResult(analysis);
    } catch (error) { setResult("Error analyzing."); } 
    finally { setIsAnalyzing(false); }
  };

  return (
    <section id="verify" className={`py-32 relative border-t ${isLightMode ? 'bg-steelblue-50 border-steelblue-200' : 'bg-steelblue-900 border-steelblue-800'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative z-10">
            <span className="text-lightblue-400 font-mono text-sm tracking-[0.2em] uppercase mb-4 block">AI Forensics</span>
            <h2 className={`text-5xl md:text-6xl font-display font-medium mb-8 leading-tight ${isLightMode ? 'text-steelblue-900' : 'text-white'}`}>
              Verify Documents <br />
              <span className="text-champagne-500 italic">Instantly.</span>
            </h2>
            <p className={`mb-12 text-lg font-light leading-relaxed ${isLightMode ? 'text-steelblue-700' : 'text-steelblue-200'}`}>
              Upload agreements, affidavits, or notices. Our AI scans for formatting errors, missing clauses, and authenticity markers.
            </p>
            
            <div className="space-y-8">
              {[
                  { title: "Upload", desc: "PDF, JPG, PNG supported", icon: Upload },
                  { title: "Scan", desc: "AI detects anomalies", icon: AlertTriangle }
              ].map((item, i) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className={`p-4 rounded-2xl border transition-colors ${
                      isLightMode ? 'bg-white border-steelblue-200 text-steelblue-600' : 'bg-steelblue-800 border-steelblue-700 text-champagne-400'
                    }`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className={`font-display font-bold text-xl mb-1 ${isLightMode ? 'text-steelblue-900' : 'text-white'}`}>{item.title}</h4>
                      <p className={`text-sm ${isLightMode ? 'text-steelblue-500' : 'text-steelblue-400'}`}>{item.desc}</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          <div className={`relative rounded-[2rem] p-1 bg-gradient-to-br from-champagne-300 to-steelblue-500`}>
             <div className={`rounded-[1.9rem] p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl ${
                isLightMode ? 'bg-white' : 'bg-steelblue-950'
             }`}>
                {!result ? (
                  <div className="flex flex-col items-center justify-center text-center space-y-8">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group ${
                         isLightMode 
                           ? 'border-steelblue-200 hover:border-champagne-400 hover:bg-steelblue-50' 
                           : 'border-steelblue-700 hover:border-champagne-500 hover:bg-steelblue-900'
                      }`}
                    >
                      {preview ? (
                        <img src={preview} alt="Preview" className="h-full w-full object-contain rounded-2xl opacity-90 p-4" />
                      ) : (
                        <>
                          <div className={`h-24 w-24 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                            isLightMode ? 'bg-steelblue-100 text-steelblue-600' : 'bg-steelblue-800 text-champagne-400'
                          }`}>
                            <Upload className="h-10 w-10" />
                          </div>
                          <p className={`font-display font-bold text-xl ${isLightMode ? 'text-steelblue-900' : 'text-white'}`}>Upload Document</p>
                          <p className="text-sm opacity-60 mt-2">Drag & Drop or Click</p>
                        </>
                      )}
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                    </div>

                    <button
                      onClick={handleVerify}
                      disabled={!file || isAnalyzing}
                      className="w-full py-5 rounded-2xl font-bold text-steelblue-900 bg-champagne-500 hover:bg-champagne-400 transition-all flex items-center justify-center gap-3 shadow-lg shadow-champagne-500/20 disabled:opacity-50"
                    >
                      {isAnalyzing ? <><Loader2 className="h-5 w-5 animate-spin" /> Scanning...</> : <><FileCheck className="h-5 w-5" /> Verify Now</>}
                    </button>
                  </div>
                ) : (
                  <div className="animate-slide-up">
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                        <h3 className="font-display font-bold text-2xl text-champagne-400">Analysis Report</h3>
                        <button onClick={() => { setResult(null); setFile(null); setPreview(null); }} className="text-sm underline opacity-60 hover:opacity-100">Reset</button>
                    </div>
                    <div className={`prose prose-sm max-w-none overflow-y-auto max-h-[400px] pr-4 leading-relaxed ${isLightMode ? 'text-steelblue-800' : 'text-steelblue-200'}`}>
                       {result.split('\n').map((line, i) => <p key={i} className="mb-4 text-base">{line}</p>)}
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};