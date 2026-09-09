import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/Service/ApiContext";

const useAddPostLike = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async({userId, postId} : {userId: string, postId: string})=>{
            const {data} = await api.post('likes', {
                userId : userId,
                postId: postId,
                createdAt: new Date().toISOString(),
            })
            return data;
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['likes']})
        }
    })
}

export default useAddPostLike