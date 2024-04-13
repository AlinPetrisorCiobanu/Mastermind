import {Navigate , Route ,Routes} from "react-router-dom"
import { Home } from "../Home/Home"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { Profile } from "../Profiles/Profile"
import { Profiles } from "../Profiles/Profiles"
import { MasterMind } from "../MasterMind/MasterMind"
import { About } from "../About/About"

export const Body = () =>{
    return(
    <Routes>
        <Route path="*" element={<Navigate to = "/"/> }/>
        <Route path="/" element={<Home/>}/>
        <Route path="/login_user" element={<Login/>}/>
        <Route path="/register_user" element={<Register/>}/>
        <Route path="/profile_user" element={<Profile/>}/>
        <Route path="/profile_admin_users" element={<Profiles/>}/>
        <Route path="/mastermind" element={<MasterMind/>}/>
        <Route path="/about" element={<About/>}/>
    </Routes>
    )
}