(function(){
  var canvas = document.getElementById('orbitCanvas');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var size = 600;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cx = size/2, cy = size/2;
  var rings = [
    {r: size*0.16, speed: 0.010, phase: 0.2,  label:'AI'},
    {r: size*0.27, speed: -0.007, phase: 2.4, label:'PROJECTS'},
    {r: size*0.37, speed: 0.005, phase: 4.1,  label:'HACKATHONS'},
    {r: size*0.46, speed: -0.004, phase: 1.1, label:'OPEN SRC'}
  ];
  var paper = '#ece7db';
  var line = '#242832';
  var signal = '#ff6a3d';
  var cyan = '#5fd0e8';
  var dotColors = [signal, cyan, paper, signal];

  function drawFrame(t){
    ctx.clearRect(0,0,size,size);

    // core
    ctx.beginPath();
    ctx.arc(cx, cy, size*0.05, 0, Math.PI*2);
    ctx.fillStyle = signal;
    ctx.shadowColor = signal;
    ctx.shadowBlur = 22;
    ctx.fill();
    ctx.shadowBlur = 0;

    rings.forEach(function(ring, i){
      ctx.beginPath();
      ctx.arc(cx, cy, ring.r, 0, Math.PI*2);
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.stroke();

      var angle = ring.phase + t * ring.speed;
      var x = cx + Math.cos(angle) * ring.r;
      var y = cy + Math.sin(angle) * ring.r * 0.98;

      ctx.beginPath();
      ctx.arc(x, y, 5.5, 0, Math.PI*2);
      ctx.fillStyle = dotColors[i % dotColors.length];
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 9, 0, Math.PI*2);
      ctx.strokeStyle = dotColors[i % dotColors.length];
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
    });
  }

  if(reduceMotion){
    drawFrame(0);
  } else {
    function tick(t){
      drawFrame(t*0.06);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
