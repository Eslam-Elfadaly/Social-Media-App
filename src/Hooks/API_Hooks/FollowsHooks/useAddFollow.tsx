import { useMutation } from "@tanstack/react-query";
import api from "@/Service/ApiContext";
import { useQueryClient } from "@tanstack/react-query";

interface AddFollowData{
    followerId: string,
    followingId: string,
}

const useAddFollow = ()=>{
    const QueryClient = useQueryClient();
    return useMutation({
        mutationFn: async(followData: AddFollowData)=>{
            const {data} = await api.post('followers',{
                ...followData,
                createdAt: new Date().toISOString(),
            });
            return data;
        },
        onSuccess:()=>{
            QueryClient.invalidateQueries({queryKey: ['followers']})
        }
    })
}

export default useAddFollow