import { useState } from "react"
import { auth, db } from "../services/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import "./Register.css" // Seu CSS com tema rural

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    type: "",
    document: "",
    hectares: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState({ type: "", text: "" })

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
    setAlertMessage({ type: "", text: "" })
  }

  const validateForm = () => {
    if (!form.name || !form.age || !form.type || !form.document || !form.hectares || !form.email || !form.password) {
      setAlertMessage({ type: "error", text: "Preencha todos os campos, como uma boa colheita!" })
      return false
    }
    if (form.password.length < 6) {
      setAlertMessage({ type: "error", text: "A senha deve ter pelo menos 6 caracteres (como uma cerca bem feita!)" })
      return false
    }
    return true
  }

  const handleRegister = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      )

      await setDoc(doc(db, "users", userCred.user.uid), {
        name: form.name,
        age: parseInt(form.age),
        type: form.type,
        document: form.document,
        hectares: parseFloat(form.hectares),
        email: form.email,
        createdAt: new Date().toISOString(),
        profileIcon: "👨‍🌾" // Ícone rural padrão
      })

      setAlertMessage({ type: "success", text: "Conta criada com sucesso! Bem-vindo ao campo! 🌾" })
      
      setForm({
        name: "",
        age: "",
        type: "",
        document: "",
        hectares: "",
        email: "",
        password: ""
      })

      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)

    } catch (error) {
      let errorMessage = "Erro na plantação. Tente novamente! 🌧️"
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Este email já está sendo cultivado por outra pessoa!"
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Email inválido! Parece uma semente estragada."
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Senha muito fraca! Plante uma mais forte."
      }
      
      setAlertMessage({ type: "error", text: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container-rural">
      <h2 className="auth-title-rural">
        Registro Rural
      </h2>

      <div className="input-group-rural">
        <label>Nome do Agricultor</label>
        <input
          name="name"
          value={form.name}
          placeholder="Digite seu nome completo"
          onChange={handleChange}
        />
      </div>

      <div className="input-group-rural">
        <label>Idade</label>
        <input
          type="number"
          name="age"
          value={form.age}
          placeholder="Sua idade"
          min="0"
          max="120"
          onChange={handleChange}
        />
      </div>

      <div className="input-group-rural">
        <label>Tipo de Propriedade</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="">Selecione o tipo</option>
          <option value="CPF">Agricultor Familiar (CPF)</option>
          <option value="PJ">Produtor Rural (CNPJ)</option>
        </select>
      </div>

      {form.type && (
        <div className="input-group-rural">
          <label>{form.type === "CPF" ? "CPF do Produtor" : "CNPJ da Propriedade"}</label>
          <input
            name="document"
            value={form.document}
            placeholder={form.type === "CPF" ? "000.000.000-00" : "00.000.000/0000-00"}
            maxLength={form.type === "CPF" ? 14 : 18}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="input-group-rural">
        <label>Hectares (Área total)</label>
        <input
          type="number"
          name="hectares"
          value={form.hectares}
          placeholder="Ex: 10.5 hectares"
          min="0"
          step="0.01"
          onChange={handleChange}
        />
      </div>

      <div className="input-group-rural">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="seu@email.com"
          onChange={handleChange}
        />
      </div>

      <div className="input-group-rural">
        <label>Senha</label>
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Mínimo 6 caracteres"
          onChange={handleChange}
        />
      </div>

      {alertMessage.text && (
        <div className={`alert-message-rural ${alertMessage.type}`}>
          {alertMessage.text}
        </div>
      )}

      <button 
        className="submit-btn-rural" 
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="loading-spinner-rural"></span>
            Plantando sua conta...
          </>
        ) : (
          "Criar conta"
        )}
      </button>

    
    </div>
  )

}
