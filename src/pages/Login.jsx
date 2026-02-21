import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../services/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import "./Login.css"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState({ type: "", text: "" })
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async () => {
    // Validação básica
    if (!email || !password) {
      setAlertMessage({ 
        type: "error", 
        text: "Preencha todos os campos para entrar na fazenda! 🌾" 
      })
      return
    }

    setLoading(true)
    setAlertMessage({ type: "", text: "" })

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      // Se "Lembrar de mim" estiver marcado, podemos salvar no localStorage
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email)
      } else {
        localStorage.removeItem("rememberedEmail")
      }

      setAlertMessage({ 
        type: "success", 
        text: `Bem-vindo de volta, produtor! 🚁` 
      })

      // Redirecionar após 1.5 segundos
      setTimeout(() => {
        navigate("/dashboard") // ou para onde desejar
      }, 1500)

    } catch (error) {
      let errorMessage = "Erro na autenticação. Verifique seus dados! 🌧️"

      // Traduzir mensagens de erro do Firebase
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = "Usuário não encontrado! Parece que você ainda não plantou sua conta. 🌱"
          break
        case 'auth/wrong-password':
          errorMessage = "Senha incorreta! Verifique e tente novamente. 🔒"
          break
        case 'auth/invalid-email':
          errorMessage = "Email inválido! Digite um email válido. 📧"
          break
        case 'auth/too-many-requests':
          errorMessage = "Muitas tentativas! Aguarde um momento para tentar novamente. ⏳"
          break
        case 'auth/network-request-failed':
          errorMessage = "Erro de conexão! Verifique sua internet. 🌐"
          break
        default:
          errorMessage = "Erro ao fazer login. Tente novamente mais tarde."
      }

      setAlertMessage({ type: "error", text: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="login-container">
      {/* Elementos decorativos */}
      <div className="soft-light"></div>
      <div className="login-decoration-left">🌻🚜🌾</div>
      <div className="login-decoration">🐄🌽☁️</div>

      <div className="login-card">
        <div className="login-header">
          <h2>Login</h2>
          <p className="login-subtitle">
            <span>🚁</span> Acesse sua propriedade rural <span>🌾</span>
          </p>
        </div>

        <div className="login-form">
          <div className="input-group-login">
            <label>
              <i>📧</i> Email
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <span className="input-icon">🌻</span>
          </div>

          <div className="input-group-login">
            <label>
              <i>🔒</i> Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <span className="input-icon">🌽</span>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Lembrar de mim</span>
            </label>
            <a href="/forgot-password" className="forgot-password">
              Esqueceu a senha?
            </a>
          </div>

          {alertMessage.text && (
            <div className={`alert-message-login ${alertMessage.type}`}>
              {alertMessage.text}
            </div>
          )}

          <button
            className="login-button"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner-login"></span>
                Entrando...
              </>
            ) : (
              "Entrar na conta"
            )}
          </button>
        </div>

        <div className="login-divider">
          <span>OU</span>
        </div>

        <div className="register-link">
          <span>Primeira vez aqui?</span>
          <a href="/register">Criar Conta 🌱</a>
        </div>
      </div>
    </div>
  )

}
