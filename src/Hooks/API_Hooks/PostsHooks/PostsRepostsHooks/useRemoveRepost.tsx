import api from "@/Service/ApiContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface RepostIdType{
    repostId: string,
}


const useRemoveRepost = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async({repostId}: RepostIdType)=>{
            await api.delete(`reposts/${repostId}`)
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['reposts']})

        }
    })
}
export default useRemoveRepost