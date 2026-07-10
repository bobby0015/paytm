import { authState } from "@/store/atoms/userAtom"
import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"

const Navbar = () => {
    const data = useRecoilValue(authState)
    return (
        <div className="flex justify-between py-3 px-10">
            <Link to="/" className="text-xl font-semibold">Payments App</Link>
            <div className="flex">
                <h1>Hello, {data?.user?.firstName || 'User'}</h1>
                <Link className="ml-4 font-bold">D</Link>
            </div>
        </div>
    )
}

export default Navbar
