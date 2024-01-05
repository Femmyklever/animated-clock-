const canvas = document.getElementById('canvas')
const faceColor = document.getElementById('face-color')
const borderColor = document.getElementById('border-color')
const lineColor = document.getElementById('line-color')
const largeHandColor = document.getElementById('large-hand-color')
const secondHandColor = document.getElementById('second-hand-color')

function clock (){
  const now = new Date()
  
  const ctx = canvas.getContext('2d')
  ctx.save()
  ctx.clearRect(0,0,500,500)
  ctx.translate(250,250)
  ctx.rotate(-Math.PI / 2)
  // default styles
  ctx.strokeStyle = borderColor.value;
  ctx.lineWidth = 14
  ctx.fillStyle = faceColor.value;
  ctx.lineCap = 'round'
  // drawing a circle
  ctx.save()
  ctx.beginPath()
  ctx.arc(0,0,142,0,Math.PI * 2)
  ctx.stroke()
  ctx.fill()
  ctx.restore()
  // drawing hour line
  ctx.save()
  for(i=0; i<12; i++){
    ctx.strokeStyle = lineColor.value;
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(120,0)
    ctx.lineTo(100,0)
    ctx.rotate(Math.PI / 6)
    ctx.stroke()
  }
  ctx.restore()

// drawing minutes line
  ctx.save()
  for(i=0; i<60; i++){
    if(i % 5 !== 0){
       ctx.strokeStyle = lineColor.value;
      ctx.lineWidth = 5
      ctx.beginPath()
      ctx.moveTo(120,0)
      ctx.lineTo(110,0)
      ctx.stroke()
    }
    ctx.rotate(Math.PI / 30)
  }
  ctx.restore()
  // check current time
  const hr = now.getHours() % 12
  const min = now.getMinutes()
  const sec = now.getSeconds()
  // console.log(`${hr}:${min}:${sec}`);

  //  draw hour hand

  ctx.save()
  ctx.strokeStyle = largeHandColor.value
  ctx.lineWidth = 7
  ctx.rotate((Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) *sec)
  ctx.beginPath()
  ctx.moveTo(-10,0)
  ctx.lineTo(80,0)
  ctx.stroke()
  ctx.restore()

  //  draw min hand

  ctx.save()
  ctx.strokeStyle = largeHandColor.value
  ctx.lineWidth = 5
  ctx.rotate( (Math.PI / 30) * min )
  ctx.beginPath()
  ctx.moveTo(-14,0)
  ctx.lineTo(90,0)
  ctx.stroke()
  ctx.restore()
// draw sec

   ctx.save()
  ctx.strokeStyle = secondHandColor.value
  ctx.fillStyle = secondHandColor.value
  ctx.lineWidth = 4
  ctx.rotate( (Math.PI / 30) * sec)
  ctx.beginPath()
  ctx.moveTo(-18,0)
  ctx.lineTo(100,0)
  ctx.arc(0,0,5,0,Math.PI * 2)
  ctx.stroke()
  ctx.fill()
  ctx.restore()

  ctx.restore()
requestAnimationFrame(clock)
 
}

requestAnimationFrame(clock)


// save image uisng eventlistener

document.querySelector('#save-btn').addEventListener('click', () => {
  const urlData = canvas.toDataURL('image/png')
  const link = document.createElement('a')
  link.download = 'clock.png'
  link.href = urlData
  link.click()
})