import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../assets/css/Search-Input-Responsive-with-Icon.css';
import '../assets/css/loading.css'
import useTitle from '../hooks/useTitle';

const BACKEND_URI = process.env.REACT_APP_BACKEND_URI;

const Hospital = () => {
  useTitle('MediChat - 병원 검색');
  const [searchName, setSearchName] = useState("");
  const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const subjectCodes = [
    { code: "00", name: "일반의" },
    { code: "01", name: "내과" },
    { code: "02", name: "신경과" },
    { code: "03", name: "정신건강의학과" },
    { code: "04", name: "외과" },
    { code: "05", name: "정형외과" },
    { code: "06", name: "신경외과" },
    { code: "07", name: "심장혈관흉부외과" },
    { code: "08", name: "성형외과" },
    { code: "09", name: "마취통증의학과" },
    { code: "10", name: "산부인과" },
    { code: "11", name: "소아청소년과" },
    { code: "12", name: "안과" },
    { code: "13", name: "이비인후과" },
    { code: "14", name: "피부과" },
    { code: "15", name: "비뇨의학과" },
    { code: "16", name: "영상의학과" },
    { code: "17", name: "방사선종양학과" },
    { code: "18", name: "병리과" },
    { code: "19", name: "진단검사의학과" },
    { code: "20", name: "결핵과" },
    { code: "21", name: "재활의학과" },
    { code: "22", name: "핵의학과" },
    { code: "23", name: "가정의학과" },
    { code: "24", name: "응급의학과" },
    { code: "25", name: "직업환경의학과" },
    { code: "26", name: "예방의학과" },
    { code: "27", name: "기타1(치과)" },
    { code: "28", name: "기타4(한방)" },
    { code: "31", name: "기타2" },
    { code: "40", name: "기타2(2)" },
    { code: "41", name: "보건" },
    { code: "42", name: "기타3" },
    { code: "43", name: "보건기관치과" },
    { code: "44", name: "보건기관한방" },
    { code: "49", name: "치과" },
    { code: "50", name: "구강악안면외과" },
    { code: "51", name: "치과보철과" },
    { code: "52", name: "치과교정과" },
    { code: "53", name: "소아치과" },
    { code: "54", name: "치주과" },
    { code: "55", name: "치과보존과" },
    { code: "56", name: "구강내과" },
    { code: "57", name: "영상치의학과" },
    { code: "58", name: "구강병리과" },
    { code: "59", name: "예방치과" },
    { code: "60", name: "치과소계" },
    { code: "61", name: "통합치의학과" },
    { code: "80", name: "한방내과" },
    { code: "81", name: "한방부인과" },
    { code: "82", name: "한방소아과" },
    { code: "83", name: "한방안·이비인후·피부과" },
    { code: "84", name: "한방신경정신과" },
    { code: "85", name: "침구과" },
    { code: "86", name: "한방재활의학과" },
    { code: "87", name: "사상체질과" },
    { code: "88", name: "한방응급" },
    { code: "89", name: "한방응급" },
    { code: "90", name: "한방소계" }
  ];

  const handleSearch = async () => {
    setError("");
    setLoading(true);

    if (!searchName.trim()) {
      setError("병원명을 입력해주세요.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URI}/hospital/getHospList`,
        {
          params: {
            name: searchName,
            pageNo: 1,
            subjectCode: selectedSubjectCode || undefined,
          },
        }
      );

      const items = response.data.response.body.items.item;

      if (Array.isArray(items)) {
        setHospitals(items);
      } else if (items) {
        setHospitals([items]);
      } else {
        setHospitals([]);
        setError("검색 결과가 없습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("병원 정보를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <h1>병원 검색</h1>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <form className="d-flex align-items-center" onSubmit={handleSubmit}>
                  <i className="fas fa-search d-none d-sm-block h4 text-body m-0"></i>
                  <input
                    className="form-control form-control-sm"
                    type="search"
                    placeholder="병원명 입력"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                  <select
                    className="form-select form-select-sm mx-2"
                    value={selectedSubjectCode}
                    onChange={(e) => setSelectedSubjectCode(e.target.value)}
                  >
                    <option value="">진료과목 선택</option>
                    {subjectCodes.map((subject) => (
                      <option key={subject.code} value={subject.code}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-success no-wrap"
                    type="button"
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    검색
                  </button>
                </form>
                <br />
                <table
                  id="example"
                  className="table table-striped table-bordered"
                  cellSpacing="0"
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th>병원명</th>
                      <th>지역</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hospitals.map((hospital, index) => (
                      <tr key={index}>
                        <td>{hospital.yadmNm}</td>
                        <td>
                          {hospital.sgguCdNm} {hospital.emdongNm}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {loading &&
                  <div class="spinner">
                    <div class="spinner__circle">
                      <div class="spinner__circle-gradient"></div>

                      <div class="spinner__circle-inner"></div>
                    </div>
                  </div>}
                {error && <div className="alert alert-danger mt-3">{error}</div>}
                {hospitals.length === 0 && !loading && !error && (
                  <div className="text-center mt-3">검색 결과가 없습니다.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospital;
