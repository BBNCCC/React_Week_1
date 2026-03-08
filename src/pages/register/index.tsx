import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { addUser, findUserByEmail } from "@/store/users"

interface FormErrors {
  name: string
  email: string
  password: string
  retypePassword: string
  terms: string
}

const emptyErrors: FormErrors = {
  name: "",
  email: "",
  password: "",
  retypePassword: "",
  terms: "",
}

export function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [retypePassword, setRetypePassword] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState<FormErrors>(emptyErrors)

  function clearError(field: keyof FormErrors) {
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  function validate(): boolean {
    const newErrors: FormErrors = { ...emptyErrors }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/

    if (!name.trim()) newErrors.name = "This field can't be empty"

    if (!email.trim()) newErrors.email = "This field can't be empty"
    else if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address"
    else if (findUserByEmail(email)) newErrors.email = "Email already registered"

    if (!password) newErrors.password = "This field can't be empty"
    else if (!passwordRegex.test(password))
      newErrors.password = "Password needs to have a minimal of 8 characters, 1 uppercase and 1 symbol"

    if (!retypePassword) newErrors.retypePassword = "This field can't be empty"
    else if (retypePassword !== password) newErrors.retypePassword = "Passwords do not match"

    if (!agreed) newErrors.terms = "You must agree to the terms"

    setErrors(newErrors)
    return Object.values(newErrors).every((e) => e === "")
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    addUser({ name, email, password })
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
          <CardDescription>Let&apos;s get started with your 30 days free trial</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">
                Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="johndoe"
                value={name}
                onChange={(e) => { setName(e.target.value); clearError("name") }}
                className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">
                Email<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); clearError("email") }}
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">
                Password<span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); clearError("password") }}
                className={errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.password ? (
                <p className="text-xs text-red-500">{errors.password}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Password needs to have a minimal of 8 characters, 1 uppercase and 1 symbol
                </p>
              )}
            </div>

            {/* Retype Password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="retype-password">
                Retype Password<span className="text-red-500">*</span>
              </Label>
              <Input
                id="retype-password"
                type="password"
                placeholder="••••••••"
                value={retypePassword}
                onChange={(e) => { setRetypePassword(e.target.value); clearError("retypePassword") }}
                className={errors.retypePassword ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.retypePassword && (
                <p className="text-xs text-red-500">{errors.retypePassword}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => { setAgreed(e.target.checked); clearError("terms") }}
                  className="h-4 w-4 cursor-pointer accent-primary"
                />
                <Label htmlFor="terms" className="cursor-pointer font-normal">
                  I agree to all term, privacy policy and fees
                </Label>
              </div>
              {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}
            </div>

            <Button type="submit" className="mt-2 w-full">
              Sign Up
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-primary underline underline-offset-4 hover:opacity-80"
              >
                Log In
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
