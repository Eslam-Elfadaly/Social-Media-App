import { useMutation } from "@tanstack/react-query";
import api from "@/Service/ApiContext";
import { useQueryClient } from "@tanstack/react-query";

interface UpdateFollowingType{
    userId: string ,
    followingCount: number,
}
const useUpdateUserFollowing = ()=>{
    const QueryClient = useQueryClient();
    return useMutation({
        mutationFn: async({userId, followingCount}: UpdateFollowingType)=>{
            await api.patch(`users/${userId}`, {
                followingCount: followingCount,
            })
        },
        onSuccess: ()=>{
            QueryClient.invalidateQueries({queryKey: ['users']})
        }
    })
}
export default useUpdateUserFollowing