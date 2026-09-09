import React, { useEffect, useRef, useState } from 'react'
import PostCard from './PostCard'
import usePosts, {type PostType } from '@/Hooks/API_Hooks/PostsHooks/usePosts'
import useUsers from '@/Hooks/API_Hooks/useUsers';
import { X } from 'lucide-react';
import { Send } from 'lucide-react';

import userimage from '@/assets/1782743036226.jpg';
import useComments from '@/Hooks/API_Hooks/PostsHooks/CommentsHooks/comments/useComments';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/Pages/Home/Home';


import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

import { Heart } from 'lucide-react';
import useReplies from '@/Hooks/API_Hooks/PostsHooks/CommentsHooks/replies/useReplies';
import useCommentsLikes from '@/Hooks/API_Hooks/PostsHooks/CommentsHooks/CommentsLikes/useCommentsLikes';
import useAddCommentLike from '@/Hooks/API_Hooks/PostsHooks/CommentsHooks/CommentsLikes/useAddCommentLike';
import useRemoveCommentLike from '@/Hooks/API_Hooks/PostsHooks/CommentsHooks/CommentsLikes/useRemoveCommentLike';
import useReplyLikes from '@/Hooks/API_Hooks/PostsHooks/CommentsHooks/RepliesLikes/useReplyLikes';
import useAddReplyLike from '@/Hooks/API_Hooks/PostsHooks/CommentsHooks/RepliesLikes/useAddReplyLike';
import useRemoveReplyLike from '@/Hooks/API_Hooks/PostsHooks/CommentsHooks/RepliesLikes/useRemoveReplyLike';
import useAddComment from '@/Hooks/API_Hooks/PostsHooks/CommentsHooks/comments/useAddComment';
import useAddReply from '@/Hooks/API_Hooks/PostsHooks/CommentsHooks/replies/useAddReply';

import { Trash2Icon } from "@animateicons/react/lucide";

import useRemoveComment from '@/Hooks/API_Hooks/PostsHooks/CommentsHooks/comments/useRemoveComment';
import useRemoveReply from '@/Hooks/API_Hooks/PostsHooks/CommentsHooks/replies/useRemoveReply';

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
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"

interface commentsCardType{
  post : PostType,
  CommentsOpen: boolean,
  setCommentsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

function CommentsCard({post, CommentsOpen, setCommentsOpen}: commentsCardType) {

  const {data: currentUser} = useCurrentUser();

  const addCommentInputRef = useRef<HTMLInputElement>(null);

  const [replyTarget, setReplyTarget] = useState<{type: 'comment' | 'reply', id: string} | null>(null)

  
  const {data: users} = useUsers();
  const postAuthor  = users?.find((user)=> post?.authorId === user.id);

  const {data: comments, isPending: commentsPending} = useComments();
  const postComments = comments?.filter((comment)=> comment.postId === post?.id);
  
  const {data: posts} = usePosts();
  const commentPost = posts?.find((postComment)=> postComment?.id === post?.id);
  
  const {data: replies, isPending: repliesPending} = useReplies();
  const [viewRepliesToComments, setViewRepliesToComments] = useState<{id: string} | null>(null);
  const [viewRepliesToReplies, setViewRepliesToReplies] = useState<{id: string} | null>(null);
  
  const {data: commentsLikes} = useCommentsLikes();
  const {mutateAsync: addCommentLike} = useAddCommentLike();
  const {mutateAsync: removeCommentLike} = useRemoveCommentLike();
  const [commentInputField, setCommentInputField] = useState<string>('');
  const {mutateAsync: addComment} = useAddComment();
  const {mutate: removeComment} = useRemoveComment();
  
  const {data: repliesLikes} = useReplyLikes();
  const {mutateAsync: addReplyLike} = useAddReplyLike();
  const {mutateAsync: removeReplyLike} = useRemoveReplyLike();
  const [replyInputField, setReplyInputField] = useState<string>('');
  const {mutateAsync: addReply} = useAddReply();
  const {mutate: removeReply} = useRemoveReply();

  // form comment Date
  function formatTime(date: string){
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
  
  // update Comment likesCount
  async function handleCommentLikesCount(commentId: string, currentUserId: string){
    const commentLikeExist = commentsLikes?.find((commentLike)=> commentLike.commentId === commentId && commentLike.userId === currentUser?.id);

    if(commentLikeExist){
      await removeCommentLike({likeId: commentLikeExist?.id})
      return;
    }
    await addCommentLike({userId: currentUserId, commentId: commentId})
  }

  // update reply likesCount
  async function handleReplyLikesCount(replyId: string, currentUserId: string){
    const replyLikeExist = repliesLikes?.find((replyLike)=> replyLike.replyId === replyId && replyLike.userId === currentUser?.id);

    if(replyLikeExist){
      await removeReplyLike({likeId: replyLikeExist?.id})
      return;
    }
    await addReplyLike({userId: currentUserId, replyId: replyId})
  }

  // handle addComment
  async function handleAddComment(postId: string ,authorId: string , content:  string){

    if(content.trim() !== ''){
      await addComment({postId: postId , authorId: authorId, content: content })
      setCommentInputField('');
    }
    return;
  }

  // handle addReply
  async function handleAddReply(commentId: string ,authorId: string , content:  string, replyId: string | null){

    if(content.trim() !== ''){
      await addReply({commentId: commentId , authorId: authorId, content: content, parentReplyId: replyId })
      setReplyInputField('');
    }
    return;
  }

  // handle autoFocus for addComment field
  useEffect(()=>{
      if(!CommentsOpen) return;
        const timer = setTimeout(()=>{addCommentInputRef.current?.focus();}, 100) ;
        return ()=> clearTimeout(timer);
  }, [CommentsOpen])


  if(!currentUser) return;
  if(!commentPost) return;
  if(!replies) return;


  return (
    <div className={`w-dvw h-dvh bg-foreground/30 fixed top-0 left-0 z-20 transition-all duration-300`} onClick={()=> setCommentsOpen(false)}>
        <div className={`flex flex-col bg-card ${CommentsOpen && 'max-md:h-[95%]'} transition-all duration-300 absolute flex flex-col bg-background rounded-[10px] md:w-[55%] lg:w-[45%] max-md:w-full md:h-[90%] max-md:h-0 max-md:bottom-0 md:-translate-1/2 md:top-1/2 md:left-1/2`} onClick={(e)=> e.stopPropagation()}>

        <div className='py-5 text-center border-b-2 font-bold relative'>{postAuthor?.name}'s Post <X className='absolute top-1/2 -translate-1/2 right-0 bg-foreground/15 rounded-full p-1 size-8 stroke-3 cursor-pointer hover:bg-foreground/20 active:bg-foreground/20' onClick={()=> {setCommentsOpen(false); setReplyTarget(null)}}/></div>

        <div className='overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-card flex flex-col'>
        <PostCard post={commentPost}/>

  
        {postComments?.length === 0? 
        <div className='flex-1 flex items-center justify-center text-xl font-bold'>No comments yet</div>
        : 
        commentsPending? 

        postComments?.map((comment)=>{
          return(
            <div key={comment.id} className="p-3 flex gap-2">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-17 w-[270px]" />
              </div>
           </div>
          )
        })

        :
        // comments
        <ul id='comments' className=' p-3 flex flex-col gap-2 mt-3'>
          {postComments?.map((comment)=>{
            
            const commentAuthor = users?.find((user)=> user.id === comment.authorId);
            const commentReplies = replies?.filter((reply)=> reply?.commentId === comment.id && reply.parentReplyId === null);
            const commentLikeExist = commentsLikes?.find((commentLike)=> commentLike.commentId === comment.id && commentLike.userId === currentUser?.id);
            const commentLikes = commentsLikes?.filter((like)=> like.commentId === comment.id)

            return(
            <li key={comment.id}>

              <div className='flex gap-2 mb-2'>

              <img src={commentAuthor?.avatar} alt="" className='size-10 rounded-full cursor-pointer'/>
              <div>
                <div className='bg-foreground/10 p-2 rounded-2xl'>
                 <h3 className='text-sm font-bold cursor-pointer'>{commentAuthor?.name}</h3>
                 <p className='text-foreground/90'>{comment.content}</p>
                </div>

                <div className=' pl-2.5 text-foreground/70 flex items-center gap-3.5'>
                <Button variant='ghost' onClick={()=> handleCommentLikesCount(comment.id, currentUser?.id)} className='flex p-0 items-center gap-0.5 text-[14px] cursor-pointer'><Heart className={`size-4 hover:-translate-y-[1px] active:-translate-y-[1px] transition-all duration-0 ${commentLikeExist && 'fill-primary text-primary'}`}/>{commentLikes?.length}</Button>
                <Button onClick={()=> setReplyTarget({type: 'comment', id: comment.id})} variant='ghost' className='text-sm p-0 cursor-pointer'>Reply</Button>
                <span className='text-[14px]'>{formatTime(comment.createdAt)}</span>
                {commentAuthor?.id === currentUser?.id &&
                  <AlertDialog>
                     <AlertDialogTrigger render={<Trash2Icon size={18} duration={1} color="#ffffff" className='cursor-pointer'/>} />
                     <AlertDialogContent>
                       <AlertDialogHeader>
                         <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                       </AlertDialogHeader>
                       <AlertDialogFooter>
                         <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                         <AlertDialogAction className='cursor-pointer' onClick={()=> removeComment({commentId: comment?.id})}>Delete</AlertDialogAction>
                       </AlertDialogFooter>
                     </AlertDialogContent>
                   </AlertDialog>
                 }
                </div>

                {/* view replies To Comment button */}

                {commentReplies?.length > 0 &&
                viewRepliesToComments?.id !== comment.id &&
                <Button variant='ghost' onClick={()=> {setViewRepliesToComments({id: comment.id}); setReplyTarget(null)}} className=' cursor-pointer text-foreground/70 '>View {commentReplies?.length} {commentReplies?.length > 1 ? 'replies':'Reply' }{repliesPending && <Spinner />}</Button>
                }
              </div>
              </div>

              {/* replies to comment */}
              {
                viewRepliesToComments?.id === comment.id &&
               <ul className='pl-12 mb-3'>
              {
                commentReplies?.map((reply)=>{

                  const replyToCommentAuthor = users?.find((user)=> user.id === reply.authorId);
                  const replyToCommentLikeExist = repliesLikes?.find((Like)=> Like.replyId === reply.id && Like.userId === currentUser?.id);
                  const replyToCommentLikes = repliesLikes?.filter((like)=> like.replyId === reply.id)

                  const repliesToReplies = replies?.filter((replyToreply)=> replyToreply.commentId === comment.id && replyToreply.parentReplyId === reply.id);


                  return(
                  <div key={reply.id}>

                  <li  className='flex gap-2 mt-2 border-l-2 pl-3'>

                    <img src={replyToCommentAuthor?.avatar} alt="replyAuthor" className='size-8 rounded-full cursor-pointer'/>

                    <div>
                      <div className='bg-foreground/10 p-2 rounded-2xl'>
                       <h3 className='text-[13.5px] font-bold cursor-pointer'>{replyToCommentAuthor?.name}</h3>
                       <p className='text-foreground/90 text-[15px]'><span className='text-primary mr-1 cursor-pointer'>{commentAuthor?.name}</span>{reply?.content}</p>
                      </div>

                      <div className=' pl-2.5 text-foreground/70 flex items-center gap-3.5'> 
                      <Button onClick={()=> handleReplyLikesCount(reply.id, currentUser?.id)} variant='ghost' className='flex p-0 items-center gap-0.5 text-[14px] cursor-pointer'><Heart className={`size-4 hover:-translate-y-[1px] active:-translate-y-[1px] transition-all duration-0 ${replyToCommentLikeExist && 'fill-primary text-primary'}`}/>{replyToCommentLikes?.length}</Button>
                      <Button variant='ghost' className='text-sm p-0 cursor-pointer' onClick={()=> setReplyTarget({type: 'reply', id: reply.id})}>Reply</Button>
                      <span className='text-[14px]'>{formatTime(reply.createdAt)}</span>
                       {replyToCommentAuthor?.id === currentUser?.id && 
                       <AlertDialog>
                         <AlertDialogTrigger render={<Trash2Icon size={18} duration={1} color="#ffffff" className='cursor-pointer'/>} />
                         <AlertDialogContent>
                           <AlertDialogHeader>
                             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                           </AlertDialogHeader>
                           <AlertDialogFooter>
                             <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                             <AlertDialogAction className='cursor-pointer' onClick={()=> removeReply({replyId: reply?.id})}>Delete</AlertDialogAction>
                           </AlertDialogFooter>
                         </AlertDialogContent>
                       </AlertDialog>
                       }

                      </div>

                      {/* view replies To reply button */}
                      {
                       repliesToReplies?.length > 0 &&
                       viewRepliesToReplies?.id !== reply.id &&
                      <Button variant='ghost' onClick={()=> {setViewRepliesToReplies({id: reply.id}); setReplyTarget(null)}} className='cursor-pointer text-foreground/70 '>View {repliesToReplies?.length} {repliesToReplies?.length > 1 ? 'replies':'Reply' } {repliesPending && <Spinner />}</Button>
                      }
                      </div>

                  </li>


                  {/* replies to reply */}
                  {
                  viewRepliesToReplies?.id === reply.id &&
                  <ul className='pl-12 mb-3'>
                    {repliesToReplies?.map((replyToReply)=>{

                      const replyToReplyAuthor = users?.find((user)=> user.id === replyToReply.authorId);
                      const replyToReplyLikeExist = repliesLikes?.find((Like)=> Like.replyId === replyToReply.id && Like.userId === currentUser?.id);
                      const replyToReplyLikes = repliesLikes?.filter((like)=> like.replyId === replyToReply.id)

                      return(
                        <div key={replyToReply.id}>
                          
                          <li  className='flex gap-2 mt-2 border-l-2 pl-3'>
                          <img src={replyToReplyAuthor?.avatar} alt="replyAuthor" className='cursor-pointer size-7 rounded-full'/>

                          <div>
                            <div className='bg-foreground/10 p-2 rounded-2xl'>
                             <h3 className='text-[13.5px] font-bold cursor-pointer'>{replyToReplyAuthor?.name}</h3>
                             <p className='text-foreground/90 text-[15px]'><span className='text-primary mr-1 cursor-pointer'>{replyToCommentAuthor?.name}</span>{replyToReply?.content}</p>
                            </div>
      
                            <div className=' pl-2.5 text-foreground/70 flex items-center gap-3.5'> 
                            <Button onClick={()=> handleReplyLikesCount(replyToReply.id, currentUser?.id)} variant='ghost' className='flex p-0 items-center gap-0.5 text-[14px] cursor-pointer'><Heart className={`size-4 hover:-translate-y-[1px] active:-translate-y-[1px] transition-all duration-0 ${replyToReplyLikeExist && 'fill-primary text-primary'}`}/>{replyToReplyLikes?.length}</Button>
                            <Button variant='ghost' className='text-sm p-0 cursor-pointer' >Reply</Button>
                            <span className='text-[14px]'>{formatTime(replyToReply.createdAt)}</span>
                            {replyToReplyAuthor?.id === currentUser?.id &&  
                               <AlertDialog>
                                 <AlertDialogTrigger render={<Trash2Icon size={18} duration={1} color="#ffffff" className='cursor-pointer'/>} />
                                 <AlertDialogContent>
                                   <AlertDialogHeader>
                                     <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                   </AlertDialogHeader>
                                   <AlertDialogFooter>
                                     <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                                     <AlertDialogAction onClick={()=> removeReply({replyId: replyToReply?.id})} className='cursor-pointer'>Delete</AlertDialogAction>
                                   </AlertDialogFooter>
                                 </AlertDialogContent>
                               </AlertDialog>
                               }
                            </div>
                          
                            </div>
                            </li>
                        </div>
                      )
                    })}

                    {/* hide replies to reply */}
                    {viewRepliesToReplies && repliesToReplies?.length > 0 &&  <Button variant='ghost' onClick={()=> {setViewRepliesToReplies(null); setReplyTarget(null)}} className=' cursor-pointer text-foreground/70 '>hide  {repliesToReplies?.length > 1 ? 'replies':'Reply' }</Button>}

                  </ul>}

                 {/* add reply to reply*/}
                 {replyTarget?.type === 'reply' &&
                  replyTarget?.id === reply.id &&                  
                  <div className='mb-5 mt-2'>
                  <div className='flex gap-2 items-center border-l-3 pl-3 relative'>
                    <img src={userimage} alt="userImage" className='size-7 rounded-full' />
                    <div className='relative flex-1'>
                    <input type="text" value={replyInputField} onChange={(e)=> setReplyInputField(e.target.value)}  autoFocus={replyTarget?.id === reply.id}  placeholder='Write a comment..' className='text-[15px] px-2 pt-1 pb-6 w-full rounded-[8px] border-1 bg-foreground/10'/>
                    <Send onClick={()=> handleAddReply(comment.id, currentUser?.id, replyInputField, reply.id)} className='text-foreground/70 absolute bottom-2 right-2 size-5 hover:text-primary active:text-primary cursor-pointer '/>
                    <span className='absolute bottom-1 left-2 text-primary text-[14px]'>{replyToCommentAuthor?.name}</span>
                    </div>
                  </div>
                 </div>}
                  


                </div>
              )})}
              
              {/* hide replies to Comment */}
              {viewRepliesToComments && commentReplies?.length > 0 &&  <Button variant='ghost' onClick={()=> {setViewRepliesToComments(null); setViewRepliesToReplies(null); setReplyTarget(null)}} className=' cursor-pointer text-foreground/70 '>hide  {commentReplies?.length > 1 ? 'replies':'Reply' }</Button>}

                 </ul>}

                  

                 {/* add reply to comment*/}
                 {replyTarget?.type === 'comment' &&
                  replyTarget?.id === comment.id &&                  
                  <div className='pl-12 mb-5'>
                  <div className='flex gap-2 items-center border-l-3 pl-3 relative'>
                    <img src={userimage} alt="userImage" className='size-8 rounded-full' />
                    <div className='relative flex-1'>
                    <input type="text" value={replyInputField} onChange={(e)=> setReplyInputField(e.target.value)}  autoFocus={replyTarget?.id === comment.id}  placeholder='Write a comment..' className='text-[15px] px-2 pt-1 pb-6 w-full rounded-[8px] border-1 bg-foreground/10'/>
                    <Send onClick={()=> handleAddReply(comment.id, currentUser?.id, replyInputField, null)} className='text-foreground/70 absolute bottom-2 right-2 size-5 hover:text-primary active:text-primary cursor-pointer '/>
                    <span className='absolute bottom-1 left-2 text-primary text-[14px]'>{commentAuthor?.name}</span>
                    </div>
                  </div>
                 </div>
                 }


            </li>
          )})}
        </ul>
        }

        </div>

        {/* write comment */}
        <div className='py-7 px-4 flex gap-2 items-center border-t-2'>
          <img src={userimage} alt="userImage" className='size-10 rounded-full' />
          <input type="text" value={commentInputField} onChange={(e)=> setCommentInputField(e.target.value)} ref={addCommentInputRef}  placeholder='Write a comment..' className='p-2 flex-1 rounded-2xl bg-foreground/10'/>
          <Send onClick={()=> handleAddComment(commentPost?.id, currentUser?.id, commentInputField)} className='text-foreground/70 size-6 hover:text-primary active:text-primary cursor-pointer '/>
        </div>

        </div>

    </div>
  )
}

export default CommentsCard