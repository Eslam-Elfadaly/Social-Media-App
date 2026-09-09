import api from "@/Service/ApiContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface AddRepostType{
    userId: string,
    postId :string,
}


const useAddRepost = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(repostData: AddRepostType)=>{
            await api.post('reposts',{
                ...repostData,
                createdAt: new Date().toISOString(),
            })
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey:['reposts']})

        }
        
    })
}
export default useAddRepost