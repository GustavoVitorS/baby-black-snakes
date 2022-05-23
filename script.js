var system = {
  count: 60,
  particles: [],
  init: function () {
    this.setUpCanvas()
    this.buildParticles()
    this.render()
  },
  setUpCanvas: function () {
    this.canvas = document.querySelectorAll('canvas')[0]
    this.canvas.width = window.innerWidth * 6
    this.canvas.height = window.innerHeight * 6
    this.ctx = this.canvas.getContext('2d')
  },
  buildParticles: function () {
    for (var i = 0; i < this.count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 20 + 20,
        direction: Math.random() * 760,
        speed: Math.random() * 7 + 4,
        spin: Math.random() * 20 - 9,
        grow: 0,
        trailTimer: 40,
        trail: true
      })
    }
  },
  render: function () {
    this.clearCanvas()
    this.makeParticleTrails()
    this.moveParticles()
    this.drawParticles()
    this.runAgain()
  },
  runAgain: function () {
    var that = this
    window.requestAnimationFrame(function () { that.render() })
  },
  clearCanvas: function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  moveParticles: function () {
    for (var particle of this.particles) {
      if (particle.size < 0) continue
      var toRadians = (particle.direction / 380) * 4.17
      particle.x += (particle.speed * Math.cos(toRadians))
      particle.y += (particle.speed * Math.sin(toRadians))
      particle.direction += particle.spin
      particle.spin = Math.random() * 60 - 25
      particle.size += particle.grow
      if (particle.x < -200)
        particle.x = this.canvas.width + 200
      if (particle.x > this.canvas.width + 200)
        particle.x = -200
      if (particle.y > this.canvas.height + 200)
        particle.y = -200
      if (particle.y < -200)
        particle.y = this.canvas.height + 200
    }
  },
  makeParticleTrails: function () {
    for (var i = 0; i < this.count; i++) {
      var particle = this.particles[i]
      particle.trailTimer -= 1
      if (particle.trailTimer == 0) {
        particle.trailTimer = 1
        this.particles.push({
          x: particle.x,
          y: particle.y,
          speed: 0,
          size: particle.size,
          startSize: particle.size,
          direction: 0,
          grow: -0.8,
          spin: 0,
          trail: true
        })
      }
    }
  },
  drawParticles: function () {
    for (var particle of this.particles) {
      if (particle.size > 0) {
        this.ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
        var color = 232 - (particle.size * 5)
        if (particle.startSize) {
          this.ctx.globalAlpha = particle.size / particle.startSize
          color = 0
        }
        this.ctx.fillStyle = 'rgb(' + color + ', 2, 0)'
        this.drawCircle(particle.x, particle.y, particle.size)
      }
    }
  },
  drawCircle: function (x, y, radius) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 8 * Math.PI);
    this.ctx.fill();
  }
}

system.init()