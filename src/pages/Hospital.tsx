import { FormEvent, useState } from 'react';
import useTitle from '../hooks/useTitle';
import { api } from '../lib/http';

interface HospitalRecord {
  yadmNm: string;
  sgguCdNm?: string;
  emdongNm?: string;
}

const subjectCodes = [
  { code: '00', name: '일반의' },
  { code: '01', name: '내과' },
  { code: '02', name: '신경과' },
  { code: '03', name: '정신건강의학과' },
  { code: '04', name: '외과' },
  { code: '05', name: '정형외과' },
  { code: '06', name: '신경외과' },
  { code: '07', name: '심장혈관흉부외과' },
  { code: '08', name: '성형외과' },
  { code: '09', name: '마취통증의학과' },
  { code: '10', name: '산부인과' },
  { code: '11', name: '소아청소년과' },
  { code: '12', name: '안과' },
  { code: '13', name: '이비인후과' },
  { code: '14', name: '피부과' },
  { code: '15', name: '비뇨의학과' },
  { code: '16', name: '영상의학과' },
  { code: '17', name: '방사선종양학과' },
  { code: '18', name: '병리과' },
  { code: '19', name: '진단검사의학과' },
  { code: '21', name: '재활의학과' },
  { code: '24', name: '응급의학과' },
  { code: '27', name: '치과' },
  { code: '28', name: '한방' }
];

const Hospital = () => {
  useTitle('MediChat - 병원 검색');

  const [keyword, setKeyword] = useState('');
  const [subject, setSubject] = useState('');
  const [results, setResults] = useState<HospitalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event?: FormEvent) => {
    event?.preventDefault();
    if (!keyword.trim()) {
      setError('병원명을 입력해 주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/hospital/getHospList', {
        params: {
          name: keyword.trim(),
          pageNo: 1,
          subjectCode: subject || undefined
        }
      });

      const items = response.data?.response?.body?.items?.item;
      if (Array.isArray(items)) {
        setResults(items);
      } else if (items) {
        setResults([items]);
      } else {
        setResults([]);
        setError('검색 결과가 없습니다.');
      }
    } catch (err) {
      console.error(err);
      setError('병원 정보를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hospital-grid">
      <div className="glass-panel">
        <p className="chip" style={{ width: 'fit-content' }}>실시간 병원 지도</p>
        <h2>어디에서 진료받을까요?</h2>
        <p style={{ color: 'var(--muted)' }}>
          진료 과목과 병원명을 조합하면 가장 가까운 선택지를 바로 확인할 수 있습니다.
        </p>
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }} onSubmit={handleSearch}>
          <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="병원 이름" />
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">진료 과목 전체</option>
            {subjectCodes.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
          <button className="primary" type="submit" disabled={loading}>
            {loading ? '검색 중...' : '검색'}
          </button>
        </form>
      </div>

      <div className="glass-panel hospital-table">
        <h3 style={{ marginTop: 0 }}>검색 결과</h3>
        {error && <div className="alert">{error}</div>}
        {!error && results.length === 0 && !loading && <p style={{ color: 'var(--muted)' }}>검색어를 입력해 결과를 확인하세요.</p>}
        {loading && <div className="spinner-glow" />}
        {results.length > 0 && (
          <table className="table-skin">
            <thead>
              <tr>
                <th>병원명</th>
                <th>지역</th>
              </tr>
            </thead>
            <tbody>
              {results.map((hospital, index) => (
                <tr key={`${hospital.yadmNm}-${index}`}>
                  <td>{hospital.yadmNm}</td>
                  <td>
                    {[hospital.sgguCdNm, hospital.emdongNm].filter(Boolean).join(' ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Hospital;
