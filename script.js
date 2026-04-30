// Modified to 29 balanced playable roles
// ─── DATA ──────────────────────────────────────────────────────────────────────
const ROLES = [
  { id:"werewolf", name:"หมาป่า", team:"werewolf", icon:"🐺", description:"แต่ละคืน ตื่นพร้อมฝูงเพื่อเลือกเหยื่อที่จะกำจัด", nightAction:"เลือกเหยื่อที่จะฆ่า" },
  { id:"alpha_wolf", name:"อัลฟ่าวูล์ฟ", team:"werewolf", icon:"🐺👑", description:"หมาป่าที่สามารถเปลี่ยนชาวบ้านให้กลายเป็นหมาป่าแทนการฆ่าได้หนึ่งครั้งต่อเกม", nightAction:"ฆ่าเหยื่อ หรือ เปลี่ยนชาวบ้านให้เป็นหมาป่า (1 ครั้งต่อเกม)" },
  { id:"wolf_cub", name:"ลูกหมาป่า", team:"werewolf", icon:"🐺🐾", description:"หากถูกกำจัด หมาป่าจะได้ฆ่าเพิ่มอีกหนึ่งคนในคืนถัดไป", nightAction:"เลือกเหยื่อพร้อมฝูง" },
  { id:"dream_wolf", name:"ดรีมวูล์ฟ", team:"werewolf", icon:"🐺💤", description:"ไม่ตื่นพร้อมหมาป่าจนกว่าหมาป่าตัวอื่นจะถูกกำจัด ชาวบ้านไม่รู้ตัวตน", nightAction:"ตื่นพร้อมฝูงหลังจากหมาป่าตัวอื่นตาย" },
  { id:"human_werewolf", name:"มนุษย์หมาป่า", team:"werewolf", icon:"🧑‍🐺", description:"ดูภายนอกเหมือนชาวบ้านธรรมดา — หมอดูและออราเคิลจะเห็นว่าเป็น 'ชาวบ้าน' แต่แท้จริงอยู่ทีมหมาป่า ตื่นพร้อมฝูงและร่วมเลือกเหยื่อทุกคืน", nightAction:"เลือกเหยื่อพร้อมฝูง (ดูเหมือนชาวบ้านต่อหมอดู)", seerAppears:"village" },
  { id:"villager", name:"ชาวบ้าน", team:"village", icon:"👤", description:"ชาวบ้านธรรมดา ไม่มีพลังพิเศษ ชนะโดยกำจัดหมาป่าทั้งหมด", nightAction:null },
  { id:"seer", name:"หมอดู", team:"village", icon:"🔮", description:"แต่ละคืน ล่วงรู้ว่าผู้เล่นที่เลือกเป็นหมาป่าหรือไม่", nightAction:"ตรวจสอบผู้เล่นหนึ่งคน — รู้ว่าเป็นหมาป่าหรือไม่" },
  { id:"bodyguard", name:"บอดี้การ์ด", team:"village", icon:"🛡️", description:"แต่ละคืน คุ้มครองผู้เล่นหนึ่งคนจากการถูกโจมตี ไม่สามารถปกป้องคนเดิมสองคืนติดกัน", nightAction:"เลือกผู้เล่นที่จะปกป้อง (ไม่ใช่คนเดิมจากคืนก่อน)" },
  { id:"doctor", name:"หมอ", team:"village", icon:"💉", description:"แต่ละคืน สามารถช่วยชีวิตผู้เล่นหนึ่งคน (รวมถึงตัวเอง อย่างมากหนึ่งครั้ง)", nightAction:"เลือกผู้เล่นที่จะช่วยชีวิตคืนนี้" },
  { id:"witch", name:"แม่มด", team:"village", icon:"🧙‍♀️", description:"มียาวิเศษ (ช่วยเหยื่อหมาป่า) และยาพิษ (ฆ่าใครก็ได้) ใช้ได้คนละครั้งต่อเกม", nightAction:"รู้ว่าใครถูกโจมตี ใช้ยาวิเศษหรือยาพิษได้" },
  { id:"hunter", name:"นักล่า", team:"village", icon:"🏹", description:"เมื่อถูกกำจัด (กลางวันหรือกลางคืน) ยิงผู้เล่นหนึ่งคนทันที", nightAction:null, deathAction:"ยิงผู้เล่นหนึ่งคนทันทีเมื่อตาย" },
  { id:"mayor", name:"นายกเทศมนตรี", team:"village", icon:"🎖️", description:"เปิดเผยตัวตนได้หนึ่งครั้ง โหวตนับสองคะแนน ภูมิคุ้มกันยาพิษแม่มด", nightAction:null },
  { id:"mason", name:"ช่างก่อสร้าง", team:"village", icon:"🧱", description:"ช่างก่อสร้างตื่นพร้อมกันและรู้จักกันเอง", nightAction:"ตื่นและยืนยันตัวตนกับเพื่อนช่าง" },
  { id:"pi", name:"นักสืบเอกชน", team:"village", icon:"🕵️", description:"แต่ละคืน สืบความสัมพันธ์ระหว่างผู้เล่นสองคนว่าอยู่ทีมเดียวกันหรือไม่", nightAction:"เลือกผู้เล่นสองคน — รู้ว่าอยู่ทีมเดียวกันหรือเปล่า" },
  { id:"cupid", name:"คิวปิด", team:"village", icon:"💘", description:"คืนแรก เชื่อมผู้เล่นสองคนเป็นคู่รัก หากคนหนึ่งตาย อีกคนตายตามด้วยใจสลาย", nightAction:"คืนที่ 1 เท่านั้น: เลือกสองคนให้เป็นคู่รัก" },
  { id:"lovers", name:"คู่รัก (เป้าหมายของคิวปิด)", team:"village", icon:"💕", description:"ผูกพันโดยคิวปิด เงื่อนไขชนะเปลี่ยน: คู่รักทั้งคู่ต้องรอดชีวิต", nightAction:null },
  { id:"little_girl", name:"เด็กหญิง", team:"village", icon:"👧", description:"แอบเปิดตาดูระหว่างคืนหมาป่าได้ หากถูกจับได้ หมาป่าอาจเลือกฆ่าเธอแทน", nightAction:"แอบดูระหว่างเฟสหมาป่า (เสี่ยงถูกจับ)" },
  { id:"cursed", name:"คนถูกสาป", team:"village", icon:"☠️", description:"หมอดูมองว่าเป็นชาวบ้าน หากถูกหมาป่าโจมตี กลายเป็นหมาป่าแทนการตาย", nightAction:null },
  { id:"medium", name:"ทรงเจ้า", team:"village", icon:"🕯️", description:"หนึ่งครั้งต่อเกม ปรึกษาผู้เล่นที่ตายไปแล้วเพื่อถามบทบาทหรือคำถามใช่/ไม่ใช่", nightAction:"ปรึกษาผู้ตายหนึ่งคน (1 ครั้งต่อเกม)" },
  { id:"priest", name:"นักบวช", team:"village", icon:"✝️", description:"แต่ละคืน อวยพรผู้เล่นหนึ่งคน หากถูกหมาป่าฆ่า ผู้ได้รับพรจะกลายเป็นวิญญาณหลอกหลอนหมาป่า", nightAction:"เลือกผู้เล่นที่จะอวยพร" },
  { id:"tough_guy", name:"คนเหนียว", team:"village", icon:"💪", description:"รอดจากการโจมตีของหมาป่าครั้งแรก แต่จะตายในคืนถัดไปหากไม่ได้รับการรักษา", nightAction:null },
  { id:"village_idiot", name:"คนโง่หมู่บ้าน", team:"village", icon:"🃏", description:"หากถูกโหวตออกกลางวัน จะเปิดเผยตัวตนว่าเป็นคนโง่และไม่ถูกกำจัด แต่เสียสิทธิ์โหวต", nightAction:null },
  { id:"jester", name:"ตัวตลก", team:"neutral", icon:"🎭", description:"ชนะคนเดียวหากถูกโหวตออกโดยชาวบ้านกลางวัน ไม่ชนะร่วมกับทีมอื่น", nightAction:null },
  { id:"arsonist", name:"วางเพลิง", team:"neutral", icon:"🔥", description:"แต่ละคืน ราดน้ำมันผู้เล่น สามารถจุดไฟเผาผู้ที่ถูกราดทั้งหมดในครั้งเดียว ภูมิคุ้มกันหมาป่า ชนะคนเดียว", nightAction:"ราดน้ำมันผู้เล่น หรือ จุดไฟเผาทุกคนที่ถูกราด" },
  { id:"serial_killer", name:"นักฆ่าต่อเนื่อง", team:"neutral", icon:"🔪", description:"แต่ละคืน ฆ่าผู้เล่นหนึ่งคน ภูมิคุ้มกันหมาป่า ชนะคนเดียวเมื่อเป็นคนสุดท้าย", nightAction:"ฆ่าผู้เล่นหนึ่งคน" },
  { id:"vampire", name:"แวมไพร์", team:"neutral", icon:"🧛", description:"แต่ละคืน เปลี่ยนผู้เล่นหนึ่งคนให้เป็นแวมไพร์ ชนะเมื่อเปลี่ยนทุกคนในหมู่บ้าน", nightAction:"เปลี่ยนผู้เล่นหนึ่งคนให้เป็นแวมไพร์" },
  { id:"survivor", name:"ผู้รอดชีวิต", team:"neutral", icon:"🏕️", description:"ชนะโดยรอดชีวิตถึงจบเกม ไม่ว่าทีมใดจะชนะ มีเสื้อกันกระสุนป้องกันหนึ่งครั้ง", nightAction:null },
  { id:"executioner", name:"เพชฌฆาต", team:"neutral", icon:"⚖️", description:"ชนะคนเดียวหากเป้าหมายที่กำหนดถูกโหวตออกกลางวัน เป้าหมายถูกสุ่ม", nightAction:null },
  { id:"plague_bearer", name:"ผู้แพร่โรค", team:"neutral", icon:"🦠", description:"แต่ละคืน แพร่โรคให้ผู้เล่นหนึ่งคน เมื่อทุกคนที่มีชีวิตได้รับโรค ผู้แพร่โรคชนะคนเดียว", nightAction:"แพร่โรคให้ผู้เล่นหนึ่งคน" }
];

const TEAM_COLORS = {
  werewolf: { bg:"#3d1111", accent:"#c0392b", text:"#ff6b6b", badge:"#7f1d1d" },
  village:  { bg:"#0d2618", accent:"#27ae60", text:"#5eead4", badge:"#14532d" },
  neutral:  { bg:"#1a1a2e", accent:"#8e44ad", text:"#c084fc", badge:"#3b0764" },
};

const WOLF_IDS = ["werewolf", "alpha_wolf", "wolf_cub", "dream_wolf", "human_werewolf"];
const NIGHT_ORDER = ["mason", "cupid", "seer", "pi", "bodyguard", "doctor", "witch", "little_girl", "medium", "priest", "arsonist", "serial_killer", "vampire", "plague_bearer", "alpha_wolf", "dream_wolf", "wolf_cub", "werewolf"];

// ─── STATE ─────────────────────────────────────────────────────────────────────
let state = {
  playerCount: 8,
  players: [],
  roleAssignments: {},
  phase: "night",
  round: 1,
  nightLog: {},
  eliminated: [],
  gameLog: [],
  witchUsedHeal: false,
  witchUsedPoison: false,
  alphaUsedConvert: false,
  lastBodyguard: null,
  pendingActions: {},
  roleActionResults: {},
  voteTargets: {},
  roleRefOpen: false,
  roleRefTab: "werewolf",
  roleActionStep: 0,
  piSelected: [],
};

// ─── INIT ──────────────────────────────────────────────────────────────────────
function init() {
  buildCountBtns();
  initPlayers();
  buildRoleListAll();
  renderRoleRef();
}

function buildCountBtns() {
  const counts = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,24,26,28,30,32,34,36,38,40,42,45];
  const el = document.getElementById('count-btns');
  el.innerHTML = counts.map(n =>
    `<button class="count-btn${state.playerCount===n?' active':''}" onclick="changeCount(${n})">${n}</button>`
  ).join('');
}

function changeCount(n) {
  state.playerCount = n;
  state.players = Array.from({length:n},(_,i)=>({id:i,name:`ผู้เล่น ${i+1}`,alive:true}));
  state.roleAssignments = {};
  buildCountBtns();
  renderPlayerGrid();
}

function initPlayers() {
  state.players = Array.from({length:state.playerCount},(_,i)=>({id:i,name:`ผู้เล่น ${i+1}`,alive:true}));
  renderPlayerGrid();
}

// ─── SETUP TAB ────────────────────────────────────────────────────────────────
function setSetupTab(tab, btn) {
  document.querySelectorAll('#screen-setup .tabs .tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-players').classList.toggle('hidden', tab!=='players');
  document.getElementById('tab-roles').classList.toggle('hidden', tab!=='roles');
}

function renderPlayerGrid() {
  const grid = document.getElementById('player-grid');
  grid.innerHTML = state.players.map(p => {
    const roleId = state.roleAssignments[p.id] || '';
    const role = ROLES.find(r=>r.id===roleId);
    const tc = role ? TEAM_COLORS[role.team] : null;
    const borderColor = tc ? tc.accent : '#333';
    return `<div class="player-row" id="prow-${p.id}" style="border-left-color:${borderColor}">
      <span class="player-num">${p.id+1}</span>
      <input class="input-text" value="${p.name}" oninput="updateName(${p.id},this.value)">
      <select class="input-select" onchange="updateRole(${p.id},this.value)">
        <option value="">— เลือกบทบาท —</option>
        ${['werewolf','village','neutral'].map(team=>`
          <optgroup label="${team==='werewolf'?'🐺 ทีมหมาป่า':team==='village'?'🏘️ ทีมชาวบ้าน':'⚗️ ฝ่ายกลาง'}">
            ${ROLES.filter(r=>r.team===team).map(r=>`<option value="${r.id}"${roleId===r.id?' selected':''}>${r.icon} ${r.name}</option>`).join('')}
          </optgroup>`).join('')}
      </select>
      ${role?`<span class="team-badge" style="background:${tc.badge};color:${tc.text}">${role.icon}</span>`:''}
    </div>`;
  }).join('');
  updateWolfBanner();
  updateAssignedCount();
}

function updateName(id, name) {
  state.players[id].name = name;
  updateWolfBanner();
}

function updateRole(id, roleId) {
  if (roleId) state.roleAssignments[id] = roleId;
  else delete state.roleAssignments[id];
  renderPlayerGrid();
}

function updateWolfBanner() {
  const wolfPlayers = state.players.filter(p=>WOLF_IDS.includes(state.roleAssignments[p.id]));
  const el = document.getElementById('wolf-banner');
  if (wolfPlayers.length===0) { el.classList.add('hidden'); return; }
  el.classList.remove('hidden');
  el.innerHTML = `<span style="font-size:18px">🐺</span>
    <span style="color:#ff6b6b;font-weight:700;font-size:13px">หมาป่าในเกม (${wolfPlayers.length} ตัว):</span>
    ${wolfPlayers.map(p=>{
      const r=ROLES.find(r=>r.id===state.roleAssignments[p.id]);
      return `<span class="wolf-tag">${r?.icon} ${p.name} (${r?.name})</span>`;
    }).join('')}`;
}

function updateAssignedCount() {
  document.getElementById('assigned-count').textContent = `กำหนดบทบาทแล้ว ${Object.keys(state.roleAssignments).length}/${state.playerCount} คน`;
}

function buildRoleListAll() {
  const el = document.getElementById('role-list-all');
  el.innerHTML = ['werewolf','village','neutral'].map(team=>{
    const tc = TEAM_COLORS[team];
    return `<h3 style="color:${tc.text};margin:16px 0 8px">${team==='werewolf'?'🐺 ทีมหมาป่า':team==='village'?'🏘️ ทีมชาวบ้าน':'⚗️ ฝ่ายกลาง / บุคคลที่สาม'}</h3>
    <div class="role-ref-grid">
      ${ROLES.filter(r=>r.team===team).map(r=>`
        <div class="role-card" style="border-color:${tc.accent}">
          <div class="role-card-header">
            <span style="font-size:20px">${r.icon}</span>
            <strong style="color:${tc.text};font-size:14px">${r.name}</strong>
          </div>
          <p style="color:#bbb;font-size:12px;margin:4px 0">${r.description}</p>
          ${r.nightAction?`<span class="action-tag">🌙 ${r.nightAction}</span>`:''}
        </div>`).join('')}
    </div>`;
  }).join('');
}

// ─── START GAME ───────────────────────────────────────────────────────────────
function startGame() {
  if (Object.keys(state.roleAssignments).length !== state.playerCount) {
    alert('กรุณากำหนดบทบาทให้ผู้เล่นทุกคนก่อนเริ่มเกม!');
    return;
  }
  state.phase = 'night';
  state.round = 1;
  state.eliminated = [];
  state.gameLog = [`🌕 เกมเริ่มต้นด้วยผู้เล่น ${state.playerCount} คน คืนที่ 1 เริ่มแล้ว`];
  state.nightLog = {};
  state.roleActionResults = {};
  state.pendingActions = {};
  state.witchUsedHeal = false;
  state.witchUsedPoison = false;
  state.alphaUsedConvert = false;
  state.lastBodyguard = null;
  state.voteTargets = {};
  state.roleActionStep = 0;
  state.piSelected = [];

  document.getElementById('screen-setup').classList.add('hidden');
  document.getElementById('screen-game').classList.remove('hidden');
  renderGame();
}

function goSetup() {
  document.getElementById('screen-game').classList.add('hidden');
  document.getElementById('screen-setup').classList.remove('hidden');
  document.getElementById('win-overlay').classList.add('hidden');
  buildCountBtns();
  renderPlayerGrid();
}

// ─── GAME RENDER ──────────────────────────────────────────────────────────────
function renderGame() {
  renderHeader();
  renderPlayerBoard();
  renderPhase();
  renderLog();
  checkWin();
}

function renderHeader() {
  const isNight = ['night','werewolf','roleActions'].includes(state.phase);
  document.getElementById('game-phase-icon').textContent = isNight ? '🌕' : '☀️';
  const alive = state.players.filter(p=>p.alive).length;
  const period = isNight ? `คืนที่ ${state.round}` : `วันที่ ${state.round}`;
  document.getElementById('game-sub').textContent = `${period} • เหลือ ${alive} คน`;
}

function renderPlayerBoard() {
  const board = document.getElementById('player-board');
  board.innerHTML = state.players.map(p => {
    const role = ROLES.find(r=>r.id===state.roleAssignments[p.id]);
    const tc = role ? TEAM_COLORS[role.team] : null;
    const elim = state.eliminated.find(e=>e.id===p.id);
    const borderColor = tc && p.alive ? tc.accent : '#333';
    return `<div class="player-card${p.alive?'':' dead'}" style="border-left-color:${borderColor}">
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-size:18px">${p.alive?(role?.icon||'👤'):'💀'}</span>
        <div>
          <div class="player-card-name" style="color:${p.alive?'#f0f0f0':'#666'}">${p.name}</div>
          ${role?`<div class="player-card-role" style="color:${tc?tc.text:'#aaa'}">${role.name}</div>`:''}
          ${elim?`<div class="player-card-elim">ออก${elim.cause==='night'?'กลางคืน':'โหวต'} R${elim.round}</div>`:''}
        </div>
      </div>
    </div>`;
  }).join('');
}

function renderLog() {
  const box = document.getElementById('game-log');
  box.innerHTML = [...state.gameLog].reverse().map(e=>
    `<div class="log-entry">${e}</div>`
  ).join('');
}

function renderPhase() {
  const el = document.getElementById('phase-panel');
  if (state.phase==='night') el.innerHTML = renderNightIntro();
  else if (state.phase==='werewolf') el.innerHTML = renderWerewolfPhase();
  else if (state.phase==='roleActions') el.innerHTML = renderRoleActions();
  else if (state.phase==='day') el.innerHTML = renderDayPanel();
  else if (state.phase==='vote') el.innerHTML = renderVotePanel();
}

// ─── NIGHT INTRO ──────────────────────────────────────────────────────────────
function renderNightIntro() {
  return `<div class="phase-card">
    <div class="phase-icon">🌙</div>
    <h2 class="phase-title">กลางคืนมาถึง</h2>
    <p class="phase-desc">ผู้เล่นทุกคนหลับตา เริ่มช่วงกลางคืน ดำเนินการตามบทบาทของแต่ละคนตามลำดับ</p>
    <div class="btn-row" style="justify-content:center">
      <button class="btn btn-primary" onclick="setPhase('werewolf')">🐺 เฟสหมาป่า →</button>
    </div>
  </div>`;
}

// ─── WEREWOLF PHASE ───────────────────────────────────────────────────────────
function renderWerewolfPhase() {
  const alive = state.players.filter(p=>p.alive);
  const wolves = state.players.filter(p=>WOLF_IDS.includes(state.roleAssignments[p.id])&&p.alive);
  const wolfKill = state.pendingActions['werewolf']?.primary;
  const alphaConvert = state.pendingActions['alpha_wolf']?.convert;
  const nonWolves = alive.filter(p=>!WOLF_IDS.includes(state.roleAssignments[p.id]));
  const hasAlpha = wolves.some(w=>state.roleAssignments[w.id]==='alpha_wolf');

  return `<div class="phase-card">
    <div class="phase-icon">🐺</div>
    <h2 class="phase-title">เฟสหมาป่า</h2>
    <div class="info-box"><strong>หมาป่าที่ยังมีชีวิต:</strong> ${wolves.map(w=>{const r=ROLES.find(r=>r.id===state.roleAssignments[w.id]);return `${r?.icon||''} ${w.name}`;}).join(', ')||'ไม่มี'}</div>
    <p class="label">☠️ เลือกเหยื่อคืนนี้:</p>
    <div class="target-grid">
      ${nonWolves.map(p=>`<button class="target-btn${wolfKill===p.id?' selected':''}" onclick="setWolfKill(${p.id})">${p.name}</button>`).join('')}
    </div>
    ${hasAlpha&&!state.alphaUsedConvert?`
    <div style="margin-top:16px">
      <p class="label">👑 อัลฟ่าวูล์ฟ: เปลี่ยนแทนการฆ่า (1 ครั้งต่อเกม):</p>
      <div class="target-grid">
        ${nonWolves.map(p=>`<button class="target-btn${alphaConvert===p.id?' wolf-selected':''}" onclick="setAlphaConvert(${p.id})">${p.name}</button>`).join('')}
      </div>
    </div>`:''}
    <div class="btn-row" style="justify-content:center">
      <button class="btn btn-secondary" onclick="setPhase('night')">← ย้อนกลับ</button>
      <button class="btn btn-primary" onclick="setPhase('roleActions')">ถัดไป: การกระทำของบทบาท →</button>
    </div>
  </div>`;
}

function setWolfKill(id) {
  if (!state.pendingActions['werewolf']) state.pendingActions['werewolf']={};
  state.pendingActions['werewolf'].primary = id;
  renderPhase();
}
function setAlphaConvert(id) {
  if (!state.pendingActions['alpha_wolf']) state.pendingActions['alpha_wolf']={};
  state.pendingActions['alpha_wolf'].convert = id;
  state.alphaUsedConvert = true;
  renderPhase();
}

// ─── ROLE ACTIONS ─────────────────────────────────────────────────────────────
function getRolesWithNightActions() {
  const aliveRoleIds = new Set(state.players.filter(p=>p.alive).map(p=>state.roleAssignments[p.id]));
  return ROLES.filter(r=>r.nightAction&&aliveRoleIds.has(r.id))
    .filter(r=>!['werewolf','alpha_wolf','cursed_wolf_father'].includes(r.id))
    .sort((a,b)=>NIGHT_ORDER.indexOf(a.id)-NIGHT_ORDER.indexOf(b.id));
}

function renderRoleActions() {
  const roles = getRolesWithNightActions();
  if (roles.length===0) {
    return `<div class="phase-card">
      <h2 class="phase-title">ไม่มีการกระทำของบทบาท</h2>
      <p class="phase-desc">ไม่มีบทบาทที่ใช้งานพลังกลางคืนในรอบนี้</p>
      <button class="btn btn-primary" onclick="resolveNight()">☀️ สิ้นสุดกลางคืน</button>
    </div>`;
  }
  const step = state.roleActionStep;
  const current = roles[step];
  const tc = TEAM_COLORS[current.team]||TEAM_COLORS.village;
  return `<div class="phase-card">
    <div class="role-action-header" style="background:${tc.bg};border-color:${tc.accent}">
      <span style="font-size:32px">${current.icon}</span>
      <div>
        <div style="color:${tc.text};font-weight:800;font-size:18px">${current.name}</div>
        <div style="color:#aaa;font-size:13px">${step+1} จาก ${roles.length}</div>
      </div>
    </div>
    <p class="label" style="margin-top:12px">${current.nightAction}</p>
    ${renderRoleActionControls(current)}
    <div class="btn-row" style="justify-content:center">
      ${step>0?`<button class="btn btn-secondary" onclick="prevRoleStep()">← ก่อนหน้า</button>`:''}
      <button class="btn btn-primary" onclick="nextRoleStep()">
        ${step<roles.length-1?'บทบาทถัดไป →':'☀️ สิ้นสุดกลางคืน'}
      </button>
    </div>
  </div>`;
}

function renderRoleActionControls(role) {
  const alive = state.players.filter(p=>p.alive);
  const act = state.pendingActions[role.id]||{};
  const wolfTarget = state.pendingActions['werewolf']?.primary;
  const wolfVictim = wolfTarget!==undefined?state.players[wolfTarget]?.name:'ไม่ทราบ';
  const result = state.roleActionResults[role.id];
  const WOLF_ROLE_IDS = WOLF_IDS;

  if (['seer','oracle','aura_seer','apprentice_seer'].includes(role.id)) {
    return `<div>
      <p class="hint">เลือกผู้เล่นที่จะตรวจสอบ:</p>
      <div class="target-grid">
        ${alive.map(p=>{
          const tr = ROLES.find(r=>r.id===state.roleAssignments[p.id]);
          return `<button class="target-btn${act.primary===p.id?' selected':''}" onclick="seerCheck(${p.id},'${role.id}')">${p.name}</button>`;
        }).join('')}
      </div>
      ${act.primary!==undefined&&result?`
      <div class="reveal-box">
        <p style="color:#aaa;margin-bottom:8px;font-size:13px">ผลสำหรับ ${role.name} — ${state.players[act.primary]?.name}:</p>
        <div class="result-tag${result.includes('หมาป่า')?' result-wolf':''}" style="${result.includes('หมาป่า')?'background:#7f1d1d;border-color:#c0392b;color:#fca5a5':'background:#1e3a5f;border-color:#4a90d9;color:#e0f0ff'};font-size:15px">${result}</div>
        ${(()=>{
          const tr=ROLES.find(r=>r.id===state.roleAssignments[act.primary]);
          const isHW=tr?.seerAppears==='village';
          const isWolf=WOLF_ROLE_IDS.includes(tr?.id);
          if(isHW&&['seer','apprentice_seer','oracle'].includes(role.id))
            return `<div class="mod-note">🎭 <strong>[ผู้ดำเนินเกมเท่านั้น]</strong> บทบาทจริงคือ ${tr?.icon} ${tr?.name} — ซ่อนตัวเป็นชาวบ้าน</div>`;
          if(isWolf&&!isHW&&['seer','apprentice_seer'].includes(role.id))
            return `<div class="mod-note mod-note-wolf">⚠️ <strong>บอกผู้เล่น:</strong> "🐺 หมาป่า"</div>`;
          return '';
        })()}
      </div>`:''}
    </div>`;
  }

  if (role.id==='witch') {
    return `<div>
      <div class="info-box">เหยื่อหมาป่าคืนนี้: <strong style="color:#ff6b6b">${wolfVictim}</strong></div>
      ${!state.witchUsedHeal?`<div>
        <p class="hint">💊 ยาวิเศษ — ช่วยเหยื่อหมาป่าไหม?</p>
        <div class="btn-row" style="justify-content:center">
          <button class="btn btn-secondary" style="color:#5eead4" onclick="witchHeal(${wolfTarget})">✅ ช่วย ${wolfVictim}</button>
          <button class="btn btn-secondary" onclick="witchHeal(null)">❌ ไม่ช่วย</button>
        </div>
      </div>`:'<p style="color:#555;font-size:12px">ใช้ยาวิเศษไปแล้ว</p>'}
      ${!state.witchUsedPoison?`<div style="margin-top:12px">
        <p class="hint">☠️ ยาพิษ — จะวางยาใคร?</p>
        <div class="target-grid">
          ${alive.map(p=>`<button class="target-btn${act.poison===p.id?' wolf-selected':''}" onclick="witchPoison(${p.id})">${p.name}</button>`).join('')}
        </div>
      </div>`:'<p style="color:#555;font-size:12px">ใช้ยาพิษไปแล้ว</p>'}
    </div>`;
  }

  if (role.id==='bodyguard') {
    return `<div>
      <p class="hint">เลือกผู้เล่นที่จะปกป้อง${state.lastBodyguard!==null?' (ไม่สามารถปกป้องคนเดิม)':''}:</p>
      <div class="target-grid">
        ${alive.filter(p=>p.id!==state.lastBodyguard).map(p=>
          `<button class="target-btn${act.primary===p.id?' selected':''}" onclick="recordAction('bodyguard','primary',${p.id})">${p.name}</button>`
        ).join('')}
      </div>
    </div>`;
  }

  if (role.id==='pi') {
    const sel = state.piSelected||[];
    return `<div>
      <p class="hint">เลือกผู้เล่นสองคนเพื่อเปรียบเทียบทีม (เลือกแล้ว ${sel.length}/2):</p>
      <div class="target-grid">
        ${alive.map(p=>`<button class="target-btn${sel.includes(p.id)?' selected':''}" onclick="piSelect(${p.id})">${p.name}</button>`).join('')}
      </div>
      ${sel.length===2?`<div class="reveal-box">
        <p style="color:#aaa;margin-bottom:8px">${state.players[sel[0]]?.name} กับ ${state.players[sel[1]]?.name} อยู่ทีมเดียวกันไหม?</p>
        <div class="btn-row" style="justify-content:center">
          <button class="btn btn-secondary" onclick="setResult('pi','✅ ทีมเดียวกัน')">✅ ทีมเดียวกัน</button>
          <button class="btn btn-secondary" onclick="setResult('pi','❌ ต่างทีมกัน')">❌ ต่างทีมกัน</button>
        </div>
        ${result?`<div class="result-tag">${result}</div>`:''}
      </div>`:''}
    </div>`;
  }

  if (role.id==='arsonist') {
    const doused = act.doused||[];
    return `<div>
      <p class="hint">🪣 ราดน้ำมันผู้เล่น หรือ 🔥 จุดไฟเผาทุกคนที่ถูกราด:</p>
      <div class="target-grid">
        ${alive.map(p=>`<button class="target-btn${doused.includes(p.id)?' wolf-selected':''}" onclick="arsonistDouse(${p.id})">${p.name} ${doused.includes(p.id)?'🔥':''}</button>`).join('')}
      </div>
      <button class="btn btn-fire" style="margin-top:12px" onclick="arsonistIgnite()">🔥 จุดไฟ — เผาผู้เล่น ${doused.length} คนที่ถูกราด</button>
    </div>`;
  }

  return `<div>
    <p class="hint">เลือกเป้าหมาย:</p>
    <div class="target-grid">
      ${alive.map(p=>`<button class="target-btn${act.primary===p.id?' selected':''}" onclick="recordAction('${role.id}','primary',${p.id})">${p.name}</button>`).join('')}
    </div>
  </div>`;
}

function seerCheck(playerId, roleId) {
  const tr = ROLES.find(r=>r.id===state.roleAssignments[playerId]);
  const isWolf = tr ? WOLF_IDS.includes(tr.id) : false;
  const appearsVillage = tr?.seerAppears==='village';
  if (!state.pendingActions[roleId]) state.pendingActions[roleId]={};
  state.pendingActions[roleId].primary = playerId;
  let result;
  if (roleId==='seer'||roleId==='apprentice_seer') {
    result = (isWolf&&!appearsVillage)?'🐺 หมาป่า':'✅ ไม่ใช่หมาป่า';
  } else if (roleId==='oracle') {
    if (appearsVillage) result='👤 ชาวบ้าน';
    else result = tr?`${tr.icon} ${tr.name}`:'ไม่ทราบ';
  } else if (roleId==='aura_seer') {
    result = tr?.nightAction?'✨ มีพลังกลางคืน':'❌ ไม่มีพลังกลางคืน';
  }
  state.roleActionResults[roleId] = result;
  renderPhase();
}

function recordAction(roleId, type, id) {
  if (!state.pendingActions[roleId]) state.pendingActions[roleId]={};
  state.pendingActions[roleId][type] = id;
  renderPhase();
}

function setResult(roleId, result) {
  state.roleActionResults[roleId] = result;
  renderPhase();
}

function witchHeal(targetId) {
  if (!state.pendingActions['witch']) state.pendingActions['witch']={};
  state.pendingActions['witch'].heal = targetId;
  renderPhase();
}

function witchPoison(id) {
  if (!state.pendingActions['witch']) state.pendingActions['witch']={};
  state.pendingActions['witch'].poison = id;
  renderPhase();
}

function piSelect(id) {
  const sel = state.piSelected||[];
  if (sel.includes(id)) { state.piSelected=sel.filter(x=>x!==id); }
  else if (sel.length<2) { state.piSelected=[...sel,id]; }
  renderPhase();
}

function arsonistDouse(id) {
  if (!state.pendingActions['arsonist']) state.pendingActions['arsonist']={};
  const doused = state.pendingActions['arsonist'].doused||[];
  state.pendingActions['arsonist'].doused = doused.includes(id)?doused.filter(x=>x!==id):[...doused,id];
  renderPhase();
}

function arsonistIgnite() {
  if (!state.pendingActions['arsonist']) state.pendingActions['arsonist']={};
  state.pendingActions['arsonist'].ignite = true;
  renderPhase();
}

function prevRoleStep() {
  if (state.roleActionStep>0) { state.roleActionStep--; state.piSelected=[]; renderPhase(); }
}

function nextRoleStep() {
  const roles = getRolesWithNightActions();
  if (state.roleActionStep<roles.length-1) {
    state.roleActionStep++;
    state.piSelected=[];
    renderPhase();
  } else {
    resolveNight();
  }
}

// ─── RESOLVE NIGHT ────────────────────────────────────────────────────────────
function resolveNight() {
  const wolfKill = state.pendingActions['werewolf']?.primary ?? state.pendingActions['alpha_wolf']?.primary ?? state.pendingActions['cursed_wolf_father']?.primary;
  const doctorSave = state.pendingActions['doctor']?.primary;
  const bodyguardSave = state.pendingActions['bodyguard']?.primary;
  const witchHeal = state.pendingActions['witch']?.heal;
  const witchPoison = state.pendingActions['witch']?.poison;
  const skKill = state.pendingActions['serial_killer']?.primary;

  let deaths=[], saved=[], log=[];

  if (wolfKill!==undefined) {
    const target = state.players[wolfKill];
    if (doctorSave===wolfKill||bodyguardSave===wolfKill||witchHeal===wolfKill) {
      saved.push(wolfKill);
      log.push(`🛡️ ${target?.name} ถูกหมาป่าโจมตีแต่รอดชีวิต!`);
    } else {
      deaths.push(wolfKill);
      log.push(`🐺 ${target?.name} ถูกหมาป่าฆ่าตาย`);
    }
  }

  if (witchPoison!==undefined&&!state.witchUsedPoison) {
    deaths.push(witchPoison);
    log.push(`🧪 ${state.players[witchPoison]?.name} ถูกแม่มดวางยาพิษ`);
    state.witchUsedPoison=true;
  }

  if (skKill!==undefined&&!deaths.includes(skKill)&&!saved.includes(skKill)) {
    deaths.push(skKill);
    log.push(`🔪 ${state.players[skKill]?.name} ถูกนักฆ่าต่อเนื่องสังหาร`);
  }

  if (state.pendingActions['arsonist']?.ignite) {
    (state.pendingActions['arsonist']?.doused||[]).forEach(id=>{
      if (!deaths.includes(id)) { deaths.push(id); log.push(`🔥 ${state.players[id]?.name} ถูกเผาในกองไฟ!`); }
    });
  }

  const uniqueDeaths=[...new Set(deaths)];
  uniqueDeaths.forEach(id=>{ state.players[id].alive=false; });
  uniqueDeaths.forEach(id=>state.eliminated.push({id,round:state.round,cause:'night'}));
  if (bodyguardSave!==undefined) state.lastBodyguard=bodyguardSave;

  state.gameLog.push(`── คืนที่ ${state.round} สิ้นสุด ──`,...log);
  if (uniqueDeaths.length===0&&saved.length===0) state.gameLog.push('🌙 คืนสงบ... ไม่มีใครตาย');

  state.nightLog = {deaths:uniqueDeaths, saved};
  state.roleActionResults={};
  state.pendingActions={};
  state.roleActionStep=0;
  state.piSelected=[];
  state.phase='day';
  renderGame();
}

// ─── DAY PANEL ────────────────────────────────────────────────────────────────
function renderDayPanel() {
  const {deaths=[],saved=[]} = state.nightLog||{};
  return `<div class="phase-card">
    <div class="phase-icon">☀️</div>
    <h2 class="phase-title">วันที่ ${state.round} — รุ่งเช้า</h2>
    <div class="night-report">
      <h3 style="color:#fcd34d;margin-bottom:12px">🌅 รายงานคืนที่ผ่านมา</h3>
      ${deaths.length===0&&saved.length===0?'<p style="color:#aaa">🌙 คืนสงบ ไม่มีใครตาย</p>':''}
      ${deaths.map(id=>`<div class="death-row">💀 <strong style="color:#ff6b6b">${state.players[id]?.name}</strong> ถูกกำจัดในคืนนี้</div>`).join('')}
      ${saved.map(id=>`<div class="save-row">🛡️ <strong style="color:#5eead4">${state.players[id]?.name}</strong> รอดชีวิต!</div>`).join('')}
    </div>
    <p class="phase-desc">ผู้เล่นพูดคุยและถกเถียง เมื่อพร้อมแล้วดำเนินการโหวต</p>
    <button class="btn btn-primary" onclick="setPhase('vote')">⚖️ เริ่มโหวต →</button>
  </div>`;
}

// ─── VOTE PANEL ───────────────────────────────────────────────────────────────
function renderVotePanel() {
  const alive = state.players.filter(p=>p.alive);
  const {tally, leaders} = tallyVotes();
  const maxVotes = Math.max(...Object.values(tally),0)||1;

  return `<div class="phase-card">
    <div class="phase-icon">⚖️</div>
    <h2 class="phase-title">โหวตกลางวัน</h2>
    <div class="vote-grid">
      ${alive.map(voter=>`
        <div class="vote-row">
          <span class="voter-name">${voter.name}</span>
          <span style="color:#888;font-size:12px;margin:0 6px">→</span>
          <select class="input-select" onchange="castVote(${voter.id},this.value)" style="flex:1">
            <option value="">ไม่โหวต</option>
            ${alive.filter(p=>p.id!==voter.id).map(p=>`<option value="${p.id}"${state.voteTargets[voter.id]==p.id?' selected':''}>${p.name}</option>`).join('')}
          </select>
        </div>`).join('')}
    </div>
    <div class="tally-box">
      <h3 style="color:#fcd34d;margin-bottom:8px">📊 สรุปคะแนนโหวต</h3>
      ${Object.entries(tally).sort(([,a],[,b])=>b-a).map(([id,count])=>`
        <div class="tally-row">
          <span>${state.players[parseInt(id)]?.name}</span>
          <div class="tally-bar"><div class="tally-fill" style="width:${(count/alive.length)*100}%"></div></div>
          <span style="color:#fcd34d">${count}</span>
        </div>`).join('')}
    </div>
    ${leaders.length>0?`
    <div>
      <p style="color:#ff6b6b;font-weight:700;margin-bottom:8px">
        ${leaders.length===1?`☠️ ${state.players[leaders[0]]?.name} จะถูกกำจัด`:`⚠️ คะแนนเท่ากัน: ${leaders.map(id=>state.players[id]?.name).join(', ')}`}
      </p>
      ${leaders.map(id=>`<button class="btn btn-danger" style="margin-right:8px;margin-bottom:8px" onclick="eliminateByVote(${id})">☠️ กำจัด ${state.players[id]?.name}</button>`).join('')}
    </div>`:''}
    <div class="btn-row" style="justify-content:center">
      <button class="btn btn-secondary" onclick="setPhase('day')">← กลับไปถกเถียง</button>
      <button class="btn btn-green" onclick="skipVote()">⏭️ ข้ามการโหวต (ไม่มีใครออก)</button>
    </div>
  </div>`;
}

function castVote(voterId, val) {
  state.voteTargets[voterId] = val===''?null:parseInt(val);
  renderPhase();
}

function tallyVotes() {
  const tally={};
  Object.values(state.voteTargets).forEach(id=>{if(id!==null&&id!==undefined&&id!=='')tally[id]=(tally[id]||0)+1;});
  const maxVotes=Math.max(...Object.values(tally),0);
  const leaders=Object.entries(tally).filter(([,v])=>v===maxVotes).map(([k])=>parseInt(k));
  return {tally,leaders};
}

function eliminateByVote(id) {
  state.players[id].alive=false;
  state.eliminated.push({id,round:state.round,cause:'vote'});
  state.gameLog.push(`⚖️ ${state.players[id]?.name} ถูกโหวตออกในวันที่ ${state.round}`);
  state.voteTargets={};
  state.round++;
  state.phase='night';
  renderGame();
}

function skipVote() {
  state.voteTargets={};
  state.round++;
  state.phase='night';
  renderGame();
}

// ─── WIN CHECK ────────────────────────────────────────────────────────────────
function checkWin() {
  const alive = state.players.filter(p=>p.alive);
  const wolves = alive.filter(p=>WOLF_IDS.includes(state.roleAssignments[p.id]));
  const others = alive.filter(p=>!WOLF_IDS.includes(state.roleAssignments[p.id]));
  let winner=null;
  if (wolves.length===0) winner='village';
  else if (wolves.length>=others.length) winner='werewolf';
  if (winner) showWin(winner);
  else document.getElementById('win-overlay').classList.add('hidden');
}

function showWin(winner) {
  const ov=document.getElementById('win-overlay');
  document.getElementById('win-icon').textContent=winner==='werewolf'?'🐺':'🏘️';
  document.getElementById('win-title').textContent=winner==='werewolf'?'หมาป่าชนะ!':'ชาวบ้านชนะ!';
  document.getElementById('win-title').style.color=winner==='werewolf'?'#ff6b6b':'#5eead4';
  document.getElementById('win-desc').textContent=winner==='werewolf'?'หมาป่ากลืนกินหมู่บ้านทั้งหมดแล้ว':'หมาป่าทุกตัวถูกกำจัดแล้ว!';
  ov.classList.remove('hidden');
}

// ─── PHASE SWITCH ─────────────────────────────────────────────────────────────
function setPhase(phase) {
  state.phase=phase;
  if (phase==='roleActions') { state.roleActionStep=0; state.piSelected=[]; }
  renderGame();
}

// ─── ROLE REFERENCE ───────────────────────────────────────────────────────────
function toggleRoleRef() {
  state.roleRefOpen=!state.roleRefOpen;
  document.getElementById('role-ref-overlay').classList.toggle('hidden',!state.roleRefOpen);
}

function setRoleRefTab(tab, btn) {
  state.roleRefTab=tab;
  document.querySelectorAll('#role-ref-tabs .tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderRoleRef();
}

function renderRoleRef() {
  const tc=TEAM_COLORS[state.roleRefTab];
  document.getElementById('role-ref-grid').innerHTML=ROLES.filter(r=>r.team===state.roleRefTab).map(role=>`
    <div class="role-card" style="border-color:${tc.accent}">
      <div class="role-card-header">
        <span style="font-size:24px">${role.icon}</span>
        <strong style="color:${tc.text}">${role.name}</strong>
        <span class="team-badge" style="background:${tc.badge};color:${tc.text};font-size:10px">
          ${state.roleRefTab==='werewolf'?'หมาป่า':state.roleRefTab==='village'?'ชาวบ้าน':'กลาง'}
        </span>
      </div>
      <p style="color:#bbb;font-size:13px;margin:6px 0">${role.description}</p>
      ${role.nightAction?`<span class="action-tag">🌙 ${role.nightAction}</span>`:''}
      ${role.deathAction?`<span class="action-tag action-tag-death">💀 ${role.deathAction}</span>`:''}
    </div>`).join('');
}

// CLOSE OVERLAY ON CLICK OUTSIDE
document.getElementById('role-ref-overlay').addEventListener('click', function(e){
  if (e.target===this) toggleRoleRef();
});

// BOOT
init();