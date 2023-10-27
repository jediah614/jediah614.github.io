dw.debug = true
size = 96

function drawTerrain(ctx, dx, dy, terrain) {
  if (dx < -1 * size || dx > ctx.canvas.clientWidth) {
    return
  }
  if (dy < -1 * size || dy > ctx.canvas.clientHeight) {
    return
  }
  ctx.strokeStyle = terrain === 0 ? 'orange' : 'red'
  ctx.strokeRect(dx, dy, size, size)
  ctx.font = "96px serif";
  ctx.strokeText(terrain, dx, dy + size)
}

function drawChunk(ctx, chx, chy, chz, x, y) {
  cx = ctx.canvas.clientWidth / 2;
  cy = ctx.canvas.clientHeight / 2;
  chk = [chz, chy, chx].join('.')

  dx = Math.floor(cx + (chx - x / dw.md.chunkSize) * dw.md.chunkSize * size)
  dy = Math.floor(cy + (chy - y / dw.md.chunkSize) * dw.md.chunkSize * size)

  for (i = 0; i < dw.md.chunkSize; i++) {
    for (j = 0; j < dw.md.chunkSize; j++) {
      terrain = dw.chunks[chk][0][j][i];
      drawTerrain(ctx, dx + i * size, dy + j * size, terrain)
    }
  }
}

function draw(ctx, x, y, z) {
  cx = ctx.canvas.clientWidth / 2;
  cy = ctx.canvas.clientHeight / 2;

  chx = Math.floor(x / dw.md.chunkSize)
  chy = Math.floor(y / dw.md.chunkSize)
  chz = z

  drawChunk(ctx, chx, chy, chz, x, y)
  
  chk = chz+'.'+chy+'.'+chx

}

dw.on('clientTargetSet', id => {
  console.log(Object.keys(dw.chunks))
});
dw.on('drawEnd', draw);
setInterval(function () {
}, 250);
