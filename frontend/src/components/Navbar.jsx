import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="flex justify-between py-3 px-10">
            <h1 className="text-xl font-semibold">Payments App</h1>
            <div className="flex">
                <h1>Hello, Divyam</h1>
                <Link className="ml-4 font-bold">D</Link>
            </div>
        </div>
    )
}

export default Navbar
