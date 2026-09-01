from pathlib import Path

p = Path('index.html')
s = p.read_text(encoding='utf-8')

if 'id="argo"' not in s:
    css = '''
.argo-section{padding:78px 0;background:linear-gradient(180deg,#050505,#0a0a0a)}
.argo-card{display:grid;grid-template-columns:1.05fr .95fr;gap:34px;align-items:center;padding:38px;border:1px solid rgba(241,199,91,.25);border-radius:24px;background:radial-gradient(circle at top right,rgba(216,166,46,.14),transparent 42%),#0d0d0d}
.argo-card h2{font-size:clamp(38px,4.8vw,62px);line-height:.98;letter-spacing:-.055em;margin:0 0 14px}
.argo-card h2 strong{color:var(--gold2)}
.argo-card p{margin:0;color:#b8b1a7}
.argo-points{display:grid;gap:10px}
.argo-point{padding:16px 18px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:#101010}
.argo-point b{display:block;color:#f3ede4;margin-bottom:4px}
.argo-point span{display:block;color:#9e988f;font-size:13px}
@media(max-width:900px){.argo-card{grid-template-columns:1fr;padding:28px}}
'''
    s = s.replace('</style>', css + '\n</style>', 1)

    marker = '<section class="section" id="para-quem">'
    argo = '''<section class="argo-section" id="argo"><div class="shell"><div class="argo-card"><div><p class="eyebrow">Apresentação exclusiva • Hub ARGO</p><h2>Conheça a plataforma criada para dar <strong>mais clareza à sua operação.</strong></h2><p>Durante a imersão, você vai acompanhar uma apresentação prática do Hub ARGO e entender como a plataforma organiza informações da operação para ajudar na leitura de produtos, anúncios, estoque, desempenho e decisões do dia a dia.</p><p style="margin-top:14px"><b style="color:#eee9e0">E quem estiver presencialmente na sala terá acesso exclusivo para testar a ferramenta na própria operação.</b></p></div><div class="argo-points"><div class="argo-point"><b>Veja a plataforma funcionando</b><span>Apresentação prática durante o evento.</span></div><div class="argo-point"><b>Teste com a sua própria operação</b><span>Acesso exclusivo para os participantes experimentarem a ferramenta na prática.</span></div><div class="argo-point"><b>Decida com mais contexto</b><span>Menos informação solta e mais clareza para identificar o que merece atenção primeiro.</span></div></div></div></div></section>\n\n'''
    if marker not in s:
        raise SystemExit('Não encontrei a seção para quem para inserir o ARGO')
    s = s.replace(marker, argo + marker, 1)

p.write_text(s, encoding='utf-8')
