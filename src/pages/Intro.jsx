// Intro.jsx - VERSÃO CORRIGIDA
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import "./Intro.css"

// AJUSTE O CAMINHO CONFORME SUA ESTRUTURA DE PASTAS
import Logo from "/public/assets/image/Logo.png" // Mude se necessário

export default function Intro() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth > 768) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20
        const y = (e.clientY / window.innerHeight - 0.5) * 20
        setMousePosition({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // PARTÍCULAS - CORRIGIDAS
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Remove partículas existentes para não duplicar
    const existingParticles = container.querySelectorAll('.particle')
    existingParticles.forEach(p => p.remove())

    const particles = []
    const particleCount = window.innerWidth < 768 ? 30 : 60

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      
      const size = Math.random() * 8 + 2
      const duration = Math.random() * 20 + 15
      const delay = Math.random() * 10
      const left = Math.random() * 100
      const top = Math.random() * 100
      
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${left}%`
      particle.style.top = `${top}%`
      particle.style.animationDuration = `${duration}s`
      particle.style.animationDelay = `${delay}s`
      
      // CORES DAS PARTÍCULAS - mais visíveis
      const colors = [
        'rgba(245, 179, 66, 0.6)',  // dourado
        'rgba(255, 255, 255, 0.5)', // branco
        'rgba(74, 139, 74, 0.5)',   // verde
        'rgba(196, 154, 108, 0.5)'  // terra
      ]
      particle.style.background = colors[Math.floor(Math.random() * colors.length)]
      
      container.appendChild(particle)
      particles.push(particle)
    }

    // Cleanup function
    return () => {
      particles.forEach(particle => {
        if (particle && particle.parentNode) {
          particle.remove()
        }
      })
    }
  }, [])

  return (
    <div 
      className="intro-container" 
      ref={containerRef}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`
      }}
    >
      <div className="background-layer background-layer-1"></div>
      <div className="background-layer background-layer-2"></div>
      <div className="background-overlay"></div>
      
      <div className="gradient-sphere gradient-sphere-1"></div>
      <div className="gradient-sphere gradient-sphere-2"></div>
      <div className="gradient-sphere gradient-sphere-3"></div>

      <div className="grid-pattern"></div>

      <div className="intro-card">
        <div className="card-glow"></div>
        <div className="card-pattern"></div>
        <br /> <br />
        {/* LOGO SECTION - AJUSTADA */}
        <div className="logo-section">
          <div className="logo-wrapper">
            <div className="logo-container">
              <img 
                src={Logo} 
                alt="AgroVoo" 
                className="logo-image"
              />
              <div className="logo-ring"></div>
            </div>
            <br /><br />
            <div className="logo-badge">
              <span className="badge-text">TECNOLOGIA AGRO 4.0</span>
            </div>
            
            <h1 className="logo-title">
              <span className="title-line">Monitoramento</span>
              <span className="title-line title-line-highlight">Inteligente</span>
            </h1>
            
            <p className="logo-description">
              Drones autônomos para detecção precoce de pragas e doenças em suas plantações
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <span className="stat-label">Precisão na detecção</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Monitoramento contínuo</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">-40%</span>
            <span className="stat-label">Perdas evitadas</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🌱</span>
              <div className="icon-glow"></div>
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Análise do Solo</h3>
              <p className="feature-description">Umidade, nutrientes e saúde do solo em tempo real</p>
            </div>
            <div className="feature-hover-bg"></div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🐛</span>
              <div className="icon-glow"></div>
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Detecção de Pragas</h3>
              <p className="feature-description">IA avançada identifica 50+ tipos de pragas</p>
            </div>
            <div className="feature-hover-bg"></div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🚁</span>
              <div className="icon-glow"></div>
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Voo Autônomo</h3>
              <p className="feature-description">Rotas inteligentes e mapeamento 3D da plantação</p>
            </div>
            <div className="feature-hover-bg"></div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">📊</span>
              <div className="icon-glow"></div>
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Relatórios</h3>
              <p className="feature-description">Dashboards interativos com insights acionáveis</p>
            </div>
            <div className="feature-hover-bg"></div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="actions-section">
          <button 
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            <span className="btn-text">Acessar Plataforma</span>
            <span className="btn-icon">→</span>
            <div className="btn-shine"></div>
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => navigate("/register")}
          >
            <span className="btn-text">Começar Agora</span>
            <span className="btn-icon">🌿</span>
            <div className="btn-shine"></div>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="trust-section">
          <div className="trust-badge">
            <span className="trust-icon">✓</span>
            <span className="trust-text">Garantia de resultados</span>
          </div>
          <div className="trust-badge">
            <span className="trust-icon">🔒</span>
            <span className="trust-text">Dados seguros</span>
          </div>
          <div className="trust-badge">
            <span className="trust-icon">⚡</span>
            <span className="trust-text">Suporte 24/7</span>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p className="footer-text">
            Já é produtor rural? 
            <a href="/login" className="footer-link">
              Entrar na plataforma
              <span className="link-arrow">→</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}