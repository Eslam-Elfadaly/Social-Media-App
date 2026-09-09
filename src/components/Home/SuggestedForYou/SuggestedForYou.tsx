import { Button } from '@/components/ui/button'
import { type UsersType } from '@/Hooks/API_Hooks/useUsers';
import SeeAllSugegestedCard from './SeeAllSugegestedCard';
import { useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"

import useAddFollow from '@/Hooks/API_Hooks/FollowsHooks/useAddFollow';
import useUpdateUserFollowers from '@/Hooks/API_Hooks/FollowsHooks/useUpdateUserFollowers';
import useUpdateUserFollowing from '@/Hooks/API_Hooks/FollowsHooks/useUpdateUserFollowing';

import { useCurrentUser } from '@/Pages/Home/Home';
import useRemoveSuggest from '@/Hooks/API_Hooks/SeggestedToFollowHooks/useRemoveSuggest';
import {type SuggestToFollowType } from '@/Hooks/API_Hooks/SeggestedToFollowHooks/useSuggestToFollow';

interface suggestedPropType{
  suggestedUsers: UsersType[],
  suggestedPending: boolean,
  currentUserSuggests: SuggestToFollowType[],
}

function SuggestedForYou({suggestedUsers, suggestedPending, currentUserSuggests}: suggestedPropType) {

  const [AllSuggestedCard, setAllSuggestedCard] = useState<boolean>(false);

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
    <div className='size-full bg-card p-3.5 rounded-[8px]'>
      <div className='flex items-center mb-7 justify-between'>
      <h2 className='font-bold'>Suggested for you</h2>
      <Button variant='outline' className='cursor-pointer rounded-[10px]' onClick={()=> setAllSuggestedCard(true)}>See all</Button>
      </div>

      <ul className='flex flex-col gap-5'>
      {suggestedPending? 

      suggestedUsers?.slice(0, 4)?.map((suggest)=>{
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
      suggestedUsers?.slice(0, 4)?.map((suggest)=>{
        return(
          <li key={suggest.id} className='flex  justify-between'>

            <div className='flex gap-2.5'>
            <img id='suggestUserImage' src={suggest.avatar} alt="userImage" className='size-11 rounded-full cursor-pointer'/>
            <div>
              <h3 id='name' className='font-bold text-foreground/80 cursor-pointer'>{suggest.name}</h3>
              <h4 id='useName' className='text-foreground/70 text-sm'>@{suggest?.username}</h4>
            </div>
            </div>

            <Button id='followButton' className='bg-transparent font-bold text-primary text-[15px] cursor-pointer hover:bg-transparent hover:text-primary/80 active:text-primary/80 p-0 h-fit gap-1' onClick={()=> handleFollows(CurrentUser?.id, suggest.id, suggest)}><span className='text-xl'>+</span> Follow</Button>
          </li>
        )
      })}
      </ul>

      {AllSuggestedCard && suggestedUsers && <SeeAllSugegestedCard currentUserSuggests={currentUserSuggests} suggestedPending={suggestedPending} suggestedUsers = {suggestedUsers} AllSuggestedCard={AllSuggestedCard} setAllSuggestedCard={setAllSuggestedCard}/>}
      </div>
  )
}

export default SuggestedForYou