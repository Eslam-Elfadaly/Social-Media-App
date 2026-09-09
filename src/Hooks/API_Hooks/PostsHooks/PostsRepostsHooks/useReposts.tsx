import { useQuery } from "@tanstack/react-query";
import api from "@/Service/ApiContext";

export interface RepostType {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

const useReposts = ()=>{

    return useQuery<RepostType[]>({
        queryKey: ['reposts'],
        queryFn: async () => {
            const {data} = await api.get<RepostType[]>('reposts');
            return data;
        }
    })
}

export default useReposts;