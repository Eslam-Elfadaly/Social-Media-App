import React from 'react'
import '@/App.css'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import type { PostType } from '@/Hooks/API_Hooks/PostsHooks/usePosts';

interface viewPostImagesPropsType{
    post: PostType,
    viewPostImages: boolean,
    setViewPostImages: React.Dispatch<React.SetStateAction<boolean>>
}

function ViewPostImages({post, viewPostImages, setViewPostImages}: viewPostImagesPropsType) {
  return (
        <div className={`w-dvw h-dvh bg-black/70 fixed top-0 left-0 z-20 transition-all duration-300 invisible touch-none ${viewPostImages && 'visible'}`} onClick={()=> setViewPostImages(false)}>
        {/* <div className={`flex flex-col bg-card ${viewPostImages && 'max-md:h-[95%]'} transition-all duration-300 absolute flex flex-col bg-background rounded-[10px] md:w-[55%] lg:w-[45%] max-md:w-full md:h-[90%] max-md:h-0 max-md:bottom-0 md:-translate-1/2 md:top-1/2 md:left-1/2`} onClick={(e)=> e.stopPropagation()}> */}

             {post?.images && post.images.length > 0 && (
            <div className="w-full mt-2 transition-all px-2  duration-300 absolute top-1/2 left-1/2 -translate-1/2 md:w-[55%] lg:w-[45%] max-md:w-full" onClick={(e)=> e.stopPropagation()}>
              <Swiper pagination={{ type: 'fraction' }} navigation={true} modules={[Pagination, Navigation]} className="mySwiper w-full">
               {post.images.map((img, index) => (
                 <SwiperSlide key={`${post.id}-${index}`} className="flex  items-center justify-center" >
                  <img src={img} alt="postImage" className="w-full cursor-pointer lg:max-h-[500px] object-cover"/>
                 </SwiperSlide>
               ))}
             </Swiper>
            </div>
           )}
        </div>
        // </div>

  )
}

export default ViewPostImages