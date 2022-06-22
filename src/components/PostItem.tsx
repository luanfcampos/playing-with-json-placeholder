import { Post } from '../types/Post'

type Props = {
    data: Post
}

export const PostItem = ({data}:Props) => {
    return (
        <div>
            <h3 className="font-bold capitalize">{data.title}</h3>
            <small>#{data.id} - User:{data.userId}</small>
            <p>{data.body}</p>
        </div>
    )
}