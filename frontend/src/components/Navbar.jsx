import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div>
            I am a Navbar
            <Link className="mx-10" to='/'>Home</Link>
            <Link className="mx-10" to='/signin'>signin</Link>
            <Link className="mx-10" to='/signup'>signup</Link>
        </div>
    )
}

export default Navbar
