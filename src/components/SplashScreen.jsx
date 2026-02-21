import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./SplashScreen.css"

export default function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showScan, setShowScan] = useState(false)

  useEffect(() => {
    const sequence = async () => {
      // Terra aparece
      await new Promise(r => setTimeout(r, 1500))
      setStage(1)
      
      // Plantas crescem
      await new Promise(r => setTimeout(r, 4000))
      setStage(2)
      
      // Drone entra e vai até o centro
      await new Promise(r => setTimeout(r, 6000))
      setStage(3)
      
      // Scan começa
      setShowScan(true)
      
      // Progresso mais fluido e suave
      for (let i = 0; i <= 100; i++) {
        await new Promise(r => setTimeout(r, 50))
        setProgress(i)
      }
      
      // Pequena pausa para mostrar 100%
      await new Promise(r => setTimeout(r, 1500))
      
      // Drone vai embora
      setStage(4)
      
      // Transição suave para sair
      await new Promise(r => setTimeout(r, 3000))
      
      // Fade out suave antes de completar
      onComplete()
    }
    
    sequence()
  }, [onComplete])

  const plants = Array(60).fill(0).map((_, i) => ({
    id: i,
    left: i * 1.7 + Math.random() * 2,
    delay: Math.random() * 2.5,
    height: Math.random() * 100 + 140,
  }))

  return (
    <motion.div 
      className="splash-cinematic"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      {/* Fundo */}
      <div className="cinematic-bg">
        <div className="bg-gradient"></div>
        <div className="bg-vignette"></div>
      </div>

      {/* TERRA */}
      <motion.div 
        className="ground-premium"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
      >
        <div className="soil-premium"></div>
        <div className="soil-detail"></div>
      </motion.div>

      {/* PLANTAÇÃO - SUAVE E CALMA DURANTE O SCAN */}
      <div className="plantation-cinematic">
        {plants.map((plant) => (
          <motion.div
            key={plant.id}
            className="plant-cinematic"
            style={{
              left: `${plant.left}%`,
              bottom: '0',
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={stage >= 1 ? { 
              height: plant.height, 
              opacity: 1 
            } : {}}
            transition={{ 
              duration: 4, 
              delay: plant.delay,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <div className="stem-cinematic"></div>
            <div className="leaf-cinematic left"></div>
            <div className="leaf-cinematic right"></div>
            <div className="grain-cinematic"></div>
            
            {/* Efeito de brisa suave durante o scan */}
            {stage === 3 && (
              <motion.div
                className="wind-effect"
                animate={{
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none'
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* DRONE - SUAVE */}
      <AnimatePresence mode="wait">
        {stage >= 2 && stage <= 4 && (
          <motion.div 
            className="drone-container"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 50
            }}
          >
            <motion.div 
              className="drone-cinematic design3"
              initial={{ opacity: 0, scale: 0.3, x: "-30vw", y: "40vh" }}
              animate={{
                x: stage === 2 ? [
                  "-30vw", 
                  "10vw",  
                  "30vw",  
                  "45vw",  
                  "50vw"   
                ] : stage === 3 ? "50vw" : [
                  "50vw",  
                  "65vw",  
                  "85vw",  
                  "120vw"  
                ],
                y: stage === 2 ? [
                  "40vh",
                  "39vh",
                  "38.5vh",
                  "38vh",
                  "38vh"
                ] : stage === 3 ? "38vh" : [
                  "38vh",
                  "38vh",
                  "37vh",
                  "36vh"
                ],
                opacity: stage === 2 ? [0, 0.4, 0.8, 1, 1] : 
                         stage === 3 ? 1 : 
                         [1, 1, 0.8, 0],
                scale: stage === 2 ? [0.3, 0.6, 0.8, 0.9, 0.9] :
                       stage === 3 ? 0.9 :
                       [0.9, 0.9, 0.7, 0.4]
              }}
              transition={
                stage === 2 ? {
                  duration: 8,
                  times: [0, 0.3, 0.6, 0.9, 1],
                  ease: [0.43, 0.13, 0.23, 0.96]
                } : stage === 3 ? {
                  duration: 1,
                  ease: "easeOut"
                } : {
                  duration: 6,
                  times: [0, 0.3, 0.7, 1],
                  ease: [0.55, 0.085, 0.68, 0.53]
                }
              }
            >
              <DroneDesign3 />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCAN EFFECT - SUAVE */}
      {showScan && stage === 3 && (
        <motion.div 
          className="scan-effect"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div 
            className="scan-grid"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="scan-line"
            animate={{
              top: ["0%", "100%", "0%"]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* CONTEÚDO EMBAIXO */}
          <div className="scan-content-bottom">
            {/* TEXTO PRINCIPAL */}
            <motion.div 
              className="scan-text"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              SCANEANDO PLANTAÇÃO • 4K • IA
            </motion.div>

            {/* BARRA DE PROGRESSO */}
            <motion.div 
              className="progress-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="progress-bar-bg">
                <motion.div 
                  className="progress-bar-fill"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              
              {/* PERCENTUAL */}
              <motion.div 
                className="progress-percentage"
                animate={{ 
                  scale: progress === 100 ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.8 }}
              >
                {progress}%
              </motion.div>
            </motion.div>

            {/* STATUS */}
            <motion.div 
              className="scan-status"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {progress === 100 ? "▸ SCAN CONCLUÍDO! ◂" : "▸ PROCESSANDO DADOS AGRÍCOLAS ◂"}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* TELA DE 100% - SUAVE */}
      {progress === 100 && stage === 3 && (
        <motion.div 
          className="completion-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div 
            className="completion-message"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.2 
            }}
          >
            <motion.div 
              className="check-icon"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              ✓
            </motion.div>
            <motion.div 
              className="completion-text"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              SCAN COMPLETO!
            </motion.div>
            <motion.div 
              className="completion-subtext"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              100% processado
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* TEXTOS SUPERIORES */}
      {stage >= 2 && (
        <motion.div 
          className="top-texts"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
        >
          {/* TÍTULO */}
          <motion.div 
            className="top-title"
            animate={{ 
              textShadow: [
                "0 0 20px #00ff00, 0 0 40px #00aa00",
                "0 0 25px #00ff00, 0 0 50px #00ff00",
                "0 0 20px #00ff00, 0 0 40px #00aa00"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            AGRO<span>TECH</span> 4K
          </motion.div>

          {/* TIMESTAMP */}
          <motion.div 
            className="top-timestamp"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {new Date().toLocaleDateString('pt-BR')} • {new Date().toLocaleTimeString('pt-BR')}
          </motion.div>
        </motion.div>
      )}

      {/* FADE OUT SUAVE NO FINAL */}
      {stage === 4 && (
        <motion.div 
          className="fade-out"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 200,
            pointerEvents: 'none'
          }}
        />
      )}
    </motion.div>
  )
}

/* ===== DESIGN 3: HEXACÓPTERO AGRO ===== */
function DroneDesign3() {
  return (
    <div className="drone-design3-final">
      {/* CORPO CENTRAL */}
      <div className="drone-body-central">
        <div className="hex-main"></div>
        <div className="hex-inner"></div>
        <div className="hex-brand">
          <span>AGRO</span>
          <span>TECH</span>
        </div>
      </div>

      {/* BRAÇOS */}
      <div className="drone-arm-container pos-0">
        <div className="arm-bar"></div>
        <div className="motor-container">
          <motion.div 
            className="prop-rotor"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
          >
            <div className="prop-pa" style={{ transform: 'rotate(0deg)' }}></div>
            <div className="prop-pa" style={{ transform: 'rotate(120deg)' }}></div>
            <div className="prop-pa" style={{ transform: 'rotate(240deg)' }}></div>
          </motion.div>
        </div>
      </div>

      <div className="drone-arm-container pos-60">
        <div className="arm-bar"></div>
        <div className="motor-container">
          <motion.div 
            className="prop-rotor"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
          >
            <div className="prop-pa" style={{ transform: 'rotate(0deg)' }}></div>
            <div className="prop-pa" style={{ transform: 'rotate(120deg)' }}></div>
            <div className="prop-pa" style={{ transform: 'rotate(240deg)' }}></div>
          </motion.div>
        </div>
      </div>

      <div className="drone-arm-container pos-120">
        <div className="arm-bar"></div>
        <div className="motor-container">
          <motion.div 
            className="prop-rotor"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
          >
            <div className="prop-pa" style={{ transform: 'rotate(0deg)' }}></div>
            <div className="prop-pa" style={{ transform: 'rotate(120deg)' }}></div>
            <div className="prop-pa" style={{ transform: 'rotate(240deg)' }}></div>
          </motion.div>
        </div>
      </div>

      <div className="drone-arm-container pos-180">
        <div className="arm-bar"></div>
        <div className="motor-container">
          <motion.div 
            className="prop-rotor"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
          >
            <div className="prop-pa" style={{ transform: 'rotate(0deg)' }}></div>
            <div className="prop-pa" style={{ transform: 'rotate(120deg)' }}></div>
            <div className="prop-pa" style={{ transform: 'rotate(240deg)' }}></div>
          </motion.div>
        </div>
      </div>

      <div className="drone-arm-container pos-240">
        <div className="arm-bar"></div>
        <div className="motor-container">
          <motion.div 
            className="prop-rotor"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
          >
            <div className="prop-pa" style={{ transform: 'rotate(0deg)' }}></div>
            <div className="prop-pa" style={{ transform: 'rotate(120deg)' }}></div>
            <div className="prop-pa" style={{ transform: 'rotate(240deg)' }}></div>
          </motion.div>
        </div>
      </div>

      <div className="drone-arm-container pos-300">
        <div className="arm-bar"></div>
        <div className="motor-container">
          <motion.div 
            className="prop-rotor"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
          >
            <div className="prop-pa" style={{ transform: 'rotate(0deg)' }}></div>
            <div className="prop-pa" style={{ transform: 'rotate(120deg)' }}></div>
            <div className="prop-pa" style={{ transform: 'rotate(240deg)' }}></div>
          </motion.div>
        </div>
      </div>

      {/* ACESSÓRIOS */}
      <div className="camera-unit-bottom"></div>
      <div className="lidar-unit-top">
        <motion.div 
          className="lidar-scanner"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="lidar-beam"></div>
        </motion.div>
      </div>
      <div className="gps-module"></div>
    </div>
  )
}