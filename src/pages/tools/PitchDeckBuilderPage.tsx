import React, { useState } from 'react';
import { Presentation, Plus, Move, Eye, Download } from 'lucide-react';

const defaultSlides = [
  { id: 1, title: 'Problem', type: 'problem', content: '' },
  { id: 2, title: 'Solution', type: 'solution', content: '' },
  { id: 3, title: 'Market Opportunity', type: 'market', content: '' },
  { id: 4, title: 'Product', type: 'product', content: '' },
  { id: 5, title: 'Traction', type: 'traction', content: '' },
  { id: 6, title: 'Business Model', type: 'business', content: '' },
  { id: 7, title: 'Competition', type: 'competition', content: '' },
  { id: 8, title: 'Team', type: 'team', content: '' },
  { id: 9, title: 'Financials', type: 'financials', content: '' },
  { id: 10, title: 'Ask', type: 'ask', content: '' }
];

export default function PitchDeckBuilderPage() {
  const [slides, setSlides] = useState(defaultSlides);
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);
  const [deckName, setDeckName] = useState('My Pitch Deck');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Pitch Deck Builder</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Create investor-ready pitch decks with proven storytelling frameworks
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 mb-8">
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="text-2xl font-bold text-slate-900 bg-transparent border-none focus:ring-0 focus:outline-none"
            />
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200">
                <Eye size={18} />
                Preview
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-red-700">
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 border-2 border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4">Slides</h3>
            <div className="space-y-2">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setSelectedSlide(slide)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedSlide.id === slide.id
                      ? 'bg-orange-100 border-2 border-orange-500'
                      : 'bg-slate-50 border-2 border-transparent hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{idx + 1}. {slide.title}</span>
                    <Move size={14} className="text-slate-400" />
                  </div>
                </button>
              ))}
              <button className="w-full p-3 rounded-lg border-2 border-dashed border-slate-300 text-slate-600 hover:border-orange-400 hover:text-orange-600 transition-all flex items-center justify-center gap-2">
                <Plus size={16} />
                Add Slide
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl p-8 border-2 border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{selectedSlide.title}</h2>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Slide Content</label>
              <textarea
                rows={12}
                placeholder={`Enter content for your ${selectedSlide.title.toLowerCase()} slide...`}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 focus:border-orange-500 focus:ring-0 resize-none"
              />
            </div>

            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="font-bold text-orange-900 mb-3">Content Guidelines</h3>
              <ul className="space-y-2 text-sm text-orange-900">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Keep it concise and focused on key points</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Use data and metrics to support your claims</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span>Tell a compelling story that resonates with investors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
