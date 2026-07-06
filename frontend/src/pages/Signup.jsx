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
import { Link } from "react-router-dom"

const Signup = () => {

  const [hidePassword, setHidePassword] = useState(true)

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
            <Input id="first-name" placeholder="Jordan" />
          </Field>
          <Field>
            <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
            <Input id="last-name" placeholder="Lee" />
          </Field>
        </FieldGroup>
        <Field>
          <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
          <Input
            id="fieldgroup-email"
            type="email"
            placeholder="name@example.com"
          />
          <FieldDescription>Enrter a valid email address</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-group-password" type={hidePassword ? 'password' : 'text'} placeholder="Password" />
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
          <Button className='cursor-pointer' type="submit">Create an account</Button>
        </Field>
      </FieldGroup>
    </div>
  )
}

export default Signup
