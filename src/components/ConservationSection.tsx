import React, { useState } from 'react';
import { ShieldCheck, Droplets, Globe, AlertTriangle, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { MarineVisual } from './MarineVisual';

export const ConservationSection: React.FC = () => {
  const [pledgeCount, setPledgeCount] = useState(14820);
  const [hasPledged, setHasPledged] = useState(false);
  const [selectedPledges, setSelectedPledges] = useState<string[]>(['plastic']);

  const threats = [
    {
      title: 'Plastic & Chemical Pollution',
      impact: 'Over 14 million metric tons of plastic enter oceans annually, creating microplastics that enter the marine food web from copepods to blue whales.',
      icon: Droplets
    },
    {
      title: 'Rising Temperatures & Acidification',
      impact: 'Oceans have absorbed 90% of excess global heating, causing catastrophic coral bleaching events and thinning the calcium carbonate shells of mollusks.',
      icon: AlertTriangle
    },
    {
      title: 'Commercial Overfishing & Bycatch',
      impact: 'Unregulated industrial trawling severely depletes apex predator populations and destroys delicate ancient benthic coral sponge gardens.',
      icon: Globe
    }
  ];

  const togglePledge = (id: string) => {
    if (selectedPledges.includes(id)) {
      setSelectedPledges(selectedPledges.filter((p) => p !== id));
    } else {
      setSelectedPledges([...selectedPledges, id]);
    }
  };

  const handleTakePledge = () => {
    if (!hasPledged) {
      setPledgeCount(pledgeCount + 1);
      setHasPledged(true);
    }
  };

  return (
    <section id="conservation" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden ocean-card-glass border border-cyan-500/25 p-6 sm:p-10 lg:p-12 shadow-2xl">
        {/* Subtle Background Backdrop */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <MarineVisual
            src="https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1600&q=80"
            alt="Pristine vibrant underwater coral ecosystem"
            speciesType="coral"
            sizeVariant="hero"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold block mb-2">
                Conservation & Stewardship
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Protect the Blue Planet
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Oceans generate more than 50% of the oxygen we breathe and regulate Earth’s climate. Protecting marine life is not merely an act of kindness—it is the biological foundation of human survival.
            </p>

            {/* Key Threats */}
            <div className="space-y-3 pt-2">
              {threats.map((threat, idx) => {
                const IconComponent = threat.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#04162e]/70 border border-slate-800/80 hover:border-cyan-500/30 transition-all flex items-start gap-3.5"
                  >
                    <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        {threat.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {threat.impact}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Interactive Action Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#03152a] border border-cyan-500/30 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Ocean Guardian Pledge</span>
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                {pledgeCount.toLocaleString()} Pledged
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-white">
              Commit to Daily Ocean Action
            </h3>

            <div className="space-y-2.5">
              {[
                { id: 'plastic', label: 'Eliminate single-use plastics & micro-beads' },
                { id: 'seafood', label: 'Choose certified sustainable seafood (MSC)' },
                { id: 'cleanup', label: 'Participate in local beach & waterway cleanups' },
                { id: 'advocacy', label: 'Support 30x30 marine protected reserve areas' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => togglePledge(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs transition-all ${
                    selectedPledges.includes(item.id)
                      ? 'bg-cyan-950/70 border border-cyan-400 text-cyan-200'
                      : 'bg-[#051c36] border border-slate-700/60 text-slate-300 hover:text-white'
                  }`}
                >
                  <span className="font-medium">{item.label}</span>
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ml-2 ${
                      selectedPledges.includes(item.id) ? 'text-cyan-400' : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={handleTakePledge}
              disabled={hasPledged}
              className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all ${
                hasPledged
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-[0.98]'
              }`}
            >
              {hasPledged ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pledge Recorded · Thank You!</span>
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4" />
                  <span>Take the Ocean Pledge</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
