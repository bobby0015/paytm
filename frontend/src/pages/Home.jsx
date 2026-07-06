import { Input } from "@/components/ui/input"
import UserList from "@/components/UserList"

const Home = () => {
  return (
    <div className="w-[90%] mx-auto mt-16">
      <h1 className="text-xl font-semibold">Your Balance : ₹ 5000</h1>
      <div className="my-4">
        <h2 className="font-semibold">Users</h2>
        <Input placeholder="Search Users" />
      </div>
      <UserList />
    </div>
  )
}

export default Home
