import { useQuery } from "@tanstack/react-query";
import api from "@/Service/ApiContext";


export type LikesType = {
    id: string,
    userId: string,
    postId: string,
    createdAt: string,
}


const usePostsLikes = ()=>{
    return useQuery<LikesType[]>({
        queryKey: ['likes'],
        queryFn: async()=>{
            const {data} = await api.get<LikesType[]>('likes');
            return data;
        }
    })
}

export default usePostsLikes