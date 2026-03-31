import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(
  'https://kcgszexuwgxqwwfnmyqd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjZ3N6ZXh1d2d4cXd3Zm5teXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5Mzk1NjIsImV4cCI6MjA5MDUxNTU2Mn0.iCAE1riSUS6Rw3i8-tjVtUi3MCJSiz1nt_jLr3b-cvw'
);

/**
 * MaintenanceGuard Template (Web Version)
 * 
 * 1. Copy this file into your project at src/components/MaintenanceGuard.tsx
 * 2. In your App.tsx, wrap your app:
 *    <MaintenanceGuard systemId="ext-x">...</MaintenanceGuard>
 */

export function MaintenanceGuard({ children, systemId }: { children: any, systemId: string }) {
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current status
    const fetchStatus = async () => {
      const { data } = await supabase
        .from('system_status')
        .select('is_locked')
        .eq('id', systemId)
        .single();
      if (data) setIsLocked(data.is_locked);
      setLoading(false);
    };

    fetchStatus();

    // Listen for REAL-TIME changes from Devspace
    const channel = supabase
      .channel('maintenance')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'system_status',
        filter: `id=eq.${systemId}`
      }, (payload: any) => {
        setIsLocked(payload.new.is_locked);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [systemId]);

  if (loading) return null;

  if (isLocked) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-6 bg-primary overflow-hidden noise-bg">
        {/* Editorial Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-lora font-bold text-white/[0.03] pointer-events-none select-none tracking-tighter whitespace-nowrap z-0 uppercase">
          Azure Sanctuary
        </div>

        {/* Gloss Card */}
        <div className="relative z-10 w-full max-w-2xl fade-in">
          <div className="relative glass-dark p-12 md:p-20 rounded-[40px] shadow-premium-gold border border-white/5 bg-[#0a2d21]/40 backdrop-blur-3xl overflow-hidden flex flex-col items-center text-center">
            
            {/* Animated Gold Aura */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full"></div>

            {/* Icon/Badge */}
            <div className="relative mb-12">
              <div className="w-24 h-24 rounded-full border border-secondary/20 flex items-center justify-center bg-white/5 shadow-inner group transition-all duration-700 hover:border-secondary/40">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-500" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16.5 10.5V6.75C16.5 4.26472 14.4853 2.25 12 2.25C9.51472 2.25 7.5 4.26472 7.5 6.75V10.5M6.75 10.5H17.25C18.0784 10.5 18.75 11.1716 18.75 12V19.5C18.75 20.3284 18.0784 21 17.25 21H6.75C5.92157 21 5.25 20.3284 5.25 19.5V12C5.25 11.1716 5.92157 10.5 6.75 10.5Z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full bg-secondary/20 blur-2xl -z-10"></div>
            </div>

            <span className="text-secondary font-bold tracking-[0.6em] uppercase text-[10px] mb-6 block opacity-80 font-outfit">
              System Operations — ROC Hub
            </span>

            <h1 className="text-3xl md:text-5xl font-lora font-bold text-white mb-8 leading-tight tracking-tight text-balance">
              The Sanctuary is being <br />
              <span className="italic font-normal text-secondary/90 italic-serif">Optimized for Excellence.</span>
            </h1>

            <p className="text-lg text-white/70 leading-relaxed font-outfit max-w-md mx-auto mb-12 border-t border-white/5 pt-8">
              This system is currently undergoing scheduled refinement. We provide a bridge between modern comfort and raw nature — please yield as we polish the experience.
            </p>

            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-[9px] font-bold tracking-[0.3em] text-white/40 uppercase font-outfit">Administrators Active</span>
            </div>
          </div>
        </div>

        {/* Footer Coordinate Accent */}
        <div className="absolute bottom-10 left-10 hidden md:flex items-center gap-6">
          <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] font-outfit">12.3522° N, 121.0667° E</span>
        </div>
      </div>
    );
  }

  return children;
}
