'use client';

import { useState } from 'react';
import { social } from '@/lib/data';

export default function Social() {
  return (
    <div className="social-grid" data-reveal-group>
      {social.map((url, i) => <Embed key={url} url={url} i={i} />)}
    </div>
  );
}

function Embed({ url, i }: { url: string; i: number }) {
  const [open, setOpen] = useState(false);
  const isReel = url.includes('/reel/');
  return (
    <div className="social glass">
      {open ? (
        <iframe src={url} loading="lazy" title="منشور إنستغرام" />
      ) : (
        <button className="social__facade" onClick={() => setOpen(true)} aria-label="تحميل منشور إنستغرام">
          <span className="social__ig">⌬</span>
          <span className="social__play">{isReel ? '▶ تشغيل الريل' : 'عرض المنشور'}</span>
          <span className="social__no">إنستغرام · رائدات #{i + 1}</span>
        </button>
      )}
    </div>
  );
}
