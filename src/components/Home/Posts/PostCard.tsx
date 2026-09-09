
import type { PostType } from '@/Hooks/API_Hooks/PostsHooks/usePosts'
import useUsers from '@/Hooks/API_Hooks/useUsers';
import usePostsLikes from '@/Hooks/API_Hooks/PostsHooks/PostslikesHooks/usePostsLikes';
import useAddPostLike from '@/Hooks/API_Hooks/PostsHooks/PostslikesHooks/useAddPostLike';
import useRemovePostLike from '@/Hooks/API_Hooks/PostsHooks/PostslikesHooks/useRemovePostLike';
import useFollowers from '@/Hooks/API_Hooks/FollowsHooks/useFollowers';
import useAddFollow from '@/Hooks/API_Hooks/FollowsHooks/useAddFollow';
import useRemoveFollow from '@/Hooks/API_Hooks/FollowsHooks/useRemoveFollow';
import useUpdateUserFollowers from '@/Hooks/API_Hooks/FollowsHooks/useUpdateUserFollowers';
import useUpdateUserFollowing from '@/Hooks/API_Hooks/FollowsHooks/useUpdateUserFollowing';

import { useCurrentUser } from '@/Pages/Home/Home';
import { Button } from '../../ui/button';

import { Heart } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Repeat2 } from 'lucide-react';

import '@/App.css'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import useAddRepost from '@/Hooks/API_Hooks/PostsHooks/PostsRepostsHooks/useAddRepost';
import useReposts from '@/Hooks/API_Hooks/PostsHooks/PostsRepostsHooks/useReposts';
import useRemoveRepost from '@/Hooks/API_Hooks/PostsHooks/PostsRepostsHooks/useRemoveRepost';
import { useContext, useState } from 'react';
import { CommentCardContext } from '@/Contexts/CommentCard_Context';

import useComments from '@/Hooks/API_Hooks/PostsHooks/CommentsHooks/comments/useComments';

import { EllipsisIcon } from "@animateicons/react/lucide";
import { XIcon } from "@animateicons/react/lucide";
import ViewPostImages from './ViewPostImages';



export interface postPropsType{
  post: PostType
}

function PostCard({post}:postPropsType) {

  // commentContext
  const context = useContext(CommentCardContext);
  if(!context) return null;
  const {CommentsOpen, setCommentsOpen, setCommentPost} = context;

  const {data: users} = useUsers();
  const {data: CurrentUser} = useCurrentUser();
  
  const {data: followers} = useFollowers();
  const {mutateAsync: addFollow} = useAddFollow();
  const {mutateAsync: removeFollow} = useRemoveFollow();
  const {mutateAsync: updateUserFollowers} = useUpdateUserFollowers();
  const {mutateAsync: updateUserFollowing} = useUpdateUserFollowing();
  
  const {data: reposts} = useReposts();
  const {mutateAsync: addRepost, isPending: isAddRepostPending} = useAddRepost();
  const {mutateAsync: removeRepost, isPending: isRemoveRepostPending} = useRemoveRepost();
  const postReposts = reposts?.filter((repost)=> repost.postId === post.id)
  
  const {data: postsLikes} = usePostsLikes();
  const {mutateAsync: addPostLike, isPending: isAddingLike} = useAddPostLike();
  const {mutateAsync: removePostLike, isPending: isRemovingLike} = useRemovePostLike();
  const postLikes = postsLikes?.filter((like)=> like.postId === post?.id)
  const currentUserLikes  = postsLikes?.filter((like)=> (like?.userId) === CurrentUser?.id);
  const postAuthor  = users?.find((user)=> post?.authorId === user.id);

  const {data: comments} = useComments();
  const postComments = comments?.filter((comment)=> comment.postId === post?.id);

  const [viewPostImages, setViewPostImages] = useState<boolean>(false);

    if(!CurrentUser) return;

    // form postTime
    const formatTime = (date: string) => {

    const postDate = new Date(date)

    const minutes = differenceInMinutes(new Date(), postDate);

    if (minutes < 60) {
      return `${minutes}m`;
    }

     const hours = differenceInHours(new Date(), postDate);
    
     if (hours < 24) {
       return `${hours}h`;
     }
    
     const days = differenceInDays(new Date(), postDate);
    
     return `${days}d`;
     };

    //  form Post reacts count
     const FormatCount = (count: number)=>{
        if(count >= 1_000_000){
             return <>{(count / 1_000_000).toFixed(1)}M</>
        }
        else if(count >= 1_000){
            return <>{(count / 1000).toFixed(1)}K </>
        }
        else{
            return count
        }
     }

    //  handle post Likes
    const likeExist = currentUserLikes?.find((like)=> like.userId === CurrentUser?.id && like.postId === post?.id)
    async function handlePostLikes(currentUserId: string, postId: string){
             
      if(isAddingLike || isRemovingLike) return;

            if(likeExist){
              await removePostLike({ likeId: likeExist.id});
              return;
            }
            await addPostLike({userId: currentUserId, postId: postId}) ;
          }

    // handle follow Button
    function handleFollowButton(){

      const currentUserFollowing = followers?.filter((follow)=> follow.followerId === CurrentUser?.id);
      const isFollowing = currentUserFollowing?.some((follow)=>follow.followingId === post.authorId)

      if(!CurrentUser) return;

      if(isFollowing){
        return <AlertDialog>
                     <AlertDialogTrigger render={<Button className='bg-transparent text-foreground/60 text-[15px] cursor-pointer hover:bg-transparent hover:text-foreground/80 active:text-foreground/80 p-0 h-fit'>Following</Button>}/>
                     <AlertDialogContent>
                       <AlertDialogHeader>
                         <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                       </AlertDialogHeader>
                       <AlertDialogFooter className='flex'>
                         <AlertDialogCancel>Cancel</AlertDialogCancel>
                         <AlertDialogAction onClick={() =>handleFollows(CurrentUser?.id, post?.authorId)} >Unfollow</AlertDialogAction>
                       </AlertDialogFooter>
                     </AlertDialogContent>
                   </AlertDialog>
                   }
      else{
        return <Button onClick={() =>handleFollows( CurrentUser?.id , post?.authorId)} className='bg-transparent text-primary font-semibold text-[15px] cursor-pointer hover:bg-transparent hover:text-primary/80 active:text-primary/80 p-0 h-fit gap-1'><span className='text-xl'>+</span>Follow </Button>
        }
    }

    // handle {add , remove, update} follows
    async function handleFollows(CurrentUserId: string, postAuthorId: string){

      const FollowExist = followers?.find((follow)=> follow.followerId === CurrentUserId && follow.followingId === postAuthorId);

      if(!postAuthor) return ;
      if(!CurrentUser) return ;

      // currentUserFollowing -1 && postAuthorFollowers -1
      if(FollowExist){
        await removeFollow({followId: FollowExist.id});
        await updateUserFollowing({userId: CurrentUserId, followingCount : CurrentUser.followingCount -1});
        await updateUserFollowers({userId: postAuthorId, followersCount: postAuthor.followersCount -1})
        return;
      }
      // currentUserFollowing +1 && postAuthorFollowers +1
      await addFollow({followerId: CurrentUserId, followingId: postAuthorId})
      await updateUserFollowing({userId: CurrentUserId, followingCount : CurrentUser.followingCount +1})
      await updateUserFollowers({userId: postAuthorId, followersCount: postAuthor.followersCount +1})
    }

    // handle {add, remove, update} reposts
    const repostExist = reposts?.find((repost)=> repost.postId === post?.id && repost.userId === CurrentUser?.id);
    async function handleReposts(postId: string, currentUserId: string){
      
      if(isAddRepostPending || isRemoveRepostPending ) return;
      
        if(repostExist){
          await removeRepost({repostId: repostExist?.id})
          return;
        } 
        await addRepost({postId: postId, userId: currentUserId})
    
    }


    // handle comments Card
    function handleCommentCard(){

      if(!CommentsOpen){
        setCommentsOpen(!CommentsOpen);
        setCommentPost(post);
      }
      return;
    }

  return (
    <div className='bg-card p-3 mt-1 rounded-[8px] flex flex-col '>

        <div id='postHeader' className='flex gap-3 justify-between'>

            <div className='flex items-center gap-2'>
            <img id='authorImage' src={postAuthor?.avatar} alt="userAvatar" className='rounded-full size-10 cursor-pointer'/>
            <div id='postInfo'>
                <div className='flex items-center gap-1'>
                  <h2 id='authorName' className='font-bold cursor-pointer'>{postAuthor?.name}</h2>
                  <span className='text-foreground/70'>.</span>
                  {handleFollowButton()}
                </div>
                <div className='flex items-center'>
                  <h4 id='useName' className= 'text-foreground/50 text-sm'>@{postAuthor?.username} . </h4>
                  <span id='postTime' className='text-sm text-foreground/60'>{formatTime(post?.createdAt ?? '')}</span>
                </div>
            </div>
            </div>

            <div id="icons" className='flex items-start gap-3 *:hover:text-foreground/80 *:active:text-foreground/80 *:cursor-pointer'>
                <EllipsisIcon size={25} duration={1}  />
                {!CommentsOpen && <XIcon size={23} duration={1} />}
            </div>

        </div>


            {post?.content &&
             <p id="postContent" className='mt-3 text-[15px]'>{post?.content}</p>
             }
             


            {post?.images && post.images.length > 0 && (
            <div className="w-full mt-2 pb-2 border-b-2">
              <Swiper pagination={{ type: 'fraction' }} navigation={true} modules={[Pagination, Navigation]} className="mySwiper w-full">
               {post.images.map((img, index) => (
                 <SwiperSlide key={`${post.id}-${index}`} className="flex  items-center justify-center" >
                  <img src={img} alt="postImage" className="w-full cursor-pointer lg:max-h-[500px] object-cover" onClick={()=> setViewPostImages(true)}/>
                 </SwiperSlide>
               ))}
             </Swiper>
            </div>
           )}

           {viewPostImages && <ViewPostImages post={post} viewPostImages={viewPostImages} setViewPostImages={setViewPostImages}/>}
    
            <ul id='actions' className='flex items-center gap-5 mt-2 *:flex *:items-center *:gap-1 *:cursor-pointer '>
            <li><Heart onClick={()=>handlePostLikes(CurrentUser?.id, post?.id)} className={`size-5.5 hover:-translate-y-[1px] active:-translate-y-[1px] transition-all duration-0 ${likeExist && 'fill-primary text-primary'}`}/>{FormatCount((postLikes?.length ?? 0))}</li>
            <li><MessageCircle onClick={handleCommentCard} className='size-5.5 hover:-translate-y-[1px] transition-all duration-200  active:-translate-y-[1px]'/> {FormatCount((postComments?.length ?? 0))}</li>
            <li><Repeat2 onClick={()=> {handleReposts(post?.id, CurrentUser?.id)}} className={`size-5.5 hover:-translate-y-[1px] transition-all duration-200 active:-translate-y-[1px] ${repostExist && `rotate-180 text-primary`}`}/> {FormatCount((postReposts?.length ?? 0))}</li>
            </ul>
    </div>
  )
}

export default PostCard