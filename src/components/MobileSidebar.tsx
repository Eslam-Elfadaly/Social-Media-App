import React from 'react'
import { XIcon } from "@animateicons/react/lucide";
import userimage from '@/assets/1782743036226.jpg';
import { NavLink } from 'react-router';
import { useCurrentUser } from '@/Pages/Home/Home';
import { House } from 'lucide-react';
import { Compass } from 'lucide-react';
import { Bell } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { Settings } from 'lucide-react';
import { LogOut } from 'lucide-react';
import {Button} from '@/components/ui/button'
import { ModeToggle } from './Theming/mode-toggle';

interface sidebarPropsType{
    sidebarOpen: boolean,
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileSidebar({sidebarOpen, setSidebarOpen}: sidebarPropsType) {
  const {data: CurrentUser} = useCurrentUser();

  return (
    <div className={`w-full h-dvh bg-black/50 fixed transition-all duration-500 top-0 left-0 z-20 `} onClick={()=> setSidebarOpen(false)}>

        <div className={`bg-sidebar h-full flex flex-col transition-all duration-500 absolute top-0 left-0  w-0 ${sidebarOpen && 'w-[80%] p-3.5'}`} onClick={(e)=> e.stopPropagation()}>

            <div className='flex items-center justify-between mb-10'>
              <h1 className='logo text-3xl font-bold text-primary max-md:flex-1'>Linkora</h1>
              <XIcon size={30} duration={1} onClick={()=> setSidebarOpen(false)}/>
            </div>

          <div className='flex flex-col flex-1 justify-between'>

            <div>
            <div className='flex items-center gap-2 mb-5 bg-card p-2 rounded-2xl'>
            <NavLink to='profile'><img src={userimage} alt="useImage" className="size-12 rounded-full"/></NavLink>
            <h1 className='text-xl font-bold'>{CurrentUser?.name}</h1>
            </div>
            <ul className=' flex flex-col gap-3 *:flex *:items-center *:gap-2 mb-20'>
               <NavLink to='/home' className={({isActive})=> `font-bold text-lg hover:bg-primary/20 hover:text-primary px-2 py-1 rounded-[10px] ${isActive && 'bg-primary/20 text-primary' }`} onClick={()=> setSidebarOpen(false)}><House className='size-5.5'/> Home</NavLink>
               <NavLink to='/explore' className={({isActive})=> `font-bold text-lg hover:bg-primary/20 hover:text-primary px-2 py-1 rounded-[10px] ${isActive && 'bg-primary/20 text-primary' }`} onClick={()=> setSidebarOpen(false)}> <Compass className='size-5.5'/> Explore</NavLink>
               <NavLink to='/notifications' className={({isActive})=> `font-bold text-lg hover:bg-primary/20 hover:text-primary px-2 py-1 rounded-[10px] ${isActive && 'bg-primary/20 text-primary' }`} onClick={()=> setSidebarOpen(false)}> <Bell className='size-5.5'/> Notifications</NavLink>
               <NavLink to='/messages' className={({isActive})=> `font-bold text-lg hover:bg-primary/20 hover:text-primary px-2 py-1 rounded-[10px] ${isActive && 'bg-primary/20 text-primary' }`} onClick={()=> setSidebarOpen(false)}><Mail className='size-5.5'/> Messages</NavLink>
               <NavLink to='/bookmarks' className={({isActive})=> `font-bold text-lg hover:bg-primary/20 hover:text-primary px-2 py-1 rounded-[10px] ${isActive && 'bg-primary/20 text-primary' }`} onClick={()=> setSidebarOpen(false)}><Bookmark className='size-5.5'/> Bookmarks</NavLink>
               <div className='px-2 py-1 rounded-[10px] '><span className='text-lg font-bold'>Dark Mode</span> <ModeToggle/></div>
           </ul>
          </div>

           <div className="buttons w-full *:w-full *:text-white *:text-lg flex flex-col gap-2 *:cursor-pointer">
             <Button className='bg-gray-500/60 py-5 font-bold rounded-[10px] text-md hover:bg-foreground/40'><Settings /> Settings</Button>
             <Button className='bg-red-500 hover:bg-red-400 p-5 font-bold rounded-[10px] text-md'><LogOut /> Sign Out</Button>
          </div>

         </div>
 
        </div>
    </div>
  )
}

export default MobileSidebar