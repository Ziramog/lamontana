const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('Iniciando el navegador (Playwright)...');
  
  if (!fs.existsSync('videos')){
      fs.mkdirSync('videos');
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: { width: 1920, height: 1080 }
    },
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2 // Renderiza la página en "Retina/4K" para máxima nitidez
  });
  
  const page = await context.newPage();
  
  console.log('Navegando a https://roggeroyroma.com ...');
  try {
    await page.goto('https://roggeroyroma.com', { waitUntil: 'networkidle' });
  } catch (err) {
    console.error('❌ Error al conectar.');
    await browser.close();
    process.exit(1);
  }

  console.log('✅ Página cargada. Preparando el scroll dinámico por secciones...');
  
  // Ocultar scrollbar
  await page.addStyleTag({ content: '::-webkit-scrollbar { display: none; }' });
  
  // Tiempo inicial para apreciar el hero
  await page.waitForTimeout(3000);

  console.log('🎥 Iniciando recorrido interactivo...');
  
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    // Función de scroll suave personalizado
    const smoothScrollTo = async (targetY, duration) => {
      const startY = window.scrollY;
      const difference = targetY - startY;
      const startTime = performance.now();

      return new Promise((resolve) => {
        const step = () => {
          const progress = (performance.now() - startTime) / duration;
          if (progress < 1) {
            // Curva de aceleración (easeOutQuart) para que se sienta muy natural
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

    // Identificar las secciones principales
    const elements = [
      document.getElementById('nuestra-historia'),
      ...document.querySelectorAll('section'),
      document.getElementById('propiedades-destacadas'),
    ].filter(Boolean);

    // Obtener las posiciones Y de cada sección
    let positions = elements.map(el => {
      const rect = el.getBoundingClientRect();
      // Centramos un poco el elemento restando algo de offset si queremos, 
      // o vamos directo a su parte superior. Vamos a su top.
      return rect.top + window.scrollY - 80; // 80px de margen por el navbar
    }).sort((a, b) => a - b);

    // Filtrar posiciones para no hacer paradas muy cortas (mínimo 600px de diferencia)
    const uniquePositions = [];
    for (const pos of positions) {
      if (uniquePositions.length === 0 || pos - uniquePositions[uniquePositions.length - 1] > 600) {
        uniquePositions.push(pos);
      }
    }

    // Asegurarnos de llegar al final de la página también
    uniquePositions.push(document.body.scrollHeight - window.innerHeight);

    // Recorrido
    for (const pos of uniquePositions) {
      const target = Math.min(pos, document.body.scrollHeight - window.innerHeight);
      if (target <= window.scrollY + 10) continue; // Si ya estamos ahí, lo omitimos

      // Scroll rápido y elegante (1.8 segundos de transición)
      await smoothScrollTo(target, 1800); 
      
      // Pausa para que el usuario pueda apreciar y leer el contenido (3.5 segundos)
      await sleep(3500); 
    }
  });

  console.log('✅ Recorrido finalizado. Guardando video...');
  
  await page.waitForTimeout(2000);

  await context.close();
  await browser.close();
  
  console.log('🎉 ¡Listo! Revisa la carpeta "videos/". Encontrarás una nueva toma mucho más dinámica.');
})();
