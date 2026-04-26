import Script from 'next/script';
import React from 'react';

export default function InstagramEmbedGrid() {
  return (
    <>
      {React.createElement('behold-widget', {
        'feed-id': 'bBHUrQ7OAZUE2ls1rxXn',
      })}
      <Script
        type="module"
        src="https://w.behold.so/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
