import type { PostType } from "@/Hooks/API_Hooks/PostsHooks/usePosts";
import React, { createContext, useState } from "react";

export interface postCommentProviderType{
    CommentsOpen: boolean,
    setCommentsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    commentPost: PostType | undefined,
    setCommentPost: React.Dispatch<React.SetStateAction<PostType | undefined>>,
}

export const CommentCardContext = createContext<postCommentProviderType | undefined>(undefined);

function PostCommentProvider({children}: {children: React.ReactNode}){

    const [CommentsOpen, setCommentsOpen] = useState<boolean>(false);
    const [commentPost, setCommentPost] = useState<PostType>();
    
    return(
    <CommentCardContext.Provider value={{CommentsOpen, setCommentsOpen, commentPost, setCommentPost}}>
        {children}
    </CommentCardContext.Provider>
    )
}
export default PostCommentProvider