'use client';

import { useEffect, useRef } from 'react';

const BEHOLD_SCRIPT = 'https://w.behold.so/widget.js';
const FEED_ID = 'bBHUrQ7OAZUE2ls1rxXn';

export default function InstagramEmbedGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!container.querySelector('behold-widget')) {
      const widget = document.createElement('behold-widget');
      widget.setAttribute('feed-id', FEED_ID);
      container.appendChild(widget);
    }

    if (!document.querySelector(`script[src="${BEHOLD_SCRIPT}"]`)) {
      const s = document.createElement('script');
      s.type = 'module';
      s.src = BEHOLD_SCRIPT;
      document.head.append(s);
    }
  }, []);

  return <div ref={containerRef} />;
}
