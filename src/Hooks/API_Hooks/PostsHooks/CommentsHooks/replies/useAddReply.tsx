import api from "@/Service/ApiContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface addReplyType{
    commentId:string,
    authorId: string,
    content: string,
    parentReplyId: string | null,
}

const useAddReply = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(replyData: addReplyType)=> {
            await api.post('replies',{
                ...replyData,
                createdAt: new Date().toISOString(),
                likesCount: 0,
            })
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['replies']})
        }

    })
}

export default useAddReply