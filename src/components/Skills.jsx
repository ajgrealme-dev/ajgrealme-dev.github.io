import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useApp } from '../context/AppContext';

function SkillTag({ name, isDark, delay }) {
  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.08, y: -4, rotateZ: [-1, 1, 0] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        padding: '8px 16px',
        borderRadius: '10px',
        border: `1px solid ${hovered ? accentColor : accentColor + '40'}`,
        background: hovered ? (isDark ? 'rgba(0,245,255,0.15)' : 'rgba(99,102,241,0.15)') : (isDark ? 'rgba(0,245,255,0.05)' : 'rgba(99,102,241,0.05)'),
        color: hovered ? accentColor : isDark ? '#a8c5d9' : '#4b5563',
        fontSize: '0.85rem',
        fontWeight: 600,
        cursor: 'default',
        transition: 'all 0.2s ease',
        boxShadow: hovered ? (isDark ? `0 0 15px ${accentColor}40` : `0 5px 20px rgba(99,102,241,0.25)`) : 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      {name}
    </motion.div>
  );
}

function SkillCategory({ cat, isDark, inView, catIndex }) {
  const icons = ['📋', '⚡', '🧠'];
  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const cardBg = isDark ? 'rgba(0,245,255,0.03)' : 'rgba(99,102,241,0.04)';
  const cardBorder = isDark ? 'rgba(0,245,255,0.15)' : 'rgba(99,102,241,0.2)';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: catIndex * 0.15 }}
      whileHover={{ y: -8, boxShadow: isDark ? `0 20px 60px ${accentColor}20` : '0 20px 60px rgba(99,102,241,0.15)' }}
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: '24px',
        padding: '2rem',
        transformStyle: 'preserve-3d',
        transition: 'box-shadow 0.3s ease',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          background: `linear-gradient(135deg, ${accentColor}30, ${isDark ? '#39ff14' : '#8b5cf6'}20)`,
          border: `1px solid ${accentColor}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem',
        }}>
          {icons[catIndex]}
        </div>
        <h3 style={{ color: textColor, fontWeight: 700, fontSize: '1.1rem' }}>{cat.name}</h3>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {cat.items.map((item, j) => (
          <SkillTag key={item} name={item} isDark={isDark} delay={catIndex * 0.1 + j * 0.05} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { theme, t } = useApp();
  const isDark = theme === 'dark';
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const accentColor = isDark ? '#00f5ff' : '#6366f1';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';

  const bars = [
    { label: isDark ? 'Disiplin & Integritas' : 'Discipline & Integrity', pct: 95 },
    { label: isDark ? 'Ketelitian Data' : 'Data Accuracy', pct: 90 },
    { label: isDark ? 'Kemauan Belajar' : 'Eagerness to Learn', pct: 98 },
    { label: isDark ? 'Kepatuhan Aturan' : 'Rule Compliance', pct: 93 },
    { label: isDark ? 'Kerja Tim' : 'Teamwork', pct: 88 },
  ];

  return (
    <section id="skills" ref={ref} style={{ padding: '120px 2rem', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ color: accentColor, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 600 }}>{'<skills>'}</span>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: textColor, margin: '0.5rem 0' }}>{t.skills.title}</h2>
          <div style={{ width: '60px', height: '3px', background: `linear-gradient(90deg, ${accentColor}, ${isDark ? '#39ff14' : '#8b5cf6'})`, margin: '0 auto', borderRadius: '2px', boxShadow: isDark ? `0 0 10px ${accentColor}` : 'none' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {t.skills.cats.map((cat, i) => (
            <SkillCategory key={cat.name} cat={cat} isDark={isDark} inView={inView} catIndex={i} />
          ))}
        </div>

        {/* Soft Skills Section (Dual column layout) */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
          style={{
            background: isDark ? 'rgba(139, 92, 246, 0.04)' : 'rgba(99, 102, 241, 0.05)',
            border: `1px solid ${isDark ? 'rgba(0,245,255,0.15)' : 'rgba(99, 102, 241, 0.2)'}`,
            borderRadius: '24px', padding: '2.5rem 2rem', backdropFilter: 'blur(10px)',
          }}>
          <h3 style={{ color: accentColor, marginBottom: '2rem', fontWeight: 700, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'Playfair Display, serif' }}>
            {isDark ? 'Soft skill' : 'Soft skill'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem' }} className="soft-skills-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', paddingLeft: '3rem' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 500, color: textColor }}>{isDark ? 'Disiplin & Integritas' : 'Discipline & Integrity'}</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 500, color: textColor }}>{isDark ? 'Ketelitian Data' : 'Data Accuracy'}</div>
            </div>
            <div style={{ width: '1.5px', background: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(99, 102, 241, 0.2)', margin: '0.2rem 0' }} className="soft-skills-divider" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', paddingLeft: '3rem' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 500, color: textColor }}>{isDark ? 'Kemauan Belajar' : 'Eagerness to Learn'}</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 500, color: textColor }}>{isDark ? 'Kepatuhan Aturan' : 'Rule Compliance'}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
