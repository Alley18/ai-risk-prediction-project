// app.js — handles UI, upload, fetch, and map
document.addEventListener('DOMContentLoaded', () => {
  // particles
  tsParticles.load('tsparticles', {
    fpsLimit: 60,
    particles: {
      number: { value: 70 },
      color: { value: ['#7cf0ff', '#7c7cff'] },
      shape: { type: 'circle' },
      opacity: { value: 0.08 },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 0.6, direction: 'none', outModes: 'bounce' }
    },
    interactivity: { detectsOn: 'canvas' }
  });

  // DOM refs
  const drop = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const preview = document.getElementById('preview');
  const resultPanel = document.getElementById('resultPanel');
  const labelText = document.getElementById('labelText');
  const confBar = document.getElementById('confBar');
  const confText = document.getElementById('confText');
  const predictBtn = document.getElementById('predictBtn');

  let currentFile = null;

  // drag events
  ['dragenter','dragover'].forEach(evt => {
    drop.addEventListener(evt, (e)=>{ e.preventDefault(); drop.classList.add('hover') });
  });
  ['dragleave','drop'].forEach(evt => {
    drop.addEventListener(evt, (e)=>{ e.preventDefault(); drop.classList.remove('hover') });
  });

  drop.addEventListener('drop', (e)=>{
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if(f) handleFile(f);
  });

  fileInput.addEventListener('change', (e)=> {
    const f = e.target.files[0];
    if(f) handleFile(f);
  });

  function handleFile(file){
    currentFile = file;
    preview.src = URL.createObjectURL(file);
    resultPanel.setAttribute('aria-hidden', 'false');
    labelText.textContent = 'Ready to predict';
    confBar.style.width = '0%';
    confText.textContent = '--';
  }

  predictBtn.addEventListener('click', async ()=>{
    if(!currentFile) return alert('Choose an image first');
    labelText.textContent = 'Predicting...';
    const fd = new FormData();
    fd.append('image', currentFile);

    try{
      const res = await fetch('/predict', { method: 'POST', body: fd });
      const data = await res.json();
      if(data.error){ labelText.textContent = 'Error'; alert(data.error); return; }
      // show label & confidence
      labelText.textContent = data.label;
      const confPercent = Math.round(data.confidence * 100);
      confBar.style.width = confPercent + '%';
      confText.textContent = confPercent + '%';

      // color-change bar based on label
      if(data.label === 'Low Risk'){
        confBar.style.background = 'linear-gradient(90deg, var(--green), #6feac3)';
      } else if(data.label === 'Medium Risk'){
        confBar.style.background = 'linear-gradient(90deg, var(--yellow), #ffbf70)';
      } else {
        confBar.style.background = 'linear-gradient(90deg, var(--blue), #7fb7ff)';
      }

      // put marker on map (randomized nearby Seoul for demo)
      const lat = 37.5665 + (Math.random()-0.5)*0.12;
      const lng = 126.9780 + (Math.random()-0.5)*0.12;
      const color = data.label === 'Low Risk' ? '#33d69f' : (data.label === 'Medium Risk' ? '#ffd166' : '#5aa0ff');
      L.circle([lat,lng], { radius: 400, color: color, fillOpacity: 0.25 }).addTo(map)
        .bindPopup(`<b>${data.label}</b><br>Confidence: ${Math.round(data.confidence*100)}%`).openPopup();

    }catch(err){
      console.error(err);
      labelText.textContent = 'Prediction failed';
      alert('Prediction failed — check server console');
    }
  });

  // Initialize Leaflet map
  window.map = L.map('map').setView([37.5665, 126.9780], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ maxZoom: 18 }).addTo(map);

});
