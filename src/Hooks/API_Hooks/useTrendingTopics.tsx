import { useQuery } from "@tanstack/react-query";
import api from "@/Service/ApiContext";

export interface TrendingTopicsType{
id: string,
name: string,
category: string,
postsCount: number,
}


const useTrendingTopics = ()=>{
    return useQuery<TrendingTopicsType[]>({
        queryKey:['trendingTopics'],
        queryFn: async ()=>{
            const {data} = await api.get<TrendingTopicsType[]>('trendingTopics');
            return data;
        }
    })
}

export default useTrendingTopics;