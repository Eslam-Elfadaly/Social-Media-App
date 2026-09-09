import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/Service/ApiContext";

const useAddReplyLike = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async({userId, replyId} : {userId: string, replyId: string})=>{
            const {data} = await api.post('replyLikes', {
                userId : userId,
                replyId: replyId,
                createdAt: new Date().toISOString(),
            })
            return data;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['replyLikes']})
        }
    })
}

export default useAddReplyLike