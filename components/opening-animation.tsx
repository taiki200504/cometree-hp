"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface OpeningAnimationProps {
  onComplete: () => void
}

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const particlesRef = useRef<any[]>([])
  const router = useRouter()



  // パーティクルアニメーション
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // キャンバスサイズ設定
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // パーティクルクラス
    class Particle {
      x: number
      y: number
      size: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + Math.random() * 100
        this.size = Math.random() * 2 + 1
        this.speedY = Math.random() * 1 + 0.5
        this.color = Math.random() > 0.3 ? '#066ff2' : '#ec4faf'
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.y -= this.speedY
        if (this.y < -10) {
          this.y = canvas.height + 10
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        if (!ctx) return
        const rgb = this.color === '#066ff2' ? '6, 111, 242' : '236, 79, 175'
        ctx.fillStyle = `rgba(${rgb}, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // パーティクル初期化
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 300; i++) {
        particlesRef.current.push(new Particle())
      }
    }

    // アニメーションループ
    const animate = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update()
        particlesRef.current[i].draw()
      }
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    initParticles()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // アニメーションシーケンス
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    // 0.5秒後: 1行目のメッセージ表示
    timers.push(setTimeout(() => {
      setCurrentStep(1)
    }, 500))

    // 1.5秒後: 2行目のメッセージ表示
    timers.push(setTimeout(() => {
      setCurrentStep(2)
    }, 1500))

    // 3.5秒後: メッセージがフェードアウト
    timers.push(setTimeout(() => {
      setCurrentStep(3)
    }, 3500))

    // 4.0秒後: ロゴがフェードイン
    timers.push(setTimeout(() => {
      setCurrentStep(4)
    }, 4000))

    // 6.5秒後: 全体がフェードアウト
    timers.push(setTimeout(() => {
      setCurrentStep(5)
    }, 6500))

    // 7.5秒後: アニメーション完了
    timers.push(setTimeout(() => {
      console.log('Animation sequence completed, starting fade out')
      setIsVisible(false)
      // フェードアウト完了後にonCompleteを呼び出し
      setTimeout(() => {
        console.log('Fade out completed, calling onComplete')
        onComplete()
      }, 1200)
    }, 7500))

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [onComplete])

  // アニメーション完了時の処理を確実に実行
  useEffect(() => {
    if (!isVisible && currentStep >= 5) {
      console.log('Animation visibility changed, ensuring completion')
      const timer = setTimeout(() => {
        console.log('Backup completion triggered')
        onComplete()
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [isVisible, currentStep, onComplete])

  const handleSkip = () => {
    console.log('Skip button clicked, completing animation')
    setIsVisible(false)
    setTimeout(() => {
      console.log('Skip fade out completed, calling onComplete')
      onComplete()
    }, 1200)
  }

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1200 ease-in-out ${
        currentStep >= 5 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div 
        className={`relative z-10 w-[90%] max-w-[800px] text-white text-center transition-opacity duration-[1500ms] ease-in ${
          currentStep >= 3 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span 
          className={`block text-[clamp(1.5rem,5vw,3.5rem)] font-black mb-4 transition-all duration-[1200ms] ease-out ${
            currentStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
          }`}
        >
          学生の声が、
        </span>
        <span 
          className={`block text-[clamp(1.5rem,5vw,3.5rem)] font-black transition-all duration-[1200ms] ease-out ${
            currentStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
          }`}
        >
          社会を変える種になる。
        </span>
      </div>

      <div 
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-opacity duration-[1500ms] ease-out ${
          currentStep >= 4 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image 
          src="/images/header-logo-dark.png"
          alt="UNION Logo"
          width={450}
          height={150}
          className="w-[90%] max-w-[450px] h-auto drop-shadow-[0_0_25px_rgba(100,150,255,0.7)] animate-subtle-pulse"
        />
      </div>

      <button 
        onClick={handleSkip}
        className="absolute bottom-8 right-8 z-30 px-4 py-2 bg-white/10 text-white border border-white/30 rounded-full text-sm backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
      >
        SKIP
      </button>
    </div>
  )
} 