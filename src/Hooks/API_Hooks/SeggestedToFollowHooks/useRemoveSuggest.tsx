import { useMutation } from "@tanstack/react-query";
import api from "@/Service/ApiContext";
import { useQueryClient } from "@tanstack/react-query";

const useRemoveSuggest = ()=>{

    const queryClient = useQueryClient();

    return useMutation({
            mutationFn: async({suggestId}: {suggestId: string})=>{
                await api.delete(`suggestedUsers/${suggestId}`)
            },
            onSuccess: ()=>{
                queryClient.invalidateQueries({queryKey:['suggestedUsers']})
            }
        })
    
}

export default useRemoveSuggest