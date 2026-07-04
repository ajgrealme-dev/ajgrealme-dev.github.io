import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { theme, t } = useApp();
  const isDark = theme === 'dark';
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const subColor = isDark ? '#94a3b8' : '#64748b';
  const cardBg = isDark ? 'rgba(0,245,255,0.03)' : 'rgba(99,102,241,0.04)';
  const cardBorder = isDark ? 'rgba(0,245,255,0.15)' : 'rgba(99,102,241,0.2)';
  const inputBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.8)';
  const inputBorder = isDark ? 'rgba(0,245,255,0.2)' : 'rgba(99,102,241,0.2)';
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/mykqbawa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };
  const inputStyle = (focused) => ({
    width: '100%', padding: '14px 16px',
    background: inputBg,
    border: `1px solid ${focused ? accentColor : inputBorder}`,
    borderRadius: '12px', color: textColor, fontSize: '0.95rem',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused ? (isDark ? `0 0 15px ${accentColor}30` : `0 0 15px rgba(99,102,241,0.2)`) : 'none',
    fontFamily: 'Inter, sans-serif',
    resize: 'vertical',
  });

  const [focused, setFocused] = useState({});
  const contacts = [
    { icon: '📧', label: 'Email', value: 'ajgrealme@gmail.com', href: 'mailto:ajgrealme@gmail.com' },
    { icon: '💬', label: 'WhatsApp', value: '+62 822-5805-0509', href: 'https://wa.me/6282258050509' },
    { icon: '✈️', label: 'Telegram', value: '+62 822-5805-0509', href: 'https://t.me/+6282258050509' },
    { icon: '📸', label: 'Instagram', value: '@_aziizz_', href: 'https://instagram.com/_aziizz_' },
  ];
  return (
    <section id="contact" ref={ref} style={{ padding: '120px 2rem 80px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 600 }}>{'<contact>'}</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: textColor, margin: '0.5rem 0' }}>{t.contact.title}</h2>
          <div style={{ width: '60px', height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`, margin: '0 auto 1rem', borderRadius: '2px', boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none' }} />
          <p style={{ color: subColor }}>{t.contact.sub}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.7 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {contacts.map((c, i) => (
              <motion.a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -6, x: 4, boxShadow: isDark ? `0 20px 40px ${accentColor}20` : '0 20px 40px rgba(99,102,241,0.15)' }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  background: cardBg, border: `1px solid ${cardBorder}`,
                  borderRadius: '16px', padding: '1.25rem 1.5rem',
                  textDecoration: 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'box-shadow 0.3s',
                  transformStyle: 'preserve-3d',
                  cursor: 'pointer',
                }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: `${accentColor}20`, border: `1px solid ${accentColor}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', flexShrink: 0,
                  boxShadow: isDark ? `0 0 15px ${accentColor}30` : 'none',
                }}>
                  {c.icon}
                </div>
                <div>
                  <div style={{ color: accentColor, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>{c.label}</div>
                  <div style={{ color: textColor, fontWeight: 600, fontSize: '0.95rem' }}>{c.value}</div>
                </div>
              </motion.a>
            ))}

            {/* Download CV button */}
            <motion.a href="/CV_Aziz_Maulana.pdf" download
              whileHover={{ scale: 1.03, boxShadow: isDark ? `0 0 30px ${accentColor}40` : '0 10px 30px rgba(99,102,241,0.3)' }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: `linear-gradient(135deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
                color: isDark ? '#000' : '#fff', fontWeight: 700, fontSize: '1rem',
                padding: '16px', borderRadius: '16px', textDecoration: 'none',
                boxShadow: `0 0 20px ${accentColor}30`,
                marginTop: '0.5rem',
              }}>
              ⬇ {isDark ? 'Unduh CV PDF' : 'Download CV PDF'}
            </motion.a>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.7 }}>
            <form onSubmit={handleSubmit}
              style={{
                background: cardBg, border: `1px solid ${cardBorder}`,
                borderRadius: '24px', padding: '2rem',
                backdropFilter: 'blur(10px)',
                display: 'flex', flexDirection: 'column', gap: '1rem',
              }}>
              <div style={{ position: 'relative', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'}, transparent)`, borderRadius: '2px', boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none', marginBottom: '0.5rem' }} />

              <div>
                <label style={{ color: subColor, fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{t.contact.name}</label>
                <input type="text" required value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  onFocus={() => setFocused(p => ({ ...p, name: true }))}
                  onBlur={() => setFocused(p => ({ ...p, name: false }))}
                  placeholder={isDark ? 'Nama lengkap Anda' : 'Your full name'}
                  style={inputStyle(focused.name)} />
              </div>

              <div>
                <label style={{ color: subColor, fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{t.contact.email}</label>
                <input type="email" required value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  onFocus={() => setFocused(p => ({ ...p, email: true }))}
                  onBlur={() => setFocused(p => ({ ...p, email: false }))}
                  placeholder="email@contoh.com"
                  style={inputStyle(focused.email)} />
              </div>

              <div>
                <label style={{ color: subColor, fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{t.contact.message}</label>
                <textarea required rows={5} value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  onFocus={() => setFocused(p => ({ ...p, message: true }))}
                  onBlur={() => setFocused(p => ({ ...p, message: false }))}
                  placeholder={isDark ? 'Tulis pesan Anda di sini...' : 'Write your message here...'}
                  style={inputStyle(focused.message)} />
              </div>

              <motion.button type="submit" disabled={status === 'sending'}
                whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '14px', borderRadius: '12px', border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer',
                  background: status === 'success' ? '#22c55e' : status === 'error' ? '#ef4444' : `linear-gradient(135deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`,
                  color: isDark ? '#000' : '#fff', fontWeight: 700, fontSize: '1rem',
                  boxShadow: `0 0 20px ${accentColor}30`,
                  transition: 'background 0.3s',
                }}>
                {status === 'sending' ? '⏳ ' + t.contact.sending
                  : status === 'success' ? '✅ ' + t.contact.success
                  : status === 'error' ? '❌ ' + t.contact.error
                  : '🚀 ' + t.contact.send}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
