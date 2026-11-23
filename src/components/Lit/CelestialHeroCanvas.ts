import { LitElement, html } from "lit";

interface HeroStar {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  depth: number;
  isSparkle: boolean;
}

interface OrbitingBody {
  orbitRatio: number;
  speed: number;
  startAngle: number;
  size: number;
  color: string;
  glow: string;
  hasRing?: boolean;
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

const HOUSE_NUMERALS = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];

const BODIES: OrbitingBody[] = [
  {
    orbitRatio: 0.73,
    speed: 0.09,
    startAngle: 0.45,
    size: 4.2,
    color: "#F5ECD7",
    glow: "rgba(233, 214, 174, 0.55)",
  },
  {
    orbitRatio: 0.73,
    speed: -0.06,
    startAngle: 2.65,
    size: 3.1,
    color: "#C3CFE6",
    glow: "rgba(195, 207, 230, 0.45)",
  },
  {
    orbitRatio: 0.54,
    speed: 0.13,
    startAngle: 4.15,
    size: 3.4,
    color: "#D9BA7C",
    glow: "rgba(217, 186, 124, 0.50)",
    hasRing: true,
  },
  {
    orbitRatio: 0.54,
    speed: 0.075,
    startAngle: 1.55,
    size: 2.6,
    color: "#E9D6AE",
    glow: "rgba(233, 214, 174, 0.40)",
  },
  {
    orbitRatio: 0.35,
    speed: -0.16,
    startAngle: 5.2,
    size: 2.5,
    color: "#9BB0D4",
    glow: "rgba(155, 176, 212, 0.45)",
  },
];

const seededRandom = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

export class CelestialHeroCanvas extends LitElement {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private heroStage: HTMLElement | null = null;
  private rafId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;

  private width = 0;
  private height = 0;
  private isVisible = true;
  private reducedMotion = false;
  private startTime = 0;
  private lastFrameTime = 0;

  private isHovered = false;
  private targetPointerX = 0.72;
  private targetPointerY = 0.48;
  private pointerX = 0.72;
  private pointerY = 0.48;
  private hoverMix = 0;

  private stars: HeroStar[] = [];
  private shootingStar: ShootingStar = {
    active: false,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    length: 110,
    progress: 0,
    duration: 1.05,
    cooldown: 2.8,
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
    this.heroStage?.removeEventListener("pointermove", this.handlePointerMove);
    this.heroStage?.removeEventListener(
      "pointerenter",
      this.handlePointerEnter
    );
    this.heroStage?.removeEventListener(
      "pointerleave",
      this.handlePointerLeave
    );
  }

  private initStars() {
    const rand = seededRandom(19840911);
    this.stars = Array.from({ length: 115 }, (_, i) => ({
      x: rand(),
      y: rand(),
      radius: 0.45 + rand() * 1.45,
      baseAlpha: 0.2 + rand() * 0.68,
      twinkleSpeed: 0.55 + rand() * 1.5,
      twinkleOffset: rand() * Math.PI * 2,
      depth: 0.25 + rand() * 0.95,
      isSparkle: i < 11,
    }));
  }

  private setupCanvas() {
    this.canvas = this.querySelector<HTMLCanvasElement>("[data-hero-canvas]");
    this.heroStage = this.querySelector<HTMLElement>("[data-hero-stage]");
    if (!this.canvas || !this.heroStage) return;

    this.ctx = this.canvas.getContext("2d");
    if (!this.ctx) return;

    this.resizeCanvas();

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
      if (this.reducedMotion) {
        this.drawFrame(0);
      } else if (this.isVisible && this.width > 0 && this.rafId === null) {
        this.startLoop();
      }
    });
    this.resizeObserver.observe(this.heroStage);

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
      { threshold: 0.02 }
    );
    this.intersectionObserver.observe(this.heroStage);

    this.heroStage.addEventListener("pointermove", this.handlePointerMove);
    this.heroStage.addEventListener("pointerenter", this.handlePointerEnter);
    this.heroStage.addEventListener("pointerleave", this.handlePointerLeave);

    if (this.reducedMotion) {
      this.drawFrame(0);
    } else {
      this.startLoop();
    }
  }

  private resizeCanvas() {
    if (!this.canvas || !this.heroStage || !this.ctx) return;
    const rect = this.heroStage.getBoundingClientRect();
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
    if (!this.heroStage) return;
    const rect = this.heroStage.getBoundingClientRect();
    this.targetPointerX = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    this.targetPointerY = Math.max(
      0,
      Math.min(1, (e.clientY - rect.top) / rect.height)
    );
  };

  private handlePointerLeave = () => {
    this.isHovered = false;
    this.targetPointerX = 0.72;
    this.targetPointerY = 0.48;
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
      this.drawFrame(elapsed);

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
    const ease = 1 - Math.exp(-5 * dt);
    this.pointerX += (this.targetPointerX - this.pointerX) * ease;
    this.pointerY += (this.targetPointerY - this.pointerY) * ease;

    const targetMix = this.isHovered ? 1 : 0;
    this.hoverMix += (targetMix - this.hoverMix) * (1 - Math.exp(-4.5 * dt));

    if (!this.shootingStar.active) {
      this.shootingStar.cooldown -= dt;
      if (this.shootingStar.cooldown <= 0 && this.width > 0) {
        this.shootingStar.active = true;
        this.shootingStar.progress = 0;
        this.shootingStar.x = this.width * (0.25 + Math.random() * 0.45);
        this.shootingStar.y = this.height * (0.08 + Math.random() * 0.25);
        this.shootingStar.vx = 240 + Math.random() * 110;
        this.shootingStar.vy = 65 + Math.random() * 45;
        this.shootingStar.length = 95 + Math.random() * 55;
        this.shootingStar.duration = 1.05;
      }
    } else {
      this.shootingStar.progress += dt / this.shootingStar.duration;
      if (this.shootingStar.progress >= 1) {
        this.shootingStar.active = false;
        this.shootingStar.cooldown = 5.5 + Math.random() * 5;
      }
    }
  }

  private drawFrame(t: number) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    if (!ctx || w === 0 || h === 0) return;

    const isDesktop = w >= 900;
    const pxOffset = (this.pointerX - 0.5) * 26;
    const pyOffset = (this.pointerY - 0.5) * 18;

    ctx.clearRect(0, 0, w, h);

    // 1. Deep Nocturnal Sky Base
    const skyGrad = ctx.createLinearGradient(0, 0, w, h);
    skyGrad.addColorStop(0, "#0B1120");
    skyGrad.addColorStop(0.5, "#121C33");
    skyGrad.addColorStop(1, "#1C2B4B");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    const cx = (isDesktop ? w * 0.74 : w * 0.5) - pxOffset * 0.4;
    const cy = (isDesktop ? h * 0.5 : h * 0.52) - pyOffset * 0.4;
    const outerR = isDesktop
      ? Math.min(h * 0.43, w * 0.24)
      : Math.min(w * 0.44, h * 0.34);
    const dialAlphaScale = isDesktop ? 1 : 0.42;

    // 2. Ambient Cosmic Luminescence (Indigo + Warm Antique Gold)
    const indigoAura = ctx.createRadialGradient(
      cx,
      cy,
      outerR * 0.08,
      cx,
      cy,
      outerR * 1.9
    );
    indigoAura.addColorStop(0, "rgba(74, 101, 155, 0.34)");
    indigoAura.addColorStop(0.5, "rgba(36, 53, 91, 0.16)");
    indigoAura.addColorStop(1, "rgba(11, 17, 32, 0)");
    ctx.fillStyle = indigoAura;
    ctx.fillRect(0, 0, w, h);

    const goldAura = ctx.createRadialGradient(
      cx - outerR * 0.25,
      cy + outerR * 0.35,
      outerR * 0.05,
      cx,
      cy,
      outerR * 1.45
    );
    goldAura.addColorStop(0, "rgba(184, 138, 68, 0.16)");
    goldAura.addColorStop(0.55, "rgba(184, 138, 68, 0.05)");
    goldAura.addColorStop(1, "rgba(184, 138, 68, 0)");
    ctx.fillStyle = goldAura;
    ctx.fillRect(0, 0, w, h);

    // Subtle lower-left warm accent
    const leftWarmth = ctx.createRadialGradient(
      w * 0.12 + pxOffset * 0.3,
      h * 0.9,
      10,
      w * 0.12,
      h * 0.9,
      w * 0.42
    );
    leftWarmth.addColorStop(0, "rgba(184, 138, 68, 0.12)");
    leftWarmth.addColorStop(1, "rgba(184, 138, 68, 0)");
    ctx.fillStyle = leftWarmth;
    ctx.fillRect(0, 0, w, h);

    // 3. Multi-Depth Parallax Starfield
    for (const star of this.stars) {
      const sx = star.x * w - pxOffset * star.depth * 0.65;
      const sy = star.y * h - pyOffset * star.depth * 0.65;
      const twinkle =
        0.62 + 0.38 * Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
      const alpha = star.baseAlpha * twinkle;

      ctx.fillStyle = star.isSparkle
        ? `rgba(245, 236, 215, ${alpha.toFixed(3)})`
        : `rgba(226, 232, 244, ${(alpha * 0.85).toFixed(3)})`;

      ctx.beginPath();
      ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);
      ctx.fill();

      if (star.isSparkle) {
        const arm = star.radius * 4.2 * twinkle;
        ctx.strokeStyle = `rgba(217, 186, 124, ${(alpha * 0.55).toFixed(3)})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(sx - arm, sy);
        ctx.lineTo(sx + arm, sy);
        ctx.moveTo(sx, sy - arm);
        ctx.lineTo(sx, sy + arm);
        ctx.stroke();
      }
    }

    // 4. Delicate Upper-Left Constellation Thread (desktop)
    if (isDesktop) {
      const constPts = [
        [0.05, 0.16],
        [0.12, 0.11],
        [0.19, 0.15],
        [0.26, 0.09],
        [0.33, 0.13],
      ].map(([rx, ry]) => [rx * w - pxOffset * 0.25, ry * h - pyOffset * 0.25]);

      ctx.strokeStyle = "rgba(217, 186, 124, 0.14)";
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      constPts.forEach(([x, y], idx) => {
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      for (const [x, y] of constPts) {
        ctx.fillStyle = "rgba(233, 214, 174, 0.5)";
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 5. Grand Interactive Natal Astrolabe Wheel
    ctx.save();
    ctx.translate(cx, cy);
    ctx.globalAlpha = dialAlphaScale;

    const ringInner = outerR * 0.85;
    const eclipticR = outerR * 0.63;
    const coreR = outerR * 0.2;

    // 5a. Outer Brass Zodiac / House Band (slow clockwise)
    ctx.save();
    ctx.rotate(t * 0.028);

    // Outer & inner brass rims
    ctx.strokeStyle = "rgba(217, 186, 124, 0.34)";
    ctx.lineWidth = 1.15;
    ctx.beginPath();
    ctx.arc(0, 0, outerR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(217, 186, 124, 0.22)";
    ctx.lineWidth = 0.85;
    ctx.beginPath();
    ctx.arc(0, 0, ringInner, 0, Math.PI * 2);
    ctx.stroke();

    // 144 fine degree ticks + 36 decan ticks + 12 major house cusps
    for (let i = 0; i < 144; i++) {
      const a = (i / 144) * Math.PI * 2;
      const isHouse = i % 12 === 0;
      const isDecan = i % 4 === 0;
      const r1 = outerR;
      const r2 = isHouse
        ? ringInner
        : isDecan
          ? outerR - 8
          : outerR - 4;
      ctx.strokeStyle = isHouse
        ? "rgba(233, 214, 174, 0.45)"
        : isDecan
          ? "rgba(217, 186, 124, 0.28)"
          : "rgba(217, 186, 124, 0.14)";
      ctx.lineWidth = isHouse ? 1.0 : 0.65;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
      ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
      ctx.stroke();

      // Subtle inner house spoke rays
      if (isHouse) {
        ctx.strokeStyle = "rgba(217, 186, 124, 0.10)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * ringInner, Math.sin(a) * ringInner);
        ctx.lineTo(Math.cos(a) * coreR, Math.sin(a) * coreR);
        ctx.stroke();
      }
    }

    // 12 Roman Numerals (Houses I–XII) in Cormorant Garamond along the brass band
    const labelR = (outerR + ringInner) / 2;
    const fontSize = Math.max(10, Math.round(outerR * 0.056));
    ctx.font = `600 ${fontSize}px "Cormorant Garamond Variable", Georgia, serif`;
    ctx.fillStyle = "rgba(233, 214, 174, 0.60)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let hIdx = 0; hIdx < 12; hIdx++) {
      const midAngle = ((hIdx + 0.5) / 12) * Math.PI * 2 - Math.PI / 2;
      ctx.save();
      ctx.rotate(midAngle + Math.PI / 2);
      ctx.fillText(HOUSE_NUMERALS[hIdx], 0, -labelR);
      ctx.restore();
    }
    ctx.restore();

    // 5b. Counter-Rotating Dashed Ecliptic & Orbital Rings
    ctx.save();
    ctx.rotate(-t * 0.045);
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = "rgba(217, 186, 124, 0.28)";
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.arc(0, 0, eclipticR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Meridian astrolabe ellipses
    ctx.strokeStyle = "rgba(195, 207, 230, 0.13)";
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.ellipse(0, 0, outerR * 0.73, outerR * 0.28, Math.PI / 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 0, outerR * 0.73, outerR * 0.28, -Math.PI / 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Concentric planetary orbit tracks
    for (const ratio of [0.73, 0.54, 0.35]) {
      ctx.strokeStyle = "rgba(217, 186, 124, 0.14)";
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.arc(0, 0, outerR * ratio, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 5c. Compute Live Planetary Positions & Draw Dynamic Natal Aspect Web
    const bodyPositions = BODIES.map((body) => {
      const angle = body.startAngle + t * body.speed;
      const r = outerR * body.orbitRatio;
      return {
        body,
        angle,
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
      };
    });

    // Dynamic geometric aspect chords between orbiting bodies
    for (let i = 0; i < bodyPositions.length; i++) {
      for (let j = i + 1; j < bodyPositions.length; j++) {
        const a = bodyPositions[i];
        const b = bodyPositions[j];
        let diff = Math.abs((a.angle - b.angle) % (Math.PI * 2));
        if (diff > Math.PI) diff = Math.PI * 2 - diff;
        const deg = (diff * 180) / Math.PI;

        // Highlight classic Ptolemaic aspects: sextile (60), square (90), trine (120), opposition (180)
        const aspectTargets = [
          { target: 60, color: "217, 186, 124" },
          { target: 120, color: "233, 214, 174" },
          { target: 90, color: "155, 176, 212" },
          { target: 180, color: "195, 207, 230" },
        ];
        for (const asp of aspectTargets) {
          const orb = Math.abs(deg - asp.target);
          if (orb < 14) {
            const strength = (1 - orb / 14) * 0.28;
            ctx.strokeStyle = `rgba(${asp.color}, ${strength.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            break;
          }
        }
      }
    }

    // Render glowing planetary bodies
    for (const { body, x, y } of bodyPositions) {
      const halo = ctx.createRadialGradient(x, y, 0.5, x, y, body.size * 4.5);
      halo.addColorStop(0, body.glow);
      halo.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(x, y, body.size * 4.5, 0, Math.PI * 2);
      ctx.fill();

      if (body.hasRing) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-0.45);
        ctx.strokeStyle = "rgba(233, 214, 174, 0.65)";
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.ellipse(0, 0, body.size * 2.3, body.size * 0.72, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      ctx.fillStyle = body.color;
      ctx.beginPath();
      ctx.arc(x, y, body.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // 5d. Inner Core Ring & Central 8-Point Celestial Compass Rose
    ctx.strokeStyle = "rgba(217, 186, 124, 0.30)";
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.arc(0, 0, coreR, 0, Math.PI * 2);
    ctx.stroke();

    const coreHalo = ctx.createRadialGradient(0, 0, 2, 0, 0, coreR * 1.4);
    coreHalo.addColorStop(0, "rgba(233, 214, 174, 0.22)");
    coreHalo.addColorStop(1, "rgba(233, 214, 174, 0)");
    ctx.fillStyle = coreHalo;
    ctx.beginPath();
    ctx.arc(0, 0, coreR * 1.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.rotate(t * 0.03);
    const drawCompass = (outer: number, inner: number, fill: string) => {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const r = i % 2 === 0 ? outer : inner;
        const a = (i * Math.PI) / 4 - Math.PI / 2;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
    };
    const roseOuter = Math.max(18, coreR * 0.65);
    drawCompass(roseOuter, roseOuter * 0.2, "rgba(233, 214, 174, 0.72)");
    ctx.rotate(Math.PI / 4);
    drawCompass(roseOuter * 0.68, roseOuter * 0.14, "rgba(184, 138, 68, 0.48)");
    ctx.restore();

    ctx.restore(); // End astrolabe transform

    // 6. Micro Golden Shooting Star
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
      trail.addColorStop(
        0.35,
        `rgba(217, 186, 124, ${(0.42 * fade).toFixed(3)})`
      );
      trail.addColorStop(1, "rgba(217, 186, 124, 0)");

      ctx.strokeStyle = trail;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(tx, ty);
      ctx.stroke();
    }

    // 7. Subtle Interactive Starlight Cursor Halo (desktop)
    if (this.hoverMix > 0.01 && isDesktop) {
      const spot = ctx.createRadialGradient(
        this.pointerX * w,
        this.pointerY * h,
        6,
        this.pointerX * w,
        this.pointerY * h,
        220
      );
      spot.addColorStop(
        0,
        `rgba(245, 236, 215, ${(0.09 * this.hoverMix).toFixed(3)})`
      );
      spot.addColorStop(
        0.5,
        `rgba(217, 186, 124, ${(0.03 * this.hoverMix).toFixed(3)})`
      );
      spot.addColorStop(1, "rgba(217, 186, 124, 0)");
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, w, h);
    }

    // 8. Soft Left Readability Scrim (ensures crisp text legibility on left without dulling right astrolabe)
    if (isDesktop) {
      const readScrim = ctx.createLinearGradient(0, 0, w * 0.62, 0);
      readScrim.addColorStop(0, "rgba(11, 17, 32, 0.52)");
      readScrim.addColorStop(0.65, "rgba(11, 17, 32, 0.22)");
      readScrim.addColorStop(1, "rgba(11, 17, 32, 0)");
      ctx.fillStyle = readScrim;
      ctx.fillRect(0, 0, w * 0.62, h);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

if (
  typeof customElements !== "undefined" &&
  !customElements.get("celestial-hero-canvas")
) {
  customElements.define("celestial-hero-canvas", CelestialHeroCanvas);
}
