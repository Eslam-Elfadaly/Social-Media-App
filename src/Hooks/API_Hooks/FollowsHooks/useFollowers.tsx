import { useQuery } from "@tanstack/react-query";
import api from "@/Service/ApiContext";

export type FollowersType = {
    id: string,
    followerId: string,
    followingId: string,
    createdAt: string,
}


const useFollowers = ()=>{
    return useQuery<FollowersType[]>({
        queryKey: ['followers'],
        queryFn: async()=>{
            const {data} = await api.get<FollowersType[]>('followers');
            return data;
        }
    })
}

export default useFollowers