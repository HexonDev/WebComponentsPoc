const fs = require('fs');
const path = require('path');
const concat = require('concat');

(async function build() {
  const distPath = path.join(__dirname, 'dist', 'web-components-poc', 'browser');
  const outputPath = path.join(__dirname, 'dist');

  // Megkeressük az összes fájlt a dist mappában
  const files = [
    path.join(distPath, 'polyfills.js'),
    path.join(distPath, 'main.js')
  ];

  // Összefűzzük őket egy fájlba
  await concat(files, path.join(outputPath, 'data-table-element.js'));
  
  console.log('✅ Web Component bundle elkészült: dist/data-table-element.js');
})();
