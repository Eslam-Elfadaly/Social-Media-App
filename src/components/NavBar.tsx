import { Search } from 'lucide-react';
import { BellIcon } from "@animateicons/react/lucide";
import { MenuIcon } from "@animateicons/react/lucide";


interface setSidebarOpenType{
      setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

function NavBar({setSidebarOpen}: setSidebarOpenType) {
  
  function handleSetSidebarOpen(){
    if(setSidebarOpen){
      setSidebarOpen(true);
    }
  }
  return (
    <div className='flex items-center px-4 gap-5 w-full'>

          <MenuIcon size={25} className='md:hidden' onClick={handleSetSidebarOpen} duration={1} />

          <h1 className='logo text-3xl font-bold text-primary max-md:flex-1 text-center'>Linkora</h1>

          <div className='max-md:hidden search relative flex-1'>
          <input type="text" placeholder='Search' className='pl-9 w-full bg-accent rounded-2xl p-1.5 border-'/>
           <Search  className='size-4.5 absolute top-1/2 -translate-y-1/2 left-3'/>
          </div>

          <div className='md:hidden flex items-center'>
          <BellIcon size={25} duration={1} />
          </div>

    </div>
  )
}

export default NavBar