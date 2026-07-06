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

const Signin = () => {

  const [hidePassword, setHidePassword] = useState(true)

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
        <Field orientation="horizontal">
          <Button type="reset" variant="outline">
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </div>
  )
}

export default Signin
