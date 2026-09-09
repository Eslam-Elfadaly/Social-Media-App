import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/Service/ApiContext";

const useRemoveReplyLike = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async({likeId} : {likeId: string})=>{
            const {data} = await api.delete(`replyLikes/${likeId}`)
            return data;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['replyLikes']})
        }
    })
}

export default useRemoveReplyLike