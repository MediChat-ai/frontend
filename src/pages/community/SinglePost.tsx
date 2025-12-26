import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useTitle from '../../hooks/useTitle';
import { api, authHeaders } from '../../lib/http';
import NotFound from '../NotFound';
import { UserTokenPayload } from '../../types/auth';

interface CommunityPost {
  _id: string;
  board_id: string;
  post_title: string;
  post_content: string;
  author_name: string;
  author_id: string;
  created_at: string;
}

interface CommunityComment {
  _id: string;
  author_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

const SinglePost = () => {
  useTitle('MediChat - 커뮤니티');
  const { boardId, postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [editingPost, setEditingPost] = useState(false);
  const [postDraft, setPostDraft] = useState({ title: '', content: '' });
  const [commentDraft, setCommentDraft] = useState('');
  const [editingComment, setEditingComment] = useState<{ id: string; content: string } | null>(null);

  const token = localStorage.getItem('token');
  const currentUserId = token ? jwtDecode<UserTokenPayload>(token).user_id : '';

  useEffect(() => {
    if (!postId || !boardId) return;
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    api
      .get(`/community/getPostList?board_id=${boardId}&id=${postId}`, { headers: authHeaders() })
      .then((response) => {
        if (response.status >= 400) {
          setErrorCode(response.status);
          return;
        }
        const fetchedPost = response.data.posts as CommunityPost;
        setPost(fetchedPost);
        setPostDraft({ title: fetchedPost.post_title, content: fetchedPost.post_content });
        setIsAuthor(currentUserId === fetchedPost.author_id);
      })
      .catch((error) => setErrorCode(error.response?.status || 500));

    api
      .get(`/community/getCommentList?post_id=${postId}`, { headers: authHeaders() })
      .then((response) => setComments(response.data.comments || []))
      .catch((error) => console.error(error));
  }, [boardId, postId, token, navigate, currentUserId]);

  if (errorCode === 404 || errorCode === 500) return <NotFound />;
  if (!post) return <div className="spinner-glow" />;

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentDraft.trim() || !postId) return;

    try {
      const response = await api.post(
        '/community/writeComment',
        {
          post_id: postId,
          author_id: currentUserId,
          content: commentDraft,
          token
        },
        { headers: authHeaders() }
      );
      if (response.status === 200) {
        setComments([...comments, response.data.comment]);
        setCommentDraft('');
      }
    } catch (error) {
      console.error(error);
      alert('댓글을 등록하지 못했습니다.');
    }
  };

  const handleDeletePost = async () => {
    if (!postId || !window.confirm('게시물을 삭제할까요?')) return;
    try {
      await api.delete('/community/deletePost', { data: { post_id: postId, token } });
      alert('게시물이 삭제되었습니다.');
      navigate(`/community/${boardId}`);
    } catch (error) {
      console.error(error);
      alert('게시물을 삭제하지 못했습니다.');
    }
  };

  const handleSavePost = async () => {
    if (!postId) return;
    try {
      const response = await api.put(
        '/community/editPost',
        {
          post_id: postId,
          title: postDraft.title,
          content: postDraft.content,
          token
        },
        { headers: authHeaders() }
      );
      if (response.status === 200) {
        setPost({ ...post, post_title: postDraft.title, post_content: postDraft.content });
        setEditingPost(false);
      }
    } catch (error) {
      console.error(error);
      alert('게시물 수정에 실패했습니다.');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('댓글을 삭제할까요?')) return;
    try {
      await api.delete('/community/deleteComment', { data: { comment_id: commentId, token } });
      setComments((prev) => prev.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error(error);
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  const handleUpdateComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingComment) return;
    try {
      await api.put('/community/editComment', {
        comment_id: editingComment.id,
        content: editingComment.content,
        token
      });
      setComments((prev) =>
        prev.map((comment) => (comment._id === editingComment.id ? { ...comment, content: editingComment.content } : comment))
      );
      setEditingComment(null);
    } catch (error) {
      console.error(error);
      alert('댓글 수정에 실패했습니다.');
    }
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="glass-panel">
        {editingPost ? (
          <>
            <input value={postDraft.title} onChange={(e) => setPostDraft((prev) => ({ ...prev, title: e.target.value }))} />
            <textarea
              rows={8}
              value={postDraft.content}
              onChange={(e) => setPostDraft((prev) => ({ ...prev, content: e.target.value }))}
            />
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="primary" type="button" onClick={handleSavePost}>
                저장
              </button>
              <button className="ghost" type="button" onClick={() => setEditingPost(false)}>
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>{post.post_title}</h2>
            <p style={{ color: 'var(--muted)' }}>
              작성자 {post.author_name} · {new Date(post.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
            </p>
            <p>{post.post_content}</p>
          </>
        )}
        {isAuthor && !editingPost && (
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button className="ghost" onClick={() => setEditingPost(true)}>
              수정
            </button>
            <button className="secondary" onClick={handleDeletePost}>
              삭제
            </button>
          </div>
        )}
      </div>

      <div className="glass-panel">
        <h3>댓글</h3>
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{comment.author_name}</strong>
                <small style={{ color: 'var(--muted)' }}>
                  {new Date(comment.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
                </small>
              </div>
              {editingComment?.id === comment._id ? (
                <form onSubmit={handleUpdateComment}>
                  <textarea
                    rows={3}
                    value={editingComment.content}
                    onChange={(e) => setEditingComment({ id: comment._id, content: e.target.value })}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="primary" type="submit">
                      저장
                    </button>
                    <button className="ghost" type="button" onClick={() => setEditingComment(null)}>
                      취소
                    </button>
                  </div>
                </form>
              ) : (
                <p style={{ whiteSpace: 'pre-line' }}>{comment.content}</p>
              )}
              {currentUserId === comment.author_id && !editingComment && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="ghost" onClick={() => setEditingComment({ id: comment._id, content: comment.content })}>
                    수정
                  </button>
                  <button className="secondary" onClick={() => handleDeleteComment(comment._id)}>
                    삭제
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit} style={{ marginTop: 24 }}>
          <div className="form-field">
            <label htmlFor="newComment">새 댓글</label>
            <textarea
              id="newComment"
              rows={4}
              value={commentDraft}
              onChange={(e) => setCommentDraft(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
          </div>
          <button className="primary" type="submit">
            댓글 등록
          </button>
        </form>
      </div>
    </section>
  );
};

export default SinglePost;
