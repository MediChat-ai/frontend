import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';

// Navbar 컴포넌트: 상단 네비게이션 바를 구성합니다.
const Navbar = () => {
  return (
    <nav className="navbar navbar-light navbar-expand-md py-3">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <span className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
            <FontAwesomeIcon icon={faCommentMedical} />
          </span>
          <span>MediChat</span>
        </a>
        <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1">
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a href="/chat" className="nav-link">AI 챗봇</a>
            </li>
            <li className="nav-item">
              <a href="/hospital" className="nav-link">병원 정보</a>
            </li>
            <li className="nav-item">
              <a href="/community" className="nav-link">커뮤니티</a>
            </li>
            <li className="nav-item">
              <a href="/users/profile" className="nav-link">프로필</a>
            </li>
          </ul>
          <button className="btn btn-secondary me-2" type="button">로그인</button>
          <button className="btn btn-primary" type="button">회원 가입</button>
        </div>
      </div>
    </nav>
  );
};

// 게시판 목록을 가져오는 함수
const fetchBoardList = async (token) => {
  try {
    const response = await axios.get('/api/community/boards', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.boards;
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error('오류: 필수 파라미터 값이 누락되었습니다.');
          break;
        case 401:
          console.error('오류: 유효하지 않은 토큰입니다.');
          break;
        case 404:
          console.error('오류: 게시판 목록을 찾을 수 없습니다.');
          break;
        case 500:
          console.error('오류: 게시판 목록을 불러오는 과정에서 오류가 발생했습니다.');
          break;
        default:
          console.error('예상치 못한 오류 발생:', error.response.data);
      }
    } else {
      console.error('서버에 연결할 수 없습니다.');
    }
    return null;
  }
};

// 특정 게시판의 게시물을 가져오는 함수
const fetchPosts = async (token, boardName, postId = null) => {
  try {
    let url = `/api/community/posts?board_name=${boardName}`;
    if (postId) {
      url += `&id=${postId}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.post;
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error('오류: 필수 파라미터 값이 누락되었습니다.');
          break;
        case 401:
          console.error('오류: 유효하지 않은 토큰입니다.');
          break;
        case 404:
          console.error('오류: 게시물을 찾을 수 없습니다.');
          break;
        case 500:
          console.error('오류: 게시물 목록을 불러오는 과정에서 오류가 발생했습니다.');
          break;
        default:
          console.error('예상치 못한 오류 발생:', error.response.data);
      }
    } else {
      console.error('서버에 연결할 수 없습니다.');
    }
    return null;
  }
};

// 특정 게시물의 댓글을 가져오는 함수
const fetchComments = async (token, postId) => {
  try {
    const response = await axios.get(`/api/community/comments?post_id=${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.comments;
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error('오류: 필수 파라미터 값이 누락되었습니다.');
          break;
        case 401:
          console.error('오류: 유효하지 않은 토큰입니다.');
          break;
        case 404:
          console.error('오류: 댓글을 찾을 수 없습니다.');
          break;
        case 500:
          console.error('오류: 댓글 목록을 불러오는 과정에서 오류가 발생했습니다.');
          break;
        default:
          console.error('예상치 못한 오류 발생:', error.response.data);
      }
    } else {
      console.error('서버에 연결할 수 없습니다.');
    }
    return null;
  }
};

// 새로운 게시물을 생성하는 함수
const createPost = async (token, boardName, title, content) => {
  try {
    const response = await axios.post('/api/community/posts', {
      board_name: boardName,
      title,
      content,
      token,
    });
    if (response.status === 200) {
      console.log('게시물이 성공적으로 생성되었습니다:', response.data.message);
      return response.data.post;
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error('오류: 필수 파라미터 값이 누락되었습니다.');
          break;
        case 401:
          console.error('오류: 유효하지 않은 토큰입니다.');
          break;
        case 404:
          console.error('오류: 게시판을 찾을 수 없습니다.');
          break;
        case 500:
          console.error('오류: 게시물 생성 중 오류가 발생했습니다.');
          break;
        default:
          console.error('예상치 못한 오류 발생:', error.response.data);
      }
    } else {
      console.error('서버에 연결할 수 없습니다.');
    }
    return null;
  }
};

// 게시물을 수정하는 함수
const updatePost = async (token, postId, title, content) => {
  try {
    const response = await axios.put('/api/community/posts', {
      post_id: postId,
      title,
      content,
      token,
    });
    if (response.status === 200) {
      console.log('게시물이 성공적으로 수정되었습니다:', response.data.message);
      return response.data.post;
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error('오류: 필수 파라미터 값이 누락되었습니다.');
          break;
        case 401:
          console.error('오류: 유효하지 않은 토큰입니다.');
          break;
        case 404:
          console.error('오류: 게시물을 찾을 수 없습니다.');
          break;
        case 500:
          console.error('오류: 게시물 수정 중 오류가 발생했습니다.');
          break;
        default:
          console.error('예상치 못한 오류 발생:', error.response.data);
      }
    } else {
      console.error('서버에 연결할 수 없습니다.');
    }
    return null;
  }
};

// 게시물을 삭제하는 함수
const deletePost = async (token, postId) => {
  try {
    const response = await axios.delete('/api/community/posts', {
      data: {
        post_id: postId,
        token,
      },
    });
    if (response.status === 200) {
      console.log('게시물이 성공적으로 삭제되었습니다:', response.data.message);
      return response.data.message;
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error('오류: 필수 파라미터 값이 누락되었습니다.');
          break;
        case 401:
          console.error('오류: 유효하지 않은 토큰입니다.');
          break;
        case 404:
          console.error('오류: 게시물을 찾을 수 없습니다.');
          break;
        case 500:
          console.error('오류: 게시물 삭제 중 오류가 발생했습니다.');
          break;
        default:
          console.error('예상치 못한 오류 발생:', error.response.data);
      }
    } else {
      console.error('서버에 연결할 수 없습니다.');
    }
    return null;
  }
};

// 댓글을 작성하는 함수
const createComment = async (token, postId, content) => {
  try {
    const response = await axios.post('/api/community/comments', {
      post_id: postId,
      content,
      token,
    });
    if (response.status === 200) {
      console.log('댓글이 성공적으로 생성되었습니다:', response.data.message);
      return response.data.comment;
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error('오류: 필수 파라미터 값이 누락되었습니다.');
          break;
        case 401:
          console.error('오류: 유효하지 않은 토큰입니다.');
          break;
        case 404:
          console.error('오류: 게시물을 찾을 수 없습니다.');
          break;
        case 500:
          console.error('오류: 댓글 생성 중 오류가 발생했습니다.');
          break;
        default:
          console.error('예상치 못한 오류 발생:', error.response.data);
      }
    } else {
      console.error('서버에 연결할 수 없습니다.');
    }
    return null;
  }
};

// 댓글을 수정하는 함수
const updateComment = async (token, commentId, content) => {
  try {
    const response = await axios.put('/api/community/comments', {
      comment_id: commentId,
      content,
      token,
    });
    if (response.status === 200) {
      console.log('댓글이 성공적으로 수정되었습니다:', response.data.message);
      return response.data.comment;
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error('오류: 필수 파라미터 값이 누락되었습니다.');
          break;
        case 401:
          console.error('오류: 유효하지 않은 토큰입니다.');
          break;
        case 404:
          console.error('오류: 댓글을 찾을 수 없습니다.');
          break;
        case 500:
          console.error('오류: 댓글 수정 중 오류가 발생했습니다.');
          break;
        default:
          console.error('예상치 못한 오류 발생:', error.response.data);
      }
    } else {
      console.error('서버에 연결할 수 없습니다.');
    }
    return null;
  }
};

// 댓글을 삭제하는 함수
const deleteComment = async (token, commentId) => {
  try {
    const response = await axios.delete('/api/community/comments', {
      data: {
        comment_id: commentId,
        token,
      },
    });
    if (response.status === 200) {
      console.log('댓글이 성공적으로 삭제되었습니다:', response.data.message);
      return response.data.message;
    }
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error('오류: 필수 파라미터 값이 누락되었습니다.');
          break;
        case 401:
          console.error('오류: 유효하지 않은 토큰입니다.');
          break;
        case 404:
          console.error('오류: 댓글을 찾을 수 없습니다.');
          break;
        case 500:
          console.error('오류: 댓글 삭제 중 오류가 발생했습니다.');
          break;
        default:
          console.error('예상치 못한 오류 발생:', error.response.data);
      }
    } else {
      console.error('서버에 연결할 수 없습니다.');
    }
    return null;
  }
};

// 게시판 목록을 보여주는 컴포넌트
const BoardList = ({ token, onSelectBoard }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const getBoardList = async () => {
      const data = await fetchBoardList(token);
      if (data) {
        setBoards(data);
      }
    };
    getBoardList();
  }, [token]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">게시판 목록</h2>
      {boards.length > 0 ? (
        <ul className="list-group">
          {boards.map((board) => (
            <li key={board._id} className="list-group-item" onClick={() => onSelectBoard(board.name)}>
              <h5>{board.name}</h5>
              <p>{board.description}</p>
              <p>생성일: {new Date(board.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>게시판 목록이 없습니다.</p>
      )}
    </div>
  );
};

// 게시물 목록을 보여주는 컴포넌트
const PostList = ({ token, boardName, onCreatePost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts(token, boardName);
      if (data && Array.isArray(data)) {
        setPosts(data);
      }
    };
    getPosts();
  }, [token, boardName]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{boardName} 게시판의 게시물 목록</h2>
      <button className="btn btn-primary mb-3" onClick={onCreatePost}>게시물 작성</button>
      {posts.length > 0 ? (
        <ul className="list-group">
          {posts.map((post) => (
            <li key={post._id} className="list-group-item">
              <h5>{post.title}</h5>
              <p>{post.content}</p>
              <p>작성자: {post.author}</p>
              <p>작성일: {new Date(post.created_at).toLocaleDateString()}</p>
              <button className="btn btn-danger" onClick={() => deletePost(token, post._id)}>삭제</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>게시물이 없습니다.</p>
      )}
    </div>
  );
};

// 새 게시물을 작성하는 폼 컴포넌트
const NewPostForm = ({ token, boardName, onCancel, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = await createPost(token, boardName, title, content);
    if (newPost) {
      onSubmit(newPost);
    }
  };

  return (
    <div className="container mt-5">
      <h2>게시물 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">제목</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">내용</label>
          <textarea className="form-control" id="content" rows="5" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">게시</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>취소</button>
      </form>
    </div>
  );
};

// 커뮤니티 전체 흐름을 관리하는 메인 컴포넌트
const Community = ({ token }) => {
  const [isViewingPostList, setIsViewingPostList] = useState(true);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleBoardSelect = (boardName) => {
    setSelectedBoard(boardName);
    setIsViewingPostList(true);
    setIsCreatingPost(false);
  };

  const handlePostSelect = (postId) => {
    setSelectedPostId(postId);
    setIsViewingPostList(false);
  };

  const handleCreatePost = () => {
    setIsCreatingPost(true);
  };

  const handleCancelCreatePost = () => {
    setIsCreatingPost(false);
  };

  const handleNewPostSubmit = (newPost) => {
    setIsCreatingPost(false);
    setIsViewingPostList(true);
  };

  return (
    <div>
      <Navbar />
      {selectedBoard ? (
        isCreatingPost ? (
          <NewPostForm token={token} boardName={selectedBoard} onCancel={handleCancelCreatePost} onSubmit={handleNewPostSubmit} />
        ) : isViewingPostList ? (
          <PostList token={token} boardName={selectedBoard} onCreatePost={handleCreatePost} />
        ) : (
          <SinglePost token={token} boardName={selectedBoard} postId={selectedPostId} />
        )
      ) : (
        <BoardList token={token} onSelectBoard={handleBoardSelect} />
      )}
    </div>
  );
};

export default Community;
