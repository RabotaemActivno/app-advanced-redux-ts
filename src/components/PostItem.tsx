import React, { FC } from "react";
import { IPost } from "../models/IPost";

interface PostItemProps {
    post: IPost
    remove: (post: IPost) => void
    update: (post: IPost) => void
}

const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        remove(post)
    }

    const handleUpdate = (e: React.MouseEvent) => {
        const title = prompt() || ''
        update({ ...post, title })
    }

    return (
        <ul className="list-group">
            <li className="list-group-item">
                <div onClick={handleUpdate}>
                    <span>{post.id}.{post.title}</span>
                    <button onClick={handleRemove} type="button" className="btn btn-danger">delete</button>
                </div>
            </li>
        </ul>
    )
}

export default PostItem