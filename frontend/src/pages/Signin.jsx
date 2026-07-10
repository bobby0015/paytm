import { userSignin } from "@/api/authAPI"
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
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Link } from "react-router-dom"

const Signin = () => {
  const [hidePassword, setHidePassword] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await userSignin(formData)
      data.success ? toast.success(data.msg) : toast.error('Something went wrong. Try again!')
    } catch (err) {
      const errMsg = err.response.data.msg
      errMsg ? toast.error(errMsg) : toast.error('Something went wrong. Try again!')
    }

  }

  return (
    <div className="w-full pt-32 flex items-center justify-center">
      <FieldGroup className={`w-lg shadow-md bg-[#f1f1f1] p-10 rounded-md`}>
        <div>
          <h1 className="text-2xl mb-2 font-semibold">Signin</h1>
          <p className="text-[#4c4848]">Fill up the details to login to your account</p>
        </div>
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="email"
            name='email'
            onChange={handleChange}
            placeholder="name@example.com"
          />
          <FieldDescription>Enrter a valid email address</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-group-password" name='password' onChange={handleChange} type={hidePassword ? 'password' : 'text'} placeholder="Password" />
            <InputGroupAddon align="inline-end">
              {
                hidePassword ? <Eye className="cursor-pointer" onClick={() => hidePassword ? setHidePassword(false) : setHidePassword(true)} /> : <EyeOff className="cursor-pointer" onClick={() => hidePassword ? setHidePassword(false) : setHidePassword(true)} />
              }
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldDescription>Do not have an account ? <Link to='/signup' className="text-blue-400">Signup</Link></FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <Button onClick={handleSubmit} className='cursor-pointer' type="submit">Singin</Button>
        </Field>
      </FieldGroup>
      <Toaster />
    </div>
  )
}

export default Signin
