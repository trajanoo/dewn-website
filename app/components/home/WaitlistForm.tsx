'use client'

import { useState, useRef, useEffect } from 'react'
import { toast } from 'sonner'

const ZOHO_FORM_ID = '3z74e84c8d5aaea1b92535bb9ec5fb386b8afeca7e0c821a192226c91f7d5682fd'

interface WaitlistFormProps {
  dark?: boolean
  instanceId?: string
}

export default function WaitlistForm({ dark = false, instanceId = 'default' }: WaitlistFormProps) {
  const iFrameName = `_zcSignup${instanceId}`

  const [email, setEmail]           = useState('')
  const [submitted, setSubmitted]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const iframeRef                   = useRef<HTMLIFrameElement>(null)

  // Detecta quando o Zoho responde no iframe
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      if (loading) {
        setSubmitted(true)
        setLoading(false)
      }
    }

    iframe.addEventListener('load', handleLoad)
    return () => iframe.removeEventListener('load', handleLoad)
  }, [loading])

  // Toast de confirmação
  useEffect(() => {
    if (submitted) {
      toast.success("You're in. We'll be in touch when DEWN launches.", {
        position: 'top-center',
      })
    }
  }, [submitted])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!email) return
    setLoading(true)

    // GA4
    if (typeof (window as any).gtag === 'function') {
      ;(window as any).gtag('event', 'waitlist_submit', {
        event_category: 'engagement',
        event_label: 'Zoho Waitlist Form',
      })
    }
  }

  if (submitted) return null

  return (
    <>
      <iframe
        ref={iframeRef}
        name={iFrameName}
        className="hidden"
        title="zoho-form-target"
      />

      <form
        id="zcampaignOptinForm"
        action="https://zgp4-zgp4.maillist-manage.in/weboptin.zc"
        method="POST"
        target={iFrameName}
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
      >

        <input type="hidden" name="submitType"      value="optinCustomView" />
        <input type="hidden" name="emailReportId"   value="" />
        <input type="hidden" name="formType"        value="QuickForm" />
        <input type="hidden" name="zx"              value="1dfc313f00" />
        <input type="hidden" name="zcvers"          value="2.0" />
        <input type="hidden" name="oldListIds"      value="" />
        <input type="hidden" name="mode"            value="OptinCreateView" />
        <input type="hidden" name="zcld"            value="14b5052434da3fe7" />
        <input type="hidden" name="zctd"            value="14b5052434da3e31" />
        <input type="hidden" name="document_domain" value="" />
        <input type="hidden" name="zc_trackCode"    value="ZCFORMVIEW" />
        <input type="hidden" name="zc_formIx"       value={ZOHO_FORM_ID} />

        <input
          type="email"
          name="CONTACT_EMAIL"
          id="EMBED_FORM_EMAIL_LABEL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className={`flex-1 px-5 py-3 rounded-full text-sm outline-none transition-all duration-200 ${
            dark
              ? 'bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-white/40'
              : 'bg-white border border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/30'
          }`}
        />

        <button
          type="submit"
          disabled={loading}
          className={`px-7 py-3 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
            dark
              ? 'bg-white text-foreground hover:bg-white/90'
              : 'bg-primary text-primary-foreground hover:opacity-90'
          } ${loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {loading ? 'Joining...' : 'Join the Waitlist'}
        </button>
      </form>
    </>
  )
}