import { Button } from "./ui/button"


const UserList = () => {
  return (
    <div className="flex justify-between py-2 items-center">
      <div className="flex items-center">
        <h1 className="p-2 rounded-md bg-[#f2f2f2] mr-4">U1</h1>
        <h2 className="font-semibold">User 1</h2>
      </div>
      <Button>Send Money</Button>
    </div>
  )
}

export default UserList
