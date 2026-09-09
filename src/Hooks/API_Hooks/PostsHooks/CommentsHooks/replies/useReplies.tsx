import { useQuery } from "@tanstack/react-query";
import api from "@/Service/ApiContext";


export interface repliesType{
    id: string,
    commentId:string,
    authorId:string,
    content:string,
    createdAt:string,
    likesCount:number,
    parentReplyId: string | null
}


const useReplies = ()=>{
    return useQuery<repliesType[]>({
        queryKey:['replies'],
        queryFn: async ()=> {
            const {data} = await api.get<repliesType[]>('replies');
            return data
        }
    })
}
export default useReplies