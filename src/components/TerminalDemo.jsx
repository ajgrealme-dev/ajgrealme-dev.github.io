import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOT_SCRIPTS = {
  agentflow: {
    title: 'AgentFlow Bot',
    logs: [
      { text: '$ node agentflow.js --mode=advanced', delay: 500, type: 'cmd' },
      { text: '[*] Initializing AgentFlow Core v3.5...', delay: 800 },
      { text: '[*] Booting up multi-level approval matrix...', delay: 500 },
      { text: '[*] Connecting to SQLite Database...', delay: 600 },
      { text: '[v] Database connected successfully.', delay: 300, type: 'success' },
      { text: '[*] Connecting to Telegram Client API...', delay: 1000 },
      { text: '[v] Telegram Bot is now ONLINE and listening.', delay: 400, type: 'success' },
      { text: '----------------------------------------', delay: 200, type: 'info' },
      { text: '[!] New message received from User #5805 (Staff Gudang)', delay: 1500, type: 'warning' },
      { text: '    Type: PHOTO (Invoice_Mentah_Buram_Lecek.jpg)', delay: 500, type: 'info' },
      { text: '[*] Applying image enhancement filters (De-blur, Contrast)...', delay: 800, trigger: 'scanning' },
      { text: '[*] Sending enhanced image to Gemini AI Vision API...', delay: 600 },
      { text: '    Analyzing complex document layout...', delay: 1200 },
      { text: '    Handling unreadable handwritten text via context inference...', delay: 1500 },
      { text: '[v] Gemini OCR parsing completed in 1.8s. (100% Confidence)', delay: 500, type: 'success', trigger: 'parsed' },
      { text: '    Extracted Data:', delay: 300, type: 'info' },
      { text: '      - Invoice Date : 11-Jul-2026', delay: 200 },
      { text: '      - Vendor       : PT Logistik Sukses', delay: 200 },
      { text: '      - Total Amount : Rp 5.250.000', delay: 200 },
      { text: '      - Items        : 3 (Spareparts Mesin)', delay: 400 },
      { text: '[*] Inserting structured data into SQLite...', delay: 700 },
      { text: '[v] Record inserted with ID #10852', delay: 400, type: 'success', trigger: 'db' },
      { text: '----------------------------------------', delay: 200, type: 'info' },
      { text: '[*] Initiating Multi-Level Approval Workflow...', delay: 800 },
      { text: '    -> Sending approval request to SPV Shift (User #1102)...', delay: 600 },
      { text: '[v] APPROVED by SPV Shift.', delay: 1200, type: 'success' },
      { text: '    -> Forwarding to Kepala Bagian (User #0988)...', delay: 500 },
      { text: '[v] APPROVED by Kepala Bagian.', delay: 1400, type: 'success' },
      { text: '    -> Finalizing with Kepala Divisi Operasional (User #0101)...', delay: 400 },
      { text: '[v] APPROVED by Kepala Divisi.', delay: 1100, type: 'success' },
      { text: '[*] Sending final auto-receipt to User #5805...', delay: 600 },
      { text: '[v] Workflow completed successfully.', delay: 300, type: 'success' },
      { text: 'Waiting for next message...', delay: 1000, trigger: 'done' }
    ]
  },
  jobscraper: {
    title: 'Job Scraper Bot',
    logs: [
      { text: '$ python bot.py --keyword "IT Support" --location "Banten" --mode="god_mode"', delay: 500, type: 'cmd' },
      { text: '[*] Initializing Job Scraper Engine v3.0 (God Mode)...', delay: 700 },
      { text: '[*] Loading stealth proxies & rotating user-agents...', delay: 500 },
      { text: '[v] Environment loaded successfully.', delay: 300, type: 'success' },
      { text: '----------------------------------------', delay: 200, type: 'info' },
      { text: '[*] Phase 1: Deep Dorking on Google & LinkedIn...', delay: 800, trigger: 'radar' },
      { text: '    Executing advanced dork: site:linkedin.com/in "HRD" OR "Talent Acquisition" "IT" "Banten"', delay: 600, type: 'cmd' },
      { text: '    Bypassing anti-bot protections & CAPTCHAs...', delay: 1200 },
      { text: '[v] Found 45 potential recruiter profiles & company leads.', delay: 500, type: 'success', trigger: 'leads' },
      { text: '[*] Phase 2: Extracting hidden emails & Auto-Form Filling...', delay: 900 },
      { text: '    Crawling PT Alpha Teknologi (No public email found)...', delay: 600 },
      { text: '    -> Permutating emails (firstname.lastname@...)...', delay: 500 },
      { text: '    Crawling CV Sukses Makmur (Found Contact Form)...', delay: 700 },
      { text: '    -> Auto-filling contact form using AI Persona...', delay: 800 },
      { text: '[v] Extracted 18 raw email addresses & submitted 5 forms.', delay: 400, type: 'success' },
      { text: '[*] Phase 3: Advanced SMTP Verification...', delay: 800, trigger: 'smtp' },
      { text: '    Verifying hrd@alphatek.co.id... [VALID - Catch-All Bypassed]', delay: 400, type: 'success' },
      { text: '    Verifying joko.susanto@bantenlog.com... [VALID - Direct HR]', delay: 500, type: 'success' },
      { text: '    Verifying karir@suksesmakmur.net... [VALID]', delay: 400, type: 'success' },
      { text: '[*] Phase 4: Compiling data & drafting AI applications...', delay: 700 },
      { text: '[v] Successfully compiled 12 highly qualified direct leads.', delay: 400, type: 'success', trigger: 'excel' },
      { text: '[*] Saving to companies_recruitment_leads.xlsx...', delay: 600 },
      { text: '[v] Excel file saved successfully. Campaign ready to blast.', delay: 300, type: 'success' },
      { text: '----------------------------------------', delay: 200, type: 'info' },
      { text: '[v] Job search & deep extraction complete. Exiting.', delay: 800, type: 'success', trigger: 'done' }
    ]
  }
};

export default function TerminalDemo({ botType = 'agentflow' }) {
  const [logs, setLogs] = useState([]);
  const [visualState, setVisualState] = useState('idle');
  const [isFinished, setIsFinished] = useState(false);
  const scrollRef = useRef(null);
  
  const script = BOT_SCRIPTS[botType] || BOT_SCRIPTS.agentflow;

  useEffect(() => {
    let currentLogIndex = 0;
    let isMounted = true;
    
    const runScript = () => {
      if (currentLogIndex >= script.logs.length) {
        setIsFinished(true);
        return;
      }
      
      const log = script.logs[currentLogIndex];
      
      setTimeout(() => {
        if (!isMounted) return;
        
        setLogs(prev => [...prev, log]);
        if (log.trigger) {
          setVisualState(log.trigger);
        }
        
        currentLogIndex++;
        runScript();
      }, log.delay);
    };
    
    // Start delay
    setTimeout(() => {
      if (isMounted) runScript();
    }, 1000);
    
    return () => {
      isMounted = false;
    };
  }, [botType, script.logs]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Terminal Line Styling
  const getLogStyle = (type) => {
    switch(type) {
      case 'cmd': return { color: '#fbbf24', fontWeight: 'bold' }; // yellow
      case 'success': return { color: '#34d399' }; // green
      case 'warning': return { color: '#fb923c' }; // orange
      case 'info': return { color: '#60a5fa' }; // blue
      default: return { color: '#e5e7eb' }; // text-gray-200
    }
  };

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#050510',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      overflow: 'hidden'
    }}>
      
      {/* LEFT: TERMINAL */}
      <div style={{
        flex: '0 0 55%',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444'}}></div>
          <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#f59e0b'}}></div>
          <div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10b981'}}></div>
          <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: '#9ca3af', fontFamily: 'JetBrains Mono, monospace' }}>
            {script.title} - Terminal
          </span>
        </div>
        
        <div ref={scrollRef} style={{
          flex: 1,
          backgroundColor: '#0a0a0a',
          borderRadius: '8px',
          padding: '1.5rem',
          fontFamily: 'JetBrains Mono, Courier, monospace',
          fontSize: '0.9rem',
          lineHeight: '1.6',
          overflowY: 'auto',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
        }}>
          {logs.map((log, i) => (
            <div key={i} style={{ ...getLogStyle(log.type), marginBottom: '4px', wordBreak: 'break-all' }}>
              {log.text}
            </div>
          ))}
          {!isFinished && (
            <motion.div 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{ display: 'inline-block', width: '8px', height: '15px', backgroundColor: '#34d399', verticalAlign: 'middle', marginLeft: '4px' }}
            />
          )}
        </div>
      </div>

      {/* RIGHT: VISUAL OUTPUT */}
      <div style={{
        flex: '1',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#0b0b1a',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        
        <AnimatePresence mode="wait">
          {botType === 'agentflow' && (
            <AgentFlowVisual key="agentflow" state={visualState} />
          )}
          {botType === 'jobscraper' && (
            <JobScraperVisual key="jobscraper" state={visualState} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px'
              }}
            >
              <div style={{ color: '#34d399', fontWeight: 'bold', fontSize: '1.2rem' }}>
                Simulasi Selesai
              </div>
              <a 
                href="https://wa.me/6282258050509?text=Halo%20Aziz,%20saya%20tertarik%20dengan%20layanan%20otomasi%20Anda."
                target="_blank" 
                rel="noreferrer"
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#25D366',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Hubungi Aziz di WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// VISUAL COMPONENTS
// ----------------------------------------------------------------------

function AgentFlowVisual({ state }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}
    >
      {state === 'idle' && (
        <div style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="loader" style={{ width: 20, height: 20, border: '2px solid #374151', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          Menunggu input dokumen...
        </div>
      )}

      {state === 'scanning' && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ width: '250px', height: '350px', backgroundColor: '#e5e7eb', borderRadius: '8px', position: 'relative', overflow: 'hidden', padding: '20px' }}>
          {/* Mock Document lines */}
          <div style={{ width: '60%', height: '10px', background: '#9ca3af', marginBottom: '20px', borderRadius: '4px' }}></div>
          <div style={{ width: '80%', height: '8px', background: '#d1d5db', marginBottom: '10px', borderRadius: '4px' }}></div>
          <div style={{ width: '70%', height: '8px', background: '#d1d5db', marginBottom: '10px', borderRadius: '4px' }}></div>
          <div style={{ width: '100%', borderBottom: '2px dashed #9ca3af', margin: '20px 0' }}></div>
          <div style={{ width: '90%', height: '8px', background: '#d1d5db', marginBottom: '10px', borderRadius: '4px' }}></div>
          <div style={{ width: '40%', height: '12px', background: '#9ca3af', marginTop: '30px', borderRadius: '4px', marginLeft: 'auto' }}></div>
          
          {/* Scanner Line */}
          <motion.div
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', left: 0, right: 0, height: '3px', backgroundColor: '#39ff14', boxShadow: '0 0 15px 5px rgba(57,255,20,0.4)', zIndex: 10 }}
          />
        </motion.div>
      )}

      {(state === 'parsed' || state === 'db' || state === 'done') && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ width: '90%', backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '10px 15px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 'bold', borderBottom: '1px solid #334155' }}>
            SQLite Database View - invoices_table
          </div>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ color: '#cbd5e1', borderBottom: '1px solid #334155' }}>
                <th style={{ padding: '12px 15px' }}>ID</th>
                <th style={{ padding: '12px 15px' }}>DATE</th>
                <th style={{ padding: '12px 15px' }}>VENDOR</th>
                <th style={{ padding: '12px 15px' }}>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                <td style={{ padding: '12px 15px' }}>10851</td>
                <td style={{ padding: '12px 15px' }}>10-Jul-2026</td>
                <td style={{ padding: '12px 15px' }}>Toko Makmur</td>
                <td style={{ padding: '12px 15px' }}>Rp 1.200.000</td>
              </tr>
              {state !== 'parsed' && (
                <motion.tr initial={{ backgroundColor: 'rgba(52, 211, 153, 0.4)' }} animate={{ backgroundColor: 'transparent' }} transition={{ duration: 2 }}
                  style={{ borderBottom: '1px solid #334155', color: '#34d399', fontWeight: 'bold' }}>
                  <td style={{ padding: '12px 15px' }}>10852</td>
                  <td style={{ padding: '12px 15px' }}>11-Jul-2026</td>
                  <td style={{ padding: '12px 15px' }}>PT Logistik Sukses</td>
                  <td style={{ padding: '12px 15px' }}>Rp 5.250.000</td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}
      
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </motion.div>
  );
}

function JobScraperVisual({ state }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}
    >
      {state === 'idle' && (
        <div style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="loader" style={{ width: 20, height: 20, border: '2px solid #374151', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          Menunggu parameter target...
        </div>
      )}

      {(state === 'radar' || state === 'leads' || state === 'smtp') && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ width: '200px', height: '200px', borderRadius: '50%', border: '2px solid #3b82f6', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Radar sweep */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: '50%', left: '50%', width: '100px', height: '100px', background: 'conic-gradient(from 0deg, transparent 70%, rgba(59, 130, 246, 0.8) 100%)', transformOrigin: '0% 0%' }}
          />
          {/* Map/Grid background mock */}
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(180deg, rgba(59,130,246,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px', borderRadius: '50%' }}></div>
          
          <div style={{ position: 'absolute', color: '#60a5fa', fontWeight: 'bold', fontSize: '0.8rem' }}>Mencari...</div>
          
          {/* Dots appearing */}
          {(state === 'leads' || state === 'smtp') && (
             <>
               <motion.div initial={{scale:0}} animate={{scale:1}} style={{position:'absolute', width:8, height:8, backgroundColor:'#34d399', borderRadius:'50%', top:'30%', left:'40%', boxShadow:'0 0 10px #34d399'}} />
               <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.3}} style={{position:'absolute', width:8, height:8, backgroundColor:'#34d399', borderRadius:'50%', top:'60%', left:'70%', boxShadow:'0 0 10px #34d399'}} />
               <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.6}} style={{position:'absolute', width:8, height:8, backgroundColor:'#34d399', borderRadius:'50%', top:'70%', left:'30%', boxShadow:'0 0 10px #34d399'}} />
             </>
          )}
        </motion.div>
      )}

      {(state === 'excel' || state === 'done') && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          style={{ width: '95%', backgroundColor: '#ffffff', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
          <div style={{ backgroundColor: '#107c41', padding: '10px 15px', color: 'white', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '3px' }}>X</span>
            companies_recruitment_leads.xlsx
          </div>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.8rem', color: '#333' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f2f1', borderBottom: '1px solid #e1dfdd' }}>
                <th style={{ padding: '8px', borderRight: '1px solid #e1dfdd' }}>Company Name</th>
                <th style={{ padding: '8px', borderRight: '1px solid #e1dfdd' }}>Recruitment Email</th>
                <th style={{ padding: '8px', borderRight: '1px solid #e1dfdd' }}>Job Title / Note</th>
                <th style={{ padding: '8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { c: 'PT Alpha Teknologi', e: 'hrd@alphatek.co.id', j: 'IT Support at PT Alpha...', s: 'Sent' },
                { c: 'CV Sukses Makmur', e: 'karir@suksesmakmur.net', j: 'IT Support at CV Suks...', s: 'Sent' },
                { c: 'PT Banten Logistik', e: 'info@bantenlog.com', j: 'IT Support at PT Bant...', s: 'Skipped (Generic)' },
                { c: 'PT Cipta Karya', e: 'recruitment@ck.co.id', j: 'IT Support at PT Cipta...', s: 'Sent' },
              ].map((row, i) => (
                <motion.tr 
                  key={i}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}
                  style={{ borderBottom: '1px solid #e1dfdd' }}
                >
                  <td style={{ padding: '8px', borderRight: '1px solid #e1dfdd' }}>{row.c}</td>
                  <td style={{ padding: '8px', borderRight: '1px solid #e1dfdd', color: '#0066cc' }}>{row.e}</td>
                  <td style={{ padding: '8px', borderRight: '1px solid #e1dfdd' }}>{row.j}</td>
                  <td style={{ padding: '8px', color: row.s.includes('Sent') ? '#107c41' : '#d83b01', fontWeight: row.s.includes('Sent') ? 'bold' : 'normal' }}>{row.s}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </motion.div>
  );
}
