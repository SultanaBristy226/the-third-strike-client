import React, { useState } from 'react';
import api from '../api/axios';

export default function FactChecker() {
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/factcheck', { claim });
      setResult(data);
    } catch (err) {
      setResult({ result: 'UNCERTAIN', confidence: 0, rule: null });
    }
    setLoading(false);
  };

  const badgeColor = { TRUE: 'bg-green-600', FALSE: 'bg-red-600', UNCERTAIN: 'bg-yellow-500' };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <div className="card">
        <h2 className="text-xl font-bold text-white mb-4">Kuddus Fact-Checker</h2>
        <textarea
          className="input mb-4"
          rows="3"
          placeholder={`e.g. "The Headmaster said 1st Captains don't have to do homework"`}
          value={claim}
          onChange={e => setClaim(e.target.value)}
        />
        <button className="btn-primary" onClick={check} disabled={loading || !claim}>
          {loading ? 'Checking...' : 'Fact-Check This Claim'}
        </button>

        {result && (
          <div className="mt-5 bg-black/30 rounded-xl p-4">
            <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-bold ${badgeColor[result.result]}`}>
              {result.result}
            </span>
            <p className="text-white/60 text-xs mt-2">Confidence: {result.confidence}%</p>
            {result.rule && (
              <div className="mt-3 text-white/80 text-sm">
                <p className="text-kduGold text-xs">{result.rule.section} ({result.rule.page})</p>
                <p className="mt-1 italic">"{result.rule.ruleText}"</p>
              </div>
            )}
            {!result.rule && <p className="text-white/40 text-sm mt-2">No matching rule found in the rulebook.</p>}
          </div>
        )}
      </div>
    </div>
  );
}