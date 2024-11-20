// routes/BoardList.js
import React, { useEffect, useState } from 'react';

const BoardList = () => {
    const [boards, setBoards] = useState([
        { _id: '1', name: '자유게시판', description: '자유롭게 이야기하는 공간입니다.' },
        { _id: '2', name: '공지사항', description: '커뮤니티 공지사항을 확인하세요.' },
        { _id: '3', name: '질문답변', description: '질문을 올리고 답변을 받는 공간입니다.' },
    ]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">게시판 목록</h2>
            {boards.map((board) => (
                <div key={board._id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{board.name}</h5>
                        <p className="card-text">{board.description}</p>
                        <a href={`/board/${board.name}`} className="btn btn-primary">게시판 보기</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BoardList;
