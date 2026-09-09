import { useQuery } from "@tanstack/react-query";
import api from "@/Service/ApiContext";


export interface UseReplyLikesType{
    id: string,
    userId:string,
    replyId:string,
    createdAt:string,
}

const useReplyLikes = ()=>{
    return useQuery<UseReplyLikesType[]>({
        queryKey:['replyLikes'],
        queryFn: async()=>{
            const {data} = await api.get<UseReplyLikesType[]>(`replyLikes`);
            return data;
        },
    })
}
export default useReplyLikes