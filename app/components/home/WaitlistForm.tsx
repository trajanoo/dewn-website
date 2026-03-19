'use client'     

import { useState, useRef, useEffect } from 'react';

interface WaitlistFormProps {
  dark?: boolean;
}

export default function WaitlistForm({ dark = false }: WaitlistFormProps) {
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Listen for iframe load to detect submission
    const iframe = iframeRef.current;
    if (!iframe) return;
    
    const handleLoad = () => {
      if (loading) {
        setSubmitted(true);
        setLoading(false);
      }
    };
    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [loading]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    
    // Track GA4 event
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'waitlist_signup', { method: 'email' });
    }
    
    // Submit via hidden form to iframe
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  if (submitted) {
    return (
      <div className={`text-center py-4 ${dark ? 'text-white/80' : 'text-foreground/70'}`}>
        <p className="font-serif text-lg">Thank you.</p>
        <p className="text-sm mt-1 opacity-70">We'll be in touch when DEWN launches.</p>
      </div>
    );
  }

  return (
    <>
      <iframe ref={iframeRef} name="zoho_iframe" className="hidden" title="form-target" />
      <form
        action="https://zgp4-zgp4.maillist-manage.in/weboptin.zc"
        method="POST"
        target="zoho_iframe"
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
      >
        <input type="hidden" name="zx" value="14af69f0e" />
        <input type="hidden" name="zcvers" value="3.0" />
        <input type="hidden" name="oldListIds" value="" />
        <input type="hidden" name="mode" value="OptinCreate498" />
        <input type="hidden" name="zcld" value="14af53a3113b55" />
        <input type="hidden" name="zctd" value="14af53a3113b3e" />
        <input type="hidden" name="scriptless" value="yes" />
        
        <input
          type="email"
          name="CONTACT_EMAIL"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className={`flex-1 px-5 py-3 rounded-pill text-sm outline-none transition-all duration-200 ${
            dark
              ? 'bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-white/40'
              : 'bg-white border border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/30'
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-7 py-3 rounded-pill text-sm font-medium transition-all duration-200 whitespace-nowrap ${
            dark
              ? 'bg-white text-foreground hover:bg-white/90'
              : 'bg-primary cursor-pointer text-primary-foreground hover:opacity-90'
          } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Joining...' : 'Join the Waitlist'}
        </button>
      </form>
    </>
  );
}