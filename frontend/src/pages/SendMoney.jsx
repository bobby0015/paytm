import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const SendMoney = () => {
    return (
        <div className="mt-32 p-10 bg-[#f2f2f2] w-sm mx-auto">
            <h1 className="text-2xl font-bold mb-10 text-center">Send Money</h1>
            <div className="flex items-center">
                <h1 className="rounded-full px-4 py-2 bg-green-300 text-white mr-4">A</h1>
                <h1 className="text-xl font-semibold">Divyam Chauhan</h1>
            </div>
            <div className="my-3">
                <label htmlFor="amount">Amount (in rs)</label>
                <Input placeholder="Search Users" />
            </div>
            <Button className="w-full mt-4 bg-green-400 hover:bg-green-400 cursor-pointer">Transfer Money</Button>
        </div>
    )
}

export default SendMoney
