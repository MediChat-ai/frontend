// routes/SinglePost.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SinglePost = ({ token }) => {
    const { boardName, postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/community/posts?board_name=${boardName}&id=${postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPost(response.data.post);
            } catch (error) {
                console.error('게시물을 불러오는 중 오류가 발생했습니다:', error);
            }
        };
        fetchPost();
    }, [token, boardName, postId]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/community/comments?post_id=${postId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setComments(response.data.comments);
            } catch (error) {
                console.error('댓글을 불러오는 중 오류가 발생했습니다:', error);
            }
        };
        fetchComments();
    }, [token, postId]);

    if (!post) return <div>게시물을 불러오는 중...</div>;

    return (
        <div className="container mt-5">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>작성자: {post.author}</p>
            <p>작성일: {new Date(post.created_at).toLocaleDateString()}</p>

            <div className="mt-5">
                <h3>댓글</h3>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment._id} className="card mb-3">
                            <div className="card-body">
                                <p>{comment.content}</p>
                                <p className="text-muted">작성자: {comment.author}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>댓글이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default SinglePost;
