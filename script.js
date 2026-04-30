
const ROLES = [
  { id:"werewolf", name:"มนุษย์หมาป่า", team:"werewolf", icon:"🐺", description:"แต่ละคืน ตื่นพร้อมฝูงเพื่อเลือกเหยื่อที่จะกำจัด" },
  { id:"alpha_wolf", name:"จ่าฝูงมนุษย์หมาป่า", team:"werewolf", icon:"🐺👑", description:"หมาป่าที่สามารถเปลี่ยนชาวบ้านให้เป็นหมาป่าได้ (1 ครั้ง)" },
  { id:"wolf_cub", name:"ลูกหมาป่า", team:"werewolf", icon:"🐺🐾", description:"หากตาย หมาป่าจะได้ฆ่าเพิ่มอีกหนึ่งคนในคืนถัดไป" },
  { id:"cursed_wolf_father", name:"บิดาแห่งหมาป่าคลั่ง", team:"werewolf", icon:"🐺💀", description:"สามารถสาปเหยื่อแทนการฆ่า ทำให้กลายเป็นหมาป่า (1 ครั้ง)" },
  { id:"dream_wolf", name:"หมาป่าหลับไหล", team:"werewolf", icon:"🐺💤", description:"ไม่ตื่นพร้อมหมาป่าจนกว่าหมาป่าตัวอื่นจะตาย" },
  { id:"mystic_wolf", name:"หมาป่าพยากรณ์", team:"werewolf", icon:"🐺🔮", description:"ตรวจสอบบทบาทเจาะจงของผู้เล่นได้" },
  { id:"wolf_scholar", name:"หมาป่านักวิชาการ", team:"werewolf", icon:"🐺📖", description:"คาดเดาบทบาทผู้เล่น ถ้าทายถูกจะกำจัดได้" },
  { id:"dire_wolf", name:"หมาป่าโลกันตร์", team:"werewolf", icon:"🐺🔥", description:"เลือกเนื้อคู่ในคืนแรก ถ้าเนื้อคู่ตายจะตายตาม" },
  
  { id:"villager", name:"ชาวบ้าน", team:"village", icon:"👨", description:"คนในหมู่บ้านที่ไม่มีพลังพิเศษ" },
  { id:"seer", name:"ผู้พยากรณ์", team:"village", icon:"🔮", description:"ตรวจสอบได้ว่าใครเป็นหมาป่าคืนละหนึ่งคน" },
  { id:"witch", name:"แม่มด", team:"village", icon:"🧪", description:"มียาชุบชีวิตและยาพิษอย่างละ 1 ขวด" },
  { id:"hunter", name:"นักล่า", icon:"🔫", team:"village", description:"เมื่อตาย สามารถยิงผู้เล่นได้หนึ่งคน" },
  { id:"bodyguard", name:"บอดี้การ์ด", team:"village", icon:"🛡️", description:"คุ้มกันผู้เล่นคืนละคน (ห้ามป้องกันคนเดิมซ้ำติดกัน)" },
  { id:"cupid", name:"คิวปิด", team:"village", icon:"🏹", description:"เลือกคู่รัก 2 คนในคืนแรก หากคนหนึ่งตาย อีกคนจะตายตาม" },
  { id:"apprentice_seer", name:"ผู้พยากรณ์ฝึกหัด", team:"village", icon:"🔮📖", description:"รับบทผู้พยากรณ์ต่อเมื่อตัวจริงตาย" },
  { id:"mayor", name:"นายกเทศมนตรี", team:"village", icon:"🗳️", description:"เสียงโหวตมีค่าเป็น 2 เท่า" },
  { id:"prince", name:"เจ้าชาย", team:"village", icon:"👑", description:"หากถูกโหวตออก จะไม่ตายในครั้งแรก" },
  { id:"servant", name:"คนรับใช้", team:"village", icon:"🤝", description:"รับบทของผู้เล่นที่ตายคนแรก" },
  { id:"wild_child", name:"เด็กป่า", team:"village", icon:"🌲", description:"ถ้าไอดอลตายจะกลายเป็นหมาป่า" },
  { id:"aura_seer", name:"ผู้พยากรณ์ออร่า", team:"village", icon:"✨", description:"ตรวจดูว่าใครมีพลังพิเศษ" },
  { id:"detective", name:"นักสืบ", team:"village", icon:"🕵️", description:"ตรวจสอบว่าผู้เล่นสองคนอยู่ฝ่ายเดียวกันไหม" },
  { id:"gunner", name:"มือปืน", team:"village", icon:"🔫⚙️", description:"มีกระสุน 2 นัดยิงตอนกลางวัน" },
  { id:"little_girl", name:"เด็กหญิงตัวน้อย", team:"village", icon:"👧", description:"แอบดูหมาป่าตอนกลางคืนได้" },
  { id:"oracle", name:"ผู้หยั่งรู้", team:"village", icon:"👁️", description:"รู้บทบาทของคนที่ตายไปแล้ว" },
  { id:"librarian", name:"บรรณารักษ์", team:"village", icon:"📚", description:"รู้ข้อมูลบทบาทในเกม" },
  { id:"follower", name:"ผู้ติดตาม", team:"village", icon:"👣", description:"รู้ว่าใครตื่นมาทำแอคชั่นบ้าง" },

  { id:"tanner", name:"คนฟอกหนัง", team:"neutral", icon:"🎭", description:"ชนะถ้าถูกโหวตแขวนคอ" },
  { id:"serial_killer", name:"ฆาตกรต่อเนื่อง", team:"neutral", icon:"🔪", description:"กำจัดทุกคนให้หมดเพื่อชนะคนเดียว" },
  { id:"cult_leader", name:"เจ้าลัทธิ", team:"neutral", icon:"⛪", description:"ล้างสมองคนเข้าลัทธิ ถ้าทุกคนเป็นสาวกจะชนะ" },
  { id:"arsonist", name:"วางเพลิง", team:"neutral", icon:"🔥", description:"ราดน้ำมันและเผาบ้านผู้เล่นเพื่อชนะ" },
  { id:"fool", name:"คนโง่", team:"neutral", icon:"🤡", description:"พยายามทำให้คนโหวตตัวเองออก" },
  { id:"secret_keeper", name:"ผู้รักษาความลับ", team:"neutral", icon:"🤫", description:"มีเงื่อนไขการชนะเฉพาะตัว" }
];

const TEAM_COLORS = {
  werewolf: { accent: "#c0392b", text: "#ff6b6b", badge: "#7f1d1d" },
  village: { accent: "#27ae60", text: "#5eead4", badge: "#14532d" },
  neutral: { accent: "#8e44ad", text: "#c084fc", badge: "#3b0764" }
};

let state = {
  players: [],
  round: 1,
  phase: 'setup',
  lovers: [],
  cupidUsed: false,
  log: [],
  roleRefOpen: false,
  roleRefTab: 'werewolf'
};

function addPlayer() {
  const input = document.getElementById('player-input');
  const name = input.value.trim();
  if (name) {
    state.players.push({ id: Date.now() + Math.random(), name, role: null, alive: true, isLover: false });
    input.value = '';
    renderSetup();
  }
}

function renderSetup() {
  document.getElementById('player-list').innerHTML = state.players.map(p => `
    <div class="player-tag">
      <span>${p.name}</span>
      <span style="cursor:pointer;color:red" onclick="removePlayer(${p.id})">✕</span>
    </div>
  `).join('');
}

function removePlayer(id) {
  state.players = state.players.filter(p => p.id !== id);
  renderSetup();
}

function startGame() {
  if (state.players.length < 5) {
    alert("ต้องมีผู้เล่นอย่างน้อย 5 คน");
    return;
  }
  
  // Assign Roles (Basic logic)
  let rolesPool = ['werewolf', 'cupid', 'seer', 'witch', 'hunter', 'bodyguard'];
  while(rolesPool.length < state.players.length) rolesPool.push('villager');
  rolesPool = rolesPool.sort(() => Math.random() - 0.5);
  
  state.players.forEach((p, i) => {
    p.role = ROLES.find(r => r.id === rolesPool[i]);
  });
  
  document.getElementById('screen-setup').classList.add('hidden');
  document.getElementById('screen-game').classList.remove('hidden');
  addLog("🎬 เริ่มเกม: สุ่มบทบาทภาษาไทยเรียบร้อยแล้ว");
  renderPhase();
}

function renderPhase() {
  const panel = document.getElementById('phase-panel');
  panel.innerHTML = `<div class="card"><h2>🌙 คืนที่ ${state.round}</h2><div id="action-area"></div></div>`;
  
  const area = document.getElementById('action-area');
  
  // Cupid Logic: เฉพาะคืนแรก
  if (state.round === 1 && !state.cupidUsed) {
    area.innerHTML = `<h3>🏹 คิวปิด: เลือกคู่รัก 2 คน (คืนแรกคืนเดียว)</h3><div id="cupid-select"></div>`;
    renderCupidSelect();
  } else {
    area.innerHTML = `<h3>⚔️ สรุปเหตุการณ์คืนนี้</h3>
    <select id="kill-target" class="btn" style="width:100%;margin-bottom:10px;background:#222;color:white">
      <option value="">-- ใครคือเหยื่อคืนนี้? --</option>
      ${state.players.filter(p=>p.alive).map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}
    </select>
    <button class="btn btn-primary" style="width:100%" onclick="resolveNight()">แจ้งรุ่งเช้า</button>`;
  }
  renderBoard();
}

function renderCupidSelect() {
  const div = document.getElementById('cupid-select');
  div.innerHTML = "";
  state.players.forEach(p => {
    const btn = document.createElement('button');
    btn.className = `btn btn-target ${p.isLover ? 'selected' : ''}`;
    btn.innerText = p.name;
    btn.onclick = () => {
      if (p.isLover) {
        p.isLover = false;
        state.lovers = state.lovers.filter(id => id !== p.id);
      } else if (state.lovers.length < 2) {
        p.isLover = true;
        state.lovers.push(p.id);
      }
      renderCupidSelect();
    };
    div.appendChild(btn);
  });
  
  if (state.lovers.length === 2) {
    const confirm = document.createElement('button');
    confirm.className = "btn btn-primary";
    confirm.innerText = "ยืนยันคู่รัก";
    confirm.onclick = () => {
      state.cupidUsed = true;
      addLog("💘 คิวปิดเลือกคู่รักเรียบร้อยแล้ว (ชะตาผูกกัน)");
      renderPhase();
    };
    div.appendChild(confirm);
  }
}

function resolveNight() {
  const vId = document.getElementById('kill-target').value;
  if (vId) killPlayer(vId, "ถูกหมาป่ากำจัด");
  state.round++;
  renderPhase();
}

function killPlayer(id, reason) {
  const p = state.players.find(x => x.id == id);
  if (p && p.alive) {
    p.alive = false;
    addLog(`💀 ${p.name} (${p.role.name}) ${reason}`);
    
    // SOUL BOUND
    if (state.lovers.includes(p.id)) {
        const otherId = state.lovers.find(l => l != p.id);
        const other = state.players.find(x => x.id == otherId);
        if (other && other.alive) {
            other.alive = false;
            addLog(`💔 ${other.name} ตรอมใจตายตามคู่รักไป...`);
        }
    }
  }
}

function renderBoard() {
  document.getElementById('player-board').innerHTML = state.players.map(p => `
    <div class="player-item ${p.alive?'alive':'dead'} ${p.isLover?'lover':''}">
      <span>${p.role.icon} ${p.name} ${p.isLover?'❤️':''}</span><br>
      <small style="color:#888">${p.role.name}</small>
    </div>
  `).join('');
}

function addLog(msg) {
  state.log.unshift(msg);
  document.getElementById('game-log').innerHTML = state.log.map(m => `<div>${m}</div>`).join('');
}

function toggleRoleRef() {
  state.roleRefOpen = !state.roleRefOpen;
  document.getElementById('role-ref-overlay').classList.toggle('hidden', !state.roleRefOpen);
  if(state.roleRefOpen) renderRoleRef();
}

function setRoleRefTab(tab, btn) {
  state.roleRefTab = tab;
  document.querySelectorAll('#role-ref-tabs .tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRoleRef();
}

function renderRoleRef() {
  const tc = TEAM_COLORS[state.roleRefTab];
  document.getElementById('role-ref-grid').innerHTML = ROLES.filter(r => r.team === state.roleRefTab).map(role => `
    <div class="role-card" style="border-color:${tc.accent}">
      <div style="display:flex; align-items:center; gap:10px">
        <span style="font-size:24px">${role.icon}</span>
        <strong style="color:${tc.text}">${role.name}</strong>
      </div>
      <p style="color:#bbb;font-size:12px;margin-top:8px">${role.description}</p>
    </div>
  `).join('');
}
