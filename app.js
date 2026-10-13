/* ==========================================================================
   PawTrack - Pet HR Management System Interactive Logic
   ========================================================================== */

// Mock pet profile database
const petProfiles = {
  barnaby: {
    name: "Barnaby von Bark",
    id: "EMP-#PAW-2049",
    dept: "Security & Barketing",
    role: "Senior VP of Doorbell Alerting & Perimeter Fetch Operations",
    avatar: "🐕",
    salaryMonthly: "4,200 Treats",
    salaryAnnual: "50,400 Premium Biscuits",
    perfScore: "96.4%",
    attendanceRate: "98.5%",
    infractionsCount: "2 Records",
    kpis: [
      { name: "Doorbell Vigilance & Alert Speed", val: "99%", class: "bg-success", note: "Sub-second reaction latency across all entries." },
      { name: "Stick & Ball Retrieval Accuracy", val: "95%", class: "bg-success", note: "High retrieve velocity; occasionally hesitates to drop." },
      { name: "Tail Wag Morale Boosting", val: "100%", class: "bg-brand", note: "Significantly improves cross-team happiness index." },
      { name: "Snack Impulse Self-Regulation", val: "78%", class: "bg-warning", note: "Requires gentle coaching when cheese is left unattended." }
    ],
    managerReview: `"Barnaby is indispensable to company spirit. His devotion to perimeter surveillance is unmatched, though continued attention is recommended for shoe-chewing impulse control."`
  },
  milo: {
    name: "Milo Whiskerstein",
    id: "EMP-#MEOW-1104",
    dept: "Rest & Solar Acoustics",
    role: "Chief Nap Strategist & Keyboard Sitting Specialist",
    avatar: "🐈",
    salaryMonthly: "5,800 Freeze-Dried Salmon",
    salaryAnnual: "69,600 Salmon Flakes",
    perfScore: "92.1%",
    attendanceRate: "99.9%",
    infractionsCount: "3 Records",
    kpis: [
      { name: "Optimal Sunbeam Utilization", val: "100%", class: "bg-brand", note: "Tracks sunbeam movement across floor tiles with millimeter precision." },
      { name: "Laptop Keyboard Disruption", val: "94%", class: "bg-success", note: "Consistently halts typing when attention is owed." },
      { name: "Laser Pointer Interception", val: "84%", class: "bg-warning", note: "High burst agility; prone to sudden post-chase nap collapse." },
      { name: "Night Zoomies Output (3 AM)", val: "98%", class: "bg-success", note: "Peak performance delivered during off-peak hours." }
    ],
    managerReview: `"Milo excels in maintaining calmness throughout the workplace. Some concerns exist regarding unsanctioned coffee cup gravity tests from high tables."`
  },
  cleo: {
    name: "Cleo Birdman",
    id: "EMP-#CHIRP-8032",
    dept: "Public Relations & Alarm Ops",
    role: "VP of Audio Notifications & Mirror Debate Coordination",
    avatar: "🦜",
    salaryMonthly: "3,500 Millet Sprays",
    salaryAnnual: "42,000 Sunflower Seeds",
    perfScore: "94.8%",
    attendanceRate: "97.2%",
    infractionsCount: "1 Record",
    kpis: [
      { name: "Morning Alarm Mimicry", val: "100%", class: "bg-brand", note: "Accurately replicates iPhone alarm tone 5 minutes early." },
      { name: "Vocabulary & Keyphrase Recall", val: "91%", class: "bg-success", note: "Can say 'Hello!', 'Snack time!', and mimics microwave beeps." },
      { name: "Perch Balancing & Posture", val: "96%", class: "bg-success", note: "Flawless ergonomics on office shoulder rest." },
      { name: "Paper Document Shredding", val: "88%", class: "bg-warning", note: "Efficient paper shredding, though sometimes on active invoices." }
    ],
    managerReview: `"Cleo's customer notification skills exceed expectations. However, meetings should be muted during her spontaneous whistle routines."`
  }
};

// DOM References
const petSelector = document.getElementById('petSelector');
const petName = document.getElementById('petName');
const petEmpId = document.getElementById('petEmpId');
const petDept = document.getElementById('petDept');
const petTitle = document.getElementById('petTitle');
const petAvatar = document.getElementById('petAvatar');
const petSalary = document.getElementById('petSalary');
const salaryAnnual = document.getElementById('salaryAnnual');
const petPerfScore = document.getElementById('petPerfScore');
const petAttendanceRate = document.getElementById('petAttendanceRate');
const petInfractionsCount = document.getElementById('petInfractionsCount');
const kpiContainer = document.getElementById('kpiContainer');
const managerReviewText = document.getElementById('managerReviewText');

// Modal Elements
const incidentModal = document.getElementById('incidentModal');
const reportIncidentBtn = document.getElementById('reportIncidentBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const incidentForm = document.getElementById('incidentForm');
const incidentList = document.getElementById('incidentList');

// Header action buttons
const rewardBtn = document.getElementById('rewardBtn');
const exportBtn = document.getElementById('exportBtn');
const toastContainer = document.getElementById('toastContainer');

// Switch Pet Profile handler
petSelector.addEventListener('change', (e) => {
  const selectedKey = e.target.value;
  const data = petProfiles[selectedKey];
  if (!data) return;

  petName.textContent = data.name;
  petEmpId.textContent = data.id;
  petDept.textContent = data.dept;
  petTitle.textContent = data.role;
  petAvatar.textContent = data.avatar;
  petSalary.textContent = data.salaryMonthly;
  salaryAnnual.textContent = data.salaryAnnual;
  petPerfScore.textContent = data.perfScore;
  petAttendanceRate.textContent = data.attendanceRate;
  petInfractionsCount.textContent = data.infractionsCount;
  managerReviewText.textContent = data.managerReview;

  // Render KPIs
  kpiContainer.innerHTML = data.kpis.map(kpi => `
    <div class="kpi-item">
      <div class="kpi-info">
        <span class="kpi-name">${kpi.name}</span>
        <span class="kpi-val">${kpi.val}</span>
      </div>
      <div class="meter-track">
        <div class="meter-fill ${kpi.class}" style="width: ${kpi.val};"></div>
      </div>
      <small class="kpi-note">${kpi.note}</small>
    </div>
  `).join('');

  showToast(`Switched employee profile to ${data.name}! 🐾`);
});

// Toast Notification Helper
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Issue Bonus Treat Button
rewardBtn.addEventListener('click', () => {
  showToast(`🎉 Bonus Treat awarded to ${petName.textContent}! Direct deposit sent to food bowl.`);
});

// Export Dossier Button
exportBtn.addEventListener('click', () => {
  showToast(`📄 Dossier generated and ready to print for ${petName.textContent}!`);
});

// Open & Close Incident Modal
reportIncidentBtn.addEventListener('click', () => {
  incidentModal.classList.add('open');
});

function closeModal() {
  incidentModal.classList.remove('open');
  incidentForm.reset();
}

closeModalBtn.addEventListener('click', closeModal);
cancelModalBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
  if (e.target === incidentModal) {
    closeModal();
  }
});

// Handle New Incident Form Submission
incidentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('incidentTitle').value;
  const severity = document.getElementById('incidentSeverity').value;
  const notes = document.getElementById('incidentNotes').value;
  const remedy = document.getElementById('incidentRemedy').value;

  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

  const badgeClass = severity.includes('Severe') ? 'critical' : 'warning';
  
  const newIncidentHTML = document.createElement('div');
  newIncidentHTML.className = 'incident-item';
  newIncidentHTML.innerHTML = `
    <div class="incident-time-node">
      <span class="incident-dot"></span>
      <span class="incident-date">${today}</span>
    </div>
    <div class="incident-card">
      <div class="incident-header">
        <h4 class="incident-title">${title}</h4>
        <span class="severity-badge ${badgeClass}">${severity}</span>
      </div>
      <p class="incident-desc">${notes}</p>
      <div class="incident-footer">
        <span class="resolution"><strong>Remedy:</strong> ${remedy}</span>
        <span class="status-tag status-probation">Under Review</span>
      </div>
    </div>
  `;

  incidentList.prepend(newIncidentHTML);
  closeModal();
  showToast(`⚠️ Misconduct incident logged on HR record!`);
});
