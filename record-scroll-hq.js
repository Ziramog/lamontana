const { chromium } = require('playwright');
const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

(async () => {
  console.log('🚀 Iniciando el motor de renderizado 4K a MP4...');
  
  if (!fs.existsSync('videos')){
      fs.mkdirSync('videos');
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2 // Máxima calidad de fuentes (Retina)
  });
  
  const page = await context.newPage();
  const client = await context.newCDPSession(page);

  const outputPath = path.join('videos', `ultra-hq-${Date.now()}.mp4`);
  
  // Iniciamos ffmpeg para procesar los frames en crudo y convertirlos en MP4
  let ffmpegClosed = false;
  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg', // Fixed codec name
    '-framerate', '30', // 30 FPS constantes
    '-i', '-',
    '-c:v', 'libx264',
    '-preset', 'fast',
    '-crf', '18', // 18 = visualmente sin pérdida de calidad
    '-pix_fmt', 'yuv420p',
    outputPath
  ]);

  // Log ffmpeg errors to console to debug why it's failing
  ffmpeg.stderr.on('data', (data) => {
    // console.error(`FFMPEG: ${data}`); // Uncomment if it fails again
  });

  const ffmpegPromise = new Promise((resolve) => {
    ffmpeg.on('close', () => {
      ffmpegClosed = true;
      resolve();
    });
  });

  let lastFrame = null;
  client.on('Page.screencastFrame', async (frameObject) => {
    lastFrame = Buffer.from(frameObject.data, 'base64');
    try {
      await client.send('Page.screencastFrameAck', { sessionId: frameObject.sessionId });
    } catch(e) {}
  });

  let recording = true;
  // Bucle para alimentar a FFmpeg exactamente a 30 FPS
  const feedLoop = async () => {
    while (recording) {
      if (lastFrame && !ffmpegClosed) {
        try {
          ffmpeg.stdin.write(lastFrame);
        } catch(e) {}
      }
      await new Promise(r => setTimeout(r, 33)); // ~30 fps
    }
  };

  console.log('Navegando a https://lamontana-two.vercel.app/ ...');
  await page.goto('https://lamontana-two.vercel.app/', { waitUntil: 'load', timeout: 60000 });

  await page.addStyleTag({ content: '::-webkit-scrollbar { display: none; }' });
  await page.waitForTimeout(3000);

  console.log('🎬 Grabando en Ultra Calidad (esto tomará unos segundos)...');
  await client.send('Page.startScreencast', { format: 'jpeg', quality: 100, everyNthFrame: 1 });
  feedLoop();
  
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const smoothScrollTo = async (targetY, duration) => {
      const startY = window.scrollY;
      const difference = targetY - startY;
      const startTime = performance.now();
      return new Promise((resolve) => {
        const step = () => {
          const progress = (performance.now() - startTime) / duration;
          if (progress < 1) {
            const ease = 1 - Math.pow(1 - progress, 4);
            window.scrollTo(0, startY + difference * ease);
            requestAnimationFrame(step);
          } else {
            window.scrollTo(0, targetY);
            resolve();
          }
        };
        requestAnimationFrame(step);
      });
    };

    const elements = [
      document.getElementById('nuestra-historia'),
      ...document.querySelectorAll('section'),
      document.getElementById('propiedades-destacadas'),
    ].filter(Boolean);

    let positions = elements.map(el => {
      const rect = el.getBoundingClientRect();
      return rect.top + window.scrollY - 80; 
    }).sort((a, b) => a - b);

    const uniquePositions = [];
    for (const pos of positions) {
      if (uniquePositions.length === 0 || pos - uniquePositions[uniquePositions.length - 1] > 600) {
        uniquePositions.push(pos);
      }
    }
    uniquePositions.push(document.body.scrollHeight - window.innerHeight);

    for (const pos of uniquePositions) {
      const target = Math.min(pos, document.body.scrollHeight - window.innerHeight);
      if (target <= window.scrollY + 10) continue; 
      await smoothScrollTo(target, 1800); 
      await sleep(3500); 
    }
  });

  console.log('✅ Recorrido completado. Procesando el archivo final MP4...');
  
  recording = false;
  await client.send('Page.stopScreencast');
  if (!ffmpegClosed) {
    ffmpeg.stdin.end();
  }

  await ffmpegPromise;

  await context.close();
  await browser.close();
  
  console.log(`✨ Video de Ultra Calidad guardado con éxito. Revisa la carpeta videos/`);
})();
