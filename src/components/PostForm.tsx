import { useState, ChangeEvent} from "react"

type Props = {
    onAdd: (title: string, body: string ) => void
}

export const PostForm = ({ onAdd }: Props) => {

    const [addTitle, setAddTitle] = useState('')
    const [addBody, setAddBody] = useState('')

    const handleAddTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitle(e.target.value)
    }

    const handleAddBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setAddBody(e.target.value)
    }

    const submitPost = () => {
        if(addTitle && addBody) {
            onAdd(addTitle, addBody)
        } else {
            alert('Preencha os campos')
        }
    }

    return (
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
    )

}