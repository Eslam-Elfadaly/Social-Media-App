import React from 'react'
import userimage from '@/assets/1782743036226.jpg';
import { ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react'
import { X } from 'lucide-react';
import useCreatePost from '@/Hooks/API_Hooks/PostsHooks/useCreatePost';
import { useCurrentUser } from '@/Pages/Home/Home';

function CreatePost() {
  
  const {data: CurrentUser} = useCurrentUser();

  const [postImages, setPostImages] = useState<File[]>([]);
  const [content, setContent] = useState<string>();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const {mutateAsync: createPost, isPending: createPostPending} = useCreatePost();

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>){

    const files = Array.from(e.target.files || []);
    if (files.length > 0) {

    setPostImages(prev => [...prev, ...files]);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...previews]);
  }

  }

  async function handleCreatePost(){

    if(!CurrentUser) return;

    await createPost({authorId: CurrentUser?.id, content: content, images: postImages})
  }
  return (
    <div className='bg-card p-3.5 pt-7 rounded-[8px] flex flex-col border-b-2 mb-2'>

        <div className='flex items-center gap-2'>
            <img src={userimage} alt="userImage" className='size-10 rounded-full ' />
            <input type="text" value={content} onChange={(e)=> setContent(e.target.value)} placeholder='What is on your mind, Eslam?' className='w-full p-2 border-2 rounded-2xl'/>
        </div>

                  {previewImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:w-[90%] self-center mt-3">
              {previewImages.map((image, index) => (
                <div key={image} className="relative">
                  <img
                    src={image}
                    alt={`postImage-${index}`}
                    className="w-full aspect-square object-cover rounded-md"
                  />
          
                  <X
                    className="absolute top-1 right-1 size-5 bg-red-500 text-white rounded-full cursor-pointer"
                    onClick={() => {
                      setPreviewImages(prev =>
                        prev.filter((_, i) => i !== index)
                      );
          
                      setPostImages(prev =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          )}

        <div className='flex items-center gap-1 justify-end mt-3 *:cursor-pointer'>
            <Button className='bg-transparent hover:bg-transparent' onClick={()=> inputRef.current?.click()}>
            <ImagePlus className='text-green-500 size-5.5 hover:text-green-300'/>
            </Button>

            <Button className='font-bold text-md text-white rounded-[10px] px-4' onClick={handleCreatePost}>{createPostPending? 'Posting...': 'Post'}</Button>
            <input type="file" multiple ref={inputRef} accept='image/*' onChange={handleImageChange} className='hidden'/>
        </div>

    </div>
  )
}

export default CreatePost