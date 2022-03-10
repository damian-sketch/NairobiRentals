import { useEffect, useState } from 'react'
import PostService from '../../services/post.service'
import './styles.css'

export const Posts = () => {
    
    const [posts,setPosts] = useState('');

     useEffect(() => {
         async function fetchPosts () {
            let posts = await PostService.getAllPosts()
            setPosts(posts)
         }
         fetchPosts();
     }, [])

     return (
        <div>{posts.data}</div>
     )
    
     
}
