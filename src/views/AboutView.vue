<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 bg-circuit-pattern opacity-30"></div>

    <div class="relative z-10 flex items-center justify-center min-h-screen px-4">
      <div class="max-w-4xl mx-auto text-center">
        <!-- 主标题 -->
        <h1 class="text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">
          ABOUT THIS APP
        </h1>

        <!-- 主卡片 -->
        <div class="bg-black/40 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-12 shadow-2xl shadow-purple-400/20">
          <!-- Tech Stack 部分 -->
          <div class="mb-12">
            <h2 class="text-4xl font-bold text-purple-400 mb-6 drop-shadow-lg">
              TECH STACK
            </h2>
            <div class="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mb-8 rounded-full"></div>
            <p class="text-xl text-gray-300 leading-relaxed">
              This app is built with <span class="text-cyan-400 font-semibold">Vue 3</span>,
              <span class="text-blue-400 font-semibold">TypeScript</span>,
              <span class="text-purple-400 font-semibold">Tailwind CSS</span>,
              and <span class="text-green-400 font-semibold">Vite</span> for a modern,
              high-performance user experience.
            </p>
          </div>

          <!-- 分隔线 -->
          <div class="w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-12"></div>

          <!-- Course Info 部分 -->
          <div class="mb-8">
            <h2 class="text-4xl font-bold text-cyan-400 mb-6 drop-shadow-lg">
              COURSE INFO
            </h2>
            <div class="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8 rounded-full"></div>
            <p class="text-xl text-gray-300 leading-relaxed">
              This project is part of the <span class="text-cyan-400 font-semibold">Full Stack Development</span> course,
              demonstrating modern web development practices and responsive design principles.
            </p>
          </div>
        </div>

        <!-- 底部按钮 -->
        <div class="mt-12">
          <button class="px-8 py-4 bg-black/40 border border-purple-400/50 rounded-xl text-purple-300 hover:bg-purple-400/10 hover:border-purple-400 transition-all duration-300 font-medium text-lg">
            PROJECT LINK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
