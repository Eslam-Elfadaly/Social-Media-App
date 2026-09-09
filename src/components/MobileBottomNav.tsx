import { HouseIcon } from "@animateicons/react/lucide";
import { SendIcon } from "@animateicons/react/lucide";
import { SearchIcon } from "@animateicons/react/lucide";
import { CompassIcon } from "@animateicons/react/lucide";
import userimage from '@/assets/1782743036226.jpg';
import { NavLink } from "react-router";

function MobileBottomNav() {
  return (
    <div className="md:hidden p-3 pb-4 border-t-1 flex items-center justify-around">
        <NavLink to='/home' className='flex items-center'><HouseIcon size={26}  duration={1} /></NavLink>
        <NavLink to='/explore' className='flex items-center'><CompassIcon size={26} duration={1} className=""/>  </NavLink>
        <NavLink to='/messages' className='flex items-center'><SendIcon size={26} duration={1}  /></NavLink> 
        <NavLink to='/search' className='flex items-center'><SearchIcon size={27} duration={1} /></NavLink>
        <NavLink to='profile'><img src={userimage} alt="useImage" className="size-9 rounded-full"/></NavLink>

         </div>
  )
}

export default MobileBottomNav