import React from 'react'
import SideBar from '@/components/SideBar'
import { Outlet } from 'react-router'
import NavBar from '@/components/NavBar'
import PostCommentProvider from '@/Contexts/CommentCard_Context'
import MobileBottomNav from '@/components/MobileBottomNav'

function MainLayout() {

  return (
    <PostCommentProvider>

    <div className='m-auto pt-5 max-md:pt-4 h-dvh w-dvw lg:max-w-[75%] md:max-w-[85%]  max-md:max-w-[98%] bg-background flex flex-col'>
    {/* decktop navbar */}
    <div className='max-md:hidden'>
    <NavBar/>
    </div>

    <main className='md:flex gap-2 flex-1 md:mt-5 max-md:mt-3 overflow-y-auto pb-2'>
        <SideBar/>
        <Outlet/>
    </main>

    <MobileBottomNav/>
    </div>

    </PostCommentProvider>
  )
}

export default MainLayout