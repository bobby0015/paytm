import { userSignup } from "@/api/authApi"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { authState } from "@/store/atoms/userAtom"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"

const Signup = () => {
  const [hidePassword, setHidePassword] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const [user, setUser] = useRecoilState(authState)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.isAuthenticated && !!localStorage.getItem('token')) {
      navigate('/')
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const data = await userSignup(formData)

      // set the token to the localstorage
      localStorage.setItem('token', data.token)

      // set the global state for user
      setUser({
        isAuthenticated: true,
        user: data.user,
        token: data.token
      })

      data.success ? toast.success(data.msg) : toast.error('Something went wrong. Try again!')

      setTimeout(() => {
        navigate('/')
      }, 2000)

    } catch (err) {
      const errMsg = err.response?.data?.msg || 'Something went wrong. Try again!'
      console.log(err)
      toast.error(errMsg)
    }

  }

  return (
    <div className="w-full pt-32 flex items-center justify-center">
      <FieldGroup className={`w-lg shadow-md bg-[#f1f1f1] p-10 rounded-md`}>
        <div>
          <h1 className="text-2xl mb-2 font-semibold">Signup</h1>
          <p className="text-[#4c4848]">Fill up the details to create an account</p>
        </div>
        <FieldGroup className="grid max-w-full grid-cols-2">
          <Field>
            <FieldLabel htmlFor="first-name">First Name</FieldLabel>
            <Input onChange={handleChange} name='firstName' id="first-name" placeholder="Jordan" />
          </Field>
          <Field>
            <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
            <Input onChange={handleChange} name='lastName' id="last-name" placeholder="Lee" />
          </Field>
        </FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="name@example.com"
          />
          <FieldDescription>Enrter a valid email address</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-group-password" type={hidePassword ? 'password' : 'text'} onChange={handleChange} name='password' placeholder="Password" />
            <InputGroupAddon align="inline-end">
              {
                hidePassword ? <Eye className="cursor-pointer" onClick={() => hidePassword ? setHidePassword(false) : setHidePassword(true)} /> : <EyeOff className="cursor-pointer" onClick={() => hidePassword ? setHidePassword(false) : setHidePassword(true)} />
              }
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldDescription>Already have an account ? <Link to='/signin' className="text-blue-400">Signin</Link></FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <Button onClick={handleSubmit} className='cursor-pointer' type="submit">Create an account</Button>
        </Field>
      </FieldGroup>
      <Toaster />
    </div>
  )
}

export default Signup
