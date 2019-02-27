export default class Triangle {
  constructor(screenWidth, screenHeight, highlight) {
    this.init = () => {
      this.coords = [{},{},{}];
      this.x = -0.5*screenWidth + 2*screenWidth*Math.random();
      this.y = screenHeight*Math.random();
      this.coords[0].x = Math.random()*40;
      this.coords[0].y = Math.random()*40;
      this.coords[1].x = Math.random()*40;
      this.coords[1].y = Math.random()*40;
      this.coords[2].x = Math.random()*40;
      this.coords[2].y = Math.random()*40;
      this.center = {
        x: (this.coords[0].x + this.coords[1].x + this.coords[2].x) / 3,
        y: (this.coords[0].y + this.coords[1].y + this.coords[2].y) / 3
      }
      this.scale = 1+Math.random()*1.8;
      if (highlight) {
        const random = 0.6+0.8*Math.random();
        this.color = `${random*40},${random*10},${random*14}`;
        this.alpha = 0;
      }
      else {
        const random = 20+40*Math.random();
        this.color = `${random},${random},${random*1.2}`;
        this.alpha = 1;
      }
      this.rotation = 0;
    }

    this.init();
  }
}