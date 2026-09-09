import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/Service/ApiContext";


const useRemovePostLike = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async({likeId} : {likeId: string})=>{
            await api.delete(`likes/${likeId}`)
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['likes']})
        }
    })
}

export default useRemovePostLike