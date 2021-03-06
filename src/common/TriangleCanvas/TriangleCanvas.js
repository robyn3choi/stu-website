import React, { Component } from 'react';
import Triangle from './Triangle';
import './TriangleCanvas.scss';
import { CSSTransition } from 'react-transition-group';


class TriangleCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.ctx = {};
    this.triangles = [];
    this.highlightTriangles = [];
    this.floatingTweens = [];

    this.isHighlightVisible = false;
    this.lastHighlightedElementX = 0;
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d');

    if (!this.props.onlyHighlightTriangles) {
      const numTriangles = canvas.width * canvas.height / 40000;
      for (let i = 0; i < numTriangles; i++) {
        const tri = new Triangle(canvas.width, canvas.height);
        this.triangles.push(tri);
        this.floatingTweens.push(this.floatingTween(tri, i));
      }
    }

    const numHighlightTriangles = this.props.onlyHighlightTriangles ? 36 : 14;
    if (this.props.position === 'front') {
      for (let i = 0; i < numHighlightTriangles; i++) {
        const tri = new Triangle(canvas.width, canvas.height, true);
        this.highlightTriangles.push(tri);
        this.highlightRotateTween(tri, i);
      }
    }

    this.animate();
  }

  animate() {
  
    if (this.ctx.canvas.width !== window.innerWidth) {
      this.ctx.canvas.width = window.innerWidth;
    }
    else if (this.ctx.canvas.height !== window.innerHeight) {
      this.ctx.canvas.height = window.innerHeight;
    }
    else {
      this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    }

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
    //this.ctx.fillStyle = 'rgba(' + triangle.color + ',' + triangle.alpha + ')';
    this.ctx.fillStyle = 'rgba(' + triangle.r + ',' + triangle.g + ',' + triangle.b + ',' + triangle.alpha + ')';
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

  highlightFadeInTween(tri) {
    window.TweenMax.to(tri, 1,
      {
        alpha: 1,
        ease: window.Power2.easeOut
      });
  }

  highlightFadeOutTween(tri, i) {
    window.TweenMax.to(tri, 1,
      {
        alpha: 0,
        ease: window.Power2.easeOut,
        onComplete: () => { this.isHighlightVisible = false }
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

  colorChangeTween(tri) {
    let random;
    if (tri.r > 37) {
      random = 15 + 25*Math.random();
    }
    else {
      random = 33+27*Math.random();
    }
    window.TweenMax.to(tri, 0.7,
      {
        r: Math.floor(random),
        g: Math.floor(random),
        b: Math.floor(random),
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) return;

    if (this.props.hoveredElementPos) {
      for (const [i, tri] of this.highlightTriangles.entries()) {
        if (!this.isHighlightVisible || this.props.hoveredElementPos.x !== this.lastHighlightedElementX) {
          const xOffset = this.props.onlyHighlightTriangles ? (-120 + 300 * Math.random()) : (-60 + 120 * Math.random());
          tri.x = this.props.hoveredElementPos.x + xOffset;
          tri.y = this.props.hoveredElementPos.y;
        }
        this.highlightFadeInTween(tri, i);
      }

      this.isHighlightVisible = true;
      this.lastHighlightedElementX = this.props.hoveredElementPos.x;
    }
    else {
      for (const tri of this.highlightTriangles) {
        this.highlightFadeOutTween(tri);
      }
    }

    if (prevProps.route !== this.props.route && this.props.browser !== 'ie') {
      for (const tri of this.triangles) {
        this.colorChangeTween(tri);
      }
    }
  }


  render() {
    return (
      <CSSTransition appear={true} in={this.props.shouldPlayIntro} classNames="triangle-canvas" timeout={800}>
        <canvas className={`triangle-canvas triangle-canvas_${this.props.position}`} ref={this.canvasRef} />
      </CSSTransition>
    );
  }
}

export default TriangleCanvas;
