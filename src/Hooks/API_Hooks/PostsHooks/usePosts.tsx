import { useQuery } from "@tanstack/react-query";
import api from "@/Service/ApiContext";

export interface PostType {
  id: string;
  authorId: string;
  content?: string;
  images?: string[];
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  bookmarksCount: number;
}

const usePosts = ()=>{

    return useQuery<PostType[]>({
        queryKey: ['posts'],
        queryFn: async () => {
            const {data} = await api.get<PostType[]>('posts');
            return data;
        }
    })
}

export default usePosts;