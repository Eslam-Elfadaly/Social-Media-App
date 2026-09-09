import React from 'react'
import {type TrendingTopicsType } from '@/Hooks/API_Hooks/useTrendingTopics'
import { Skeleton } from "@/components/ui/skeleton"
import { XIcon } from "@animateicons/react/lucide";

interface AllTrendingType{
    trendingPending: boolean,
    trending: TrendingTopicsType[],
    AllTrendingCard: boolean,
    setAllTrendingCard: React.Dispatch<React.SetStateAction<boolean>>,
}

function SeeAllTrendingTopics({trendingPending, trending, AllTrendingCard, setAllTrendingCard}: AllTrendingType) {

       const handlePostsCount = (count: number)=>{
        if(count >= 10_000){
            return (count/1_000).toFixed(1)
        }
        else{
            return (count/1000).toFixed(1)
        }
    }

  return (
    <div className={`w-dvw h-dvh bg-foreground/30 fixed top-0 left-0 z-20 transition-all duration-300 invisible touch-none ${AllTrendingCard && 'visible'}`} onClick={()=> setAllTrendingCard(false)}>
        <div className={`flex flex-col bg-card ${AllTrendingCard && 'max-md:h-[95%]'} transition-all duration-300 absolute flex flex-col bg-background rounded-[10px] md:w-[40%] lg:w-[40%] p-4 max-md:w-full md:h-[90%] max-md:h-0 max-md:bottom-0 md:-translate-1/2 md:top-1/2 md:left-1/2`} onClick={(e)=> e.stopPropagation()}>

        <div className='flex justify-between items-center mb-10'>
          <h2 className='font-bold'>Trending Topics</h2>
          <XIcon size={25} duration={1}  className='cursor-pointer' onClick={()=> setAllTrendingCard(false)}/>
        </div>
        
          <ul className='flex flex-col gap-5'>
            {
            trendingPending? 

             trending?.map((trend)=>{
                  return(
                   <div key={trend.id} className="flex items-center gap-4">
                   <Skeleton className="h-12 w-12 rounded-full" />
                   <div className="space-y-2">
                     <Skeleton className="h-4 w-[250px]" />
                     <Skeleton className="h-4 w-[200px]" />
                   </div>
                 </div>

                  )
                })
              :
              trending?.map((trend)=>{
                return(
                 <li key={trend.id}>
                    <h3>{trend?.name}</h3>
                    <h4 className='text-foreground/70 text-sm'>{handlePostsCount(trend?.postsCount)}K posts . <span className='uppercase'>{trend?.category}</span></h4>
                </li>
                )
              })}
              </ul>
        </div>
    </div>
  )
}

export default SeeAllTrendingTopics