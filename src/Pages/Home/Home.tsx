import CreatePost from '@/components/Home/Posts/CreatePost'
import PostCard from '@/components/Home/Posts/PostCard'
import usePosts from '@/Hooks/API_Hooks/PostsHooks/usePosts';
import SuggestedForYou from '@/components/Home/SuggestedForYou/SuggestedForYou';
import useSuggestToFollow from '@/Hooks/API_Hooks/SeggestedToFollowHooks/useSuggestToFollow'
import type { UsersType } from '@/Hooks/API_Hooks/useUsers';
import useUsers from '@/Hooks/API_Hooks/useUsers';
import TrendingTopics from '@/components/Home/TrendingTopics/TrendingTopics';
import { useQuery } from '@tanstack/react-query';
import api from '@/Service/ApiContext';
import CommentsCard from '@/components/Home/Posts/CommentsCard';
import { useContext, useState } from 'react';
import { CommentCardContext } from '@/Contexts/CommentCard_Context';
import NavBar from '@/components/NavBar';
import MobileSidebar from '@/components/MobileSidebar';
import { Skeleton } from "@/components/ui/skeleton"

// CurrentUser
export const useCurrentUser = ()=>{ 
  return useQuery<UsersType>({
  queryKey: ['users', 1],
  queryFn: async()=>{
    const {data} = await api.get<UsersType>('users/1');
    return data;
  }
})}

function Home() {

  const {data: posts, isPending: postsPending} = usePosts();
  const {data: CurrentUser} = useCurrentUser();
  const {data: suggestToFollow, isPending: suggestedPending} = useSuggestToFollow();
  const {data: users} = useUsers();

  const currentUserSuggests = suggestToFollow?.filter((sugg) => sugg.userId === CurrentUser?.id);
  const suggestedUsers = users?.filter((user)=> currentUserSuggests?.some((userSugg)=> userSugg.suggestedUserId === user.id))

  // comments context
  const context = useContext(CommentCardContext);
  if(!context) return null;
  const {CommentsOpen, setCommentsOpen, commentPost} = context;

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  return (

    <>

    <div className='md:hidden fixed z-20 top-0 left-0 w-full py-4 bg-sidebar'>
    {/* mobile Navbar */}
    <NavBar setSidebarOpen={setSidebarOpen}/>
    {/* mobile sidebar */}
    {sidebarOpen && <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>}
    </div>

    {/* home content */}
    <div className=' lg:flex md:flex-1 max-md:mt-8 gap-2 overflow-y-scroll scrollbar-thumb-sidebar scrollbar-thin'>
      <div className='lg:flex-1/4 lg:w-0'>

        <CreatePost/>

        {postsPending? 
        <>
        <Skeleton className="p-3 mt-2 h-40 rounded-[8px]" />
        <Skeleton className=" p-3 mt-2 h-40 rounded-[8px]" />
        <Skeleton className=" p-3 mt-2 h-40 rounded-[8px]" />
        </>
        :
        posts?.map((post)=>{
          return (
            <PostCard key={post.id} post={post}/>
          )
        })}
        
        { commentPost && CommentsOpen &&  <CommentsCard post={commentPost} CommentsOpen={CommentsOpen} setCommentsOpen={setCommentsOpen}/>}
        </div>

        {/* suggest and trending */}
        <div className='max-lg:hidden lg:flex-1 flex flex-col gap-2'>
        <SuggestedForYou suggestedUsers={suggestedUsers ?? []} suggestedPending = {suggestedPending} currentUserSuggests={currentUserSuggests ?? []}/>
        <TrendingTopics/>
        </div>
    </div>
    </>
  )
}

export default Home