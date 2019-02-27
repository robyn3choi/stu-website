import React, { Component } from 'react';
import Triangle from './Triangle';
import './HeaderCanvas.scss';

class HeaderCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.ctx = {};
    this.triangles = [];
    this.highlightTriangles = [];
    //this.floatingTweens = [];
    this.homingTweens = [];
    this.spreadingTweens = [];
    this.floatingPositions = [];
    this.floatingTweens = [];
    this.hoveringTweens = [];

    this.isHighlightVisible = false;
    this.lastHighlightedElementX = 0;
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d');
    const numTriangles = canvas.width * canvas.height / 40000;

    for (let i = 0; i < numTriangles; i++) {
      const tri = new Triangle(canvas.width, canvas.height);
      this.triangles.push(tri);
      this.floatingTweens.push(this.floatingTween(tri, i));
    }

    if (this.props.position === 'front') {
      for (let i=0; i<12; i++) {
        const tri = new Triangle(canvas.width, canvas.height, true);
        this.highlightTriangles.push(tri);
        this.highlightRotateTween(tri, i);
      }
    }


    this.animate();
  }

  animate() {
    //this.ctx.clearRect(0,0,this.canvasRef.current.width,this.canvasRef.current.height);
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    for (const triangle of this.triangles) {
      this.drawTriangle(triangle);
    }
    for (const triangle of this.highlightTriangles) {
      this.drawTriangle(triangle);
    }
    requestAnimationFrame(() => this.animate());
  }

  drawTriangle(triangle) {
    this.ctx.save();
    const x = triangle.x + triangle.center.x;
    const y = triangle.y + triangle.center.y;
    this.ctx.translate(x, y);
    this.ctx.rotate(triangle.rotation);
    this.ctx.scale(triangle.scale, triangle.scale);
    this.ctx.translate(-x, -y);
    this.ctx.beginPath();
    this.ctx.moveTo(triangle.coords[0].x + triangle.x, triangle.coords[0].y + triangle.y);
    this.ctx.lineTo(triangle.coords[1].x + triangle.x, triangle.coords[1].y + triangle.y);
    this.ctx.lineTo(triangle.coords[2].x + triangle.x, triangle.coords[2].y + triangle.y);
    this.ctx.closePath();
    this.ctx.fillStyle = 'rgba(' + triangle.color + ',' + triangle.alpha + ')';
    this.ctx.fill();
    this.ctx.restore();
  }

  floatingTween(triangle, i) {
    const width = this.canvasRef.current.width;
    const dir = i % 2 === 0 ? 1 : -1;
    const rotation = -20 + 40 * Math.random();
    var time = 100 + 300 * Math.random();
    return window.TweenMax.to(triangle, time,
      {
        rotation: rotation,
        x: triangle.x + dir * width,
        repeat: -1,
        yoyo: true,
      });
  }

  highlightOpacityTween(tri) {
    window.TweenMax.to(tri, 0.5,
      {
        alpha: 1,
        ease: window.Power2.easeInOut
      });
  }

  highlightFadeOutTween(tri, i) {
    window.TweenMax.to(tri, 0.5,
      {
        alpha: 0,
        ease: window.Power2.easeInOut,
        onComplete: () => {this.isHighlightVisible = false}
      });
  }

  highlightRotateTween(tri, i) {
    const dir = i % 2 === 0 ? 1 : -1;
    window.TweenMax.to(tri, 40,
      {
        rotation: dir * 2 * Math.PI,
        repeat: -1,
        ease: window.Power0.easeNone
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) return;
    
    if (this.props.hoveredElementPos) {
      // put triangles at location
      // rotate them
      console.log(this.props.hoveredElementPos.x === this.lastHighlightedElementX)
      console.log(this.isHighlightVisible);
      for (const [i, tri] of this.highlightTriangles.entries()) {

        
        if (!this.isHighlightVisible || this.props.hoveredElementPos.x !== this.lastHighlightedElementX) {
          console.log("change")
          tri.x = this.props.hoveredElementPos.x + (-60 + 120*Math.random());
          tri.y = this.props.hoveredElementPos.y;
        }
        this.highlightOpacityTween(tri, i);
      }
      this.isHighlightVisible = true;
      this.lastHighlightedElementX = this.props.hoveredElementPos.x;
    }
    else {
      for (const tri of this.highlightTriangles) {
        this.highlightFadeOutTween(tri);
      }
      //setTimeout(() => this.isHighlightVisible = false, 500);
    }
    // // we've started hovering over a link
    // if (this.props.hoveredElementPos) {
    //   // if was spreading, kill spreading tweens
    //   let wasSpreading = false;
    //   if (this.spreadingTweens.length > 0) {
    //     wasSpreading = true;
    //     for (const tween of this.spreadingTweens) {
    //       tween.kill();
    //     }
    //     this.spreadingTweens.length = 0;
    //   }
    //   if (!wasSpreading) {
    //     this.floatingPositions.length = 0;
    //   }
    //   for (const [i, triangle] of this.homingTriangles.entries()) {
    //     if (!wasSpreading) {
    //       this.floatingPositions.push({ x: triangle.x, y: triangle.y });
    //     }
    //     this.homingTweens.push(this.homingTween(triangle, i));
    //   }
    // }
    // // we've stopped hovering over a link
    // else {
    //   // if was homing, kill homing tweens
    //   if (this.homingTweens.length > 0) {
    //     for (const tween of this.homingTweens) {
    //       tween.kill();
    //     }
    //     this.homingTweens.length = 0;
    //   }
    //   // start spreading tweens
    //   for (const [i, triangle] of this.homingTriangles.entries()) {
    //     this.spreadingTweens.push(this.spreadingTween(triangle, i));
    //   }
    // }
  }

  // spreadingTween(triangle, i) {
  //   return window.TweenMax.to(triangle, 1.5,
  //     {
  //       x: this.floatingPositions[i].x,
  //       y: this.floatingPositions[i].y,
  //       //rotation: triangle.rotation + (-2*Math.PI + 4*Math.PI*Math.random()),
  //       ease: window.Power1.easeOut,
  //       onComplete: () => {
  //         this.floatingTweens.push(this.floatingTween(triangle, i));
  //       }
  //     });
  // }

  // homingTween(triangle, i) {
  //   return window.TweenMax.to(triangle, 1,
  //     {
  //       x: this.props.hoveredElementPos.x,
  //       y: this.props.hoveredElementPos.y,
  //       //rotation: triangle.rotation + (-2*Math.PI + 4*Math.PI*Math.random()),
  //       ease: window.Power4.easeOut,
  //     });
  // }


  render() {
    return (
      <canvas className={`header__canvas header__canvas_${this.props.position}`} ref={this.canvasRef} />
    );
  }
}

export default HeaderCanvas;
