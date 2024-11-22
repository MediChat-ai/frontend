import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const backendHost = process.env.REACT_APP_BACKEND_HOST;
const backendPort = process.env.REACT_APP_BACKEND_PORT;

const PostList = () => {
	const { _id } = useParams();
	const [posts, setPosts] = useState([]);
	const [boardName, setBoardName] = useState('');

	const token = localStorage.getItem('token');

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await axios.get(`http://${backendHost}:${backendPort}/community/getPostList?board_id=${_id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setPosts(response.data.posts.reverse());
				setBoardName(response.data.board_name);
			} catch (error) {
				console.error('게시물을 불러오는 중 오류가 발생했습니다:', error);
			}
		};
		fetchPosts();
	}, [token, _id]);

	return (
		<div>
			<Navbar />
			<div class="container">
				<div class="row">
					<h2>{boardName}</h2>
					<br />
					<div class="col-md-12">
						<a href={`/community/${_id}/new`}><button type="button" class="btn btn-primary">새 글 작성</button></a>
					</div>
					<br />
					<div class="col-md-12"><table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
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
									<td><a href={`/community/${_id}/${post._id}`}>{post.post_title}</a></td>
									<td>{post.view_count}</td>
									<td>
										{(() => {
											const postDate = new Date(post.created_at);
											const today = new Date();

											const postYear = postDate.getFullYear();
											const postMonth = postDate.getMonth();
											const postDay = postDate.getDate();

											const todayYear = today.getFullYear();
											const todayMonth = today.getMonth();
											const todayDay = today.getDate();

											if (postYear === todayYear && postMonth === todayMonth && postDay === todayDay) {
												return postDate.toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hour12: false });
											} else {
												return postDate.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul', month: '2-digit', day: '2-digit' });
											}
										})()}
									</td>
								</tr>
							))}
						</tbody>
					</table></div>
				</div>
			</div>
		</div>
	);
};

export default PostList;
