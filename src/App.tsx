import { useState, useEffect, ChangeEvent } from "react";
import { Post } from "./Types/Post";

const App = () => {


  //****States****
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  const [addTitle, setAddTitle] = useState('')
  const [addBody, setAddBody] = useState('')



  //****Effects****

  //Carrega os posts quando a pagina carrega
  useEffect(()=>{
    loadPosts()
  },[])

  //****Funcoes****
  const loadPosts = async () => {
    setLoading(true)
    let response = await fetch('https://jsonplaceholder.typicode.com/posts')
    let json = await response.json()
    setPosts(json)
    setLoading(false)
  }

  const handleAddTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setAddTitle(e.target.value)
  }

  const handleAddBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAddBody(e.target.value)
  }

  const submitPost = async () => {
    if(addTitle && addBody) {
      let response = await fetch('https://jsonplaceholder.typicode.com/post',{
        method: 'POST',
        body: JSON.stringify({
          title: addTitle,
          body: addBody,
          userID: 1
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let json = await response.json()
      if(json.id){
        alert('Post adicionado')
      } else {
        alert('Ocorreu um erro')
      }
    } else {
      alert('Preencha os campos')
    }
  }

  return (
    <div className="flex flex-col items-center justify-start">
      {loading &&
        <div>Carregando</div>
      }

      <fieldset className="border-2 mb-3 flex flex-col justify-center gap-5 py-5 px-5">
        <legend> Adicionar Novo Post</legend>

        <input
          value={addTitle}
          className="border"
          type="text"
          placeholder="Titulo"
          onChange={handleAddTitle}
        />
        <textarea
          className="border"
          value={addBody}
          onChange={handleAddBody}
        ></textarea>
        <button onClick={submitPost} className="border">Enviar</button>

      </fieldset>

      {!loading && posts.length > 0 &&
        <>
          <h2 className="mb-10">Total de Posts: {posts.length}</h2>
          <div className="grid grid-cols-2 max-w-7xl gap-y-20 gap-x-10 px-10">
            {posts.map((item, index) => (
                <div key={index}>
                  <h3 className="font-bold capitalize">{item.title}</h3>
                  <small>#{item.id} - User:{item.userId}</small>
                  <p>{item.body}</p>
                </div>
            ))}

          </div>
        </>
      }
      {!loading && posts.length === 0 &&
        <div>
          <p>Não há posts para exibir</p>
        </div>
      }

    </div>
  );
}

export default App;
