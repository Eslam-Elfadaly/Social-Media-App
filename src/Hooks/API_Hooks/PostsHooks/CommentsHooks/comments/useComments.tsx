import { useQuery } from "@tanstack/react-query";
import api from "@/Service/ApiContext";


export interface UseCommentsType{
    id: string,
    postId:string,
    authorId:string,
    content:string,
    createdAt:string,
    likesCount:number,
}

const useComments = ()=>{
    return useQuery<UseCommentsType[]>({
        queryKey:['comments'],
        queryFn: async()=>{
            const {data} = await api.get<UseCommentsType[]>(`comments`);
            return data;
        },
    })
}
export default useComments