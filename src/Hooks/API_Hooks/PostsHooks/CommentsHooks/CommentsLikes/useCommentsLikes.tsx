import { useQuery } from "@tanstack/react-query";
import api from "@/Service/ApiContext";


export interface UseCommentsLikesType{
    id: string,
    userId:string,
    commentId:string,
    createdAt:string,
}

const useCommentsLikes = ()=>{
    return useQuery<UseCommentsLikesType[]>({
        queryKey:['commentLikes'],
        queryFn: async()=>{
            const {data} = await api.get<UseCommentsLikesType[]>(`commentLikes`);
            return data;
        },
    })
}
export default useCommentsLikes