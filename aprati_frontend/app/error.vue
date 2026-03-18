<template>
  <div class="cyberpunk-error">
    <!-- Scan Lines Effect -->
    <div class="scan-lines"></div>
    
    <!-- Grid Background -->
    <div class="grid-bg"></div>

    <!-- Neon Particles -->
    <div class="particles">
      <div v-for="(particle, i) in particles" :key="i" class="particle"
        :style="{
          left: particle.left,
          top: particle.top,
          animationDelay: particle.delay,
          animationDuration: particle.duration
        }">
      </div>
    </div>

    <!-- Loading -->
    <Transition name="cyber-fade">
      <div v-if="isLoading" class="cyber-loader">
        <div class="hexagon-loader">
          <div class="hex-ring" v-for="i in 3" :key="i"></div>
          <img src="/images/Grape Character.png" alt="" class="hex-fruit" />
        </div>
        <div class="glitch-text" data-text="LOADING">LOADING</div>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <Transition name="glitch">
      <div v-if="!isLoading" class="cyber-content">
        <!-- Header -->
        <div class="cyber-header">
          <div class="header-content">
            <div class="brand-section">
              <div class="logo-glow">
                <img src="/images/Company Logo-01.png" alt="APRATI" class="brand-logo-img" />
              </div>
              <span class="brand-tagline">Premium Fruit Products</span>
            </div>
            <nav class="cyber-nav">
              <a href="/" class="nav-link">
                <span class="nav-icon">🏠</span>
                <span>Home</span>
              </a>
              <a href="/brands" class="nav-link">
                <span class="nav-icon">🏆</span>
                <span>Brands</span>
              </a>
              <a href="/about" class="nav-link">
                <span class="nav-icon">ℹ️</span>
                <span>About</span>
              </a>
              <a href="/contact" class="nav-link">
                <span class="nav-icon">📧</span>
                <span>Contact</span>
              </a>
            </nav>
          </div>
        </div>

        <!-- Hero Section -->
        <div class="hero-box">
          <div class="neon-border"></div>
          
          <!-- Floating Fruits -->
          <div class="fruit-orbit">
            <div v-for="(fruit, i) in fruits" :key="i" 
              class="orbit-fruit"
              :style="{ 
                '--angle': `${i * 60}deg`,
                animationDelay: `${i * -0.5}s`
              }">
              <div class="fruit-glow">
                <img :src="fruit.src" :alt="fruit.name" />
              </div>
            </div>
          </div>

          <!-- Error Code -->
          <div class="holo-badge">
            <span class="holo-text">ERROR</span>
            <span class="holo-code">{{ error?.statusCode || '404' }}</span>
          </div>

          <!-- Main Message -->
          <div class="cyber-msg">
            <h1 class="glitch-title" data-text="PAGE NOT FOUND">
              <span v-if="error?.statusCode === 404">PAGE NOT FOUND</span>
              <span v-else>SYSTEM ERROR</span>
            </h1>
            
            <div class="product-showcase">
              <div class="showcase-header">
                <div class="header-line"></div>
                <h3 class="showcase-title">{{ error?.statusCode === 404 ? 'DISCOVER OUR PREMIUM PRODUCTS' : 'EXPLORE OUR COLLECTION' }}</h3>
                <div class="header-line"></div>
              </div>
              
              <div class="products-grid">
                <a v-for="(product, index) in featuredProducts" :key="index" :href="product.link" class="product-card">
                  <div class="card-shine"></div>
                  <div class="product-image-wrapper">
                    <div class="image-glow"></div>
                    <img :src="product.image" :alt="product.name" class="product-img" />
                    <div class="scan-effect"></div>
                  </div>
                  <div class="product-info">
                    <div class="product-brand">{{ product.brand }}</div>
                    <div class="product-name">{{ product.name }}</div>
                    <div class="product-status">
                      <span class="status-dot"></span>
                      <span class="status-text">AVAILABLE</span>
                    </div>
                  </div>
                  <div class="card-corners-glow">
                    <span class="glow-corner top-left"></span>
                    <span class="glow-corner top-right"></span>
                    <span class="glow-corner bottom-left"></span>
                    <span class="glow-corner bottom-right"></span>
                  </div>
                </a>
              </div>
              
              <p class="showcase-message">
                <span class="message-icon">⚡</span>
                <span v-if="error?.statusCode === 404">The page you're looking for doesn't exist, but these premium products do!</span>
                <span v-else>Something went wrong, but our delicious products are still waiting for you!</span>
              </p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="cyber-actions">
            <a href="/" class="neon-btn cyan">
              <span class="btn-glow"></span>
              <span class="btn-content">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                HOME
              </span>
            </a>

            <a href="/brands" class="neon-btn magenta">
              <span class="btn-glow"></span>
              <span class="btn-content">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                BRANDS
              </span>
            </a>

            <button @click="goBack" class="neon-btn yellow">
              <span class="btn-glow"></span>
              <span class="btn-content">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                BACK
              </span>
            </button>
          </div>
        </div>

        <!-- Quick Access Grid -->
        <div class="access-grid">
          <a v-for="link in quickLinks" :key="link.to" :href="link.to" class="grid-card">
            <div class="card-corners">
              <span class="corner tl"></span>
              <span class="corner tr"></span>
              <span class="corner bl"></span>
              <span class="corner br"></span>
            </div>
            <div class="card-icon">{{ link.emoji }}</div>
            <div class="card-name">{{ link.label }}</div>
            <div class="card-arrow">→</div>
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
defineProps({
  error: Object
})

const isLoading = ref(true)

// Generate particles on client side only
const particles = ref([])

const fruits = [
  { name: 'Grape', src: '/images/Grape Character.png' },
  { name: 'Orange', src: '/images/Orange Charactor.png' },
  { name: 'Pineapple', src: '/images/Pineapple Character copy.png' },
  { name: 'Guava', src: '/images/Guava Charactor.png' },
  { name: 'Tamarin', src: '/images/Tamarin Character.png' },
  { name: 'Plum', src: '/images/Plum CHARACTER.png' }
]

const quickLinks = [
  { to: '/', label: 'Home', emoji: '🏠' },
  { to: '/brands', label: 'Brands', emoji: '🏆' },
  { to: '/about', label: 'About', emoji: 'ℹ️' },
  { to: '/contact', label: 'Contact', emoji: '📧' }
]

const featuredProducts = [
  { name: 'Grape ', brand: 'APRATI', image: '/images/Grape Character.png', link: '/brands' },
  { name: 'Orange ', brand: 'FRUTATI', image: '/images/Orange Charactor.png', link: '/brands' },
  { name: 'Pineapple ', brand: 'MOCATI', image: '/images/Pineapple Character copy.png', link: '/brands' },
  { name: 'Guava ', brand: 'APRATI', image: '/images/Guava Charactor.png', link: '/brands' }
]

onMounted(() => {
  // Generate particles on client side to avoid SSR hydration mismatch
  particles.value = Array.from({ length: 20 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${2 + Math.random() * 3}s`
  }))
  
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})

const goBack = () => {
  if (process.client && window.history.length > 1) {
    window.history.back()
  } else {
    navigateTo('/')
  }
}

useSeoMeta({
  title: 'Page Not Found - Aprati Foods',
  description: 'The page you are looking for could not be found.'
})
</script>

<style scoped>
/* Neon Cyberpunk Style */
.cyberpunk-error {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1b3d 50%, #0f1729 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* Scan Lines */
.scan-lines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 128, 255, 0.03) 0px,
    rgba(0, 128, 255, 0.03) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  animation: scan 8s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(0); }
  100% { transform: translateY(20px); }
}

/* Grid Background */
.grid-bg {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 128, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 128, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
  100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
}

/* Neon Particles */
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #0080ff;
  border-radius: 50%;
  box-shadow: 0 0 10px #0080ff, 0 0 20px #0080ff, 0 0 30px #0080ff;
  animation: float-particle linear infinite;
}

@keyframes float-particle {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(50px);
    opacity: 0;
  }
}

/* Cyber Loader */
.cyber-loader {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1b3d 50%, #0f1729 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.hexagon-loader {
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 2rem;
}

.hex-ring {
  position: absolute;
  inset: 0;
  border: 3px solid transparent;
  border-radius: 10px;
  transform: rotate(45deg);
}

.hex-ring:nth-child(1) {
  border-color: #0080ff;
  animation: hex-spin 2s linear infinite;
  box-shadow: 0 0 20px #0080ff;
}

.hex-ring:nth-child(2) {
  inset: 20px;
  border-color: #ff6600;
  animation: hex-spin 2s linear infinite reverse;
  animation-delay: 0.3s;
  box-shadow: 0 0 20px #ff6600;
}

.hex-ring:nth-child(3) {
  inset: 40px;
  border-color: #ff0033;
  animation: hex-spin 2s linear infinite;
  animation-delay: 0.6s;
  box-shadow: 0 0 20px #ff0033;
}

@keyframes hex-spin {
  to { transform: rotate(405deg); }
}

.hex-fruit {
  position: absolute;
  inset: 50px;
  width: 50px;
  height: 50px;
  object-fit: contain;
  animation: pulse-glow 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 10px #0080ff);
}

@keyframes pulse-glow {
  0%, 100% { 
    transform: scale(1);
    filter: drop-shadow(0 0 10px #0080ff);
  }
  50% { 
    transform: scale(1.2);
    filter: drop-shadow(0 0 20px #0080ff) drop-shadow(0 0 30px #ff6600);
  }
}

.glitch-text {
  font-size: 1.5rem;
  font-weight: 900;
  color: #0080ff;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin-bottom: 1.5rem;
  position: relative;
  text-shadow: 
    0 0 10px #0080ff,
    0 0 20px #0080ff,
    0 0 30px #0080ff;
}

.progress-bar {
  width: 300px;
  height: 4px;
  background: rgba(0, 128, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  box-shadow: inset 0 0 10px rgba(0, 128, 255, 0.3);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #0080ff, #ff6600, #ff0033);
  animation: progress 2s ease-in-out infinite;
  box-shadow: 0 0 10px #0080ff;
}

@keyframes progress {
  0% { width: 0%; }
  50% { width: 100%; }
  100% { width: 0%; }
}

/* Cyber Content */
.cyber-content {
  width: 100%;
  max-width: 1400px;
  position: relative;
  z-index: 10;
  padding: 2rem 1rem;
}

/* Cyber Header */
.cyber-header {
  margin-bottom: 2rem;
  animation: header-slide 0.8s ease-out;
}

@keyframes header-slide {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-content {
  background: rgba(10, 14, 39, 0.6);
  border: 1px solid rgba(0, 128, 255, 0.2);
  border-radius: 15px;
  padding: 1.5rem 2rem;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  box-shadow: 
    0 0 30px rgba(0, 128, 255, 0.1),
    inset 0 0 30px rgba(0, 128, 255, 0.03);
}

@media (min-width: 768px) {
  .header-content {
    padding: 1.5rem 2.5rem;
  }
}

.brand-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.logo-glow {
  position: relative;
  display: inline-block;
}

.brand-logo {
  font-size: 1.75rem;
  font-weight: 900;
  color: #0080ff;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin: 0;
  text-shadow: 
    0 0 10px #0080ff,
    0 0 20px #0080ff,
    0 0 30px #0080ff,
    2px 2px 0 rgba(255, 102, 0, 0.5);
  animation: logo-glow 3s ease-in-out infinite;
}

@media (min-width: 768px) {
  .brand-logo {
    font-size: 2rem;
  }
}

@keyframes logo-glow {
  0%, 100% { 
    filter: brightness(1);
    text-shadow: 
      0 0 10px #0080ff,
      0 0 20px #0080ff,
      0 0 30px #0080ff,
      2px 2px 0 rgba(255, 102, 0, 0.5);
  }
  50% { 
    filter: brightness(1.3);
    text-shadow: 
      0 0 20px #0080ff,
      0 0 30px #0080ff,
      0 0 40px #0080ff,
      2px 2px 0 rgba(255, 102, 0, 0.8);
  }
}

.brand-logo-img {
  height: 4rem;
  width: auto;
  filter: drop-shadow(0 0 10px #0080ff) drop-shadow(0 0 20px #0080ff) drop-shadow(0 0 30px #0080ff);
  animation: logo-glow 3s ease-in-out infinite;
}

@media (min-width: 768px) {
  .brand-logo-img {
    height: 5rem;
  }
}

.brand-tagline {
  font-size: 0.75rem;
  color: rgba(0, 170, 68, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 600;
  margin-left: 0.5rem;
}

@media (min-width: 768px) {
  .brand-tagline {
    font-size: 0.8125rem;
  }
}

.cyber-nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

@media (min-width: 768px) {
  .cyber-nav {
    gap: 1rem;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: rgba(0, 128, 255, 0.05);
  border: 1px solid rgba(0, 128, 255, 0.2);
  border-radius: 8px;
  color: rgba(0, 128, 255, 0.8);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(0, 128, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.nav-link:hover::before {
  transform: translateX(100%);
}

.nav-link:hover {
  background: rgba(0, 128, 255, 0.15);
  border-color: rgba(0, 128, 255, 0.5);
  color: #0080ff;
  box-shadow: 0 0 15px rgba(0, 128, 255, 0.3);
  transform: translateY(-2px);
}

.nav-icon {
  font-size: 1rem;
  filter: drop-shadow(0 0 5px rgba(0, 128, 255, 0.5));
}

/* Hero Box */
.hero-box {
  background: rgba(10, 14, 39, 0.8);
  border: 2px solid rgba(0, 128, 255, 0.3);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  backdrop-filter: blur(20px);
  margin-bottom: 3rem;
  box-shadow: 
    0 0 60px rgba(0, 128, 255, 0.2),
    inset 0 0 60px rgba(0, 128, 255, 0.05);
}

@media (min-width: 768px) {
  .hero-box {
    padding: 4rem 3rem;
  }
}

.neon-border {
  position: absolute;
  inset: -2px;
  border-radius: 20px;
  background: linear-gradient(45deg, #0080ff, #ff6600, #ff0033, #00aa44, #0080ff);
  background-size: 400% 400%;
  opacity: 0.5;
  filter: blur(15px);
  animation: neon-rotate 3s linear infinite;
  z-index: -1;
}

@keyframes neon-rotate {
  0% { background-position: 0% 50%; }
  100% { background-position: 400% 50%; }
}

/* Fruit Orbit */
.fruit-orbit {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.orbit-fruit {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 70px;
  animation: orbit 10s linear infinite;
  transform-origin: 0 0;
}

@keyframes orbit {
  0% {
    transform: rotate(0deg) translateX(200px) rotate(0deg);
  }
  100% {
    transform: rotate(360deg) translateX(200px) rotate(-360deg);
  }
}

.fruit-glow {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 10px;
  background: rgba(0, 128, 255, 0.1);
  box-shadow: 0 0 30px rgba(0, 128, 255, 0.5);
  animation: fruit-pulse 2s ease-in-out infinite;
}

.fruit-glow img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(0, 128, 255, 0.8));
}

@keyframes fruit-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Holo Badge */
.holo-badge {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, rgba(0, 128, 255, 0.1), rgba(255, 102, 0, 0.1));
  border: 2px solid rgba(0, 128, 255, 0.5);
  border-radius: 15px;
  position: relative;
}

.holo-text {
  font-size: 0.875rem;
  font-weight: 700;
  color: #0080ff;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  text-shadow: 0 0 10px #0080ff;
  margin-bottom: 0.5rem;
}

.holo-code {
  font-size: 4rem;
  font-weight: 900;
  background: linear-gradient(135deg, #0080ff, #ff6600, #ff0033);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(0, 128, 255, 0.5);
  animation: holo-glitch 3s ease-in-out infinite;
}

@media (min-width: 768px) {
  .holo-code {
    font-size: 5rem;
  }
}

@keyframes holo-glitch {
  0%, 100% { transform: translate(0); filter: hue-rotate(0deg); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-2px, -2px); }
  80% { transform: translate(2px, 2px); filter: hue-rotate(90deg); }
}

/* Cyber Message */
.cyber-msg {
  margin-bottom: 2.5rem;
}

.glitch-title {
  font-size: 2rem;
  font-weight: 900;
  color: #0080ff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
  text-shadow: 
    0 0 10px #0080ff,
    0 0 20px #0080ff,
    0 0 30px #0080ff,
    0 0 40px #0080ff;
  animation: title-glitch 5s ease-in-out infinite;
}

@media (min-width: 768px) {
  .glitch-title {
    font-size: 2.5rem;
  }
}

@keyframes title-glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-2px, -2px); }
  80% { transform: translate(2px, 2px); }
}

/* Product Showcase */
.product-showcase {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 128, 255, 0.3);
  border-radius: 15px;
  padding: 2rem;
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 30px rgba(0, 128, 255, 0.2),
    inset 0 0 30px rgba(0, 128, 255, 0.05);
}

.showcase-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.header-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, transparent, #0080ff, transparent);
  animation: lineFlow 3s ease-in-out infinite;
}

@keyframes lineFlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.showcase-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0080ff;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-shadow: 0 0 10px #0080ff;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .showcase-title {
    font-size: 1.125rem;
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}

.product-card {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 128, 255, 0.05), rgba(255, 102, 0, 0.05));
  border: 1px solid rgba(0, 128, 255, 0.3);
  border-radius: 12px;
  padding: 1.5rem 1rem;
  text-align: center;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  opacity: 0;
  animation: cardSlideIn 0.6s ease-out forwards;
}

.product-card:nth-child(1) { animation-delay: 0.2s; }
.product-card:nth-child(2) { animation-delay: 0.3s; }
.product-card:nth-child(3) { animation-delay: 0.4s; }
.product-card:nth-child(4) { animation-delay: 0.5s; }

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-card:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: rgba(0, 128, 255, 0.6);
  box-shadow: 
    0 10px 40px rgba(0, 128, 255, 0.4),
    0 0 30px rgba(0, 128, 255, 0.3),
    inset 0 0 20px rgba(0, 128, 255, 0.1);
}

.card-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: rotate(45deg);
  transition: all 0.5s ease;
  pointer-events: none;
}

.product-card:hover .card-shine {
  left: 100%;
}

.product-image-wrapper {
  position: relative;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .product-image-wrapper {
    height: 140px;
  }
}

.image-glow {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 128, 255, 0.3), transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  filter: blur(20px);
}

.product-card:hover .image-glow {
  opacity: 1;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
}

.product-img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  filter: drop-shadow(0 5px 15px rgba(0, 128, 255, 0.3));
  transition: all 0.4s ease;
  position: relative;
  z-index: 2;
}

@media (min-width: 768px) {
  .product-img {
    width: 110px;
    height: 110px;
  }
}

.product-card:hover .product-img {
  transform: scale(1.1) rotateY(360deg);
  filter: drop-shadow(0 10px 30px rgba(0, 128, 255, 0.6));
}

.scan-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent, rgba(0, 128, 255, 0.4), transparent);
  opacity: 0;
  animation: scanMove 2s linear infinite;
}

.product-card:hover .scan-effect {
  opacity: 1;
}

@keyframes scanMove {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.product-info {
  position: relative;
  z-index: 2;
}

.product-brand {
  font-size: 0.625rem;
  font-weight: 600;
  color: #ff6600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 0.25rem;
  text-shadow: 0 0 5px rgba(255, 102, 0, 0.5);
}

@media (min-width: 768px) {
  .product-brand {
    font-size: 0.6875rem;
  }
}

.product-name {
  font-size: 0.875rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
  text-shadow: 0 0 10px rgba(0, 128, 255, 0.5);
}

@media (min-width: 768px) {
  .product-name {
    font-size: 0.9375rem;
  }
}

.product-status {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 170, 68, 0.1);
  border: 1px solid rgba(0, 170, 68, 0.3);
  border-radius: 20px;
  font-size: 0.625rem;
  font-weight: 600;
  color: #00aa44;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00aa44;
  box-shadow: 0 0 5px #00aa44;
  animation: statusBlink 2s ease-in-out infinite;
}

@keyframes statusBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.status-text {
  font-size: 0.625rem;
}

.card-corners-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.glow-corner {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.product-card:hover .glow-corner {
  opacity: 1;
  animation: cornerGlow 1.5s ease-in-out infinite;
}

.glow-corner.top-left {
  top: -1px;
  left: -1px;
  border-top: 2px solid #0080ff;
  border-left: 2px solid #0080ff;
  box-shadow: 0 0 10px #0080ff;
}

.glow-corner.top-right {
  top: -1px;
  right: -1px;
  border-top: 2px solid #ff6600;
  border-right: 2px solid #ff6600;
  box-shadow: 0 0 10px #ff6600;
}

.glow-corner.bottom-left {
  bottom: -1px;
  left: -1px;
  border-bottom: 2px solid #ff0033;
  border-left: 2px solid #ff0033;
  box-shadow: 0 0 10px #ff0033;
}

.glow-corner.bottom-right {
  bottom: -1px;
  right: -1px;
  border-bottom: 2px solid #00aa44;
  border-right: 2px solid #00aa44;
  box-shadow: 0 0 10px #00aa44;
}

@keyframes cornerGlow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.showcase-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(0, 128, 255, 0.05);
  border: 1px solid rgba(0, 128, 255, 0.2);
  border-radius: 10px;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .showcase-message {
    font-size: 0.9375rem;
  }
}

.message-icon {
  font-size: 1.25rem;
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% { 
    transform: scale(1);
    filter: drop-shadow(0 0 5px #0080ff);
  }
  50% { 
    transform: scale(1.2);
    filter: drop-shadow(0 0 15px #0080ff);
  }
}

/* Cyber Actions */
.cyber-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.neon-btn {
  position: relative;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.btn-glow {
  position: absolute;
  inset: -2px;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  filter: blur(10px);
}

.btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.neon-btn.cyan {
  border-color: #0080ff;
  color: #0080ff;
}

.neon-btn.cyan .btn-glow {
  background: #0080ff;
}

.neon-btn.cyan:hover {
  background: rgba(0, 128, 255, 0.1);
  box-shadow: 0 0 20px #0080ff, 0 0 40px #0080ff;
  transform: translateY(-2px);
}

.neon-btn.cyan:hover .btn-glow {
  opacity: 0.3;
}

.neon-btn.magenta {
  border-color: #ff6600;
  color: #ff6600;
}

.neon-btn.magenta .btn-glow {
  background: #ff6600;
}

.neon-btn.magenta:hover {
  background: rgba(255, 102, 0, 0.1);
  box-shadow: 0 0 20px #ff6600, 0 0 40px #ff6600;
  transform: translateY(-2px);
}

.neon-btn.magenta:hover .btn-glow {
  opacity: 0.3;
}

.neon-btn.yellow {
  border-color: #ff0033;
  color: #ff0033;
}

.neon-btn.yellow .btn-glow {
  background: #ff0033;
}

.neon-btn.yellow:hover {
  background: rgba(255, 0, 51, 0.1);
  box-shadow: 0 0 20px #ff0033, 0 0 40px #ff0033;
  transform: translateY(-2px);
}

.neon-btn.yellow:hover .btn-glow {
  opacity: 0.3;
}

/* Access Grid */
.access-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .access-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.grid-card {
  position: relative;
  background: rgba(10, 14, 39, 0.6);
  border: 1px solid rgba(0, 128, 255, 0.2);
  border-radius: 15px;
  padding: 2rem 1.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  overflow: hidden;
}

.grid-card:hover {
  border-color: rgba(0, 128, 255, 0.5);
  transform: translateY(-5px);
  box-shadow: 0 0 30px rgba(0, 128, 255, 0.3);
}

.card-corners {
  position: absolute;
  inset: 0;
}

.corner {
  position: absolute;
  width: 15px;
  height: 15px;
  border: 2px solid #0080ff;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.corner.tl {
  top: 5px;
  left: 5px;
  border-right: none;
  border-bottom: none;
}

.corner.tr {
  top: 5px;
  right: 5px;
  border-left: none;
  border-bottom: none;
}

.corner.bl {
  bottom: 5px;
  left: 5px;
  border-right: none;
  border-top: none;
}

.corner.br {
  bottom: 5px;
  right: 5px;
  border-left: none;
  border-top: none;
}

.grid-card:hover .corner {
  opacity: 1;
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 10px rgba(0, 128, 255, 0.5));
}

.card-name {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #0080ff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 10px #0080ff;
  margin-bottom: 0.5rem;
}

.card-arrow {
  font-size: 1.5rem;
  color: #ff6600;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.grid-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Transitions */
.cyber-fade-enter-active,
.cyber-fade-leave-active {
  transition: all 0.5s ease;
}

.cyber-fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.cyber-fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.glitch-enter-active {
  animation: glitch-in 0.6s ease-out;
}

@keyframes glitch-in {
  0% {
    opacity: 0;
    transform: translate(-20px, 20px);
  }
  20% {
    opacity: 0.5;
    transform: translate(10px, -10px);
  }
  40% {
    opacity: 0.8;
    transform: translate(-5px, 5px);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

/* Mobile Adjustments */
@media (max-width: 767px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.25rem 1.5rem;
  }

  .brand-logo {
    font-size: 1.5rem;
  }

  .cyber-nav {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .nav-link {
    justify-content: center;
    padding: 0.75rem;
    font-size: 0.8125rem;
  }

  .hero-box {
    padding: 2rem 1.5rem;
  }

  .holo-code {
    font-size: 3rem;
  }

  .glitch-title {
    font-size: 1.5rem;
  }

  .cyber-actions {
    flex-direction: column;
  }

  .neon-btn {
    width: 100%;
    justify-content: center;
  }

  .fruit-orbit {
    display: none;
  }
}
</style>
