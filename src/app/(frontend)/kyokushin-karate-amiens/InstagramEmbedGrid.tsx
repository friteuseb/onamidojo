'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const POSTS = [
  'DXlbRGhiq8H',
  'DWLrpGjCjDU',
  'DWUC04VDJ5g',
  'DVhDxZyjG7R',
];

export default function InstagramEmbedGrid() {
  useEffect(() => {
    window.instgrm?.Embeds?.process();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 justify-items-center">
        {POSTS.map((shortcode) => (
          <blockquote
            key={shortcode}
            className="instagram-media"
            data-instgrm-permalink={`https://www.instagram.com/p/${shortcode}/`}
            data-instgrm-version="14"
            data-instgrm-captioned=""
            style={{
              background: '#FFF',
              border: 0,
              borderRadius: '3px',
              boxShadow:
                '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
              margin: 0,
              maxWidth: '540px',
              minWidth: '326px',
              padding: 0,
              width: '100%',
            }}
          >
            <a href={`https://www.instagram.com/p/${shortcode}/`} />
          </blockquote>
        ))}
      </div>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds?.process()}
      />
    </>
  );
}
