import React from 'react'
import {type UsersType } from '@/Hooks/API_Hooks/useUsers'
import { Button } from '@/components/ui/button'
import { XIcon } from "@animateicons/react/lucide";
import { Skeleton } from "@/components/ui/skeleton"
import {type SuggestToFollowType } from '@/Hooks/API_Hooks/SeggestedToFollowHooks/useSuggestToFollow';

import useAddFollow from '@/Hooks/API_Hooks/FollowsHooks/useAddFollow';
import useUpdateUserFollowers from '@/Hooks/API_Hooks/FollowsHooks/useUpdateUserFollowers';
import useUpdateUserFollowing from '@/Hooks/API_Hooks/FollowsHooks/useUpdateUserFollowing';

import { useCurrentUser } from '@/Pages/Home/Home';
import useRemoveSuggest from '@/Hooks/API_Hooks/SeggestedToFollowHooks/useRemoveSuggest';

interface AllSuggestedPropType{
  suggestedUsers: UsersType[],
  AllSuggestedCard: boolean,
  setAllSuggestedCard: React.Dispatch<React.SetStateAction<boolean>>
  suggestedPending: boolean,
  currentUserSuggests: SuggestToFollowType[],
  
}

function SeeAllSugegestedCard({suggestedUsers, AllSuggestedCard, setAllSuggestedCard, suggestedPending, currentUserSuggests}: AllSuggestedPropType) {

      const {data: CurrentUser} = useCurrentUser();

    const {mutateAsync: addFollow} = useAddFollow();
    const {mutateAsync: updateUserFollowers} = useUpdateUserFollowers();
    const {mutateAsync: updateUserFollowing} = useUpdateUserFollowing();

    const {mutateAsync: removeSuggest} = useRemoveSuggest();

      if(!CurrentUser) return ;


        // handle {add , remove, update} follows
    async function handleFollows(CurrentUserId: string, SuggestedUserId: string, SuggestedUser: UsersType){

      const currentUserSuggest = currentUserSuggests?.find((suggest)=> suggest.userId === CurrentUserId && suggest.suggestedUserId === SuggestedUserId);

      if(!CurrentUser) return ;
      if(!currentUserSuggest) return;

      // currentUserFollowing +1 && postAuthorFollowers +1 && RemoveSuggestedUser
      await addFollow({followerId: CurrentUserId, followingId: SuggestedUserId})
      await updateUserFollowing({userId: CurrentUserId, followingCount : CurrentUser.followingCount +1})
      await updateUserFollowers({userId: SuggestedUserId, followersCount: SuggestedUser.followersCount +1})
      await removeSuggest({suggestId: currentUserSuggest?.id})
    }

  return (
    <div className={`w-dvw h-dvh bg-foreground/30 fixed top-0 left-0 z-20 transition-all duration-300 invisible touch-none ${AllSuggestedCard && 'visible'}`} onClick={()=> setAllSuggestedCard(false)}>
        <div className={`flex flex-col bg-card ${AllSuggestedCard && 'max-md:h-[95%]'} transition-all duration-300 absolute flex flex-col bg-background rounded-[10px] md:w-[40%] lg:w-[40%] p-4 max-md:w-full md:h-[90%] max-md:h-0 max-md:bottom-0 md:-translate-1/2 md:top-1/2 md:left-1/2`} onClick={(e)=> e.stopPropagation()}>

        <div className='flex justify-between items-center mb-10'>
          <h2 className='font-bold'>Suggested for you</h2>
          <XIcon size={25} duration={1}  className='cursor-pointer' onClick={()=> setAllSuggestedCard(false)}/>
        </div>
        
          <ul className='flex flex-col gap-5'>
            {
            suggestedPending? 

             suggestedUsers?.map((suggest)=>{
                  return(
                   <div key={suggest.id} className="flex items-center gap-4">
                   <Skeleton className="h-12 w-12 rounded-full" />
                   <div className="space-y-2">
                     <Skeleton className="h-4 w-[250px]" />
                     <Skeleton className="h-4 w-[200px]" />
                   </div>
                 </div>

                  )
                })
              :
              suggestedUsers?.map((suggest)=>{
                return(
                  <li key={suggest.id} className='flex  justify-between'>
        
                    <div className='flex gap-2.5'>
                    <img id='suggestUserImage' src={suggest.avatar} alt="userImage" className='size-11 rounded-full cursor-pointer'/>
                    <div>
                      <h3 id='name' className='font-bold cursor-pointer'>{suggest.name}</h3>
                      <h4 id='useName' className='text-foreground/70 text-sm'>@{suggest?.username}</h4>
                    </div>
                    </div>
        
                    <Button id='followButton' className='bg-transparent font-bold text-primary text-[15px] cursor-pointer hover:bg-transparent hover:text-primary/80 active:text-primary/80 p-0 h-fit gap-1' onClick={()=> handleFollows(CurrentUser?.id, suggest.id, suggest)}><span className='text-xl'>+</span> Follow</Button>
                  </li>
                )
              })}
              </ul>
        </div>
    </div>
  )
}

export default SeeAllSugegestedCard