<template>
  <div class="networkError">
    <div class="error-container">
      <!-- 错误图标 -->
      <div class="error-icon">
        <svg class="w-32 h-32 text-red-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <!-- 错误标题 -->
      <h1 class="error-title">Uh-Oh!</h1>

      <!-- 错误消息 -->
      <div class="error-message">
        <p class="message-text">
          It looks like you're experiencing some network issues,
        </p>
        <p class="message-text">
          please take a breath and
          <a href="#" @click="handleRetry" class="retry-link">click here</a>
          to try again.
        </p>
      </div>

      <!-- 装饰性波浪线 -->
      <div class="wave-decoration">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="wave-path"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleRetry = (event: Event) => {
  event.preventDefault()
  router.go(-1)
}
</script>

<style scoped>
.networkError {
  min-height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.error-container {
  text-align: center;
  max-width: 800px;
  width: 100%;
  position: relative;
  z-index: 10;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(30, 58, 138, 0.3) 100%);
  border: 2px solid rgba(96, 165, 250, 0.3);
  border-radius: 24px;
  padding: 4rem 3rem;
  backdrop-filter: blur(10px);
  box-shadow:
    0 0 60px rgba(96, 165, 250, 0.2),
    0 20px 50px rgba(0, 0, 0, 0.4),
    inset 0 0 100px rgba(96, 165, 250, 0.05);
  animation: slideIn 0.6s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.error-icon {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-title {
  font-size: 5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ef4444, #f97316, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  text-shadow: 0 0 40px rgba(239, 68, 68, 0.3);
  letter-spacing: 0.1em;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.05);
  }
}

.error-message {
  margin-bottom: 2rem;
}

.message-text {
  font-size: 1.5rem;
  color: #e0f2fe;
  margin: 0.5rem 0;
  line-height: 1.8;
  font-weight: 500;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.retry-link {
  color: #22d3ee;
  text-decoration: none;
  font-weight: bold;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  position: relative;
  display: inline-block;
}

.retry-link:hover {
  color: #06b6d4;
  border-bottom-color: #06b6d4;
  background: rgba(6, 182, 212, 0.1);
  transform: translateY(-2px);
  text-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
}

.retry-link:active {
  transform: translateY(0);
}

.wave-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  overflow: hidden;
  opacity: 0.3;
}

.wave-decoration svg {
  width: 100%;
  height: 100%;
}

.wave-path {
  fill: rgba(96, 165, 250, 0.3);
  animation: wave 3s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-25px);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-container {
    padding: 3rem 2rem;
  }

  .error-title {
    font-size: 3.5rem;
  }

  .message-text {
    font-size: 1.25rem;
  }

  .error-icon svg {
    width: 6rem;
    height: 6rem;
  }
}

@media (max-width: 480px) {
  .error-container {
    padding: 2rem 1.5rem;
  }

  .error-title {
    font-size: 2.5rem;
  }

  .message-text {
    font-size: 1rem;
  }

  .error-icon svg {
    width: 4rem;
    height: 4rem;
  }
}
</style>
