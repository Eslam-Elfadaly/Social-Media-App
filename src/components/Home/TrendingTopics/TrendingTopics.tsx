import React from 'react'
import { Button } from '../../ui/button'
import useTrendingTopics from '@/Hooks/API_Hooks/useTrendingTopics'
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from 'react'
import SeeAllTrendingTopics from './SeeAllTrendingTopics'

function TrendingTopics() {

    const [AllTrendingCard, setAllTrendingCard] = useState<boolean>(false);

    const {data: trending, isPending: trendingPending} = useTrendingTopics();;
    const trendingInHome = trending?.slice(0, 4);

    const handlePostsCount = (count: number)=>{
        if(count >= 10_000){
            return (count/1_000).toFixed(1)
        }
        else{
            return (count/1000).toFixed(1)
        }
    }

    
  return (
    <div className='size-full bg-card p-3.5 rounded-[8px]'>

    <div className='flex items-center mb-5 justify-between'>
      <h2 className='font-bold'>Trending</h2>
      <Button variant='outline' className='cursor-pointer rounded-[10px]' onClick={()=> setAllTrendingCard(true)}>See all</Button>
    </div>
    
    <ul className='flex flex-col gap-4'>
        {trendingPending? 

        trendingInHome?.map((trend)=> {
            return(
                 <div key={trend.id} className="space-y-2">
                   <Skeleton className="h-4 w-[100px]" />
                   <Skeleton className="h-4 w-[170px]" />
               </div>
                 )
           })
        :
        trendingInHome?.map((trend)=>{
            return(
                <li key={trend.id}>
                    <h3>{trend?.name}</h3>
                    <h4 className='text-foreground/70 text-sm'>{handlePostsCount(trend?.postsCount)}K posts . <span className='uppercase'>{trend?.category}</span></h4>
                </li>
            )
        })}
    </ul>

      {AllTrendingCard && trending && <SeeAllTrendingTopics trendingPending={trendingPending} trending = {trending} AllTrendingCard={AllTrendingCard} setAllTrendingCard={setAllTrendingCard}/>}

    </div>
  )
}

export default TrendingTopics