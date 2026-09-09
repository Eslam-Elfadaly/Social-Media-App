import { useQuery } from "@tanstack/react-query";
import api from "@/Service/ApiContext";


export type UsersType = {
    id: string,
    name: string,
    username: string,
    email: string,
    password: string,
    avatar?: string,
    coverImage?: string,
    bio?: string,
    location?: string,
    website?: string,
    isVerified?: boolean,
    isOnline: boolean,
    createdAt: string,
    followersCount: number,
    followingCount: number,
    postsCount: number
}

const useUsers = ()=>{
   return useQuery<UsersType[]>({
        queryKey: ['users'],
        queryFn: async ()=>{
            const {data} = await api.get<UsersType[]>('users');
            return data
        }
    })
}

export default useUsers