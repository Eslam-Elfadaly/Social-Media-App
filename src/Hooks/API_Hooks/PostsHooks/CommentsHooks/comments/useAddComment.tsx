import api from "@/Service/ApiContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface addCommentType{
    postId:string,
    authorId: string,
    content: string,
}

const useAddComment = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(commentData: addCommentType)=> {
            await api.post('comments',{
                ...commentData,
                createdAt: new Date().toISOString(),
                likesCount: 0,
            })
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['comments']})
        }

    })
}

export default useAddComment