// routes/PostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PostList = ({ token }) => {
    const { boardName } = useParams();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`/api/community/posts?board_name=${boardName}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPosts(response.data.posts);
            } catch (error) {
                console.error('게시물을 불러오는 중 오류가 발생했습니다:', error);
            }
        };
        fetchPosts();
    }, [token, boardName]);

    const handleDelete = async (postId) => {
        try {
            await axios.delete('/api/community/posts', {
                data: {
                    post_id: postId,
                    token,
                },
            });
            setPosts(posts.filter((post) => post._id !== postId));
        } catch (error) {
            console.error('게시물 삭제 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">{boardName} 게시판의 게시물 목록</h2>
            <button className="btn btn-primary mb-3" onClick={() => navigate(`/board/${boardName}/new`)}>게시물 작성</button>
            {posts.map((post) => (
                <div key={post._id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.content}</p>
                        <a href={`/board/${boardName}/post/${post._id}`} className="btn btn-secondary">게시물 보기</a>
                        <button className="btn btn-danger ms-2" onClick={() => handleDelete(post._id)}>삭제</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;
