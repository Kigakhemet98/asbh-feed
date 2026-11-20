/* F1 Data Hub 3.1.1 \u2014 over-the-air code bundle (signed). */
(function () { var l = document.getElementById('app-css'); var s = document.createElement('style'); s.id = 'ota-css'; s.textContent = "/* F1 Data Hub 2.0 \u2014 broadcast-style theme.\n   Night race (dark) = Sky Sports F1 navy + The Race black masthead; Paddock (light) = beIN / Autosport white cards.\n   Accents: F1 red (Sky/Autosport), SuperSport blue for watch/live, The Race pink-red kickers. */\n:root, [data-theme=\"dark\"] {\n  --bg: #070b14; --panel: #0f1628; --panel2: #162039; --line: #23304e; --grid: rgba(154,168,196,.16);\n  --text: #eef2fb; --muted: #9aa8c4; --chart-bg: #0f1628; --track-inner: #0f1628;\n  --nav: #0a1a3c; --nav-text: #c9d6f2; --mast: #000;\n  --red: #e10600; --red2: #ff2d3a; --grad: linear-gradient(90deg, #ff2d3a, #e10600);\n  --blue: #1f6feb; --pink: #ff2d55; --kicker: #ff5a5f;\n  --purple: #a855f7; --green: #16c784; --yellow: #f5c518; --radius: 20px;\n  --hero: linear-gradient(120deg, #4a0000 0%, #8e0c0c 55%, #b01515 100%);\n  --shadow: 0 1px 0 rgba(255,255,255,.03), 0 8px 24px rgba(0,0,0,.25);\n  color-scheme: dark;\n}\n[data-theme=\"light\"] {\n  --bg: #eceef2; --panel: #ffffff; --panel2: #f4f5f8; --line: #e2e5eb; --grid: rgba(20,24,35,.08);\n  --text: #15171c; --muted: #6b7385; --chart-bg: #ffffff; --track-inner: #ffffff;\n  --nav: #0a1a3c; --nav-text: #c9d6f2; --mast: #000;\n  --kicker: #d4001a; --shadow: 0 2px 14px rgba(20,24,40,.07);\n  color-scheme: light;\n}\n* { box-sizing: border-box; }\nhtml, body { margin: 0; background: var(--bg); color: var(--text); font: 15px/1.45 Inter, \"Segoe UI\", Roboto, system-ui, -apple-system, Arial, sans-serif; }\na { color: var(--blue); text-decoration: none; }\n[data-theme=\"dark\"] a { color: #8ab4ff; }\nh1, h2, h3, h4 { margin: 0; line-height: 1.15; }\nh1, h2, .rc-h, .wordmark, .t-name, .an-title { font-family: \"Barlow Condensed\", \"Arial Narrow\", Arial, sans-serif; }\nh1 { font-size: 40px; font-weight: 800; font-style: italic; text-transform: uppercase; letter-spacing: .01em; }\nh2 { font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: .01em; }\nh3 { font-family: \"Barlow Condensed\", Arial, sans-serif; font-size: 19px; font-weight: 800; font-style: italic; margin: 18px 0 6px; color: var(--kicker); text-transform: uppercase; letter-spacing: .03em; }\n.rc-h { display: flex; align-items: center; gap: 10px; }\n.rc-h::before { content: \"\"; width: 6px; height: 22px; background: var(--grad); transform: skewX(-18deg); border-radius: 1px; }\n.rc-h.center { justify-content: center; }\n.muted { color: var(--muted); } .small { font-size: 12px; } .mono { font-variant-numeric: tabular-nums; font-family: \"JetBrains Mono\", Consolas, \"Roboto Mono\", monospace; font-size: 13px; }\n.note { color: var(--muted); font-size: 12.5px; margin: 10px 0 0; }\n\n/* ---------- masthead (The Race black) + nav (Sky navy, Autosport red rule) ---------- */\n.topbar { position: sticky; top: 0; z-index: 20; padding-top: env(safe-area-inset-top); background: var(--mast); }\n.masthead { display: flex; align-items: center; gap: 16px; padding: 10px 22px; background: var(--mast); color: #fff; }\n.brand { display: flex; align-items: center; gap: 10px; color: #fff !important; white-space: nowrap; }\n.brand img { width: 32px; height: 32px; border-radius: 8px; }\n.wordmark { font-size: 24px; font-weight: 600; font-style: italic; letter-spacing: .02em; }\n.wordmark b { font-weight: 800; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }\n.ticker { flex: 1; text-align: center; font-family: \"Barlow Condensed\", Arial; font-weight: 700; font-size: 17px; letter-spacing: .04em; text-transform: uppercase; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.ticker b { background: var(--red); padding: 2px 8px; margin-right: 8px; font-style: italic; }\n.ticker .cd { font-variant-numeric: tabular-nums; color: #ffd9d6; }\n.region { font-size: 12.5px; color: #cfd6e6 !important; border: 1px solid #333a48; padding: 6px 12px; border-radius: 999px; white-space: nowrap; }\n.theme-btn { background: #1b1f2a; color: #fff; border: 1px solid #333a48; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 16px; }\n.nav { display: flex; gap: 2px; justify-content: center; background: var(--nav); border-bottom: 3px solid var(--red); padding: 0 12px; }\n.nav a { display: flex; align-items: center; gap: 7px; padding: 12px 16px 10px; color: var(--nav-text); font-family: \"Barlow Condensed\", Arial; font-weight: 700; font-size: 18px; text-transform: uppercase; letter-spacing: .04em; border-bottom: 4px solid transparent; margin-bottom: -3px; }\n.nav a svg { width: 18px; height: 18px; fill: currentColor; }\n.nav a.active { color: #fff; border-bottom-color: #fff; background: linear-gradient(180deg, transparent, rgba(225,6,0,.35)); }\n.nav a:hover:not(.active) { color: #fff; }\n\n.main { max-width: 1280px; margin: 0 auto; padding: 22px 20px 110px; }\n.card { position: relative; background: var(--panel); border: 1px solid var(--line); border-radius: var(--radius); padding: 22px; margin-bottom: 18px; box-shadow: var(--shadow); }\n.card-h { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }\n.grid2 { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); gap: 18px; align-items: start; margin-bottom: 18px; }\n.grid2.even { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }\n.grid2 .card { margin: 0; }\n.row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }\n.loading { padding: 30px; color: var(--muted); display: flex; gap: 10px; align-items: center; justify-content: center; }\n.spinner { width: 18px; height: 18px; border: 3px solid var(--line); border-top-color: var(--red); border-radius: 50%; animation: spin .8s linear infinite; }\n@keyframes spin { to { transform: rotate(360deg); } }\n.error h3 { color: #ff8a80; text-transform: none; font-style: normal; }\n\n.btn { display: inline-flex; align-items: center; gap: 6px; border: 1px solid var(--line); background: var(--panel2); color: var(--text) !important; padding: 9px 14px; border-radius: 10px; font: inherit; font-weight: 600; cursor: pointer; white-space: nowrap; }\n.btn:hover { border-color: var(--muted); }\n.btn-primary { background: var(--grad); border-color: transparent; color: #fff !important; }\n.btn-sm { padding: 6px 10px; font-size: 13px; border-radius: 8px; }\n.btn-watch { background: var(--blue); border-color: transparent; color: #fff !important; margin-top: 4px; }\nselect, input[type=text], input[type=number], input[type=password], input:not([type]) { background: var(--panel2); color: var(--text); border: 1px solid var(--line); border-radius: 10px; padding: 9px 12px; font: inherit; max-width: 100%; }\nselect { background: var(--grad); border: 0; font-weight: 700; color: #fff; }\nselect option { color: #111; background: #fff; }\n.form select { background: var(--panel2); color: var(--text); border: 1px solid var(--line); font-weight: 500; }\nlabel { color: var(--muted); font-size: 13px; display: inline-flex; align-items: center; gap: 8px; }\n.form { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }\n.form > label, fieldset label { flex-direction: column; align-items: stretch; }\n.form label.chk, label.chk { flex-direction: row; align-items: center; }\nfieldset { border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; display: grid; gap: 8px; }\nlegend { color: var(--text); font-weight: 700; padding: 0 6px; }\n\n.chip { display: inline-block; font-size: 11.5px; font-weight: 700; padding: 3px 8px; border-radius: 999px; background: var(--panel2); border: 1px solid var(--line); color: var(--muted); }\n.chip-live { background: var(--red); color: #fff; border-color: transparent; }\n.chip-done { opacity: .7; }\n.sprint { color: #ff9f1c; }\n.cd.st-live { color: #fff; background: var(--red); border-radius: 8px; padding: 2px 8px; }\n.cd.st-done { color: var(--muted); }\n.hero-actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }\n.hero-actions.under { margin: -4px 0 18px; }\n\n/* ---------- Race Centre (beIN-style) ---------- */\n.rc-hero { position: relative; overflow: hidden; border-radius: 26px; background: var(--hero); color: #fff; padding: 44px 56px 40px; margin-bottom: 18px; box-shadow: 0 12px 34px rgba(120,0,0,.35); }\n.rc-hero-track { position: absolute; inset: -12% -6% -12% 22%; pointer-events: none; }\n.rc-hero-track svg { width: 100%; height: 100%; }\n.rc-hero-body { position: relative; }\n.rc-kicker { font-family: \"Barlow Condensed\", Arial; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #ffc9c4; font-size: 15px; }\n.rc-hero h1 { font-style: normal; font-size: 50px; max-width: 900px; margin: 6px 0 6px; }\n.rc-sub { font-size: 26px; font-weight: 300; color: #ffe6e3; } .rc-sub span { opacity: .6; margin: 0 6px; }\n.rc-hero-row { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap; margin-top: 44px; }\n.rc-date { font-family: \"Barlow Condensed\", Arial; font-weight: 700; font-size: 24px; letter-spacing: .05em; }\n.rc-time { font-family: \"Barlow Condensed\", Arial; font-size: 56px; font-weight: 600; line-height: 1; }\n.rc-tiles { display: flex; gap: 14px; }\n.tile { min-width: 108px; text-align: center; background: rgba(255,255,255,.14); border-radius: 14px; overflow: hidden; backdrop-filter: blur(2px); }\n.tile b { display: block; font-family: \"Barlow Condensed\", Arial; font-size: 50px; font-weight: 700; padding: 8px 12px 2px; border-bottom: 2px solid rgba(255,255,255,.18); font-variant-numeric: tabular-nums; }\n.tile span { display: block; padding: 4px 0 8px; font-size: 17px; }\n.tile.live { background: #fff; color: var(--red); }\n.snap-btn { position: absolute; top: 14px; right: 14px; width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--line); background: var(--panel2); color: var(--text); cursor: pointer; font-size: 16px; opacity: .7; }\n.rc-hero .snap-btn { background: rgba(255,255,255,.15); color: #fff; border-color: transparent; }\n.snap-btn:hover { opacity: 1; }\n.snapping .snap-btn { display: none; }\n\n.rc-circuit .rc-h { justify-content: center; margin-bottom: 8px; }\n.rc-circuit-grid { display: grid; grid-template-columns: 1.1fr 1fr 1fr; gap: 20px; align-items: center; }\n.rc-map svg { width: 100%; max-height: 300px; color: var(--muted); }\n.rc-length { text-align: center; }\n.rc-length b { font-family: \"Barlow Condensed\", Arial; font-size: 88px; font-weight: 700; line-height: 1; } .rc-length span { font-size: 30px; font-weight: 700; }\n.rc-length .muted { font-size: 20px; margin-top: 8px; }\n.rc-facts { display: grid; gap: 16px; }\n.fact { display: flex; gap: 14px; align-items: flex-start; }\n.fact i { font-style: normal; width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%; color: #6c3fb5; background: rgba(108,63,181,.12); font-size: 18px; flex: none; }\n[data-theme=\"dark\"] .fact i { color: #c4a6ff; background: rgba(168,85,247,.16); }\n.fact b { display: block; font-size: 22px; font-weight: 600; color: var(--text); } .fact span { color: var(--muted); font-size: 19px; } .fact small { display: block; color: var(--muted); font-size: 11px; }\n\n.upd-list { border: 1px solid var(--line); border-radius: 16px; overflow: hidden; }\n.upd { display: grid; grid-template-columns: 96px 1fr; gap: 16px; padding: 18px 20px; border-bottom: 1px solid var(--line); align-items: center; }\n.upd:last-child { border-bottom: 0; }\n.upd-day { text-align: center; color: #6c3fb5; font-weight: 600; font-size: 14px; border-right: 2px solid #6c3fb5; padding-right: 14px; line-height: 1.3; }\n[data-theme=\"dark\"] .upd-day { color: #c4a6ff; border-color: #8b5cf6; }\n.upd-body b { font-size: 16px; letter-spacing: .02em; } .upd-body > div { margin-top: 4px; color: var(--muted); font-weight: 600; }\n.pod { display: inline-flex; align-items: center; gap: 5px; margin-right: 14px; color: var(--text); font-weight: 600; }\n.pod i { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }\n.sep { opacity: .5; margin: 0 4px; }\n\n.prev { border-bottom: 1px solid var(--line); padding: 12px 0 8px; }\n.prev-top { display: flex; justify-content: space-between; color: var(--muted); font-size: 15px; }\n.prev-row { display: grid; grid-template-columns: 170px 1fr auto; align-items: center; gap: 12px; }\n.prev-row b { font-weight: 500; font-size: 19px; text-align: center; } .prev-row .mono { font-size: 18px; font-family: Inter, sans-serif; }\n.car-side { width: 100%; max-width: 170px; height: auto; display: block; }\n\n.rc-res-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 8px; padding-right: 40px; }\n.rc-res-top select { background: var(--panel); color: var(--text); border: 1px solid var(--line); border-radius: 999px; padding: 11px 18px; font-size: 17px; font-weight: 500; }\n.qseg { display: flex; gap: 10px; border: 1px solid var(--line); border-radius: 999px; padding: 8px 18px; color: var(--muted); }\n.qseg:empty { display: none; }\n.qseg button { background: none; border: 0; font: inherit; font-size: 16px; color: var(--muted); cursor: pointer; padding: 0; }\n.qseg button.on { color: var(--text); font-weight: 700; }\n.res-head { display: flex; justify-content: space-between; font-weight: 700; padding: 12px 12px; border-bottom: 1px solid var(--line); font-size: 17px; }\n.res-row { display: grid; grid-template-columns: 6px 30px 140px 1fr auto; gap: 14px; align-items: center; padding: 10px 12px; border-bottom: 1px solid var(--line); }\n.res-row .tb { height: 44px; border-radius: 3px; }\n.res-pos { font-family: \"Barlow Condensed\", Arial; font-weight: 800; font-size: 20px; color: var(--muted); }\n.res-name { font-size: 17px; } .res-time { font-size: 16px; font-family: Inter, sans-serif; }\n#rc-res-list { max-height: 720px; overflow: auto; }\n.rc-grid-card #rc-grid canvas { max-height: 900px; object-fit: contain; }\n\n/* ---------- tables ---------- */\n.table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 10px; }\n.tbl { width: 100%; border-collapse: collapse; font-size: 13.5px; }\n.tbl th { text-align: left; color: var(--muted); font-weight: 700; font-size: 11.5px; text-transform: uppercase; letter-spacing: .05em; padding: 9px 10px; border-bottom: 2px solid var(--line); white-space: nowrap; position: sticky; top: 0; background: var(--panel); }\n.tbl td { padding: 9px 10px; border-bottom: 1px solid var(--line); white-space: nowrap; }\n.tbl tbody tr:hover { background: var(--panel2); }\n.row-live { background: rgba(225,6,0,.10); }\n.tbl td.purple { color: #fff; background: rgba(168,85,247,.75); font-weight: 700; }\n.tbl td.green { color: #0b5d3b; background: rgba(22,199,132,.28); }\n[data-theme=\"dark\"] .tbl td.green { color: #b7ffd9; }\n.tbl td.yellow { color: #a07800; } [data-theme=\"dark\"] .tbl td.yellow { color: #ffe9a3; }\n.wide .tbl td, .wide .tbl th { padding: 6px 6px; font-size: 12px; }\n.mx-empty { color: var(--muted); }\n\n.poster { width: 100%; height: auto; border-radius: 14px; display: block; }\n.article p { margin: 6px 0; } .article ul, .article ol { margin: 6px 0; padding-left: 20px; } .article .lead { font-size: 16.5px; }\n.ss-feature { display: grid; grid-template-columns: minmax(0, 320px) 1fr; gap: 16px; color: var(--text) !important; align-items: center; }\n.ss-feature img { width: 100%; border-radius: 10px; }\n\n/* ---------- live ---------- */\n.timers { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }\n.timer { background: var(--panel2); border: 1px solid var(--line); border-radius: 16px; padding: 14px; display: grid; gap: 6px; border-top: 4px solid var(--blue); }\n.timer.live { border-top-color: var(--red); box-shadow: 0 0 0 2px var(--red) inset; }\n.timer.done { opacity: .6; border-top-color: var(--muted); }\n.t-name { font-weight: 800; font-size: 22px; text-transform: uppercase; font-style: italic; }\n.t-cd .cd { font-size: 24px; font-weight: 800; font-variant-numeric: tabular-nums; }\n.link-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }\n.live-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: var(--red); animation: pulse 1.2s infinite; }\n@keyframes pulse { 50% { opacity: .3; } }\n.tower .pos { font-weight: 800; width: 34px; }\n.tbar { display: inline-block; width: 4px; height: 16px; border-radius: 2px; vertical-align: middle; margin-right: 8px; }\n.tyre { display: inline-grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; border: 3px solid var(--tc); font-size: 11px; font-weight: 800; }\n\n/* ---------- analytics ---------- */\n.an-head .an-top { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; align-items: center; }\n.seg-tabs { display: flex; gap: 4px; flex-wrap: wrap; }\n.seg { background: transparent; color: var(--text); border: 0; padding: 8px 14px; border-radius: 8px; font: inherit; font-weight: 600; cursor: pointer; }\n.seg.on { background: var(--grad); color: #fff; }\n.seg:disabled { opacity: .35; cursor: not-allowed; }\n.an-title { margin: 14px 0 10px; font-size: 26px; font-weight: 800; text-transform: uppercase; }\n.pills { display: flex; gap: 8px; flex-wrap: wrap; }\n.pill { background: var(--panel2); color: var(--text); border: 1px solid var(--line); padding: 8px 16px; border-radius: 999px; font: inherit; font-weight: 600; cursor: pointer; }\n.pill.on { background: var(--grad); color: #fff; border-color: transparent; }\n.chart-box { position: relative; height: 380px; margin-bottom: 12px; }\n.chart-box.tall { height: 560px; }\n.toolbar select { padding: 7px 10px; font-size: 13px; }\n.dropdown { position: relative; }\n.menu { display: none; position: absolute; right: 0; top: 110%; background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 6px; z-index: 10; min-width: 220px; box-shadow: 0 10px 30px rgba(0,0,0,.3); }\n.menu.open { display: grid; }\n.menu button { background: none; border: 0; color: var(--text); text-align: left; padding: 9px 10px; border-radius: 8px; font: inherit; cursor: pointer; }\n.menu button:hover { background: var(--panel2); }\n.drv-pick { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }\n.drv { border: 1px solid var(--line); border-left: 4px solid var(--c); padding: 4px 8px; border-radius: 8px; font-weight: 700; color: var(--text); cursor: pointer; }\n.drv input { margin: 0 4px 0 0; }\n.mini-grid { display: grid; gap: 4px; margin: 6px 0 12px; overflow-x: auto; }\n.mini-row { display: grid; grid-template-columns: 56px 1fr 40px; gap: 8px; align-items: center; }\n.mini-name { font-weight: 800; padding-left: 6px; }\n.mini-cells { display: flex; gap: 6px; }\n.mini-sector { display: flex; gap: 2px; flex: 1; }\n.seg-p, .seg-g, .seg-y, .seg-n, .seg-pit, .seg-x { display: block; height: 16px; flex: 1; border-radius: 2px; min-width: 4px; }\n.seg-p { background: var(--purple); } .seg-g { background: var(--green); } .seg-y { background: var(--yellow); } .seg-n { background: var(--line); } .seg-pit, .seg-x { background: #2f6bff; }\n.mini-count { color: var(--purple); font-weight: 800; text-align: right; }\n\n/* ---------- calendar ---------- */\n.cal-list { display: grid; gap: 10px; }\n.cal-item { padding: 0; margin: 0; }\n.cal-item > summary { list-style: none; display: grid; grid-template-columns: 36px 36px 1fr auto; gap: 10px; align-items: center; padding: 14px 18px; cursor: pointer; }\n.cal-item > summary::-webkit-details-marker { display: none; }\n.cal-item .table-wrap, .cal-item > .row { padding: 0 18px 14px; }\n.cal-item.is-next { border-color: var(--red); box-shadow: 0 0 0 2px var(--red) inset; }\n.cal-item.is-done { opacity: .78; }\n.rnd { font-family: \"Barlow Condensed\", Arial; font-size: 22px; font-weight: 800; font-style: italic; color: var(--muted); text-align: center; }\n.cal-item .flag { font-size: 26px; }\n.cal-name { display: grid; } .cal-name b { font-family: \"Barlow Condensed\", Arial; font-size: 20px; text-transform: uppercase; font-weight: 700; }\n.cal-right { font-size: 13px; color: var(--muted); }\n\n/* ---------- news ---------- */\n.news-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }\n.news { display: grid; grid-template-columns: 116px 1fr; gap: 12px; background: var(--panel2); border: 1px solid var(--line); border-radius: 14px; padding: 10px; color: var(--text) !important; }\n.news:not(:has(img)) { grid-template-columns: 1fr; }\n.news img { width: 116px; height: 84px; object-fit: cover; border-radius: 10px; }\n.news h4 { font-size: 15px; margin-top: 4px; font-weight: 700; }\n.src { font-family: \"Barlow Condensed\", Arial; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; color: #fff; background: var(--c); padding: 2px 7px; border-radius: 3px; font-style: italic; }\n.news-grid > .note { grid-column: 1 / -1; }\n\n.toasts { position: fixed; bottom: 86px; left: 50%; transform: translateX(-50%); display: grid; gap: 8px; z-index: 50; width: min(92vw, 460px); }\n.toast { background: #10182c; border: 1px solid #2c3d63; color: #fff; padding: 12px 14px; border-radius: 12px; display: flex; gap: 10px; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,.45); }\n.toast > div { flex: 1; word-break: break-word; }\n.toast button { background: var(--grad); color: #fff; border: 0; border-radius: 8px; padding: 6px 10px; font-weight: 700; cursor: pointer; }\n\n@media (max-width: 1000px) { .rc-circuit-grid { grid-template-columns: 1fr 1fr; } .rc-map { grid-column: 1 / -1; } .rc-map svg { max-height: 260px; } }\n@media (max-width: 900px) {\n  .grid2, .grid2.even { grid-template-columns: 1fr; }\n  .masthead { padding: 8px 12px; gap: 10px; }\n  .ticker { display: none; }\n  .region { margin-left: auto; }\n  .wordmark { font-size: 20px; }\n  .nav { position: fixed; bottom: 0; left: 0; right: 0; justify-content: flex-start; overflow-x: auto; scrollbar-width: none; border-bottom: 0; border-top: 3px solid var(--red); padding: 4px 2px; padding-bottom: max(4px, env(safe-area-inset-bottom)); gap: 0; z-index: 30; }\n  .nav a { flex-direction: column; gap: 1px; font-size: 12.5px; padding: 6px 2px; flex: 1 0 64px; text-align: center; border-bottom: 0; margin: 0; border-radius: 8px; letter-spacing: .02em; }\n  .nav a svg { width: 20px; height: 20px; }\n  .nav a.active { background: var(--red); }\n  .main { padding: 12px 10px 100px; }\n  .card { padding: 16px; border-radius: 18px; }\n  h1 { font-size: 30px; } h2 { font-size: 21px; }\n  .rc-hero { padding: 26px 22px 24px; border-radius: 22px; }\n  .rc-hero h1 { font-size: 30px; } .rc-sub { font-size: 18px; }\n  .rc-hero-row { margin-top: 22px; }\n  .rc-time { font-size: 40px; } .rc-date { font-size: 18px; }\n  .rc-tiles { gap: 8px; width: 100%; } .tile { min-width: 0; flex: 1; } .tile b { font-size: 34px; padding: 6px 4px 2px; } .tile span { font-size: 13px; }\n  .rc-hero-track { inset: 0 -30% 10% 10%; }\n  .rc-length b { font-size: 64px; }\n  .prev-row { grid-template-columns: 110px 1fr auto; } .prev-row b { font-size: 16px; } .prev-row .mono { font-size: 15px; }\n  .res-row { grid-template-columns: 5px 22px 84px 1fr auto; gap: 8px; padding: 8px 4px; } .res-name { font-size: 14.5px; } .res-time { font-size: 13.5px; }\n  .rc-res-top select { font-size: 15px; padding: 9px 14px; } .qseg { padding: 6px 12px; }\n  .upd { grid-template-columns: 76px 1fr; padding: 14px; }\n  .hide-sm { display: none; }\n  .chart-box { height: 300px; }\n  .ss-feature { grid-template-columns: 1fr; }\n  .toasts { bottom: 84px; }\n}\n@media (max-width: 420px) { .region { max-width: 132px; overflow: hidden; text-overflow: ellipsis; } .rc-circuit-grid { grid-template-columns: 1fr; } .fact b { font-size: 18px; } }\n\n/* ---------- 3.0: season hub ---------- */\n.tabs-scroll { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; scrollbar-width: thin; }\n.tabs-scroll .pill { white-space: nowrap; color: var(--text); }\n.tabs-scroll .pill.on { color: #fff; }\n.stat-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 14px; margin-bottom: 18px; }\n.stat-cards.in { margin: 6px 0 0; }\n.stat-card { position: relative; display: grid; gap: 4px; background: var(--panel); border: 1px solid var(--line); border-radius: 18px; padding: 16px 18px; color: var(--text) !important; box-shadow: var(--shadow); border-top: 4px solid var(--red); }\n.stat-cards.in .stat-card { background: var(--panel2); box-shadow: none; }\n.stat-card span { color: var(--muted); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }\n.stat-card b { font-family: \"Barlow Condensed\", Arial; font-size: 38px; font-weight: 800; line-height: 1.05; }\n.stat-card small { color: var(--muted); }\n.stat-card .bar { display: block; height: 6px; background: var(--line); border-radius: 3px; overflow: hidden; margin-top: 4px; }\n.stat-card .bar i { display: block; height: 100%; background: var(--grad); }\n.evo { font-size: 12px; font-weight: 800; color: var(--muted); } .evo.up { color: #16a34a; } .evo.down { color: #e10600; }\n.tbl td.up { color: #16a34a; font-weight: 700; } .tbl td.down { color: #e10600; font-weight: 700; }\n.pos { font-weight: 800; width: 34px; }\n.dtag { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; }\n.dtag i { width: 4px; height: 18px; border-radius: 2px; display: inline-block; }\n.feed { display: grid; gap: 2px; }\n.feed-item { display: grid; grid-template-columns: 70px 1fr auto; gap: 12px; align-items: start; padding: 12px 4px; border-bottom: 1px solid var(--line); }\n.feed-item p { margin: 2px 0 0; }\n.ftag { font-family: \"Barlow Condensed\", Arial; font-weight: 800; font-size: 13px; text-transform: uppercase; text-align: center; padding: 3px 6px; border-radius: 4px; color: #fff; background: #6b7385; font-style: italic; }\n.ftag-race { background: var(--red); } .ftag-driver { background: var(--blue); } .ftag-team { background: #6c3fb5; }\n.drv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }\n.drv-card { position: relative; display: grid; gap: 2px; padding: 16px 16px 14px; border-radius: 16px; background: var(--panel2); border: 1px solid var(--line); border-left: 6px solid var(--c); color: var(--text) !important; overflow: hidden; }\n.drv-card b { font-family: \"Barlow Condensed\", Arial; font-size: 22px; font-weight: 600; text-transform: uppercase; line-height: 1; }\n.drv-card b.fam { font-weight: 800; font-size: 30px; font-style: italic; }\n.drv-card .car-side { max-width: 200px; margin: 6px 0; }\n.drv-num { position: absolute; right: 12px; top: 2px; font-family: \"Barlow Condensed\", Arial; font-size: 64px; font-weight: 800; font-style: italic; color: var(--c); opacity: .35; }\n.drv-num.big { position: static; opacity: 1; font-size: 56px; line-height: 1; }\n.drv-pos { font-family: \"Barlow Condensed\", Arial; font-weight: 800; color: var(--muted); font-size: 15px; }\n.drv-line { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; font-size: 12.5px; color: var(--muted); }\n.drv-line b { font-size: 18px !important; color: var(--text); font-style: normal !important; }\n.h2h-top { display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; margin-bottom: 16px; }\n.h2h-side { display: grid; gap: 6px; justify-items: start; border-left: 6px solid var(--c); padding-left: 14px; }\n.h2h-side.r { justify-items: end; border-left: 0; border-right: 6px solid var(--c); padding: 0 14px 0 0; text-align: right; }\n.h2h-side .drv-num { color: var(--c); }\n.h2h-vs { font-family: \"Barlow Condensed\", Arial; font-size: 44px; font-weight: 800; font-style: italic; color: var(--red); }\n.h2h-rows { display: grid; gap: 8px; }\n.h2h-row { display: grid; grid-template-columns: 80px 1fr 80px; gap: 12px; align-items: center; }\n.h2h-row > b { font-family: \"Barlow Condensed\", Arial; font-size: 24px; text-align: center; color: var(--muted); } .h2h-row > b.win { color: var(--text); }\n.h2h-bar { display: grid; gap: 4px; } .h2h-bar span { text-align: center; font-size: 12.5px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .04em; }\n.h2h-bar > i { display: flex; height: 10px; border-radius: 5px; overflow: hidden; background: var(--line); } .h2h-bar > i > i { display: block; height: 100%; }\n.tbl.heat td { text-align: center; } .tbl.heat td:first-child { text-align: left; }\n.more-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; margin-top: 12px; }\n.more-card { display: grid; gap: 6px; padding: 16px; border-radius: 14px; border: 1px solid var(--line); background: var(--panel2); color: var(--text) !important; }\n/* live extras */\n.track-status { display: flex; gap: 14px; align-items: center; padding: 12px 18px; border-radius: 14px; margin-bottom: 18px; color: #fff; font-family: \"Barlow Condensed\", Arial; }\n.track-status b { letter-spacing: .1em; } .track-status span { font-size: 26px; font-weight: 800; font-style: italic; } .track-status small { font-family: Inter, sans-serif; opacity: .85; }\n.ts-green { background: #128a3e; } .ts-yellow { background: #d4a106; color: #111; } .ts-red { background: #c40000; } .ts-cheq { background: repeating-linear-gradient(45deg, #111 0 14px, #333 14px 28px); } .ts-grey { background: #4b5563; }\n.rc-list { display: grid; gap: 2px; max-height: 460px; overflow: auto; }\n.rcm { display: grid; grid-template-columns: 96px auto 1fr; gap: 10px; align-items: center; padding: 8px 4px; border-bottom: 1px solid var(--line); font-size: 13.5px; }\n.radio-row { grid-template-columns: 90px 64px 1fr; } .radio-row audio { width: 100%; height: 34px; }\n.rcflag { font-size: 11px; font-weight: 800; text-transform: uppercase; padding: 2px 6px; border-radius: 4px; background: var(--panel2); color: var(--muted); }\n.f-yellow, .f-doubleyellow { background: #f5c518; color: #111; } .f-green, .f-clear { background: #16a34a; color: #fff; } .f-red { background: #c40000; color: #fff; } .f-blue { background: #1f6feb; color: #fff; } .f-chequered { background: #111; color: #fff; } .f-safetycar { background: #ff9f1c; color: #111; }\n/* graphics studio */\n.studio { display: grid; grid-template-columns: 360px 1fr; gap: 20px; align-items: start; }\n.studio-ctl { grid-template-columns: 1fr; }\n.studio-ctl fieldset { max-height: 260px; overflow: auto; }\n.studio-prev { position: sticky; top: 120px; display: grid; gap: 12px; }\n.studio-prev canvas { max-height: 74vh; object-fit: contain; background: #000; }\n@media (max-width: 900px) {\n  .studio { grid-template-columns: 1fr; } .studio-prev { position: static; order: -1; }\n  .h2h-top { grid-template-columns: 1fr; } .h2h-side.r { justify-items: start; text-align: left; border-right: 0; border-left: 6px solid var(--c); padding: 0 0 0 14px; } .h2h-vs { font-size: 28px; }\n  .h2h-row { grid-template-columns: 52px 1fr 52px; } .stat-card b { font-size: 30px; }\n  .feed-item { grid-template-columns: 60px 1fr; } .feed-item > .muted { display: none; }\n  .rcm { grid-template-columns: 70px auto 1fr; }\n}\n\n.card:has(> .snap-btn) > .card-h { padding-right: 46px; }\n.card:has(> .snap-btn) > .rc-h:first-child { padding-right: 46px; }\n\n/* 3.1: logos, live guide, updates */\n.logo-chip { height: 26px; width: auto; max-width: 96px; object-fit: contain; vertical-align: middle; }\n[data-theme=\"light\"] .logo-chip, [data-theme=\"light\"] .logo-th { background: #111; border-radius: 6px; padding: 3px 5px; }\n.logo-th { height: 22px; max-width: 110px; object-fit: contain; display: block; margin-bottom: 4px; }\n.logo-txt { font-size: 11px; font-weight: 800; padding: 3px 6px; border-radius: 4px; background: var(--panel2); border: 1px solid var(--line); }\n.live-chans { display: flex; flex-wrap: wrap; gap: 6px 10px; margin-top: 6px; }\n.lc { display: inline-flex; flex-direction: column; align-items: center; gap: 2px; } .lc small { font-size: 11px; color: var(--muted); font-variant-numeric: tabular-nums; }\n.guide-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #16c784; margin-right: 6px; box-shadow: 0 0 0 3px rgba(22,199,132,.2); }\n.upd-banner { display: flex; gap: 10px; align-items: center; justify-content: center; flex-wrap: wrap; padding: 10px 16px; background: var(--blue); color: #fff; font-weight: 600; }\n.upd-banner .btn:not(.btn-primary) { background: rgba(255,255,255,.15); color: #fff !important; border-color: transparent; }\n\n/* 3.1.1: 2026 car renders, championship battle */\n.car-img.car-side { width: 100%; max-width: 190px; height: auto; display: block; object-fit: contain; }\n.car-slot { display: block; max-width: 190px; }\n.res-row .car-img, .res-row .car-slot { max-width: 140px; }\n.rc-battle { display: grid; gap: 12px; }\n.battle-tile { display: grid; grid-template-columns: 200px 1fr; gap: 18px; align-items: center; padding: 16px 22px; border-radius: 16px; color: #fff;\n  background: linear-gradient(110deg, color-mix(in srgb, var(--c) 70%, #000) 0%, var(--c) 100%); }\n.battle-tile b { display: block; font-family: \"Barlow Condensed\", Arial; font-size: 40px; font-weight: 800; letter-spacing: .02em; line-height: 1; }\n.battle-tile span { font-family: \"Barlow Condensed\", Arial; font-size: 28px; font-weight: 600; opacity: .9; }\n.battle-tile.second { opacity: .78; }\n.battle-car .car-img, .battle-car .car-slot { max-width: 200px; filter: drop-shadow(0 6px 10px rgba(0,0,0,.35)); }\n@media (max-width: 600px) { .battle-tile { grid-template-columns: 120px 1fr; padding: 12px 14px; } .battle-tile b { font-size: 28px; } .battle-tile span { font-size: 20px; } }\n"; document.head.appendChild(s); if (l) l.remove(); })();
/* ---- data.js ---- */
/* F1 Data Hub \u2014 static reference data (editable in Settings at runtime) */
'use strict';
const APP_VERSION = '3.1.1';

// Lead = minutes before the official session start that the broadcaster's programme goes on air.
// Benchmarked on the SuperSport TV-guide .ics files and the Canal+ Afrique weekend graphic.
const BROADCASTERS = {
  supersport: { name: 'SuperSport Motorsport', short: 'SS Motorsport', color: '#1f6feb',
    watch: 'https://dstv.stream/#/livetv/play/48678ec9-6003-498b-9896-8cd65c227569',
    site: 'https://supersport.com/motorsport/f1', guide: 'https://supersport.com/tv-guide',
    lead: { FP: 5, SQ: 5, SPRINT: 5, Q: 5, R: 5 }, preRace: 90 },
  canal_af: { name: 'CANAL+ SPORT 4', short: 'CANAL+ Sport 4', color: '#111111',
    watch: 'https://www.canalplus-afrique.com', site: 'https://www.canalplus-afrique.com',
    lead: { FP: 15, SQ: 15, SPRINT: 15, Q: 20, R: 60 } },
  f1tv: { name: 'F1 TV Pro', short: 'F1 TV', color: '#e10600',
    watch: 'https://f1tv.formula1.com', site: 'https://f1tv.formula1.com',
    lead: { FP: 0, SQ: 0, SPRINT: 0, Q: 0, R: 60 } },
  sky_uk: { name: 'Sky Sports F1', color: '#0a2a6b', watch: 'https://www.skysports.com/watch/f1-on-sky', site: 'https://www.skysports.com/f1', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 90 } },
  channel4: { name: 'Channel 4 (highlights)', color: '#444', watch: 'https://www.channel4.com/programmes/formula-1', site: 'https://www.channel4.com/programmes/formula-1', lead: { FP: 0, SQ: 0, SPRINT: 0, Q: 0, R: 0 } },
  canal_fr: { name: 'Canal+', color: '#111', watch: 'https://www.canalplus.com/sport/', site: 'https://www.canalplus.com/sport/', lead: { FP: 15, SQ: 15, SPRINT: 15, Q: 20, R: 60 } },
  sky_de: { name: 'Sky Deutschland', color: '#0a2a6b', watch: 'https://www.sky.de/sport/formel-1', site: 'https://www.sky.de/sport/formel-1', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 90 } },
  rtl_de: { name: 'RTL', color: '#333', watch: 'https://plus.rtl.de', site: 'https://www.rtl.de', lead: { FP: 0, SQ: 0, SPRINT: 30, Q: 30, R: 60 } },
  servustv: { name: 'ServusTV', color: '#333', watch: 'https://www.servustv.com', site: 'https://www.servustv.com', lead: { FP: 0, SQ: 0, SPRINT: 30, Q: 30, R: 60 } },
  orf: { name: 'ORF', color: '#333', watch: 'https://on.orf.at', site: 'https://on.orf.at', lead: { FP: 0, SQ: 0, SPRINT: 30, Q: 30, R: 60 } },
  srf: { name: 'SRF', color: '#333', watch: 'https://www.srf.ch/play', site: 'https://www.srf.ch/sport', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  rsi: { name: 'RSI', color: '#333', watch: 'https://www.rsi.ch/play', site: 'https://www.rsi.ch/sport', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  rts: { name: 'RTS', color: '#333', watch: 'https://www.rts.ch/play', site: 'https://www.rts.ch/sport', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  sky_ch: { name: 'Sky Switzerland', color: '#0a2a6b', watch: 'https://sky.ch', site: 'https://sky.ch', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 90 } },
  sky_it: { name: 'Sky Italia', color: '#0a2a6b', watch: 'https://www.nowtv.it', site: 'https://sport.sky.it/formula-1', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 90 } },
  dazn: { name: 'DAZN', color: '#111', watch: 'https://www.dazn.com', site: 'https://www.dazn.com', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 60 } },
  viaplay: { name: 'Viaplay', color: '#2b0a3d', watch: 'https://viaplay.com', site: 'https://viaplay.com', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 60 } },
  tv3: { name: 'TV3', color: '#333', watch: 'https://viaplay.com', site: 'https://viaplay.com', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  vsport: { name: 'V sport 1', color: '#333', watch: 'https://viaplay.no', site: 'https://viaplay.no', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 60 } },
  rtbf: { name: 'RTBF', color: '#333', watch: 'https://auvio.rtbf.be', site: 'https://auvio.rtbf.be', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  playsports: { name: 'Play Sports', color: '#333', watch: 'https://www.playsports.be', site: 'https://www.playsports.be', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 60 } },
  eleven: { name: 'Eleven Sports', color: '#333', watch: 'https://elevensports.pl', site: 'https://elevensports.pl', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 60 } },
  nova: { name: 'Nova', color: '#333', watch: 'https://tv.nova.cz', site: 'https://tv.nova.cz', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  m4: { name: 'M4 Sport', color: '#333', watch: 'https://m4sport.hu', site: 'https://m4sport.hu', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  ant1: { name: 'ANT1', color: '#333', watch: 'https://www.antenna.gr', site: 'https://www.antenna.gr', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  bein: { name: 'beIN SPORTS', color: '#5b1f7a', watch: 'https://connect.bein.com', site: 'https://www.beinsports.com', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 60 } },
  apple_tv: { name: 'Apple TV', color: '#111', watch: 'https://tv.apple.com', site: 'https://tv.apple.com', lead: { FP: 0, SQ: 0, SPRINT: 30, Q: 30, R: 60 } },
  tsn: { name: 'TSN', color: '#333', watch: 'https://www.tsn.ca', site: 'https://www.tsn.ca', lead: { FP: 0, SQ: 0, SPRINT: 30, Q: 30, R: 60 } },
  rds: { name: 'RDS', color: '#333', watch: 'https://www.rds.ca', site: 'https://www.rds.ca', lead: { FP: 0, SQ: 0, SPRINT: 30, Q: 30, R: 60 } },
  noovo: { name: 'Noovo', color: '#333', watch: 'https://www.noovo.ca', site: 'https://www.noovo.ca', lead: { FP: 0, SQ: 0, SPRINT: 30, Q: 30, R: 60 } },
  tudn: { name: 'TUDN', color: '#333', watch: 'https://www.tudn.com', site: 'https://www.tudn.com', lead: { FP: 0, SQ: 0, SPRINT: 30, Q: 30, R: 60 } },
  sky_mx: { name: 'Sky Sports M\u00e9xico', color: '#0a2a6b', watch: 'https://www.sky.com.mx', site: 'https://www.sky.com.mx', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 60 } },
  izzi: { name: 'Izzi', color: '#333', watch: 'https://www.izzi.mx', site: 'https://www.izzi.mx', lead: { FP: 0, SQ: 0, SPRINT: 0, Q: 0, R: 0 } },
  globo: { name: 'TV Globo', color: '#333', watch: 'https://globoplay.globo.com', site: 'https://ge.globo.com/motor/formula-1/', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  sportv: { name: 'sportv', color: '#333', watch: 'https://globoplay.globo.com', site: 'https://ge.globo.com/motor/formula-1/', lead: { FP: 15, SQ: 15, SPRINT: 15, Q: 15, R: 30 } },
  espn: { name: 'ESPN', color: '#b00', watch: 'https://www.disneyplus.com', site: 'https://www.espn.com/f1/', lead: { FP: 0, SQ: 0, SPRINT: 30, Q: 30, R: 60 } },
  fox_au: { name: 'Fox Sports', color: '#333', watch: 'https://kayosports.com.au', site: 'https://www.foxsports.com.au/motorsport/formula-one', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 60 } },
  kayo: { name: 'Kayo', color: '#333', watch: 'https://kayosports.com.au', site: 'https://kayosports.com.au', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 60 } },
  foxtel: { name: 'Foxtel', color: '#333', watch: 'https://www.foxtel.com.au', site: 'https://www.foxtel.com.au', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 60 } },
  sky_nz: { name: 'Sky NZ', color: '#333', watch: 'https://www.skygo.co.nz', site: 'https://www.sky.co.nz', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 60 } },
  fuji: { name: 'Fuji TV', color: '#333', watch: 'https://www.fujitv.co.jp', site: 'https://www.fujitv.co.jp', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  shanghai_tv: { name: 'Shanghai TV', color: '#333', watch: 'https://www.kankanews.com', site: 'https://www.kankanews.com', lead: { FP: 0, SQ: 0, SPRINT: 0, Q: 0, R: 15 } },
  tencent: { name: 'Tencent Sports', color: '#333', watch: 'https://sports.qq.com', site: 'https://sports.qq.com', lead: { FP: 0, SQ: 0, SPRINT: 0, Q: 0, R: 15 } },
  fancode: { name: 'FanCode', color: '#333', watch: 'https://www.fancode.com', site: 'https://www.fancode.com', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  now_hk: { name: 'Now Sports', color: '#333', watch: 'https://www.nowtv.now.com', site: 'https://www.nowtv.now.com', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  coupang: { name: 'Coupang Play', color: '#333', watch: 'https://www.coupangplay.com', site: 'https://www.coupangplay.com', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  videoland: { name: 'Videoland', color: '#333', watch: 'https://www.videoland.com.tw', site: 'https://www.videoland.com.tw', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  tv360: { name: 'TV360', color: '#333', watch: 'https://tv360.vn', site: 'https://tv360.vn', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  setanta: { name: 'Setanta Sports', color: '#333', watch: 'https://www.setantasports.com', site: 'https://www.setantasports.com', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  arena: { name: 'Arena Sport', color: '#333', watch: 'https://www.arenasport.com', site: 'https://www.arenasport.com', lead: { FP: 0, SQ: 0, SPRINT: 15, Q: 15, R: 30 } },
  sport24: { name: 'Sport 24', short: 'Sport 24', color: '#c8102e', global: true,
    watch: 'https://sport24live.com/watch/', site: 'https://sport24live.com/', guide: 'https://sport24live.com/schedule/',
    lead: { FP: 0, SQ: 0, SPRINT: 0, Q: 0, R: 15 } },
  sport24x: { name: 'Sport 24 Extra', short: 'Sport 24 Extra', color: '#8c0b20', global: true,
    watch: 'https://sport24live.com/watch/', site: 'https://sport24live.com/', guide: 'https://sport24live.com/schedule/',
    lead: { FP: 0, SQ: 0, SPRINT: 0, Q: 0, R: 0 } },
  ss_grandstand: { name: 'SuperSport Grandstand', short: 'SS Grandstand', color: '#1f6feb', watch: 'https://dstv.stream/#/', site: 'https://supersport.com/motorsport/f1', lead: { FP: 5, SQ: 5, SPRINT: 5, Q: 5, R: 90 } },
  ss_maximo: { name: 'SuperSport M\u00e1ximo', short: 'SS M\u00e1ximo', color: '#1f6feb',
    watch: 'https://dstv.stream', site: 'https://supersport.com/motorsport/f1', lead: { FP: 5, SQ: 5, SPRINT: 5, Q: 5, R: 5 } },
  bein_mena: { name: 'beIN SPORTS (MENA)', short: 'beIN SPORTS', color: '#5b1f7a', watch: 'https://connect.bein.com', site: 'https://www.beinsports.com/en-mena/motorsports/motorsports-formula-1', lead: { FP: 15, SQ: 15, SPRINT: 30, Q: 30, R: 60 } },
  canal_sport: { name: 'Canal+ Sport', short: 'Canal+ Sport', color: '#111111', watch: 'https://www.canalplus-afrique.com', site: 'https://www.canalplus-afrique.com', lead: { FP: 15, SQ: 15, SPRINT: 15, Q: 20, R: 60 } },
};

// Channel numbers are defaults \u2014 edit them in Settings \u25b8 Broadcasters if your package differs.
// F1 is on DStv (SuperSport Motorsport, ch 235). GOtv does not carry F1 unless SuperSport announces it for a race.
const SS = ['supersport', 'DStv 235'];
// Per the ASBH rights list, CANAL+ Afrique shows F1 on CANAL+ SPORT 4 (also SPORT 1 / 2).
const CANAL = ['canal_af', 'CANAL+ 14'];
const F1TV = ['f1tv', 'Streaming'];
// [code, name, default time zone, [[broadcasterKey, channel], ...], extra time zones for auto-detect]
const REGIONS_RAW = [
  ['UG', 'Uganda', 'Africa/Kampala', [SS, CANAL, F1TV]],
  ['KE', 'Kenya', 'Africa/Nairobi', [SS, F1TV]],
  ['TZ', 'Tanzania', 'Africa/Dar_es_Salaam', [SS, F1TV]],
  ['RW', 'Rwanda', 'Africa/Kigali', [SS, CANAL, F1TV]],
  ['BI', 'Burundi', 'Africa/Bujumbura', [SS, CANAL, F1TV]],
  ['ET', 'Ethiopia', 'Africa/Addis_Ababa', [SS, CANAL, F1TV]],
  ['SS', 'South Sudan', 'Africa/Juba', [SS, F1TV]],
  ['CD', 'DR Congo', 'Africa/Kinshasa', [SS, CANAL, F1TV], ['Africa/Lubumbashi']],
  ['ZA', 'South Africa', 'Africa/Johannesburg', [SS, F1TV]],
  ['NG', 'Nigeria', 'Africa/Lagos', [SS, F1TV]],
  ['GH', 'Ghana', 'Africa/Accra', [SS, F1TV]],
  ['ZM', 'Zambia', 'Africa/Lusaka', [SS, F1TV]],
  ['ZW', 'Zimbabwe', 'Africa/Harare', [SS, F1TV]],
  ['MW', 'Malawi', 'Africa/Blantyre', [SS, F1TV]],
  ['MZ', 'Mozambique', 'Africa/Maputo', [SS, F1TV]],
  ['BW', 'Botswana', 'Africa/Gaborone', [SS, F1TV]],
  ['NA', 'Namibia', 'Africa/Windhoek', [SS, F1TV]],
  ['AO', 'Angola', 'Africa/Luanda', [SS, F1TV]],
  ['MU', 'Mauritius', 'Indian/Mauritius', [SS, F1TV]],
  ['CM', 'Cameroon', 'Africa/Douala', [SS, CANAL, F1TV]],
  ['CI', "C\u00f4te d'Ivoire", 'Africa/Abidjan', [SS, CANAL, F1TV]],
  ['SN', 'Senegal', 'Africa/Dakar', [SS, CANAL, F1TV]],
  ['GA', 'Gabon', 'Africa/Libreville', [SS, CANAL, F1TV]],
  ['MG', 'Madagascar', 'Indian/Antananarivo', [SS, CANAL, F1TV]],
  ['EG', 'Egypt', 'Africa/Cairo', [['bein', 'beIN SPORTS'], F1TV]],
  ['MA', 'Morocco', 'Africa/Casablanca', [['bein', 'beIN SPORTS'], F1TV]],
  ['AE', 'United Arab Emirates', 'Asia/Dubai', [['bein', 'beIN SPORTS'], F1TV]],
  ['SA', 'Saudi Arabia', 'Asia/Riyadh', [['bein', 'beIN SPORTS'], F1TV]],
  ['QA', 'Qatar', 'Asia/Qatar', [['bein', 'beIN SPORTS'], F1TV]],
  ['GB', 'United Kingdom', 'Europe/London', [['sky_uk', 'Sky Sports F1'], ['channel4', 'Channel 4'], F1TV]],
  ['IE', 'Ireland', 'Europe/Dublin', [['sky_uk', 'Sky Sports F1'], ['channel4', 'Channel 4'], F1TV]],
  ['FR', 'France', 'Europe/Paris', [['canal_fr', 'Canal+'], F1TV]],
  ['DE', 'Germany', 'Europe/Berlin', [['sky_de', 'Sky Sport F1'], ['rtl_de', 'RTL'], F1TV]],
  ['AT', 'Austria', 'Europe/Vienna', [['servustv', 'ServusTV'], ['orf', 'ORF'], ['sky_de', 'Sky'], F1TV]],
  ['CH', 'Switzerland', 'Europe/Zurich', [['srf', 'SRF'], ['rsi', 'RSI'], ['rts', 'RTS'], ['sky_ch', 'Sky'], F1TV]],
  ['IT', 'Italy', 'Europe/Rome', [['sky_it', 'Sky Sport F1'], F1TV]],
  ['ES', 'Spain', 'Europe/Madrid', [['dazn', 'DAZN F1'], F1TV]],
  ['PT', 'Portugal', 'Europe/Lisbon', [['dazn', 'DAZN'], F1TV]],
  ['NL', 'Netherlands', 'Europe/Amsterdam', [['viaplay', 'Viaplay'], F1TV]],
  ['BE', 'Belgium', 'Europe/Brussels', [['rtbf', 'RTBF'], ['playsports', 'Play Sports'], F1TV]],
  ['DK', 'Denmark', 'Europe/Copenhagen', [['tv3', 'TV3'], ['viaplay', 'Viaplay'], F1TV]],
  ['SE', 'Sweden', 'Europe/Stockholm', [['viaplay', 'Viaplay'], F1TV]],
  ['NO', 'Norway', 'Europe/Oslo', [['vsport', 'V sport 1'], ['viaplay', 'Viaplay'], F1TV]],
  ['FI', 'Finland', 'Europe/Helsinki', [['viaplay', 'Viaplay'], F1TV]],
  ['PL', 'Poland', 'Europe/Warsaw', [['eleven', 'Eleven Sports'], F1TV]],
  ['CZ', 'Czech Republic', 'Europe/Prague', [['nova', 'Nova'], F1TV]],
  ['HU', 'Hungary', 'Europe/Budapest', [['m4', 'M4 Sport'], F1TV]],
  ['GR', 'Greece', 'Europe/Athens', [['ant1', 'ANT1'], F1TV]],
  ['TR', 'Turkey', 'Europe/Istanbul', [['bein', 'beIN SPORTS'], F1TV]],
  ['UA', 'Ukraine', 'Europe/Kyiv', [['setanta', 'Setanta Ukraine'], F1TV], ['Europe/Kiev']],
  ['RS', 'Serbia', 'Europe/Belgrade', [['arena', 'Arena Sport'], F1TV]],
  ['US', 'United States (Eastern)', 'America/New_York', [['apple_tv', 'Apple TV'], F1TV], ['America/Detroit']],
  ['US-C', 'United States (Central)', 'America/Chicago', [['apple_tv', 'Apple TV'], F1TV]],
  ['US-P', 'United States (Pacific)', 'America/Los_Angeles', [['apple_tv', 'Apple TV'], F1TV]],
  ['CA', 'Canada', 'America/Toronto', [['tsn', 'TSN'], ['rds', 'RDS'], ['noovo', 'Noovo'], F1TV], ['America/Montreal', 'America/Vancouver']],
  ['MX', 'Mexico', 'America/Mexico_City', [['tudn', 'TUDN'], ['sky_mx', 'Sky Sports'], ['izzi', 'Izzi'], F1TV]],
  ['BR', 'Brazil', 'America/Sao_Paulo', [['globo', 'TV Globo'], ['sportv', 'sportv'], F1TV]],
  ['AR', 'Argentina', 'America/Argentina/Buenos_Aires', [['espn', 'ESPN'], F1TV], ['America/Buenos_Aires']],
  ['CO', 'Colombia', 'America/Bogota', [['espn', 'ESPN'], F1TV]],
  ['CL', 'Chile', 'America/Santiago', [['espn', 'ESPN'], F1TV]],
  ['AU', 'Australia', 'Australia/Sydney', [['fox_au', 'Fox Sports 506'], ['kayo', 'Kayo'], ['foxtel', 'Foxtel'], F1TV], ['Australia/Melbourne', 'Australia/Brisbane', 'Australia/Perth', 'Australia/Adelaide']],
  ['NZ', 'New Zealand', 'Pacific/Auckland', [['sky_nz', 'Sky Sport'], F1TV]],
  ['JP', 'Japan', 'Asia/Tokyo', [['fuji', 'Fuji TV NEXT'], F1TV]],
  ['CN', 'China', 'Asia/Shanghai', [['shanghai_tv', 'Shanghai TV'], ['tencent', 'Tencent'], F1TV]],
  ['IN', 'India', 'Asia/Kolkata', [['fancode', 'FanCode'], F1TV], ['Asia/Calcutta']],
  ['SG', 'Singapore', 'Asia/Singapore', [['bein', 'beIN SPORTS'], F1TV]],
  ['MY', 'Malaysia', 'Asia/Kuala_Lumpur', [['bein', 'beIN SPORTS'], F1TV]],
  ['TH', 'Thailand', 'Asia/Bangkok', [['bein', 'beIN SPORTS'], F1TV]],
  ['PH', 'Philippines', 'Asia/Manila', [['bein', 'beIN SPORTS'], F1TV]],
  ['ID', 'Indonesia', 'Asia/Jakarta', [['bein', 'beIN SPORTS'], F1TV]],
  ['HK', 'Hong Kong', 'Asia/Hong_Kong', [['bein', 'beIN SPORTS'], ['now_hk', 'Now Sports 1 & 2'], F1TV]],
  ['KR', 'South Korea', 'Asia/Seoul', [['coupang', 'Coupang Play'], F1TV]],
  ['TW', 'Chinese Taipei', 'Asia/Taipei', [['videoland', 'Videoland'], F1TV]],
  ['VN', 'Vietnam', 'Asia/Ho_Chi_Minh', [['tv360', 'TV360'], F1TV], ['Asia/Saigon']],
  ['XX', 'In-flight / at sea', 'UTC', [['sport24', 'Sport 24 (airlines & cruise ships)'], ['sport24x', 'Sport 24 Extra'], F1TV]],
];

const REGIONS = {};
const TZ_TO_REGION = {};
// Sport 24 is a worldwide in-flight & cruise channel, so it is added to every location.
const GLOBAL_BROADCASTERS = [['sport24', 'In-flight & cruise'], ['sport24x', 'In-flight & cruise']];
for (const [code, name, tz, list, extra] of REGIONS_RAW) {
  const all = list.concat(GLOBAL_BROADCASTERS.filter(([k]) => !list.some(([x]) => x === k)));
  // SuperSport also shows F1 on SuperSport M\u00e1ximo 1 (per its live TV guide)
  const si = all.findIndex(([k]) => k === 'supersport'); if (si >= 0) all.splice(si + 1, 0, ['ss_maximo', 'DStv 241']);
  REGIONS[code] = { code, name, tz, broadcasters: all.map(([key, channel]) => ({ key, channel })) };
  if (!TZ_TO_REGION[tz]) TZ_TO_REGION[tz] = code;
  (extra || []).forEach(z => { if (!TZ_TO_REGION[z]) TZ_TO_REGION[z] = code; });
}

// Circuit reference \u2014 used for the "Circuit spotlight" section and the offline calendar.
const CIRCUITS = {
  albert_park: { name: 'Albert Park', city: 'Melbourne', cc: 'AU', tz: 'Australia/Melbourne', km: 5.278, laps: 58, first: 1996, turns: 14 },
  shanghai: { name: 'Shanghai International Circuit', city: 'Shanghai', cc: 'CN', tz: 'Asia/Shanghai', km: 5.451, laps: 56, first: 2004, turns: 16 },
  suzuka: { name: 'Suzuka Circuit', city: 'Suzuka', cc: 'JP', tz: 'Asia/Tokyo', km: 5.807, laps: 53, first: 1987, turns: 18 },
  bahrain: { name: 'Bahrain International Circuit', city: 'Sakhir', cc: 'BH', tz: 'Asia/Bahrain', km: 5.412, laps: 57, first: 2004, turns: 15 },
  jeddah: { name: 'Jeddah Corniche Circuit', city: 'Jeddah', cc: 'SA', tz: 'Asia/Riyadh', km: 6.174, laps: 50, first: 2021, turns: 27 },
  miami: { name: 'Miami International Autodrome', city: 'Miami', cc: 'US', tz: 'America/New_York', km: 5.412, laps: 57, first: 2022, turns: 19 },
  villeneuve: { name: 'Circuit Gilles Villeneuve', city: 'Montr\u00e9al', cc: 'CA', tz: 'America/Toronto', km: 4.361, laps: 70, first: 1978, turns: 14 },
  monaco: { name: 'Circuit de Monaco', city: 'Monte Carlo', cc: 'MC', tz: 'Europe/Monaco', km: 3.337, laps: 78, first: 1950, turns: 19 },
  catalunya: { name: 'Circuit de Barcelona-Catalunya', city: 'Barcelona', cc: 'ES', tz: 'Europe/Madrid', km: 4.657, laps: 66, first: 1991, turns: 14 },
  red_bull_ring: { name: 'Red Bull Ring', city: 'Spielberg', cc: 'AT', tz: 'Europe/Vienna', km: 4.318, laps: 71, first: 1970, turns: 10 },
  silverstone: { name: 'Silverstone Circuit', city: 'Silverstone', cc: 'GB', tz: 'Europe/London', km: 5.891, laps: 52, first: 1950, turns: 18 },
  spa: { name: 'Circuit de Spa-Francorchamps', city: 'Spa', cc: 'BE', tz: 'Europe/Brussels', km: 7.004, laps: 44, first: 1950, turns: 19 },
  hungaroring: { name: 'Hungaroring', city: 'Budapest', cc: 'HU', tz: 'Europe/Budapest', km: 4.381, laps: 70, first: 1986, turns: 14 },
  zandvoort: { name: 'Circuit Zandvoort', city: 'Zandvoort', cc: 'NL', tz: 'Europe/Amsterdam', km: 4.259, laps: 72, first: 1952, turns: 14 },
  monza: { name: 'Autodromo Nazionale Monza', city: 'Monza', cc: 'IT', tz: 'Europe/Rome', km: 5.793, laps: 53, first: 1950, turns: 11 },
  madring: { name: 'Madring', city: 'Madrid', cc: 'ES', tz: 'Europe/Madrid', km: 5.47, laps: 57, first: 2026, turns: 22 },
  baku: { name: 'Baku City Circuit', city: 'Baku', cc: 'AZ', tz: 'Asia/Baku', km: 6.003, laps: 51, first: 2016, turns: 20 },
  sepang: { name: 'Sepang International Circuit', city: 'Sepang', cc: 'MY', tz: 'Asia/Kuala_Lumpur', km: 5.543, laps: 56, first: 1999, turns: 15 },
  marina_bay: { name: 'Marina Bay Street Circuit', city: 'Singapore', cc: 'SG', tz: 'Asia/Singapore', km: 4.940, laps: 62, first: 2008, turns: 19 },
  americas: { name: 'Circuit of the Americas', city: 'Austin', cc: 'US', tz: 'America/Chicago', km: 5.513, laps: 56, first: 2012, turns: 20 },
  rodriguez: { name: 'Aut\u00f3dromo Hermanos Rodr\u00edguez', city: 'Mexico City', cc: 'MX', tz: 'America/Mexico_City', km: 4.304, laps: 71, first: 1963, note: 'Highest venue on the calendar \u2014 over 2,200 m above sea level; 1.2 km run from the start to Turn 1.', turns: 17 },
  interlagos: { name: 'Aut\u00f3dromo Jos\u00e9 Carlos Pace (Interlagos)', city: 'S\u00e3o Paulo', cc: 'BR', tz: 'America/Sao_Paulo', km: 4.309, laps: 71, first: 1973, note: 'Anti-clockwise, undulating lap; weather often plays a part.', turns: 15 },
  vegas: { name: 'Las Vegas Strip Circuit', city: 'Las Vegas', cc: 'US', tz: 'America/Los_Angeles', km: 6.201, laps: 50, first: 2023, turns: 17 },
  losail: { name: 'Lusail International Circuit', city: 'Lusail', cc: 'QA', tz: 'Asia/Qatar', km: 5.419, laps: 57, first: 2021, turns: 16 },
  yas_marina: { name: 'Yas Marina Circuit', city: 'Abu Dhabi', cc: 'AE', tz: 'Asia/Dubai', km: 5.281, laps: 58, first: 2009, turns: 16 },
};

// Offline fallback for 2026 (local circuit times). Live data from the Jolpica API replaces this when online.
// Calendar as revised in 2026: Bahrain & Saudi Arabia cancelled; the Bahrain GP was run at Sepang (2\u20134 Oct).
// Sprint weekends: SQ in the FP2 slot, Sprint in the FP3 slot.
const FALLBACK_2026 = [
  // round, name, circuitId, raceDate(YYYY-MM-DD), sprint?, [FP1, FP2|SQ, FP3|Sprint, Q, R] local times, dayOffsets(optional)
  [1, 'Australian Grand Prix', 'albert_park', '2026-03-08', 0, ['12:30', '16:00', '12:30', '16:00', '15:00']],
  [2, 'Chinese Grand Prix', 'shanghai', '2026-03-15', 1, ['11:30', '15:30', '11:00', '15:00', '15:00']],
  [3, 'Japanese Grand Prix', 'suzuka', '2026-03-29', 0, ['11:30', '15:00', '11:30', '15:00', '14:00']],
  [4, 'Miami Grand Prix', 'miami', '2026-05-03', 1, ['12:30', '16:30', '12:00', '16:00', '16:00']],
  [5, 'Canadian Grand Prix', 'villeneuve', '2026-05-24', 1, ['12:30', '16:30', '12:00', '16:00', '16:00']],
  [6, 'Monaco Grand Prix', 'monaco', '2026-06-07', 0, ['13:30', '17:00', '12:30', '16:00', '15:00']],
  [7, 'Barcelona-Catalunya Grand Prix', 'catalunya', '2026-06-14', 0, ['13:30', '17:00', '12:30', '16:00', '15:00']],
  [8, 'Austrian Grand Prix', 'red_bull_ring', '2026-06-28', 0, ['13:30', '17:00', '12:30', '16:00', '15:00']],
  [9, 'British Grand Prix', 'silverstone', '2026-07-05', 1, ['12:30', '16:30', '12:00', '16:00', '15:00']],
  [10, 'Belgian Grand Prix', 'spa', '2026-07-19', 0, ['13:30', '17:00', '12:30', '16:00', '15:00']],
  [11, 'Hungarian Grand Prix', 'hungaroring', '2026-07-26', 0, ['13:30', '17:00', '12:30', '16:00', '15:00']],
  [12, 'Dutch Grand Prix', 'zandvoort', '2026-08-23', 1, ['12:30', '16:30', '12:00', '16:00', '15:00']],
  [13, 'Italian Grand Prix', 'monza', '2026-09-06', 0, ['12:30', '16:00', '12:30', '16:00', '15:00']],
  [14, 'Spanish Grand Prix', 'madring', '2026-09-13', 0, ['13:30', '17:00', '12:30', '16:00', '15:00']],
  [15, 'Azerbaijan Grand Prix', 'baku', '2026-09-26', 0, ['12:30', '16:00', '12:30', '16:00', '15:00'], [-2, -2, -1, -1, 0]],
  [16, 'Bahrain Grand Prix (at Sepang)', 'sepang', '2026-10-04', 0, ['12:30', '16:00', '12:30', '16:00', '15:00']],
  [17, 'Singapore Grand Prix', 'marina_bay', '2026-10-11', 1, ['17:30', '21:30', '17:00', '21:00', '20:00']],
  [18, 'United States Grand Prix', 'americas', '2026-10-25', 0, ['12:30', '16:00', '12:00', '16:00', '15:00']],
  [19, 'Mexico City Grand Prix', 'rodriguez', '2026-11-01', 0, ['12:30', '16:00', '11:30', '15:00', '14:00']],
  [20, 'S\u00e3o Paulo Grand Prix', 'interlagos', '2026-11-08', 0, ['12:30', '16:00', '11:30', '15:00', '14:00']],
  [21, 'Las Vegas Grand Prix', 'vegas', '2026-11-21', 0, ['16:30', '20:00', '16:30', '20:00', '19:00'], [-2, -2, -1, -1, 0]],
  [22, 'Qatar Grand Prix', 'losail', '2026-11-29', 0, ['16:30', '20:00', '17:30', '21:00', '20:00']],
  [23, 'Abu Dhabi Grand Prix', 'yas_marina', '2026-12-06', 0, ['13:30', '17:00', '14:30', '18:00', '17:00']],
];

const SESSION_META = {
  FP1: { name: 'Practice 1', short: 'FP1', type: 'FP', mins: 60, openf1: ['Practice 1'] },
  FP2: { name: 'Practice 2', short: 'FP2', type: 'FP', mins: 60, openf1: ['Practice 2'] },
  FP3: { name: 'Practice 3', short: 'FP3', type: 'FP', mins: 60, openf1: ['Practice 3'] },
  SQ: { name: 'Sprint Qualifying', short: 'SQ', type: 'SQ', mins: 45, openf1: ['Sprint Qualifying', 'Sprint Shootout'] },
  SPRINT: { name: 'Sprint', short: 'Sprint', type: 'SPRINT', mins: 60, openf1: ['Sprint'] },
  Q: { name: 'Qualifying', short: 'Quali', type: 'Q', mins: 60, openf1: ['Qualifying'] },
  R: { name: 'Race', short: 'Race', type: 'R', mins: 120, openf1: ['Race'] },
};

// SuperSport support programming, benchmarked from the supplied TV-guide .ics files (minutes relative to a session).
const SUPPORT_SHOWS = [
  { title: 'F1 - Paddock Uncut: {gp}', anchor: 'FP1', fixedPrevDayUtc: '20:00', dur: 30 },
  { title: 'F1 Build Up', anchor: 'FP1', offset: -30, dur: 25 },
  { title: 'The F1 Show: {gp}', anchor: 'FP2', offset: 75, dur: 60, nonSprint: true },
  { title: 'F1 - The Notebook: {gp} Quali', anchor: 'Q', offset: 120, dur: 30 },
  { title: 'F1 - GP Sunday: {gp}', anchor: 'R', offset: -90, dur: 85 },
  { title: 'F1 - Chequered Flag', anchor: 'R', offset: 120, dur: 60 },
  { title: 'F1 - The Notebook: {gp}', anchor: 'R', offset: 180, dur: 30 },
];

const NEWS_SOURCES = [
  { id: 'supersport', name: 'SuperSport', color: '#1f6feb', type: 'html',
    pages: ['https://supersport.com/motorsport/f1', 'https://supersport.com/motorsport/tour/c8f12c9c-73f2-417a-bc93-3979a66d27b4'],
    match: /\/motorsport\/news\/[0-9a-f-]{20,}\//i, base: 'https://supersport.com' },
  { id: 'sky', name: 'Sky Sports F1', color: '#0a2a6b', type: 'rss', rss: 'https://www.skysports.com/rss/12433',
    pages: ['https://www.skysports.com/f1'], match: /\/f1\/news\/\d+\/\d+\//i, base: 'https://www.skysports.com' },
  { id: 'therace', name: 'The Race', color: '#ff2d55', type: 'rss', rss: 'https://www.the-race.com/category/formula-1/feed/',
    pages: ['https://www.the-race.com/category/formula-1/'], match: /the-race\.com\/formula-1\/[a-z0-9-]+\/?$/i, base: 'https://www.the-race.com' },
  { id: 'autosport', name: 'Autosport', color: '#d4001a', type: 'rss', rss: 'https://www.autosport.com/rss/f1/news/',
    pages: ['https://www.autosport.com/f1/'], match: /\/f1\/news\/[a-z0-9-]+\/\d+\/?$/i, base: 'https://www.autosport.com' },
  { id: 'bein', name: 'beIN SPORTS MENA', color: '#5b1f7a', type: 'html',
    pages: ['https://www.beinsports.com/en-mena/motorsports/motorsports-formula-1', 'https://www.beinsports.com/en-mena/motorsports'],
    match: /beinsports\.com\/en-mena\/(motorsports|formula-1)\/[^#?]*(articles?|news|[0-9]{4})[^#?]*$/i, base: 'https://www.beinsports.com' },
];

const LIVE_LINKS = [
  { name: 'F1 Live Timing', url: 'https://www.formula1.com/en/timing/f1-live' },
  { name: 'Formula Timer', url: 'https://formula-timer.com/' },
  { name: 'F1 Telemetry', url: 'https://www.f1telemetry.com/en' },
  { name: 'Formula 1 Dashboard', url: 'https://app.formula1dashboard.com/live-timing/' },
  { name: 'Sport 24 schedule', url: 'https://sport24live.com/schedule/' },
  { name: 'F1 broadcast info', url: 'https://www.formula1.com/en/information/f1-broadcast-information.45y3LNsT1D6VoK0ZmX8ciJ' },
];

const ANALYTICS_VIEWS = [
  ['classification', 'Classification'], ['potential_drivers', 'Potential: Drivers'], ['potential_teams', 'Potential: Teams'],
  ['fastest_laps', 'Fastest Laps'], ['best_sectors', 'Best Sectors'], ['best_laps_sectors', 'Best Laps & Sectors'],
  ['lap_evolution', 'Lap Time Evolution'], ['minisectors', 'MiniSectors'], ['top_speed', 'Top Speed'],
  ['speed_vs_lap', 'Speed vs Lap Time'], ['driver_times', 'Driver Times'], ['lap_matrix', 'Lap Time Matrix'],
  ['weather', 'Weather Trend'], ['tyres', 'Tyre Strategy'], ['race_pace', 'Race Pace'],
];

// Team colours keyed by Jolpica constructorId (OpenF1 colours override these when available).
const TEAM_COLORS = { mercedes: '#27F4D2', ferrari: '#E8002D', red_bull: '#3671C6', mclaren: '#FF8000', aston_martin: '#229971',
  alpine: '#FF87BC', williams: '#64C4FF', rb: '#6692FF', racing_bulls: '#6692FF', sauber: '#52E252', audi: '#F50537', haas: '#B6BABD', cadillac: '#A8A9AD' };
function teamColorById(id, name) {
  if (TEAM_COLORS[id]) return TEAM_COLORS[id];
  const n = String(name || id || '').toLowerCase();
  for (const [k, v] of Object.entries(TEAM_COLORS)) if (n.includes(k.replace('_', ' '))) return v;
  if (n.includes('racing bulls') || n.includes('visa')) return TEAM_COLORS.rb;
  return '#8a93a6';
}

// Broadcast-style time-zone abbreviations (as used on SuperSport / African broadcaster graphics).
const TZ_ABBR = {
  'Africa/Nairobi': 'EAT', 'Africa/Kampala': 'EAT', 'Africa/Dar_es_Salaam': 'EAT', 'Africa/Addis_Ababa': 'EAT', 'Africa/Juba': 'CAT', 'Africa/Mogadishu': 'EAT', 'Indian/Antananarivo': 'EAT',
  'Africa/Lusaka': 'CAT', 'Africa/Harare': 'CAT', 'Africa/Maputo': 'CAT', 'Africa/Blantyre': 'CAT', 'Africa/Gaborone': 'CAT', 'Africa/Kigali': 'CAT', 'Africa/Bujumbura': 'CAT', 'Africa/Lubumbashi': 'CAT', 'Africa/Windhoek': 'CAT',
  'Africa/Johannesburg': 'SAST', 'Africa/Lagos': 'WAT', 'Africa/Kinshasa': 'WAT', 'Africa/Douala': 'WAT', 'Africa/Luanda': 'WAT', 'Africa/Libreville': 'WAT',
  'Africa/Accra': 'GMT', 'Africa/Dakar': 'GMT', 'Africa/Abidjan': 'GMT', 'Indian/Mauritius': 'MUT', 'Africa/Cairo': 'EET', 'Africa/Casablanca': 'WET',
  'Europe/London': 'UK', 'UTC': 'UTC', 'Asia/Dubai': 'GST', 'Asia/Riyadh': 'AST', 'Asia/Qatar': 'AST', 'Asia/Kolkata': 'IST',
};

/* ---- brand.js ---- */
/* F1 logo supplied by the user for export graphics. */
'use strict';
const F1_LOGO = 'data:image/png;base64,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';
// Logos added after the 3.1.0 installers, shipped with the app code so over-the-air updates have them too.
if (typeof LOGO_DATA !== 'undefined') Object.assign(LOGO_DATA, {"cplus-sport-1": "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDUxMCAyMDQiIHdpZHRoPSI1MTAiIGhlaWdodD0iMjA0Ij4KCTx0aXRsZT5DQU5BTCsgU1BPUlQgMSAtIDIwMjQ8L3RpdGxlPgoJPHN0eWxlPgoJCS5zMCB7IGZpbGw6ICMwMjA0MDcgfSAKCQkuczEgeyBmaWxsOiAjZmZmZmZmIH0gCgkJLnMyIHsgZmlsbDogIzAwZmY4MyB9IAoJCS5zMyB7IGZpbGw6ICMwZjRjMTEgfSAKCQkuczQgeyBmaWxsOiAjMDBmZjkxIH0gCgk8L3N0eWxlPgoJPHBhdGggaWQ9IlBhdGggMTE2OSIgY2xhc3M9InMwIiBkPSJtMCAwaDUxMHYxMjcuNWgtNTEweiIvPgoJPHBhdGggaWQ9IlBhdGggMTE3MSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGFzcz0iczEiIGQ9Im00ODguMiA2OS40YzAgMC0wLjEgMC4xLTAuNCAwLjFoLTI3LjVjLTAuNSAwLTAuNiAwLjMtMC42IDAuMyAwIDAtMC40IDAuMS0wLjQgMC42djI5LjRjMCAwLjQtMC4xIDAuNS0wLjEgMC41IDAgMC0wLjIgMC4yLTAuNSAwLjJoLTIxLjljLTAuMyAwLTAuNS0wLjItMC41LTAuMiAwIDAtMC4xLTAuMS0wLjEtMC42di0yOS40YzAtMC4zLTAuMy0wLjUtMC4zLTAuNSAwIDAtMC4xLTAuMy0wLjQtMC4zaC0yOC4yYy0wLjUgMC0wLjYgMC0wLjYgMCAwIDAtMC4zLTAuMy0wLjMtMC45di0yMS41YzAtMC4yIDAuMy0wLjYgMC4zLTAuNiAwIDAgMC4xIDAgMC4zIDBoMjguOGMwLjIgMCAwLjItMC4xIDAuMi0wLjEgMCAwIDAuMi0wLjEgMC4yLTAuNHYtMjUuN2MwLTAuMiAwLjEtMC41IDAuMS0wLjUgMCAwIDAuMi0wLjEgMC45LTAuMWgyMS40YzAuNCAwIDAuNiAwLjEgMC42IDAuMSAwIDAgMC4xIDAuMyAwLjEgMC43djI1LjhoMjhjMC43IDAgMC45IDAuMSAwLjkgMC4xIDAgMCAwLjQgMC4xIDAuNCAwLjd2MjEuN2MwIDAuMi0wLjQgMC42LTAuNCAwLjZ6bS04NS4yIDMwLjRjLTAuMSAwLjYtMC4yIDAuOC0wLjIgMC44IDAgMC0wLjEgMC4yLTAuNyAwLjJoLTQ0LjJjLTEuMyAwLTEuNi0wLjMtMS42LTAuMyAwIDAtMC4yLTAuNS0wLjEtMS40bDExLTc2LjNjMC0xIDAuMy0xLjMgMC4zLTEuM2gyMS4yYzAuNiAwIDAuOCAwLjEgMC44IDAuMSAwIDAgMC4xIDAuMyAwIDAuOGwtOC4zIDU5LjZjLTAuMSAwLjcgMC4yIDAuNyAwLjIgMC43IDAgMCAwLjIgMC4yIDEgMC4yaDIyYzAuNCAwIDAuNiAwLjIgMC42IDAuMiAwIDAgMC4yIDAuMSAwLjIgMC42em0tNTYuNSAxLjJoLTE5LjdjLTAuMyAwLjItMC43LTAuMy0wLjctMC4zIDAgMC0wLjEtMC4xLTAuMi0wLjdsLTIuNi0xMi4xYy0wLjItMC43LTAuNC0xLTAuNC0xIDAgMC0wLjYtMC4zLTEuMi0wLjNoLTI1LjVjLTAuNiAwLTAuOSAwLjMtMC45IDAuMyAwIDAtMC41IDAuNC0wLjcgMS4xbC01LjggMTIuM2MtMC4xIDAuMy0wLjMgMC40LTAuMyAwLjQgMCAwLTAuNCAwLjItMC43IDAuMmgtMjIuMWMtMC41IDAuMS0wLjctMC4zLTAuNy0wLjMgMCAwLTAuMS0wLjEgMC4yLTAuNmwzOS03Ny45YzAuMi0wLjEgMC40LTAuNCAwLjQtMC40IDAgMCAwLjMtMC4xIDAuOS0wLjFoMjQuMWMwLjYgMCAwLjkgMC4zIDAuOSAwLjMgMCAwIDAuMSAwLjEgMC4yIDAuNGwxNi4yIDc4LjJjMCAwLjIgMCAwLjQgMCAwLjQgMCAwIDAgMC4xLTAuNCAwLjF6bS05Mi4xLTAuMWgtMjAuM2MwIDAtMC4xLTAuMi0wLjItMC4zbC0yNy4zLTQ4LjRjLTAuMi0wLjItMC4zLTAuMi0wLjMtMC4yIDAgMC0wLjIgMC0wLjIgMC4zbC02LjggNDcuNmMtMC4xIDAuNi0wLjIgMC42LTAuMiAwLjYgMCAwLTAuMyAwLjEtMC41IDAuMWgtMTkuNmMtMC40IDAtMC41LTAuMS0wLjUtMC4xIDAgMC0wLjUtMC41LTAuNC0wLjlsMTAuOC03Ny4xYzAuMS0wLjQgMC4zLTAuNSAwLjMtMC41IDAgMCAwLjMtMC4zIDAuNy0wLjNoMjEuOGMwLjMgMCAwLjUgMC4yIDAuNSAwLjIgMCAwIDAuMiAwLjEgMC4zIDAuNGwyNC42IDQzLjJjMC41IDAuOSAwLjcgMC44IDAuNyAwLjggMCAwIDAuNCAwIDAuNi0xbDYuMy00M2MwLTAuMyAwLjItMC40IDAuMi0wLjQgMCAwIDAuMS0wLjIgMC40LTAuMmwyMC42IDAuMmMwLjMgMCAwLjUgMC4xIDAuNSAwLjEgMCAwIDAgMC4xIDAgMC4zbC0xMSA3Ny43Yy0wLjEgMC41LTAuMyAwLjctMC4zIDAuNyAwIDAtMC4xIDAuMi0wLjcgMC4yem0tODYtMC4zbC0xOS4xIDAuMWMtMC41IDAtMC43LTAuMi0wLjctMC4yIDAgMC0wLjIgMC0wLjMtMC44bC0zLTEyLjRjMC0wLjMtMC4yLTAuNC0wLjItMC40aC0yNy4yYy0wLjYgMC0wLjkgMC40LTAuOSAwLjQgMCAwLTAuNSAwLjMtMC44IDEuMWwtNS40IDExLjVxLTAuMyAwLjYtMC4zIDAuNmMwIDAtMC4zIDAuMS0wLjYgMC4xaC0yMi4zYy0wLjYgMC4xLTAuNy0wLjEtMC43LTAuMSAwIDAtMC4xLTAuNCAwLjEtMC44bDM4LjYtNzcuNmMwLjItMC40IDAuNS0wLjUgMC41LTAuNWgyNS40YzAuNCAwIDAuNyAwLjMgMC43IDAuMyAwIDAgMC4yIDAuMSAwLjIgMC40bDE2LjYgNzcuOGMwIDAuNC0wLjIgMC40LTAuMiAwLjQgMCAwLTAuMSAwLjEtMC40IDAuMXptMTQ1LjgtNTYuNWMwIDAtMC4xIDAtMC4yIDAuM2wtMTAuOCAyNC40Yy0wLjIgMC43LTAuMSAwLjgtMC4xIDAuOCAwIDAgMC4zIDAuMiAwLjYgMC4ybDE1LjktMC4xaDAuMmMwIDAgMC4xLTAuMSAwLTAuNGwtNS40LTI1Yy0wLjEtMC4yLTAuMi0wLjItMC4yLTAuMnptLTE3OC40IDAuMmMwIDAtMC4yIDAtMC4zIDAuM2wtMTAuNiAyNC4zYy0wLjMgMC40LTAuMiAwLjYtMC4yIDAuNiAwIDAgMC4yIDAuMSAwLjcgMC4xbDE1LjcgMC4xYzAuMiAwIDAuMy0wLjEgMC4zLTAuMSAwIDAgMC4xLTAuMSAwLTAuNGwtNS42LTI0LjZjMC0wLjMgMC0wLjMgMC0wLjN6bS01NSA1My43Yy0wLjIgMC44LTAuNiAxLjUtMC42IDEuNSAwIDAtMC40IDAuNC0xLjIgMC42LTEwLjMgNC4yLTIxLjggMi44LTIxLjggMi44LTE4LjYtMi0zMC40LTEzLjQtMzQuMi0yOC4yLTUuNi0yMS45IDUuNS0zNy43IDguMi00MSA2LjYtNy44IDE2LjgtMTMuNCAyNi44LTE0LjcgMTIuNy0xLjggMjIuMiAxLjIgMjYuMSAyLjUgMCAwIDQuMyAxLjQgNy42IDMuNSAxLjYgMS4xIDEuNyAxLjUgMS43IDEuNSAwIDAgMC4xIDAuMi0wLjMgMmwtMyAxNS43Yy0wLjEgMC43LTAuNSAxLTAuNSAxIDAgMC0wLjMgMC4xLTEuNy0wLjktOS43LTYuOC0yMS01LjktMjEtNS45LTguNiAwLjUtMTguNiA1LTIxLjYgMTYuNC0yLjcgMTAuMSAwLjEgMTguNSA2LjEgMjMuNiA0LjEgMy41IDEwLjUgNS40IDE3LjEgNSA3LjEtMC40IDEyLjgtMy4yIDEyLjctMy4yIDAuMSAwIDAuMy0wLjEgMC42LTAuMiAxLjUtMC43IDEuOS0wLjYgMS45LTAuNiAwIDAgMC4zIDAuMyAwLjEgMS4zem0wLjUtMTcuN3EtMC4xIDAtMC4xIDAgMCAwIDAuMSAweiIvPgoJPHBhdGggaWQ9IlBhdGggMTE3MiBjb3B5IiBjbGFzcz0iczIiIGQ9Im00NTguNCAxMjcuNXY3Ni44aC03Ny40di03Ni44eiIvPgoJPHBhdGggaWQ9IlBhdGggMTE3MiIgY2xhc3M9InMzIiBkPSJtMzgyLjQgMTI3LjV2NzYuOGgtMjUwdi03Ni44eiIvPgoJPHBhdGggaWQ9IlBhdGggMTE3MyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGFzcz0iczQiIGQ9Im0xNzYuNCAxNTIuOHEtMy45LTMuMy04LjItMy4zLTIgMC0zLjUgMS0xLjggMS4yLTEuOCAzLjJjMCAxLjMgMC45IDIuNCAyLjYgMy4zIDAuNSAwLjIgMi41IDEgNiAyIDMuOSAxLjMgNi45IDIuOCA4LjcgNC44IDIuMSAyLjIgMy4xIDUuMSAzLjEgOC42IDAgMy41LTAuNiA2LjQtMS44IDguN3EtMi4xIDQuMi03LjIgNi42Yy0yLjkgMS4yLTYuMSAxLjgtOS43IDEuOC0zLjUgMC03LjEtMC43LTEwLjgtMi4ycS0yLjktMS4yLTQuNC0yLjItMC42LTAuNS0xLjUtMWw1LjMtMTAuMWMzLjggMy4zIDcuNCA0LjkgMTEgNC45IDEuOCAwIDMuMS0wLjMgNC4yLTEuMSAxLjItMC44IDEuOC0yIDEuOC0zLjZxMC0yLTItMy41Yy0wLjYtMC40LTEuNS0wLjgtMi45LTEuMi0wLjQtMC4yLTEuMi0wLjQtMi41LTAuOGwtMi42LTAuOGMtMS42LTAuNC0zLjEtMS4xLTQuNy0xLjktMy44LTItNS43LTUuNS01LjctMTAuNyAwLTQuOSAxLjYtOC43IDQuNi0xMS43IDMtMyA3LTQuNSAxMS44LTQuNSA1LjIgMCAxMC4yIDEuMyAxNS4yIDR6bTM0LjctMTIuNXE3LjYgMCAxMS45IDRjMy4yIDIuOSA0LjcgNi45IDQuNyAxMS45IDAgMTAuNy01LjQgMTYuMS0xNi4yIDE2LjFoLTcuOHYxNmgtMTIuNXYtNDh6bS0zLjIgMjJjNC41IDAgNi44LTIgNi44LTYgMC00LTIuMi02LTYuOC02aC00LjF2MTJ6bTY5LjcgMjAuNWMtNS4xIDQuOC0xMS40IDcuMi0xOC44IDcuMi03LjUgMC0xMy44LTIuNS0xOC45LTcuM3EtNy42LTcuMy03LjYtMTcuOWMwLTUuNCAxLjQtMTAuMyA0LjEtMTQuNSAyLjktNC4zIDYuOC03LjUgMTEuNy05LjUgMy4yLTEuMyA2LjctMS45IDEwLjQtMS45IDcuOCAwIDE0LjIgMi40IDE5LjIgNy4yIDUuMSA0LjggNy42IDEwLjkgNy42IDE4LjMgMCA3LjUtMi41IDEzLjYtNy43IDE4LjR6bS05LjMtMjhjLTIuNi0yLjUtNS44LTMuOS05LjUtMy45cS01LjUgMC05LjYgNGMtMi41IDIuNi0zLjkgNS43LTMuOSA5LjQgMCAzLjggMS4yIDcgMy45IDkuNnE0IDQgOS42IDQgNS43IDAgOS41LTRjMi42LTIuNiA0LTUuOCA0LTkuNXEwLTUuNi00LTkuNnptNDguMSAzMy41bC0xMS41LTE5LjEtMi4zIDE5LjFoLTEyLjFsNS45LTQ4aDE1LjVjMTEuNCAwIDE3IDQuOCAxNyAxNC42IDAgNS0xLjMgOC41LTQuMiAxMS4zLTEuNSAxLjUtMi44IDIuMS01LjkgMy40bDExLjcgMTguN3ptLTguNS0yNi44YzUuMiAwIDguNy0yLjQgOC43LTYuMSAwLTMuMS0yLjUtNC45LTctNC45aC0yLjNsLTEuNSAxMXptNDguNS0xMC43djM3LjVoLTEyLjV2LTM3LjVoLTEwLjF2LTEwLjVoMzN2MTAuNXoiLz4KCTxwYXRoIGlkPSIxIiBjbGFzcz0iczMiIGQ9Im00MTcgMTg4di0zNy4zaC02Ljh2LTEwLjZoMTkuMnY0Ny45eiIvPgo8L3N2Zz4=", "cplus-sport-2": "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDUxMCAyMDQiIHdpZHRoPSI1MTAiIGhlaWdodD0iMjA0Ij4KCTx0aXRsZT5DQU5BTCsgU1BPUlQgMSAtIDIwMjQ8L3RpdGxlPgoJPHN0eWxlPgoJCS5zMCB7IGZpbGw6ICMwMjA0MDcgfSAKCQkuczEgeyBmaWxsOiAjZmZmZmZmIH0gCgkJLnMyIHsgZmlsbDogIzAwZmY4MyB9IAoJCS5zMyB7IGZpbGw6ICMwZjRjMTEgfSAKCQkuczQgeyBmaWxsOiAjMDBmZjkxIH0gCgk8L3N0eWxlPgoJPHBhdGggaWQ9IlBhdGggMTE2OSIgY2xhc3M9InMwIiBkPSJtMCAwaDUxMHYxMjcuNWgtNTEweiIvPgoJPHBhdGggaWQ9IlBhdGggMTE3MSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGFzcz0iczEiIGQ9Im00ODguMiA2OS40YzAgMC0wLjEgMC4xLTAuNCAwLjFoLTI3LjVjLTAuNSAwLTAuNiAwLjMtMC42IDAuMyAwIDAtMC40IDAuMS0wLjQgMC42djI5LjRjMCAwLjQtMC4xIDAuNS0wLjEgMC41IDAgMC0wLjIgMC4yLTAuNSAwLjJoLTIxLjljLTAuMyAwLTAuNS0wLjItMC41LTAuMiAwIDAtMC4xLTAuMS0wLjEtMC42di0yOS40YzAtMC4zLTAuMy0wLjUtMC4zLTAuNSAwIDAtMC4xLTAuMy0wLjQtMC4zaC0yOC4yYy0wLjUgMC0wLjYgMC0wLjYgMCAwIDAtMC4zLTAuMy0wLjMtMC45di0yMS41YzAtMC4yIDAuMy0wLjYgMC4zLTAuNiAwIDAgMC4xIDAgMC4zIDBoMjguOGMwLjIgMCAwLjItMC4xIDAuMi0wLjEgMCAwIDAuMi0wLjEgMC4yLTAuNHYtMjUuN2MwLTAuMiAwLjEtMC41IDAuMS0wLjUgMCAwIDAuMi0wLjEgMC45LTAuMWgyMS40YzAuNCAwIDAuNiAwLjEgMC42IDAuMSAwIDAgMC4xIDAuMyAwLjEgMC43djI1LjhoMjhjMC43IDAgMC45IDAuMSAwLjkgMC4xIDAgMCAwLjQgMC4xIDAuNCAwLjd2MjEuN2MwIDAuMi0wLjQgMC42LTAuNCAwLjZ6bS04NS4yIDMwLjRjLTAuMSAwLjYtMC4yIDAuOC0wLjIgMC44IDAgMC0wLjEgMC4yLTAuNyAwLjJoLTQ0LjJjLTEuMyAwLTEuNi0wLjMtMS42LTAuMyAwIDAtMC4yLTAuNS0wLjEtMS40bDExLTc2LjNjMC0xIDAuMy0xLjMgMC4zLTEuM2gyMS4yYzAuNiAwIDAuOCAwLjEgMC44IDAuMSAwIDAgMC4xIDAuMyAwIDAuOGwtOC4zIDU5LjZjLTAuMSAwLjcgMC4yIDAuNyAwLjIgMC43IDAgMCAwLjIgMC4yIDEgMC4yaDIyYzAuNCAwIDAuNiAwLjIgMC42IDAuMiAwIDAgMC4yIDAuMSAwLjIgMC42em0tNTYuNSAxLjJoLTE5LjdjLTAuMyAwLjItMC43LTAuMy0wLjctMC4zIDAgMC0wLjEtMC4xLTAuMi0wLjdsLTIuNi0xMi4xYy0wLjItMC43LTAuNC0xLTAuNC0xIDAgMC0wLjYtMC4zLTEuMi0wLjNoLTI1LjVjLTAuNiAwLTAuOSAwLjMtMC45IDAuMyAwIDAtMC41IDAuNC0wLjcgMS4xbC01LjggMTIuM2MtMC4xIDAuMy0wLjMgMC40LTAuMyAwLjQgMCAwLTAuNCAwLjItMC43IDAuMmgtMjIuMWMtMC41IDAuMS0wLjctMC4zLTAuNy0wLjMgMCAwLTAuMS0wLjEgMC4yLTAuNmwzOS03Ny45YzAuMi0wLjEgMC40LTAuNCAwLjQtMC40IDAgMCAwLjMtMC4xIDAuOS0wLjFoMjQuMWMwLjYgMCAwLjkgMC4zIDAuOSAwLjMgMCAwIDAuMSAwLjEgMC4yIDAuNGwxNi4yIDc4LjJjMCAwLjIgMCAwLjQgMCAwLjQgMCAwIDAgMC4xLTAuNCAwLjF6bS05Mi4xLTAuMWgtMjAuM2MwIDAtMC4xLTAuMi0wLjItMC4zbC0yNy4zLTQ4LjRjLTAuMi0wLjItMC4zLTAuMi0wLjMtMC4yIDAgMC0wLjIgMC0wLjIgMC4zbC02LjggNDcuNmMtMC4xIDAuNi0wLjIgMC42LTAuMiAwLjYgMCAwLTAuMyAwLjEtMC41IDAuMWgtMTkuNmMtMC40IDAtMC41LTAuMS0wLjUtMC4xIDAgMC0wLjUtMC41LTAuNC0wLjlsMTAuOC03Ny4xYzAuMS0wLjQgMC4zLTAuNSAwLjMtMC41IDAgMCAwLjMtMC4zIDAuNy0wLjNoMjEuOGMwLjMgMCAwLjUgMC4yIDAuNSAwLjIgMCAwIDAuMiAwLjEgMC4zIDAuNGwyNC42IDQzLjJjMC41IDAuOSAwLjcgMC44IDAuNyAwLjggMCAwIDAuNCAwIDAuNi0xbDYuMy00M2MwLTAuMyAwLjItMC40IDAuMi0wLjQgMCAwIDAuMS0wLjIgMC40LTAuMmwyMC42IDAuMmMwLjMgMCAwLjUgMC4xIDAuNSAwLjEgMCAwIDAgMC4xIDAgMC4zbC0xMSA3Ny43Yy0wLjEgMC41LTAuMyAwLjctMC4zIDAuNyAwIDAtMC4xIDAuMi0wLjcgMC4yem0tODYtMC4zbC0xOS4xIDAuMWMtMC41IDAtMC43LTAuMi0wLjctMC4yIDAgMC0wLjIgMC0wLjMtMC44bC0zLTEyLjRjMC0wLjMtMC4yLTAuNC0wLjItMC40aC0yNy4yYy0wLjYgMC0wLjkgMC40LTAuOSAwLjQgMCAwLTAuNSAwLjMtMC44IDEuMWwtNS40IDExLjVxLTAuMyAwLjYtMC4zIDAuNmMwIDAtMC4zIDAuMS0wLjYgMC4xaC0yMi4zYy0wLjYgMC4xLTAuNy0wLjEtMC43LTAuMSAwIDAtMC4xLTAuNCAwLjEtMC44bDM4LjYtNzcuNmMwLjItMC40IDAuNS0wLjUgMC41LTAuNWgyNS40YzAuNCAwIDAuNyAwLjMgMC43IDAuMyAwIDAgMC4yIDAuMSAwLjIgMC40bDE2LjYgNzcuOGMwIDAuNC0wLjIgMC40LTAuMiAwLjQgMCAwLTAuMSAwLjEtMC40IDAuMXptMTQ1LjgtNTYuNWMwIDAtMC4xIDAtMC4yIDAuM2wtMTAuOCAyNC40Yy0wLjIgMC43LTAuMSAwLjgtMC4xIDAuOCAwIDAgMC4zIDAuMiAwLjYgMC4ybDE1LjktMC4xaDAuMmMwIDAgMC4xLTAuMSAwLTAuNGwtNS40LTI1Yy0wLjEtMC4yLTAuMi0wLjItMC4yLTAuMnptLTE3OC40IDAuMmMwIDAtMC4yIDAtMC4zIDAuM2wtMTAuNiAyNC4zYy0wLjMgMC40LTAuMiAwLjYtMC4yIDAuNiAwIDAgMC4yIDAuMSAwLjcgMC4xbDE1LjcgMC4xYzAuMiAwIDAuMy0wLjEgMC4zLTAuMSAwIDAgMC4xLTAuMSAwLTAuNGwtNS42LTI0LjZjMC0wLjMgMC0wLjMgMC0wLjN6bS01NSA1My43Yy0wLjIgMC44LTAuNiAxLjUtMC42IDEuNSAwIDAtMC40IDAuNC0xLjIgMC42LTEwLjMgNC4yLTIxLjggMi44LTIxLjggMi44LTE4LjYtMi0zMC40LTEzLjQtMzQuMi0yOC4yLTUuNi0yMS45IDUuNS0zNy43IDguMi00MSA2LjYtNy44IDE2LjgtMTMuNCAyNi44LTE0LjcgMTIuNy0xLjggMjIuMiAxLjIgMjYuMSAyLjUgMCAwIDQuMyAxLjQgNy42IDMuNSAxLjYgMS4xIDEuNyAxLjUgMS43IDEuNSAwIDAgMC4xIDAuMi0wLjMgMmwtMyAxNS43Yy0wLjEgMC43LTAuNSAxLTAuNSAxIDAgMC0wLjMgMC4xLTEuNy0wLjktOS43LTYuOC0yMS01LjktMjEtNS45LTguNiAwLjUtMTguNiA1LTIxLjYgMTYuNC0yLjcgMTAuMSAwLjEgMTguNSA2LjEgMjMuNiA0LjEgMy41IDEwLjUgNS40IDE3LjEgNSA3LjEtMC40IDEyLjgtMy4yIDEyLjctMy4yIDAuMSAwIDAuMy0wLjEgMC42LTAuMiAxLjUtMC43IDEuOS0wLjYgMS45LTAuNiAwIDAgMC4zIDAuMyAwLjEgMS4zem0wLjUtMTcuN3EtMC4xIDAtMC4xIDAgMCAwIDAuMSAweiIvPgoJPHBhdGggaWQ9IlBhdGggMTE3MiBjb3B5IiBjbGFzcz0iczIiIGQ9Im00NTguNCAxMjcuNXY3Ni44aC03Ny40di03Ni44eiIvPgoJPHBhdGggaWQ9IlBhdGggMTE3MiIgY2xhc3M9InMzIiBkPSJtMzgyLjQgMTI3LjV2NzYuOGgtMjUwdi03Ni44eiIvPgoJPHBhdGggaWQ9IlBhdGggMTE3MyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGFzcz0iczQiIGQ9Im0xNzYuNCAxNTIuOHEtMy45LTMuMy04LjItMy4zLTIgMC0zLjUgMS0xLjggMS4yLTEuOCAzLjJjMCAxLjMgMC45IDIuNCAyLjYgMy4zIDAuNSAwLjIgMi41IDEgNiAyIDMuOSAxLjMgNi45IDIuOCA4LjcgNC44IDIuMSAyLjIgMy4xIDUuMSAzLjEgOC42IDAgMy41LTAuNiA2LjQtMS44IDguN3EtMi4xIDQuMi03LjIgNi42Yy0yLjkgMS4yLTYuMSAxLjgtOS43IDEuOC0zLjUgMC03LjEtMC43LTEwLjgtMi4ycS0yLjktMS4yLTQuNC0yLjItMC42LTAuNS0xLjUtMWw1LjMtMTAuMWMzLjggMy4zIDcuNCA0LjkgMTEgNC45IDEuOCAwIDMuMS0wLjMgNC4yLTEuMSAxLjItMC44IDEuOC0yIDEuOC0zLjZxMC0yLTItMy41Yy0wLjYtMC40LTEuNS0wLjgtMi45LTEuMi0wLjQtMC4yLTEuMi0wLjQtMi41LTAuOGwtMi42LTAuOGMtMS42LTAuNC0zLjEtMS4xLTQuNy0xLjktMy44LTItNS43LTUuNS01LjctMTAuNyAwLTQuOSAxLjYtOC43IDQuNi0xMS43IDMtMyA3LTQuNSAxMS44LTQuNSA1LjIgMCAxMC4yIDEuMyAxNS4yIDR6bTM0LjctMTIuNXE3LjYgMCAxMS45IDRjMy4yIDIuOSA0LjcgNi45IDQuNyAxMS45IDAgMTAuNy01LjQgMTYuMS0xNi4yIDE2LjFoLTcuOHYxNmgtMTIuNXYtNDh6bS0zLjIgMjJjNC41IDAgNi44LTIgNi44LTYgMC00LTIuMi02LTYuOC02aC00LjF2MTJ6bTY5LjcgMjAuNWMtNS4xIDQuOC0xMS40IDcuMi0xOC44IDcuMi03LjUgMC0xMy44LTIuNS0xOC45LTcuM3EtNy42LTcuMy03LjYtMTcuOWMwLTUuNCAxLjQtMTAuMyA0LjEtMTQuNSAyLjktNC4zIDYuOC03LjUgMTEuNy05LjUgMy4yLTEuMyA2LjctMS45IDEwLjQtMS45IDcuOCAwIDE0LjIgMi40IDE5LjIgNy4yIDUuMSA0LjggNy42IDEwLjkgNy42IDE4LjMgMCA3LjUtMi41IDEzLjYtNy43IDE4LjR6bS05LjMtMjhjLTIuNi0yLjUtNS44LTMuOS05LjUtMy45cS01LjUgMC05LjYgNGMtMi41IDIuNi0zLjkgNS43LTMuOSA5LjQgMCAzLjggMS4yIDcgMy45IDkuNnE0IDQgOS42IDQgNS43IDAgOS41LTRjMi42LTIuNiA0LTUuOCA0LTkuNXEwLTUuNi00LTkuNnptNDguMSAzMy41bC0xMS41LTE5LjEtMi4zIDE5LjFoLTEyLjFsNS45LTQ4aDE1LjVjMTEuNCAwIDE3IDQuOCAxNyAxNC42IDAgNS0xLjMgOC41LTQuMiAxMS4zLTEuNSAxLjUtMi44IDIuMS01LjkgMy40bDExLjcgMTguN3ptLTguNS0yNi44YzUuMiAwIDguNy0yLjQgOC43LTYuMSAwLTMuMS0yLjUtNC45LTctNC45aC0yLjNsLTEuNSAxMXptNDguNS0xMC43djM3LjVoLTEyLjV2LTM3LjVoLTEwLjF2LTEwLjVoMzN2MTAuNXoiLz4KCTxwYXRoIGlkPSIyIiBjbGFzcz0iczMiIGQ9Im00MDIuMiAxODhsMTIuMS0xMi43YzMuMy0zLjQgNi4yLTYuOSA4LjgtMTAuNCAwLjQtMC42IDAuOC0xLjIgMS4yLTEuOCAyLTIuOSAyLjktNS42IDIuOS04LjIgMC0zLjQtMi4zLTYuMi01LjYtNi4yLTIuNiAwLTQuMyAxLjMtNS4xIDMuOS0wLjMgMS0wLjQgMi4zLTAuNCA0aC0xM2wwLjMtMi42YzAuMS0xLjggMC41LTMuNSAxLjItNS4yIDMtNyA5LjMtMTAuNyAxNy0xMC43IDUuNCAwIDkuOCAxLjYgMTMuMyA0LjkgMy41IDMuMiA1LjIgNy4zIDUuMiAxMi4zIDAgMi44LTAuNyA1LjYtMiA4LjEtMSAxLjgtMi43IDQtNS4xIDYuNmwtNi44IDcuNWgxNC40djEwLjV6Ii8+Cjwvc3ZnPg==", "cplus-sport-4": "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDUxMCAyMDQiIHdpZHRoPSI1MTAiIGhlaWdodD0iMjA0Ij4KCTx0aXRsZT5DQU5BTCsgU1BPUlQgMSAtIDIwMjQ8L3RpdGxlPgoJPHN0eWxlPgoJCS5zMCB7IGZpbGw6ICMwMjA0MDcgfSAKCQkuczEgeyBmaWxsOiAjZmZmZmZmIH0gCgkJLnMyIHsgZmlsbDogIzAwZmY4MyB9IAoJCS5zMyB7IGZpbGw6ICMwZjRjMTEgfSAKCQkuczQgeyBmaWxsOiAjMDBmZjkxIH0gCgk8L3N0eWxlPgoJPHBhdGggaWQ9IlBhdGggMTE2OSIgY2xhc3M9InMwIiBkPSJtMCAwaDUxMHYxMjcuNWgtNTEweiIvPgoJPHBhdGggaWQ9IlBhdGggMTE3MSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGFzcz0iczEiIGQ9Im00ODguMiA2OS40YzAgMC0wLjEgMC4xLTAuNCAwLjFoLTI3LjVjLTAuNSAwLTAuNiAwLjMtMC42IDAuMyAwIDAtMC40IDAuMS0wLjQgMC42djI5LjRjMCAwLjQtMC4xIDAuNS0wLjEgMC41IDAgMC0wLjIgMC4yLTAuNSAwLjJoLTIxLjljLTAuMyAwLTAuNS0wLjItMC41LTAuMiAwIDAtMC4xLTAuMS0wLjEtMC42di0yOS40YzAtMC4zLTAuMy0wLjUtMC4zLTAuNSAwIDAtMC4xLTAuMy0wLjQtMC4zaC0yOC4yYy0wLjUgMC0wLjYgMC0wLjYgMCAwIDAtMC4zLTAuMy0wLjMtMC45di0yMS41YzAtMC4yIDAuMy0wLjYgMC4zLTAuNiAwIDAgMC4xIDAgMC4zIDBoMjguOGMwLjIgMCAwLjItMC4xIDAuMi0wLjEgMCAwIDAuMi0wLjEgMC4yLTAuNHYtMjUuN2MwLTAuMiAwLjEtMC41IDAuMS0wLjUgMCAwIDAuMi0wLjEgMC45LTAuMWgyMS40YzAuNCAwIDAuNiAwLjEgMC42IDAuMSAwIDAgMC4xIDAuMyAwLjEgMC43djI1LjhoMjhjMC43IDAgMC45IDAuMSAwLjkgMC4xIDAgMCAwLjQgMC4xIDAuNCAwLjd2MjEuN2MwIDAuMi0wLjQgMC42LTAuNCAwLjZ6bS04NS4yIDMwLjRjLTAuMSAwLjYtMC4yIDAuOC0wLjIgMC44IDAgMC0wLjEgMC4yLTAuNyAwLjJoLTQ0LjJjLTEuMyAwLTEuNi0wLjMtMS42LTAuMyAwIDAtMC4yLTAuNS0wLjEtMS40bDExLTc2LjNjMC0xIDAuMy0xLjMgMC4zLTEuM2gyMS4yYzAuNiAwIDAuOCAwLjEgMC44IDAuMSAwIDAgMC4xIDAuMyAwIDAuOGwtOC4zIDU5LjZjLTAuMSAwLjcgMC4yIDAuNyAwLjIgMC43IDAgMCAwLjIgMC4yIDEgMC4yaDIyYzAuNCAwIDAuNiAwLjIgMC42IDAuMiAwIDAgMC4yIDAuMSAwLjIgMC42em0tNTYuNSAxLjJoLTE5LjdjLTAuMyAwLjItMC43LTAuMy0wLjctMC4zIDAgMC0wLjEtMC4xLTAuMi0wLjdsLTIuNi0xMi4xYy0wLjItMC43LTAuNC0xLTAuNC0xIDAgMC0wLjYtMC4zLTEuMi0wLjNoLTI1LjVjLTAuNiAwLTAuOSAwLjMtMC45IDAuMyAwIDAtMC41IDAuNC0wLjcgMS4xbC01LjggMTIuM2MtMC4xIDAuMy0wLjMgMC40LTAuMyAwLjQgMCAwLTAuNCAwLjItMC43IDAuMmgtMjIuMWMtMC41IDAuMS0wLjctMC4zLTAuNy0wLjMgMCAwLTAuMS0wLjEgMC4yLTAuNmwzOS03Ny45YzAuMi0wLjEgMC40LTAuNCAwLjQtMC40IDAgMCAwLjMtMC4xIDAuOS0wLjFoMjQuMWMwLjYgMCAwLjkgMC4zIDAuOSAwLjMgMCAwIDAuMSAwLjEgMC4yIDAuNGwxNi4yIDc4LjJjMCAwLjIgMCAwLjQgMCAwLjQgMCAwIDAgMC4xLTAuNCAwLjF6bS05Mi4xLTAuMWgtMjAuM2MwIDAtMC4xLTAuMi0wLjItMC4zbC0yNy4zLTQ4LjRjLTAuMi0wLjItMC4zLTAuMi0wLjMtMC4yIDAgMC0wLjIgMC0wLjIgMC4zbC02LjggNDcuNmMtMC4xIDAuNi0wLjIgMC42LTAuMiAwLjYgMCAwLTAuMyAwLjEtMC41IDAuMWgtMTkuNmMtMC40IDAtMC41LTAuMS0wLjUtMC4xIDAgMC0wLjUtMC41LTAuNC0wLjlsMTAuOC03Ny4xYzAuMS0wLjQgMC4zLTAuNSAwLjMtMC41IDAgMCAwLjMtMC4zIDAuNy0wLjNoMjEuOGMwLjMgMCAwLjUgMC4yIDAuNSAwLjIgMCAwIDAuMiAwLjEgMC4zIDAuNGwyNC42IDQzLjJjMC41IDAuOSAwLjcgMC44IDAuNyAwLjggMCAwIDAuNCAwIDAuNi0xbDYuMy00M2MwLTAuMyAwLjItMC40IDAuMi0wLjQgMCAwIDAuMS0wLjIgMC40LTAuMmwyMC42IDAuMmMwLjMgMCAwLjUgMC4xIDAuNSAwLjEgMCAwIDAgMC4xIDAgMC4zbC0xMSA3Ny43Yy0wLjEgMC41LTAuMyAwLjctMC4zIDAuNyAwIDAtMC4xIDAuMi0wLjcgMC4yem0tODYtMC4zbC0xOS4xIDAuMWMtMC41IDAtMC43LTAuMi0wLjctMC4yIDAgMC0wLjIgMC0wLjMtMC44bC0zLTEyLjRjMC0wLjMtMC4yLTAuNC0wLjItMC40aC0yNy4yYy0wLjYgMC0wLjkgMC40LTAuOSAwLjQgMCAwLTAuNSAwLjMtMC44IDEuMWwtNS40IDExLjVxLTAuMyAwLjYtMC4zIDAuNmMwIDAtMC4zIDAuMS0wLjYgMC4xaC0yMi4zYy0wLjYgMC4xLTAuNy0wLjEtMC43LTAuMSAwIDAtMC4xLTAuNCAwLjEtMC44bDM4LjYtNzcuNmMwLjItMC40IDAuNS0wLjUgMC41LTAuNWgyNS40YzAuNCAwIDAuNyAwLjMgMC43IDAuMyAwIDAgMC4yIDAuMSAwLjIgMC40bDE2LjYgNzcuOGMwIDAuNC0wLjIgMC40LTAuMiAwLjQgMCAwLTAuMSAwLjEtMC40IDAuMXptMTQ1LjgtNTYuNWMwIDAtMC4xIDAtMC4yIDAuM2wtMTAuOCAyNC40Yy0wLjIgMC43LTAuMSAwLjgtMC4xIDAuOCAwIDAgMC4zIDAuMiAwLjYgMC4ybDE1LjktMC4xaDAuMmMwIDAgMC4xLTAuMSAwLTAuNGwtNS40LTI1Yy0wLjEtMC4yLTAuMi0wLjItMC4yLTAuMnptLTE3OC40IDAuMmMwIDAtMC4yIDAtMC4zIDAuM2wtMTAuNiAyNC4zYy0wLjMgMC40LTAuMiAwLjYtMC4yIDAuNiAwIDAgMC4yIDAuMSAwLjcgMC4xbDE1LjcgMC4xYzAuMiAwIDAuMy0wLjEgMC4zLTAuMSAwIDAgMC4xLTAuMSAwLTAuNGwtNS42LTI0LjZjMC0wLjMgMC0wLjMgMC0wLjN6bS01NSA1My43Yy0wLjIgMC44LTAuNiAxLjUtMC42IDEuNSAwIDAtMC40IDAuNC0xLjIgMC42LTEwLjMgNC4yLTIxLjggMi44LTIxLjggMi44LTE4LjYtMi0zMC40LTEzLjQtMzQuMi0yOC4yLTUuNi0yMS45IDUuNS0zNy43IDguMi00MSA2LjYtNy44IDE2LjgtMTMuNCAyNi44LTE0LjcgMTIuNy0xLjggMjIuMiAxLjIgMjYuMSAyLjUgMCAwIDQuMyAxLjQgNy42IDMuNSAxLjYgMS4xIDEuNyAxLjUgMS43IDEuNSAwIDAgMC4xIDAuMi0wLjMgMmwtMyAxNS43Yy0wLjEgMC43LTAuNSAxLTAuNSAxIDAgMC0wLjMgMC4xLTEuNy0wLjktOS43LTYuOC0yMS01LjktMjEtNS45LTguNiAwLjUtMTguNiA1LTIxLjYgMTYuNC0yLjcgMTAuMSAwLjEgMTguNSA2LjEgMjMuNiA0LjEgMy41IDEwLjUgNS40IDE3LjEgNSA3LjEtMC40IDEyLjgtMy4yIDEyLjctMy4yIDAuMSAwIDAuMy0wLjEgMC42LTAuMiAxLjUtMC43IDEuOS0wLjYgMS45LTAuNiAwIDAgMC4zIDAuMyAwLjEgMS4zem0wLjUtMTcuN3EtMC4xIDAtMC4xIDAgMCAwIDAuMSAweiIvPgoJPHBhdGggaWQ9IlBhdGggMTE3MiBjb3B5IiBjbGFzcz0iczIiIGQ9Im00NTguNCAxMjcuNXY3Ni44aC03Ny40di03Ni44eiIvPgoJPHBhdGggaWQ9IlBhdGggMTE3MiIgY2xhc3M9InMzIiBkPSJtMzgyLjQgMTI3LjV2NzYuOGgtMjUwdi03Ni44eiIvPgoJPHBhdGggaWQ9IlBhdGggMTE3MyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGFzcz0iczQiIGQ9Im0xNzYuNCAxNTIuOHEtMy45LTMuMy04LjItMy4zLTIgMC0zLjUgMS0xLjggMS4yLTEuOCAzLjJjMCAxLjMgMC45IDIuNCAyLjYgMy4zIDAuNSAwLjIgMi41IDEgNiAyIDMuOSAxLjMgNi45IDIuOCA4LjcgNC44IDIuMSAyLjIgMy4xIDUuMSAzLjEgOC42IDAgMy41LTAuNiA2LjQtMS44IDguN3EtMi4xIDQuMi03LjIgNi42Yy0yLjkgMS4yLTYuMSAxLjgtOS43IDEuOC0zLjUgMC03LjEtMC43LTEwLjgtMi4ycS0yLjktMS4yLTQuNC0yLjItMC42LTAuNS0xLjUtMWw1LjMtMTAuMWMzLjggMy4zIDcuNCA0LjkgMTEgNC45IDEuOCAwIDMuMS0wLjMgNC4yLTEuMSAxLjItMC44IDEuOC0yIDEuOC0zLjZxMC0yLTItMy41Yy0wLjYtMC40LTEuNS0wLjgtMi45LTEuMi0wLjQtMC4yLTEuMi0wLjQtMi41LTAuOGwtMi42LTAuOGMtMS42LTAuNC0zLjEtMS4xLTQuNy0xLjktMy44LTItNS43LTUuNS01LjctMTAuNyAwLTQuOSAxLjYtOC43IDQuNi0xMS43IDMtMyA3LTQuNSAxMS44LTQuNSA1LjIgMCAxMC4yIDEuMyAxNS4yIDR6bTM0LjctMTIuNXE3LjYgMCAxMS45IDRjMy4yIDIuOSA0LjcgNi45IDQuNyAxMS45IDAgMTAuNy01LjQgMTYuMS0xNi4yIDE2LjFoLTcuOHYxNmgtMTIuNXYtNDh6bS0zLjIgMjJjNC41IDAgNi44LTIgNi44LTYgMC00LTIuMi02LTYuOC02aC00LjF2MTJ6bTY5LjcgMjAuNWMtNS4xIDQuOC0xMS40IDcuMi0xOC44IDcuMi03LjUgMC0xMy44LTIuNS0xOC45LTcuM3EtNy42LTcuMy03LjYtMTcuOWMwLTUuNCAxLjQtMTAuMyA0LjEtMTQuNSAyLjktNC4zIDYuOC03LjUgMTEuNy05LjUgMy4yLTEuMyA2LjctMS45IDEwLjQtMS45IDcuOCAwIDE0LjIgMi40IDE5LjIgNy4yIDUuMSA0LjggNy42IDEwLjkgNy42IDE4LjMgMCA3LjUtMi41IDEzLjYtNy43IDE4LjR6bS05LjMtMjhjLTIuNi0yLjUtNS44LTMuOS05LjUtMy45cS01LjUgMC05LjYgNGMtMi41IDIuNi0zLjkgNS43LTMuOSA5LjQgMCAzLjggMS4yIDcgMy45IDkuNnE0IDQgOS42IDQgNS43IDAgOS41LTRjMi42LTIuNiA0LTUuOCA0LTkuNXEwLTUuNi00LTkuNnptNDguMSAzMy41bC0xMS41LTE5LjEtMi4zIDE5LjFoLTEyLjFsNS45LTQ4aDE1LjVjMTEuNCAwIDE3IDQuOCAxNyAxNC42IDAgNS0xLjMgOC41LTQuMiAxMS4zLTEuNSAxLjUtMi44IDIuMS01LjkgMy40bDExLjcgMTguN3ptLTguNS0yNi44YzUuMiAwIDguNy0yLjQgOC43LTYuMSAwLTMuMS0yLjUtNC45LTctNC45aC0yLjNsLTEuNSAxMXptNDguNS0xMC43djM3LjVoLTEyLjV2LTM3LjVoLTEwLjF2LTEwLjVoMzN2MTAuNXoiLz4KCTxwYXRoIGlkPSI0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsYXNzPSJzMyIgZD0ibTQzNC45IDE3OC4ydjkuOGgtMTEuNXYtOS44aC0yMy4ydi04bDE4LjUtMzAuMWgxNi4ydjI3LjloNS45djEwLjJ6bS0xMS41LTI3LjJsLTEwLjggMTdoMTAuOHoiLz4KPC9zdmc+"});

/* ---- core.js ---- */
/* F1 Data Hub \u2014 core: platform bridge, networking, settings, time, calendar, exports */
'use strict';

const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ---------------- Settings ---------------- */
const Store = {
  get(k, d) { try { const v = localStorage.getItem('f1hub.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('f1hub.' + k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem('f1hub.' + k); } catch {} },
};

const Settings = {
  defaults: { theme: 'auto', region: 'auto', tz: 'auto', hour12: false, primary: null, icsShows: true, icsAlarm: 15,
    channelOverrides: {}, linkOverrides: {}, openf1User: '', openf1Pass: '', newsOff: [], liveSeconds: 5 },
  all() { return Object.assign({}, this.defaults, Store.get('settings', {})); },
  get(k) { return this.all()[k]; },
  set(k, v) { const a = Store.get('settings', {}); a[k] = v; Store.set('settings', a); },
};

function deviceTz() { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch { return 'UTC'; } }
function currentTz() { const t = Settings.get('tz'); return t && t !== 'auto' ? t : (Settings.get('region') !== 'auto' && REGIONS[Settings.get('region')] ? REGIONS[Settings.get('region')].tz : deviceTz()); }
function currentRegion() {
  const r = Settings.get('region');
  if (r && r !== 'auto' && REGIONS[r]) return REGIONS[r];
  const tz = deviceTz();
  return REGIONS[TZ_TO_REGION[tz]] || guessRegionByContinent(tz);
}
function guessRegionByContinent(tz) {
  if (tz.startsWith('Africa/')) return { code: 'AF', name: 'Africa (SuperSport territory)', tz, broadcasters: [{ key: 'supersport', channel: 'DStv 235' }, { key: 'f1tv', channel: 'Streaming' }] };
  return { code: 'WW', name: 'Worldwide', tz, broadcasters: [{ key: 'f1tv', channel: 'Streaming' }] };
}
function regionBroadcasters() {
  const reg = currentRegion();
  const ch = Settings.get('channelOverrides') || {}, ln = Settings.get('linkOverrides') || {};
  return reg.broadcasters.map(b => {
    const base = BROADCASTERS[b.key] || { name: b.key, lead: {} };
    const k = reg.code + ':' + b.key;
    let channel = String(ch[k] ?? b.channel).replace(/\s*[\u00b7,/+&]\s*GOtv\b/i, '');
    if (b.key === 'canal_af' && /^Canal\+ ch 12$/i.test(channel)) channel = 'CANAL+ 14'; // old default // v1 defaults listed GOtv; it doesn't carry F1
    return Object.assign({}, base, { key: b.key, channel, watch: ln[k] ?? base.watch });
  });
}
function primaryBroadcaster() {
  const list = regionBroadcasters(); const p = Settings.get('primary');
  return list.find(b => b.key === p) || list[0];
}

/* ---------------- Platform bridge ---------------- */
const Platform = {
  get kind() { return window.AndroidBridge ? 'android' : (window.__DESKTOP__ ? 'desktop' : 'web'); },
  canScrape() { return this.kind !== 'web'; },

  async http(url, { method = 'GET', headers = {}, body = null, timeout = 20000 } = {}) {
    if (this.kind === 'desktop') {
      const r = await fetch('/proxy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url, method, headers, body }) });
      const text = await r.text();
      return { ok: r.status >= 200 && r.status < 300, status: r.status, text };
    }
    if (this.kind === 'android') {
      return new Promise(resolve => {
        const x = new XMLHttpRequest();
        x.open(method, url, true); x.timeout = timeout;
        Object.entries(headers).forEach(([k, v]) => x.setRequestHeader(k, v));
        x.onload = () => resolve({ ok: x.status >= 200 && x.status < 300, status: x.status, text: x.responseText });
        x.onerror = () => resolve({ ok: false, status: 0, text: '' });
        x.ontimeout = () => resolve({ ok: false, status: 0, text: '' });
        x.send(body);
      });
    }
    try {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), timeout);
      const r = await fetch(url, { method, headers, body, signal: ctl.signal }); clearTimeout(t);
      return { ok: r.ok, status: r.status, text: await r.text() };
    } catch (e) { return { ok: false, status: 0, text: '' }; }
  },

  async saveFile(name, mime, blob) {
    const b64 = await blobToB64(blob);
    if (this.kind === 'android') {
      const ref = window.AndroidBridge.saveFile(name, mime, b64);
      if (String(ref).startsWith('ERROR')) throw new Error(ref);
      return { ref, label: 'Downloads/F1DataHub/' + name };
    }
    if (this.kind === 'desktop') {
      const r = await fetch('/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, b64 }) });
      const j = await r.json(); if (!j.path) throw new Error(j.error || 'save failed');
      return { ref: j.path, label: j.path };
    }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
    return { ref: null, label: 'your Downloads folder' };
  },
  openSaved(ref, mime) {
    if (!ref) return;
    if (this.kind === 'android') return window.AndroidBridge.openUri(ref, mime);
    if (this.kind === 'desktop') return fetch('/open', { method: 'POST', body: JSON.stringify({ path: ref }) });
  },
  // Binary download as a data: URL (logos, update files). Works around CORS the same way as http().
  async httpDataUrl(url) {
    let blob;
    if (this.kind === 'desktop') { const r = await fetch('/proxy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url, method: 'GET', headers: {} }) }); if (!r.ok) return null; blob = await r.blob(); }
    else if (this.kind === 'android') { blob = await new Promise(res => { const x = new XMLHttpRequest(); x.open('GET', url, true); x.responseType = 'blob'; x.timeout = 20000; x.onload = () => res(x.status === 200 ? x.response : null); x.onerror = x.ontimeout = () => res(null); x.send(); }); }
    else { try { const r = await fetch(url); if (!r.ok) return null; blob = await r.blob(); } catch { return null; } }
    if (!blob || !blob.size) return null;
    if (!/^image\//.test(blob.type || '')) { const m = url.match(/\.(png|webp|jpe?g|svg|gif)(\?|$)/i); if (m) blob = new Blob([blob], { type: 'image/' + ({ jpg: 'jpeg', svg: 'svg+xml' }[m[1].toLowerCase()] || m[1].toLowerCase()) }); }
    return new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = () => res(null); fr.readAsDataURL(blob); });
  },
  shareSaved(ref, mime) { if (this.kind === 'android' && ref) return window.AndroidBridge.shareUri(ref, mime); },
  openUrl(url) {
    if (this.kind === 'android') return window.AndroidBridge.openUrl(url);
    if (this.kind === 'desktop') return fetch('/openurl', { method: 'POST', body: JSON.stringify({ url }) });
    window.open(url, '_blank', 'noopener');
  },
};
function blobToB64(blob) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1] || ''); r.onerror = rej; r.readAsDataURL(blob); });
}
function b64ToBlob(dataUrl) { const [h, d] = dataUrl.split(','); const mime = h.match(/:(.*?);/)[1]; const bin = atob(d); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return new Blob([u], { type: mime }); }

document.addEventListener('click', e => {
  const a = e.target.closest('a[href]'); if (!a) return;
  const href = a.getAttribute('href');
  if (/^https?:\/\//i.test(href)) { e.preventDefault(); Platform.openUrl(href); }
});

/* ---------------- Toasts ---------------- */
function toast(html, actions = [], ms = 5000) {
  const box = $('#toasts'); const t = document.createElement('div'); t.className = 'toast';
  t.innerHTML = `<div>${html}</div>`;
  actions.forEach(([label, fn]) => { const b = document.createElement('button'); b.textContent = label; b.onclick = () => { fn(); t.remove(); }; t.appendChild(b); });
  box.appendChild(t); setTimeout(() => t.remove(), ms);
}
async function deliver(name, mime, blob) {
  try {
    const r = await Platform.saveFile(name, mime, blob);
    const acts = [];
    if (r.ref) acts.push(['Open', () => Platform.openSaved(r.ref, mime)]);
    if (r.ref && Platform.kind === 'android') acts.push(['Share', () => Platform.shareSaved(r.ref, mime)]);
    toast(`Saved <b>${esc(name)}</b><br><small>${esc(r.label)}</small>`, acts, 8000);
    return r;
  } catch (e) { toast('Could not save: ' + esc(e.message)); }
}

/* ---------------- Cached JSON fetch ---------------- */
const Mem = new Map();
// Spaces out requests per host (OpenF1 free tier: ~3 req/s; Jolpica: ~4 req/s burst).
const _gates = {};
function gate(host, gap) { const prev = _gates[host] || Promise.resolve(); const next = prev.then(() => sleep(gap)); _gates[host] = next.catch(() => {}); return prev; }
const _inflight = new Map();
async function getJSON(url, opts = {}) {
  const k = url + '|' + JSON.stringify(opts.headers || {});
  if (_inflight.has(k)) return _inflight.get(k);
  const p = _getJSON(url, opts).finally(() => _inflight.delete(k)); _inflight.set(k, p); return p;
}
async function _getJSON(url, { ttl = 600, headers = {}, persist = false, gap = 0 } = {}) {
  const now = Date.now(); const m = Mem.get(url);
  if (m && now - m.t < ttl * 1000) return m.v;
  if (persist) { const p = Store.get('cache:' + url); if (p && now - p.t < ttl * 1000) { Mem.set(url, p); return p.v; } }
  if (gap) { try { await gate(new URL(url).host, gap); } catch {} }
  const r = await Platform.http(url, { headers });
  if (!r.ok) { const p = persist && Store.get('cache:' + url); if (p) return p.v; const e = new Error('HTTP ' + r.status + ' for ' + url); e.status = r.status; throw e; }
  const v = JSON.parse(r.text); const rec = { t: now, v }; Mem.set(url, rec);
  if (persist) Store.set('cache:' + url, rec);
  return v;
}

/* ---------------- Time ---------------- */
function tzOffsetMin(tz, date) {
  const f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const p = Object.fromEntries(f.formatToParts(date).map(x => [x.type, x.value]));
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second);
  return Math.round((asUtc - date.getTime()) / 60000);
}
function zonedToUtc(ymd, hm, tz) {
  const [y, m, d] = ymd.split('-').map(Number); const [hh, mm] = hm.split(':').map(Number);
  let guess = Date.UTC(y, m - 1, d, hh, mm);
  let off = tzOffsetMin(tz, new Date(guess)); let t = guess - off * 60000;
  off = tzOffsetMin(tz, new Date(t)); t = guess - off * 60000;
  return new Date(t);
}
function tzLabel(tz, date = new Date()) {
  const o = tzOffsetMin(tz, date); const s = o >= 0 ? '+' : '-'; const a = Math.abs(o);
  return `GMT${s}${Math.floor(a / 60)}${a % 60 ? ':' + String(a % 60).padStart(2, '0') : ''}`;
}
function fmt(date, opts, tz = currentTz()) {
  return new Intl.DateTimeFormat('en-GB', Object.assign({ timeZone: tz, hour12: !!Settings.get('hour12') }, opts)).format(date);
}
const fmtTime = (d, tz) => fmt(d, { hour: '2-digit', minute: '2-digit' }, tz);
const fmtDay = (d, tz) => fmt(d, { weekday: 'short', day: 'numeric', month: 'short' }, tz);
const fmtDayLong = (d, tz) => fmt(d, { weekday: 'long', day: 'numeric', month: 'long' }, tz);
const fmtDateTime = (d, tz) => `${fmtDay(d, tz)} \u00b7 ${fmtTime(d, tz)}`;
function countdown(ms) {
  if (ms <= 0) return '00:00:00';
  const s = Math.floor(ms / 1000), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
  return (d ? d + 'd ' : '') + [h, m, x].map(v => String(v).padStart(2, '0')).join(':');
}
function lapStr(sec) {
  if (sec == null || !isFinite(sec)) return '\u2014';
  const m = Math.floor(sec / 60), s = sec - m * 60;
  return m ? `${m}:${s.toFixed(3).padStart(6, '0')}` : s.toFixed(3);
}
const gapStr = s => s == null || !isFinite(s) ? '\u2014' : (s === 0 ? '\u2014' : '+' + s.toFixed(3));
function flagEmoji(cc) { if (!cc || cc.length !== 2) return '\ud83c\udfc1'; return String.fromCodePoint(...[...cc.toUpperCase()].map(c => 127397 + c.charCodeAt(0))); }
const COUNTRY_CC = { Australia: 'AU', China: 'CN', Japan: 'JP', Bahrain: 'BH', 'Saudi Arabia': 'SA', USA: 'US', 'United States': 'US', Canada: 'CA', Monaco: 'MC', Spain: 'ES', Austria: 'AT', UK: 'GB', 'United Kingdom': 'GB', 'Great Britain': 'GB', Belgium: 'BE', Hungary: 'HU', Netherlands: 'NL', Italy: 'IT', Azerbaijan: 'AZ', Singapore: 'SG', Mexico: 'MX', Brazil: 'BR', Qatar: 'QA', UAE: 'AE', 'United Arab Emirates': 'AE', Malaysia: 'MY', Portugal: 'PT', France: 'FR', Germany: 'DE', Russia: 'RU', Turkey: 'TR' };

/* ---------------- Calendar ---------------- */
const JOLPICA = 'https://api.jolpi.ca/ergast/f1';
const OPENF1 = 'https://api.openf1.org/v1';

function buildFallback(year) {
  if (year !== 2026) return [];
  return FALLBACK_2026.map(([round, name, cid, raceDate, sprint, times, offs]) => {
    const c = CIRCUITS[cid]; const keys = sprint ? ['FP1', 'SQ', 'SPRINT', 'Q', 'R'] : ['FP1', 'FP2', 'FP3', 'Q', 'R'];
    const dayOff = offs || (sprint ? [-2, -2, -1, -1, 0] : [-2, -2, -1, -1, 0]);
    const sessions = keys.map((k, i) => {
      const d = new Date(raceDate + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + dayOff[i]);
      const start = zonedToUtc(d.toISOString().slice(0, 10), times[i], c.tz);
      return mkSession(k, start);
    });
    return { season: year, round, name, circuitId: cid, circuitName: c.name, locality: c.city, country: c.cc, cc: c.cc, lat: null, lon: null, sprint: !!sprint, sessions, source: 'offline' };
  });
}
function mkSession(key, start) { const m = SESSION_META[key]; return { key, name: m.name, short: m.short, type: m.type, start, end: new Date(start.getTime() + m.mins * 60000) }; }

async function loadCalendar(year) {
  try {
    const j = await getJSON(`${JOLPICA}/${year}.json?limit=100`, { ttl: 3 * 3600, persist: true });
    const races = j.MRData.RaceTable.Races || [];
    if (!races.length) throw new Error('empty');
    return races.map(r => {
      const sessions = [];
      const add = (key, o) => { if (o && o.date) sessions.push(mkSession(key, new Date(`${o.date}T${o.time || '12:00:00Z'}`))); };
      add('FP1', r.FirstPractice); add('FP2', r.SecondPractice); add('FP3', r.ThirdPractice);
      add('SQ', r.SprintQualifying || r.SprintShootout); add('SPRINT', r.Sprint); add('Q', r.Qualifying);
      add('R', { date: r.date, time: r.time });
      sessions.sort((a, b) => a.start - b.start);
      const cid = r.Circuit.circuitId; const loc = r.Circuit.Location || {};
      return { season: +r.season, round: +r.round, name: r.raceName, circuitId: cid, circuitName: (CIRCUITS[cid] && CIRCUITS[cid].name) || r.Circuit.circuitName,
        locality: loc.locality, country: loc.country, cc: (CIRCUITS[cid] && CIRCUITS[cid].cc) || COUNTRY_CC[loc.country] || '',
        lat: +loc.lat, lon: +loc.long, sprint: !!r.Sprint, sessions, source: 'live' };
    });
  } catch (e) {
    const fb = buildFallback(year);
    if (fb.length) return fb;
    throw e;
  }
}
function sessionStatus(s, now = Date.now()) {
  if (now < s.start.getTime()) return 'upcoming';
  if (now < s.end.getTime() + 10 * 60000) return 'live';
  return 'done';
}
function nextEvent(cal, now = Date.now()) {
  return cal.find(ev => ev.sessions.some(s => s.end.getTime() + 3 * 3600000 > now)) || cal[cal.length - 1];
}
function onAir(session, b) {
  const l = typeof liveOnAir === 'function' ? liveOnAir(session, b) : null; if (l) return l.start; // real time from the broadcaster's live TV guide
  const lead = (b.lead && b.lead[session.type]) || 0;
  return new Date(session.start.getTime() - lead * 60000);
}
function shortGp(ev) { return ev.name.replace(/ Grand Prix.*$/, '').replace(/^Grand Prix of /, ''); }

/* ---------------- ICS (calendar sync) ---------------- */
function icsEscape(s) { return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n'); }
function icsDate(d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); }
function icsFold(line) { const out = []; while (line.length > 74) { out.push(line.slice(0, 74)); line = ' ' + line.slice(74); } out.push(line); return out.join('\r\n'); }
function buildICS(events, { calName = 'F1 Data Hub' } = {}) {
  const now = icsDate(new Date()); const alarm = +Settings.get('icsAlarm') || 0;
  const L = ['BEGIN:VCALENDAR', 'PRODID:-//F1 Data Hub//Race Weekend Sync//EN', 'VERSION:2.0', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:' + icsEscape(calName), 'X-WR-TIMEZONE:' + currentTz()];
  for (const e of events) {
    L.push('BEGIN:VEVENT', 'DTSTART:' + icsDate(e.start), 'DTEND:' + icsDate(e.end), 'DTSTAMP:' + now, 'UID:' + e.uid,
      'CREATED:' + now, 'LAST-MODIFIED:' + now, 'SEQUENCE:0', 'STATUS:CONFIRMED', 'SUMMARY:' + icsEscape(e.summary),
      'DESCRIPTION:' + icsEscape(e.description));
    if (e.html) L.push('X-ALT-DESC;FMTTYPE=text/html:' + e.html.replace(/\n/g, ''));
    L.push('LOCATION:' + icsEscape(e.location), 'TRANSP:OPAQUE');
    if (e.url) L.push('URL:' + e.url);
    if (alarm > 0) L.push('BEGIN:VALARM', `TRIGGER:-PT${alarm}M`, 'DESCRIPTION:Event reminder', 'ACTION:DISPLAY', 'END:VALARM');
    L.push('END:VEVENT');
  }
  L.push('END:VCALENDAR');
  return L.map(icsFold).join('\r\n') + '\r\n';
}
function weekendIcsEvents(ev, { shows = Settings.get('icsShows') } = {}) {
  const b = primaryBroadcaster(); const yy = String(ev.season).slice(2); const gp = shortGp(ev);
  const loc = `${b.short || b.name} (${b.channel})`; const out = [];
  const venue = `${ev.circuitName} - ${ev.locality || ''}${ev.country ? ', ' + ev.country : ''}`;
  const mk = (summary, start, end, blurb, key) => {
    const description = `Watch ${summary} on ${loc}\n\n${blurb}\nOfficial session times are in UTC; your calendar shows them in local time.\nWatch: ${b.watch}`;
    const html = `<p><strong>Watch ${esc(summary)}</strong></p><p>Channel: ${esc(loc)}</p><p>${esc(blurb)}</p><p><a href="${esc(b.watch)}">Watch Live Stream</a></p>`;
    out.push({ uid: `${ev.season}-${ev.round}-${key}-${b.key}@f1datahub`, summary, start, end, description, html, location: loc, url: b.watch });
  };
  for (const s of ev.sessions) {
    const start = onAir(s, b); const end = new Date(s.end.getTime() + (s.type === 'R' ? 5 : 0) * 60000);
    mk(`F1 '${yy}: ${gp} GP ${s.name}`, start, end, `'Formula One - ${ev.name} ${s.name}'. LIVE from ${venue}.`, s.key);
  }
  if (shows && b.key === 'supersport') {
    const byKey = Object.fromEntries(ev.sessions.map(s => [s.key, s]));
    for (const sh of SUPPORT_SHOWS) {
      const a = byKey[sh.anchor]; if (!a) continue; if (sh.nonSprint && ev.sprint) continue;
      let start;
      if (sh.fixedPrevDayUtc) { start = new Date(a.start); start.setUTCDate(start.getUTCDate() - 1); const [h, m] = sh.fixedPrevDayUtc.split(':'); start.setUTCHours(+h, +m, 0, 0); }
      else start = new Date(a.start.getTime() + sh.offset * 60000);
      mk(sh.title.replace('{gp}', gp), start, new Date(start.getTime() + sh.dur * 60000), `${gp}. Analysis and build-up on ${b.name}.`, 'show-' + sh.title.replace(/\W+/g, ''));
    }
  }
  return out.sort((x, y) => x.start - y.start);
}
function googleCalLink(ev, s) {
  const b = primaryBroadcaster(); const start = onAir(s, b);
  const p = new URLSearchParams({ action: 'TEMPLATE', text: `F1: ${shortGp(ev)} GP ${s.name}`, dates: `${icsDate(start)}/${icsDate(s.end)}`,
    details: `Watch on ${b.name} (${b.channel}) \u2014 ${b.watch}`, location: `${b.name} (${b.channel})` });
  return 'https://calendar.google.com/calendar/render?' + p.toString();
}
async function exportIcs(events, filename, calName) {
  const blob = new Blob([buildICS(events, { calName })], { type: 'text/calendar' });
  return deliver(filename, 'text/calendar', blob);
}

/* ---------------- Exports: spreadsheets, images, infographics ---------------- */
const fileSafe = s => String(s).replace(/[^\w\-]+/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
async function exportXlsx(sheets, filename) {
  const wb = XLSX.utils.book_new();
  for (const { name, columns, rows } of sheets) {
    const ws = XLSX.utils.aoa_to_sheet([columns, ...rows]);
    ws['!cols'] = columns.map((c, i) => ({ wch: Math.min(40, Math.max(String(c).length, ...rows.slice(0, 200).map(r => String(r[i] ?? '').length)) + 2) }));
    XLSX.utils.book_append_sheet(wb, ws, String(name).slice(0, 31).replace(/[\\/?*[\]:]/g, ' '));
  }
  const out = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  return deliver(filename, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', new Blob([out]));
}
async function exportCsv(columns, rows, filename) {
  const q = v => { const s = String(v ?? ''); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  const csv = [columns, ...rows].map(r => r.map(q).join(',')).join('\r\n');
  return deliver(filename, 'text/csv', new Blob(['\ufeff' + csv], { type: 'text/csv' }));
}
async function exportElementPng(el, filename) {
  const canvas = await html2canvas(el, { backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg').trim() || '#0b1220', scale: 2, useCORS: true, logging: false });
  return deliver(filename, 'image/png', b64ToBlob(canvas.toDataURL('image/png')));
}
async function exportCanvasPng(canvas, filename) { return deliver(filename, 'image/png', b64ToBlob(canvas.toDataURL('image/png'))); }

function roundRect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
let _fontsP = null;
function loadFonts() {
  if (!document.fonts || !document.fonts.load) return Promise.resolve();
  return _fontsP || (_fontsP = Promise.all(['italic 800 40px "Barlow Condensed"', '800 40px "Barlow Condensed"', '700 40px "Barlow Condensed"', '600 40px "Barlow Condensed"', '600 20px Inter', '500 20px Inter', '700 20px Inter'].map(f => document.fonts.load(f).catch(() => {}))));
}
function fitText(ctx, text, maxW, size, weight = '800', family = '"Barlow Condensed", Arial, sans-serif') {
  let s = size; do { ctx.font = `${weight} ${s}px ${family}`; s -= 2; } while (ctx.measureText(text).width > maxW && s > 10); return s + 2;
}
function brandBand(ctx, W, y, h) {
  const g = ctx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, '#d6005c'); g.addColorStop(0.5, '#e10600'); g.addColorStop(1, '#ff6a00');
  ctx.fillStyle = g; ctx.fillRect(0, y, W, h);
}
function stripeBg(ctx, W, H) {
  ctx.fillStyle = '#0b1220'; ctx.fillRect(0, 0, W, H);
  const rg = ctx.createRadialGradient(W * 0.85, H * 0.15, 10, W * 0.85, H * 0.15, W * 0.9);
  rg.addColorStop(0, 'rgba(225,6,0,0.45)'); rg.addColorStop(1, 'rgba(225,6,0,0)'); ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = 0.06; ctx.fillStyle = '#fff';
  for (let i = -H; i < W; i += 46) { ctx.beginPath(); ctx.moveTo(i, H); ctx.lineTo(i + 18, H); ctx.lineTo(i + 18 + H * 0.5, 0); ctx.lineTo(i + H * 0.5, 0); ctx.fill(); }
  ctx.restore();
}

/** Infographic: title, chart image, highlight tiles, ranked bars. */
async function buildInfographic({ title, subtitle, chartCanvas, highlights = [], bars = [], footer }) {
  await loadFonts(); const W = 1080, H = 1350; const c = document.createElement('canvas'); c.width = W; c.height = H; const ctx = c.getContext('2d');
  stripeBg(ctx, W, H); brandBand(ctx, W, 0, 14);
  ctx.fillStyle = '#fff'; fitText(ctx, title, W - 120, 58); ctx.fillText(title, 60, 100);
  ctx.fillStyle = '#9fb0cf'; ctx.font = '600 28px Inter, Segoe UI, Roboto, Arial'; ctx.fillText(subtitle || '', 60, 145);
  let y = 180;
  if (highlights.length) {
    const n = Math.min(3, highlights.length), gw = (W - 120 - (n - 1) * 20) / n;
    highlights.slice(0, n).forEach((h, i) => {
      const x = 60 + i * (gw + 20); roundRect(ctx, x, y, gw, 130, 18); ctx.fillStyle = 'rgba(255,255,255,0.07)'; ctx.fill();
      ctx.fillStyle = '#ff5a4f'; ctx.font = '700 22px Inter, Segoe UI, Roboto, Arial'; ctx.fillText(h.label.toUpperCase(), x + 22, y + 40);
      ctx.fillStyle = '#fff'; fitText(ctx, h.value, gw - 44, 44); ctx.fillText(h.value, x + 22, y + 92);
      if (h.sub) { ctx.fillStyle = '#9fb0cf'; ctx.font = '500 20px Inter, Segoe UI, Roboto, Arial'; ctx.fillText(h.sub, x + 22, y + 118); }
    });
    y += 160;
  }
  if (chartCanvas) {
    const img = new Image(); img.src = chartCanvas.toDataURL('image/png'); await img.decode().catch(() => {});
    const maxH = bars.length ? 520 : 900; const ratio = img.width / img.height || 1.6;
    let w = W - 120, h = w / ratio; if (h > maxH) { h = maxH; w = h * ratio; }
    roundRect(ctx, 50, y - 10, W - 100, h + 20, 18); ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.fill();
    ctx.drawImage(img, (W - w) / 2, y, w, h); y += h + 40;
  }
  if (bars.length) {
    const rows = bars.slice(0, Math.max(3, Math.floor((H - 110 - y) / 46)));
    const max = Math.max(...rows.map(b => Math.abs(b.value))) || 1;
    rows.forEach((b, i) => {
      const yy = y + i * 46; ctx.fillStyle = '#9fb0cf'; ctx.font = '700 24px Inter, Segoe UI, Roboto, Arial'; ctx.fillText(String(i + 1).padStart(2, ' '), 60, yy + 26);
      ctx.fillStyle = '#fff'; ctx.fillText(b.label, 105, yy + 26);
      const bw = (W - 520) * Math.abs(b.value) / max; roundRect(ctx, 300, yy + 6, Math.max(6, bw), 26, 8); ctx.fillStyle = b.color || '#e10600'; ctx.fill();
      ctx.fillStyle = '#dbe4f5'; ctx.font = '600 22px Inter, Segoe UI, Roboto, Arial'; ctx.fillText(b.text ?? String(b.value), 310 + Math.max(6, bw) + 8, yy + 26);
    });
  }
  brandBand(ctx, W, H - 70, 70);
  ctx.fillStyle = '#fff'; ctx.font = '800 26px Inter, Segoe UI, Roboto, Arial'; ctx.fillText('F1 DATA HUB', 60, H - 26);
  ctx.font = '500 20px Inter, Segoe UI, Roboto, Arial'; const ft = footer || `Generated ${fmtDateTime(new Date())} (${tzLabel(currentTz())})`;
  ctx.fillText(ft, W - 60 - ctx.measureText(ft).width, H - 28);
  return c;
}

/* ---------------- Charts ---------------- */
const PALETTE = ['#e10600', '#1f6feb', '#f5a623', '#16c784', '#a855f7', '#ff5d8f', '#00b8d9', '#ffd166', '#8bd3dd', '#ef476f', '#06d6a0', '#118ab2', '#c77dff', '#ff9f1c', '#2ec4b6', '#e76f51', '#90be6d', '#f72585', '#4cc9f0', '#b5179e'];
if (window.Chart) {
  Chart.defaults.color = '#9fb0cf'; Chart.defaults.borderColor = 'rgba(159,176,207,0.15)';
  Chart.defaults.font.family = 'Inter, Segoe UI, Roboto, Arial, sans-serif';
  Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#9fb0cf';
  Chart.register({ id: 'bgfill', beforeDraw(ch) { const { ctx, width, height } = ch; ctx.save(); ctx.globalCompositeOperation = 'destination-over'; ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--chart-bg').trim() || '#111a2e'; ctx.fillRect(0, 0, width, height); ctx.restore(); } });
}
function teamColor(hex, alpha) { const h = (hex || 'e10600').replace('#', ''); if (alpha == null) return '#' + h; const n = parseInt(h, 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${alpha})`; }

/* ---- analytics.js ---- */
/* F1 Data Hub \u2014 session analytics (OpenF1 data) */
'use strict';

function of1Headers() { const t = Store.get('of1token'); return t && t.exp > Date.now() ? { Authorization: 'Bearer ' + t.token } : {}; }
async function of1Login() {
  const u = Settings.get('openf1User'), p = Settings.get('openf1Pass'); if (!u || !p) return false;
  const r = await Platform.http('https://api.openf1.org/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `username=${encodeURIComponent(u)}&password=${encodeURIComponent(p)}` });
  if (!r.ok) return false;
  const j = JSON.parse(r.text); Store.set('of1token', { token: j.access_token, exp: Date.now() + ((+j.expires_in || 3600) - 120) * 1000 }); return true;
}
async function of1(path, ttl = 300) {
  if (Settings.get('openf1User') && !of1Headers().Authorization) await of1Login().catch(() => {});
  return getJSON(`${OPENF1}/${path}`, { ttl, headers: of1Headers(), gap: 350 });
}

const SEG = { 2048: 'y', 2049: 'g', 2051: 'p', 2064: 'pit', 2052: 'x' };

async function loadSessionData(session, live = false) {
  const sk = session.session_key; const ttl = live ? 3 : (new Date(session.date_end) < Date.now() - 3 * 3600e3 ? 86400 : 60);
  const safe = p => p.catch(() => []);
  const [drivers, laps, weather, results, stints] = await Promise.all([
    of1(`drivers?session_key=${sk}`, ttl), of1(`laps?session_key=${sk}`, ttl), safe(of1(`weather?session_key=${sk}`, ttl)),
    safe(of1(`session_result?session_key=${sk}`, ttl)), safe(of1(`stints?session_key=${sk}`, ttl))]);
  return processSession(session, drivers, laps, weather, results, stints);
}

function processSession(session, drivers, laps, weather, results, stints) {
  const D = {};
  for (const d of drivers) if (!D[d.driver_number]) D[d.driver_number] = { num: d.driver_number, acr: d.name_acronym || String(d.driver_number), name: d.full_name || d.broadcast_name || d.name_acronym, team: d.team_name || '\u2014', color: '#' + (d.team_colour || '888888').replace('#', ''), laps: [], all: [] };
  for (const l of laps) {
    const d = D[l.driver_number] || (D[l.driver_number] = { num: l.driver_number, acr: String(l.driver_number), name: '#' + l.driver_number, team: '\u2014', color: '#888888', laps: [], all: [] });
    d.all.push(l); if (l.lap_duration > 0) d.laps.push(l);
  }
  const stintOf = (num, lap) => (stints || []).find(s => s.driver_number === num && lap >= s.lap_start && lap <= (s.lap_end ?? 999));
  let sb = [Infinity, Infinity, Infinity], bestLap = Infinity, topSt = 0;
  for (const d of Object.values(D)) {
    d.all.sort((a, b) => a.lap_number - b.lap_number); d.laps.sort((a, b) => a.lap_number - b.lap_number);
    d.best = d.laps.reduce((m, l) => (!m || l.lap_duration < m.lap_duration ? l : m), null);
    d.bestS = [1, 2, 3].map(i => Math.min(...d.all.map(l => l['duration_sector_' + i]).filter(v => v > 0)));
    d.bestS = d.bestS.map(v => isFinite(v) ? v : null);
    d.ideal = d.bestS.every(v => v) ? d.bestS[0] + d.bestS[1] + d.bestS[2] : null;
    d.st = Math.max(0, ...d.all.map(l => l.st_speed || 0)); d.i1 = Math.max(0, ...d.all.map(l => l.i1_speed || 0)); d.i2 = Math.max(0, ...d.all.map(l => l.i2_speed || 0));
    d.purple = 0; d.green = 0; d.segCount = 0;
    for (const l of d.all) for (const k of ['segments_sector_1', 'segments_sector_2', 'segments_sector_3']) for (const v of (l[k] || [])) { if (v === 2051) d.purple++; if (v === 2049) d.green++; if (v) d.segCount++; }
    d.bestS.forEach((v, i) => { if (v && v < sb[i]) sb[i] = v; });
    if (d.best && d.best.lap_duration < bestLap) bestLap = d.best.lap_duration;
    if (d.st > topSt) topSt = d.st;
    d.compound = lap => (stintOf(d.num, lap) || {}).compound || '';
  }
  const list = Object.values(D).filter(d => d.all.length || (results || []).some(r => r.driver_number === d.num));
  return { session, D, list, laps, weather: (weather || []).sort((a, b) => new Date(a.date) - new Date(b.date)), results: (results || []).sort((a, b) => (a.position || 99) - (b.position || 99)), stints: stints || [], sb, bestLap, topSt };
}

const C = (t, c, s) => ({ t, c, s });
const cellT = x => (x && typeof x === 'object' && 't' in x) ? x.t : x;
const pctOf = (v, best) => v && best ? (v / best * 100).toFixed(2) + '%' : '\u2014';
function sessType(s) { const n = s.session_name || ''; if (/Sprint Q|Shootout/i.test(n)) return 'SQ'; if (/^Sprint$/i.test(n)) return 'SPRINT'; if (/Qualifying/i.test(n)) return 'Q'; if (/Race/i.test(n)) return 'R'; return 'FP'; }
function driverBars(arr, valFn, txtFn) { return arr.map(d => ({ label: d.acr, value: valFn(d), text: txtFn(d), color: d.color })); }

const VIEWS = {
  classification(S) {
    const t = sessType(S.session); const res = S.results;
    if (res.length && (t === 'Q' || t === 'SQ')) {
      const cols = ['Pos', 'No', 'Driver', 'Team', 'Q1', 'Q2', 'Q3', 'Gap', 'Laps'];
      const pole = res[0] && Array.isArray(res[0].duration) ? res[0].duration.filter(Boolean).slice(-1)[0] : null;
      const rows = res.map(r => { const d = S.D[r.driver_number] || {}; const du = Array.isArray(r.duration) ? r.duration : [r.duration]; const last = du.filter(Boolean).slice(-1)[0];
        return [r.position ?? (r.dnf ? 'DNF' : r.dns ? 'DNS' : r.dsq ? 'DSQ' : '\u2014'), r.driver_number, d.name || r.driver_number, d.team || '', lapStr(du[0]), lapStr(du[1]), lapStr(du[2]), r.position === 1 ? '\u2014' : gapStr(last && pole ? last - pole : null), r.number_of_laps ?? ''];
      });
      return { columns: cols, rows, chart: gapChart(res.map(r => { const d = S.D[r.driver_number] || {}; const du = (Array.isArray(r.duration) ? r.duration : [r.duration]).filter(Boolean); return { d, v: du.length && pole ? du[du.length - 1] - pole : null }; })),
        highlights: hl(S), bars: res.slice(0, 10).map(r => { const d = S.D[r.driver_number] || {}; const du = (Array.isArray(r.duration) ? r.duration : [r.duration]).filter(Boolean); return { label: d.acr || r.driver_number, value: du.slice(-1)[0] || 0, text: lapStr(du.slice(-1)[0]), color: d.color }; }) };
    }
    if (res.length && (t === 'R' || t === 'SPRINT')) {
      const cols = ['Pos', 'No', 'Driver', 'Team', 'Laps', 'Time / Gap', 'Status', 'Best lap'];
      const rows = res.map(r => { const d = S.D[r.driver_number] || {};
        const g = r.position === 1 ? (typeof r.duration === 'number' ? lapStr(r.duration) : '') : (typeof r.gap_to_leader === 'number' ? '+' + r.gap_to_leader.toFixed(3) : (r.gap_to_leader || ''));
        return [r.position ?? '\u2014', r.driver_number, d.name || r.driver_number, d.team || '', r.number_of_laps ?? '', g, r.dsq ? 'DSQ' : r.dns ? 'DNS' : r.dnf ? 'DNF' : 'Classified', lapStr(d.best && d.best.lap_duration)];
      });
      return { columns: cols, rows, chart: gapChart(res.map(r => ({ d: S.D[r.driver_number] || {}, v: typeof r.gap_to_leader === 'number' ? r.gap_to_leader : (r.position === 1 ? 0 : null) })), 'Gap to winner (s)'),
        pie: teamPie(S, 'Laps completed by team', d => (res.find(r => r.driver_number === d.num) || {}).number_of_laps || 0),
        highlights: hl(S), bars: res.slice(0, 10).map(r => { const d = S.D[r.driver_number] || {}; return { label: d.acr || r.driver_number, value: r.points || (11 - (r.position || 11)), text: 'P' + (r.position ?? '-'), color: d.color }; }) };
    }
    return VIEWS.fastest_laps(S, 'Classification');
  },
  fastest_laps(S) {
    const arr = S.list.filter(d => d.best).sort((a, b) => a.best.lap_duration - b.best.lap_duration);
    const rows = arr.map((d, i) => [i + 1, d.num, d.name, d.team, lapStr(d.best.lap_duration), i ? gapStr(d.best.lap_duration - S.bestLap) : '\u2014', pctOf(d.best.lap_duration, S.bestLap), d.best.lap_number, d.compound(d.best.lap_number), d.laps.length]);
    return { columns: ['Pos', 'No', 'Driver', 'Team', 'Best lap', 'Gap', '% of best', 'On lap', 'Tyre', 'Laps'], rows,
      chart: gapChart(arr.map(d => ({ d, v: d.best.lap_duration - S.bestLap })), 'Gap to fastest lap (s)'),
      pie: teamPie(S, 'Laps run by team', d => d.laps.length), highlights: hl(S), bars: driverBars(arr, d => d.best.lap_duration, d => lapStr(d.best.lap_duration)) };
  },
  potential_drivers(S) {
    const arr = S.list.filter(d => d.ideal).sort((a, b) => a.ideal - b.ideal); const top = arr[0] ? arr[0].ideal : 0;
    const rows = arr.map((d, i) => [i + 1, d.name, d.team, lapStr(d.ideal), i ? gapStr(d.ideal - top) : '\u2014', lapStr(d.best && d.best.lap_duration), d.best ? '-' + (d.best.lap_duration - d.ideal).toFixed(3) : '\u2014', lapStr(d.bestS[0]), lapStr(d.bestS[1]), lapStr(d.bestS[2])]);
    return { columns: ['Pos', 'Driver', 'Team', 'Ideal lap', 'Gap', 'Actual best', 'Time left on table', 'Best S1', 'Best S2', 'Best S3'], rows,
      chart: { type: 'bar', labels: arr.map(d => d.acr), datasets: [
        { label: 'Ideal lap gap (s)', data: arr.map(d => +(d.ideal - top).toFixed(3)), backgroundColor: arr.map(d => d.color) },
        { label: 'Actual best gap (s)', data: arr.map(d => d.best ? +(d.best.lap_duration - top).toFixed(3) : null), backgroundColor: arr.map(d => teamColor(d.color, 0.35)) }] },
      highlights: [{ label: 'Best potential', value: arr[0] ? lapStr(arr[0].ideal) : '\u2014', sub: arr[0] ? arr[0].name : '' }, ...hl(S).slice(0, 2)],
      bars: driverBars(arr, d => d.ideal, d => lapStr(d.ideal)) };
  },
  potential_teams(S) {
    const teams = {};
    for (const d of S.list) { const t = teams[d.team] || (teams[d.team] = { team: d.team, color: d.color, s: [null, null, null], best: null, drivers: [] }); t.drivers.push(d.acr);
      d.bestS.forEach((v, i) => { if (v && (!t.s[i] || v < t.s[i])) t.s[i] = v; }); if (d.best && (!t.best || d.best.lap_duration < t.best)) t.best = d.best.lap_duration; }
    const arr = Object.values(teams).map(t => Object.assign(t, { ideal: t.s.every(Boolean) ? t.s[0] + t.s[1] + t.s[2] : null })).filter(t => t.ideal).sort((a, b) => a.ideal - b.ideal);
    const top = arr[0] ? arr[0].ideal : 0;
    const rows = arr.map((t, i) => [i + 1, t.team, t.drivers.join(' / '), lapStr(t.ideal), i ? gapStr(t.ideal - top) : '\u2014', lapStr(t.best), lapStr(t.s[0]), lapStr(t.s[1]), lapStr(t.s[2])]);
    return { columns: ['Pos', 'Team', 'Drivers', 'Team ideal lap', 'Gap', 'Best actual', 'Best S1', 'Best S2', 'Best S3'], rows,
      chart: { type: 'bar', labels: arr.map(t => t.team), datasets: [{ label: 'Team ideal gap (s)', data: arr.map(t => +(t.ideal - top).toFixed(3)), backgroundColor: arr.map(t => t.color) }] },
      highlights: [{ label: 'Quickest package', value: arr[0] ? arr[0].team : '\u2014', sub: arr[0] ? lapStr(arr[0].ideal) : '' }],
      bars: arr.map(t => ({ label: t.team.slice(0, 12), value: t.ideal, text: lapStr(t.ideal), color: t.color })) };
  },
  best_sectors(S) {
    const rows = []; const ds = [];
    const per = [0, 1, 2].map(i => S.list.filter(d => d.bestS[i]).sort((a, b) => a.bestS[i] - b.bestS[i]));
    const n = Math.max(...per.map(p => p.length));
    for (let k = 0; k < n; k++) rows.push([k + 1, ...[0, 1, 2].flatMap(i => { const d = per[i][k]; return d ? [C(d.acr, '', `border-left:4px solid ${d.color}`), C(lapStr(d.bestS[i]), k === 0 ? 'purple' : ''), k ? gapStr(d.bestS[i] - S.sb[i]) : '\u2014'] : ['', '', '']; })]);
    const order = S.list.filter(d => d.ideal).sort((a, b) => a.ideal - b.ideal);
    [0, 1, 2].forEach(i => ds.push({ label: `S${i + 1} gap (s)`, data: order.map(d => +(d.bestS[i] - S.sb[i]).toFixed(3)), backgroundColor: PALETTE[i] }));
    return { columns: ['#', 'S1 driver', 'S1', 'Gap', 'S2 driver', 'S2', 'Gap', 'S3 driver', 'S3', 'Gap'], rows,
      chart: { type: 'bar', labels: order.map(d => d.acr), datasets: ds },
      highlights: [0, 1, 2].map(i => ({ label: `Best S${i + 1}`, value: lapStr(S.sb[i]), sub: per[i][0] ? per[i][0].name : '' })),
      bars: order.map(d => ({ label: d.acr, value: d.ideal, text: lapStr(d.ideal), color: d.color })) };
  },
  best_laps_sectors(S) {
    const arr = S.list.filter(d => d.best).sort((a, b) => a.best.lap_duration - b.best.lap_duration);
    const col = (v, i, d) => !v ? '' : Math.abs(v - S.sb[i]) < 1e-4 ? 'purple' : Math.abs(v - d.bestS[i]) < 1e-4 ? 'green' : 'yellow';
    const rows = arr.map((d, k) => { const b = d.best; const s = [b.duration_sector_1, b.duration_sector_2, b.duration_sector_3];
      return [k + 1, C(d.name, '', `border-left:4px solid ${d.color}`), d.team, C(lapStr(b.lap_duration), k === 0 ? 'purple' : ''), ...s.map((v, i) => C(lapStr(v), col(v, i, d))), ...d.bestS.map((v, i) => C(lapStr(v), Math.abs((v || 0) - S.sb[i]) < 1e-4 ? 'purple' : 'green')), lapStr(d.ideal)]; });
    return { columns: ['Pos', 'Driver', 'Team', 'Best lap', 'S1 (lap)', 'S2 (lap)', 'S3 (lap)', 'PB S1', 'PB S2', 'PB S3', 'Ideal'], rows,
      chart: { type: 'bar', stacked: true, labels: arr.map(d => d.acr), datasets: [0, 1, 2].map(i => ({ label: `S${i + 1}`, data: arr.map(d => d.best['duration_sector_' + (i + 1)]), backgroundColor: PALETTE[i] })) },
      legendNote: 'Purple = session best \u00b7 Green = personal best \u00b7 Yellow = slower than personal best', highlights: hl(S), bars: driverBars(arr, d => d.best.lap_duration, d => lapStr(d.best.lap_duration)) };
  },
  lap_evolution(S, opts) {
    const arr = S.list.filter(d => d.best).sort((a, b) => a.best.lap_duration - b.best.lap_duration);
    const chosen = opts.drivers && opts.drivers.length ? arr.filter(d => opts.drivers.includes(d.num)) : arr.slice(0, 6);
    const maxLap = Math.max(1, ...arr.map(d => d.all.length ? d.all[d.all.length - 1].lap_number : 0));
    const labels = Array.from({ length: maxLap }, (_, i) => i + 1);
    const ok = (d, l) => l.lap_duration > 0 && !l.is_pit_out_lap && (!opts.hideSlow || l.lap_duration < d.best.lap_duration * 1.07);
    const datasets = chosen.map(d => ({ label: d.acr, data: labels.map(n => { const l = d.all.find(x => x.lap_number === n); return l && ok(d, l) ? +l.lap_duration.toFixed(3) : null; }), borderColor: d.color, backgroundColor: d.color, spanGaps: true, tension: 0.25, pointRadius: 2 }));
    const rows = []; for (const d of chosen) for (const l of d.all) rows.push([d.acr, l.lap_number, lapStr(l.lap_duration), l.lap_duration ?? '', l.is_pit_out_lap ? 'Pit out' : '', d.compound(l.lap_number)]);
    return { columns: ['Driver', 'Lap', 'Lap time', 'Seconds', 'Note', 'Tyre'], rows, driverPicker: true, slowToggle: true,
      chart: { type: 'line', labels, datasets, yTitle: 'Lap time (s)', xTitle: 'Lap' }, noPieReason: 'time series',
      highlights: hl(S), bars: driverBars(chosen, d => d.best.lap_duration, d => lapStr(d.best.lap_duration)) };
  },
  minisectors(S) {
    const arr = S.list.filter(d => d.best).sort((a, b) => a.best.lap_duration - b.best.lap_duration);
    const html = [`<div class="mini-grid">`];
    for (const d of arr) {
      const segs = ['segments_sector_1', 'segments_sector_2', 'segments_sector_3'].map(k => d.best[k] || []);
      html.push(`<div class="mini-row"><span class="mini-name" style="border-left:4px solid ${d.color}">${esc(d.acr)}</span><span class="mini-cells">${segs.map(sg => `<span class="mini-sector">${sg.map(v => `<i class="seg seg-${SEG[v] || 'n'}"></i>`).join('')}</span>`).join('')}</span><span class="mini-count">${d.purple}</span></div>`);
    }
    html.push(`</div><p class="note">Each block is a mini-sector of the driver's best lap. Purple = overall fastest at that moment, green = personal best, yellow = slower. Right column: purple mini-sectors set across the whole session.</p>`);
    const byP = [...arr].sort((a, b) => b.purple - a.purple);
    const rows = byP.map(d => [d.acr, d.name, d.team, d.purple, d.green, d.segCount, d.segCount ? (d.purple / d.segCount * 100).toFixed(1) + '%' : '\u2014']);
    return { columns: ['Driver', 'Name', 'Team', 'Purple mini-sectors', 'Green mini-sectors', 'Mini-sectors logged', 'Purple share'], rows, customHtml: html.join(''),
      chart: { type: 'bar', labels: byP.map(d => d.acr), datasets: [{ label: 'Purple mini-sectors', data: byP.map(d => d.purple), backgroundColor: '#a855f7' }, { label: 'Green mini-sectors', data: byP.map(d => d.green), backgroundColor: '#16c784' }] },
      pie: { title: 'Share of purple mini-sectors', labels: byP.filter(d => d.purple).map(d => d.acr), values: byP.filter(d => d.purple).map(d => d.purple), colors: byP.filter(d => d.purple).map(d => d.color) },
      highlights: [{ label: 'Most purple', value: byP[0] ? byP[0].acr : '\u2014', sub: byP[0] ? byP[0].purple + ' mini-sectors' : '' }], bars: driverBars(byP, d => d.purple, d => d.purple + ' purple') };
  },
  top_speed(S) {
    const arr = S.list.filter(d => d.st).sort((a, b) => b.st - a.st);
    const rows = arr.map((d, i) => [i + 1, d.name, d.team, d.st, d.i1 || '\u2014', d.i2 || '\u2014', (d.st - arr[0].st).toFixed(0)]);
    return { columns: ['Pos', 'Driver', 'Team', 'Speed trap (km/h)', 'Intermediate 1', 'Intermediate 2', '\u0394 to top'], rows,
      chart: { type: 'bar', labels: arr.map(d => d.acr), datasets: [{ label: 'Speed trap (km/h)', data: arr.map(d => d.st), backgroundColor: arr.map(d => d.color) }], yMin: Math.max(0, Math.min(...arr.map(d => d.st)) - 10) },
      pie: teamPie(S, 'Top speed by team (km/h)', d => d.st, 'max'),
      highlights: [{ label: 'Top speed', value: arr[0] ? arr[0].st + ' km/h' : '\u2014', sub: arr[0] ? arr[0].name : '' }, ...hl(S).slice(0, 2)],
      bars: driverBars(arr, d => d.st, d => d.st + ' km/h') };
  },
  speed_vs_lap(S) {
    const arr = S.list.filter(d => d.st && d.best);
    const rows = arr.map(d => [d.name, d.team, d.st, lapStr(d.best.lap_duration), +d.best.lap_duration.toFixed(3)]);
    return { columns: ['Driver', 'Team', 'Top speed (km/h)', 'Best lap', 'Best lap (s)'], rows,
      chart: { type: 'scatter', datasets: arr.map(d => ({ label: d.acr, data: [{ x: d.st, y: +d.best.lap_duration.toFixed(3) }], backgroundColor: d.color, pointRadius: 7 })), xTitle: 'Top speed (km/h)', yTitle: 'Best lap (s)' },
      noPieReason: 'scatter', highlights: hl(S), bars: driverBars(arr.sort((a, b) => b.st - a.st), d => d.st, d => d.st + ' km/h') };
  },
  driver_times(S, opts) {
    const arr = S.list.filter(d => d.all.length).sort((a, b) => (a.best ? a.best.lap_duration : 999) - (b.best ? b.best.lap_duration : 999));
    const d = arr.find(x => x.num === opts.driver) || arr[0]; if (!d) return emptyView();
    const rows = d.all.map(l => [l.lap_number, C(lapStr(l.lap_duration), d.best && l.lap_number === d.best.lap_number ? 'purple' : ''), ...[1, 2, 3].map(i => { const v = l['duration_sector_' + i]; return C(lapStr(v), v && Math.abs(v - S.sb[i - 1]) < 1e-4 ? 'purple' : v && Math.abs(v - d.bestS[i - 1]) < 1e-4 ? 'green' : ''); }), l.i1_speed ?? '', l.i2_speed ?? '', l.st_speed ?? '', d.compound(l.lap_number), l.is_pit_out_lap ? 'Pit out' : '']);
    return { columns: ['Lap', 'Lap time', 'S1', 'S2', 'S3', 'I1 km/h', 'I2 km/h', 'ST km/h', 'Tyre', 'Note'], rows, singleDriver: arr, driver: d.num,
      chart: { type: 'line', labels: d.all.map(l => l.lap_number), datasets: [{ label: d.acr + ' lap time (s)', data: d.all.map(l => l.lap_duration && !l.is_pit_out_lap ? +l.lap_duration.toFixed(3) : null), borderColor: d.color, backgroundColor: d.color, spanGaps: true, tension: 0.2 }], xTitle: 'Lap', yTitle: 'Seconds' },
      pie: (() => { const c = {}; d.all.forEach(l => { const k = d.compound(l.lap_number) || 'Unknown'; c[k] = (c[k] || 0) + 1; }); return { title: d.acr + ' laps per compound', labels: Object.keys(c), values: Object.values(c), colors: Object.keys(c).map(tyreColor) }; })(),
      highlights: [{ label: d.acr + ' best', value: lapStr(d.best && d.best.lap_duration), sub: d.best ? 'Lap ' + d.best.lap_number : '' }, { label: 'Laps', value: String(d.all.length) }, { label: 'Top speed', value: d.st + ' km/h' }],
      bars: d.laps.slice().sort((a, b) => a.lap_duration - b.lap_duration).slice(0, 10).map(l => ({ label: 'Lap ' + l.lap_number, value: l.lap_duration, text: lapStr(l.lap_duration), color: d.color })) };
  },
  lap_matrix(S) {
    const arr = S.list.filter(d => d.best).sort((a, b) => a.best.lap_duration - b.best.lap_duration);
    const maxLap = Math.max(1, ...arr.map(d => d.all.length ? d.all[d.all.length - 1].lap_number : 0));
    const cols = ['Driver', ...Array.from({ length: maxLap }, (_, i) => 'L' + (i + 1))];
    const rows = arr.map(d => [C(d.acr, '', `border-left:4px solid ${d.color}`), ...Array.from({ length: maxLap }, (_, i) => {
      const l = d.all.find(x => x.lap_number === i + 1); if (!l || !l.lap_duration) return C(l && l.is_pit_out_lap ? 'OUT' : '', 'mx-empty');
      const r = (l.lap_duration - S.bestLap) / (S.bestLap * 0.06); const hue = 140 - clamp(r, 0, 1) * 140;
      return C(lapStr(l.lap_duration), l.lap_duration === S.bestLap ? 'purple' : '', `background:hsla(${hue},70%,40%,0.55)`);
    })]);
    return { columns: cols, rows, wide: true, chart: null, noPieReason: 'matrix', highlights: hl(S), bars: driverBars(arr, d => d.best.lap_duration, d => lapStr(d.best.lap_duration)) };
  },
  weather(S) {
    const w = S.weather; if (!w.length) return emptyView('No weather samples for this session.');
    const labels = w.map(x => fmtTime(new Date(x.date)));
    const rows = w.map(x => [fmtDateTime(new Date(x.date)), x.air_temperature, x.track_temperature, x.humidity, x.pressure, x.wind_speed, x.wind_direction, x.rainfall ? 'Yes' : 'No']);
    const avg = k => (w.reduce((s, x) => s + (+x[k] || 0), 0) / w.length).toFixed(1);
    return { columns: ['Time (local)', 'Air \u00b0C', 'Track \u00b0C', 'Humidity %', 'Pressure mbar', 'Wind m/s', 'Wind dir \u00b0', 'Rain'], rows,
      chart: { type: 'line', labels, datasets: [
        { label: 'Air \u00b0C', data: w.map(x => x.air_temperature), borderColor: '#00b8d9', backgroundColor: '#00b8d9', tension: 0.3, pointRadius: 0 },
        { label: 'Track \u00b0C', data: w.map(x => x.track_temperature), borderColor: '#e10600', backgroundColor: '#e10600', tension: 0.3, pointRadius: 0 },
        { label: 'Humidity %', data: w.map(x => x.humidity), borderColor: '#16c784', backgroundColor: '#16c784', tension: 0.3, pointRadius: 0, yAxisID: 'y2' },
        { label: 'Wind m/s', data: w.map(x => x.wind_speed), borderColor: '#f5a623', backgroundColor: '#f5a623', tension: 0.3, pointRadius: 0, yAxisID: 'y2' }], dualAxis: true },
      pie: (() => { const wet = w.filter(x => x.rainfall).length; return { title: 'Rain samples', labels: ['Dry', 'Rain'], values: [w.length - wet, wet], colors: ['#f5a623', '#1f6feb'] }; })(),
      highlights: [{ label: 'Avg air', value: avg('air_temperature') + ' \u00b0C' }, { label: 'Avg track', value: avg('track_temperature') + ' \u00b0C' }, { label: 'Rain', value: w.some(x => x.rainfall) ? 'Yes' : 'Dry' }], bars: [] };
  },
  tyres(S) {
    const st = S.stints; if (!st.length) return emptyView('No tyre stint data for this session.');
    const arr = S.list.filter(d => st.some(s => s.driver_number === d.num));
    const comps = [...new Set(st.map(s => s.compound || 'UNKNOWN'))];
    const datasets = []; const maxStints = Math.max(...arr.map(d => st.filter(s => s.driver_number === d.num).length));
    for (let k = 0; k < maxStints; k++) datasets.push({ label: 'Stint ' + (k + 1), data: arr.map(d => { const s = st.filter(x => x.driver_number === d.num).sort((a, b) => a.stint_number - b.stint_number)[k]; return s ? (s.lap_end - s.lap_start + 1) : null; }),
      backgroundColor: arr.map(d => { const s = st.filter(x => x.driver_number === d.num).sort((a, b) => a.stint_number - b.stint_number)[k]; return s ? tyreColor(s.compound) : 'transparent'; }), borderColor: '#0b1220', borderWidth: 2 });
    const laps = {}; st.forEach(s => { const k = s.compound || 'UNKNOWN'; laps[k] = (laps[k] || 0) + (s.lap_end - s.lap_start + 1); });
    const rows = st.slice().sort((a, b) => a.driver_number - b.driver_number || a.stint_number - b.stint_number).map(s => { const d = S.D[s.driver_number] || {}; return [d.acr || s.driver_number, s.stint_number, s.compound, s.lap_start, s.lap_end, s.lap_end - s.lap_start + 1, s.tyre_age_at_start]; });
    return { columns: ['Driver', 'Stint', 'Compound', 'From lap', 'To lap', 'Laps', 'Tyre age at start'], rows,
      chart: { type: 'bar', indexAxis: 'y', stacked: true, labels: arr.map(d => d.acr), datasets, xTitle: 'Laps' },
      pie: { title: 'Laps by compound', labels: Object.keys(laps), values: Object.values(laps), colors: Object.keys(laps).map(tyreColor) },
      highlights: Object.entries(laps).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => ({ label: k, value: v + ' laps' })), bars: [] };
  },
};
VIEWS.race_pace = function (S, opts) {
  const arr = S.list.filter(d => d.all.length);
  const maxLap = Math.max(1, ...arr.map(d => d.all.length ? d.all[d.all.length - 1].lap_number : 0));
  // position after lap n = order in which drivers started lap n+1 (lap timestamps), falling back to cumulative time
  const pos = {}; arr.forEach(d => pos[d.num] = []);
  for (let n = 1; n <= maxLap; n++) {
    const done = arr.map(d => { const nx = d.all.find(l => l.lap_number === n + 1); const cur = d.all.find(l => l.lap_number === n);
      const t = nx && nx.date_start ? new Date(nx.date_start).getTime() : (cur && cur.date_start && cur.lap_duration ? new Date(cur.date_start).getTime() + cur.lap_duration * 1000 : null); return { d, t }; })
      .filter(x => x.t != null).sort((a, b) => a.t - b.t);
    done.forEach((x, i) => pos[x.d.num][n - 1] = i + 1);
  }
  const all = S.list.flatMap(d => d.laps.map(l => ({ d, l }))).filter(x => !x.l.is_pit_out_lap).sort((a, b) => a.l.lap_duration - b.l.lap_duration).slice(0, 20);
  const rows = all.map((x, i) => [i + 1, C(x.d.name, '', `border-left:4px solid ${x.d.color}`), x.d.team, x.l.lap_number, C(lapStr(x.l.lap_duration), i === 0 ? 'purple' : (x.d.best && x.l.lap_number === x.d.best.lap_number ? 'green' : '')), x.d.compound(x.l.lap_number)]);
  const chosen = opts.drivers && opts.drivers.length ? arr.filter(d => opts.drivers.includes(d.num)) : arr;
  return { columns: ['Pos', 'Driver', 'Team', 'Lap', 'Time', 'Tyre'], rows, driverPicker: true,
    chart: { type: 'line', labels: Array.from({ length: maxLap }, (_, i) => i + 1), datasets: chosen.map(d => ({ label: d.acr, data: pos[d.num], borderColor: d.color, backgroundColor: d.color, pointRadius: 0, tension: .15, spanGaps: true })), xTitle: 'Lap', yTitle: 'Position', reverseY: true },
    legendNote: 'Position evolution (top) and the 20 fastest laps of the session (purple = fastest, green = that driver\'s personal best).', noPieReason: 'time series',
    highlights: hl(S), bars: all.slice(0, 10).map(x => ({ label: x.d.acr, value: x.l.lap_duration, text: lapStr(x.l.lap_duration), color: x.d.color })) };
};
function tyreColor(c) { return ({ SOFT: '#e10600', MEDIUM: '#ffd400', HARD: '#f2f2f2', INTERMEDIATE: '#16c784', WET: '#1f6feb' })[String(c).toUpperCase()] || '#888'; }
function emptyView(msg = 'No data for this view yet.') { return { columns: [], rows: [], empty: msg, highlights: [], bars: [] }; }
function gapChart(items, label = 'Gap to leader (s)') {
  const it = items.filter(x => x.v != null);
  return { type: 'bar', labels: it.map(x => x.d.acr || x.d.num), datasets: [{ label, data: it.map(x => +x.v.toFixed(3)), backgroundColor: it.map(x => x.d.color || '#888') }] };
}
function teamPie(S, title, fn, agg = 'sum') {
  const t = {}; for (const d of S.list) { const v = +fn(d) || 0; if (!t[d.team]) t[d.team] = { v: agg === 'max' ? 0 : 0, c: d.color }; t[d.team].v = agg === 'max' ? Math.max(t[d.team].v, v) : t[d.team].v + v; }
  const e = Object.entries(t).filter(([, x]) => x.v > 0).sort((a, b) => b[1].v - a[1].v);
  return { title, labels: e.map(([k]) => k), values: e.map(([, x]) => x.v), colors: e.map(([, x]) => x.c) };
}
function hl(S) {
  const f = S.list.filter(d => d.best).sort((a, b) => a.best.lap_duration - b.best.lap_duration)[0];
  const sp = S.list.filter(d => d.st).sort((a, b) => b.st - a.st)[0];
  const w = S.weather.length ? S.weather[S.weather.length - 1] : null;
  return [{ label: 'Fastest lap', value: f ? lapStr(f.best.lap_duration) : '\u2014', sub: f ? f.name : '' }, { label: 'Top speed', value: sp ? sp.st + ' km/h' : '\u2014', sub: sp ? sp.name : '' },
    { label: 'Track temp', value: w ? w.track_temperature + ' \u00b0C' : '\u2014', sub: w ? `Air ${w.air_temperature} \u00b0C` : '' }];
}

/* ---------- chart config builder ---------- */
function chartConfig(view, kind) {
  if (['pie', 'doughnut', 'polarArea'].includes(kind) && view.pie) {
    return { type: kind, data: { labels: view.pie.labels, datasets: [{ data: view.pie.values, backgroundColor: view.pie.colors || PALETTE, borderColor: cssVar('--panel'), borderWidth: 2 }] },
      options: { responsive: true, maintainAspectRatio: false, animation: false, plugins: { title: { display: true, text: view.pie.title, color: cssVar('--text') }, legend: { position: 'right' } } } };
  }
  const c = view.chart; if (!c) return null;
  let type = c.type, indexAxis = c.indexAxis || 'x';
  if (kind === 'hbar' && c.type === 'bar') indexAxis = 'y';
  if (kind === 'line' && c.type === 'bar') type = 'line';
  if (kind === 'bar' && c.type === 'line') type = 'bar';
  const scales = {};
  if (type !== 'scatter') {
    const val = indexAxis === 'y' ? 'x' : 'y', cat = indexAxis === 'y' ? 'y' : 'x';
    scales[val] = { stacked: !!c.stacked, title: { display: !!c.yTitle, text: c.yTitle }, min: c.yMin, reverse: !!c.reverseY };
    scales[cat] = { stacked: !!c.stacked, title: { display: !!c.xTitle, text: c.xTitle }, ticks: { autoSkip: true } };
    if (c.dualAxis) scales.y2 = { position: 'right', grid: { drawOnChartArea: false } };
  } else { scales.x = { title: { display: true, text: c.xTitle } }; scales.y = { title: { display: true, text: c.yTitle } }; }
  return { type, data: { labels: c.labels, datasets: c.datasets.map(d => Object.assign({ borderRadius: type === 'bar' ? 4 : 0 }, d)) },
    options: { responsive: true, maintainAspectRatio: false, animation: false, indexAxis, scales, interaction: { mode: type === 'scatter' ? 'nearest' : 'index', intersect: false },
      plugins: { legend: { display: c.datasets.length > 1 || type === 'scatter', labels: { boxWidth: 12 } } } } };
}

/* ---- feed.js ---- */
/* F1 Data Hub \u2014 live broadcaster TV listings + channel logos from the ASBH feed
   (github.com/Kigakhemet98/asbh-feed: built several times a day from the SuperSport, beIN SPORTS and Sport 24 live guides). */
'use strict';

const ASBH_RAW = 'https://raw.githubusercontent.com/Kigakhemet98/asbh-feed/main/';
const FEED_URL = ASBH_RAW + 'feed.json';
const CHANNELS_URL = ASBH_RAW + 'channels.json';
const SUPPORT_RX = /chequered|notebook|paddock|build ?up|f1 show|uncut|highlights|review|preview|replay|rpt|\(r\)/i;

// app broadcaster key -> logo id, and feed channel id -> app broadcaster key
const BC_LOGO = { supersport: 'ss-motorsport', ss_maximo: 'ss-maximo-1', ss_grandstand: 'ss-grandstand', canal_af: 'cplus-sport-4', canal_sport: 'cplus-sport-4', canal_fr: 'canalplus',
  f1tv: 'f1tv', sport24: 'sport24', sport24x: 'sport24-extra', bein: 'bein-sports', bein_mena: 'bein-sports' };
const PLATFORM_LOGO = { DStv: 'dstv', 'DStv Stream': 'dstv-stream', 'CANAL+': 'canalplus', 'beIN CONNECT': 'bein-connect', 'F1 TV': 'f1tv', 'SPORT 24': 'sport24' };
function chanFamily(id) {
  if (/^ss-maximo/.test(id)) return 'ss_maximo'; if (id === 'ss-grandstand') return 'ss_grandstand'; if (/^ss-/.test(id)) return 'supersport';
  if (/^s24-extra/.test(id)) return 'sport24x'; if (/^s24/.test(id)) return 'sport24';
  if (/^bein/.test(id)) return 'bein'; if (/^(cp|canal)/.test(id)) return 'canal_af'; return id;
}
const CH_NAMES = { 'ss-motorsport': 'SuperSport Motorsport', 'ss-maximo-1': 'SuperSport M\u00e1ximo 1', 'ss-maximo-2': 'SuperSport M\u00e1ximo 2', 'ss-grandstand': 'SuperSport Grandstand',
  'bein-8': 'beIN SPORTS 8', 'bein-4k': 'beIN SPORTS 4K', 'bein-1': 'beIN SPORTS 1', 'bein-english-1': 'beIN SPORTS 1 English', 'bein-english-2': 'beIN SPORTS 2 English', 's24': 'Sport 24', 's24-extra': 'Sport 24 Extra' };

/* ---------- feed loading (cached on device, refreshed every 15 min) ---------- */
let FEED = null;
async function loadFeed(force = false) {
  const c = Store.get('asbhfeed');
  if (!force && c && Date.now() - c.t < 15 * 60e3) return (FEED = c.v);
  try {
    const r = await Platform.http(FEED_URL + '?t=' + Math.floor(Date.now() / 300e3));
    if (!r.ok) throw new Error('feed HTTP ' + r.status);
    const f = JSON.parse(r.text);
    let names = {}; try { const cr = await Platform.http(CHANNELS_URL); if (cr.ok) JSON.parse(cr.text).forEach(x => names[x.id] = { name: x.name, num: x.num, provider: x.provider }); } catch {}
    const chans = {}; (f.channels || []).forEach(x => chans[x.id] = Object.assign({}, names[x.id] || {}, x));
    Object.entries(names).forEach(([id, x]) => { if (!chans[id]) chans[id] = Object.assign({ id }, x); });
    const f1 = (f.events || []).filter(e => e.sport === 'f1' || /formula ?1|\bf1\b/i.test(`${e.comp} ${e.detail}`));
    const used = new Set(f1.flatMap(e => e.channels)); const ch = {}; used.forEach(id => ch[id] = chans[id] || { id });
    const v = { updated: f.updated, app: f.app, events: f1, channels: ch, sources: f.sources ? Object.fromEntries(Object.entries(f.sources).map(([k, s]) => [k, { ok: s.ok, at: s.at }])) : {} };
    Store.set('asbhfeed', { t: Date.now(), v }); return (FEED = v);
  } catch (e) { if (c) return (FEED = c.v); return (FEED = null); }
}
function chanInfo(id) {
  const c = (FEED && FEED.channels[id]) || { id };
  const name = c.name || CH_NAMES[id] || id; const num = c.num || '';
  return { id, name, short: name.replace(/^SuperSport /, 'SS ').replace(/^beIN SPORTS /, 'beIN '), num, family: chanFamily(id), logos: c.logos || (c.logo ? { light: c.logo, dark: c.logo } : null) };
}

/* ---------- match listings to calendar sessions ---------- */
function attachLive(cal) {
  if (!FEED || !FEED.events.length) return cal;
  for (const ev of cal) for (const s of ev.sessions) {
    const t0 = s.start.getTime(), t1 = s.end.getTime();
    const hits = FEED.events.filter(e => { const a = new Date(e.start).getTime(), b = new Date(e.end).getTime();
      return !SUPPORT_RX.test(e.detail || '') && a >= t0 - 150 * 60e3 && a <= t0 + 20 * 60e3 && b > t0; });
    if (!hits.length) { s.live = null; continue; }
    const per = {};
    for (const h of hits) for (const id of h.channels) { const st = new Date(h.start); if (!per[id] || st < per[id].start) per[id] = { start: st, end: new Date(h.end) }; }
    const channels = Object.entries(per).map(([id, w]) => Object.assign(chanInfo(id), w)).sort((a, b) => a.start - b.start || famRank(a.family) - famRank(b.family));
    s.live = { onAir: new Date(Math.min(...channels.map(c => c.start))), channels, via: [...new Set(hits.map(h => h.via))].join(' \u00b7 '), updated: FEED.updated };
  }
  return cal;
}
function famRank(f) { return ['supersport', 'ss_maximo', 'ss_grandstand', 'bein', 'sport24x', 'sport24', 'canal_af'].indexOf(f) + 1 || 9; }
// Live-guide on-air time for a broadcaster family, or null.
function liveOnAir(s, b) {
  if (!s.live || !b) return null; const fam = b.key === 'bein_mena' ? 'bein' : b.key;
  const c = s.live.channels.find(x => x.family === fam || (fam === 'supersport' && x.family === 'ss_maximo'));
  return c ? c : null;
}

/* ---------- logos ---------- */
const _logoMem = {};
function logoUrl(logoId, dark = true) {
  if (!logoId) return null;
  return LOGO_DATA[logoId + (dark ? '@dark' : '@light')] || LOGO_DATA[logoId] || LOGO_DATA[logoId + (dark ? '@light' : '@dark')] || Store.get('logo:' + logoId) || null;
}
function chanLogoId(c) { return c.id && (LOGO_DATA[c.id] || LOGO_DATA[c.id + '@dark']) ? c.id : (c.id === 's24-extra' ? 'sport24-extra' : c.id === 's24' ? 'sport24' : c.id); }
function bcLogoId(key) { return BC_LOGO[key] || null; }
// Fetch a logo the app doesn't have yet (e.g. a channel added to the feed later) and keep it on the device.
async function ensureLogo(id, url) {
  if (!id || logoUrl(id) || _logoMem[id]) return logoUrl(id);
  _logoMem[id] = true; const src = url || `${ASBH_RAW}logos/readme/channels/${id}.png`;
  try { const d = await Platform.httpDataUrl(src); if (d) { Store.set('logo:' + id, d); return d; } } catch {}
  return null;
}
function isDarkTheme() { return document.documentElement.dataset.theme !== 'light'; }
function logoImg(logoId, alt, cls = 'logo-chip') { const u = logoUrl(logoId, true); return u ? `<img class="${cls}" src="${u}" alt="${esc(alt || '')}" title="${esc(alt || '')}">` : `<span class="logo-txt">${esc(alt || logoId)}</span>`; }
const _imgCache = {};
function loadImg(src) { if (!src) return Promise.resolve(null); if (_imgCache[src]) return _imgCache[src]; const im = new Image(); im.src = src; return (_imgCache[src] = im.decode().then(() => im).catch(() => null)); }

/* ---- cars.js ---- */
/* F1 Data Hub \u2014 2026 car artwork.
   Side renders: your repo (asbh-feed/f1hub/cars/...) first, then the official formula1.com car images, then drawn 2026 liveries.
   Top views (grid / results graphics): your repo first, then drawn 2026 liveries. Images are cached on the device. */
'use strict';

// [primary, secondary, accent] \u2014 2026 liveries
const LIVERY = {
  mercedes: ['#c3c7cb', '#0b0d10', '#00d2be'], ferrari: ['#dc0000', '#f4f4f4', '#141414'], red_bull: ['#16213f', '#d6001c', '#ffc906'],
  mclaren: ['#ff8000', '#14181f', '#47c7fc'], aston_martin: ['#00594f', '#cedc00', '#0b0d10'], alpine: ['#0a2d6e', '#ff87bc', '#2173e3'],
  williams: ['#0b2a5c', '#ffffff', '#00a3e0'], rb: ['#f4f6fa', '#1534cc', '#ff1e1e'], haas: ['#f2f2f2', '#121212', '#e6002b'],
  audi: ['#b9bcbf', '#121212', '#ff2d1e'], cadillac: ['#111214', '#f4f4f4', '#a7a9ac'],
};
const F1_SLUGS = { mercedes: ['mercedes'], ferrari: ['ferrari'], red_bull: ['redbullracing'], mclaren: ['mclaren'], aston_martin: ['astonmartin'], alpine: ['alpine'],
  williams: ['williams'], rb: ['racingbulls', 'rb'], haas: ['haasf1team', 'haas'], audi: ['audi', 'kicksauber'], cadillac: ['cadillac'] };
function teamKey(idOrName) {
  const s = String(idOrName || '').toLowerCase().replace(/[^a-z_ ]/g, ' ');
  if (/racing bulls|\brb\b|visa|alphatauri|toro rosso|racing_bulls/.test(s)) return 'rb';
  if (/red ?_?bull/.test(s)) return 'red_bull';
  if (/mercedes/.test(s)) return 'mercedes'; if (/ferrari/.test(s)) return 'ferrari'; if (/mclaren/.test(s)) return 'mclaren';
  if (/aston/.test(s)) return 'aston_martin'; if (/alpine/.test(s)) return 'alpine'; if (/williams/.test(s)) return 'williams';
  if (/haas/.test(s)) return 'haas'; if (/audi|sauber|kick/.test(s)) return 'audi'; if (/cadillac/.test(s)) return 'cadillac';
  return null;
}
function livery(key, fallback = '#e10600') { return LIVERY[key] || [fallback, shade(fallback, -0.5), shade(fallback, 0.4)]; }

/* ---------- drawn 2026 cars (team livery) ---------- */
function carSide2026(key, fallback) {
  const [p, s, a] = livery(key, fallback);
  return `<svg class="car-side" viewBox="0 0 260 64" aria-hidden="true">
  <path d="M6 46 L18 36 L40 35 L66 33 L96 24 L122 21 L134 12 L150 12 L156 22 L196 24 L218 20 L240 20 L244 38 L250 46 L130 51 L28 51 Z" fill="${p}"/>
  <path d="M66 33 L96 24 L156 23 L196 25 L212 38 L66 40 Z" fill="${s}" opacity=".9"/>
  <path d="M100 30 L190 30 L196 34 L100 36 Z" fill="${a}"/>
  <path d="M122 21 L134 12 L150 12 L156 22 Z" fill="#101215"/><path d="M126 21 Q142 6 158 21" stroke="#101215" stroke-width="3.2" fill="none"/>
  <rect x="218" y="10" width="26" height="6" rx="1.5" fill="${s}"/><rect x="238" y="10" width="5" height="32" fill="${s}"/>
  <path d="M0 48 L38 48 L38 53 L0 53 Z" fill="${s}"/><path d="M2 44 L30 44 L30 47 L2 47 Z" fill="${a}"/>
  <circle cx="56" cy="47" r="14" fill="#111"/><circle cx="56" cy="47" r="8.5" fill="#2b2e36"/><circle cx="56" cy="47" r="3" fill="${a}"/>
  <circle cx="208" cy="46" r="16" fill="#111"/><circle cx="208" cy="46" r="9.5" fill="#2b2e36"/><circle cx="208" cy="46" r="3.4" fill="${a}"/></svg>`;
}
function carTop2026(key, fallback) {
  const [p, s, a] = livery(key, fallback);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 220">
  <rect x="3" y="6" width="84" height="13" rx="3" fill="${s}"/><rect x="3" y="6" width="84" height="4" rx="2" fill="${a}"/>
  <rect x="5" y="32" width="17" height="30" rx="5" fill="#15171c"/><rect x="68" y="32" width="17" height="30" rx="5" fill="#15171c"/>
  <rect x="9" y="40" width="9" height="14" rx="3" fill="#2b2e36"/><rect x="72" y="40" width="9" height="14" rx="3" fill="#2b2e36"/>
  <path d="M40 12 L50 12 L52 78 L38 78 Z" fill="${p}"/><path d="M43 14 L47 14 L48 70 L42 70 Z" fill="${a}" opacity=".85"/>
  <path d="M22 44 L68 44 L66 50 L24 50 Z" fill="${s}" opacity=".9"/>
  <path d="M33 78 L57 78 L68 112 L70 160 L60 188 L30 188 L20 160 L22 112 Z" fill="${p}"/>
  <path d="M23 116 L33 112 L33 162 L22 158 Z M67 116 L57 112 L57 162 L68 158 Z" fill="${s}"/>
  <path d="M41 120 L49 120 L50 180 L40 180 Z" fill="${a}"/>
  <path d="M37 88 L53 88 L55 120 L35 120 Z" fill="#101215"/><ellipse cx="45" cy="104" rx="5.5" ry="8" fill="${a}" opacity=".9"/>
  <path d="M33 86 Q45 76 57 86" stroke="#101215" stroke-width="4" fill="none"/>
  <rect x="2" y="160" width="21" height="38" rx="6" fill="#15171c"/><rect x="67" y="160" width="21" height="38" rx="6" fill="#15171c"/>
  <rect x="7" y="170" width="11" height="18" rx="4" fill="#2b2e36"/><rect x="72" y="170" width="11" height="18" rx="4" fill="#2b2e36"/>
  <rect x="12" y="196" width="66" height="16" rx="3" fill="${s}"/><rect x="12" y="196" width="66" height="4" fill="${a}"/><rect x="41" y="184" width="8" height="14" fill="${s}"/></svg>`;
}

/* ---------- image renders (repo -> formula1.com), cached ---------- */
const _carInflight = {};
function carCandidates(key, year, view) {
  const list = [`${ASBH_RAW}f1hub/cars/${year}/${key}-${view}.png`, `${ASBH_RAW}f1hub/cars/${year}/${key}-${view}.webp`];
  if (view === 'side') for (const slug of F1_SLUGS[key] || []) list.push(`https://media.formula1.com/image/upload/c_lfill,w_720/q_auto/v1740000000/common/f1/${year}/${slug}/${year}${slug}carright.webp`);
  return list;
}
function carCached(key, year, view) { const c = Store.get(`car:${key}:${year}:${view}`); return c && c.u ? c.u : null; }
async function shrinkImage(dataUrl, maxW) {
  const im = await loadImg(dataUrl); if (!im || !im.width) return null;
  const s = Math.min(1, maxW / im.width); const c = document.createElement('canvas'); c.width = Math.round(im.width * s); c.height = Math.round(im.height * s);
  c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
  let out = c.toDataURL('image/webp', 0.86); if (!out.startsWith('data:image/webp')) out = c.toDataURL('image/png'); return out;
}
function ensureCar(key, year, view) {
  if (!key) return Promise.resolve(null);
  const id = `car:${key}:${year}:${view}`; const c = Store.get(id);
  if (c && (c.u || Date.now() - c.t < 12 * 3600e3)) return Promise.resolve(c.u || null);
  if (_carInflight[id]) return _carInflight[id];
  return (_carInflight[id] = (async () => {
    if (!Platform.canScrape() && Platform.kind === 'web') { /* browsers: only CORS-enabled sources work */ }
    for (const url of carCandidates(key, year, view)) {
      try { const d = await Platform.httpDataUrl(url); if (d && /^data:image\//.test(d)) { const small = await shrinkImage(d, view === 'top' ? 260 : 520); if (small) { Store.set(id, { u: small, t: Date.now(), src: url }); return small; } } } catch {}
    }
    Store.set(id, { u: null, t: Date.now() }); return null;
  })().finally(() => delete _carInflight[id]));
}
// HTML for a car: the cached render if we have one, otherwise the drawn livery (upgraded in place when a render arrives).
function carHtml(key, year, view = 'side', fallbackColor) {
  const u = carCached(key, year, view);
  if (u) return `<img class="car-img car-${view}" src="${u}" alt="">`;
  return `<span class="car-slot" data-car="${key || ''}|${year}|${view}">${view === 'top' ? `<img class="car-img car-top" src="${svgUrl(carTop2026(key, fallbackColor))}" alt="">` : carSide2026(key, fallbackColor)}</span>`;
}
function hydrateCars(root = document) {
  $$('.car-slot[data-car]', root).forEach(el => { const [k, y, v] = el.dataset.car.split('|'); if (!k) return; el.removeAttribute('data-car');
    ensureCar(k, y, v).then(u => { if (u && el.isConnected) el.innerHTML = `<img class="car-img car-${v}" src="${u}" alt="">`; }); });
}
async function carImageForCanvas(key, year, view, fallbackColor) {
  const u = await Promise.race([ensureCar(key, year, view), sleep(4000).then(() => null)]);
  return loadImg(u || svgUrl(view === 'top' ? carTop2026(key, fallbackColor) : carSide2026(key, fallbackColor).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')));
}
new MutationObserver(() => hydrateCars()).observe(document.documentElement, { childList: true, subtree: true });

/* ---- race.js ---- */
/* F1 Data Hub 2.0 \u2014 Race Centre: circuit maps, car artwork, race updates, results, grid line-up */
'use strict';

const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z ]/g, ' ').trim();

/* ---------- OpenF1 meeting that matches a calendar event ---------- */
async function findMeeting(ev, year = ev.season) {
  const list = (await of1(`meetings?year=${year}`, 6 * 3600)).filter(m => !/test/i.test(m.meeting_name || ''));
  const loc = norm(ev.locality), ctry = norm(ev.country), nm = norm(shortGp(ev));
  const byLoc = list.filter(m => { const l = norm(m.location), c = norm(m.circuit_short_name); return loc && (l.includes(loc) || loc.includes(l) || c.includes(loc)); });
  if (byLoc.length) return byLoc[0];
  const byName = list.filter(m => norm(m.meeting_name).includes(nm));
  if (byName.length === 1) return byName[0];
  const byCountry = list.filter(m => norm(m.country_name) === ctry || (ctry === 'usa' && norm(m.country_name) === 'united states') || (ctry === 'uk' && norm(m.country_name) === 'united kingdom'));
  return byCountry.length === 1 ? byCountry[0] : null;
}
const pastSessions = sessions => sessions.filter(s => new Date(s.date_end) < Date.now()).sort((a, b) => new Date(a.date_start) - new Date(b.date_start));

/* ---------- Circuit outline from car position data (cached per circuit) ---------- */
async function trackOutline(ev) {
  const key = 'track:' + ev.circuitId; const cached = Store.get(key);
  if (cached && cached.pts && cached.pts.length > 40) return cached;
  for (const y of [ev.season, ev.season - 1, ev.season - 2]) {
    let m; try { m = await findMeeting(ev, y); } catch { continue; } if (!m) continue;
    const sess = pastSessions(await of1(`sessions?meeting_key=${m.meeting_key}`, 3600));
    const order = [...sess.filter(s => /Qualifying/i.test(s.session_name)), ...sess.slice().reverse()];
    for (const s of order) {
      try {
        const laps = await of1(`laps?session_key=${s.session_key}`, 86400);
        const best = laps.filter(l => l.lap_duration > 0 && l.date_start && !l.is_pit_out_lap).sort((a, b) => a.lap_duration - b.lap_duration)[0];
        if (!best) continue;
        const t0 = new Date(best.date_start), t1 = new Date(t0.getTime() + best.lap_duration * 1000);
        const loc = await of1(`location?session_key=${s.session_key}&driver_number=${best.driver_number}&date>${t0.toISOString()}&date<${t1.toISOString()}`, 86400);
        const raw = loc.filter(p => p.x || p.y).map(p => [p.x, p.y]);
        if (raw.length < 40) continue;
        const step = Math.max(1, Math.floor(raw.length / 320)); const pts = raw.filter((_, i) => i % step === 0);
        const topSpeed = Math.max(0, ...laps.map(l => l.st_speed || 0));
        const out = { pts, source: `${y} ${s.session_name}`, topSpeed, topSpeedSession: s.session_name, year: y };
        Store.set(key, out); return out;
      } catch (e) { if (e.status === 401 || e.status === 403) break; }
    }
  }
  return null;
}
function trackPath(pts, size = 1000, pad = 60) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const sc = (size - pad * 2) / Math.max(maxX - minX, maxY - minY);
  const w = (maxX - minX) * sc, h = (maxY - minY) * sc;
  const ox = (size - w) / 2, oy = (size - h) / 2;
  const P = pts.map(([x, y]) => [ox + (x - minX) * sc, oy + (maxY - y) * sc]);
  return { d: 'M' + P.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z', start: P[0], next: P[Math.min(3, P.length - 1)] };
}
function trackSvg(track, { style = 'bein', cls = '' } = {}) {
  if (!track) return `<svg class="track ${cls}" viewBox="0 0 1000 1000"><rect x="150" y="300" width="700" height="400" rx="200" fill="none" stroke="currentColor" stroke-width="30" opacity=".35"/><text x="500" y="515" text-anchor="middle" font-size="44" fill="currentColor" opacity=".6">Layout appears after first session</text></svg>`;
  const { d, start, next } = trackPath(track.pts);
  const ang = Math.atan2(next[1] - start[1], next[0] - start[0]) + Math.PI / 2;
  const sx = Math.cos(ang) * 34, sy = Math.sin(ang) * 34;
  if (style === 'watermark') return `<svg class="track ${cls}" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet"><path d="${d}" fill="none" stroke="#fff" stroke-width="46" stroke-linejoin="round" opacity=".10"/><path d="${d}" fill="none" stroke="#fff" stroke-width="14" stroke-linejoin="round" opacity=".10"/></svg>`;
  return `<svg class="track ${cls}" viewBox="0 0 1000 1000"><path d="${d}" fill="none" stroke="#d7262e" stroke-width="44" stroke-linejoin="round" stroke-linecap="round"/><path d="${d}" fill="none" stroke="var(--track-inner,#fff)" stroke-width="20" stroke-linejoin="round"/>
    <line x1="${start[0] - sx}" y1="${start[1] - sy}" x2="${start[0] + sx}" y2="${start[1] + sy}" stroke="#111" stroke-width="10"/><circle cx="${start[0]}" cy="${start[1]}" r="9" fill="#d7262e"/></svg>`;
}

/* ---------- Original car artwork, coloured per team ---------- */
function shade(hex, f) { const n = parseInt(hex.replace('#', ''), 16); const c = [n >> 16 & 255, n >> 8 & 255, n & 255].map(v => Math.round(clamp(f < 0 ? v * (1 + f) : v + (255 - v) * f, 0, 255))); return '#' + c.map(v => v.toString(16).padStart(2, '0')).join(''); }
function carSide(color = '#e10600') {
  const dk = shade(color, -0.45), lt = shade(color, 0.25);
  return `<svg class="car-side" viewBox="0 0 240 64" aria-hidden="true">
  <path d="M8 44 L20 30 L26 30 L24 40 L60 38 L92 28 L118 24 L132 14 L146 14 L150 24 L196 26 L212 22 L226 22 L230 40 L234 46 L120 50 L30 50 Z" fill="${color}"/>
  <path d="M60 38 L92 28 L118 24 L150 26 L196 28 L206 40 L60 44 Z" fill="${lt}" opacity=".55"/>
  <path d="M118 24 L132 14 L146 14 L150 24 Z" fill="#14161c"/><path d="M122 22 Q138 8 152 22" stroke="#14161c" stroke-width="3" fill="none"/>
  <rect x="210" y="12" width="22" height="6" rx="1" fill="${dk}"/><rect x="226" y="12" width="4" height="30" fill="${dk}"/>
  <path d="M2 48 L34 48 L34 52 L2 52 Z" fill="${dk}"/>
  <circle cx="52" cy="47" r="14" fill="#111"/><circle cx="52" cy="47" r="7" fill="#3a3d45"/><circle cx="52" cy="47" r="2.5" fill="${color}"/>
  <circle cx="196" cy="46" r="16" fill="#111"/><circle cx="196" cy="46" r="8" fill="#3a3d45"/><circle cx="196" cy="46" r="3" fill="${color}"/></svg>`;
}
function carTop(color = '#e10600') {
  const dk = shade(color, -0.45), lt = shade(color, 0.3);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 200">
  <rect x="2" y="30" width="16" height="30" rx="4" fill="#15171c"/><rect x="62" y="30" width="16" height="30" rx="4" fill="#15171c"/>
  <rect x="0" y="146" width="20" height="36" rx="5" fill="#15171c"/><rect x="60" y="146" width="20" height="36" rx="5" fill="#15171c"/>
  <rect x="4" y="8" width="72" height="12" rx="3" fill="${dk}"/><path d="M36 10 L44 10 L46 70 L34 70 Z" fill="${color}"/>
  <path d="M30 70 L50 70 L60 104 L62 150 L52 176 L28 176 L18 150 L20 104 Z" fill="${color}"/>
  <path d="M34 82 L46 82 L48 112 L32 112 Z" fill="#14161c"/><ellipse cx="40" cy="96" rx="5" ry="7" fill="${lt}"/>
  <path d="M22 112 L30 112 L30 150 L22 146 Z M58 112 L50 112 L50 150 L58 146 Z" fill="${lt}" opacity=".5"/>
  <rect x="10" y="178" width="60" height="14" rx="3" fill="${dk}"/><rect x="36" y="150" width="8" height="30" fill="${dk}"/></svg>`;
}
const svgUrl = svg => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

/* ---------- Weekend data: session results with driver info ---------- */
async function weekendData(ev) {
  const m = await findMeeting(ev).catch(() => null); if (!m) return { meeting: null, sessions: [], results: {}, drivers: {} };
  const sessions = (await of1(`sessions?meeting_key=${m.meeting_key}`, 900)).sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
  const done = pastSessions(sessions); const results = {}; const drivers = {};
  if (done.length) (await of1(`drivers?session_key=${done[done.length - 1].session_key}`, 3600).catch(() => [])).forEach(d => { drivers[d.driver_number] = { num: d.driver_number, acr: d.name_acronym, name: d.full_name, team: d.team_name, color: '#' + String(d.team_colour || '888888').replace('#', '') }; });
  await Promise.all(done.map(async s => { results[s.session_key] = (await of1(`session_result?session_key=${s.session_key}`, 1800).catch(() => [])).sort((a, b) => (a.position || 99) - (b.position || 99)); }));
  return { meeting: m, sessions, results, drivers };
}
const drv = (W, n) => W.drivers[n] || { num: n, acr: '#' + n, name: 'Car ' + n, team: '', color: '#8a93a6' };
const lastDur = r => { const d = Array.isArray(r.duration) ? r.duration.filter(Boolean) : [r.duration]; return d[d.length - 1]; };

/* ---------- Cards ---------- */
function heroCard(ev, track) {
  const now = Date.now(); const next = ev.sessions.find(s => s.end > now) || ev.sessions[ev.sessions.length - 1];
  return `<section class="rc-hero" data-snap="hero">
    <div class="rc-hero-track">${trackSvg(track, { style: 'watermark' })}</div>
    <div class="rc-hero-body"><div class="rc-kicker">Round ${ev.round} \u00b7 ${ev.season}${ev.sprint ? ' \u00b7 Sprint weekend' : ''}</div>
      <h1>${esc(ev.name)} ${ev.season}</h1><div class="rc-sub">${esc(ev.circuitName)} <span>|</span> ${esc(next.name)}</div>
      <div class="rc-hero-row"><div><div class="rc-date">${fmt(next.start, { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</div><div class="rc-time">${fmtTime(next.start).replace(':', ' : ')}</div></div>
        <div class="rc-tiles" data-tiles="${next.start.getTime()}" data-end="${next.end.getTime()}">${tilesHtml(next.start.getTime() - now)}</div></div></div>
    <button class="snap-btn" data-snap-btn="hero" title="Save as image">\u2913</button></section>`;
}
function tilesHtml(ms) {
  if (ms <= 0) return `<div class="tile live"><b>LIVE</b><span>Now</span></div>`;
  const s = Math.floor(ms / 1000), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
  return (d ? `<div class="tile"><b>${d}</b><span>Days</span></div>` : '') + `<div class="tile"><b>${h}</b><span>Hours</span></div><div class="tile"><b>${String(m).padStart(2, '0')}</b><span>Min</span></div><div class="tile"><b>${String(x).padStart(2, '0')}</b><span>Sec</span></div>`;
}
setInterval(() => { const now = Date.now(); $$('[data-tiles]').forEach(el => { const t = +el.dataset.tiles, e = +el.dataset.end; el.innerHTML = now < t ? tilesHtml(t - now) : now < e ? tilesHtml(0) : `<div class="tile"><b>\u2713</b><span>Done</span></div>`; }); }, 1000);

function circuitCard(ev, track) {
  const c = CIRCUITS[ev.circuitId] || {};
  return `<section class="card rc-circuit" data-snap="circuit"><h2 class="rc-h">Circuit details</h2>
    <div class="rc-circuit-grid"><div class="rc-map">${trackSvg(track)}</div>
      <div class="rc-length"><div><b>${c.km ? c.km.toFixed(3) : '\u2014'}</b> <span>Km</span></div><div class="muted">${esc(ev.circuitName)}</div></div>
      <div class="rc-facts"><div class="fact"><i>\u21bb</i><div><b>Laps</b><span>${c.laps || '\u2014'}</span></div></div>
        <div class="fact"><i>\u23f2</i><div><b>Fastest speed</b><span>${track && track.topSpeed ? track.topSpeed.toFixed(1) + ' Kmph' : '\u2014'}</span>${track && track.topSpeed ? `<small>${esc(track.source)}</small>` : ''}</div></div>
        <div class="fact"><i>\u2691</i><div><b>Race distance</b><span>${c.km ? (c.km * c.laps).toFixed(3) + ' km' : '\u2014'}</span></div></div>
        ${c.first ? `<div class="fact"><i>\u2605</i><div><b>First Grand Prix</b><span>${c.first}</span></div></div>` : ''}</div></div>
    ${track ? `<p class="note">Layout traced from the fastest lap's car position data (${esc(track.source)}, OpenF1).</p>` : ''}
    <button class="snap-btn" data-snap-btn="circuit" title="Save as image">\u2913</button></section>`;
}
function updatesCard(ev, W) {
  const rows = ev.sessions.map(s => {
    const st = sessionStatus(s); const os = W.sessions.find(x => SESSION_META[s.key].openf1.some(n => n.toLowerCase() === String(x.session_name).toLowerCase()));
    const res = os ? (W.results[os.session_key] || []) : [];
    const top = res.slice(0, 3).map((r, i) => { const d = drv(W, r.driver_number); return `<span class="pod"><i style="background:${d.color}"></i>${i + 1}.${esc(d.acr)}</span>`; }).join('');
    return `<div class="upd"><div class="upd-day">${fmt(s.start, { weekday: 'short' }).toUpperCase()},<br>${fmt(s.start, { month: 'short', day: 'numeric' }).toUpperCase()}</div>
      <div class="upd-body"><b>${esc(s.name.toUpperCase())}</b><div>${st === 'done' ? (top || '<span class="muted">Completed</span>') : st === 'live' ? '<span class="chip chip-live">\u25cf LIVE</span>' : `<span class="muted">Upcoming</span> <span class="sep">|</span> ${fmtTime(s.start)} - ${fmtTime(s.end)}`}</div></div></div>`;
  }).join('');
  return `<section class="card rc-updates" data-snap="updates"><h2 class="rc-h center">Race updates</h2><div class="upd-list">${rows}</div><button class="snap-btn" data-snap-btn="updates" title="Save as image">\u2913</button></section>`;
}
async function previousCard(ev) {
  let races = [];
  try { races = (await getJSON(`${JOLPICA}/circuits/${ev.circuitId}/results/1.json?limit=100`, { ttl: 86400, persist: true })).MRData.RaceTable.Races || []; } catch {}
  const prev = races.filter(r => +r.season < ev.season || (+r.season === ev.season && sessionStatus(ev.sessions[ev.sessions.length - 1]) === 'done')).slice(-3).reverse();
  return `<section class="card rc-prev" data-snap="prev"><h2 class="rc-h center">Previous races (${prev.length})</h2>
    ${prev.length ? prev.map(r => { const w = r.Results[0]; const col = teamColorById(w.Constructor.constructorId, w.Constructor.name);
      return `<div class="prev"><div class="prev-top"><span>${r.season}</span><span>${esc(r.raceName)}</span></div><div class="prev-row">${carHtml(teamKey(w.Constructor.constructorId + ' ' + w.Constructor.name), r.season, 'side', col)}<b>${esc(w.Driver.familyName)}</b><span class="mono">${esc((w.Time && w.Time.time) || w.status || '')}</span></div></div>`; }).join('') : '<p class="muted">No previous winners available (offline or new venue).</p>'}
    <button class="snap-btn" data-snap-btn="prev" title="Save as image">\u2913</button></section>`;
}
function resultsCard(ev, W) {
  const done = pastSessions(W.sessions).filter(s => (W.results[s.session_key] || []).length).reverse();
  if (!done.length) return `<section class="card rc-results"><h2 class="rc-h">Results</h2><p class="muted">Classifications appear here once the first session has run.</p></section>`;
  return `<section class="card rc-results" data-snap="results"><div class="rc-res-top"><select id="rc-sess">${done.map(s => `<option value="${s.session_key}">${esc(s.session_name)}</option>`).join('')}</select><div class="qseg" id="rc-q"></div></div>
    <div id="rc-res-list"></div><button class="snap-btn" data-snap-btn="results" title="Save as image">\u2913</button></section>`;
}
function wireResults(W) {
  const sel = $('#rc-sess'); if (!sel) return; let q = 2;
  const draw = () => {
    const s = W.sessions.find(x => x.session_key === +sel.value); const res = W.results[s.session_key] || []; const quali = /Qualifying|Shootout/i.test(s.session_name); const race = /^(Race|Sprint)$/i.test(s.session_name);
    $('#rc-q').innerHTML = quali ? ['Q3', 'Q2', 'Q1'].map((n, i) => `<button class="${2 - i === q ? 'on' : ''}" data-q="${2 - i}">${n}</button>`).join('<span>|</span>') : '';
    $$('#rc-q [data-q]').forEach(b => b.onclick = () => { q = +b.dataset.q; draw(); });
    let rows;
    if (quali) { rows = res.filter(r => Array.isArray(r.duration) && r.duration[q]).sort((a, b) => a.duration[q] - b.duration[q]).map(r => ({ r, t: r.duration[q] })); }
    else rows = res.map(r => ({ r, t: race ? (typeof r.gap_to_leader === 'number' ? r.gap_to_leader : null) : lastDur(r) }));
    const lead = rows[0] ? rows[0].t : 0;
    $('#rc-res-list').innerHTML = `<div class="res-head"><span>Driver</span><span>Time</span></div>` + rows.map(({ r, t }, i) => { const d = drv(W, r.driver_number);
      const time = race ? (i === 0 ? (typeof r.duration === 'number' ? lapStr(r.duration) : 'Winner') : (t != null ? '+' + t.toFixed(3) + 's' : (r.dnf ? 'DNF' : r.dns ? 'DNS' : r.dsq ? 'DSQ' : String(r.gap_to_leader || '')))) : (i === 0 ? lapStr(t) : (t ? '+' + (t - lead).toFixed(3) + 's' : '\u2014'));
      return `<div class="res-row"><i class="tb" style="background:${d.color}"></i><span class="res-pos">${r.position ?? i + 1}</span>${carHtml(teamKey(d.team), (W.meeting && W.meeting.year) || new Date().getUTCFullYear(), 'side', d.color)}<span class="res-name">${esc(d.name)}</span><span class="res-time mono">${esc(time)}</span></div>`; }).join('');
  };
  sel.onchange = () => { q = 2; draw(); }; draw();
}
async function gridOrder(ev, W) {
  const race = W.sessions.find(s => s.session_name === 'Race');
  if (race) { try { const g = await of1(`starting_grid?session_key=${race.session_key}`, 1800); if (g.length) return { order: g.sort((a, b) => a.position - b.position).map(x => x.driver_number), src: 'Official starting grid' }; } catch {} }
  const q = W.sessions.find(s => s.session_name === 'Qualifying'); const res = q && W.results[q.session_key];
  if (res && res.length) return { order: res.filter(r => r.position).map(r => r.driver_number), src: 'Qualifying order \u2014 grid penalties may change it' };
  return null;
}
function raceResultOrder(W) {
  const race = W.sessions.find(s => s.session_name === 'Race' && new Date(s.date_end) < Date.now()); const res = race && W.results[race.session_key];
  if (!res || !res.length) return null;
  const sorted = res.slice().sort((a, b) => (a.position || 99) - (b.position || 99) || (b.number_of_laps || 0) - (a.number_of_laps || 0));
  return { order: sorted.map(r => r.driver_number), labels: sorted.map(r => r.dsq ? 'DSQ' : r.dns ? 'DNS' : (r.dnf || !r.position) ? 'DNF' : r.position), title: 'Formula 1 - Race Results', footer: 'Official classification \u00b7 OpenF1' };
}
async function battleCard(ev) {
  let ds = []; try { ds = ((await getJSON(`${JOLPICA}/${ev.season}/driverstandings.json`, { ttl: 1800, persist: true })).MRData.StandingsTable.StandingsLists[0] || {}).DriverStandings || []; } catch {}
  if (ds.length < 2) return '';
  const tile = (d, i) => { const c = d.Constructors[0] || {}; const k = teamKey(c.constructorId + ' ' + c.name); const col = teamColorById(c.constructorId, c.name);
    return `<div class="battle-tile ${i ? 'second' : ''}" style="--c:${col}"><div class="battle-car">${carHtml(k, ev.season, 'side', col)}</div><div><b>${esc(d.Driver.familyName.toUpperCase())}</b><span>${esc(d.points)} PTS</span></div></div>`; };
  const gap = +ds[0].points - +ds[1].points;
  return `<section class="card rc-battle" data-snap="battle"><div class="card-h"><h2 class="rc-h">Championship battle</h2><a class="btn btn-sm" href="#/season?tab=standings">\u2192</a></div>
    ${tile(ds[0], 0)}${tile(ds[1], 1)}<p class="note">Gap at the top: ${gap} pts</p><button class="snap-btn" data-snap-btn="battle" title="Save as image">\u2913</button></section>`;
}
async function drawGrid(canvas, ev, W, g) {
  const n = g.order.length; const rowH = 230, W0 = 1080, top = 380; const H = top + Math.ceil(n / 2) * rowH + Math.round(rowH * 0.5) + 150;
  canvas.width = W0; canvas.height = H; const ctx = canvas.getContext('2d'); await document.fonts.ready;
  ctx.fillStyle = '#f2f3f5'; ctx.fillRect(0, 0, W0, H);
  const band = ctx.createLinearGradient(0, 0, W0, 0); band.addColorStop(0, '#e10600'); band.addColorStop(1, '#ff3b30'); ctx.fillStyle = band; ctx.fillRect(0, 0, W0, 130);
  ctx.save(); ctx.globalAlpha = .15; ctx.strokeStyle = '#fff'; ctx.lineWidth = 10; for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 40, 130); ctx.lineTo(120 + i * 40, 0); ctx.stroke(); } ctx.restore();
  const logo = await loadImg(F1_LOGO); let lx = 50; if (logo) { const lh = 50, lw = lh * logo.width / logo.height; ctx.save(); ctx.filter = 'brightness(0) invert(1)'; ctx.drawImage(logo, 50, 40, lw, lh); ctx.restore(); lx = 50 + lw + 24; }
  ctx.fillStyle = '#fff'; ctx.font = '700 46px Inter, Arial'; ctx.fillText(g.title || 'Formula 1 - Grid Line-up', lx, 82);
  ctx.font = '600 24px "Barlow Condensed", Arial'; const r = `ROUND ${ev.round} \u00b7 ${ev.season}`; ctx.fillText(r, W0 - 50 - ctx.measureText(r).width, 82);
  ctx.fillStyle = '#0b0d12'; ctx.fillRect(0, 130, W0, 140); ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
  fitText(ctx, ev.name.toUpperCase() + ' ' + ev.season, W0 - 100, 44, '700', '"Barlow Condensed", Arial'); ctx.fillText(ev.name.toUpperCase() + ' ' + ev.season, W0 / 2, 196);
  ctx.fillStyle = '#b8c0cf'; ctx.font = '500 28px Inter, Arial'; ctx.fillText(ev.circuitName, W0 / 2, 240); ctx.textAlign = 'left';
  const sq = 45; for (let x = 0; x < W0 / sq; x++) for (let y = 0; y < 2; y++) { ctx.fillStyle = (x + y) % 2 ? '#111' : '#fff'; ctx.fillRect(x * sq, 270 + y * sq, sq, sq); }
  for (let y = 360; y < H - 110; y += 60) { ctx.fillStyle = (y / 60) % 2 ? '#e10600' : '#fff'; ctx.fillRect(0, y, 22, 60); ctx.fillRect(W0 - 22, y, 22, 60); }
  for (let i = 0; i < n; i++) {
    const d = drv(W, g.order[i]); const left = i % 2 === 0; const row = Math.floor(i / 2); const y = top + row * rowH + (left ? 0 : rowH * 0.5);
    const cx = left ? 330 : 640; const img = await carImageForCanvas(teamKey(d.team), ev.season, 'top', d.color);
    ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(cx - 60, y - 8, 120, 4);
    if (img) { const ih = 220, iw = Math.min(130, ih * img.width / img.height); ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 14; ctx.shadowOffsetX = 4; ctx.drawImage(img, cx - iw / 2, y, iw, ih); ctx.restore(); }
    const lab = g.labels ? String(g.labels[i]) : String(i + 1);
    const nx = left ? cx - 90 : cx + 90; ctx.fillStyle = '#16181d'; ctx.font = `italic 800 ${lab.length > 2 ? 78 : 96}px "Barlow Condensed", Arial`; ctx.textAlign = left ? 'right' : 'left'; ctx.fillText(lab, nx, y + 130); ctx.textAlign = 'left';
    const tagY = y + 150; ctx.font = '800 30px "Barlow Condensed", Arial'; const acrW = ctx.measureText(d.acr).width;
    const pillW = 70; const tx = left ? cx - 90 - pillW - acrW - 14 : cx + 90;
    if (left) { ctx.fillStyle = '#16181d'; ctx.fillText(d.acr, tx, tagY + 30); }
    const px = left ? tx + acrW + 12 : tx; ctx.fillStyle = d.color; ctx.beginPath(); ctx.moveTo(px + 10, tagY); ctx.lineTo(px + pillW, tagY); ctx.lineTo(px + pillW - 10, tagY + 40); ctx.lineTo(px, tagY + 40); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '800 26px "Barlow Condensed", Arial'; ctx.textAlign = 'center'; ctx.fillText(String(d.num), px + pillW / 2, tagY + 30); ctx.textAlign = 'left';
    if (!left) { ctx.fillStyle = '#16181d'; ctx.font = '800 30px "Barlow Condensed", Arial'; ctx.fillText(d.acr, px + pillW + 12, tagY + 30); }
  }
  ctx.fillStyle = '#0b0d12'; ctx.fillRect(0, H - 90, W0, 90); ctx.fillStyle = '#fff'; ctx.font = '800 28px "Barlow Condensed", Arial'; ctx.fillText('F1 DATA HUB', 60, H - 36);
  if (g.footer) { ctx.fillStyle = '#b8c0cf'; ctx.font = '500 20px Inter, Arial'; ctx.fillText(g.footer, W0 - 60 - ctx.measureText(g.footer).width, H - 38); return; }
  ctx.fillStyle = '#b8c0cf'; ctx.font = '500 20px Inter, Arial'; const note = g.src + ' \u00b7 Race ' + fmtDateTime(ev.sessions[ev.sessions.length - 1].start) + ' ' + tzLabel(currentTz()); ctx.fillText(note, W0 - 60 - ctx.measureText(note).width, H - 38);
}
async function snapCard(name, ev) {
  const el = document.querySelector(`[data-snap="${name}"]`); if (!el) return;
  el.classList.add('snapping'); try { await exportElementPng(el, `F1_${ev.season}_${fileSafe(shortGp(ev))}_${name}.png`); } finally { el.classList.remove('snapping'); }
}

/* ---- season.js ---- */
/* F1 Data Hub 3.0 \u2014 Season hub (dashboard-style season statistics).
   Sources: Jolpica (results, qualifying, sprint) and OpenF1 (pit stops). */
'use strict';

const SEASON_TABS = [['overview', 'Overview'], ['results', 'Results'], ['standings', 'Standings'], ['drivers', 'Drivers'], ['teams', 'Teams'],
  ['driver', 'Driver Stats'], ['h2h', 'Head to Head'], ['consistency', 'Consistency'], ['pits', 'Pit Stops'], ['trackdna', 'Track DNA'], ['more', 'More']];

const tsec = t => { if (!t) return null; const p = String(t).split(':').map(Number); return p.length === 2 ? p[0] * 60 + p[1] : p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : +p[0]; };
const NONFIN = ['R', 'N', 'D', 'E', 'W', 'F'];
const isDNF = r => r && (r.pt === 'R' || r.pt === 'N');
const classified = r => r && !NONFIN.includes(r.pt);
const avg = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : null;
const sd = a => { const m = avg(a); return a.length > 1 ? Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1)) : 0; };
const ord = n => n == null ? '\u2014' : n + (['th', 'st', 'nd', 'rd'][(n % 100 - 20) % 10] || ['th', 'st', 'nd', 'rd'][n % 100] || 'th');
function mkChart(canvas, cfg) { const c = new Chart(canvas, cfg); (App.charts = App.charts || []).push(c); return c; }
function destroyCharts() { (App.charts || []).forEach(c => c.destroy()); App.charts = []; }

/* ---------- data ---------- */
async function jolpicaAll(path, ttl) {
  const races = new Map(); let off = 0, total = 1;
  while (off < total && off < 3000) {
    const j = await getJSON(`${JOLPICA}/${path}?limit=100&offset=${off}`, { ttl, gap: 300 });
    total = +j.MRData.total || 0;
    for (const r of j.MRData.RaceTable.Races || []) { const k = +r.round; const ex = races.get(k); if (ex) { for (const f of ['Results', 'QualifyingResults', 'SprintResults']) if (r[f]) ex[f] = (ex[f] || []).concat(r[f]); } else races.set(k, r); }
    off += 100;
  }
  return [...races.values()].sort((a, b) => +a.round - +b.round);
}
function trimRes(x) {
  return { num: x.number, pos: +x.position, pt: x.positionText, pts: +x.points || 0, id: x.Driver.driverId, code: x.Driver.code || x.Driver.familyName.slice(0, 3).toUpperCase(),
    given: x.Driver.givenName, family: x.Driver.familyName, nat: x.Driver.nationality, dob: x.Driver.dateOfBirth, pnum: x.Driver.permanentNumber,
    tid: x.Constructor.constructorId, team: x.Constructor.name, grid: +x.grid, laps: +x.laps || 0, status: x.status, time: x.Time ? x.Time.time : null,
    fl: x.FastestLap ? +x.FastestLap.rank : null, flt: x.FastestLap && x.FastestLap.Time ? x.FastestLap.Time.time : null };
}
function trimQ(x) { return { num: x.number, pos: +x.position, id: x.Driver.driverId, code: x.Driver.code, given: x.Driver.givenName, family: x.Driver.familyName, nat: x.Driver.nationality, dob: x.Driver.dateOfBirth, tid: x.Constructor.constructorId, team: x.Constructor.name, q1: x.Q1 || null, q2: x.Q2 || null, q3: x.Q3 || null }; }

async function seasonData(year, force = false) {
  const key = 'season:' + year; const c = !force && Store.get(key); const fresh = year < new Date().getUTCFullYear() ? 30 * 86400e3 : 3 * 3600e3;
  if (c && Date.now() - c.t < fresh) return hydrate(c.v);
  if (App._season && App._season[year] && !force) return App._season[year];
  const [R, Q, S] = await Promise.all([jolpicaAll(`${year}/results.json`, 3600), jolpicaAll(`${year}/qualifying.json`, 3600), jolpicaAll(`${year}/sprint.json`, 3600).catch(() => [])]);
  const rounds = new Map();
  const get = r => { const k = +r.round; if (!rounds.has(k)) rounds.set(k, { round: k, name: r.raceName, date: r.date, cid: r.Circuit.circuitId, country: (r.Circuit.Location || {}).country, R: [], Q: [], S: [] }); return rounds.get(k); };
  R.forEach(r => get(r).R = (r.Results || []).map(trimRes)); Q.forEach(r => get(r).Q = (r.QualifyingResults || []).map(trimQ)); S.forEach(r => get(r).S = (r.SprintResults || []).map(trimRes));
  const v = { year, races: [...rounds.values()].sort((a, b) => a.round - b.round) };
  Store.set(key, { t: Date.now(), v });
  return hydrate(v);
}
function hydrate(v) {
  const D = {}, T = {};
  for (const race of v.races) for (const x of [...race.R, ...race.Q, ...race.S]) {
    const d = D[x.id] || (D[x.id] = { id: x.id, code: x.code, given: x.given, family: x.family, name: x.given + ' ' + x.family, nat: x.nat, dob: x.dob, num: x.pnum || x.num, tid: x.tid, team: x.team });
    d.tid = x.tid; d.team = x.team; if (x.pnum) d.num = x.pnum;
    T[x.tid] = T[x.tid] || { id: x.tid, name: x.team, color: teamColorById(x.tid, x.team), drivers: new Set() }; T[x.tid].drivers.add(x.id);
  }
  Object.values(D).forEach(d => d.color = teamColorById(d.tid, d.team));
  const sv = Object.assign({}, v, { D, T }); (App._season = App._season || {})[v.year] = sv; computeStats(sv); return sv;
}
function computeStats(S) {
  const st = {}; const mk = id => st[id] || (st[id] = { id, pts: 0, wins: 0, pod: 0, poles: 0, ptsFin: 0, q3: 0, bestFin: null, bestQ: null, sWins: 0, sPod: 0, dnf: 0, fl: 0, starts: 0, gained: 0, laps: 0, fins: [], qs: [], sfins: [], rounds: [] });
  let cum = {};
  for (const race of S.races) {
    const roundPts = {};
    for (const r of race.R) { const s = mk(r.id); s.starts++; s.pts += r.pts; roundPts[r.id] = (roundPts[r.id] || 0) + r.pts; s.laps += r.laps;
      if (classified(r)) { s.fins.push(r.pos); if (r.pos === 1) s.wins++; if (r.pos <= 3) s.pod++; if (r.grid > 0) s.gained += r.grid - r.pos; s.bestFin = s.bestFin == null ? r.pos : Math.min(s.bestFin, r.pos); }
      if (r.pts > 0) s.ptsFin++; if (isDNF(r)) s.dnf++; if (r.fl === 1) s.fl++; }
    for (const q of race.Q) { const s = mk(q.id); s.qs.push(q.pos); if (q.pos === 1) s.poles++; if (q.q3) s.q3++; s.bestQ = s.bestQ == null ? q.pos : Math.min(s.bestQ, q.pos); }
    for (const r of race.S) { const s = mk(r.id); s.pts += r.pts; roundPts[r.id] = (roundPts[r.id] || 0) + r.pts; if (classified(r)) { s.sfins.push(r.pos); if (r.pos === 1) s.sWins++; if (r.pos <= 3) s.sPod++; } }
    for (const id of Object.keys(st)) { cum[id] = (cum[id] || 0) + (roundPts[id] || 0); const rr = race.R.find(x => x.id === id); const qq = race.Q.find(x => x.id === id);
      st[id].rounds.push({ round: race.round, name: race.name, pts: roundPts[id] || 0, cum: cum[id], pos: rr && classified(rr) ? rr.pos : null, pt: rr ? rr.pt : null, grid: rr ? rr.grid : null, q: qq ? qq.pos : null }); }
  }
  // align rounds arrays (drivers who joined later get zeros for earlier rounds)
  for (const s of Object.values(st)) { const have = new Set(s.rounds.map(r => r.round)); let c = 0; s.rounds = S.races.map(r => { const x = s.rounds.find(y => y.round === r.round); if (x) { c = x.cum; return x; } return { round: r.round, name: r.name, pts: 0, cum: c, pos: null, pt: null, grid: null, q: null }; }); void have; }
  S.stats = st;
  const rank = upto => Object.values(st).map(s => ({ id: s.id, pts: s.rounds.filter(r => r.round <= upto).reduce((a, r) => a + r.pts, 0), wins: s.rounds.filter(r => r.round <= upto && r.pos === 1).length }))
    .sort((a, b) => b.pts - a.pts || b.wins - a.wins).map((x, i) => Object.assign(x, { rank: i + 1 }));
  const last = S.races.length ? S.races[S.races.length - 1].round : 0;
  S.standNow = rank(last); S.standPrev = last > 1 ? rank(S.races[S.races.length - 2].round) : [];
  const tp = {}; for (const race of S.races) for (const r of [...race.R, ...race.S]) tp[r.tid] = (tp[r.tid] || 0) + r.pts;
  const tw = {}; for (const race of S.races) for (const r of race.R) if (r.pos === 1 && classified(r)) tw[r.tid] = (tw[r.tid] || 0) + 1;
  const tprev = {}; if (S.races.length > 1) for (const race of S.races.slice(0, -1)) for (const r of [...race.R, ...race.S]) tprev[r.tid] = (tprev[r.tid] || 0) + r.pts;
  const prevOrder = Object.keys(tprev).sort((a, b) => tprev[b] - tprev[a]);
  S.teamStand = Object.keys(S.T).map(id => ({ id, pts: tp[id] || 0, wins: tw[id] || 0 })).sort((a, b) => b.pts - a.pts || b.wins - a.wins).map((x, i) => Object.assign(x, { rank: i + 1, prev: prevOrder.indexOf(x.id) + 1 || null }));
}
const evo = (now, prev) => { if (!prev) return '<span class="evo">\u2014</span>'; const d = prev - now; return d > 0 ? `<span class="evo up">\u25b2${d}</span>` : d < 0 ? `<span class="evo down">\u25bc${-d}</span>` : '<span class="evo">\u2014</span>'; };
const dTag = d => `<span class="dtag"><i style="background:${d.color}"></i>${esc(d.name)}</span>`;
function snapBtn(id) { return `<button class="snap-btn" data-snapel="${id}" title="Save as image">\u2913</button>`; }

/* ---------- page ---------- */
async function renderSeason(main) {
  const q = new URLSearchParams(location.hash.split('?')[1] || '');
  const tab = SEASON_TABS.some(t => t[0] === q.get('tab')) ? q.get('tab') : (App.seasonTab || 'overview'); App.seasonTab = tab;
  const year = +(q.get('y') || App.seasonYear || App.year); App.seasonYear = year;
  const years = []; for (let y = new Date().getUTCFullYear(); y >= 2018; y--) years.push(y);
  main.innerHTML = `<section class="card season-head"><div class="card-h"><h2 class="rc-h">${year} season</h2>
      <div class="row"><select id="sz-year">${years.map(y => `<option ${y === year ? 'selected' : ''}>${y}</option>`).join('')}</select><button class="btn btn-sm" id="sz-refresh" title="Reload from source">\u27f3 Refresh</button></div></div>
    <div class="pills tabs-scroll">${SEASON_TABS.map(([k, n]) => `<a class="pill ${k === tab ? 'on' : ''}" href="#/season?tab=${k}&y=${year}">${n}</a>`).join('')}</div></section>
    <div id="sz-body"><section class="card"><div class="loading"><span class="spinner"></span> Loading ${year} results\u2026</div></section></div>`;
  $('#sz-year').onchange = e => { App.seasonYear = +e.target.value; location.hash = `#/season?tab=${tab}&y=${e.target.value}`; };
  $('#sz-refresh').onclick = async () => { Store.del('season:' + year); if (App._season) delete App._season[year]; Store.del('pits:' + year); route(); };
  main.onclick = e => { const b = e.target.closest('[data-snapel]'); if (b) { const el = document.getElementById(b.dataset.snapel); if (el) { el.classList.add('snapping'); exportElementPng(el, `F1_${year}_${b.dataset.snapel}.png`).finally(() => el.classList.remove('snapping')); } } };
  const body = $('#sz-body');
  if (tab === 'trackdna') return tabTrackDNA(body, year);
  if (tab === 'more') return tabMore(body);
  if (tab === 'standings') { body.innerHTML = ''; const holder = document.createElement('div'); body.appendChild(holder); const y0 = App.year; App.year = year; try { await renderStandings(holder); } finally { App.year = y0; } return; }
  let S; try { S = await seasonData(year); } catch (e) { body.innerHTML = errorBox(e); return; }
  if (!S.races.length) { body.innerHTML = `<section class="card"><p class="muted">No ${year} results yet.</p></section>`; return; }
  ({ overview: tabOverview, results: tabResults, drivers: tabDrivers, teams: tabTeams, driver: tabDriver, h2h: tabH2H, consistency: tabConsistency, pits: tabPits })[tab](body, S);
}

/* ---------- Overview ---------- */
async function tabOverview(body, S) {
  let cal = []; try { cal = await getCal(S.year); } catch {}
  const total = Math.max(cal.length, S.races.length) || 1; const done = S.races.filter(r => r.R.length).length;
  const L = S.standNow[0], L2 = S.standNow[1]; const ld = L && S.D[L.id];
  const winners = new Set(S.races.flatMap(r => r.R.filter(x => x.pos === 1 && classified(x)).map(x => x.id)));
  const dnfs = S.races.reduce((a, r) => a + r.R.filter(isDNF).length, 0);
  const lapsAll = S.races.reduce((a, r) => a + (r.R[0] ? r.R[0].laps : 0), 0);
  const poleWins = S.races.filter(r => { const p = r.Q.find(q => q.pos === 1), w = r.R.find(x => x.pos === 1); return p && w && p.id === w.id; }).length;
  const pits = Store.get('pits:' + S.year); const fast = pits && pits.v && pits.v.rows.length ? pits.v.rows.slice().sort((a, b) => a.dur - b.dur)[0] : null;
  const T0 = S.teamStand[0];
  const cards = [
    ['Season progress', `${Math.round(done / total * 100)}%`, `${done} of ${total} Grands Prix`, 'calendar', done / total],
    ['Championship leader', ld ? ld.code : '\u2014', L ? `${L.pts} pts \u00b7 +${L.pts - (L2 ? L2.pts : 0)} ahead` : '', 'standings'],
    ['Constructors leader', T0 ? S.T[T0.id].name : '\u2014', T0 ? `${T0.pts} pts` : '', 'standings'],
    ['Different winners', String(winners.size), `${poleWins} of ${done} won from pole`, 'results'],
    ['Fastest pit stop', fast ? fast.dur.toFixed(2) + ' s' : '\u2014', fast ? `${fast.code} \u00b7 ${fast.gp}` : 'Open Pit Stops to calculate', 'pits'],
    ['Retirements', String(dnfs), `${lapsAll.toLocaleString()} race laps run`, 'consistency'],
  ];
  const evD = S.standNow.slice(0, 10).map(x => { const d = S.D[x.id]; const pv = S.standPrev.find(p => p.id === x.id); return `<tr><td class="pos">${x.rank}</td><td>${dTag(d)}</td><td class="mono">${x.pts}</td><td class="mono muted">${x.rank === 1 ? '' : '-' + (L.pts - x.pts)}</td><td>${evo(x.rank, pv && pv.rank)}</td></tr>`; }).join('');
  const evT = S.teamStand.slice(0, 10).map(x => `<tr><td class="pos">${x.rank}</td><td><span class="dtag"><i style="background:${S.T[x.id].color}"></i>${esc(S.T[x.id].name)}</span></td><td class="mono">${x.pts}</td><td class="mono muted">${x.rank === 1 ? '' : '-' + (T0.pts - x.pts)}</td><td>${evo(x.rank, x.prev)}</td></tr>`).join('');
  const feed = recordsFeed(S);
  body.innerHTML = `<div class="stat-cards">${cards.map(([h, v, s, link, pr]) => `<a class="stat-card" href="#/season?tab=${link}&y=${S.year}"><span>${esc(h)}</span><b>${esc(v)}</b><small>${esc(s)}</small>${pr != null ? `<i class="bar"><i style="width:${Math.round(pr * 100)}%"></i></i>` : ''}</a>`).join('')}</div>
  <section class="grid2 even">
    <section class="card" id="ov-drivers"><div class="card-h"><h2 class="rc-h">Driver standings</h2><a class="btn btn-sm" href="#/season?tab=standings&y=${S.year}">Full standings</a></div>
      <div class="table-wrap"><table class="tbl"><thead><tr><th>Pos</th><th>Driver</th><th>Pts</th><th>Gap</th><th>Evo.</th></tr></thead><tbody>${evD}</tbody></table></div>${snapBtn('ov-drivers')}</section>
    <section class="card" id="ov-teams"><div class="card-h"><h2 class="rc-h">Constructor standings</h2></div>
      <div class="table-wrap"><table class="tbl"><thead><tr><th>Pos</th><th>Team</th><th>Pts</th><th>Gap</th><th>Evo.</th></tr></thead><tbody>${evT}</tbody></table></div>${snapBtn('ov-teams')}</section>
  </section>
  <section class="card" id="ov-feed"><div class="card-h"><h2 class="rc-h">${S.year} stats & records</h2><div class="seg-tabs" id="feed-f">${['All', 'Race', 'Driver', 'Team'].map((t, i) => `<button class="seg ${i ? '' : 'on'}" data-f="${t}">${t}</button>`).join('')}</div></div>
    <div id="feed-list" class="feed"></div>${snapBtn('ov-feed')}</section>`;
  const draw = f => { $('#feed-list').innerHTML = feed.filter(x => f === 'All' || x.tag === f).slice(0, 40).map(x => `<div class="feed-item"><span class="ftag ftag-${x.tag.toLowerCase()}">${x.tag}</span><div><b>${esc(x.title)}</b><p class="muted small">${esc(x.text)}</p></div><span class="muted small">${esc(x.where)}</span></div>`).join('') || '<p class="muted">No records yet.</p>'; };
  $$('#feed-f .seg').forEach(b => b.onclick = () => { $$('#feed-f .seg').forEach(x => x.classList.toggle('on', x === b)); draw(b.dataset.f); }); draw('All');
}
function recordsFeed(S) {
  const out = []; const winsSoFar = {}; const podSoFar = {};
  for (const race of S.races) {
    const gp = race.name.replace(' Grand Prix', ' GP'); const w = race.R.find(x => x.pos === 1 && classified(x)); const p = race.Q.find(q => q.pos === 1);
    if (w) { const d = S.D[w.id]; out.push({ tag: 'Race', title: `${d.name} wins the ${race.name}`, text: `${w.team} \u00b7 started P${w.grid || 'L'}${w.time ? ' \u00b7 ' + w.time : ''}`, where: gp, r: race.round });
      winsSoFar[w.id] = (winsSoFar[w.id] || 0) + 1; if (winsSoFar[w.id] === 1) out.push({ tag: 'Driver', title: `First ${S.year} win for ${d.name}`, text: `Win number 1 of the season at round ${race.round}.`, where: gp, r: race.round }); }
    if (p) { const d = S.D[p.id]; out.push({ tag: 'Driver', title: `${d.name} takes pole`, text: `${p.q3 || p.q2 || p.q1 || ''} in qualifying${w && w.id === p.id ? ' \u2014 and converted it into the win' : ''}.`, where: gp, r: race.round }); }
    const top2 = race.R.filter(x => x.pos <= 2 && classified(x)); if (top2.length === 2 && top2[0].tid === top2[1].tid) out.push({ tag: 'Team', title: `${top2[0].team} one-two`, text: `${S.D[top2.find(x => x.pos === 1).id].family} leads ${S.D[top2.find(x => x.pos === 2).id].family} home.`, where: gp, r: race.round });
    const climb = race.R.filter(x => classified(x) && x.grid > 0).map(x => ({ x, g: x.grid - x.pos })).sort((a, b) => b.g - a.g)[0];
    if (climb && climb.g >= 6) out.push({ tag: 'Driver', title: `${S.D[climb.x.id].name} gains ${climb.g} places`, text: `From P${climb.x.grid} on the grid to P${climb.x.pos} at the flag.`, where: gp, r: race.round });
    for (const x of race.R.filter(x => x.pos <= 3 && classified(x))) { podSoFar[x.id] = (podSoFar[x.id] || 0) + 1; if (podSoFar[x.id] === 1 && x.pos > 1) out.push({ tag: 'Driver', title: `First ${S.year} podium for ${S.D[x.id].name}`, text: `P${x.pos} for ${x.team}.`, where: gp, r: race.round }); }
    const dn = race.R.filter(isDNF).length; if (dn >= 4) out.push({ tag: 'Race', title: `${dn} retirements in ${race.name.replace(' Grand Prix', '')}`, text: 'One of the season\'s highest attrition races.', where: gp, r: race.round });
    const sw = race.S.find(x => x.pos === 1); if (sw) out.push({ tag: 'Race', title: `${S.D[sw.id].name} wins the Sprint`, text: sw.team, where: gp, r: race.round });
  }
  const pts = Object.values(S.T).map(t => ({ t, pts: (S.teamStand.find(x => x.id === t.id) || {}).pts })).sort((a, b) => b.pts - a.pts);
  if (pts[0] && pts[1]) out.push({ tag: 'Team', title: `${pts[0].t.name} lead the Constructors'`, text: `${pts[0].pts} pts, ${pts[0].pts - pts[1].pts} clear of ${pts[1].t.name}.`, where: 'Season', r: 999 });
  return out.sort((a, b) => b.r - a.r);
}

/* ---------- Results ---------- */
function tabResults(body, S) {
  const last = S.races[S.races.length - 1]; App.resRound = App.resRound && S.races.some(r => r.round === App.resRound) ? App.resRound : last.round; App.resKind = App.resKind || 'R';
  body.innerHTML = `<section class="card" id="res-card"><div class="card-h"><div class="row"><select id="res-round">${S.races.map(r => `<option value="${r.round}" ${r.round === App.resRound ? 'selected' : ''}>${r.round} - ${esc(r.name)}</option>`).join('')}</select>
    <div class="seg-tabs" id="res-kind">${[['R', 'Race'], ['Q', 'Qualifying'], ['S', 'Sprint']].map(([k, n]) => `<button class="seg ${k === App.resKind ? 'on' : ''}" data-k="${k}">${n}</button>`).join('')}</div></div>
    <div class="row"><button class="btn btn-sm" id="res-x">Excel</button><button class="btn btn-sm" id="res-c">CSV</button></div></div><div id="res-tbl"></div>${snapBtn('res-card')}</section>`;
  const draw = () => { const race = S.races.find(r => r.round === App.resRound); const k = App.resKind; let cols, rows;
    if (k === 'Q') { cols = ['Pos', 'No', 'Driver', 'Team', 'Q1', 'Q2', 'Q3', 'Gap to pole']; const pole = race.Q[0] ? tsec(race.Q[0].q3 || race.Q[0].q2 || race.Q[0].q1) : null;
      rows = race.Q.map(q => { const b = tsec(q.q3 || q.q2 || q.q1); return [q.pos, q.num, S.D[q.id].name, q.team, q.q1 || '', q.q2 || '', q.q3 || '', q.pos === 1 || !b || !pole ? '' : '+' + (b - pole).toFixed(3)]; }); }
    else { const list = k === 'S' ? race.S : race.R; cols = ['Pos', 'No', 'Driver', 'Team', 'Grid', '+/-', 'Laps', 'Time / Status', 'Pts', 'Fastest lap'];
      rows = list.map(r => [r.pt, r.num, S.D[r.id].name, r.team, r.grid || 'PL', classified(r) && r.grid ? (r.grid - r.pos > 0 ? '+' : '') + (r.grid - r.pos) : '', r.laps, r.time || r.status, r.pts, r.fl === 1 ? '\u2605 ' + (r.flt || '') : (r.flt || '')]); }
    App.resData = { cols, rows, name: `${S.year}_R${race.round}_${{ R: 'Race', Q: 'Qualifying', S: 'Sprint' }[k]}` };
    $('#res-tbl').innerHTML = rows.length ? `<div class="table-wrap"><table class="tbl"><thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((v, i) => `<td class="${i === 5 ? (String(v).startsWith('+') ? 'up' : String(v).startsWith('-') ? 'down' : '') : ''}">${i === 2 ? dTag(S.D[(k === 'Q' ? race.Q : k === 'S' ? race.S : race.R)[rows.indexOf(r)].id]) : esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : '<p class="muted">No results for this session.</p>'; };
  $('#res-round').onchange = e => { App.resRound = +e.target.value; draw(); };
  $$('#res-kind .seg').forEach(b => b.onclick = () => { App.resKind = b.dataset.k; $$('#res-kind .seg').forEach(x => x.classList.toggle('on', x === b)); draw(); });
  $('#res-x').onclick = () => exportXlsx([{ name: 'Results', columns: App.resData.cols, rows: App.resData.rows }], App.resData.name + '.xlsx');
  $('#res-c').onclick = () => exportCsv(App.resData.cols, App.resData.rows, App.resData.name + '.csv');
  draw();
}

/* ---------- Drivers & Teams ---------- */
function tabDrivers(body, S) {
  const list = S.standNow.map(x => S.D[x.id]);
  body.innerHTML = `<section class="card" id="drv-grid-card"><div class="card-h"><h2 class="rc-h">${S.year} drivers</h2></div><div class="drv-grid">${list.map(d => { const s = S.stats[d.id]; const st = S.standNow.find(x => x.id === d.id);
    const age = d.dob ? Math.floor((Date.now() - new Date(d.dob)) / 31557600000) : '';
    return `<a class="drv-card" style="--c:${d.color}" href="#/season?tab=driver&y=${S.year}&d=${d.id}"><span class="drv-num">${esc(d.num || '')}</span><span class="drv-pos">P${st.rank}</span>
      <b>${esc(d.given)}</b><b class="fam">${esc(d.family)}</b><span class="muted small">${esc(d.team)} \u00b7 ${esc(d.nat || '')}${age ? ' \u00b7 ' + age : ''}</span>
      <span class="drv-line"><span><b>${s.pts}</b> pts</span><span><b>${s.wins}</b> wins</span><span><b>${s.pod}</b> podiums</span><span><b>${s.poles}</b> poles</span></span></a>`; }).join('')}</div>${snapBtn('drv-grid-card')}</section>`;
}
function tabTeams(body, S) {
  body.innerHTML = `<section class="card" id="team-grid-card"><div class="card-h"><h2 class="rc-h">${S.year} teams</h2></div><div class="drv-grid">${S.teamStand.map(t => { const T = S.T[t.id]; const ds = [...T.drivers].map(id => S.D[id]).filter(Boolean);
    const pod = ds.reduce((a, d) => a + (S.stats[d.id] ? S.stats[d.id].pod : 0), 0); const poles = ds.reduce((a, d) => a + (S.stats[d.id] ? S.stats[d.id].poles : 0), 0);
    return `<div class="drv-card" style="--c:${T.color}"><span class="drv-pos">P${t.rank}</span><b class="fam">${esc(T.name)}</b>
      <span class="muted small">${ds.map(d => esc(d.family)).join(' \u00b7 ')}</span>${carHtml(teamKey(T.id + ' ' + T.name), S.year, 'side', T.color)}
      <span class="drv-line"><span><b>${t.pts}</b> pts</span><span><b>${t.wins}</b> wins</span><span><b>${pod}</b> podiums</span><span><b>${poles}</b> poles</span></span></div>`; }).join('')}</div>${snapBtn('team-grid-card')}</section>`;
}

/* ---------- Driver Stats ---------- */
async function tabDriver(body, S) {
  const q = new URLSearchParams(location.hash.split('?')[1] || ''); const id = q.get('d') && S.D[q.get('d')] ? q.get('d') : (App.drvId && S.D[App.drvId] ? App.drvId : S.standNow[0].id); App.drvId = id;
  const d = S.D[id], s = S.stats[id]; const nGP = s.starts || 1; const st = S.standNow.find(x => x.id === id);
  const cards = [['Grand Prix wins', s.wins, `+${s.sWins} Sprint win${s.sWins === 1 ? '' : 's'}`], ['Podiums', s.pod, `+${s.sPod} Sprint podium${s.sPod === 1 ? '' : 's'}`], ['Season points', s.pts, `${(s.pts / nGP).toFixed(1)} per Grand Prix \u00b7 P${st.rank}`],
    ['Poles', s.poles, `${s.q3} Q3 appearances`], ['Fastest laps', s.fl, `${s.ptsFin} points finishes`], ['Places gained', (s.gained > 0 ? '+' : '') + s.gained, `Avg finish ${avg(s.fins) ? avg(s.fins).toFixed(1) : '\u2014'} \u00b7 ${s.dnf} DNF`]];
  body.innerHTML = `<section class="card" id="ds-card"><div class="card-h"><div class="row"><span class="drv-num big" style="--c:${d.color}">${esc(d.num || '')}</span><div><h2>${esc(d.name)}</h2><span class="muted">${esc(d.team)} \u00b7 ${esc(d.nat || '')}</span></div></div>
    <div class="row"><select id="ds-sel">${S.standNow.map(x => `<option value="${x.id}" ${x.id === id ? 'selected' : ''}>${esc(S.D[x.id].name)}</option>`).join('')}</select><button class="btn btn-sm" id="ds-x">Excel</button></div></div>
    <div class="stat-cards in">${cards.map(([h, v, sub]) => `<div class="stat-card"><span>${h}</span><b>${v}</b><small>${esc(sub)}</small></div>`).join('')}</div>${snapBtn('ds-card')}</section>
  <section class="grid2 even">
    <section class="card" id="ds-perf"><h2 class="rc-h">Season performance</h2><p class="note">Qualifying vs race finish each round (lower is better).</p><div class="chart-box"><canvas id="c-perf"></canvas></div>${snapBtn('ds-perf')}</section>
    <section class="card" id="ds-pts"><h2 class="rc-h">Points per round</h2><div class="chart-box"><canvas id="c-pts"></canvas></div>${snapBtn('ds-pts')}</section>
    <section class="card" id="ds-evo"><h2 class="rc-h">Points evolution vs ${S.year - 1}</h2><div class="chart-box"><canvas id="c-evo"></canvas></div>${snapBtn('ds-evo')}</section>
    <section class="card" id="ds-flow"><h2 class="rc-h">Start \u2192 finish</h2><p class="note">Bar runs from grid slot to finishing position; green = gained, red = lost.</p><div class="chart-box"><canvas id="c-flow"></canvas></div>${snapBtn('ds-flow')}</section>
    <section class="card" id="ds-dist"><h2 class="rc-h">Finish positions</h2><div class="chart-box"><canvas id="c-dist"></canvas></div>${snapBtn('ds-dist')}</section>
    <section class="card" id="ds-laps"><h2 class="rc-h">Laps completed per race</h2><div class="chart-box"><canvas id="c-laps"></canvas></div>${snapBtn('ds-laps')}</section>
  </section>`;
  $('#ds-sel').onchange = e => { location.hash = `#/season?tab=driver&y=${S.year}&d=${e.target.value}`; };
  const labels = s.rounds.map(r => 'R' + r.round);
  mkChart($('#c-perf'), { type: 'line', data: { labels, datasets: [{ label: 'Race finish', data: s.rounds.map(r => r.pos), borderColor: d.color, backgroundColor: d.color, spanGaps: false, tension: .2 }, { label: 'Qualifying', data: s.rounds.map(r => r.q), borderColor: '#9aa8c4', backgroundColor: '#9aa8c4', borderDash: [5, 4], tension: .2 }] },
    options: { responsive: true, maintainAspectRatio: false, animation: false, scales: { y: { reverse: true, min: 1, suggestedMax: 20, ticks: { stepSize: 1 } } } } });
  mkChart($('#c-pts'), { type: 'bar', data: { labels, datasets: [{ label: 'Points', data: s.rounds.map(r => r.pts), backgroundColor: d.color, borderRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { display: false } } } });
  const counts = {}; s.rounds.forEach(r => { const k = r.pos ? String(r.pos) : (r.pt ? 'DNF' : null); if (k) counts[k] = (counts[k] || 0) + 1; });
  const dl = [...Array.from({ length: 20 }, (_, i) => String(i + 1)), 'DNF'].filter(k => counts[k]);
  mkChart($('#c-dist'), { type: 'bar', data: { labels: dl.map(k => k === 'DNF' ? k : 'P' + k), datasets: [{ label: 'Finishes', data: dl.map(k => counts[k]), backgroundColor: dl.map(k => k === 'DNF' ? '#6b7385' : +k <= 3 ? '#f5a623' : +k <= 10 ? d.color : teamColor(d.color, .4)), borderRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { display: false } }, scales: { y: { ticks: { stepSize: 1 } } } } });
  const fl = s.rounds.filter(r => r.grid && r.pos);
  mkChart($('#c-flow'), { type: 'bar', data: { labels: fl.map(r => 'R' + r.round), datasets: [{ label: 'Grid \u2192 finish', data: fl.map(r => [r.grid, r.pos]), backgroundColor: fl.map(r => r.grid > r.pos ? '#16c784' : r.grid < r.pos ? '#e10600' : '#9aa8c4'), borderRadius: 4, borderSkipped: false }] },
    options: { responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { display: false } }, scales: { y: { reverse: true, min: 1, suggestedMax: 20 } } } });
  const lr = S.races.map(r => { const x = r.R.find(y => y.id === id); return x ? x.laps : null; });
  mkChart($('#c-laps'), { type: 'bar', data: { labels: S.races.map(r => 'R' + r.round), datasets: [{ label: 'Laps completed', data: lr, backgroundColor: teamColor(d.color, .8), borderRadius: 4 }, { label: 'Race distance', type: 'line', data: S.races.map(r => r.R[0] ? r.R[0].laps : null), borderColor: '#9aa8c4', pointRadius: 0, borderDash: [4, 4] }] }, options: { responsive: true, maintainAspectRatio: false, animation: false } });
  $('#ds-x').onclick = () => exportXlsx([{ name: d.code + ' by round', columns: ['Round', 'Grand Prix', 'Qualifying', 'Grid', 'Finish', 'Points', 'Cumulative'], rows: s.rounds.map(r => [r.round, r.name, r.q ?? '', r.grid ?? '', r.pos ?? (r.pt || ''), r.pts, r.cum]) },
    { name: 'Summary', columns: ['Metric', 'Value'], rows: cards.map(c => [c[0], c[1]]) }], `F1_${S.year}_${d.code}_stats.xlsx`);
  const evoBox = $('#c-evo');
  let prev = null; try { prev = await seasonData(S.year - 1); } catch {}
  const ps = prev && prev.stats[id];
  mkChart(evoBox, { type: 'line', data: { labels: Array.from({ length: Math.max(s.rounds.length, ps ? ps.rounds.length : 0) }, (_, i) => 'R' + (i + 1)), datasets: [{ label: String(S.year), data: s.rounds.map(r => r.cum), borderColor: d.color, backgroundColor: d.color, tension: .25 },
    ...(ps ? [{ label: String(S.year - 1), data: ps.rounds.map(r => r.cum), borderColor: '#9aa8c4', backgroundColor: '#9aa8c4', borderDash: [6, 4], tension: .25 }] : [])] }, options: { responsive: true, maintainAspectRatio: false, animation: false } });
}

/* ---------- Head to Head ---------- */
function tabH2H(body, S) {
  const q = new URLSearchParams(location.hash.split('?')[1] || '');
  let a = q.get('a') && S.D[q.get('a')] ? q.get('a') : S.standNow[0].id;
  let b = q.get('b') && S.D[q.get('b')] ? q.get('b') : ([...S.T[S.D[a].tid].drivers].find(x => x !== a && S.stats[x]) || S.standNow[1].id);
  const A = S.D[a], B0 = S.D[b], sa = S.stats[a], sb = S.stats[b];
  const B = A.color.toLowerCase() === B0.color.toLowerCase() ? Object.assign({}, B0, { color: shade(B0.color, 0.55) }) : B0;
  let qa = 0, qb = 0, ra = 0, rb = 0; const qgap = [];
  for (const race of S.races) {
    const x = race.Q.find(z => z.id === a), y = race.Q.find(z => z.id === b);
    if (x && y) { x.pos < y.pos ? qa++ : qb++; for (const k of ['q3', 'q2', 'q1']) if (x[k] && y[k]) { qgap.push({ r: race.round, name: race.name, g: tsec(y[k]) - tsec(x[k]), seg: k.toUpperCase() }); break; } }
    const u = race.R.find(z => z.id === a), v = race.R.find(z => z.id === b);
    if (u && v && (classified(u) || classified(v))) { const pu = classified(u) ? u.pos : 99, pv = classified(v) ? v.pos : 99; pu < pv ? ra++ : rb++; }
  }
  const best = (n, f = ord) => n == null ? '\u2014' : f(n);
  const rows = [['Total points', sa.pts, sb.pts], ['Wins', sa.wins, sb.wins], ['Podiums', sa.pod, sb.pod], ['Points finishes', sa.ptsFin, sb.ptsFin], ['Poles', sa.poles, sb.poles], ['Q3 appearances', sa.q3, sb.q3],
    ['Best race finish', sa.bestFin, sb.bestFin, true], ['Best qualifying', sa.bestQ, sb.bestQ, true], ['Sprint wins', sa.sWins, sb.sWins], ['Sprint podiums', sa.sPod, sb.sPod], ['Fastest laps', sa.fl, sb.fl], ['DNFs', sa.dnf, sb.dnf, 'num'],
    ['Qualifying H2H', qa, qb], ['Race H2H', ra, rb]];
  body.innerHTML = `<section class="card" id="h2h-card"><div class="h2h-top">
      <div class="h2h-side" style="--c:${A.color}"><span class="drv-num big">${esc(A.num || '')}</span><select id="h2h-a">${S.standNow.map(x => `<option value="${x.id}" ${x.id === a ? 'selected' : ''}>${esc(S.D[x.id].name)}</option>`).join('')}</select><span class="muted">${esc(A.team)}</span></div>
      <div class="h2h-vs">VS</div>
      <div class="h2h-side r" style="--c:${B.color}"><span class="drv-num big">${esc(B.num || '')}</span><select id="h2h-b">${S.standNow.map(x => `<option value="${x.id}" ${x.id === b ? 'selected' : ''}>${esc(S.D[x.id].name)}</option>`).join('')}</select><span class="muted">${esc(B.team)}</span></div></div>
    <div class="h2h-rows">${rows.map(([lab, x, y, low]) => { const xv = x ?? 0, yv = y ?? 0; const tot = (xv + yv) || 1; const wa = low ? (x != null && (y == null || x < y)) : xv > yv; const wb = low ? (y != null && (x == null || y < x)) : yv > xv;
      const fa = low === true ? best(x) : x, fb = low === true ? best(y) : y; const pa = low === 'num' ? (tot ? yv / tot * 100 : 50) : low ? (x && y ? (1 / x) / ((1 / x) + (1 / y)) * 100 : 50) : xv / tot * 100;
      return `<div class="h2h-row"><b class="${wa ? 'win' : ''}">${fa ?? '\u2014'}</b><div class="h2h-bar"><span>${esc(lab)}</span><i><i style="width:${pa}%;background:${A.color}"></i><i style="width:${100 - pa}%;background:${B.color}"></i></i></div><b class="${wb ? 'win' : ''}">${fb ?? '\u2014'}</b></div>`; }).join('')}</div>${snapBtn('h2h-card')}</section>
  <section class="grid2 even">
    <section class="card" id="h2h-gap"><div class="card-h"><h2 class="rc-h">Points gap</h2><div class="seg-tabs" id="gap-mode"><button class="seg on" data-m="cum">Cumulative</button><button class="seg" data-m="round">Per round</button></div></div><div class="chart-box"><canvas id="c-gap"></canvas></div>${snapBtn('h2h-gap')}</section>
    <section class="card" id="h2h-q"><h2 class="rc-h">Qualifying gaps</h2><p class="note">Each dot is one qualifying session: ${esc(B.family)}'s time minus ${esc(A.family)}'s in the last segment both set a time (positive = ${esc(A.family)} faster).</p><div class="chart-box"><canvas id="c-qgap"></canvas></div>${snapBtn('h2h-q')}</section>
  </section>
  <section class="card" id="h2h-pole"><h2 class="rc-h">Team gap to pole</h2><p class="note">Average gap of each team's fastest qualifying lap to pole position across the season.</p><div class="chart-box"><canvas id="c-pole"></canvas></div>${snapBtn('h2h-pole')}</section>`;
  const nav = (na, nb) => { location.hash = `#/season?tab=h2h&y=${S.year}&a=${na}&b=${nb}`; };
  $('#h2h-a').onchange = e => nav(e.target.value, b); $('#h2h-b').onchange = e => nav(a, e.target.value);
  const labels = S.races.map(r => 'R' + r.round);
  let gapChart;
  const drawGap = m => { if (gapChart) gapChart.destroy(); const vals = sa.rounds.map((r, i) => m === 'cum' ? r.cum - sb.rounds[i].cum : r.pts - sb.rounds[i].pts);
    gapChart = mkChart($('#c-gap'), { type: m === 'cum' ? 'line' : 'bar', data: { labels, datasets: [{ label: `${A.code} \u2212 ${B.code}`, data: vals, borderColor: A.color, backgroundColor: vals.map(v => v >= 0 ? A.color : B.color), fill: false, tension: .2, borderRadius: 4 }] }, options: { responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { display: false } } } }); };
  $$('#gap-mode .seg').forEach(x => x.onclick = () => { $$('#gap-mode .seg').forEach(y => y.classList.toggle('on', y === x)); drawGap(x.dataset.m); }); drawGap('cum');
  mkChart($('#c-qgap'), { type: 'scatter', data: { datasets: [{ label: 'Gap (s)', data: qgap.map(g => ({ x: g.r, y: +g.g.toFixed(3) })), backgroundColor: qgap.map(g => g.g >= 0 ? A.color : B.color), pointRadius: 7 }] },
    options: { responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => `${qgap[c.dataIndex].name} (${qgap[c.dataIndex].seg}): ${c.parsed.y > 0 ? '+' : ''}${c.parsed.y}s` } } }, scales: { x: { title: { display: true, text: 'Round' }, ticks: { stepSize: 1 } }, y: { title: { display: true, text: 'seconds' } } } } });
  const tg = {}; for (const race of S.races) { const pole = race.Q[0] ? tsec(race.Q[0].q3 || race.Q[0].q2 || race.Q[0].q1) : null; if (!pole) continue; const bestByTeam = {};
    for (const x of race.Q) { const t = tsec(x.q3 || x.q2 || x.q1); if (t && (!bestByTeam[x.tid] || t < bestByTeam[x.tid])) bestByTeam[x.tid] = t; }
    for (const [tid, t] of Object.entries(bestByTeam)) (tg[tid] = tg[tid] || []).push((t - pole) / pole * 100); }
  const tl = Object.entries(tg).map(([tid, a]) => ({ tid, v: avg(a) })).sort((x, y) => x.v - y.v);
  mkChart($('#c-pole'), { type: 'bar', data: { labels: tl.map(x => S.T[x.tid].name), datasets: [{ label: 'Avg gap to pole (%)', data: tl.map(x => +x.v.toFixed(3)), backgroundColor: tl.map(x => S.T[x.tid].color), borderRadius: 4 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { display: false } } } });
}

/* ---------- Consistency ---------- */
function tabConsistency(body, S) {
  App.cons = App.cons || { mode: 'R', exDnf: true }; const C = App.cons;
  body.innerHTML = `<section class="card" id="cons-card"><div class="card-h"><h2 class="rc-h">Consistency</h2><div class="row">
    <div class="seg-tabs" id="cons-m">${[['R', 'Race'], ['S', 'Sprint'], ['Q', 'Qualifying']].map(([k, n]) => `<button class="seg ${k === C.mode ? 'on' : ''}" data-k="${k}">${n}</button>`).join('')}</div>
    <label class="chk"><input type="checkbox" id="cons-dnf" ${C.exDnf ? 'checked' : ''}> Exclude DNFs</label><button class="btn btn-sm" id="cons-x">Excel</button></div></div>
    <p class="note">Ranked by average position. Bars show each driver's best-to-worst range; the dot is the average and \u03c3 is the standard deviation (lower = more consistent).</p>
    <div class="chart-box tall"><canvas id="c-cons"></canvas></div><div id="cons-tbl"></div>${snapBtn('cons-card')}</section>`;
  const draw = () => {
    destroyCharts();
    const rows = Object.values(S.D).map(d => { const vals = [];
      for (const race of S.races) { if (C.mode === 'Q') { const x = race.Q.find(z => z.id === d.id); if (x) vals.push(x.pos); }
        else { const x = (C.mode === 'S' ? race.S : race.R).find(z => z.id === d.id); if (!x) continue; if (classified(x)) vals.push(x.pos); else if (!C.exDnf) vals.push(20); } }
      return { d, vals, a: avg(vals), s: sd(vals), mn: vals.length ? Math.min(...vals) : null, mx: vals.length ? Math.max(...vals) : null }; }).filter(r => r.vals.length >= Math.min(3, S.races.length)).sort((x, y) => x.a - y.a);
    mkChart($('#c-cons'), { type: 'bar', data: { labels: rows.map(r => r.d.code), datasets: [{ type: 'line', label: 'Average', data: rows.map(r => +r.a.toFixed(2)), showLine: false, pointRadius: 6, pointBackgroundColor: '#fff', pointBorderColor: '#111', borderColor: '#111' },
      { label: 'Range (best\u2013worst)', data: rows.map(r => [r.mn, r.mx]), backgroundColor: rows.map(r => teamColor(r.d.color, .75)), borderRadius: 6, borderSkipped: false }] },
      options: { responsive: true, maintainAspectRatio: false, animation: false, scales: { y: { reverse: true, min: 1, suggestedMax: 20, title: { display: true, text: 'Position' } } } } });
    App.consRows = rows.map((r, i) => [i + 1, r.d.name, r.d.team, +r.a.toFixed(2), +r.s.toFixed(2), r.mn, r.mx, r.vals.length]);
    $('#cons-tbl').innerHTML = `<div class="table-wrap"><table class="tbl"><thead><tr><th>Rank</th><th>Driver</th><th>Avg</th><th>\u03c3</th><th>Best</th><th>Worst</th><th>Events</th></tr></thead><tbody>${rows.map((r, i) => `<tr><td class="pos">${i + 1}</td><td>${dTag(r.d)}</td><td class="mono">${r.a.toFixed(2)}</td><td class="mono">${r.s.toFixed(2)}</td><td>${ord(r.mn)}</td><td>${ord(r.mx)}</td><td>${r.vals.length}</td></tr>`).join('')}</tbody></table></div>`;
  };
  $$('#cons-m .seg').forEach(b => b.onclick = () => { C.mode = b.dataset.k; $$('#cons-m .seg').forEach(x => x.classList.toggle('on', x === b)); draw(); });
  $('#cons-dnf').onchange = e => { C.exDnf = e.target.checked; draw(); };
  $('#cons-x').onclick = () => exportXlsx([{ name: 'Consistency', columns: ['Rank', 'Driver', 'Team', 'Average', 'Std dev', 'Best', 'Worst', 'Events'], rows: App.consRows }], `F1_${S.year}_consistency_${C.mode}.xlsx`);
  draw();
}

/* ---------- Pit stops (OpenF1) ---------- */
async function pitData(year, progress) {
  const c = Store.get('pits:' + year); if (c && Date.now() - c.t < 6 * 3600e3) return c.v;
  const sessions = (await of1(`sessions?year=${year}&session_name=Race`, 3600)).filter(s => new Date(s.date_end) < Date.now()).sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
  if (!sessions.length) return { rows: [], metric: 'stop' };
  const drv = {}; (await of1(`drivers?session_key=${sessions[sessions.length - 1].session_key}`, 86400).catch(() => [])).forEach(d => drv[d.driver_number] = { code: d.name_acronym, team: d.team_name, color: '#' + String(d.team_colour || '888888').replace('#', '') });
  const rows = []; let i = 0;
  for (const s of sessions) {
    progress && progress(++i, sessions.length, s.country_name || s.location);
    let pits = []; try { pits = await of1(`pit?session_key=${s.session_key}`, 86400); } catch (e) { if (e.status === 401 || e.status === 403) throw e; }
    for (const p of pits) { const d = drv[p.driver_number] || { code: '#' + p.driver_number, team: '\u2014', color: '#888888' };
      rows.push({ gp: s.country_name || s.location, round: i, code: d.code, team: d.team, color: d.color, lap: p.lap_number, stop: p.stop_duration ?? null, lane: p.lane_duration ?? p.pit_duration ?? null }); }
  }
  const withStop = rows.filter(r => r.stop > 1.5 && r.stop < 30).length; const metric = withStop >= rows.length * 0.5 ? 'stop' : 'lane';
  const clean = rows.map(r => Object.assign(r, { dur: metric === 'stop' ? r.stop : r.lane })).filter(r => r.dur && (metric === 'stop' ? r.dur > 1.5 && r.dur < 30 : r.dur > 10 && r.dur < 60));
  const v = { rows: clean, metric }; Store.set('pits:' + year, { t: Date.now(), v }); return v;
}
async function tabPits(body, S) {
  body.innerHTML = `<section class="card"><div class="loading"><span class="spinner"></span> <span id="pit-prog">Loading pit stops\u2026</span></div></section>`;
  let P; try { P = await pitData(S.year, (i, n, gp) => { const el = $('#pit-prog'); if (el) el.textContent = `Loading pit stops ${i}/${n} \u00b7 ${gp}`; }); } catch (e) { body.innerHTML = errorBox(e); return; }
  if (!P.rows.length) { body.innerHTML = `<section class="card"><p class="muted">No pit stop data published for ${S.year} yet.</p></section>`; return; }
  const R = P.rows; const label = P.metric === 'stop' ? 'Stationary time' : 'Pit-lane time';
  const by = (k) => { const m = {}; R.forEach(r => (m[r[k]] = m[r[k]] || []).push(r)); return m; };
  const teams = Object.entries(by('team')).map(([t, a]) => ({ t, color: a[0].color, n: a.length, avg: avg(a.map(r => r.dur)), sd: sd(a.map(r => r.dur)), best: Math.min(...a.map(r => r.dur)) })).sort((a, b) => a.avg - b.avg);
  const drivers = Object.entries(by('code')).map(([c, a]) => ({ c, color: a[0].color, n: a.length, avg: avg(a.map(r => r.dur)) })).sort((a, b) => a.avg - b.avg);
  const gps = Object.entries(by('gp')).map(([g, a]) => ({ g, round: a[0].round, avg: avg(a.map(r => r.dur)), n: a.length })).sort((a, b) => a.round - b.round);
  const top = R.slice().sort((a, b) => a.dur - b.dur).slice(0, 20); const f = top[0]; const cons = teams.filter(t => t.n >= 5).sort((a, b) => a.sd - b.sd)[0] || teams[0];
  const total = R.reduce((a, r) => a + r.dur, 0);
  const cards = [['Fastest pit stop', f.dur.toFixed(2) + ' s', `${f.team} \u00b7 ${f.code} \u00b7 ${f.gp}`], ['Fastest team on average', teams[0].avg.toFixed(2) + ' s', `${teams[0].t} \u00b7 ${teams[0].n} stops`],
    ['Most consistent team', '\u00b1' + cons.sd.toFixed(2) + ' s', `${cons.t} \u00b7 ${cons.n} stops`], ['Average pit stop', avg(R.map(r => r.dur)).toFixed(2) + ' s', `${R.length} recorded stops`], ['Cumulative time', `${Math.floor(total / 60)}m ${(total % 60).toFixed(2)}s`, label]];
  body.innerHTML = `<div class="stat-cards">${cards.map(([h, v, s]) => `<div class="stat-card"><span>${h}</span><b>${v}</b><small>${esc(s)}</small></div>`).join('')}</div>
  <p class="note">${label} from OpenF1${P.metric === 'lane' ? ' (stationary times weren\'t available, so pit-lane entry-to-exit times are used)' : ''}. Excludes stops outside normal ranges (penalties, repairs, red flags).</p>
  <section class="grid2 even">
    <section class="card" id="pit-top"><div class="card-h"><h2 class="rc-h">Top 20 fastest stops</h2><button class="btn btn-sm" id="pit-x">Excel</button></div><div class="table-wrap"><table class="tbl"><thead><tr><th>Pos</th><th>Driver</th><th>Team</th><th>Grand Prix</th><th>Lap</th><th>Time (s)</th></tr></thead><tbody>
      ${top.map((r, i) => `<tr><td class="pos">${i + 1}</td><td><span class="dtag"><i style="background:${r.color}"></i>${esc(r.code)}</span></td><td>${esc(r.team)}</td><td>${esc(r.gp)}</td><td>${r.lap}</td><td class="mono">${r.dur.toFixed(2)}</td></tr>`).join('')}</tbody></table></div>${snapBtn('pit-top')}</section>
    <section class="card" id="pit-cons"><h2 class="rc-h">Consistency by team</h2><p class="note">Average \u00b1 standard deviation.</p><div class="chart-box tall"><canvas id="c-pcons"></canvas></div>${snapBtn('pit-cons')}</section>
    <section class="card" id="pit-team"><h2 class="rc-h">Average by constructor</h2><div class="chart-box"><canvas id="c-pteam"></canvas></div>${snapBtn('pit-team')}</section>
    <section class="card" id="pit-drv"><h2 class="rc-h">Average by driver</h2><div class="chart-box tall"><canvas id="c-pdrv"></canvas></div>${snapBtn('pit-drv')}</section>
  </section>
  <section class="card" id="pit-gp"><h2 class="rc-h">Average by Grand Prix</h2><div class="chart-box"><canvas id="c-pgp"></canvas></div>${snapBtn('pit-gp')}</section>`;
  const O = (x = {}) => Object.assign({ responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { display: false } } }, x);
  mkChart($('#c-pcons'), { type: 'bar', data: { labels: teams.map(t => t.t), datasets: [{ label: 'avg \u00b1 \u03c3 (s)', data: teams.map(t => [+(t.avg - t.sd).toFixed(2), +(t.avg + t.sd).toFixed(2)]), backgroundColor: teams.map(t => teamColor(t.color, .7)), borderRadius: 6, borderSkipped: false }, { type: 'line', label: 'Average', data: teams.map(t => +t.avg.toFixed(2)), showLine: false, pointRadius: 6, pointBackgroundColor: '#fff', pointBorderColor: '#111' }] }, options: O({ indexAxis: 'y' }) });
  mkChart($('#c-pteam'), { type: 'bar', data: { labels: teams.map(t => t.t), datasets: [{ data: teams.map(t => +t.avg.toFixed(2)), backgroundColor: teams.map(t => t.color), borderRadius: 4 }] }, options: O() });
  mkChart($('#c-pdrv'), { type: 'bar', data: { labels: drivers.map(d => d.c), datasets: [{ data: drivers.map(d => +d.avg.toFixed(2)), backgroundColor: drivers.map(d => d.color), borderRadius: 4 }] }, options: O({ indexAxis: 'y' }) });
  mkChart($('#c-pgp'), { type: 'line', data: { labels: gps.map(g => g.g), datasets: [{ data: gps.map(g => +g.avg.toFixed(2)), borderColor: '#e10600', backgroundColor: '#e10600', tension: .3 }] }, options: O() });
  $('#pit-x').onclick = () => exportXlsx([{ name: 'All stops', columns: ['Grand Prix', 'Driver', 'Team', 'Lap', label + ' (s)'], rows: R.map(r => [r.gp, r.code, r.team, r.lap, +r.dur.toFixed(3)]) },
    { name: 'By team', columns: ['Team', 'Stops', 'Average', 'Std dev', 'Best'], rows: teams.map(t => [t.t, t.n, +t.avg.toFixed(3), +t.sd.toFixed(3), +t.best.toFixed(3)]) }], `F1_${S.year}_pit_stops.xlsx`);
}

/* ---------- Track DNA ---------- */
async function tabTrackDNA(body, year) {
  let cal = []; try { cal = await getCal(year); } catch {}
  const ids = cal.length ? [...new Set(cal.map(e => e.circuitId))] : Object.keys(CIRCUITS);
  const list = ids.map(id => Object.assign({ id }, CIRCUITS[id] || {})).filter(c => c.km);
  const nxt = cal.length ? nextEvent(cal).circuitId : null;
  const speeds = {}; list.forEach(c => { const t = Store.get('track:' + c.id); if (t && t.topSpeed) speeds[c.id] = t.topSpeed; });
  const metrics = [['km', 'Lap length (km)'], ['turns', 'Turns'], ['tpk', 'Turns per km'], ['laps', 'Race laps'], ['dist', 'Race distance (km)'], ['age', 'Years on calendar'], ['spd', 'Top speed seen (km/h)']];
  list.forEach(c => { c.tpk = +(c.turns / c.km).toFixed(2); c.dist = +(c.km * c.laps).toFixed(1); c.age = year - c.first + 1; c.spd = speeds[c.id] || null; });
  App.dnaSort = App.dnaSort || 'turns';
  body.innerHTML = `<section class="card" id="dna-heat"><div class="card-h"><h2 class="rc-h">Track characteristics</h2><label>Sort by <select id="dna-sort" class="form">${metrics.map(([k, n]) => `<option value="${k}" ${k === App.dnaSort ? 'selected' : ''}>${n}</option>`).join('')}</select></label></div>
    <p class="note">Heatmap of each circuit on the ${year} calendar \u2014 darker red = higher value within the column. Top speed fills in as you open each circuit's Race Centre.</p><div id="dna-tbl" class="table-wrap"></div>${snapBtn('dna-heat')}</section>
  <section class="card" id="dna-map"><h2 class="rc-h">Track similarity map</h2><p class="note">Circuits close together have similar lap length and corner count. Bubble size = race laps.</p><div class="chart-box tall"><canvas id="c-sim"></canvas></div>${snapBtn('dna-map')}</section>
  <section class="grid2 even">
    <section class="card" id="dna-turns"><h2 class="rc-h">Circuits by turn count</h2><div class="chart-box tall"><canvas id="c-turns"></canvas></div>${snapBtn('dna-turns')}</section>
    <section class="card" id="dna-len"><h2 class="rc-h">Circuits by lap length</h2><div class="chart-box tall"><canvas id="c-len"></canvas></div>${snapBtn('dna-len')}</section>
  </section>
  <section class="card" id="dna-dist"><h2 class="rc-h">Circuits by race distance</h2><div class="chart-box tall"><canvas id="c-dist2"></canvas></div>${snapBtn('dna-dist')}</section>`;
  const drawTbl = () => { const k = App.dnaSort; const rows = list.slice().sort((a, b) => (b[k] ?? -1) - (a[k] ?? -1));
    const rng = {}; metrics.forEach(([m]) => { const v = list.map(c => c[m]).filter(x => x != null); rng[m] = [Math.min(...v), Math.max(...v)]; });
    $('#dna-tbl').innerHTML = `<table class="tbl heat"><thead><tr><th>Circuit</th>${metrics.map(([, n]) => `<th>${n}</th>`).join('')}</tr></thead><tbody>${rows.map(c => `<tr class="${c.id === nxt ? 'row-live' : ''}"><td>${flagEmoji(c.cc)} <b>${esc(c.city)}</b> <span class="muted small hide-sm">${esc(c.name)}</span></td>${metrics.map(([m]) => { const v = c[m]; if (v == null) return '<td class="muted">\u2014</td>'; const t = (v - rng[m][0]) / ((rng[m][1] - rng[m][0]) || 1); return `<td style="background:rgba(225,6,0,${(0.08 + t * 0.72).toFixed(2)});color:${t > .55 ? '#fff' : 'inherit'}">${v}</td>`; }).join('')}</tr>`).join('')}</tbody></table>`; };
  $('#dna-sort').onchange = e => { App.dnaSort = e.target.value; drawTbl(); }; drawTbl();
  const col = c => c.id === nxt ? '#e10600' : '#1f6feb';
  mkChart($('#c-sim'), { type: 'bubble', data: { datasets: list.map(c => ({ label: c.city, data: [{ x: c.km, y: c.turns, r: c.laps / 5 }], backgroundColor: teamColor(col(c), .55), borderColor: col(c) })) },
    options: { responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: x => `${x.dataset.label}: ${x.raw.x} km, ${x.raw.y} turns` } } }, scales: { x: { title: { display: true, text: 'Lap length (km)' } }, y: { title: { display: true, text: 'Turns' } } } },
    plugins: [{ id: 'lbl', afterDatasetsDraw(ch) { const ctx = ch.ctx; ctx.save(); ctx.font = '600 11px Inter, Arial'; ctx.fillStyle = cssVar('--muted'); ch.data.datasets.forEach((d, i) => { const p = ch.getDatasetMeta(i).data[0]; if (p) ctx.fillText(d.label, p.x + 8, p.y - 8); }); ctx.restore(); } }] });
  const bar = (cv, k, lab) => { const s = list.slice().sort((a, b) => b[k] - a[k]); mkChart(cv, { type: 'bar', data: { labels: s.map(c => c.city), datasets: [{ label: lab, data: s.map(c => c[k]), backgroundColor: s.map(col), borderRadius: 4 }] }, options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, animation: false, plugins: { legend: { display: false } } } }); };
  bar($('#c-turns'), 'turns', 'Turns'); bar($('#c-len'), 'km', 'km'); bar($('#c-dist2'), 'dist', 'km');
}

/* ---------- More ---------- */
function tabMore(body) {
  const links = [['Tech updates', 'Every upgrade teams declare to the FIA each weekend.', 'https://app.formula1dashboard.com/tech-updates/'],
    ['Power unit elements used', 'Engines, turbos, MGU-K and energy-store usage vs allocation (grid-penalty watch).', 'https://app.formula1dashboard.com/used-elements/'],
    ['Destructors championship', 'Estimated crash damage costs by driver and team (fan-compiled estimates).', 'https://app.formula1dashboard.com/destructors-championship/'],
    ['Formula 1 Dashboard', 'The full site this section is modelled on.', 'https://app.formula1dashboard.com/'],
    ['FIA documents', 'Official decisions, penalties and technical reports.', 'https://www.fia.com/documents/championships/fia-formula-one-world-championship-14']];
  body.innerHTML = `<section class="card"><h2 class="rc-h">More data</h2><p class="note">These datasets come from FIA documents and hand-compiled estimates with no public data feed, so they open on the source site rather than being copied into the app.</p>
    <div class="more-grid">${links.map(([h, t, u]) => `<a class="more-card" href="${u}"><b>${h} \u2197</b><span class="muted small">${t}</span></a>`).join('')}</div></section>`;
}

/* ---- studio.js ---- */
/* F1 Data Hub 3.0 \u2014 Graphics Studio: broadcast-style schedule graphics for sharing. */
'use strict';

const STUDIO_SIZES = { landscape: [1200, 675, 'Landscape 1200\u00d7675 (X/Twitter)'], square: [1080, 1080, 'Square 1080\u00d71080'], portrait: [1080, 1350, 'Portrait 1080\u00d71350 (Instagram)'], story: [1080, 1920, 'Story 1080\u00d71920 (Status/Stories)'] };
const STUDIO_TEMPLATES = { watch: 'What to Watch grid', card: 'Session card', poster: 'Weekend poster' };
const STUDIO_TZS = ['Africa/Kampala', 'Africa/Nairobi', 'Africa/Lusaka', 'Africa/Johannesburg', 'Africa/Lagos', 'Africa/Accra', 'Africa/Kinshasa', 'Africa/Cairo', 'Asia/Dubai', 'Europe/London', 'Europe/Paris', 'America/New_York', 'UTC'];
const FR = { FP1: 'Essais 1', FP2: 'Essais 2', FP3: 'Essais 3', SQ: 'Qualifs Sprint', SPRINT: 'Course Sprint', Q: 'Qualifs', R: 'Le Grand Prix', GRID: 'La Grille', PODIUM: 'Podium', gp: 'Grand Prix', watch: '\u00c0 suivre', on: 'Regarder sur', all: 'Heures' };
const PLATFORMS = { supersport: 'DStv', ss_maximo: 'DStv', canal_af: 'CANAL+', canal_sport: 'CANAL+', canal_fr: 'CANAL+', bein: 'beIN CONNECT', bein_mena: 'beIN CONNECT', f1tv: 'F1 TV', sport24: 'SPORT 24', sport24x: 'SPORT 24' };

function tzAbbr(tz, d = new Date()) {
  if (TZ_ABBR[tz]) return TZ_ABBR[tz];
  try { const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' }).formatToParts(d).find(x => x.type === 'timeZoneName'); return p ? p.value : tzLabel(tz); } catch { return tzLabel(tz); }
}
function stDefaults() {
  const reg = currentRegion();
  return Object.assign({ tpl: 'card', size: 'portrait', tz: currentTz(), lang: 'en', timeStyle: 'colon', timeMode: 'onair', brand: 'F1 DATA HUB', sub: 'BROADCAST HUB',
    bcs: reg.broadcasters.map(b => b.key).filter(k => !['sport24x'].includes(k)), round: null, session: null, grid: true, podium: true, bg: null }, Store.get('studio', {}));
}
const stSave = st => { const c = Object.assign({}, st); delete c.bg; Store.set('studio', c); };
function bcCatalog() {
  const reg = currentRegion(); const ch = Settings.get('channelOverrides') || {};
  return Object.entries(BROADCASTERS).map(([key, b]) => { const r = reg.broadcasters.find(x => x.key === key); return Object.assign({}, b, { key, channel: (ch[reg.code + ':' + key] ?? (r ? r.channel : '')).replace(/\s*[\u00b7,/+&]\s*GOtv\b/i, '') }); });
}
function badgeImg(key) { const m = Store.get('logos', {}); return m[key] || null; }

/* ---------- drawing helpers ---------- */
function grain(ctx, W, H, a = 0.08) {
  const n = document.createElement('canvas'); n.width = 160; n.height = 160; const g = n.getContext('2d'); const id = g.createImageData(160, 160);
  for (let i = 0; i < id.data.length; i += 4) { const v = Math.random() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255 * a * Math.random(); }
  g.putImageData(id, 0, 0); ctx.save(); ctx.fillStyle = ctx.createPattern(n, 'repeat'); ctx.fillRect(0, 0, W, H); ctx.restore();
}
const F1IMG = new Image(); F1IMG.src = F1_LOGO;
function f1Mark(ctx, x, y, h, color = '#e10600') { // F1 logo (supplied), falls back to speed stripes
  if (F1IMG.complete && F1IMG.naturalWidth) { const w = h * 3.15, hh = w * F1IMG.naturalHeight / F1IMG.naturalWidth; ctx.drawImage(F1IMG, x, y + (h - hh) / 2, w, hh); return w; }
  ctx.save(); ctx.fillStyle = color; const w = h * 2.6, sk = h * 0.55;
  for (let i = 0; i < 3; i++) { const yy = y + i * h * 0.36; const ww = w * (1 - i * 0.18); ctx.beginPath(); ctx.moveTo(x + sk, yy); ctx.lineTo(x + sk + ww, yy); ctx.lineTo(x + ww, yy + h * 0.24); ctx.lineTo(x, yy + h * 0.24); ctx.closePath(); ctx.fill(); }
  ctx.restore(); return w + sk;
}
function tStr(d, st) { const t = fmtTime(d, st.tz); return st.timeStyle === 'h' ? t.replace(':', 'H') : t; }
function sName(s, st) { return st.lang === 'fr' ? FR[s.key] : s.name; }
function dayName(d, st, opts = { weekday: 'long' }) { return new Intl.DateTimeFormat(st.lang === 'fr' ? 'fr-FR' : 'en-GB', Object.assign({ timeZone: st.tz }, opts)).format(d); }
function sessTime(s, st, b) { if (st.timeMode !== 'onair') return s.start; if (st.live !== false && s.live) return s.live.onAir; return b ? onAir(s, b) : s.start; }
// Badges for one session: channels from the live TV guides first, then the ticked broadcasters not already covered.
function studioBadges(st, s, bcs) {
  if (st.live === false || !s || !s.live) return bcs;
  const out = s.live.channels.map(c => ({ key: c.family, logoId: chanLogoId(c), name: c.name, short: c.short, channel: c.num, start: c.start }));
  const famOf = k => ({ ss_maximo: 'supersport', ss_grandstand: 'supersport', bein_mena: 'bein', sport24x: 'sport24' })[k] || k;
  const fams = new Set(out.map(b => famOf(b.key)));
  for (const b of bcs) { const f = famOf(b.key); if (!fams.has(f) && !out.some(o => o.key === b.key)) out.push(b); }
  return out.slice(0, 9);
}
const FAM_PLATFORMS = { supersport: ['DStv', 'DStv Stream'], ss_maximo: ['DStv', 'DStv Stream'], ss_grandstand: ['DStv', 'DStv Stream'], canal_af: ['CANAL+'], canal_sport: ['CANAL+'], canal_fr: ['CANAL+'], bein: ['beIN CONNECT'], bein_mena: ['beIN CONNECT'], f1tv: ['F1 TV'], sport24: ['SPORT 24'], sport24x: ['SPORT 24'] };
function chanNum(b) { const c = String(b.channel || ''); return /^(streaming|in-flight & cruise)$/i.test(c) ? '' : c; }
async function drawBadge(ctx, b, x, y, w, h, light = false, withNum = false) {
  const img = badgeImg(b.key) || logoUrl(b.logoId || bcLogoId(b.key), true);
  const num = withNum ? chanNum(b) : ''; const lh = num ? h * 0.7 : h;
  if (img) { const im = await loadImg(img); if (im) { const r = Math.min(w / im.width, lh / im.height); ctx.drawImage(im, x + (w - im.width * r) / 2, y + (lh - im.height * r) / 2, im.width * r, im.height * r); }
    if (num) { ctx.save(); ctx.textAlign = 'center'; ctx.fillStyle = '#c9ced8'; fitText(ctx, num.toUpperCase(), w * 1.05, h * 0.2, '700'); ctx.fillText(num.toUpperCase(), x + w / 2, y + h * 0.96); ctx.restore(); }
    return; }
  roundRect(ctx, x, y, w, h, h / 2); ctx.fillStyle = light ? '#fff' : (b.color && b.color !== '#333' ? b.color : '#1d2433'); ctx.fill();
  ctx.lineWidth = Math.max(2, h * 0.06); ctx.strokeStyle = light ? '#111' : 'rgba(255,255,255,.85)'; ctx.stroke();
  ctx.fillStyle = light ? '#111' : '#fff'; ctx.textAlign = 'center';
  const name = (b.short || b.name).toUpperCase(); const sub = b.channel && !/streaming|in-flight/i.test(b.channel) ? b.channel.toUpperCase() : '';
  fitText(ctx, name, w * 0.86, sub ? h * 0.42 : h * 0.5, 'italic 800'); ctx.fillText(name, x + w / 2, y + (sub ? h * 0.5 : h * 0.66));
  if (sub) { fitText(ctx, sub, w * 0.8, h * 0.26, '700'); ctx.fillStyle = light ? '#444' : 'rgba(255,255,255,.8)'; ctx.fillText(sub, x + w / 2, y + h * 0.82); }
  ctx.textAlign = 'left';
}
async function bgImage(ctx, st, x, y, w, h, alpha = 1) {
  if (!st.bg) return false; const im = new Image(); im.src = st.bg; await im.decode().catch(() => {});
  const r = Math.max(w / im.width, h / im.height); ctx.save(); ctx.globalAlpha = alpha; ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  ctx.drawImage(im, x + (w - im.width * r) / 2, y + (h - im.height * r) / 2, im.width * r, im.height * r); ctx.restore(); return true;
}

/* ---------- Template: session card ---------- */
async function tplCard(ctx, W, H, ev, s, st, bcs) {
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  if (st.bg) { await bgImage(ctx, st, 0, 0, W, H, 0.35); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(0,0,0,.3)'); g.addColorStop(1, 'rgba(0,0,0,.92)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
  const k = Math.min(W / 1080, H / 1350); const cx = W / 2; const P = bcs[0];
  const t = sessTime(s, st, P); let y = H * 0.1;
  ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
  const date = dayName(t, st, { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase();
  fitText(ctx, date, W * 0.86, 118 * k, '800'); ctx.fillText(date, cx, y + 40 * k);
  y += 80 * k;
  const markH = 112 * k; const markW = markH * 3.15; f1Mark(ctx, cx - markW / 2, y, markH);
  y += markH + 44 * k; ctx.fillStyle = '#fff'; ctx.font = `italic 800 ${34 * k}px "Barlow Condensed", Arial`; ctx.fillText('FORMULA 1', cx, y);
  y += 26 * k; ctx.fillStyle = '#e10600'; ctx.fillRect(W * 0.26, y, W * 0.48, 2 * k);
  y += 40 * k; ctx.fillStyle = '#e10600'; ctx.fillRect(cx - 140 * k, y, 280 * k, 80 * k);
  ctx.fillStyle = '#fff'; ctx.font = `800 ${66 * k}px "Barlow Condensed", Arial`; ctx.fillText(tStr(t, st), cx, y + 63 * k);
  y += 118 * k; ctx.fillStyle = '#9aa0aa'; ctx.font = `700 ${30 * k}px "Barlow Condensed", Arial`; ctx.fillText(tzAbbr(st.tz, t), cx, y);
  const title = `${shortGp(ev)} GP ${sName(s, st)}`.toUpperCase(); const ty = H * 0.52;
  ctx.fillStyle = '#fff'; fitText(ctx, title, W * 0.92, 112 * k, 'italic 800'); ctx.fillText(title, cx, ty);
  if (st.timeMode === 'onair' && P) { ctx.fillStyle = '#9aa0aa'; ctx.font = `600 ${24 * k}px Inter, Arial`; ctx.fillText(`Session starts ${tStr(s.start, st)} ${tzAbbr(st.tz, s.start)} \u00b7 coverage from ${tStr(t, st)}`, cx, ty + 50 * k); }
  // badges
  const top = H * 0.69; ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(W * 0.055, top - 30 * k, W * 0.89, 1.5);
  const cols = bcs.length > 4 ? 3 : Math.max(1, Math.min(3, bcs.length)); const bw = Math.min(300 * k, W * 0.82 / cols - 24 * k), bh = 96 * k;
  const rows = Math.ceil(bcs.length / cols); const gapY = Math.min(36 * k, (H * 0.16 - rows * bh) / Math.max(1, rows - 1));
  for (let i = 0; i < bcs.length; i++) { const r = Math.floor(i / cols), c = i % cols; const inRow = Math.min(cols, bcs.length - r * cols);
    const rowW = inRow * bw + (inRow - 1) * 40 * k; const x = cx - rowW / 2 + c * (bw + 40 * k); await drawBadge(ctx, bcs[i], x, top + r * (bh + Math.max(12 * k, gapY)), bw, bh, true, true); }
  const plats = [...new Set(bcs.flatMap(b => FAM_PLATFORMS[b.key] || [PLATFORMS[b.key] || (b.short || b.name).toUpperCase()]))].slice(0, 6);
  const wy = H * 0.915; ctx.font = `800 ${26 * k}px "Barlow Condensed", Arial`; const lab = st.lang === 'fr' ? '\u00c0 REGARDER SUR' : 'WATCH ON';
  const pimg = await Promise.all(plats.map(p => loadImg(logoUrl(PLATFORM_LOGO[p], true))));
  const chips = plats.map((p, i) => { if (pimg[i]) return pimg[i].width / pimg[i].height * 42 * k; ctx.font = `800 ${24 * k}px "Barlow Condensed", Arial`; return ctx.measureText(p).width + 28 * k; });
  ctx.font = `800 ${26 * k}px "Barlow Condensed", Arial`; const lw = ctx.measureText(lab).width + 16 * k; const totalW = lw + chips.reduce((a, b) => a + b + 10 * k, 0);
  let x = cx - totalW / 2; ctx.textAlign = 'left'; ctx.fillStyle = '#9aa0aa'; ctx.fillText(lab, x, wy + 30 * k); x += lw;
  plats.forEach((p, i) => { if (pimg[i]) { ctx.drawImage(pimg[i], x, wy, chips[i], 42 * k); x += chips[i] + 12 * k; return; } roundRect(ctx, x, wy, chips[i], 42 * k, 8 * k); ctx.fillStyle = '#fff'; ctx.fill(); ctx.fillStyle = '#111'; ctx.font = `800 ${24 * k}px "Barlow Condensed", Arial`; ctx.fillText(p, x + 14 * k, wy + 30 * k); x += chips[i] + 10 * k; });
  footer(ctx, W, H, k, st, t);
}
function footer(ctx, W, H, k, st, t) {
  ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(W * 0.02, H - 62 * k, W * 0.96, 1.5);
  ctx.textAlign = 'left'; ctx.fillStyle = '#fff'; ctx.font = `italic 800 ${30 * k}px "Barlow Condensed", Arial`; ctx.fillText(st.brand.toUpperCase(), 28 * k, H - 24 * k);
  if (st.sub) { ctx.fillStyle = '#9aa0aa'; ctx.font = `700 ${18 * k}px "Barlow Condensed", Arial`; ctx.fillText(st.sub.toUpperCase(), 28 * k, H - 6 * k); }
  ctx.textAlign = 'right'; ctx.fillStyle = '#9aa0aa'; ctx.font = `700 ${24 * k}px "Barlow Condensed", Arial`;
  ctx.fillText(`${st.lang === 'fr' ? 'HEURES' : 'ALL TIMES'} ${tzAbbr(st.tz, t)} \u00b7 ${tzLabel(st.tz, t)}`, W - 28 * k, H - 18 * k); ctx.textAlign = 'left';
}

/* ---------- Template: What to Watch grid ---------- */
async function tplWatch(ctx, W, H, ev, st, bcs) {
  const k = Math.min(W / 1200, H / 675) * (W < H ? 1.25 : 1);
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2b2b2f'); g.addColorStop(0.55, '#4a0d10'); g.addColorStop(1, '#b3121b'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = .07; ctx.fillStyle = '#fff'; for (let i = -H; i < W; i += 90 * k) { ctx.beginPath(); ctx.moveTo(i, H); ctx.lineTo(i + 30 * k, H); ctx.lineTo(i + 30 * k + H * .6, 0); ctx.lineTo(i + H * .6, 0); ctx.fill(); } ctx.restore();
  grain(ctx, W, H, .12);
  const P = bcs[0]; ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; const title = st.lang === 'fr' ? '\u00c0 SUIVRE' : 'WHAT TO WATCH';
  ctx.font = `800 ${74 * k}px "Barlow Condensed", Arial`; ctx.fillText(title, W / 2, 84 * k); ctx.textAlign = 'left';
  f1Mark(ctx, 26 * k, 26 * k, 26 * k);
  const days = []; for (const s of ev.sessions) { const t = sessTime(s, st, P); const kd = dayName(t, st, { weekday: 'long', day: 'numeric', month: 'long' }); let d = days.find(x => x.k === kd); if (!d) days.push(d = { k: kd, t, s: [] }); d.s.push(s); }
  if (st.grid && P) { const r = ev.sessions.find(s => s.key === 'R'); if (r) { /* pre-race slot is shown inside the race tile time */ } }
  const per = W > H ? 4 : W === H ? 3 : 2; const labW = W > H ? 230 * k : 0; const pad = 24 * k;
  const rows = []; days.forEach(d => { for (let i = 0; i < d.s.length; i += per) rows.push({ d, s: d.s.slice(i, i + per), first: i === 0 }); });
  const top = W > H ? 120 * k : 130 * k; const avail = H - top - 70 * k; const extraLab = W > H ? 0 : 56 * k;
  const rh = Math.min(260 * k, (avail - rows.filter(r => r.first).length * extraLab) / rows.length - 14 * k);
  const tw = Math.min(300 * k, (W - labW - pad * 2 - (per - 1) * 14 * k) / per);
  let y = top;
  for (const row of rows) {
    if (row.first) { const [wd, ...rest] = row.d.k.split(' '); const dateTxt = rest.join(' ').toUpperCase();
      if (W > H) { ctx.fillStyle = '#fff'; ctx.font = `800 ${40 * k}px "Barlow Condensed", Arial`; ctx.fillText(wd.toUpperCase(), pad + 10 * k, y + rh / 2); ctx.fillStyle = '#ff6b6b'; ctx.font = `700 ${26 * k}px "Barlow Condensed", Arial`; ctx.fillText(dateTxt, pad + 10 * k, y + rh / 2 + 32 * k); }
      else { ctx.fillStyle = '#fff'; ctx.font = `800 ${40 * k}px "Barlow Condensed", Arial`; ctx.fillText(wd.toUpperCase(), pad, y + 38 * k); ctx.fillStyle = '#ff6b6b'; ctx.font = `700 ${26 * k}px "Barlow Condensed", Arial`; ctx.fillText(' ' + dateTxt, pad + ctx.measureText(wd.toUpperCase()).width * 1.45, y + 38 * k); y += extraLab; } }
    let x = labW + pad;
    for (const s of row.s) {
      ctx.fillStyle = 'rgba(10,10,12,.88)'; ctx.fillRect(x, y, tw, rh); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2; ctx.strokeRect(x + 4, y + 4, tw - 8, rh - 8);
      ctx.textAlign = 'center'; const mx = x + tw / 2;
      const mh = Math.min(18 * k, rh * 0.08); f1Mark(ctx, mx - mh * 1.6, y + rh * 0.07, mh);
      const L = (txt, frac, size, weight, color) => { ctx.fillStyle = color; fitText(ctx, txt, tw - 24 * k, Math.min(size * k * 1.2, rh * size / 150), weight); ctx.fillText(txt, mx, y + rh * frac); };
      const t = sessTime(s, st, P); const sb = studioBadges(st, s, bcs); const chans = sb.slice(0, 2).map(b => (b.short || b.name) + ((chanNum(b).match(/\d{2,4}/) || [''])[0] ? ' ' + chanNum(b).match(/\d{2,4}/)[0] : '')).join(' & ');
      L(shortGp(ev).toUpperCase() + ' GP', 0.37, 34, '800', '#fff');
      L(sName(s, st).toUpperCase(), 0.55, 32, 'italic 800', s.key === 'R' ? '#ff4d4d' : '#fff');
      L(chans, 0.73, 22, '700', 'rgba(255,255,255,.85)');
      L(`${tStr(t, st)} (${tzAbbr(st.tz, t)})`, 0.9, 32, '800', '#fff');
      ctx.textAlign = 'left'; x += tw + 14 * k;
    }
    y += rh + 14 * k;
  }
  ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.font = `700 ${20 * k}px "Barlow Condensed", Arial`; ctx.textAlign = 'right';
  ctx.fillText(`${st.brand.toUpperCase()} \u00b7 ${bcs.map(b => (b.short || b.name) + (b.channel && !/streaming|in-flight/i.test(b.channel) ? ' ' + b.channel : '')).join(' \u00b7 ')}`.slice(0, 140), W - pad, H - 22 * k); ctx.textAlign = 'left';
}

/* ---------- Template: weekend poster ---------- */
async function tplPoster(ctx, W, H, ev, st, bcs) {
  const k = Math.min(W / 1080, H / 1350);
  const rg = ctx.createRadialGradient(W * .45, H * .45, 10, W * .45, H * .45, Math.max(W, H) * .75); rg.addColorStop(0, '#ff1a1a'); rg.addColorStop(.55, '#8a0000'); rg.addColorStop(1, '#120000');
  ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H); grain(ctx, W, H, .35);
  if (st.bg) await bgImage(ctx, st, W * .44, H * .1, W * .56, H * .9, 1);
  const P = bcs[0];
  ctx.font = `90px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif`; ctx.fillText(flagEmoji(ev.cc), 70 * k, 135 * k);
  ctx.fillStyle = '#e6e6e6'; ctx.font = `italic 600 ${40 * k}px "Barlow Condensed", Arial`;
  const gpTitle = st.lang === 'fr' ? ['GRAND PRIX', 'DE ' + shortGp(ev).toUpperCase()] : [shortGp(ev).toUpperCase(), 'GRAND PRIX'];
  ctx.fillText(gpTitle[0], 200 * k, 92 * k); ctx.fillText(gpTitle[1], 200 * k, 134 * k);
  const mw = f1Mark(ctx, W - 470 * k, 66 * k, 36 * k, '#d0000a');
  ctx.fillStyle = '#e6e6e6'; ctx.font = `800 ${46 * k}px "Barlow Condensed", Arial`; const pn = P ? (P.short || P.name).toUpperCase() : ''; fitText(ctx, pn, 220 * k, 46 * k, '800'); ctx.fillText(pn, W - 470 * k + mw + 20 * k, 112 * k);
  const items = [];
  for (const s of ev.sessions) { const t = sessTime(s, st, P); if (s.key === 'R' && st.grid) items.push({ t: new Date(s.start.getTime() - 60 * 60000), name: st.lang === 'fr' ? FR.GRID : 'The Grid', minor: true });
    items.push({ t: s.key === 'R' ? s.start : t, name: sName(s, st), hi: s.key === 'R' || s.key === 'Q' });
    if (s.key === 'R' && st.podium) items.push({ t: new Date(s.start.getTime() + 105 * 60000), name: st.lang === 'fr' ? FR.PODIUM : 'Podium', minor: true }); }
  const days = []; for (const it of items) { const kd = dayName(it.t, st); let d = days.find(x => x.k === kd); if (!d) days.push(d = { k: kd, items: [] }); d.items.push(it); }
  let y = 230 * k; const rowH = Math.min(78 * k, (H - 330 * k - days.length * 90 * k) / items.length);
  for (const d of days) {
    ctx.font = `italic 800 ${48 * k}px "Barlow Condensed", Arial`; const lab = d.k.toUpperCase(); const lw = ctx.measureText(lab).width + 26 * k;
    ctx.fillStyle = '#fff'; ctx.fillRect(96 * k, y, lw, 62 * k); ctx.fillStyle = '#5a0006'; ctx.fillText(lab, 109 * k, y + 49 * k); y += 84 * k;
    if (P) await drawBadge(ctx, P, 96 * k, y + 4 * k, 104 * k, 48 * k, true);
    for (const it of d.items) {
      const tw = 150 * k; ctx.fillStyle = it.hi ? '#fff' : '#e10600'; ctx.fillRect(230 * k, y, tw, rowH - 12 * k);
      ctx.fillStyle = it.hi ? '#d0000a' : '#fff'; ctx.textAlign = 'center'; ctx.font = `${it.hi ? 800 : 600} ${46 * k}px "Barlow Condensed", Arial`; ctx.fillText(tStr(it.t, st), 230 * k + tw / 2, y + rowH / 2 + 12 * k); ctx.textAlign = 'left';
      const nm = it.name.toUpperCase(); ctx.font = `italic 800 ${46 * k}px "Barlow Condensed", Arial`;
      if (it.hi && /Grand Prix|Race|Course/i.test(it.name)) { const nw = ctx.measureText(nm).width + 24 * k; ctx.fillStyle = '#fff'; ctx.fillRect(398 * k, y, nw, rowH - 12 * k); ctx.fillStyle = '#d0000a'; }
      else ctx.fillStyle = '#fff';
      ctx.fillText(nm, 410 * k, y + rowH / 2 + 12 * k); y += rowH;
    }
    y += 22 * k;
  }
  ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(0, H - 64 * k, W, 64 * k);
  ctx.fillStyle = '#fff'; ctx.font = `italic 800 ${28 * k}px "Barlow Condensed", Arial`; ctx.fillText(st.brand.toUpperCase(), 40 * k, H - 22 * k);
  ctx.textAlign = 'right'; ctx.font = `700 ${22 * k}px "Barlow Condensed", Arial`; ctx.fillText(`${st.lang === 'fr' ? 'HEURES' : 'TIMES'} ${tzAbbr(st.tz)} \u00b7 ${bcs.map(b => (b.short || b.name)).join(' \u00b7 ')}`.slice(0, 90), W - 40 * k, H - 24 * k); ctx.textAlign = 'left';
}

async function renderStudioCanvas(canvas, ev, st, s) {
  await loadFonts(); await F1IMG.decode().catch(() => {}); const [W, H] = STUDIO_SIZES[st.size]; canvas.width = W; canvas.height = H; const ctx = canvas.getContext('2d'); ctx.textBaseline = 'alphabetic';
  const cat = bcCatalog(); const bcs = st.bcs.map(k => cat.find(b => b.key === k)).filter(Boolean);
  if (st.tpl === 'card') { const ss = s || ev.sessions[0]; await tplCard(ctx, W, H, ev, ss, st, studioBadges(st, ss, bcs)); }
  else if (st.tpl === 'watch') await tplWatch(ctx, W, H, ev, st, bcs);
  else await tplPoster(ctx, W, H, ev, st, bcs);
}
function captionText(ev, st, s) {
  const cat = bcCatalog(); const bcs = st.bcs.map(k => cat.find(b => b.key === k)).filter(Boolean); const P = bcs[0];
  const list = s ? [s] : ev.sessions; const tz = tzAbbr(st.tz);
  return `\ud83c\udfc1 ${ev.name} ${ev.season}\n` + list.map(x => `${dayName(sessTime(x, st, P), st, { weekday: 'short', day: 'numeric', month: 'short' })} \u00b7 ${tStr(sessTime(x, st, P), st)} ${tz} \u2014 ${sName(x, st)}`).join('\n') +
    `\n\ud83d\udcfa ${bcs.map(b => (b.short || b.name) + (b.channel && !/streaming/i.test(b.channel) ? ` (${b.channel})` : '')).join(' \u00b7 ')}\n#F1 #${shortGp(ev).replace(/\W/g, '')}GP`;
}

/* ---------- page ---------- */
async function renderStudio(main) {
  const cal = await getCal(App.year); const st = stDefaults(); st.bg = App.studioBg || null;
  let ev = cal.find(e => e.round === st.round) || nextEvent(cal); st.round = ev.round;
  const cat = bcCatalog();
  main.innerHTML = `<section class="card"><div class="card-h"><h2 class="rc-h">Graphics studio</h2><span class="muted">Schedule graphics in your time zone, ready to share</span></div>
  <div class="studio">
    <div class="studio-ctl form">
      <label>Template<select id="g-tpl">${Object.entries(STUDIO_TEMPLATES).map(([k, n]) => `<option value="${k}" ${k === st.tpl ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <label>Grand Prix<select id="g-round">${cal.map(e => `<option value="${e.round}" ${e.round === ev.round ? 'selected' : ''}>${e.round} - ${esc(e.name)}</option>`).join('')}</select></label>
      <label id="g-sess-l">Session<select id="g-sess"></select></label>
      <label>Size<select id="g-size">${Object.entries(STUDIO_SIZES).map(([k, v]) => `<option value="${k}" ${k === st.size ? 'selected' : ''}>${v[2]}</option>`).join('')}</select></label>
      <label>Time zone<select id="g-tz">${[...new Set([currentTz(), ...STUDIO_TZS])].map(z => `<option value="${z}" ${z === st.tz ? 'selected' : ''}>${tzAbbr(z)} \u00b7 ${z} (${tzLabel(z)})</option>`).join('')}</select></label>
      <label>Times shown<select id="g-mode"><option value="onair" ${st.timeMode === 'onair' ? 'selected' : ''}>On-air time (first channel below)</option><option value="start" ${st.timeMode === 'start' ? 'selected' : ''}>Official session start</option></select></label>
      <label>Language<select id="g-lang"><option value="en" ${st.lang === 'en' ? 'selected' : ''}>English</option><option value="fr" ${st.lang === 'fr' ? 'selected' : ''}>Fran\u00e7ais (Canal+ style)</option></select></label>
      <label>Time style<select id="g-ts"><option value="colon" ${st.timeStyle === 'colon' ? 'selected' : ''}>21:05</option><option value="h" ${st.timeStyle === 'h' ? 'selected' : ''}>21H05</option></select></label>
      <label>Brand name<input id="g-brand" value="${esc(st.brand)}"></label>
      <label>Brand subtitle<input id="g-sub" value="${esc(st.sub)}"></label>
      <fieldset class="g-bcs"><legend>Channels (the first ticked sets on-air times)</legend>${cat.map(b => `<label class="chk"><input type="checkbox" value="${b.key}" ${st.bcs.includes(b.key) ? 'checked' : ''}> ${esc(b.short || b.name)}${b.channel ? ` <span class="muted small">${esc(b.channel)}</span>` : ''}</label>`).join('')}</fieldset>
      <label class="chk"><input type="checkbox" id="g-live" ${st.live !== false ? 'checked' : ''}> Use live TV guides (SuperSport \u00b7 beIN \u00b7 Sport 24 times & channels)</label>
      <label class="chk" id="g-extra"><input type="checkbox" id="g-grid" ${st.grid ? 'checked' : ''}> Poster: add grid show & podium</label>
      <label>Background / driver photo (your own image)<input type="file" id="g-bg" accept="image/*"></label>
      <details><summary class="muted">Channel logo images (optional)</summary><p class="note">Upload logo files you have the right to use; they replace the text badges.</p>
        ${cat.filter(b => st.bcs.includes(b.key)).map(b => `<label>${esc(b.short || b.name)}<input type="file" accept="image/*" data-logo="${b.key}"></label>`).join('')}<button class="btn btn-sm" id="g-logo-clear">Remove uploaded logos</button></details>
    </div>
    <div class="studio-prev"><canvas id="g-canvas" class="poster"></canvas>
      <div class="row"><button class="btn btn-primary" id="g-save">Save PNG</button><button class="btn" id="g-all">Save one card per session</button><button class="btn" id="g-cap">Copy caption</button></div></div>
  </div></section>`;
  const cv = $('#g-canvas');
  const sessSel = () => { $('#g-sess').innerHTML = ev.sessions.map(s => `<option value="${s.key}" ${s.key === st.session ? 'selected' : ''}>${esc(s.name)} \u00b7 ${fmtDay(s.start, st.tz)}</option>`).join(''); if (!ev.sessions.some(s => s.key === st.session)) st.session = (ev.sessions.find(s => s.end > Date.now()) || ev.sessions[0]).key; $('#g-sess').value = st.session; };
  const draw = async () => { $('#g-sess-l').style.display = st.tpl === 'card' ? '' : 'none'; $('#g-extra').style.display = st.tpl === 'poster' ? '' : 'none'; stSave(st);
    await renderStudioCanvas(cv, ev, st, ev.sessions.find(s => s.key === st.session)); };
  sessSel();
  const on = (id, k, f = v => v) => $(id).onchange = e => { st[k] = f(e.target.value); draw(); };
  on('#g-tpl', 'tpl'); on('#g-size', 'size'); on('#g-tz', 'tz'); on('#g-mode', 'timeMode'); on('#g-lang', 'lang'); on('#g-ts', 'timeStyle'); on('#g-sess', 'session');
  $('#g-brand').oninput = e => { st.brand = e.target.value; draw(); }; $('#g-sub').oninput = e => { st.sub = e.target.value; draw(); };
  $('#g-round').onchange = e => { st.round = +e.target.value; ev = cal.find(x => x.round === st.round); sessSel(); draw(); };
  $('#g-grid').onchange = e => { st.grid = st.podium = e.target.checked; draw(); };
  $('#g-live').onchange = e => { st.live = e.target.checked; draw(); };
  $$('.g-bcs input').forEach(i => i.onchange = () => { st.bcs = $$('.g-bcs input:checked').map(x => x.value); draw(); });
  const readImg = (file, max) => new Promise(res => { const r = new FileReader(); r.onload = async () => { const im = new Image(); im.src = r.result; await im.decode().catch(() => {}); const s = Math.min(1, max / Math.max(im.width, im.height)); const c = document.createElement('canvas'); c.width = im.width * s; c.height = im.height * s; c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/png')); }; r.readAsDataURL(file); });
  $('#g-bg').onchange = async e => { if (!e.target.files[0]) return; st.bg = App.studioBg = await readImg(e.target.files[0], 1600); draw(); };
  $$('[data-logo]').forEach(i => i.onchange = async e => { if (!e.target.files[0]) return; const m = Store.get('logos', {}); m[i.dataset.logo] = await readImg(e.target.files[0], 400); Store.set('logos', m); draw(); });
  $('#g-logo-clear').onclick = () => { Store.del('logos'); draw(); };
  const fname = s => `F1_${ev.season}_${fileSafe(shortGp(ev))}_${st.tpl}${s ? '_' + s.key : ''}_${st.size}.png`;
  $('#g-save').onclick = () => exportCanvasPng(cv, fname(st.tpl === 'card' ? ev.sessions.find(s => s.key === st.session) : null));
  $('#g-all').onclick = async () => { const c = document.createElement('canvas'); const s0 = Object.assign({}, st, { tpl: 'card' }); for (const s of ev.sessions) { await renderStudioCanvas(c, ev, s0, s); await exportCanvasPng(c, `F1_${ev.season}_${fileSafe(shortGp(ev))}_card_${s.key}_${st.size}.png`); } };
  $('#g-cap').onclick = async () => { const t = captionText(ev, st, st.tpl === 'card' ? ev.sessions.find(s => s.key === st.session) : null); try { await navigator.clipboard.writeText(t); toast('Caption copied'); } catch { deliver(`F1_${fileSafe(shortGp(ev))}_caption.txt`, 'text/plain', new Blob([t], { type: 'text/plain' })); } };
  draw();
}

/* ---- views.js ---- */
/* F1 Data Hub \u2014 views */
'use strict';

const App = { year: new Date().getUTCFullYear(), cal: null, calYear: null, route: 'next', liveTimer: null, chart: null, an: { view: 'classification', chartKind: 'auto', opts: { hideSlow: true } }, news: null };

async function getCal(year = App.year) {
  if (App.cal && App.calYear === year) return App.cal;
  App.cal = await loadCalendar(year); App.calYear = year;
  try { await Promise.race([loadFeed(), sleep(5000)]); } catch {}
  attachLive(App.cal); return App.cal;
}
// Re-read the live TV guides every 15 minutes while the app is open.
setInterval(async () => { if (!App.cal) return; await loadFeed(true).catch(() => {}); attachLive(App.cal); }, 15 * 60e3);
function bcCell(s, b) {
  const l = liveOnAir(s, b); const t = onAir(s, b);
  return `<td><div class="mono">${l ? '<span class="guide-dot" title="From the broadcaster\'s live TV guide"></span>' : '\u2248 '}On air ${fmtTime(t)}</div>${l ? `<div class="small muted">${esc(l.short)}${l.num ? ' \u00b7 ' + esc(l.num) : ''}</div>` : '<div class="small muted">estimate</div>'}${bcLink(b)}</td>`;
}
function liveChips(s) {
  if (!s.live) return '<span class="muted small">Not in the guides yet</span>';
  return `<div class="live-chans">${s.live.channels.map(c => `<span class="lc" title="${esc(c.name)}">${logoImg(chanLogoId(c), c.short)}<small><b>${fmtTime(c.start)}</b>${c.num ? '<br>' + esc(c.num) : ''}</small></span>`).join('')}</div>`;
}

/* ---------------- Shell & router ---------------- */
const ROUTES = { next: renderNext, live: renderLive, calendar: renderCalendar, analytics: renderAnalytics, season: renderSeason, studio: renderStudio, standings: m => { location.hash = '#/season?tab=standings'; }, news: renderNews, settings: renderSettings };
function go(route) { location.hash = '#/' + route; }
async function route() {
  const r = (location.hash.replace(/^#\/?/, '') || 'next').split('?')[0];
  App.route = ROUTES[r] ? r : 'next';
  $$('.nav a').forEach(a => a.classList.toggle('active', a.dataset.route === App.route));
  clearInterval(App.liveTimer); App.liveTimer = null;
  if (App.chart) { App.chart.destroy(); App.chart = null; }
  destroyCharts();
  const main = $('#main'); main.onclick = null; main.innerHTML = '<div class="loading"><span class="spinner"></span> Loading\u2026</div>'; main.scrollTop = 0; window.scrollTo(0, 0);
  try { await ROUTES[App.route](main); } catch (e) { console.error(e); main.innerHTML = errorBox(e); }
  try { localStorage.removeItem('f1hub.ota.pending'); } catch {} // this app version started fine
  updateHeader();
}
function errorBox(e) {
  const offline = e && (e.status === 0 || /HTTP 0/.test(e.message));
  return `<div class="card error"><h3>Couldn't load data</h3><p>${esc(e && e.message || e)}</p>${offline ? '<p>Check your internet connection. Data comes from the Jolpica and OpenF1 public F1 APIs.</p>' : ''}<button class="btn" onclick="route()">Retry</button></div>`;
}
function applyTheme() {
  const t = Settings.get('theme'); const dark = t === 'dark' || (t !== 'light' && !(window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches));
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  const b = $('#theme-btn'); if (b) b.textContent = dark ? '\u263e' : '\u2600';
  if (window.Chart) { const cs = getComputedStyle(document.documentElement); Chart.defaults.color = cs.getPropertyValue('--muted').trim(); Chart.defaults.borderColor = cs.getPropertyValue('--grid').trim(); }
}
function updateHeader() {
  const reg = currentRegion(); const tz = currentTz();
  const tk = $('#ticker');
  if (tk && App.cal) { const ev = nextEvent(App.cal); const s = ev && ev.sessions.find(x => x.end > Date.now()); if (s) tk.innerHTML = `<b>Next</b>${esc(shortGp(ev))} GP \u00b7 ${esc(s.name)} \u00b7 <span class="cd" data-cd="${s.start.getTime()}" data-end="${s.end.getTime()}"></span>`; }
  $('#hdr-region').innerHTML = `${flagEmoji(reg.code && reg.code.length === 2 ? reg.code : '')} ${esc(reg.name)} \u00b7 ${esc(tzLabel(tz))}`;
}
setInterval(() => {
  const now = Date.now();
  $$('[data-cd]').forEach(el => { const t = +el.dataset.cd; const end = +el.dataset.end || 0;
    if (now < t) { el.textContent = countdown(t - now); el.className = el.className.replace(/\b(st-live|st-done)\b/g, '') + ' st-up'; }
    else if (end && now < end) { el.textContent = 'LIVE \u00b7 ' + countdown(now - t).replace(/^00:/, '') + ' in \u00b7 ' + countdown(end - now) + ' left'; el.classList.add('st-live'); }
    else { el.textContent = el.dataset.doneText || 'Finished'; el.classList.add('st-done'); } });
  $$('[data-clock]').forEach(el => { el.textContent = fmtTime(new Date(), el.dataset.clock || undefined) + ':' + String(new Date().getSeconds()).padStart(2, '0'); });
}, 1000);

function statusChip(s) { const st = sessionStatus(s); return `<span class="chip chip-${st}">${st === 'live' ? '\u25cf LIVE' : st === 'done' ? 'Done' : 'Upcoming'}</span>`; }
function cdSpan(s, cls = '') { return `<span class="cd ${cls}" data-cd="${s.start.getTime()}" data-end="${s.end.getTime()}">${countdown(s.start - Date.now())}</span>`; }
function bcLink(b, label) { return `<a class="btn btn-sm btn-watch" href="${esc(b.watch)}">${esc(label || 'Watch')}</a>`; }

/* ---------------- Up Next ---------------- */
async function renderNext(main) {
  const cal = await getCal(App.year); const ev = nextEvent(cal); const tz = currentTz(); const bcs = regionBroadcasters();
  const c = CIRCUITS[ev.circuitId] || {};
  const cachedTrack = Store.get('track:' + ev.circuitId);
  main.innerHTML = `
  <div id="rc-hero-slot">${heroCard(ev, cachedTrack)}</div>
  <div class="hero-actions under">
    <button class="btn btn-primary" id="ics-weekend">\ud83d\udcc5 Sync weekend to calendar</button>
    <button class="btn" id="ics-season">Season calendar (.ics)</button>
    <a class="btn" href="#/live">\u23f1 Live timers</a>
    ${bcs.map(b => bcLink(b, '\u25b6 ' + (b.short || b.name))).join('')}
    ${ev.source === 'offline' ? '<span class="chip">Offline calendar</span>' : ''}
  </div>
  <div id="rc-circuit-slot">${circuitCard(ev, cachedTrack)}</div>
  <section class="grid2 even"><div id="rc-upd-slot"><section class="card"><div class="loading"><span class="spinner"></span> Race updates\u2026</div></section></div>
    <div id="rc-prev-slot"><section class="card"><div class="loading"><span class="spinner"></span> Previous races\u2026</div></section></div></section>
  <div id="rc-battle-slot"></div>
  <section class="grid2 even"><div id="rc-res-slot"><section class="card"><div class="loading"><span class="spinner"></span> Results\u2026</div></section></div>
    <section class="card rc-grid-card"><div class="card-h"><h2 class="rc-h">Grid line-up</h2><button class="btn btn-sm" id="grid-save" hidden>Save PNG</button></div><div id="rc-grid"><p class="muted">The grid graphic appears once qualifying has finished.</p></div></section></section>

  <section class="card">
    <div class="card-h"><h2 class="rc-h">Weekend schedule \u00b7 your time (${esc(tzLabel(tz))})</h2><span class="muted">${esc(currentRegion().name)} broadcasters</span></div>
    <div class="table-wrap"><table class="tbl sched">
      <thead><tr><th>Session</th><th>Local time</th><th>Starts in</th><th>Live TV guide</th>${bcs.map(b => `<th>${logoImg(bcLogoId(b.key), b.name, 'logo-th')}<div>${esc(b.name)}</div><div class="muted small">${esc(b.channel)}</div></th>`).join('')}<th></th></tr></thead>
      <tbody>${ev.sessions.map(s => `<tr class="${sessionStatus(s) === 'live' ? 'row-live' : ''}">
        <td><b>${esc(s.name)}</b><div class="muted small">${fmtDay(s.start)}</div></td>
        <td class="mono">${fmtTime(s.start)}</td><td>${cdSpan(s, 'small')}</td>
        <td>${liveChips(s)}</td>${bcs.map(b => bcCell(s, b)).join('')}
        <td><a class="btn btn-sm" href="${esc(googleCalLink(ev, s))}" title="Add to Google Calendar">+ Cal</a></td></tr>`).join('')}</tbody></table></div>
    <p class="note">\u25cf = time taken from the broadcaster's live TV guide (SuperSport, beIN SPORTS and Sport 24 guides via the ASBH feed${FEED && FEED.updated ? ', updated ' + esc(fmtDateTime(new Date(FEED.updated))) : ''}); \u2248 = estimate. Estimates include each broadcaster's usual build-up (SuperSport \u22485 min, Canal+ 15\u201320 min, race grid shows earlier). In Africa F1 is on DStv \u2014 GOtv doesn't carry it unless SuperSport says so for a race. Edit channels and links in Settings.</p>
  </section>

  <section class="grid2">
    <div class="card"><div class="card-h"><h2 class="rc-h">Weekend graphic</h2><button class="btn btn-sm" id="poster-save">Save PNG</button></div>
      <canvas id="poster" width="1080" height="1350" class="poster"></canvas></div>
    <div class="card" id="article"><div class="loading"><span class="spinner"></span> Building the briefing\u2026</div></div>
  </section>
  <section class="card" id="ss-feature" hidden></section>`;

  $('#ics-weekend').onclick = () => exportIcs(weekendIcsEvents(ev), `F1_${ev.season}_R${ev.round}_${fileSafe(shortGp(ev))}_weekend.ics`, `F1 ${shortGp(ev)} GP`);
  $('#ics-season').onclick = () => exportIcs(cal.flatMap(e => weekendIcsEvents(e, { shows: false })), `F1_${ev.season}_season.ics`, `F1 ${ev.season} season`);
  main.onclick = e => { const b = e.target.closest('[data-snap-btn]'); if (b) snapCard(b.dataset.snapBtn, ev); };
  const poster = $('#poster'); drawWeekendPoster(poster, ev);
  $('#poster-save').onclick = () => exportCanvasPng(poster, `F1_${ev.season}_${fileSafe(shortGp(ev))}_weekend_graphic.png`);
  buildArticle(ev, c).then(html => { const a = $('#article'); if (a) a.innerHTML = html; wireArticle(ev); }).catch(e => { const a = $('#article'); if (a) a.innerHTML = errorBox(e); });
  loadSuperSportFeature(ev).catch(() => {});
  previousCard(ev).then(h => { const s = $('#rc-prev-slot'); if (s) s.innerHTML = h; });
  if (!cachedTrack) trackOutline(ev).then(t => { if (!t || App.route !== 'next') return; const h = $('#rc-hero-slot .rc-hero-track'); if (h) h.innerHTML = trackSvg(t, { style: 'watermark' }); const s = $('#rc-circuit-slot'); if (s) s.innerHTML = circuitCard(ev, t); }).catch(() => {});
  const W = await weekendData(ev).catch(() => ({ meeting: null, sessions: [], results: {}, drivers: {} }));
  if (App.route !== 'next') return;
  $('#rc-upd-slot').innerHTML = updatesCard(ev, W);
  $('#rc-res-slot').innerHTML = resultsCard(ev, W); wireResults(W);
  battleCard(ev).then(h => { const sl = $('#rc-battle-slot'); if (sl && h) sl.innerHTML = h; }).catch(() => {});
  const rr = raceResultOrder(W);
  const g = rr || await gridOrder(ev, W).catch(() => null);
  if (rr) { const h = $('.rc-grid-card .rc-h'); if (h) h.textContent = 'Race results'; }
  if (g && g.order.length) { const cv = document.createElement('canvas'); cv.className = 'poster'; await drawGrid(cv, ev, W, g); const box = $('#rc-grid'); if (box) { box.innerHTML = ''; box.appendChild(cv); const b = $('#grid-save'); b.hidden = false; b.onclick = () => exportCanvasPng(cv, `F1_${ev.season}_${fileSafe(shortGp(ev))}_${rr ? 'race_results' : 'grid'}.png`); } }
}

async function drawWeekendPoster(canvas, ev) {
  await loadFonts(); const ctx = canvas.getContext('2d'); const W = canvas.width, H = canvas.height; const tz = currentTz(); const bcs = regionBroadcasters(); const p = bcs[0];
  stripeBg(ctx, W, H); brandBand(ctx, W, 0, 12);
  ctx.font = '90px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif'; ctx.fillText(flagEmoji(ev.cc), 60, 150);
  ctx.fillStyle = '#c9d4ea'; ctx.font = 'italic 600 34px Inter, Segoe UI, Roboto, Arial'; ctx.fillText('GRAND PRIX', 190, 92);
  ctx.fillStyle = '#fff'; const gp = shortGp(ev).toUpperCase(); fitText(ctx, gp, W - 260, 78, 'italic 800', '"Barlow Condensed", Arial'); ctx.fillText(gp, 190, 150);
  ctx.fillStyle = '#ff5a4f'; ctx.font = '800 29px "Barlow Condensed", Arial'; ctx.fillText(`ROUND ${ev.round} \u00b7 ${ev.season}${ev.sprint ? ' \u00b7 SPRINT' : ''}`, 60, 210);
  ctx.fillStyle = '#9fb0cf'; ctx.font = '500 24px Inter, Segoe UI, Roboto, Arial'; ctx.fillText(ev.circuitName || '', 60, 245);
  const days = []; for (const s of ev.sessions) { const k = fmtDayLong(s.start, tz); let d = days.find(x => x.k === k); if (!d) days.push(d = { k, s: [] }); d.s.push(s); }
  let y = 300; const rowH = Math.min(96, (H - 420 - days.length * 80) / Math.max(1, ev.sessions.length));
  for (const d of days) {
    ctx.font = 'italic 800 43px "Barlow Condensed", Arial'; const label = d.k.split(' ')[0].toUpperCase(); const lw = ctx.measureText(label).width + 36;
    ctx.fillStyle = '#fff'; ctx.fillRect(60, y, lw, 56); ctx.fillStyle = '#7a0a10'; ctx.fillText(label, 78, y + 42);
    ctx.fillStyle = '#c9d4ea'; ctx.font = '600 24px Inter, Segoe UI, Roboto, Arial'; ctx.fillText(d.k.split(' ').slice(1).join(' '), 60 + lw + 18, y + 38);
    y += 72;
    for (const s of d.s) {
      const t = fmtTime(s.start, tz).replace(':', 'H');
      ctx.fillStyle = s.type === 'R' ? '#fff' : '#e10600'; roundRect(ctx, 100, y, 170, rowH - 14, 6); ctx.fill();
      ctx.fillStyle = s.type === 'R' ? '#e10600' : '#fff'; ctx.font = '800 46px "Barlow Condensed", Arial'; ctx.fillText(t, 118, y + rowH / 2 + 8);
      ctx.fillStyle = '#fff'; ctx.font = 'italic 800 46px "Barlow Condensed", Arial'; ctx.fillText(s.name.toUpperCase(), 300, y + rowH / 2 + 8);
      if (p) { ctx.fillStyle = '#9fb0cf'; ctx.font = '600 20px Inter, Segoe UI, Roboto, Arial'; const on = 'on air ' + fmtTime(onAir(s, p), tz); ctx.fillText(on, W - 60 - ctx.measureText(on).width, y + rowH / 2 + 6); }
      y += rowH;
    }
    y += 14;
  }
  brandBand(ctx, W, H - 120, 120);
  ctx.fillStyle = '#fff'; ctx.font = '800 29px "Barlow Condensed", Arial';
  ctx.fillText(`Times: ${tzLabel(tz)} \u00b7 ${currentRegion().name}`, 60, H - 74);
  ctx.font = '600 22px Inter, Segoe UI, Roboto, Arial';
  const line = bcs.map(b => `${b.short || b.name} (${b.channel})`).join('  \u2022  '); fitText(ctx, line, W - 120, 22, '600'); ctx.fillText(line, 60, H - 36);
}

async function buildArticle(ev, c) {
  const yr = ev.season; const tz = currentTz(); const bcs = regionBroadcasters();
  const [stand, hist, recent] = await Promise.all([
    getJSON(`${JOLPICA}/${yr}/driverstandings.json`, { ttl: 1800, persist: true }).then(j => (j.MRData.StandingsTable.StandingsLists[0] || {}).DriverStandings || []).catch(() => []),
    getJSON(`${JOLPICA}/circuits/${ev.circuitId}/results/1.json?limit=100`, { ttl: 86400, persist: true }).then(j => j.MRData.RaceTable.Races || []).catch(() => []),
    Promise.all([1, 2, 3].map(k => ev.round - k).filter(r => r > 0).map(r => getJSON(`${JOLPICA}/${yr}/${r}/results.json`, { ttl: 3600, persist: true }).then(j => (j.MRData.RaceTable.Races[0] || {}).Results || []).catch(() => []))),
  ]);
  const prev = hist.filter(r => +r.season < yr).slice(-1)[0];
  const lastWinner = prev && prev.Results && prev.Results[0] ? `${prev.Results[0].Driver.givenName} ${prev.Results[0].Driver.familyName}` : null;
  const days = ev.sessions[0] && ev.sessions[ev.sessions.length - 1] ? `${fmt(ev.sessions[0].start, { day: 'numeric', month: 'long' })} to ${fmt(ev.sessions[ev.sessions.length - 1].start, { day: 'numeric', month: 'long' })}` : '';
  const dn = d => `${d.Driver.givenName} ${d.Driver.familyName}`;
  const form = {}; recent.forEach((res, i) => res.forEach(r => { const k = r.Driver.driverId; form[k] = form[k] || { d: r, pts: 0 }; form[k].pts += (+r.points || 0) * (1 - i * 0.2); }));
  if (prev && prev.Results) prev.Results.slice(0, 3).forEach((r, i) => { const k = r.Driver.driverId; if (form[k]) form[k].pts += 6 - i * 2; });
  const pick = Object.values(form).sort((a, b) => b.pts - a.pts).slice(0, 3);
  const leader = stand[0], second = stand[1];
  const remaining = (App.cal || []).filter(e => e.round >= ev.round).length;
  const watch = [];
  if (c.note) watch.push(['The circuit', c.note]);
  if (c.km) watch.push(['By the numbers', `${c.laps} laps of a ${c.km.toFixed(3)} km lap \u2014 ${(c.km * c.laps).toFixed(1)} km of racing.`]);
  if (leader && second) watch.push(['Title fight', `${dn(leader)} leads ${dn(second)} by ${(+leader.points - +second.points)} points with ${remaining} Grand Prix weekend${remaining === 1 ? '' : 's'} left including this one.`]);
  if (ev.sprint) watch.push(['Sprint format', 'Only one practice session \u2014 Sprint Qualifying on Friday and the Sprint on Saturday morning reward teams that nail set-up early.']);
  if (lastWinner) watch.push(['Last time out here', `${lastWinner} won the ${prev.season} race at this venue.`]);
  const toWatch = (leader ? [leader] : []).concat(stand.slice(1, 3)).map(d => `<li><b>${esc(dn(d))}</b> (${esc(d.Constructors[0].name)}) \u2014 P${d.position}, ${d.points} pts, ${d.wins} win${d.wins === '1' ? '' : 's'}.</li>`).join('');
  const byDay = []; for (const s of ev.sessions) { const k = fmtDayLong(s.start, tz); let d = byDay.find(x => x.k === k); if (!d) byDay.push(d = { k, s: [] }); d.s.push(s); }
  return `<div class="card-h"><h2>UP NEXT \u2014 ${esc(shortGp(ev))} GP: all you need to know</h2><div><button class="btn btn-sm" id="art-copy">Copy</button> <button class="btn btn-sm" id="art-png">Save image</button></div></div>
  <article class="article" id="art-body">
    <p class="lead">Round ${ev.round} of the ${yr} season takes F1 to ${esc(ev.circuitName)}${ev.locality ? ' in ' + esc(ev.locality) : ''} from ${esc(days)}.${c.laps ? ` The Grand Prix runs over ${c.laps} laps.` : ''}</p>
    <h3>Circuit spotlight</h3>
    <ul>${c.km ? `<li>Circuit length: ${c.km.toFixed(3)} km</li><li>Race distance: ${c.laps} laps (${(c.km * c.laps).toFixed(3)} km)</li>` : ''}${c.first ? `<li>First F1 race here: ${c.first}</li>` : ''}${c.note ? `<li>${esc(c.note)}</li>` : ''}</ul>
    <h3>Schedule (${esc(tzLabel(tz))})</h3>
    ${byDay.map(d => `<p><b>${esc(d.k)}.</b> ${bcs.map(b => esc(b.short || b.name) + ' ' + esc(b.channel)).join(', ')}<br>${d.s.map(s => `${esc(s.name)}: ${fmtTime(s.start)}`).join('<br>')}</p>`).join('')}
    <h3>What to watch</h3>
    ${watch.map(([h, t]) => `<p><b>${esc(h)}.</b> ${esc(t)}</p>`).join('') || '<p class="muted">Standings load when online.</p>'}
    <h3>Drivers to watch</h3><ul>${toWatch || '<li class="muted">Standings unavailable offline.</li>'}</ul>
    <h3>Race prediction (data pick)</h3>
    ${pick.length ? `<ol>${pick.map(p => `<li>${esc(dn(p.d))} \u2014 ${esc(p.d.Constructor.name)}</li>`).join('')}</ol><p class="muted small">Weighted on points from the last three races plus past results at this circuit. Just for fun!</p>` : '<p class="muted">Available once this season has results.</p>'}
    <h3>More</h3>
    <p><a href="https://supersport.com/motorsport/f1">SuperSport F1</a> \u00b7 <a href="https://www.skysports.com/f1">Sky Sports F1</a> \u00b7 <a href="https://www.the-race.com/category/formula-1/">The Race</a> \u00b7 <a href="https://www.autosport.com/f1/">Autosport</a> \u00b7 <a href="#/standings">Standings</a> \u00b7 <a href="#/analytics">Session analytics</a></p>
  </article>`;
}
function wireArticle(ev) {
  const b = $('#art-copy'); if (b) b.onclick = async () => { const t = $('#art-body').innerText; try { await navigator.clipboard.writeText(t); toast('Briefing copied'); } catch { await deliver(`UpNext_${fileSafe(shortGp(ev))}.txt`, 'text/plain', new Blob([t], { type: 'text/plain' })); } };
  const p = $('#art-png'); if (p) p.onclick = () => exportElementPng($('#article'), `UpNext_${fileSafe(shortGp(ev))}.png`);
}
async function loadSuperSportFeature(ev) {
  if (!Platform.canScrape()) return;
  const items = await fetchNewsSource(NEWS_SOURCES[0]);
  const gp = shortGp(ev).toLowerCase().replace(/\u00e3/g, 'a').split(' ')[0];
  const hit = items.find(i => /up next/i.test(i.title) && i.title.toLowerCase().includes(gp)) || items.find(i => /up next/i.test(i.title));
  if (!hit) return; const box = $('#ss-feature'); if (!box) return;
  box.hidden = false;
  box.innerHTML = `<div class="card-h"><h2>From SuperSport</h2><a class="btn btn-sm" href="${esc(hit.link)}">Read on SuperSport</a></div>
    <a class="ss-feature" href="${esc(hit.link)}">${hit.image ? `<img src="${esc(hit.image)}" alt="" loading="lazy">` : ''}<div><b>${esc(hit.title)}</b>${hit.summary ? `<p class="muted">${esc(hit.summary)}</p>` : ''}</div></a>`;
}

/* ---------------- Live ---------------- */
async function renderLive(main) {
  const cal = await getCal(App.year); const ev = nextEvent(cal); const now = Date.now(); const bcs = regionBroadcasters();
  const live = ev.sessions.find(s => sessionStatus(s, now) === 'live');
  main.innerHTML = `
  <section class="card"><div class="card-h"><h2>${flagEmoji(ev.cc)} ${esc(ev.name)} \u2014 session timers</h2><span class="muted">Local clock <b class="mono" data-clock="">--:--</b></span></div>
    <div class="timers">${ev.sessions.map(s => `<div class="timer ${sessionStatus(s)}"><div class="t-name">${esc(s.name)}</div><div class="muted small">${fmtDateTime(s.start)} \u00b7 ${SESSION_META[s.key].mins} min</div><div class="t-cd">${cdSpan(s)}</div>${statusChip(s)}${s.live ? liveChips(s) : ''}</div>`).join('')}</div>
    <div class="link-row">${bcs.map(b => bcLink(b, '\u25b6 ' + (b.short || b.name) + ' \u00b7 ' + b.channel)).join('')}${LIVE_LINKS.map(l => `<a class="btn btn-sm" href="${esc(l.url)}">${esc(l.name)}</a>`).join('')}</div>
  </section>
  <section class="card" id="tower-card"><div class="loading"><span class="spinner"></span> Connecting to live timing\u2026</div></section>
  <div id="track-status"></div>
  <section class="grid2 even"><section class="card" id="rc-msgs" hidden></section><section class="card" id="radio" hidden></section></section>`;
  const card = $('#tower-card');
  const tick = async () => {
    try {
      const sessions = await of1(`sessions?session_key=latest`, live ? 5 : 120);
      const s = sessions[0]; if (!s) throw new Error('No session data');
      const isLive = new Date(s.date_start) <= Date.now() && Date.now() <= new Date(s.date_end).getTime() + 10 * 60000;
      const S = await loadSessionData(s, isLive);
      renderTower(card, S, isLive);
      renderLiveExtras(S, isLive).catch(() => {});
      if (isLive && !App.liveTimer && App.route === 'live') App.liveTimer = setInterval(tick, Math.max(3, +Settings.get('liveSeconds') || 5) * 1000);
    } catch (e) {
      const auth = e.status === 401 || e.status === 403;
      card.innerHTML = `<div class="card-h"><h2>Live timing</h2></div><p>${auth ? 'OpenF1 restricts real-time data during sessions to signed-in sponsors. Add your OpenF1 account in <a href="#/settings">Settings</a>, or open the official live timing below. Full timing appears here automatically shortly after each session.' : esc(e.message)}</p>
        <div class="link-row">${LIVE_LINKS.map(l => `<a class="btn btn-sm" href="${esc(l.url)}">${esc(l.name)}</a>`).join('')}</div>`;
    }
  };
  await tick();
  if (live && !App.liveTimer) App.liveTimer = setInterval(tick, Math.max(3, +Settings.get('liveSeconds') || 5) * 1000);
}
async function renderLiveExtras(S, isLive) {
  const sk = S.session.session_key; const ttl = isLive ? 4 : 600;
  const [rc, radio] = await Promise.all([of1(`race_control?session_key=${sk}`, ttl).catch(() => []), of1(`team_radio?session_key=${sk}`, ttl).catch(() => [])]);
  const flags = rc.filter(m => m.flag || /SAFETY CAR|VSC|RED FLAG/i.test(m.message || '')).sort((a, b) => new Date(a.date) - new Date(b.date));
  const lastF = flags.filter(m => !m.driver_number && (m.scope === 'Track' || !m.scope || /SAFETY CAR|VSC/i.test(m.message || ''))).pop();
  const ts = $('#track-status');
  if (ts) { const f = lastF ? String(lastF.flag || (/VIRTUAL|VSC/i.test(lastF.message) ? 'VSC' : /SAFETY CAR/i.test(lastF.message) ? 'SC' : '')).toUpperCase() : (isLive ? 'GREEN' : '');
    const cls = { GREEN: 'green', CLEAR: 'green', YELLOW: 'yellow', 'DOUBLE YELLOW': 'yellow', RED: 'red', CHEQUERED: 'cheq', SC: 'yellow', VSC: 'yellow' }[f] || 'grey';
    ts.innerHTML = f ? `<div class="track-status ts-${cls}"><b>TRACK STATUS</b><span>${esc(f === 'CLEAR' ? 'GREEN' : f)}</span><small>${lastF ? esc(lastF.message) + ' \u00b7 ' + fmtTime(new Date(lastF.date)) : ''}</small></div>` : ''; }
  const box = $('#rc-msgs'); if (box && rc.length) { box.hidden = false;
    box.innerHTML = `<div class="card-h"><h2 class="rc-h">Race control</h2><span class="muted small">${rc.length} messages</span></div><div class="rc-list">${rc.slice().reverse().slice(0, 40).map(m => `<div class="rcm"><span class="mono muted">${fmtTime(new Date(m.date))}${m.lap_number ? ' \u00b7 L' + m.lap_number : ''}</span><span class="rcflag f-${String(m.flag || m.category || '').toLowerCase().replace(/\W+/g, '')}">${esc(m.flag || m.category || '')}</span><span>${esc(m.message)}</span></div>`).join('')}</div>`; }
  const rbox = $('#radio'); if (rbox && radio.length) { rbox.hidden = false;
    rbox.innerHTML = `<div class="card-h"><h2 class="rc-h">Team radio</h2><span class="muted small">${radio.length} clips</span></div><div class="rc-list">${radio.slice().reverse().slice(0, 30).map(r => { const d = S.D[r.driver_number] || { acr: '#' + r.driver_number, color: '#888' };
      return `<div class="rcm radio-row"><span class="dtag"><i style="background:${d.color}"></i>${esc(d.acr)}</span><span class="mono muted">${fmtTime(new Date(r.date))}</span><audio controls preload="none" src="${esc(r.recording_url)}"></audio></div>`; }).join('')}</div>`; }
}
function renderTower(card, S, isLive) {
  const t = sessType(S.session); const race = t === 'R' || t === 'SPRINT';
  const lastPos = {}; let order;
  if (S.results.length) order = S.results.map(r => S.D[r.driver_number]).filter(Boolean);
  else order = S.list.slice().sort((a, b) => (a.best ? a.best.lap_duration : 1e9) - (b.best ? b.best.lap_duration : 1e9));
  const lead = order[0];
  const col = (v, i, d) => !v ? '' : Math.abs(v - S.sb[i]) < 1e-4 ? 'purple' : Math.abs(v - d.bestS[i]) < 1e-4 ? 'green' : 'yellow';
  const w = S.weather[S.weather.length - 1];
  card.innerHTML = `<div class="card-h"><h2>${isLive ? '<span class="live-dot"></span> LIVE \u00b7 ' : ''}${esc(S.session.country_name || '')} ${esc(S.session.session_name)} <span class="muted small">${esc(fmtDateTime(new Date(S.session.date_start)))}</span></h2>
    <div>${w ? `<span class="chip">Air ${w.air_temperature}\u00b0 \u00b7 Track ${w.track_temperature}\u00b0${w.rainfall ? ' \u00b7 Rain' : ''}</span>` : ''} <button class="btn btn-sm" id="tower-png">Save PNG</button> <button class="btn btn-sm" id="tower-xlsx">Excel</button></div></div>
    <div class="table-wrap"><table class="tbl tower"><thead><tr><th>P</th><th>Driver</th><th>${race ? 'Gap' : 'Best'}</th><th>${race ? 'Laps' : 'Gap'}</th><th>Last lap</th><th>S1</th><th>S2</th><th>S3</th><th>Tyre</th><th>ST</th></tr></thead><tbody>
    ${order.map((d, i) => { const l = d.all[d.all.length - 1] || {}; const r = S.results.find(x => x.driver_number === d.num) || {}; const tyre = d.compound(l.lap_number || 1);
      const gap = race ? (i === 0 ? 'Leader' : (typeof r.gap_to_leader === 'number' ? '+' + r.gap_to_leader.toFixed(3) : (r.gap_to_leader || '\u2014'))) : lapStr(d.best && d.best.lap_duration);
      const g2 = race ? (r.number_of_laps ?? d.all.length) : (i === 0 || !d.best || !lead || !lead.best ? '\u2014' : gapStr(d.best.lap_duration - lead.best.lap_duration));
      return `<tr><td class="pos">${r.position ?? i + 1}</td><td><span class="tbar" style="background:${d.color}"></span><b>${esc(d.acr)}</b> <span class="muted small hide-sm">${esc(d.team)}</span></td><td class="mono">${gap}</td><td class="mono">${g2}</td>
        <td class="mono">${lapStr(l.lap_duration)}${l.is_pit_out_lap ? ' <span class="chip">OUT</span>' : ''}</td>
        ${[1, 2, 3].map(k => `<td class="mono ${col(l['duration_sector_' + k], k - 1, d)}">${lapStr(l['duration_sector_' + k])}</td>`).join('')}
        <td>${tyre ? `<span class="tyre" style="--tc:${tyreColor(tyre)}">${tyre[0]}</span>` : ''}</td><td class="mono">${l.st_speed || ''}</td></tr>`; }).join('')}
    </tbody></table></div><p class="note">${isLive ? `Refreshing every ${Settings.get('liveSeconds')}s.` : 'Final timing from the most recent session.'} Source: OpenF1.</p>`;
  $('#tower-png').onclick = () => exportElementPng(card, `Timing_${fileSafe(S.session.country_name)}_${fileSafe(S.session.session_name)}.png`);
  $('#tower-xlsx').onclick = () => exportXlsx([{ name: 'Timing', columns: ['Pos', 'Driver', 'Team', 'Best lap', 'Last lap', 'Laps'], rows: order.map((d, i) => [i + 1, d.name, d.team, lapStr(d.best && d.best.lap_duration), lapStr((d.all[d.all.length - 1] || {}).lap_duration), d.all.length]) }], `Timing_${fileSafe(S.session.session_name)}.xlsx`);
}

/* ---------------- Calendar ---------------- */
async function renderCalendar(main) {
  const cal = await getCal(App.year); const now = Date.now(); const nxt = nextEvent(cal);
  const winners = {}; try { const j = await getJSON(`${JOLPICA}/${App.year}/results/1.json?limit=100`, { ttl: 3600, persist: true }); (j.MRData.RaceTable.Races || []).forEach(r => { const w = r.Results[0]; winners[r.round] = `${w.Driver.givenName} ${w.Driver.familyName}`; }); } catch {}
  const years = []; for (let y = new Date().getUTCFullYear() + 1; y >= 2023; y--) years.push(y);
  main.innerHTML = `<section class="card"><div class="card-h"><h2>${App.year} calendar \u00b7 ${esc(tzLabel(currentTz()))}</h2>
    <div class="row"><select id="cal-year">${years.map(y => `<option ${y === App.year ? 'selected' : ''}>${y}</option>`).join('')}</select>
    <button class="btn btn-primary" id="cal-all">\ud83d\udcc5 Sync full season (.ics)</button></div></div>
    <p class="note">Every weekend session (FP1\u2013FP3, Sprint Qualifying, Sprint, Qualifying, Race) in your local time, with the on-air time of <b>${esc(primaryBroadcaster().name)}</b> (${esc(primaryBroadcaster().channel)}). Calendar files follow the SuperSport TV-guide format: channel as location, a watch link and a ${Settings.get('icsAlarm')}-minute reminder.</p></section>
  <div class="cal-list">${cal.map(ev => { const first = ev.sessions[0], last = ev.sessions[ev.sessions.length - 1]; const done = last && last.end < now;
    return `<details class="card cal-item ${ev === nxt ? 'is-next' : ''} ${done ? 'is-done' : ''}" ${ev === nxt ? 'open' : ''}>
    <summary><span class="rnd">${ev.round}</span><span class="flag">${flagEmoji(ev.cc)}</span><span class="cal-name"><b>${esc(ev.name)}</b><span class="muted small">${first ? fmtDay(first.start) : ''} \u2013 ${last ? fmtDay(last.start) : ''}${ev.sprint ? ' \u00b7 <b class="sprint">Sprint</b>' : ''}</span></span>
      <span class="cal-right">${winners[ev.round] ? `\ud83c\udfc6 ${esc(winners[ev.round])}` : ev === nxt ? '<span class="chip chip-live">Next</span>' : ''}</span></summary>
    <div class="table-wrap"><table class="tbl"><tbody>${ev.sessions.map(s => `<tr><td><b>${esc(s.name)}</b></td><td>${fmtDay(s.start)}</td><td class="mono">${fmtTime(s.start)}</td><td class="mono muted">on air ${fmtTime(onAir(s, primaryBroadcaster()))}</td><td>${cdSpan(s, 'small')}</td><td><a class="btn btn-sm" href="${esc(googleCalLink(ev, s))}">+ Google</a></td></tr>`).join('')}</tbody></table></div>
    <div class="row"><button class="btn btn-sm" data-ics="${ev.round}">\ud83d\udcc5 Weekend .ics</button><a class="btn btn-sm" href="#/analytics?y=${ev.season}&r=${ev.round}">Analytics</a></div></details>`; }).join('')}</div>`;
  $('#cal-year').onchange = e => { App.year = +e.target.value; route(); };
  $('#cal-all').onclick = () => exportIcs(cal.flatMap(e => weekendIcsEvents(e, { shows: false })), `F1_${App.year}_season.ics`, `F1 ${App.year} season`);
  $$('[data-ics]').forEach(b => b.onclick = () => { const ev = cal.find(e => e.round === +b.dataset.ics); exportIcs(weekendIcsEvents(ev), `F1_${ev.season}_R${ev.round}_${fileSafe(shortGp(ev))}_weekend.ics`, `F1 ${shortGp(ev)} GP`); });
}

/* ---------------- Analytics ---------------- */
async function renderAnalytics(main) {
  const q = new URLSearchParams(location.hash.split('?')[1] || '');
  const A = App.an; A.year = +(q.get('y') || A.year || App.year);
  let meetings = (await of1(`meetings?year=${A.year}`, 3600)).filter(m => !/test/i.test(m.meeting_name || '')).sort((a, b) => new Date(a.date_start) - new Date(b.date_start));
  meetings.forEach((m, i) => m.round = i + 1);
  const past = meetings.filter(m => new Date(m.date_start) < Date.now());
  if (q.get('r')) A.meetingKey = (meetings.find(m => m.round === +q.get('r')) || {}).meeting_key;
  if (!meetings.find(m => m.meeting_key === A.meetingKey)) A.meetingKey = (past[past.length - 1] || meetings[0] || {}).meeting_key;
  const meeting = meetings.find(m => m.meeting_key === A.meetingKey);
  const sessions = meeting ? (await of1(`sessions?meeting_key=${meeting.meeting_key}`, 900)).sort((a, b) => new Date(a.date_start) - new Date(b.date_start)) : [];
  const started = sessions.filter(s => new Date(s.date_start) < Date.now());
  if (!sessions.find(s => s.session_key === A.sessionKey)) A.sessionKey = (started[started.length - 1] || sessions[0] || {}).session_key;
  const sess = sessions.find(s => s.session_key === A.sessionKey);
  const years = []; for (let y = new Date().getUTCFullYear(); y >= 2023; y--) years.push(y);
  main.innerHTML = `<section class="card an-head">
    <div class="an-top"><div class="seg-tabs">${sessions.map(s => `<button class="seg ${s.session_key === A.sessionKey ? 'on' : ''}" data-sk="${s.session_key}" ${new Date(s.date_start) > Date.now() ? 'disabled title="Not started yet"' : ''}>${esc(s.session_name)}</button>`).join('')}</div>
    <div class="row"><label>Year <select id="an-year">${years.map(y => `<option ${y === A.year ? 'selected' : ''}>${y}</option>`).join('')}</select></label>
    <label>Grand Prix <select id="an-gp">${meetings.map(m => `<option value="${m.meeting_key}" ${m.meeting_key === A.meetingKey ? 'selected' : ''}>${m.round} - ${esc(m.meeting_name)}</option>`).join('')}</select></label></div></div>
    <h2 class="an-title">${A.year} - ${esc(meeting ? meeting.meeting_name : '')} - ${esc(sess ? sess.session_name : '')}</h2>
    <div class="pills">${ANALYTICS_VIEWS.map(([k, n]) => `<button class="pill ${k === A.view ? 'on' : ''}" data-view="${k}">${esc(n)}</button>`).join('')}</div>
  </section><section class="card" id="an-body"><div class="loading"><span class="spinner"></span> Loading session data\u2026</div></section>`;
  $('#an-year').onchange = e => { A.year = +e.target.value; A.meetingKey = null; A.sessionKey = null; location.hash = '#/analytics'; route(); };
  $('#an-gp').onchange = e => { A.meetingKey = +e.target.value; A.sessionKey = null; location.hash = '#/analytics'; route(); };
  $$('.seg[data-sk]').forEach(b => b.onclick = () => { A.sessionKey = +b.dataset.sk; $$('.seg').forEach(x => x.classList.toggle('on', x === b)); loadAn(); });
  $$('.pill[data-view]').forEach(b => b.onclick = () => { A.view = b.dataset.view; $$('.pill').forEach(x => x.classList.toggle('on', x === b)); drawAn(); });
  async function loadAn() {
    const body = $('#an-body'); body.innerHTML = '<div class="loading"><span class="spinner"></span> Loading session data\u2026</div>';
    const s = sessions.find(x => x.session_key === A.sessionKey); if (!s) { body.innerHTML = '<p class="muted">No session selected.</p>'; return; }
    $('.an-title').textContent = `${A.year} - ${meeting.meeting_name} - ${s.session_name}`;
    try { A.S = await loadSessionData(s); A.opts.driver = null; drawAn(); } catch (e) { body.innerHTML = errorBox(e); }
  }
  await loadAn();
}
function drawAn() {
  const A = App.an, S = A.S, body = $('#an-body'); if (!S || !body) return;
  if (App.chart) { App.chart.destroy(); App.chart = null; }
  const name = (ANALYTICS_VIEWS.find(v => v[0] === A.view) || [])[1];
  if (!S.list.length && !S.results.length) { body.innerHTML = '<p class="muted">No timing data published for this session yet. Data usually appears within minutes of the session ending.</p>'; return; }
  const V = VIEWS[A.view](S, A.opts); A.V = V;
  const kinds = []; if (V.chart) { kinds.push(['auto', 'Chart: default']); if (V.chart.type === 'bar') kinds.push(['hbar', 'Horizontal bars'], ['line', 'Line']); if (V.chart.type === 'line') kinds.push(['bar', 'Bars']); }
  if (V.pie) kinds.push(['pie', 'Pie: ' + V.pie.title], ['doughnut', 'Doughnut'], ['polarArea', 'Polar area']);
  if (!kinds.find(k => k[0] === A.chartKind)) A.chartKind = 'auto';
  const head = `${S.session.year || A.year} ${S.session.country_name || ''} ${S.session.session_name} \u2014 ${name}`;
  body.innerHTML = `<div class="card-h"><h2>${esc(name)}</h2><div class="row toolbar">
      ${V.singleDriver ? `<select id="an-driver">${V.singleDriver.map(d => `<option value="${d.num}" ${d.num === V.driver ? 'selected' : ''}>${esc(d.acr)} \u2014 ${esc(d.name)}</option>`).join('')}</select>` : ''}
      ${V.slowToggle ? `<label class="chk"><input type="checkbox" id="an-slow" ${A.opts.hideSlow ? 'checked' : ''}> Hide slow laps</label>` : ''}
      ${kinds.length ? `<select id="an-kind">${kinds.map(([k, n]) => `<option value="${k}" ${k === A.chartKind ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select>` : ''}
      <div class="dropdown"><button class="btn btn-primary btn-sm" id="exp-btn">Export \u25be</button><div class="menu" id="exp-menu">
        ${V.chart || V.pie ? '<button data-exp="chart">Chart image (PNG)</button>' : ''}<button data-exp="panel">Full view image (PNG)</button><button data-exp="info">Infographic (PNG)</button>
        <button data-exp="xlsx">Spreadsheet (Excel)</button><button data-exp="csv">CSV</button></div></div></div></div>
    ${V.driverPicker ? `<div class="drv-pick">${S.list.filter(d => d.best).sort((a, b) => a.best.lap_duration - b.best.lap_duration).map((d, i) => `<label class="drv" style="--c:${d.color}"><input type="checkbox" value="${d.num}" ${(A.opts.drivers && A.opts.drivers.length ? A.opts.drivers.includes(d.num) : i < 6) ? 'checked' : ''}>${esc(d.acr)}</label>`).join('')}</div>` : ''}
    <div id="an-capture">
      ${V.chart || V.pie ? `<div class="chart-box ${V.chart && V.chart.type === 'bar' && V.chart.labels && V.chart.labels.length > 14 && A.chartKind === 'hbar' ? 'tall' : ''}"><canvas id="an-chart"></canvas></div>` : ''}
      ${V.legendNote ? `<p class="note">${esc(V.legendNote)}</p>` : ''}
      ${V.customHtml || ''}
      ${V.empty ? `<p class="muted">${esc(V.empty)}</p>` : `<div class="table-wrap ${V.wide ? 'wide' : ''}"><table class="tbl an-tbl"><thead><tr>${V.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>
        ${V.rows.map(r => `<tr>${r.map(x => x && typeof x === 'object' && 't' in x ? `<td class="${x.c || ''}" style="${x.s || ''}">${esc(x.t)}</td>` : `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
    </div>`;
  const cfg = chartConfig(V, A.chartKind === 'auto' ? (V.chart ? V.chart.type : 'pie') : A.chartKind);
  if (cfg && $('#an-chart')) App.chart = new Chart($('#an-chart'), cfg);
  const k = $('#an-kind'); if (k) k.onchange = () => { A.chartKind = k.value; drawAn(); };
  const dsel = $('#an-driver'); if (dsel) dsel.onchange = () => { A.opts.driver = +dsel.value; drawAn(); };
  const slow = $('#an-slow'); if (slow) slow.onchange = () => { A.opts.hideSlow = slow.checked; drawAn(); };
  $$('.drv-pick input').forEach(i => i.onchange = () => { A.opts.drivers = $$('.drv-pick input:checked').map(x => +x.value); drawAn(); });
  $('#exp-btn').onclick = e => { e.stopPropagation(); $('#exp-menu').classList.toggle('open'); };
  document.addEventListener('click', () => { const m = $('#exp-menu'); if (m) m.classList.remove('open'); }, { once: true });
  const base = fileSafe(`${S.session.year || A.year}_${S.session.country_name || ''}_${S.session.session_name}_${name}`);
  $$('#exp-menu [data-exp]').forEach(b => b.onclick = async () => {
    $('#exp-menu').classList.remove('open'); const t = b.dataset.exp;
    if (t === 'chart' && App.chart) return exportCanvasPng(App.chart.canvas, base + '_chart.png');
    if (t === 'panel') return exportElementPng($('#an-body'), base + '.png');
    if (t === 'xlsx') {
      const rows = V.rows.map(r => r.map(cellT));
      const all = S.list.flatMap(d => d.all.map(l => [d.acr, d.team, l.lap_number, l.lap_duration ?? '', l.duration_sector_1 ?? '', l.duration_sector_2 ?? '', l.duration_sector_3 ?? '', l.i1_speed ?? '', l.i2_speed ?? '', l.st_speed ?? '', l.is_pit_out_lap ? 'Y' : '', d.compound(l.lap_number)]));
      const sheets = [{ name, columns: V.columns, rows }, { name: 'All laps', columns: ['Driver', 'Team', 'Lap', 'Lap s', 'S1', 'S2', 'S3', 'I1', 'I2', 'ST', 'Pit out', 'Tyre'], rows: all }];
      if (S.weather.length) sheets.push({ name: 'Weather', columns: ['Time', 'Air', 'Track', 'Humidity', 'Wind', 'Rain'], rows: S.weather.map(w => [w.date, w.air_temperature, w.track_temperature, w.humidity, w.wind_speed, w.rainfall]) });
      if (V.pie) sheets.push({ name: 'Pie data', columns: ['Label', 'Value'], rows: V.pie.labels.map((l, i) => [l, V.pie.values[i]]) });
      return exportXlsx(sheets, base + '.xlsx');
    }
    if (t === 'csv') return exportCsv(V.columns, V.rows.map(r => r.map(cellT)), base + '.csv');
    if (t === 'info') {
      let chartCanvas = App.chart ? App.chart.canvas : null;
      if (!chartCanvas && V.wide) chartCanvas = await html2canvas($('#an-capture'), { backgroundColor: '#111a2e', scale: 1, logging: false });
      const c = await buildInfographic({ title: `${S.session.country_name || ''} \u00b7 ${S.session.session_name}`, subtitle: `${S.session.year || A.year} \u2014 ${name}`, chartCanvas, highlights: V.highlights, bars: V.bars.slice(0, 10) });
      return exportCanvasPng(c, base + '_infographic.png');
    }
  });
}

/* ---------------- Standings ---------------- */
async function renderStandings(main) {
  const y = App.year;
  const [dj, cj] = await Promise.all([getJSON(`${JOLPICA}/${y}/driverstandings.json`, { ttl: 1800, persist: true }), getJSON(`${JOLPICA}/${y}/constructorstandings.json`, { ttl: 1800, persist: true })]);
  const ds = (dj.MRData.StandingsTable.StandingsLists[0] || {}).DriverStandings || []; const cs = (cj.MRData.StandingsTable.StandingsLists[0] || {}).ConstructorStandings || [];
  const round = (dj.MRData.StandingsTable.StandingsLists[0] || {}).round || '';
  App.st = App.st || { tab: 'drivers', kind: 'bar' };
  const T = App.st;
  const draw = () => {
    if (App.chart) { App.chart.destroy(); App.chart = null; }
    const drivers = T.tab === 'drivers'; const rows = drivers ? ds.map(d => [d.position, `${d.Driver.givenName} ${d.Driver.familyName}`, d.Driver.code || '', d.Constructors[0] ? d.Constructors[0].name : '', d.points, d.wins])
      : cs.map(c => [c.position, c.Constructor.name, c.Constructor.nationality, c.points, c.wins]);
    const cols = drivers ? ['Pos', 'Driver', 'Code', 'Team', 'Points', 'Wins'] : ['Pos', 'Team', 'Nationality', 'Points', 'Wins'];
    const labels = drivers ? ds.map(d => d.Driver.code || d.Driver.familyName) : cs.map(c => c.Constructor.name); const vals = drivers ? ds.map(d => +d.points) : cs.map(c => +c.points);
    $('#st-body').innerHTML = `<div class="chart-box"><canvas id="st-chart"></canvas></div><div class="table-wrap"><table class="tbl"><thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(x => `<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    const pie = ['pie', 'doughnut'].includes(T.kind);
    App.chart = new Chart($('#st-chart'), { type: pie ? T.kind : 'bar', data: { labels: pie ? labels.slice(0, 12) : labels, datasets: [{ label: 'Points', data: pie ? vals.slice(0, 12) : vals, backgroundColor: PALETTE, borderColor: cssVar('--panel'), borderWidth: pie ? 2 : 0, borderRadius: pie ? 0 : 4 }] },
      options: { responsive: true, maintainAspectRatio: false, animation: false, indexAxis: T.kind === 'hbar' ? 'y' : 'x', plugins: { legend: { display: pie, position: 'right' }, title: { display: true, text: `${y} ${drivers ? 'Drivers' : 'Constructors'} \u2014 after round ${round}`, color: cssVar('--text') } } } });
    T.rows = rows; T.cols = cols; T.labels = labels; T.vals = vals;
  };
  main.innerHTML = `<section class="card"><div class="card-h"><h2>${y} championship standings</h2><div class="row toolbar">
    <div class="seg-tabs"><button class="seg ${T.tab === 'drivers' ? 'on' : ''}" data-tab="drivers">Drivers</button><button class="seg ${T.tab === 'teams' ? 'on' : ''}" data-tab="teams">Constructors</button></div>
    <select id="st-kind">${[['bar', 'Bar chart'], ['hbar', 'Horizontal bars'], ['pie', 'Pie chart'], ['doughnut', 'Doughnut']].map(([k, n]) => `<option value="${k}" ${k === T.kind ? 'selected' : ''}>${n}</option>`).join('')}</select>
    <button class="btn btn-sm" data-e="png">PNG</button><button class="btn btn-sm" data-e="info">Infographic</button><button class="btn btn-sm" data-e="xlsx">Excel</button><button class="btn btn-sm" data-e="csv">CSV</button></div></div>
    <div id="st-body"></div></section>`;
  $$('[data-tab]').forEach(b => b.onclick = () => { T.tab = b.dataset.tab; $$('[data-tab]').forEach(x => x.classList.toggle('on', x === b)); draw(); });
  $('#st-kind').onchange = e => { T.kind = e.target.value; draw(); };
  $$('[data-e]').forEach(b => b.onclick = async () => { const n = `F1_${y}_${T.tab}_standings`;
    if (b.dataset.e === 'png') return exportElementPng($('#st-body'), n + '.png');
    if (b.dataset.e === 'xlsx') return exportXlsx([{ name: 'Drivers', columns: ['Pos', 'Driver', 'Code', 'Team', 'Points', 'Wins'], rows: ds.map(d => [+d.position, `${d.Driver.givenName} ${d.Driver.familyName}`, d.Driver.code || '', d.Constructors[0] ? d.Constructors[0].name : '', +d.points, +d.wins]) }, { name: 'Constructors', columns: ['Pos', 'Team', 'Nationality', 'Points', 'Wins'], rows: cs.map(c => [+c.position, c.Constructor.name, c.Constructor.nationality, +c.points, +c.wins]) }], `F1_${y}_standings.xlsx`);
    if (b.dataset.e === 'csv') return exportCsv(T.cols, T.rows, n + '.csv');
    const c = await buildInfographic({ title: `${y} ${T.tab === 'drivers' ? 'Drivers' : 'Constructors'} Championship`, subtitle: `After round ${round}`, chartCanvas: App.chart.canvas,
      highlights: [{ label: 'Leader', value: String(T.labels[0] || '\u2014'), sub: (T.vals[0] || 0) + ' pts' }, { label: 'Gap to P2', value: (T.vals[0] - T.vals[1] || 0) + ' pts' }, { label: 'Wins (leader)', value: String(T.rows[0] ? T.rows[0][T.rows[0].length - 1] : '\u2014') }],
      bars: T.labels.slice(0, 10).map((l, i) => ({ label: String(l).slice(0, 12), value: T.vals[i], text: T.vals[i] + ' pts', color: PALETTE[i % PALETTE.length] })) });
    exportCanvasPng(c, n + '_infographic.png'); });
  draw();
}

/* ---------------- News ---------------- */
function parseRss(xml, src) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml'); const items = [...doc.querySelectorAll('item')].slice(0, 25);
  return items.map(it => { const g = t => (it.getElementsByTagName(t)[0] || {}).textContent || '';
    let image = ''; const media = it.getElementsByTagName('media:content')[0] || it.getElementsByTagName('media:thumbnail')[0] || it.getElementsByTagName('enclosure')[0];
    if (media) image = media.getAttribute('url') || '';
    const desc = g('description'); if (!image) { const m = desc.match(/<img[^>]+src="([^"]+)"/i); if (m) image = m[1]; }
    return { src: src.id, srcName: src.name, color: src.color, title: g('title').trim(), link: g('link').trim(), date: g('pubDate') ? new Date(g('pubDate')) : null, image, summary: desc.replace(/<[^>]+>/g, '').trim().slice(0, 220) }; }).filter(i => i.title && i.link);
}
function scrapeHtml(html, src, pageUrl) {
  const doc = new DOMParser().parseFromString(html, 'text/html'); const seen = new Set(); const out = [];
  for (const a of doc.querySelectorAll('a[href]')) {
    let href = a.getAttribute('href'); try { href = new URL(href, pageUrl).href; } catch { continue; }
    if (!src.match.test(href) || seen.has(href)) continue;
    const title = (a.getAttribute('aria-label') || a.textContent || '').replace(/\s+/g, ' ').trim();
    if (title.length < 20) continue; seen.add(href);
    const img = a.querySelector('img') || (a.closest('article, li, div') || a).querySelector('img');
    let image = img ? (img.getAttribute('src') || img.getAttribute('data-src') || (img.getAttribute('srcset') || '').split(' ')[0]) : '';
    if (image && image.startsWith('/')) image = src.base + image;
    out.push({ src: src.id, srcName: src.name, color: src.color, title: title.slice(0, 180), link: href, date: null, image, summary: '' });
    if (out.length >= 25) break;
  }
  return out;
}
async function fetchNewsSource(src) {
  const key = 'news:' + src.id; const c = Mem.get(key); if (c && Date.now() - c.t < 600000) return c.v;
  let items = [];
  if (src.rss) { const r = await Platform.http(src.rss); if (r.ok && /<rss|<feed|<channel/i.test(r.text)) items = parseRss(r.text, src); }
  if (!items.length) for (const p of src.pages || []) { const r = await Platform.http(p); if (r.ok) { items = scrapeHtml(r.text, src, p); if (items.length) break; } }
  Mem.set(key, { t: Date.now(), v: items }); return items;
}
async function renderNews(main) {
  const off = Settings.get('newsOff') || []; App.newsFilter = App.newsFilter || 'all';
  main.innerHTML = `<section class="card"><div class="card-h"><h2>F1 news</h2><div class="seg-tabs" id="nf"><button class="seg on" data-f="all">All</button>${NEWS_SOURCES.filter(s => !off.includes(s.id)).map(s => `<button class="seg" data-f="${s.id}">${esc(s.name)}</button>`).join('')}</div></div>
    ${Platform.canScrape() ? '' : '<p class="note">News from SuperSport, Sky Sports, The Race and Autosport loads inside the Android and Windows apps (web browsers block cross-site reading).</p>'}
    <div id="news-grid" class="news-grid"><div class="loading"><span class="spinner"></span> Fetching headlines\u2026</div></div></section>`;
  const res = await Promise.all(NEWS_SOURCES.filter(s => !off.includes(s.id)).map(s => fetchNewsSource(s).catch(() => [])));
  const all = res.flat(); const status = NEWS_SOURCES.filter(s => !off.includes(s.id)).map((s, i) => `${s.name}: ${res[i].length}`).join(' \u00b7 ');
  all.sort((a, b) => (b.date ? b.date.getTime() : 0) - (a.date ? a.date.getTime() : 0));
  const draw = f => { const list = f === 'all' ? interleave(res) : all.filter(i => i.src === f);
    $('#news-grid').innerHTML = list.length ? list.map(i => `<a class="news" href="${esc(i.link)}">${i.image ? `<img src="${esc(i.image)}" loading="lazy" alt="" onerror="this.remove()">` : ''}<div><span class="src" style="--c:${i.color}">${esc(i.srcName)}</span>${i.date ? `<span class="muted small"> \u00b7 ${fmtDateTime(i.date)}</span>` : ''}<h4>${esc(i.title)}</h4>${i.summary ? `<p class="muted small">${esc(i.summary)}</p>` : ''}</div></a>`).join('') + `<p class="note">${esc(status)}</p>`
      : `<p class="muted">No headlines could be loaded right now. ${esc(status)}</p>`; };
  $$('#nf .seg').forEach(b => b.onclick = () => { $$('#nf .seg').forEach(x => x.classList.toggle('on', x === b)); draw(b.dataset.f); });
  draw('all');
}
function interleave(lists) { const out = []; const sorted = lists.map(l => l.slice().sort((a, b) => (b.date ? b.date.getTime() : 0) - (a.date ? a.date.getTime() : 0))); for (let i = 0; i < 25; i++) for (const l of sorted) if (l[i]) out.push(l[i]); return out; }

/* ---------------- Settings ---------------- */
function renderSettings(main) {
  const s = Settings.all(); const reg = currentRegion(); const bcs = regionBroadcasters();
  let zones = []; try { zones = Intl.supportedValuesOf('timeZone'); } catch { zones = [...new Set(Object.values(REGIONS).map(r => r.tz))]; }
  main.innerHTML = `<section class="card"><h2>Appearance</h2><div class="form"><label>Theme<select id="s-theme">${[['auto', 'Auto (match device)'], ['dark', 'Night race (dark)'], ['light', 'Paddock (light)']].map(([k, n]) => `<option value="${k}" ${s.theme === k ? 'selected' : ''}>${n}</option>`).join('')}</select></label></div></section>
  <section class="card"><h2>Location & time</h2>
    <div class="form">
      <label>Where are you watching from?<select id="s-region"><option value="auto" ${s.region === 'auto' ? 'selected' : ''}>Auto \u2014 follow this device's time zone (${esc(deviceTz())})</option>${REGIONS_RAW.map(([c, n]) => `<option value="${c}" ${s.region === c ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select></label>
      <label>Time zone<select id="s-tz"><option value="auto" ${s.tz === 'auto' ? 'selected' : ''}>Auto (${esc(reg.tz || deviceTz())})</option>${zones.map(z => `<option ${s.tz === z ? 'selected' : ''}>${esc(z)}</option>`).join('')}</select></label>
      <label class="chk"><input type="checkbox" id="s-h12" ${s.hour12 ? 'checked' : ''}> 12-hour clock</label>
    </div><p class="note">Travelling? Leave both on <b>Auto</b>: when your phone or PC changes time zone, session times and the broadcaster list follow automatically.</p></section>
  <section class="card"><h2>Broadcasters \u00b7 ${esc(reg.name)}</h2>
    <div class="form">${bcs.map(b => `<fieldset><legend>${esc(b.name)}</legend><label>Channel<input data-ch="${reg.code}:${b.key}" value="${esc(b.channel)}"></label><label>Watch link<input data-ln="${reg.code}:${b.key}" value="${esc(b.watch)}"></label></fieldset>`).join('')}
    <label>Calendar files use<select id="s-primary">${bcs.map(b => `<option value="${b.key}" ${primaryBroadcaster().key === b.key ? 'selected' : ''}>${esc(b.name)}</option>`).join('')}</select></label>
    <label class="chk"><input type="checkbox" id="s-shows" ${s.icsShows ? 'checked' : ''}> Include SuperSport support shows (Build Up, The Notebook, GP Sunday, Chequered Flag\u2026)</label>
    <label>Reminder before each event (minutes)<input type="number" id="s-alarm" min="0" max="240" value="${s.icsAlarm}"></label></div>
    <p class="note">SuperSport Motorsport is on DStv (channel 235). GOtv does not show F1 unless SuperSport states it for a specific race \u2014 add it to the channel box if that happens.</p><p class="note">Broadcaster list per country follows the official F1 broadcast information page. <a href="https://www.formula1.com/en/information/f1-broadcast-information.45y3LNsT1D6VoK0ZmX8ciJ">Check for changes</a>.</p></section>
  <section class="card"><h2>Live timing (OpenF1)</h2><div class="form">
    <label>OpenF1 username (optional)<input id="s-ou" value="${esc(s.openf1User)}" autocomplete="off"></label>
    <label>OpenF1 password<input id="s-op" type="password" value="${esc(s.openf1Pass)}" autocomplete="off"></label>
    <label>Refresh every (seconds)<input type="number" id="s-live" min="3" max="60" value="${s.liveSeconds}"></label></div>
    <p class="note">Historical timing is free. Real-time timing during a session requires an OpenF1 sponsor account. Your login stays on this device.</p></section>
  <section class="card"><h2>News sources</h2><div class="form">${NEWS_SOURCES.map(n => `<label class="chk"><input type="checkbox" data-news="${n.id}" ${(s.newsOff || []).includes(n.id) ? '' : 'checked'}> ${esc(n.name)}</label>`).join('')}</div></section>
  <section class="card"><h2>Updates</h2><p>App code <b>${esc(runningCode())}</b>${window.__OTA__ ? ' (updated over the air)' : ''} \u00b7 installer <b>${esc(SHELL.version)}</b> \u00b7 ${esc(Platform.kind)}</p>
    <p class="note">The app checks <a href="https://github.com/Kigakhemet98/asbh-feed/tree/main/f1hub">github.com/Kigakhemet98/asbh-feed</a> every 6 hours. App-code updates are signed and verified on this device, then applied on restart; new installers show a banner${Platform.kind === 'desktop' ? ' and install themselves' : ''}.</p>
    <div class="row"><button class="btn btn-primary" id="s-upd">Check for updates</button>${window.__OTA__ ? '<button class="btn" id="s-rollback">Go back to built-in version</button>' : ''}</div>
    <p class="note">Live TV guide: ${FEED && FEED.updated ? 'updated ' + esc(fmtDateTime(new Date(FEED.updated))) + ' \u00b7 ' + FEED.events.length + ' F1 listings' : 'not loaded yet'} \u00b7 <a href="https://github.com/Kigakhemet98/asbh-feed">ASBH feed</a></p></section>
  <section class="card"><h2>Data</h2><button class="btn" id="s-clear">Clear cached data</button></section>`;
  const save = (k, v) => { Settings.set(k, v); updateHeader(); toast('Saved'); };
  $('#s-region').onchange = e => { save('region', e.target.value); renderSettings(main); };
  $('#s-tz').onchange = e => save('tz', e.target.value);
  $('#s-theme').onchange = e => { save('theme', e.target.value); applyTheme(); };
  $('#s-h12').onchange = e => save('hour12', e.target.checked);
  $('#s-primary').onchange = e => save('primary', e.target.value);
  $('#s-shows').onchange = e => save('icsShows', e.target.checked);
  $('#s-alarm').onchange = e => save('icsAlarm', +e.target.value);
  $('#s-ou').onchange = e => { save('openf1User', e.target.value.trim()); Store.del('of1token'); };
  $('#s-op').onchange = e => { save('openf1Pass', e.target.value); Store.del('of1token'); };
  $('#s-live').onchange = e => save('liveSeconds', clamp(+e.target.value, 3, 60));
  $$('[data-ch]').forEach(i => i.onchange = () => { const o = Settings.get('channelOverrides') || {}; o[i.dataset.ch] = i.value; save('channelOverrides', o); });
  $$('[data-ln]').forEach(i => i.onchange = () => { const o = Settings.get('linkOverrides') || {}; o[i.dataset.ln] = i.value; save('linkOverrides', o); });
  $$('[data-news]').forEach(i => i.onchange = () => { save('newsOff', $$('[data-news]').filter(x => !x.checked).map(x => x.dataset.news)); });
  $('#s-upd').onclick = () => otaCheck({ manual: true });
  if ($('#s-rollback')) $('#s-rollback').onclick = () => { ['code', 'meta', 'pending'].forEach(k => localStorage.removeItem('f1hub.ota.' + k)); location.reload(); };
  $('#s-clear').onclick = () => { Object.keys(localStorage).filter(k => k.startsWith('f1hub.cache:')).forEach(k => localStorage.removeItem(k)); Mem.clear(); App.cal = null; toast('Cache cleared'); };
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  const tb = $('#theme-btn'); if (tb) tb.onclick = () => { Settings.set('theme', document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'); applyTheme(); route(); };
  route();
});

/* ---- ota.js ---- */
/* F1 Data Hub \u2014 over-the-air updates.
   1) App code: a signed bundle (ECDSA P-256) from asbh-feed/f1hub is downloaded, verified on the device and applied on next start.
   2) Installers: a banner offers the new APK / EXE; on Windows the app updates itself. */
'use strict';

const OTA_URL = 'https://raw.githubusercontent.com/Kigakhemet98/asbh-feed/main/f1hub/ota.json';
const OTA_PUBKEY = { kty: 'EC', crv: 'P-256', x: 'winqQTnoJce85MktKpbHOU8DGjfRZDaWbl6oQKPGZRc', y: 'cQHpp6nsdoup1UiarO7VE7fMbjwVa2M_ONCUObqXXjU' };
const SHELL = window.F1HUB_SHELL || { version: APP_VERSION, api: 3 };
function vcmp(a, b) { a = String(a).split('.').map(Number); b = String(b).split('.').map(Number); for (let i = 0; i < 3; i++) { const d = (a[i] || 0) - (b[i] || 0); if (d) return d; } return 0; }
function runningCode() { return window.__OTA__ || APP_VERSION; }

async function verifyBundle(text, sigB64) {
  if (!window.crypto || !crypto.subtle) throw new Error('This device cannot verify updates');
  const key = await crypto.subtle.importKey('jwk', OTA_PUBKEY, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['verify']);
  const sig = Uint8Array.from(atob(sigB64), c => c.charCodeAt(0));
  return crypto.subtle.verify({ name: 'ECDSA', hash: 'SHA-256' }, key, sig, new TextEncoder().encode(text));
}
async function sha256Hex(text) { const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)); return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join(''); }

async function otaCheck({ manual = false } = {}) {
  const res = { code: null, installer: null, error: null };
  try {
    const r = await Platform.http(OTA_URL + '?t=' + Math.floor(Date.now() / 60e3));
    if (!r.ok) throw new Error('update server HTTP ' + r.status);
    const m = JSON.parse(r.text); Store.set('ota.manifest', { t: Date.now(), m });
    const b = m.bundle;
    if (b && vcmp(b.version, runningCode()) > 0 && (b.minShell || 0) <= SHELL.api && (!b.maxShell || SHELL.api <= b.maxShell)) {
      const have = (() => { try { return JSON.parse(localStorage.getItem('f1hub.ota.meta') || 'null'); } catch { return null; } })();
      if (!have || vcmp(b.version, have.version) > 0) {
        const cr = await Platform.http(b.url + '?v=' + b.version); if (!cr.ok) throw new Error('bundle HTTP ' + cr.status);
        if (b.sha256 && (await sha256Hex(cr.text)) !== b.sha256) throw new Error('update file is incomplete');
        if (!(await verifyBundle(cr.text, b.sig))) throw new Error('update signature did not match \u2014 ignored');
        try { localStorage.setItem('f1hub.ota.code', cr.text); localStorage.setItem('f1hub.ota.meta', JSON.stringify({ version: b.version, minShell: b.minShell || 0, verified: true, at: Date.now(), notes: b.notes || m.notes || '' })); localStorage.removeItem('f1hub.ota.pending'); }
        catch (e) { throw new Error('not enough storage for the update'); }
      }
      res.code = b.version;
      toast(`<b>F1 Data Hub ${esc(b.version)}</b> downloaded${b.notes ? '<br><small>' + esc(b.notes) + '</small>' : ''}`, [['Restart now', () => location.reload()]], 15000);
    }
    const inst = Platform.kind === 'android' ? m.apk : Platform.kind === 'desktop' ? m.exe : null;
    if (inst && vcmp(inst.version, SHELL.version) > 0) { res.installer = inst; showInstallerBanner(inst, m); }
    if (manual && !res.code && !res.installer) toast(`You're up to date (app ${esc(runningCode())}, installer ${esc(SHELL.version)}).`);
  } catch (e) { res.error = e.message; if (manual) toast('Update check failed: ' + esc(e.message)); }
  Store.set('ota.last', { t: Date.now(), res });
  return res;
}
function showInstallerBanner(inst, m) {
  if ($('#upd-banner')) return;
  const el = document.createElement('div'); el.id = 'upd-banner'; el.className = 'upd-banner';
  el.innerHTML = `<span><b>F1 Data Hub ${esc(inst.version)}</b> is available${inst.notes || m.notes ? ' \u2014 ' + esc(inst.notes || m.notes) : ''}</span><button class="btn btn-sm btn-primary" id="upd-go">${Platform.kind === 'desktop' ? 'Update now' : 'Download'}</button><button class="btn btn-sm" id="upd-x">Later</button>`;
  document.body.insertBefore(el, $('#main'));
  $('#upd-x').onclick = () => el.remove();
  $('#upd-go').onclick = () => installUpdate(inst, el);
}
async function installUpdate(inst, el) {
  if (Platform.kind === 'android') { Platform.openUrl(inst.url); toast('Downloading the new APK \u2014 open it from your notifications to install. Your settings are kept.', [], 12000); return; }
  if (Platform.kind !== 'desktop') { Platform.openUrl(inst.url); return; }
  const b = $('#upd-go'); b.disabled = true; b.textContent = 'Downloading\u2026';
  try {
    const r = await fetch('/selfupdate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: inst.url, sha256: inst.sha256, version: inst.version }) });
    const j = await r.json(); if (!j.ok) throw new Error(j.error || 'update failed');
    b.textContent = 'Restarting\u2026'; await fetch('/restart', { method: 'POST', body: '{}' }).catch(() => {});
  } catch (e) { b.disabled = false; b.textContent = 'Update now'; toast('Update failed: ' + esc(e.message) + '. You can download it manually.', [['Open download', () => Platform.openUrl(inst.url)]], 12000); }
}
// Check shortly after start, then every 6 hours.
setTimeout(() => otaCheck().catch(() => {}), 8000);
setInterval(() => otaCheck().catch(() => {}), 6 * 3600e3);
