import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import api from "@/Service/ApiContext";
import { toast } from "@/components/ui/toast";

interface CreatePostData {
  authorId: string;
  content?: string;
  images: File[];
}

const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: CreatePostData) => {

      const imageUrls = await Promise.all(
        post.images.map(async (image) => {

          const formData = new FormData();

          formData.append("file", image);

          formData.append(
            "upload_preset",
            import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
          );

          const { data } = await axios.post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/image/upload`,
            formData
          );

          return data.secure_url;
        })
      );

      // Create post in json-server
      const { data } = await api.post("posts", {
        authorId: post.authorId,
        content: post.content,
        images: imageUrls,
        createdAt: new Date().toISOString(),
        likesCount: 0,
        commentsCount: 0,
        repostsCount: 0,
        bookmarksCount: 0,
      });

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

     toast.add({
        type:'success',
        description: "Post added successfully",
     })

    },
  });
};

export default useCreatePost;