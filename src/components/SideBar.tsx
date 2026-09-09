import { NavLink } from 'react-router'
import {Button} from '@/components/ui/button'
import { House } from 'lucide-react';
import { Compass } from 'lucide-react';
import { Bell } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { User } from 'lucide-react';
import { Settings } from 'lucide-react';
import { ModeToggle } from './Theming/mode-toggle';
import { LogOut } from 'lucide-react';

function SideBar() {
  return (

    <div className='bg-sidebar max-md:hidden text-sidebar-foreground h-full px-2 py-5 rounded-[10px] w-50 flex flex-col justify-between border-r-1'>
    <ul className=' flex flex-col gap-3 *:flex *:items-center *:gap-2'>
      <NavLink to='/home' className={({isActive})=> `font-bold text-lg hover:bg-primary/20 hover:text-primary px-2 py-1 rounded-[10px] ${isActive && 'bg-primary/20 text-primary' }`}><House className='size-5.5'/> Home</NavLink>
      <NavLink to='/explore' className={({isActive})=> `font-bold text-lg hover:bg-primary/20 hover:text-primary px-2 py-1 rounded-[10px] ${isActive && 'bg-primary/20 text-primary' }`}> <Compass className='size-5.5'/> Explore</NavLink>
      <NavLink to='/notifications' className={({isActive})=> `font-bold text-lg hover:bg-primary/20 hover:text-primary px-2 py-1 rounded-[10px] ${isActive && 'bg-primary/20 text-primary' }`}> <Bell className='size-5.5'/> Notifications</NavLink>
      <NavLink to='/messages' className={({isActive})=> `font-bold text-lg hover:bg-primary/20 hover:text-primary px-2 py-1 rounded-[10px] ${isActive && 'bg-primary/20 text-primary' }`}><Mail className='size-5.5'/> Messages</NavLink>
      <NavLink to='/bookmarks' className={({isActive})=> `font-bold text-lg hover:bg-primary/20 hover:text-primary px-2 py-1 rounded-[10px] ${isActive && 'bg-primary/20 text-primary' }`}><Bookmark className='size-5.5'/> Bookmarks</NavLink>
      <NavLink to='/profile' className={({isActive})=> `font-bold text-lg hover:bg-primary/20 hover:text-primary px-2 py-1 rounded-[10px] ${isActive && 'bg-primary/20 text-primary' }`}> <User className='size-5.5'/> Profile</NavLink>
      <div className='px-2 py-1 rounded-[10px] '><span className='text-lg font-bold'>Dark Mode</span> <ModeToggle/></div>
    
    </ul>

    <div className="buttons w-full *:w-full *:text-white flex flex-col gap-2 *:cursor-pointer">
      <Button className='bg-gray-500/60 font-bold rounded-[10px] text-md hover:bg-foreground/40'><Settings /> Settings</Button>
      <Button className='bg-red-500 hover:bg-red-400 font-bold rounded-[10px] text-md'><LogOut /> Sign Out</Button>
    </div>
    </div>
  )
}

export default SideBar