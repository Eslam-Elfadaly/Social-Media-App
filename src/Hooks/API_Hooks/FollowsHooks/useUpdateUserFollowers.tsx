import { useMutation } from "@tanstack/react-query";
import api from "@/Service/ApiContext";
import { useQueryClient } from "@tanstack/react-query";

interface UpdateFollowersType{
    userId: string ,
    followersCount: number,
}
const useUpdateUserFollowers = ()=>{
    const QueryClient = useQueryClient();
    return useMutation({
        mutationFn: async({userId, followersCount}: UpdateFollowersType)=>{
            await api.patch(`users/${userId}`, {
                followersCount: followersCount,
            })
        },
        onSuccess: ()=>{
            QueryClient.invalidateQueries({queryKey: ['users']})
        },
    })
}
export default useUpdateUserFollowers