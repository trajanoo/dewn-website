// app/api/research-access/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  // ─────────────────────────────────────────────────────────
  // TODO: Integração Zoho — aguardando credenciais do cliente
  //
  // Variáveis necessárias no .env.local:
  //   ZOHO_AUTH_TOKEN=...
  //   ZOHO_LIST_KEY=...
  //
  // Lógica a implementar:
  //   1. GET  → checar se email já existe na lista
  //   2a. Se SIM  → retornar { exists: true } para download direto
  //   2b. Se NÃO  → POST para adicionar à lista + disparar autoresponder com PDF
  //
  // Referência: mesma lista usada no waitlist (List Key no painel Zoho Campaigns)
  // ─────────────────────────────────────────────────────────

  // Comportamento temporário enquanto Zoho não está integrado:
  // Sempre trata como email novo → mostra mensagem "check your inbox"
  // (sem envio real de email por enquanto)
  
  return NextResponse.json({ exists: false })
}