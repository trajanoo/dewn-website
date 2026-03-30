// components/ResearchAccessButton.tsx
'use client'

import { useState } from 'react'
import { ArrowRight, X, Download, Loader2 } from 'lucide-react'

type Props = {
  linkText?: string
  pdfUrl?: string
}

type State = 'idle' | 'loading' | 'sent' | 'error'

export default function ResearchAccessButton({ linkText, pdfUrl }: Props) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function closeModal() {
    setOpen(false)
    setState('idle')
    setEmail('')
    setErrorMsg('')
  }

  function triggerDownload() {
    if (!pdfUrl) {
      setState('error')
      setErrorMsg('PDF not yet available. Please try again soon.')
      return
    }
    const a = document.createElement('a')
    a.href = pdfUrl
    a.download = 'DEWN-Technical-Thesis.pdf'
    a.target = '_blank'
    a.click()
    closeModal()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/research-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error')

      if (data.exists) {
        // Email já cadastrado → download direto
        triggerDownload()
      } else {
        // Email novo → PDF será enviado por email (quando Zoho estiver integrado)
        setState('sent')
      }
    } catch (err: any) {
      setState('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground hover:text-[#6A9BA0] transition-colors group"
      >
        {linkText || 'Access Research'}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <div className="bg-background border border-border rounded-2xl p-8 w-full max-w-md shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {state === 'sent' ? (
              <div className="text-center py-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Download className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-serif text-xl text-foreground mb-2">Check your inbox</h4>
                <p className="text-sm text-muted-foreground">
                  We've sent the Technical Thesis to{' '}
                  <span className="text-foreground">{email}</span>.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  Clinical Rationale
                </p>
                <h4 className="font-serif text-xl text-foreground mb-1">
                  Access the Research
                </h4>
                <p className="text-sm text-muted-foreground mb-6">
                  Enter your email to access the DEWN Technical Thesis.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-border bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
                  />

                  {state === 'error' && (
                    <p className="text-xs text-red-500 px-1">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={state === 'loading'}
                    className="cursor-pointer w-full py-3 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {state === 'loading' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Checking...</>
                    ) : (
                      'Access Research'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}