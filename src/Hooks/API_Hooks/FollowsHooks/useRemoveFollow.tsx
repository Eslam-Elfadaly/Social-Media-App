import { useMutation } from "@tanstack/react-query";
import api from "@/Service/ApiContext";
import { useQueryClient } from "@tanstack/react-query";



const useRemoveFollow = ()=>{
    const QueryClient = useQueryClient();
    return useMutation({
        mutationFn: async({followId} : {followId: string})=>{
             await api.delete(`followers/${followId}`);
        },

        onSuccess:()=>{
            QueryClient.invalidateQueries({queryKey: ['followers']})
        }
    })
}

export default useRemoveFollow