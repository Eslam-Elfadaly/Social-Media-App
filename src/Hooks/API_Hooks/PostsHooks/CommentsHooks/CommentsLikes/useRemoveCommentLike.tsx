import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/Service/ApiContext";

const useRemoveCommentLike = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async({likeId} : {likeId: string})=>{
            const {data} = await api.delete(`commentLikes/${likeId}`)
            return data;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['commentLikes']})
        }
    })
}

export default useRemoveCommentLike