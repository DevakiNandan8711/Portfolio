import React from 'react';

export class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("WebGL Canvas Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }
      // Fallback UI when WebGL crashes on mobile due to memory limits
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#020308] border border-white/10 rounded-2xl p-6 text-center">
          <svg className="w-8 h-8 text-slate-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-xs text-slate-400 font-mono">3D Scene unavailable on this device</p>
        </div>
      );
    }
    return this.props.children;
  }
}
