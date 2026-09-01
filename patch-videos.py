from pathlib import Path

p = Path('index.html')
s = p.read_text(encoding='utf-8')

css = '''
.video-section{background:#070707;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06)}
.video-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;max-width:980px;margin:0 auto}
.video-card{overflow:hidden;border:1px solid rgba(255,255,255,.1);border-radius:20px;background:#101010;box-shadow:0 18px 50px rgba(0,0,0,.2)}
.video-card video{display:block;width:100%;aspect-ratio:9/16;object-fit:cover;background:#000}
.video-caption{padding:15px 16px 17px}
.video-caption b{display:block;color:#f3eee5;font-size:16px;line-height:1.2}
.video-caption span{display:block;margin-top:5px;color:#969188;font-size:12px}
@media(max-width:760px){.video-grid{grid-auto-flow:column;grid-auto-columns:82%;grid-template-columns:none;overflow-x:auto;scroll-snap-type:x mandatory;padding:0 2px 10px}.video-card{scroll-snap-align:start}}
'''

if '.video-section{' not in s:
    s = s.replace('</style>', css + '\n</style>', 1)

section = '''
<section class="section video-section" id="depoimentos-video"><div class="shell"><div class="heading center"><p class="eyebrow">Relatos reais</p><h2>Veja o que sellers falam da experiência.</h2><p>Experiências de quem já esteve próximo da operação e dos encontros presenciais.</p></div><div class="video-grid"><article class="video-card"><video controls playsinline preload="metadata" src="videos/video-1-imersao.mp4"></video><div class="video-caption"><b>Experiência real, sem roteiro.</b><span>Toque para assistir.</span></div></article><article class="video-card"><video controls playsinline preload="metadata" src="videos/video-2-imersao.mp4"></video><div class="video-caption"><b>Troca entre quem já está no mercado.</b><span>Toque para assistir.</span></div></article><article class="video-card"><video controls playsinline preload="metadata" src="videos/video-3-imersao.mp4"></video><div class="video-caption"><b>Visão prática de operação.</b><span>Toque para assistir.</span></div></article></div></div></section>
'''

anchor = '<section class="section dark" id="resultados">'
if 'id="depoimentos-video"' not in s:
    if anchor not in s:
        raise SystemExit('Âncora de resultados não encontrada')
    s = s.replace(anchor, section + '\n' + anchor, 1)

p.write_text(s, encoding='utf-8')
