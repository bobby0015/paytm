import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="flex justify-between py-3 px-10">
            <Link to="/" className="text-xl font-semibold">Payments App</Link>
            <div className="flex">
                <h1>Hello, Divyam</h1>
                <Link className="ml-4 font-bold">D</Link>
            </div>
        </div>
    )
}

export default Navbar
