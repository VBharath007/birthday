'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function WishButton() {
  const [wished, setWished] = useState(false);
  return <button onClick={() => setWished(true)} className="yes-button wish-button">{wished ? 'Your wish is on its way!' : 'I made a wish'} <Sparkles size={16} /></button>;
}
