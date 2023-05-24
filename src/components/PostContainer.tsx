import React, { useEffect, useState } from "react";
import { postApi } from "../services/PostService";
import PostItem from "./PostItem";
import { IPost } from "../models/IPost";

const PostContainer = () => {
    const [limit, setLimit] = useState(100)
    const { data: posts, error, isLoading } = postApi.useFetchAllPostsQuery(limit)
    const [createPost, { }] = postApi.useCreatePostMutation()
    const [deletePost, { }] = postApi.useDeletePostMutation()
    const [updatePost, { }] = postApi.useUpdatePostMutation()


    const handleCreate = async () => {
        const title = prompt()
        await createPost({ title, body: title } as IPost)
    }

    const handleRemove = (post: IPost) => {
        deletePost(post)
    }
    const handleUpdate = (post: IPost) => {
        updatePost(post)
    }

    return (
        <div>
            <div className="post__list">
                <button onClick={handleCreate} type="button" className="btn btn-primary">Add new post</button>
                {isLoading &&
                    <div className="d-flex align-items-center">
                        <strong>Loading...</strong>
                        <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                    </div>}
                {error && <h1>Произошла ошибка загрузки</h1>}
                {posts && posts.map(post => {
                    return (
                        <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post} />
                    )
                })}
            </div>
        </div>
    )
}

export default PostContainer