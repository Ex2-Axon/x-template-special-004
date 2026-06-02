import React, { useState } from 'react';

// Interfaces for our luxury spellbook properties
interface Property {
  id: string;
  name: string;
  type: 'citadel' | 'sanctum' | 'nexus';
  description: string;
  price: string;
  location: string;
  manaAlignment: string;
  dimensions: string;
  features: string[];
  image: string;
  videoUrl: string;
  perfectionRating: number;
}

export default function App() {
  // State for properties filtration and interactions
  const [selectedTab, setSelectedTab] = useState<'all' | 'citadel' | 'sanctum' | 'nexus'>('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<Record<string, boolean>>({});
  
  // Interactive Spell Calculator States (The "Investment Matrix")
  const [spatialArea, setSpatialArea] = useState<number>(350); // in sqm
  const [wardLevel, setWardLevel] = useState<number>(5); // security ward rating 1-10
  const [celestialAlignment, setCelestialAlignment] = useState<string>('Solstice');
  
  // Contact Form State with Magical Effect
  const [formData, setFormData] = useState({ name: '', bloodlineEmail: '', message: '' });
  const [isSealed, setIsSealed] = useState<boolean>(false);
  const [sealEffect, setSealEffect] = useState<boolean>(false);

  // Background audio (optional ambient hum simulation toggle)
  const [ambientSound, setAmbientSound] = useState<boolean>(false);

  // Hardcoded Luxurious Mythical Properties
  const properties: Property[] = [
    {
      id: 'prop-1',
      name: 'The Obsidian Sentry Citadel',
      type: 'citadel',
      description: 'ป้อมปราการหินออบซิเดียนหรูหราเหนือกาลเวลา ตั้งอยู่บนหน้าผาสูงชันที่ห้อมล้อมด้วยทะเลหมอกอนันต์ มีโครงสร้างเรขาคณิตสมมาตรไร้ที่ติ และระบบป้องกันเวทระดับสูงสุด',
      price: '89,000,000 GOLD',
      location: 'Eldritch Cliffs, Sector 9',
      manaAlignment: 'Shadow & Chronos (99.8%)',
      dimensions: '1,200 SQ.M.',
      features: ['ห้องโถงกระจกออบซิเดียน', 'ลานจอดพาหนะลอยฟ้า', 'สระว่ายน้ำพลังความร้อนใต้พิภพ', 'ห้องแล็บแปรธาตุส่วนตัว'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-neon-lights-and-flying-cars-40331-large.mp4',
      perfectionRating: 100
    },
    {
      id: 'prop-2',
      name: 'The Whisperwind Sanctum',
      type: 'sanctum',
      description: 'วิหารลอยฟ้าสไตล์สถาปัตยกรรมกอทิกสีขาวบริสุทธิ์ ตกแต่งด้วยกระจกสีสลับลายทองคำและพลังงานสายน้ำไหลเวียนรอบตัวอาคาร เพื่อปลดปล่อยความตึงเครียดของจิตวิญญาณ',
      price: '145,000,000 GOLD',
      location: 'Celestial Heights, Aetheris',
      manaAlignment: 'Ethereal Air & Light (100.0%)',
      dimensions: '2,400 SQ.M.',
      features: ['สวนลอยฟ้าระบบพฤกษศาสตร์ศักดิ์สิทธิ์', 'น้ำตกบำบัดจักระส่วนตัว', 'ห้องสมุดคัมภีร์ดึกดำบรรพ์', 'วิหารกระจกเงาสามมิติ'],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mysterious-forest-with-fogs-and-sun-rays-33434-large.mp4',
      perfectionRating: 99.9
    },
    {
      id: 'prop-3',
      name: 'The Lumina Cyber-Nexus',
      type: 'nexus',
      description: 'เพนท์เฮาส์สุดหรูกลางมหานครไซเบอร์-แฟนตาซี ผสานโครงสร้างนีโอ-บรูทัลลิสต์เข้ากับผนังพลังงานโปร่งแสงที่ปรับเปลี่ยนตามช่วงเวลาของวัน ออกแบบมาเพื่ออัครมหาเศรษฐีอย่างแท้จริง',
      price: '62,000,000 GOLD',
      location: 'Neo-Gothic Core, Sector 1',
      manaAlignment: 'Synthesized Plasma & Tech (99.7%)',
      dimensions: '850 SQ.M.',
      features: ['ผนังโฮโลแกรมวิวพาโนรามา', 'ระบบความปลอดภัยเวทไซเบอร์', 'พอร์ทัลวาร์ปส่วนตัว', 'บาร์เครื่องดื่มยาอายุวัฒนะ'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-animation-of-a-futuristic-city-with-flying-vehicles-43110-large.mp4',
      perfectionRating: 99.8
    }
  ];

  const filteredProperties = selectedTab === 'all' 
    ? properties 
    : properties.filter(p => p.type === selectedTab);

  // Formula to calculate estimated magical cost in real time
  const calculatedCost = Math.round((spatialArea * 125000) * (1 + (wardLevel * 0.15)) * (celestialAlignment === 'Eclipse' ? 1.5 : celestialAlignment === 'Solstice' ? 1.2 : 1.0));

  const handleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSealContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.bloodlineEmail) return;
    
    setSealEffect(true);
    setTimeout(() => {
      setIsSealed(true);
      setSealEffect(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#060608] text-gray-200 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden relative">
      
      {/* Mystical Background Lighting FX */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-amber-900/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-cyan-950/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Modern Cyber-Gothic Grimoire Frame Border */}
      <div className="hidden lg:block fixed inset-4 border border-amber-900/30 rounded-xl pointer-events-none z-50">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-500/50 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500/50 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-500/50 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-500/50 rounded-br-lg" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-2 text-[10px] text-amber-500/35 tracking-widest uppercase rotate-90 origin-left">
          PERFECTION IS AN ABSOLUTE LAW
        </div>
      </div>

      {/* Top Premium Navbar */}
      <nav className="relative z-40 border-b border-amber-900/30 bg-[#060608]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Spellbook Monogram Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 via-purple-900 to-black p-[1px] flex items-center justify-center shadow-lg shadow-purple-950/50">
              <div className="w-full h-full bg-[#08080c] rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 font-serif">
                AETHERIA
              </span>
              <span className="block text-[8px] tracking-[0.3em] text-cyan-400 font-mono uppercase">REAL REALM ARCHITECTURE</span>
            </div>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest">
            <a href="#grimoire" className="hover:text-amber-400 transition-colors text-amber-200/80">I. GRIMOIRE LIST</a>
            <a href="#matrix" className="hover:text-amber-400 transition-colors text-amber-200/80">II. COVENANT CALCULATOR</a>
            <a href="#owner" className="hover:text-amber-400 transition-colors text-amber-200/80">III. THE ARCH-AGENT</a>
            <a href="#seal" className="hover:text-amber-400 transition-colors text-amber-200/80">IV. BIND CONTRACT</a>
          </div>

          {/* Ambient Music Toggle & Language Indicator */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setAmbientSound(!ambientSound)}
              className={`p-2 rounded border border-amber-900/40 text-xs font-mono transition-all duration-300 ${ambientSound ? 'bg-amber-500/20 text-amber-300 border-amber-400' : 'text-gray-500 hover:text-amber-400'}`}
              title="สลับเสียงคลื่นความถี่อัญเชิญ"
            >
              {ambientSound ? '🔮 FOCUS ACTIVE' : '🔮 FOCUS OFF'}
            </button>
            <span className="hidden sm:inline text-[10px] font-mono px-2 py-1 bg-purple-950/40 border border-purple-800/50 rounded text-purple-300">
              VIVIENNE V. APPROVED
            </span>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        
        {/* Ambient Wave simulation if Focus Mode is On */}
        {ambientSound && (
          <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center text-xs font-mono text-amber-300 animate-pulse">
            * สัญญาณคลื่นพลังงานฟิกเกอร์สี่มิติกำลังทำงาน: เพิ่มความเพอร์เฟ็กต์การแสดงผล 100% *
          </div>
        )}

        {/* Hero Section: The Grimoire Introduction */}
        <section className="relative my-12 rounded-2xl border border-amber-500/20 bg-gradient-to-b from-[#0e0e13] to-[#07070a] p-8 md:p-16 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-800/15 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Exquisite Text Copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-mono text-purple-300">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
                LEGENDARY PORTAL
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight tracking-wide">
                สถาปัตยกรรมระดับ <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600">
                  เทวตำนานโบราณ
                </span>
              </h1>

              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                ยินดีต้อนรับสู่หอสมุดเวทแห่งความสมบูรณ์แบบ ที่นี่ไม่ใช่อสังหาริมทรัพย์ธรรมดา 
                หากแต่เป็นการคัดสรรและพันธนาการพื้นที่มิติระดับสูงที่สมมาตรอย่างไม่มีที่ติ 
                โดยผู้เชี่ยวชาญหญิงระดับวิศวกรวิญญาณชั้นสูง เพื่อเป็นเอกสิทธิ์แด่ราชันและเทพผู้ปกครองอย่างแท้จริง
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#grimoire" 
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold tracking-wider text-xs uppercase rounded transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-950/50"
                >
                  เปิดเปิดตำราเลือกวิหาร
                </a>
                <a 
                  href="#matrix" 
                  className="px-6 py-3 border border-amber-500/30 hover:bg-amber-950/20 text-amber-300 font-mono text-xs tracking-wider uppercase rounded transition-all"
                >
                  คำนวณมิติจักรวาล
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Animated Spellbook Model */}
            <div className="relative flex justify-center items-center">
              <div className="relative w-full max-w-[400px] h-[400px] bg-gradient-to-tr from-amber-500/10 via-purple-950/20 to-cyan-500/10 rounded-2xl p-[1px] border border-amber-500/20 shadow-2xl">
                <div className="w-full h-full bg-[#08080b]/90 rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative">
                  
                  {/* Decorative runes on book */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-amber-500/30 tracking-widest uppercase">
                    ✨ VALERIA INTEGRITY DECREE ✨
                  </div>

                  {/* Book Spine Graphic */}
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-amber-600 via-amber-950 to-amber-900 border-r border-amber-500/30" />

                  {/* Spellbook Inner Content (Interactive Gauge Simulation) */}
                  <div className="mt-4 flex-1 flex flex-col justify-center space-y-4 text-center">
                    <div className="w-24 h-24 mx-auto rounded-full border-2 border-dashed border-amber-500/40 p-2 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                      <div className="w-full h-full rounded-full bg-purple-900/30 border border-purple-500/50 flex items-center justify-center">
                        <span className="text-amber-400 text-lg font-serif">👁️‍🗨️</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">PERFECTION METRIC</div>
                      <div className="text-3xl font-serif font-bold text-amber-100 mt-1">100.00%</div>
                      <p className="text-[10px] text-gray-500 italic mt-1">"ไม่มีที่ติแม้แต่เศษธุลีเศษหิน"</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-amber-900/30 text-left text-[10px] font-mono">
                      <div>
                        <span className="block text-gray-500">REALM:</span>
                        <span className="text-amber-300">ASTRAL</span>
                      </div>
                      <div>
                        <span className="block text-gray-500">SECURITIES:</span>
                        <span className="text-cyan-400">OMEGA</span>
                      </div>
                      <div>
                        <span className="block text-gray-500">ALIGNMENT:</span>
                        <span className="text-purple-400">PERFECT</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini status footer */}
                  <div className="flex justify-between items-center text-[9px] font-mono text-amber-400/70 pt-2 border-t border-amber-900/20">
                    <span>Grimoire Rev. 2026</span>
                    <span className="animate-pulse">ONLINE SYNCING...</span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION I: THE GRIMOIRE PROPERTIES LIST */}
        <section id="grimoire" className="my-16 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-amber-900/30">
            <div>
              <h2 className="text-3xl font-serif text-amber-300 tracking-wide">
                I. ตารารายการอสังหาริมทรัพย์ศักดิ์สิทธิ์
              </h2>
              <p className="text-xs font-mono text-cyan-400 mt-1 uppercase tracking-widest">
                CRITICAL SELECTIONS BY LADY VIVIENNE VANCE
              </p>
            </div>

            {/* Filter Tabs - Neo-Brutalist / Medieval style */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0 font-mono text-xs">
              {(['all', 'citadel', 'sanctum', 'nexus'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 border rounded transition-all uppercase tracking-widest ${
                    selectedTab === tab
                      ? 'bg-amber-500 text-black border-amber-400 font-bold'
                      : 'bg-black/60 text-gray-400 border-amber-900/30 hover:border-amber-500/50 hover:text-amber-200'
                  }`}
                >
                  {tab === 'all' ? '🔍 ALL REALMS' : tab === 'citadel' ? '🏰 CITADELS' : tab === 'sanctum' ? '🌿 SANCTUMS' : '🌐 CYBER-NEXUS'}
                </button>
              ))}
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {filteredProperties.map(prop => (
              <div 
                key={prop.id}
                onClick={() => setSelectedProperty(prop)}
                className="group relative bg-gradient-to-b from-[#0a0a0f] to-[#040406] border border-amber-900/30 hover:border-amber-400/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-purple-950/20 cursor-pointer"
              >
                {/* Perfect Badge (Unsplash Image Placeholder Trigger) */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/80 border border-amber-500/40 rounded text-[10px] font-mono text-amber-300 tracking-widest uppercase">
                  ✨ {prop.perfectionRating}% PERFECT
                </div>

                {/* Property Image Container */}
                <div className="h-64 relative overflow-hidden bg-slate-900">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10" />
                  <img 
                    src={prop.image} 
                    alt={prop.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                  />
                  {/* Decorative cybernetic grid pattern on image */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_3px_100%] pointer-events-none" />
                </div>

                {/* Property Details */}
                <div className="p-6 space-y-4 relative">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">{prop.location}</span>
                    <button 
                      onClick={(e) => handleBookmark(prop.id, e)}
                      className="text-amber-400 hover:scale-110 transition-transform"
                    >
                      {isBookmarked[prop.id] ? '★ BOOKMARKED' : '☆ MARK'}
                    </button>
                  </div>

                  <h3 className="text-xl font-serif text-amber-100 group-hover:text-amber-400 transition-colors">
                    {prop.name}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                    {prop.description}
                  </p>

                  <div className="pt-4 border-t border-amber-900/30 flex justify-between items-center">
                    <div>
                      <span className="block text-[8px] font-mono text-gray-500">ENERGY ALIGNMENT</span>
                      <span className="text-xs font-mono text-purple-300">{prop.manaAlignment}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] font-mono text-gray-500">SACRED INVESTMENT</span>
                      <span className="text-sm font-mono font-bold text-amber-400">{prop.price}</span>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <div className="pt-2">
                    <button className="w-full py-2 bg-purple-950/40 hover:bg-amber-500 hover:text-black border border-purple-800/40 text-xs font-mono tracking-widest uppercase transition-all rounded">
                      📜 อัญเชิญข้อมูลเพิ่มเติม / เปิดคลิป
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROPERTY VIEW MODAL with VIDEO (Interactive Lightbox) */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md">
            <div className="bg-[#08080c] border border-amber-500/40 w-full max-w-4xl rounded-2xl overflow-hidden relative shadow-2xl">
              
              {/* Close button */}
              <button 
                onClick={() => { setSelectedProperty(null); setIsPlayingVideo(false); }}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/80 text-amber-400 border border-amber-500/30 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-black transition-colors font-mono"
              >
                ✕
              </button>

              <div className="grid md:grid-cols-2">
                
                {/* Media Showcase Panel */}
                <div className="relative bg-black min-h-[300px] flex items-center justify-center">
                  {!isPlayingVideo ? (
                    <>
                      {/* Static Image Showcase with play overlay */}
                      <img 
                        src={selectedProperty.image} 
                        alt={selectedProperty.name}
                        className="w-full h-full object-cover absolute inset-0 opacity-80" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/30 flex flex-col justify-end p-6 z-20">
                        <button 
                          onClick={() => setIsPlayingVideo(true)}
                          className="mx-auto w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center shadow-lg shadow-amber-950/50 transform hover:scale-105 transition-all mb-4"
                        >
                          <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                        <p className="text-center text-xs font-mono text-amber-300 uppercase tracking-widest">
                          คลิกเพื่อชมวิดีโอพลังงานพลาสม่าเสมือนจริง
                        </p>
                      </div>
                    </>
                  ) : (
                    /* Video Player Simulator with rich UI */
                    <div className="w-full h-full relative flex flex-col justify-between bg-black z-10">
                      <video 
                        src={selectedProperty.videoUrl} 
                        autoPlay 
                        loop 
                        controls 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 right-4 bg-black/80 border border-amber-500/30 p-2 rounded text-[10px] font-mono flex justify-between items-center">
                        <span className="text-green-400">● VIDEO SIGNAL SECURE</span>
                        <button 
                          onClick={() => setIsPlayingVideo(false)}
                          className="text-amber-400 hover:underline"
                        >
                          ปิดวิดีโอ
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Spellbook Details Panel */}
                <div className="p-8 space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                  <div>
                    <span className="px-2 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded text-[9px] font-mono uppercase">
                      {selectedProperty.type}
                    </span>
                    <h2 className="text-2xl font-serif text-amber-300 mt-2">{selectedProperty.name}</h2>
                    <p className="text-xs text-amber-400 font-mono mt-1">{selectedProperty.location}</p>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {selectedProperty.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">พลังเวทมนตร์และโครงสร้าง (Mana Structure)</h4>
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-[#0c0c12] p-4 rounded-lg border border-amber-900/20">
                      <div>
                        <span className="block text-gray-500">DIMENSION</span>
                        <span className="text-amber-200">{selectedProperty.dimensions}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500">MANA REGION</span>
                        <span className="text-amber-200">{selectedProperty.manaAlignment}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="block text-gray-500 mb-1">สิ่งอำนวยความสะดวกในวิหาร</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProperty.features.map((feat, idx) => (
                            <span key={idx} className="bg-purple-950/60 border border-purple-800/30 text-purple-200 text-[10px] px-2 py-0.5 rounded">
                              ✦ {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-amber-900/30 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-gray-500 block">PERFECTION VALUE</span>
                      <span className="text-xl font-serif text-amber-400 font-bold">{selectedProperty.price}</span>
                    </div>
                    <a
                      href="#seal"
                      onClick={() => {
                        setSelectedProperty(null);
                        setFormData(prev => ({ ...prev, message: `สนใจอัญเชิญกรรมสิทธิ์โครงการ: ${selectedProperty.name}` }));
                      }}
                      className="px-4 py-2 bg-amber-500 text-black text-xs font-mono font-bold tracking-widest uppercase rounded hover:bg-amber-400 transition-colors"
                    >
                      ทำสัญญาสิทธิ์
                    </a>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION II: THE COVENANT CALCULATOR (Interactive Tool) */}
        <section id="matrix" className="my-16 scroll-mt-24">
          <div className="bg-gradient-to-r from-[#0d0a14] via-[#050508] to-[#070b14] border border-amber-500/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-cyan-500" />
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Left Form controls */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif text-amber-300">
                    II. เครื่องคำนวณสัญญาสัจจะ (Covenant Matrix)
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 tracking-wider uppercase mt-1">
                    Calculate dynamic power scale and investment alignment
                  </p>
                </div>

                {/* Slider 1: Area */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-amber-200">
                    <span>ขนาดยูนิเวิร์สภายใน (SPATIAL AREA)</span>
                    <span className="text-amber-400 font-bold">{spatialArea} SQ.M.</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="5000" 
                    value={spatialArea}
                    onChange={(e) => setSpatialArea(parseInt(e.target.value))}
                    className="w-full accent-amber-500 bg-gray-800 rounded-lg h-1.5 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>100 SQ.M.</span>
                    <span>5,000 SQ.M.</span>
                  </div>
                </div>

                {/* Slider 2: Magical Security Level */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-amber-200">
                    <span>ระดับการป้องกันเวท/ภัยพิบัติ (WARD ENCHANTMENT LEVEL)</span>
                    <span className="text-cyan-400 font-bold">LEVEL {wardLevel}/10</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={wardLevel}
                    onChange={(e) => setWardLevel(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 bg-gray-800 rounded-lg h-1.5 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>LEVEL 1 (Basic Physical)</span>
                    <span>LEVEL 10 (Divine Impervious)</span>
                  </div>
                </div>

                {/* Celestial Dropdown Select */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-amber-200">ตำแหน่งการเรียงตัวของดวงดาว (CELESTIAL ALIGNMENT)</label>
                  <select 
                    value={celestialAlignment}
                    onChange={(e) => setCelestialAlignment(e.target.value)}
                    className="w-full bg-black/80 border border-amber-900/40 text-xs font-mono p-3 rounded text-amber-300 focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Equinox">Equinox (พลังงานปกติคงเส้นคงวา)</option>
                    <option value="Solstice">Solstice (+20% พลังงานแห่งความเจริญรุ่งเรือง)</option>
                    <option value="Eclipse">Eclipse (+50% คาริสม่าการป้องกันและการสะท้อนกลับ)</option>
                  </select>
                </div>
              </div>

              {/* Right Output Visualiser */}
              <div className="bg-black/60 border border-amber-500/30 rounded-xl p-8 relative flex flex-col justify-between min-h-[300px]">
                
                {/* Visual feedback of calculated energy level */}
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">ประมาณการค่าบูชาศักดิ์สิทธิ์</span>
                    <div className="text-3xl md:text-4xl font-serif text-amber-400 font-bold tracking-widest mt-2 animate-pulse">
                      {calculatedCost.toLocaleString()} GOLD
                    </div>
                    <span className="text-[9px] font-mono text-purple-400">(* คำนวณตามมาตรฐานความเพอร์เฟ็กต์สูงสุดของสถาบันเวทมนตร์)</span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-amber-900/40">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">ดัชนีเสถียรภาพมิติลอยตัว:</span>
                      <span className="text-emerald-400">99.98% STABLE</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">ระยะเวลาอัญเชิญก่อสร้าง:</span>
                      <span className="text-amber-300">3 วันแห่งสัจจะ</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-400">ระดับความพึงพอใจประเมินโดยวีเวียน:</span>
                      <span className="text-purple-300">EXQUISITE</span>
                    </div>
                  </div>
                </div>

                {/* Progress-style glowing visual energy bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
                    <span>พลังงานสั่นสะเทือนมิติ (Ethereal Resonance)</span>
                    <span>{Math.min(100, Math.round((spatialArea / 50) + (wardLevel * 5)))}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-amber-950">
                    <div 
                      className="bg-gradient-to-r from-amber-500 via-purple-500 to-cyan-500 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.round((spatialArea / 50) + (wardLevel * 5)))}%` }}
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* SECTION III: THE ARCH-AGENT (Meet Vivienne Vance) */}
        <section id="owner" className="my-16 scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center bg-[#07070b] border border-amber-900/30 rounded-2xl p-8 md:p-12 shadow-2xl relative">
            
            {/* Elegant Image representing Vivienne Vance, the perfectionist owner */}
            <div className="relative group overflow-hidden rounded-xl border border-amber-500/30">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-[#07070b]/20 to-transparent z-10" />
              {/* Unsplash Image representing a powerful, beautiful business woman with dark fantasy vibes */}
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
                alt="Madame Vivienne Vance" 
                className="w-full h-[500px] object-cover filter contrast-110 saturate-75 opacity-90 transition-transform duration-750 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2 bg-black/85 p-4 rounded-lg border border-amber-500/20">
                <span className="text-amber-400 font-mono text-xs tracking-widest block">"I DO NOT LIST REALTIES. I WEAVE DESTINIES."</span>
                <span className="text-[10px] text-gray-400 block">- Vivienne Vance, Arch-Agent of Spellbound Estates</span>
              </div>
            </div>

            {/* Content about her perfectionism */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">FOUNDER & CHIEF CONJURER</span>
                <h3 className="text-3xl md:text-4xl font-serif text-amber-300 mt-1">Vivienne Vance</h3>
              </div>

              <blockquote className="border-l-2 border-amber-500 pl-4 text-gray-300 italic text-sm md:text-base leading-relaxed">
                "ความสมบูรณ์แบบไม่ได้เป็นเพียงเป้าหมาย แต่คือบัญญัติสูงสุดแห่งชีวิต ข้าพเจ้าคัดเลือกดินแดนทุกแปลงด้วยสายตาที่ไม่เคยยอมประนีประนอมให้กับเศษฝุ่นหรือความไม่สมมาตรแม้เพียงหนึ่งองศา สัญญาทุกเล่มของเราถูกจารึกด้วยคำสาปแห่งความซื่อสัตย์"
              </blockquote>

              <div className="space-y-4 pt-4">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">บัญญัติ 3 ประการแห่งสุนทรียศาสตร์ที่สมบูรณ์แบบ</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-sm">Ⅰ.</span>
                    <p className="text-xs text-gray-400">
                      <strong className="text-amber-200">สัดส่วนเรขาคณิตสมบูรณ์แบบ:</strong> ทุกมิติ ผนัง เสาคาน ต้องอยู่บนอัตราส่วนทองคำ (Golden Ratio) ไร้ซึ่งความเอียงลาดที่ไร้เหตุผล
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-sm">Ⅱ.</span>
                    <p className="text-xs text-gray-400">
                      <strong className="text-amber-200">ความปลอดภัยไร้การรุกราน:</strong> เทคโนโลยีเกราะเวทสะท้อนกลับเกรดกองทัพ ป้องกันทั้งผู้บุกรุก สัตว์อสูร และภัยพิบัติทางสภาพภูมิอากาศ
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 font-mono text-sm">Ⅲ.</span>
                    <p className="text-xs text-gray-400">
                      <strong className="text-amber-200">สายพลังงานธรรมชาติตัดผ่าน:</strong> วิหารทุกหลังตั้งอยู่บนพิกัด Ley Lines ที่ให้พลังงานเชิงบวกแก่จิตวิญญาณผู้พำนักสูงสุด
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-900/30 text-center font-mono">
                <div className="p-2 bg-black/60 rounded border border-amber-900/20">
                  <span className="block text-xl text-amber-400 font-bold">100%</span>
                  <span className="text-[8px] text-gray-500">INTEGRITY RATE</span>
                </div>
                <div className="p-2 bg-black/60 rounded border border-amber-900/20">
                  <span className="block text-xl text-amber-400 font-bold">4.9B+</span>
                  <span className="text-[8px] text-gray-500">GOLD VALUE COVENANTS</span>
                </div>
                <div className="p-2 bg-black/60 rounded border border-amber-900/20">
                  <span className="block text-xl text-amber-400 font-bold">0.0s</span>
                  <span className="text-[8px] text-gray-500">DELAY TO RESPONSE</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION IV: THE SEAL OF COVENANT (Interactive Contact Form) */}
        <section id="seal" className="my-16 scroll-mt-24 max-w-2xl mx-auto text-center">
          
          <div className="relative bg-gradient-to-b from-[#0b0a0f] to-[#040406] border border-amber-500/30 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden">
            
            {/* Top decorative lock icon */}
            <div className="w-16 h-16 mx-auto rounded-full bg-[#0d0d14] border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl mb-6">
              🔐
            </div>

            <h3 className="text-3xl font-serif text-amber-300 mb-2">IV. การประทับตราพันธสัญญาดึกดำบรรพ์</h3>
            <p className="text-xs font-mono text-gray-400 mb-8 uppercase tracking-widest">
              Seal your bloodline request to summon Madame Vivienne Vance
            </p>

            {!isSealed ? (
              <form onSubmit={handleSealContract} className="space-y-4 text-left">
                
                <div>
                  <label className="block text-xs font-mono text-amber-200 mb-1">ขามประสงค์ (YOUR SOVEREIGN NAME)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="กรุณาจารึกนามของท่าน..." 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#08080c] border border-amber-900/50 hover:border-amber-500/50 focus:border-amber-500 focus:outline-none p-3 rounded text-sm text-amber-100 placeholder:text-gray-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-200 mb-1">ที่อยู่วิญญาณอิเล็กทรอนิกส์ (BLOODLINE EMAIL)</label>
                  <input 
                    type="email" 
                    required
                    placeholder="name@realm.com" 
                    value={formData.bloodlineEmail}
                    onChange={(e) => setFormData({...formData, bloodlineEmail: e.target.value})}
                    className="w-full bg-[#08080c] border border-amber-900/50 hover:border-amber-500/50 focus:border-amber-500 focus:outline-none p-3 rounded text-sm text-amber-100 placeholder:text-gray-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-amber-200 mb-1">สารปรารถนาถึงเอเจนท์สูงสุด (SECRET MESSAGE TO THE ARCH-AGENT)</label>
                  <textarea 
                    rows={4}
                    placeholder="จารึกความต้องการมิติและขนาดที่สมบูรณ์แบบไร้ที่ติของคุณ..." 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#08080c] border border-amber-900/50 hover:border-amber-500/50 focus:border-amber-500 focus:outline-none p-3 rounded text-sm text-amber-100 placeholder:text-gray-600 font-mono resize-none"
                  />
                </div>

                {/* Simulated Seal Button with animation */}
                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={sealEffect}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-semibold text-xs tracking-widest uppercase rounded transition-all shadow-lg shadow-amber-950/40 relative overflow-hidden"
                  >
                    {sealEffect ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-black rounded-full animate-ping" />
                        กำลังประทับครั่งทองคำโบราณ...
                      </span>
                    ) : (
                      '🖋️ ประทับตราสัญญาลับขั้นสูงสุด'
                    )}
                  </button>
                </div>

              </form>
            ) : (
              /* Success / Sealed State screen with cosmic runic theme */
              <div className="py-8 space-y-6 text-center animate-fade-in">
                <div className="w-24 h-24 mx-auto rounded-full bg-amber-500/10 border-2 border-amber-500 text-amber-400 flex items-center justify-center text-4xl shadow-lg shadow-amber-950">
                  印
                </div>
                <div>
                  <h4 className="text-2xl font-serif text-amber-400">พันธสัญญานี้ถูกผูกมัดแล้ว</h4>
                  <p className="text-xs text-cyan-400 font-mono mt-2 uppercase tracking-widest">
                    The Spell is Sealed. Vivienne Vance is now decoding your coordinates.
                  </p>
                </div>
                <div className="p-4 bg-black/60 rounded border border-amber-900/40 text-xs font-mono text-gray-400 text-left max-w-md mx-auto space-y-1">
                  <div><strong>นิติบุคคลผู้จดทะเบียน:</strong> Aetheria Arch-Agent Ltd.</div>
                  <div><strong>ผู้ยื่นจำนง:</strong> {formData.name}</div>
                  <div><strong>สัญญาณการสื่อสาร:</strong> {formData.bloodlineEmail}</div>
                  <div><strong>ระดับการตอบกลับ:</strong> ทันทีทันใด (Instantaneous Aura Transfer)</div>
                </div>
                <button 
                  onClick={() => { setIsSealed(false); setFormData({name: '', bloodlineEmail: '', message: ''}); }}
                  className="text-xs font-mono text-amber-500 hover:underline"
                >
                  ต้องการประทับตรายื่นคำร้องเล่มใหม่?
                </button>
              </div>
            )}

          </div>
        </section>

      </main>

      {/* Exquisite Medieval Footer */}
      <footer className="border-t border-amber-900/40 bg-[#040406] py-12 px-6 relative z-10 text-center text-gray-500 text-xs font-mono space-y-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-left space-y-1">
            <span className="text-amber-400/80 font-serif text-sm tracking-widest">AETHERIA ESTATION DE VANCE</span>
            <p className="text-[10px] text-gray-600">The Ultimate Standard of Mythical and Cybernetic Luxury Real Estates.</p>
          </div>

          <div className="flex gap-6 text-[10px] tracking-wider text-amber-200/50">
            <span>🛡️ ANCIENT WARDS GUARDED</span>
            <span>💎 100% PERFECT VERIFIED</span>
          </div>

          <div className="text-right text-[10px]">
            <span>© 2026 AETHERIA. ALL SACRED CONTRACTS SECURED.</span>
          </div>

        </div>
      </footer>

    </div>
  );
}