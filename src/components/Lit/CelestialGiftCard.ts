import { LitElement, html } from "lit";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  depth: number;
  isSparkle: boolean;
}

interface ShootingStar {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  progress: number;
  duration: number;
  cooldown: number;
}

const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

export class CelestialGiftCard extends LitElement {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private cardStage: HTMLElement | null = null;
  private rafId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;

  private width = 0;
  private height = 0;
  private isVisible = true;
  private reducedMotion = false;
  private startTime = 0;
  private lastFrameTime = 0;

  // Pointer interaction with smooth spring damping
  private isHovered = false;
  private targetPointerX = 0.5;
  private targetPointerY = 0.5;
  private pointerX = 0.5;
  private pointerY = 0.5;
  private hoverMix = 0;

  private stars: Star[] = [];
  private shootingStar: ShootingStar = {
    active: false,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    length: 70,
    progress: 0,
    duration: 1.1,
    cooldown: 3.5,
  };

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.initStars();
    requestAnimationFrame(() => this.setupCanvas());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopLoop();
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    this.cardStage?.removeEventListener("pointermove", this.handlePointerMove);
    this.cardStage?.removeEventListener(
      "pointerenter",
      this.handlePointerEnter
    );
    this.cardStage?.removeEventListener(
      "pointerleave",
      this.handlePointerLeave
    );
  }

  private initStars() {
    const rand = seededRandom(19600317);
    this.stars = Array.from({ length: 54 }, (_, i) => ({
      x: rand(),
      y: rand(),
      radius: 0.45 + rand() * 1.25,
      baseAlpha: 0.25 + rand() * 0.65,
      twinkleSpeed: 0.6 + rand() * 1.6,
      twinkleOffset: rand() * Math.PI * 2,
      depth: 0.35 + rand() * 0.85,
      isSparkle: i < 6,
    }));
  }

  private setupCanvas() {
    this.canvas = this.querySelector<HTMLCanvasElement>(
      "[data-celestial-canvas]"
    );
    this.cardStage = this.querySelector<HTMLElement>("[data-card-stage]");
    if (!this.canvas || !this.cardStage) return;

    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx) return;

    this.resizeCanvas();

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
      if (this.reducedMotion) {
        this.drawFrame(0, 0);
      }
    });
    this.resizeObserver.observe(this.cardStage);

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        this.isVisible = Boolean(entry?.isIntersecting);
        if (this.isVisible && !this.reducedMotion) {
          this.startLoop();
        } else {
          this.stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    this.intersectionObserver.observe(this.cardStage);

    this.cardStage.addEventListener("pointermove", this.handlePointerMove);
    this.cardStage.addEventListener("pointerenter", this.handlePointerEnter);
    this.cardStage.addEventListener("pointerleave", this.handlePointerLeave);

    if (this.reducedMotion) {
      this.drawFrame(0, 0);
    } else {
      this.startLoop();
    }
  }

  private resizeCanvas() {
    if (!this.canvas || !this.cardStage || !this.ctx) return;
    const rect = this.cardStage.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private handlePointerEnter = () => {
    this.isHovered = true;
  };

  private handlePointerMove = (e: PointerEvent) => {
    if (!this.cardStage) return;
    const rect = this.cardStage.getBoundingClientRect();
    const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    this.targetPointerX = nx;
    this.targetPointerY = ny;
  };

  private handlePointerLeave = () => {
    this.isHovered = false;
    this.targetPointerX = 0.5;
    this.targetPointerY = 0.5;
  };

  private startLoop() {
    if (this.rafId !== null) return;
    this.lastFrameTime = performance.now();
    if (!this.startTime) this.startTime = this.lastFrameTime;

    const tick = (now: number) => {
      if (!this.isVisible) {
        this.rafId = null;
        return;
      }
      const dt = Math.min((now - this.lastFrameTime) / 1000, 0.05);
      this.lastFrameTime = now;
      const elapsed = (now - this.startTime) / 1000;

      this.updatePhysics(dt);
      this.drawFrame(elapsed, dt);

      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  private stopLoop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private updatePhysics(dt: number) {
    const ease = 1 - Math.exp(-8 * dt);
    this.pointerX += (this.targetPointerX - this.pointerX) * ease;
    this.pointerY += (this.targetPointerY - this.pointerY) * ease;

    const targetMix = this.isHovered ? 1 : 0;
    this.hoverMix += (targetMix - this.hoverMix) * (1 - Math.exp(-7 * dt));

    if (this.cardStage && !this.reducedMotion) {
      const tiltY = (this.pointerX - 0.5) * 11 * this.hoverMix;
      const tiltX = (0.5 - this.pointerY) * 9 * this.hoverMix;
      const lift = 3 * this.hoverMix;
      this.cardStage.style.transform = `perspective(1100px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(${(-lift).toFixed(2)}px)`;
    }

    // Shooting star timer
    if (!this.shootingStar.active) {
      this.shootingStar.cooldown -= dt;
      if (this.shootingStar.cooldown <= 0 && this.width > 0) {
        this.shootingStar.active = true;
        this.shootingStar.progress = 0;
        this.shootingStar.x = this.width * (0.2 + Math.random() * 0.45);
        this.shootingStar.y = this.height * (0.08 + Math.random() * 0.25);
        this.shootingStar.vx = 180 + Math.random() * 90;
        this.shootingStar.vy = 55 + Math.random() * 35;
        this.shootingStar.length = 64 + Math.random() * 36;
        this.shootingStar.duration = 0.95;
      }
    } else {
      this.shootingStar.progress += dt / this.shootingStar.duration;
      if (this.shootingStar.progress >= 1) {
        this.shootingStar.active = false;
        this.shootingStar.cooldown = 5.5 + Math.random() * 4.5;
      }
    }
  }

  private drawFrame(t: number, _dt: number) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    if (!ctx || w === 0 || h === 0) return;
    void _dt;

    ctx.clearRect(0, 0, w, h);

    const pxOffset = (this.pointerX - 0.5) * 16;
    const pyOffset = (this.pointerY - 0.5) * 12;

    // 1. Deep Nocturnal Base Gradient (Astrolabio Nocturno)
    const baseGrad = ctx.createLinearGradient(0, 0, w, h);
    baseGrad.addColorStop(0, "#0B1120");
    baseGrad.addColorStop(0.52, "#141D30");
    baseGrad.addColorStop(1, "#1E2D4F");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Ambient Celestial Luminescence
    const indigoGlow = ctx.createRadialGradient(
      w * 0.78 - pxOffset * 0.8,
      h * 0.42 - pyOffset * 0.8,
      h * 0.05,
      w * 0.78,
      h * 0.42,
      w * 0.6
    );
    indigoGlow.addColorStop(0, "rgba(74, 101, 155, 0.30)");
    indigoGlow.addColorStop(0.55, "rgba(30, 45, 79, 0.14)");
    indigoGlow.addColorStop(1, "rgba(15, 23, 42, 0)");
    ctx.fillStyle = indigoGlow;
    ctx.fillRect(0, 0, w, h);

    const goldGlow = ctx.createRadialGradient(
      w * 0.14 + pxOffset * 0.5,
      h * 0.86 + pyOffset * 0.5,
      10,
      w * 0.14,
      h * 0.86,
      w * 0.52
    );
    goldGlow.addColorStop(0, "rgba(184, 138, 68, 0.22)");
    goldGlow.addColorStop(0.55, "rgba(184, 138, 68, 0.06)");
    goldGlow.addColorStop(1, "rgba(184, 138, 68, 0)");
    ctx.fillStyle = goldGlow;
    ctx.fillRect(0, 0, w, h);

    // 3. Parallax Twinkling Starfield
    for (const star of this.stars) {
      const sx = star.x * w - pxOffset * star.depth * 0.55;
      const sy = star.y * h - pyOffset * star.depth * 0.55;
      const twinkle =
        0.65 + 0.35 * Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
      const alpha = star.baseAlpha * twinkle;

      ctx.fillStyle = star.isSparkle
        ? `rgba(245, 236, 215, ${alpha.toFixed(3)})`
        : `rgba(226, 232, 244, ${(alpha * 0.85).toFixed(3)})`;

      ctx.beginPath();
      ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);
      ctx.fill();

      if (star.isSparkle) {
        const arm = star.radius * 3.8 * twinkle;
        ctx.strokeStyle = `rgba(217, 186, 124, ${(alpha * 0.55).toFixed(3)})`;
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(sx - arm, sy);
        ctx.lineTo(sx + arm, sy);
        ctx.moveTo(sx, sy - arm);
        ctx.lineTo(sx, sy + arm);
        ctx.stroke();
      }
    }

    // 4. Subtle Constellation Accent (upper-left)
    const cPoints = [
      [0.09, 0.24],
      [0.18, 0.16],
      [0.29, 0.21],
      [0.37, 0.13],
    ].map(([rx, ry]) => [rx * w - pxOffset * 0.3, ry * h - pyOffset * 0.3]);

    ctx.strokeStyle = "rgba(217, 186, 124, 0.14)";
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    cPoints.forEach(([x, y], idx) => {
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    for (const [x, y] of cPoints) {
      ctx.fillStyle = "rgba(233, 214, 174, 0.55)";
      ctx.beginPath();
      ctx.arc(x, y, 1.35, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5. Rotating Brass Astrolabe Dial (off-right focal art)
    const cx = w * 0.79 - pxOffset * 0.35;
    const cy = h * 0.5 - pyOffset * 0.35;
    const outerR = h * 0.64;
    const midR = h * 0.45;
    const innerR = h * 0.24;

    ctx.save();
    ctx.translate(cx, cy);

    // Outer graduated zodiac ring (slow clockwise)
    ctx.save();
    ctx.rotate(t * 0.055);
    ctx.strokeStyle = "rgba(217, 186, 124, 0.28)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, outerR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(217, 186, 124, 0.14)";
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.arc(0, 0, outerR - 8, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < 72; i++) {
      const angle = (i / 72) * Math.PI * 2;
      const isMajor = i % 6 === 0;
      const tickLen = isMajor ? 10 : 4.5;
      const r1 = outerR;
      const r2 = outerR - tickLen;
      ctx.strokeStyle = isMajor
        ? "rgba(233, 214, 174, 0.48)"
        : "rgba(217, 186, 124, 0.20)";
      ctx.lineWidth = isMajor ? 1.1 : 0.65;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
      ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
      ctx.stroke();
    }
    ctx.restore();

    // Middle ecliptic dashed orbit (clockwise) + orbiting planets
    ctx.save();
    ctx.rotate(t * 0.085);
    ctx.setLineDash([3, 5]);
    ctx.strokeStyle = "rgba(217, 186, 124, 0.30)";
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.arc(0, 0, midR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    const planets = [
      { angle: 0.4, r: midR, size: 3.1, color: "#E9D6AE", glow: "rgba(233, 214, 174, 0.45)" },
      { angle: 2.55, r: midR, size: 2.2, color: "#C3CFE6", glow: "rgba(195, 207, 230, 0.38)" },
      { angle: 4.5, r: innerR, size: 2.4, color: "#C89F55", glow: "rgba(200, 159, 85, 0.45)" },
    ];
    for (const p of planets) {
      const px = Math.cos(p.angle) * p.r;
      const py = Math.sin(p.angle) * p.r;
      const pHalo = ctx.createRadialGradient(px, py, 0.5, px, py, p.size * 4);
      pHalo.addColorStop(0, p.glow);
      pHalo.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = pHalo;
      ctx.beginPath();
      ctx.arc(px, py, p.size * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Inner equatorial ring + meridian ellipses
    ctx.save();
    ctx.rotate(t * 0.035);
    ctx.strokeStyle = "rgba(217, 186, 124, 0.22)";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(0, 0, innerR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(217, 186, 124, 0.14)";
    ctx.beginPath();
    ctx.ellipse(0, 0, midR, midR * 0.36, Math.PI / 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 0, midR, midR * 0.36, -Math.PI / 6, 0, Math.PI * 2);
    ctx.stroke();

    // Central 8-point compass rose star
    const drawStar = (points: number, outer: number, inner: number, fill: string) => {
      ctx.beginPath();
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outer : inner;
        const a = (i * Math.PI) / points - Math.PI / 2;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
    };
    drawStar(4, 15, 3.2, "rgba(233, 214, 174, 0.62)");
    ctx.rotate(Math.PI / 4);
    drawStar(4, 10, 2.2, "rgba(200, 159, 85, 0.42)");
    ctx.restore();

    ctx.restore();

    // 6. Micro Shooting Star
    if (this.shootingStar.active) {
      const p = this.shootingStar.progress;
      const fade = Math.sin(p * Math.PI);
      const sx = this.shootingStar.x + this.shootingStar.vx * p;
      const sy = this.shootingStar.y + this.shootingStar.vy * p;
      const norm = Math.hypot(this.shootingStar.vx, this.shootingStar.vy) || 1;
      const tx = sx - (this.shootingStar.vx / norm) * this.shootingStar.length;
      const ty = sy - (this.shootingStar.vy / norm) * this.shootingStar.length;

      const trail = ctx.createLinearGradient(sx, sy, tx, ty);
      trail.addColorStop(0, `rgba(245, 236, 215, ${(0.85 * fade).toFixed(3)})`);
      trail.addColorStop(0.35, `rgba(217, 186, 124, ${(0.45 * fade).toFixed(3)})`);
      trail.addColorStop(1, "rgba(217, 186, 124, 0)");

      ctx.strokeStyle = trail;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(tx, ty);
      ctx.stroke();
    }

    // 7. Interactive Specular Gold Foil Sheen + Idle Metallic Shimmer
    const idleSweep = ((t * 0.14) % 1.8) - 0.4;
    const sweepCenter = this.isHovered
      ? this.pointerX
      : idleSweep;
    const sheenAlpha = this.isHovered ? 0.15 : 0.055;

    const sheenGrad = ctx.createLinearGradient(
      (sweepCenter - 0.35) * w,
      0,
      (sweepCenter + 0.35) * w,
      h
    );
    sheenGrad.addColorStop(0, "rgba(245, 236, 215, 0)");
    sheenGrad.addColorStop(0.5, `rgba(245, 236, 215, ${sheenAlpha.toFixed(3)})`);
    sheenGrad.addColorStop(1, "rgba(245, 236, 215, 0)");
    ctx.fillStyle = sheenGrad;
    ctx.fillRect(0, 0, w, h);

    if (this.hoverMix > 0.01) {
      const spot = ctx.createRadialGradient(
        this.pointerX * w,
        this.pointerY * h,
        4,
        this.pointerX * w,
        this.pointerY * h,
        w * 0.42
      );
      spot.addColorStop(
        0,
        `rgba(245, 236, 215, ${(0.16 * this.hoverMix).toFixed(3)})`
      );
      spot.addColorStop(
        0.5,
        `rgba(217, 186, 124, ${(0.06 * this.hoverMix).toFixed(3)})`
      );
      spot.addColorStop(1, "rgba(217, 186, 124, 0)");
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, w, h);
    }

    // 8. Fine Inner Engraved Gold Frame
    const pad = 10;
    const r = 12;
    ctx.strokeStyle = "rgba(217, 186, 124, 0.24)";
    ctx.lineWidth = 0.85;
    ctx.beginPath();
    ctx.roundRect(pad, pad, w - pad * 2, h - pad * 2, r);
    ctx.stroke();
  }

  render() {
    return html`<slot></slot>`;
  }
}

if (
  typeof customElements !== "undefined" &&
  !customElements.get("celestial-gift-card")
) {
  customElements.define("celestial-gift-card", CelestialGiftCard);
}
