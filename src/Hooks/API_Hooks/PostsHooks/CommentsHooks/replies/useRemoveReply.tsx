import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/Service/ApiContext";

const useRemoveReply = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async({replyId} : {replyId: string})=>{
            const {data} = await api.delete(`replies/${replyId}`)
            return data;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['replies']})
        }
    })
}

export default useRemoveReply