<script setup lang="ts">
// Custom homepage layout for bitcoinstamps.xyz — dark-tech design language.
// Rendered by VitePress via `layout: StampsHome` frontmatter (VPContent maps an
// unknown layout string to a globally-registered component). The VitePress navbar,
// search, locale switcher and theme toggle stay intact around this component.
//
// Design tokens live in scoped CSS as --sh-* variables with a light default and a
// `.dark .stamps-home` deep-black override, so both appearance modes stay clean.
// Content is real site content; EntityMention components carry the LEO entity links.
// Voice-DNA: no em-dashes, no "not X / it's Y" negations, active voice, digits.
import { withBase } from 'vitepress'

const stampImg = withBase('/bitcoin-stamp-hero-light.png')
</script>

<template>
  <main class="stamps-home">
    <!-- ===================== HERO ===================== -->
    <section class="sh-hero">
      <div class="sh-wrap sh-hero-grid">
        <div class="sh-hero-copy">
          <div class="sh-eyebrow">Metaprotocol Documentation</div>
          <h1 class="sh-h1">Bitcoin Stamps<span class="sh-sub">Permanent by consensus.</span></h1>
          <p class="sh-tagline">
            Permanent digital assets on Bitcoin, guided by community wisdom and the
            ancient truth <em>"In Lak'ech Ala K'in"</em>. Data stamped into the UTXO
            set itself, unprunable for as long as Bitcoin runs.
          </p>
          <div class="sh-cta-row">
            <a class="sh-btn sh-btn-primary" href="/en/guide/introduction">Get Started</a>
            <a class="sh-btn sh-btn-ghost mono" href="/en/protocols/">$ view protocols →</a>
          </div>

          <div class="sh-term mono" aria-label="example mint command">
            <div class="sh-term-bar">
              <span class="sh-term-dot"></span><span class="sh-term-dot"></span><span class="sh-term-dot"></span>
              <span>stampchain · mainnet</span>
            </div>
            <div class="sh-term-body">
              <div><span class="sh-p">$</span> <span class="sh-cmd">stamp mint</span> <span class="sh-flag">--file kevin.png --encoding p2wsh</span></div>
              <div class="sh-out">→ writing 2,832 bytes into the UTXO set...</div>
              <div><span class="sh-ok">✓ stamped</span> <span class="sh-out">tx confirmed · block 779,652 · permanence: forever</span> <span class="sh-cursor"></span></div>
            </div>
          </div>
        </div>

        <figure class="sh-stamp-frame">
          <span class="sh-tick tl"></span><span class="sh-tick tr"></span>
          <span class="sh-tick bl"></span><span class="sh-tick br"></span>
          <img :src="stampImg" alt="Bitcoin Stamp artwork: a rubber stamp above chain links" />
          <figcaption class="sh-stamp-meta mono">
            <span>stamp:<b>genesis</b></span>
            <span>enc:<b>P2WSH</b></span>
            <span>block:<b>779652</b></span>
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- ===================== STATS ===================== -->
    <section class="sh-stats" aria-label="protocol milestones">
      <div class="sh-wrap sh-stats-grid">
        <div class="sh-stat">
          <div class="sh-stat-num mono">779,652</div>
          <div class="sh-stat-label mono">First stamp · block height</div>
        </div>
        <div class="sh-stat">
          <div class="sh-stat-num mono"><span class="sh-accent">KEVIN</span> #4258</div>
          <div class="sh-stat-label mono">First KEVIN stamp</div>
        </div>
        <div class="sh-stat">
          <div class="sh-stat-num mono">#18,516</div>
          <div class="sh-stat-label mono">First SRC-20 token</div>
        </div>
        <div class="sh-stat">
          <div class="sh-stat-num mono">2,300<span class="sh-accent">+</span></div>
          <div class="sh-stat-label mono">KEVIN holders</div>
        </div>
      </div>
    </section>

    <!-- ===================== 01 WHY ===================== -->
    <section class="sh-block">
      <div class="sh-wrap">
        <div class="sh-sec-head">
          <span class="sh-sec-index mono">01</span>
          <h2 class="sh-h2">Why Bitcoin Stamps</h2>
          <span class="sh-rule"></span>
          <span class="sh-aside mono">// permanence as a protocol property</span>
        </div>

        <div class="sh-why-grid">
          <div class="sh-why-cell lead">
            <div>
              <div class="sh-why-id mono">STORAGE MODEL</div>
              <h3 class="sh-why-lead-h3">Data lives in the UTXO set, the one place Bitcoin can never prune.</h3>
              <p class="sh-why-lead-p">
                Stamps write asset data directly into unspent transaction outputs.
                Every full node carries the UTXO set as consensus-critical state, so
                stamp data survives as long as Bitcoin itself. No witness discount, no
                prunable sidecar.
              </p>
            </div>
            <div class="sh-compare mono" aria-label="storage comparison">
              <div class="sh-compare-row">
                <span>witness data</span><span>prunable, optional for validation</span>
              </div>
              <div class="sh-compare-row">
                <span>off-chain refs</span><span>depends on external hosts staying alive</span>
              </div>
              <div class="sh-compare-row hot">
                <span>UTXO set</span><span>consensus state, every node, forever</span>
              </div>
            </div>
          </div>

          <div class="sh-why-cell">
            <div class="sh-why-id mono">02 / ENCODING</div>
            <h3 class="sh-why-h3">P2WSH encoding</h3>
            <p class="sh-why-p">Asset bytes pack into <code>P2WSH</code> outputs using bare multisig-style encoding. Standard transactions, standard relay, zero protocol changes.</p>
          </div>
          <div class="sh-why-cell">
            <div class="sh-why-id mono">03 / TRUST</div>
            <h3 class="sh-why-h3">No external indexers required</h3>
            <p class="sh-why-p">You rebuild a stamp from the chain alone. Indexers add convenience, they stay convenience, they never become a trust dependency for what a stamp is.</p>
          </div>
          <div class="sh-why-cell">
            <div class="sh-why-id mono">04 / VERIFIABILITY</div>
            <h3 class="sh-why-h3">Deterministic across nodes</h3>
            <p class="sh-why-p">Give every node the same chain and it derives the same stamps in the same order. Numbering, ownership, and <EntityMention entity="src-20">SRC-20</EntityMention> balances stay pure functions of Bitcoin history.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 02 START BUILDING ===================== -->
    <section class="sh-block">
      <div class="sh-wrap">
        <div class="sh-sec-head">
          <span class="sh-sec-index mono">02</span>
          <h2 class="sh-h2">Start building</h2>
          <span class="sh-rule"></span>
          <span class="sh-aside mono">// two doors, one chain</span>
        </div>

        <div class="sh-build-grid">
          <div class="sh-build-panel">
            <span class="sh-build-tag mono">For Creators</span>
            <h3 class="sh-build-h3">Put art on Bitcoin, permanently.</h3>
            <p class="sh-build-p">Go from your first stamp to launching an <EntityMention entity="src-20">SRC-20</EntityMention> token. No code required to begin.</p>
            <ul class="sh-build-links">
              <li><a href="/en/tutorials/creating-first-stamp"><span class="ref mono">01</span> Create your first stamp <span class="arrow mono">→</span></a></li>
              <li><a href="/en/tutorials/artist-tools"><span class="ref mono">02</span> Artist tools and workflows <span class="arrow mono">→</span></a></li>
              <li><a href="/en/tutorials/src20-token-creation"><span class="ref mono">03</span> Launch an SRC-20 token <span class="arrow mono">→</span></a></li>
            </ul>
          </div>

          <div class="sh-build-panel">
            <span class="sh-build-tag mono">For Developers</span>
            <h3 class="sh-build-h3">Build on the metaprotocol.</h3>
            <p class="sh-build-p">Deterministic indexing, transaction construction, and a full API surface.</p>
            <ul class="sh-build-links">
              <li><a href="/en/protocols/"><span class="ref mono">docs</span> Protocol specifications <span class="arrow mono">→</span></a></li>
              <li><a href="/en/tutorials/sdk-integration"><span class="ref mono">sdk</span> Transaction-builder SDK <span class="arrow mono">→</span></a></li>
              <li><a href="/en/tutorials/api-integration"><span class="ref mono">api</span> Stampchain API reference <span class="arrow mono">→</span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 03 ORIGIN ===================== -->
    <section class="sh-block">
      <div class="sh-wrap">
        <div class="sh-sec-head">
          <span class="sh-sec-index mono">03</span>
          <h2 class="sh-h2">The Bitcoin Graffiti Movement</h2>
          <span class="sh-rule"></span>
          <span class="sh-aside mono">// est. block 779,652</span>
        </div>

        <div class="sh-origin-grid">
          <div class="sh-origin-copy">
            <p class="sh-big">
              Bitcoin Stamps began as an act of graffiti: art sprayed onto the most
              permanent wall humanity has ever built.
            </p>
            <p>
              <EntityMention entity="mikeinspace">mikeinspace</EntityMention>, the
              original dreamer, met <EntityMention entity="arwyn">Arwyn</EntityMention>
              through the Flooneybin project on
              <EntityMention entity="counterparty">Counterparty</EntityMention>. When
              Mike shared the Bitcoin Stamps vision,
              <EntityMention entity="arwyn">Arwyn</EntityMention> saw the meme magic and
              brought in <EntityMention entity="reinamora">Reinamora</EntityMention>.
              Together they formed The Original Trinity and cut the first stamp at
              block 779,652.
            </p>
            <p>
              Then came <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>.
              Stamped at #4258 and reborn as the first
              <EntityMention entity="src-20">SRC-20</EntityMention> token at #18,516,
              KEVIN grew from an in-joke into the protocol's patron saint. The community
              decides what matters on Bitcoin, with no company in charge.
            </p>
            <div class="sh-trinity mono">
              <span>mikeinspace: the question</span>
              <span>Arwyn: the code</span>
              <span>Reinamora: the chain</span>
            </div>
          </div>

          <div class="sh-timeline mono">
            <div class="sh-tl-item">
              <div class="sh-tl-block">BLOCK 779,652</div>
              <h4 class="sh-tl-h4">The first stamp</h4>
              <p class="sh-tl-p">Image data lands in the UTXO set. The wall gets marked. The movement begins.</p>
            </div>
            <div class="sh-tl-item">
              <div class="sh-tl-block">STAMP #4258</div>
              <h4 class="sh-tl-h4">KEVIN appears</h4>
              <p class="sh-tl-p">A pixelated face becomes the community's heartbeat, and its conscience.</p>
            </div>
            <div class="sh-tl-item">
              <div class="sh-tl-block">STAMP #18,516</div>
              <h4 class="sh-tl-h4">SRC-20 genesis</h4>
              <p class="sh-tl-p">KEVIN deploys as the first SRC-20 token: fungible assets, stamped rules, zero intermediaries.</p>
            </div>
            <div class="sh-tl-item">
              <div class="sh-tl-block">TODAY</div>
              <h4 class="sh-tl-h4">2,300+ KEVIN holders</h4>
              <p class="sh-tl-p">The graffiti became a protocol. The protocol stays graffiti at heart.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 04 COMMUNITY VALUES ===================== -->
    <section class="sh-block">
      <div class="sh-wrap">
        <div class="sh-sec-head">
          <span class="sh-sec-index mono">04</span>
          <h2 class="sh-h2">Community Values</h2>
          <span class="sh-rule"></span>
          <span class="sh-aside mono">// no company, no foundation</span>
        </div>
        <div class="sh-values-grid">
          <p class="sh-values-lead">
            The Bitcoin Stamps community lives by <em>"In Lak'ech Ala K'in"</em>, I am
            another you. Your creativity strengthens our collective expression.
          </p>
          <p class="sh-values-body">
            We carry the Rare Pepe tradition forward while embracing Bitcoin's
            permanence. This movement grew from artists and builders, not corporate
            planning, and it stands on fair launches and shared creativity.
            <a class="sh-values-link" href="/en/community/">Meet the community →</a>
          </p>
        </div>
      </div>
    </section>

    <!-- ===================== FOOTER ===================== -->
    <footer class="sh-footer">
      <div class="sh-wrap sh-foot-grid">
        <div class="sh-foot-brand">
          <span class="sh-brand">
            <span class="sh-brand-mark" aria-hidden="true"></span>
            Bitcoin Stamps
          </span>
          <p>
            Community-owned documentation for the Bitcoin Stamps metaprotocol. No
            company, no foundation. Just the chain and the people stamping on it.
          </p>
          <div class="sh-foot-motto mono">
            "In Lak'ech Ala K'in"
            <small>I am another you</small>
          </div>
        </div>

        <div class="sh-foot-col">
          <h5 class="mono">Protocol</h5>
          <ul>
            <li><a href="/en/whitepaper/">Whitepaper</a></li>
            <li><a href="/en/protocols/src-20">SRC-20 spec</a></li>
            <li><a href="/en/protocols/src-721">SRC-721 spec</a></li>
            <li><a href="/en/protocols/sips">SIP registry</a></li>
          </ul>
        </div>

        <div class="sh-foot-col">
          <h5 class="mono">Build</h5>
          <ul>
            <li><a href="/en/guide/introduction">Getting started</a></li>
            <li><a href="/en/tutorials/">Tutorials</a></li>
            <li><a href="/en/tutorials/api-integration">API reference</a></li>
            <li><a href="/en/tutorials/sdk-integration">tx-builder SDK</a></li>
          </ul>
        </div>

        <div class="sh-foot-col">
          <h5 class="mono">Community</h5>
          <ul>
            <li><a href="/en/narratives/">Stories</a></li>
            <li><a href="/en/community/">Community hub</a></li>
            <li><a href="/en/guide/economics">Economics</a></li>
            <li><a href="/en/blog/">Updates</a></li>
          </ul>
        </div>
      </div>

      <div class="sh-wrap sh-foot-legal mono">
        <span>© 2023-2026 Bitcoin Stamps Community · MIT License</span>
        <span>permanence: forever</span>
      </div>
    </footer>
  </main>
</template>

<style scoped>
/* ---------- design tokens (light default) ---------- */
.stamps-home {
  --sh-bg: #FAFAFA;
  --sh-raise: #FFFFFF;
  --sh-panel: #F5F5F5;
  --sh-line: #E5E5E5;
  --sh-text: #171717;
  --sh-dim: #525252;
  --sh-faint: #A3A3A3;
  --sh-orange: #C15200;        /* accent text, AA on light */
  --sh-orange-solid: #F7931A;  /* fills, brackets, dots */
  --sh-orange-ink: #0A0A0A;    /* text on orange fills */
  --sh-orange-soft: rgba(247, 147, 26, 0.10);
  --sh-sans: "Geist Sans", "Geist", -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
  --sh-mono: "Geist Mono", "JetBrains Mono", "SFMono-Regular", Menlo, Consolas, monospace;
  --sh-max: 1152px;

  background: var(--sh-bg);
  color: var(--sh-text);
  font-family: var(--sh-sans);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  display: block;
}

/* ---------- design tokens (dark override) ---------- */
:global(.dark) .stamps-home {
  --sh-bg: #0A0A0A;
  --sh-raise: #111111;
  --sh-panel: #1A1A1A;
  --sh-line: #262626;
  --sh-text: #EDEDED;
  --sh-dim: #8A8A8A;
  --sh-faint: #5C5C5C;
  --sh-orange: #F7931A;
  --sh-orange-solid: #F7931A;
  --sh-orange-ink: #0A0A0A;
  --sh-orange-soft: rgba(247, 147, 26, 0.12);
}

.stamps-home * { box-sizing: border-box; }
.stamps-home ::selection { background: var(--sh-orange-solid); color: #0A0A0A; }
.stamps-home a { color: inherit; text-decoration: none; }
.stamps-home img { display: block; max-width: 100%; }
.stamps-home .mono { font-family: var(--sh-mono); }

.sh-wrap {
  max-width: var(--sh-max);
  margin: 0 auto;
  padding: 0 32px;
}

/* ---------- hero ---------- */
.sh-hero {
  border-bottom: 1px solid var(--sh-line);
  position: relative;
  overflow: hidden;
}
.sh-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--sh-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--sh-line) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.4;
  -webkit-mask-image: radial-gradient(ellipse 80% 90% at 70% 10%, #000 0%, transparent 70%);
  mask-image: radial-gradient(ellipse 80% 90% at 70% 10%, #000 0%, transparent 70%);
  pointer-events: none;
}
:global(.dark) .sh-hero::before { opacity: 0.25; }

.sh-hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 64px;
  align-items: center;
  padding: 72px 0 64px;
}

.sh-eyebrow {
  font-family: var(--sh-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sh-orange);
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.sh-eyebrow::before { content: ""; width: 24px; height: 1px; background: var(--sh-orange-solid); }

.sh-h1 {
  font-size: clamp(44px, 5.4vw, 68px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--sh-text);
}
.sh-sub { display: block; color: var(--sh-faint); font-weight: 600; }

.sh-tagline {
  margin: 22px 0 0;
  max-width: 52ch;
  font-size: 17px;
  color: var(--sh-dim);
  line-height: 1.65;
}
.sh-tagline em {
  font-style: normal;
  color: var(--sh-text);
  font-family: var(--sh-mono);
  font-size: 15px;
}

.sh-cta-row { display: flex; align-items: center; gap: 14px; margin-top: 32px; flex-wrap: wrap; }

.sh-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  padding: 11px 22px;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.sh-btn-primary { background: var(--sh-orange-solid); color: var(--sh-orange-ink); }
.sh-btn-primary:hover { background: #FFA739; }
.sh-btn-ghost { border-color: var(--sh-line); color: var(--sh-text); font-size: 13.5px; font-weight: 500; }
.sh-btn-ghost:hover { border-color: var(--sh-orange-solid); color: var(--sh-orange); }

.sh-term {
  margin-top: 40px;
  max-width: 560px;
  border: 1px solid var(--sh-line);
  border-radius: 8px;
  background: var(--sh-raise);
  font-size: 13px;
  overflow: hidden;
}
.sh-term-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border-bottom: 1px solid var(--sh-line);
  color: var(--sh-faint);
  font-size: 11.5px;
}
.sh-term-dot { width: 9px; height: 9px; border-radius: 50%; border: 1px solid var(--sh-line); background: var(--sh-panel); }
.sh-term-bar span:last-child { margin-left: auto; letter-spacing: 0.06em; }
.sh-term-body { padding: 16px 18px 18px; line-height: 1.9; }
.sh-p { color: var(--sh-orange); user-select: none; }
.sh-cmd { color: var(--sh-text); }
.sh-flag { color: var(--sh-dim); }
.sh-out { color: var(--sh-faint); }
.sh-ok { color: var(--sh-orange); }
.sh-cursor {
  display: inline-block;
  width: 8px; height: 15px;
  background: var(--sh-orange-solid);
  vertical-align: -2px;
  animation: sh-blink 1.1s steps(1) infinite;
}
@keyframes sh-blink { 50% { opacity: 0; } }

/* hero stamp frame */
.sh-stamp-frame {
  position: relative;
  border: 1px solid var(--sh-line);
  background: linear-gradient(180deg, rgba(247,147,26,0.05), transparent 40%), var(--sh-raise);
  padding: 40px;
  align-self: start;
  margin: 0;
}
.sh-tick { position: absolute; width: 13px; height: 13px; border-color: var(--sh-orange-solid); border-style: solid; border-width: 0; }
.sh-tick.tl { top: -1px; left: -1px; border-top-width: 2px; border-left-width: 2px; }
.sh-tick.tr { top: -1px; right: -1px; border-top-width: 2px; border-right-width: 2px; }
.sh-tick.bl { bottom: -1px; left: -1px; border-bottom-width: 2px; border-left-width: 2px; }
.sh-tick.br { bottom: -1px; right: -1px; border-bottom-width: 2px; border-right-width: 2px; }
/* white card behind the (transparent-background) stamp PNG so the black artwork
   keeps high contrast in dark mode, matching the approved reference. */
.sh-stamp-frame img { width: 100%; background: #FFFFFF; border-radius: 2px; }
.sh-stamp-meta {
  margin-top: 28px;
  padding-top: 18px;
  border-top: 1px dashed var(--sh-line);
  font-size: 11.5px;
  color: var(--sh-faint);
  display: flex;
  justify-content: space-between;
  letter-spacing: 0.04em;
}
.sh-stamp-meta b { color: var(--sh-dim); font-weight: 500; }

/* ---------- stats band ---------- */
.sh-stats { border-bottom: 1px solid var(--sh-line); background: var(--sh-raise); }
.sh-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.sh-stat { padding: 34px 32px 30px; border-left: 1px solid var(--sh-line); transition: background 0.15s ease; }
.sh-stat:first-child { border-left: none; padding-left: 0; }
.sh-stat:hover { background: var(--sh-orange-soft); }
.sh-stat-num {
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  font-size: clamp(24px, 2.4vw, 32px);
  letter-spacing: -0.02em;
  color: var(--sh-text);
}
.sh-accent { color: var(--sh-orange); }
.sh-stat-label {
  margin-top: 8px;
  font-size: 11.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sh-faint);
}

/* ---------- section scaffolding ---------- */
.sh-block { border-bottom: 1px solid var(--sh-line); padding: 96px 0; }
.sh-sec-head { display: flex; align-items: baseline; gap: 20px; margin-bottom: 56px; }
.sh-sec-index { font-size: 13px; color: var(--sh-orange); letter-spacing: 0.08em; }
.sh-h2 { font-size: clamp(28px, 3vw, 38px); font-weight: 700; letter-spacing: -0.025em; line-height: 1.1; margin: 0; color: var(--sh-text); }
.sh-rule { flex: 1; height: 1px; background: var(--sh-line); align-self: center; }
.sh-aside { font-size: 12px; color: var(--sh-faint); white-space: nowrap; }

/* ---------- why ---------- */
.sh-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--sh-line); border: 1px solid var(--sh-line); }
.sh-why-cell { background: var(--sh-bg); padding: 36px 32px; position: relative; transition: background 0.15s ease; }
.sh-why-cell:hover { background: var(--sh-raise); }
.sh-why-cell:hover .sh-why-id { color: var(--sh-orange); }
.sh-why-cell.lead {
  grid-column: span 3;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 48px;
  align-items: center;
  padding: 44px 40px;
}
.sh-why-id { font-size: 12px; color: var(--sh-faint); letter-spacing: 0.08em; transition: color 0.15s ease; }
.sh-why-h3 { margin: 14px 0 0; font-size: 18px; font-weight: 600; letter-spacing: -0.015em; color: var(--sh-text); }
.sh-why-lead-h3 { margin: 14px 0 0; font-size: 26px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2; color: var(--sh-text); }
.sh-why-p { margin: 10px 0 0; font-size: 14.5px; color: var(--sh-dim); line-height: 1.65; }
.sh-why-lead-p { margin: 10px 0 0; font-size: 16px; max-width: 46ch; color: var(--sh-dim); line-height: 1.65; }
.sh-why-cell code { font-family: var(--sh-mono); font-size: 0.88em; color: var(--sh-orange); background: var(--sh-orange-soft); padding: 1px 6px; border-radius: 4px; }

.sh-compare { font-family: var(--sh-mono); font-size: 12.5px; border: 1px solid var(--sh-line); background: var(--sh-raise); }
.sh-compare-row { display: grid; grid-template-columns: 130px 1fr; border-top: 1px solid var(--sh-line); }
.sh-compare-row:first-child { border-top: none; }
.sh-compare-row > span { padding: 12px 16px; color: var(--sh-faint); }
.sh-compare-row > span:last-child { border-left: 1px solid var(--sh-line); color: var(--sh-dim); }
.sh-compare-row.hot > span:first-child { color: var(--sh-orange); }
.sh-compare-row.hot > span:last-child { color: var(--sh-text); }

/* ---------- start building ---------- */
.sh-build-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.sh-build-panel { border: 1px solid var(--sh-line); background: var(--sh-raise); padding: 40px; position: relative; transition: border-color 0.2s ease; }
.sh-build-panel:hover { border-color: var(--sh-orange-solid); }
.sh-build-panel:hover .sh-build-tag { border-color: var(--sh-orange-solid); color: var(--sh-orange); }
.sh-build-tag {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sh-dim);
  border: 1px solid var(--sh-line);
  padding: 5px 12px;
  border-radius: 100px;
  transition: border-color 0.2s ease, color 0.2s ease;
}
.sh-build-h3 { margin: 22px 0 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: var(--sh-text); }
.sh-build-p { margin: 10px 0 0; color: var(--sh-dim); font-size: 15px; max-width: 42ch; }
.sh-build-links { margin: 28px 0 0; list-style: none; padding: 0; border-top: 1px solid var(--sh-line); }
.sh-build-links a {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 15px 4px;
  border-bottom: 1px solid var(--sh-line);
  font-size: 14.5px;
  color: var(--sh-text);
  transition: padding-left 0.15s ease, color 0.15s ease;
}
.sh-build-links a:hover { color: var(--sh-orange); padding-left: 12px; }
.sh-build-links .ref { font-size: 11.5px; color: var(--sh-faint); }
.sh-build-links .arrow { margin-left: auto; color: var(--sh-faint); font-size: 13px; }
.sh-build-links a:hover .arrow { color: var(--sh-orange); }

/* ---------- origin ---------- */
.sh-origin-grid { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: 80px; align-items: start; }
.sh-origin-copy p { color: var(--sh-dim); font-size: 16.5px; line-height: 1.75; margin: 20px 0 0; }
.sh-origin-copy p:first-child { margin-top: 0; }
.sh-big { font-size: clamp(21px, 2.2vw, 26px); line-height: 1.45; color: var(--sh-text) !important; font-weight: 600; letter-spacing: -0.015em; }
.sh-trinity { margin-top: 34px; display: flex; gap: 12px; flex-wrap: wrap; }
.sh-trinity span {
  font-size: 12.5px;
  color: var(--sh-dim);
  border: 1px solid var(--sh-line);
  padding: 7px 14px;
  border-radius: 100px;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.sh-trinity span:hover { border-color: var(--sh-orange-solid); color: var(--sh-text); }

.sh-timeline { border-left: 1px solid var(--sh-line); margin-top: 6px; }
.sh-tl-item { position: relative; padding: 0 0 40px 32px; }
.sh-tl-item:last-child { padding-bottom: 0; }
.sh-tl-item::before {
  content: "";
  position: absolute;
  left: -5px;
  top: 6px;
  width: 9px; height: 9px;
  background: var(--sh-bg);
  border: 1px solid var(--sh-faint);
  transition: background 0.15s ease, border-color 0.15s ease;
}
.sh-tl-item:hover::before { background: var(--sh-orange-solid); border-color: var(--sh-orange-solid); }
.sh-tl-block { font-size: 12px; color: var(--sh-orange); letter-spacing: 0.08em; }
.sh-tl-h4 { font-family: var(--sh-sans); font-size: 16px; font-weight: 600; margin: 6px 0 0; letter-spacing: -0.01em; color: var(--sh-text); }
.sh-tl-p { font-family: var(--sh-sans); font-size: 13.5px; color: var(--sh-dim); margin: 5px 0 0; line-height: 1.6; }

/* ---------- community values ---------- */
.sh-values-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 48px; align-items: start; }
.sh-values-lead { font-size: clamp(19px, 2vw, 23px); line-height: 1.5; color: var(--sh-text); font-weight: 600; letter-spacing: -0.015em; margin: 0; }
.sh-values-lead em { font-style: normal; color: var(--sh-orange); font-family: var(--sh-mono); font-size: 0.82em; }
.sh-values-body { font-size: 15.5px; color: var(--sh-dim); line-height: 1.7; margin: 0; }
.sh-values-link { display: inline-block; margin-top: 16px; color: var(--sh-orange); font-family: var(--sh-mono); font-size: 13px; }
.sh-values-link:hover { text-decoration: underline; }

/* ---------- footer ---------- */
.sh-footer { background: var(--sh-raise); }
.sh-foot-grid { display: grid; grid-template-columns: minmax(0, 5fr) repeat(3, minmax(0, 2fr)); gap: 48px; padding: 72px 0 56px; }
.sh-brand { display: inline-flex; align-items: center; gap: 11px; font-weight: 700; font-size: 15px; letter-spacing: -0.01em; color: var(--sh-text); }
.sh-brand-mark { width: 22px; height: 22px; background: var(--sh-orange-solid); position: relative; flex: none; }
.sh-brand-mark::after { content: ""; position: absolute; right: 0; bottom: 0; width: 7px; height: 7px; background: var(--sh-raise); }
.sh-foot-brand p { margin: 16px 0 0; font-size: 14px; color: var(--sh-dim); max-width: 34ch; line-height: 1.65; }
.sh-foot-motto { margin-top: 26px; font-size: 13px; color: var(--sh-orange); letter-spacing: 0.04em; }
.sh-foot-motto small { display: block; color: var(--sh-faint); font-size: 11px; margin-top: 5px; letter-spacing: 0.08em; text-transform: uppercase; }
.sh-foot-col h5 { font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--sh-faint); margin: 0 0 18px; }
.sh-foot-col ul { list-style: none; padding: 0; margin: 0; }
.sh-foot-col li { margin-bottom: 11px; }
.sh-foot-col a { font-size: 14px; color: var(--sh-dim); transition: color 0.15s ease; }
.sh-foot-col a:hover { color: var(--sh-orange); }
.sh-foot-legal {
  border-top: 1px solid var(--sh-line);
  padding: 22px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--sh-faint);
}

/* ---------- entity mentions inside the dark-tech copy ---------- */
.stamps-home :deep(.entity-mention) { color: var(--sh-orange); font-weight: 600; text-decoration: none; }
.stamps-home :deep(.entity-mention:hover) { background: var(--sh-orange-soft); }

/* ---------- responsive ---------- */
@media (max-width: 1000px) {
  .sh-hero-grid { grid-template-columns: 1fr; gap: 48px; padding: 56px 0; }
  .sh-stamp-frame { max-width: 440px; }
  .sh-stats-grid { grid-template-columns: 1fr 1fr; }
  .sh-stat { padding-left: 0; border-left: none; border-top: 1px solid var(--sh-line); }
  .sh-stat:nth-child(-n+2) { border-top: none; }
  .sh-stat:nth-child(even) { padding-left: 32px; border-left: 1px solid var(--sh-line); }
  .sh-why-grid { grid-template-columns: 1fr; }
  .sh-why-cell.lead { grid-column: span 1; grid-template-columns: 1fr; gap: 28px; }
  .sh-build-grid { grid-template-columns: 1fr; }
  .sh-origin-grid { grid-template-columns: 1fr; gap: 56px; }
  .sh-values-grid { grid-template-columns: 1fr; gap: 24px; }
  .sh-foot-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .sh-wrap { padding: 0 20px; }
  .sh-block { padding: 64px 0; }
  .sh-cta-row { flex-wrap: wrap; }
  .sh-stats-grid { grid-template-columns: 1fr; }
  .sh-stat, .sh-stat:nth-child(even) { border-left: none; padding-left: 0; border-top: 1px solid var(--sh-line); }
  .sh-stat:first-child { border-top: none; }
  .sh-sec-head { flex-wrap: wrap; }
  .sh-aside { display: none; }
  .sh-foot-grid { grid-template-columns: 1fr; gap: 36px; }
  .sh-foot-legal { flex-direction: column; gap: 8px; align-items: flex-start; }
}
</style>
