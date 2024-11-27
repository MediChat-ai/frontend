import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/src/jquery';
import '../../assets/css/Articles-Badges-images.css';
import '../../assets/css/Bootstrap-Chat.css';
import '../../assets/css/dmp_Inputs_Generic_Phone_Required.css';
import '../../assets/css/Navbar-With-Button-icons.css';
import '../../assets/css/Pricing-Duo-badges.css';
import '../../assets/css/Card-Group1-Shadow.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const backendURI = process.env.REACT_APP_BACKEND_URI;

const Community_boards = () => {
	const [boardList, setBoardList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			axios.get(`${backendURI}/community/getBoardList`, { headers: { 'Authorization': `Bearer ${token}` } })
				.then(response => {
					if (response.status == 200) {
						setBoardList(response.data.boards);
					}
					else {
						alert(response.data.error);
					}
				})
				.catch(error => {
					console.error('토큰 검증 실패:', error);
				});
		}
		else {
			alert('로그인이 필요합니다.');
			window.location.href = '/';
		}
	}, []);
	useEffect(() => { }, [boardList]);
	return (
		<div>
			<Navbar />
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h2>게시판 목록</h2>
					</div>
				</div>
				<br />
				<div class="row">
					<div class="col-md-12">
						<section>
							<div class="container">
								<div class="row">
									{boardList.map((board, index) => (
										<div key={index} class="col-lg-4">
											<a href={`/community/${board._id}`}>
												<div class="card mb-4 box-shadow hover-grow"><img class="card-img-top w-100 d-block" src={board.cover_url} />
													<div class="card-body">
														<h4 class="card-title">{board.name}</h4>
														<p class="card-text">{board.description}</p>
													</div>
												</div>
											</a>
										</div>
									))}
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
export default Community_boards;