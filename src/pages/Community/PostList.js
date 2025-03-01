import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../assets/css/PostList.css'
import useTitle from '../../hooks/useTitle';
import NotFound from '../404';

const backendURI = process.env.REACT_APP_BACKEND_URI;

const PostList = () => {
	useTitle('MediChat - 커뮤니티');
	const { _id } = useParams();
	const [posts, setPosts] = useState([]);
	const [boardName, setBoardName] = useState('');
	const [error, setError] = useState(null);

	const token = localStorage.getItem('token');

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get(`${backendURI}/community/getPostList?board_id=${_id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (response.status >= 400) {
          setError(response.status);
          return;
        }
				if (response.data.message === '게시물 목록을 성공적으로 불러왔습니다.')
					setPosts(response.data.posts.reverse());
				setBoardName(response.data.board_name);
			} catch (err) {
				setError(err.response?.status || 500);
				console.error('게시물을 불러오는 중 오류가 발생했습니다:', err);
			}
		};
		fetchPosts();
	}, [token, _id]);

	if (error === 404 || error === 500)
    return <NotFound />;

	return (
		<div>
			<Navbar />
			<div className="container">
				<div className="row">
					<h2>{boardName}</h2>
					<br />
					<div className="col-md-12">
						<a href={`/community/${_id}/new`}>
							<button type="button" className="btn btn-primary">새 글 작성</button>
						</a>
					</div>
					<br />
					<div className="col-md-12">
						<table id="example" className="table table-striped table-bordered" cellspacing="0" width="100%">
							<thead>
								<tr>
									<th>제목</th>
									<th>조회 수</th>
									<th>작성일</th>
								</tr>
							</thead>
							<tbody>
								{posts.map((post) => (
									<tr key={post._id}>
										<td>
											<a
												href={`/community/${_id}/${post._id}`}
												title={post.post_title}
											>
												{post.post_title}
											</a>
										</td>
										<td>{post.view_count}</td>
										<td>
											{(() => {
												const postDate = new Date(post.created_at);
												const today = new Date();

												const isToday =
													postDate.getFullYear() === today.getFullYear() &&
													postDate.getMonth() === today.getMonth() &&
													postDate.getDate() === today.getDate();

												return isToday
													? postDate.toLocaleTimeString('ko-KR', {
														timeZone: 'Asia/Seoul',
														hour: '2-digit',
														minute: '2-digit',
														hour12: false,
													})
													: postDate.toLocaleDateString('ko-KR', {
														timeZone: 'Asia/Seoul',
														month: '2-digit',
														day: '2-digit',
													});
											})()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostList;
