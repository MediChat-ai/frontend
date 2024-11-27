import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { jwtDecode } from 'jwt-decode';
import '../../assets/css/loading.css'

const backendURI = process.env.REACT_APP_BACKEND_URI;

const SinglePost = () => {
  const { _id, post_id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ title: '', content: '' });
  const [editedComment, setEditedComment] = useState({ id: '', content: '' });
  const [isAuthor, setIsAuthor] = useState(false);
  const token = localStorage.getItem('token');
  const currentUsername = jwtDecode(token)?.user_name || '';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${backendURI}/community/getPostList?board_id=${_id}&id=${post_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPost(response.data.posts);
        setEditedPost({
          title: response.data.posts.post_title,
          content: response.data.posts.post_content,
        });
        setIsAuthor(jwtDecode(token).user_name === response.data.posts.author_name);
      } catch (err) {
        console.error('게시물을 불러오는 중 오류가 발생했습니다:', err);
      }
    };
    fetchPost();
  }, [token, _id, post_id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${backendURI}/community/getCommentList?post_id=${post_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(response.data.comments);
      } catch (err) {
        console.error('댓글을 불러오는 중 오류가 발생했습니다:', err);
      }
    };
    fetchComments();
  }, [token, post_id]);

  const handleComment = async (e) => {
    e.preventDefault();
    const commentContent = e.target.comment.value;
    if (!commentContent.trim()) return alert('댓글 내용을 입력하세요.');

    try {
      const response = await axios.post(`${backendURI}/community/writeComment`, {
        post_id: post_id,
        author_name: jwtDecode(token).user_name,
        content: commentContent,
        token: localStorage.getItem('token')
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setComments([...comments, response.data.comment]);
        e.target.comment.value = '';
      } else {
        throw new Error('댓글 업로드 실패');
      }
    } catch (err) {
      console.error('댓글 업로드 중 오류가 발생했습니다:', err);
    }
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm('게시물을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${backendURI}/community/deletePost`, {
        data: { post_id: post_id, token: localStorage.getItem('token') },
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      if (response.status === 200) {
        alert('게시물이 삭제되었습니다.');
        window.location.href = `/community/${post.board_id}`;
      } else {
        throw new Error('게시물 삭제 실패');
      }
    } catch (err) {
      console.error('게시물 삭제 중 오류가 발생했습니다:', err);
    }
  };

  const handleEditPost = async () => {
    try {
      const response = await axios.put(`${backendURI}/community/editPost`, {
        post_id: post_id,
        title: editedPost.title,
        content: editedPost.content,
        token: localStorage.getItem('token')
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setPost({
          ...post,
          post_title: editedPost.title,
          post_content: editedPost.content,
        });
        setIsEditing(false);
        alert('게시물이 수정되었습니다.');
      } else {
        throw new Error('게시물 수정 실패');
      }
    } catch (err) {
      console.error('게시물 수정 중 오류가 발생했습니다:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${backendURI}/community/deleteComment`, {
        data: { comment_id: commentId, token },
      });
      if (response.status === 200) {
        setComments(comments.filter((comment) => comment._id !== commentId));
        alert('댓글이 삭제되었습니다.');
      } else {
        throw new Error('댓글 삭제 실패');
      }
    } catch (err) {
      console.error('댓글 삭제 중 오류가 발생했습니다:', err);
    }
  };

  // 댓글 수정
  const handleEditComment = async (e, commentId) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${backendURI}/community/editComment`, {
        comment_id: commentId,
        content: editedComment.content,
        token,
      });
      if (response.status === 200) {
        setComments(comments.map((comment) =>
          comment._id === commentId ? { ...comment, content: editedComment.content } : comment
        ));
        setEditedComment({ id: '', content: '' });
        alert('댓글이 수정되었습니다.');
      } else {
        throw new Error('댓글 수정 실패');
      }
    } catch (err) {
      console.error('댓글 수정 중 오류가 발생했습니다:', err);
    }
  };

  if (!post) return (
    <div class="spinner">
      <div class="spinner__circle">
        <div class="spinner__circle-gradient"></div>

        <div class="spinner__circle-inner"></div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between">
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                value={editedPost.title}
                onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                autoComplete="off"
              />
            ) : (
              <div>
                <h2>{post.post_title}</h2>
                <div className="text-muted">
                  작성자: {post.author_name} | 작성 시각: {new Date(post.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
                </div>
              </div>
            )}
            <div>
              {isAuthor && (
                <>
                  <button className="btn btn-danger me-2" onClick={handleDeletePost}>
                    삭제
                  </button>
                  {isEditing ? (
                    <button className="btn btn-success" onClick={handleEditPost}>
                      저장
                    </button>
                  ) : (
                    <button className="btn btn-warning" onClick={() => setIsEditing(true)}>
                      수정
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="card-body">
            {isEditing ? (
              <textarea
                className="form-control"
                rows="5"
                value={editedPost.content}
                onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
                autoComplete="off"
              />
            ) : (
              <p>{post.post_content}</p>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>댓글</h5>
          </div>
          <div className="card-body">
            <div className="mb-4">
              {comments.map((comment) => (
                <div key={comment._id} className="border-bottom pb-2 mb-2">
                  <strong>{comment.author_name}</strong>{' '}
                  <span className="text-muted">
                    {new Date(comment.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
                  </span>
                  {editedComment.id === comment._id ? (
                    <form onSubmit={(e) => handleEditComment(e, comment._id)}>
                      <textarea
                        className="form-control mt-2"
                        value={editedComment.content}
                        onChange={(e) => setEditedComment({ id: comment._id, content: e.target.value })}
                      />
                      <button type="submit" className="btn btn-success mt-2 me-2">저장</button>
                      <button
                        type="button"
                        className="btn btn-secondary mt-2"
                        onClick={() => setEditedComment({ id: '', content: '' })}
                      >
                        취소
                      </button>
                    </form>
                  ) : (
                    <p>{comment.content}</p>
                  )}
                  {currentUsername === comment.author_name && editedComment.id !== comment._id && (
                    <div className="mt-2">
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setEditedComment({ id: comment._id, content: comment.content })}
                      >
                        수정
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* 댓글 작성 폼 */}
            <form onSubmit={handleComment}>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">댓글 작성</label>
                <textarea className="form-control" id="comment" rows="3" placeholder="댓글을 입력하세요"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">댓글 등록</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
