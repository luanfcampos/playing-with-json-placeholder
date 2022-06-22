import { useState, useEffect} from "react";
import { Post } from "./types/Post";
import { PostForm } from "./components/PostForm";
import { PostItem } from "./components/PostItem";
import { NoPosts } from "./components/NoPosts";
import { Loading } from "./components/Loading";
import { api } from "./api";

const App = () => {


  //****States****
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  //****Effects****

  useEffect(()=>{
    loadPosts()
  },[])

  //****Funcoes****
  const loadPosts = async () => {
    setLoading(true)
    let json = await api.getAll()
    setPosts(json)
    setLoading(false)
  }

  const handleAddPost = async (title: string, body: string) => {
    let json = await api.addNew(title, body, 1)
    if(json.id){
      alert('Post adicionado')
    } else {
      alert('Ocorreu um erro')
    }
  }

  return (
    <div className="flex flex-col items-center justify-start">
      {loading &&
        <Loading/>
      }

      <PostForm onAdd={handleAddPost}/>

      {!loading && posts.length > 0 &&
        <>
          <h2 className="mb-10">Total de Posts: {posts.length}</h2>
          <div className="grid grid-cols-2 max-w-7xl gap-y-20 gap-x-10 px-10">
            {posts.map((item, index) => (
                <PostItem data={item} key={index} />
            ))}

          </div>
        </>
      }
      {!loading && posts.length === 0 &&
        <NoPosts/>
      }

    </div>
  );
}

export default App;
