import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/Service/ApiContext";

const useAddCommentLike = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async({userId, commentId} : {userId: string, commentId: string})=>{
            const {data} = await api.post('commentLikes', {
                userId : userId,
                commentId: commentId,
                createdAt: new Date().toISOString(),
            })
            return data;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['commentLikes']})
        }
    })
}

export default useAddCommentLike