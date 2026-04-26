'use client';

import { useEffect } from 'react';
import React from 'react';

const BEHOLD_SCRIPT = 'https://w.behold.so/widget.js';

export default function InstagramEmbedGrid() {
  useEffect(() => {
    if (document.querySelector(`script[src="${BEHOLD_SCRIPT}"]`)) return;
    const s = document.createElement('script');
    s.type = 'module';
    s.src = BEHOLD_SCRIPT;
    document.head.append(s);
  }, []);

  return React.createElement('behold-widget', {
    'feed-id': 'bBHUrQ7OAZUE2ls1rxXn',
  });
}
