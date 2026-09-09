import { useQuery } from "@tanstack/react-query";
import api from "@/Service/ApiContext";

export interface SuggestToFollowType{
id: string,
userId: string,
suggestedUserId: string,
mutualFollowersCount: number,
reason: string,
}


const useSuggestToFollow = ()=>{
    return useQuery<SuggestToFollowType[], Error>({
        queryKey:['suggestedUsers'],
        queryFn: async ()=>{
            const {data} = await api.get<SuggestToFollowType[]>('suggestedUsers');
            return data;
        }
    })
}

export default useSuggestToFollow;