import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/Service/ApiContext";

const useRemoveComment = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async({commentId} : {commentId: string})=>{
            const {data} = await api.delete(`comments/${commentId}`)
            return data;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['comments']})
        }
    })
}

export default useRemoveComment