import React from 'react';
import Navbar from '../components/Navbar';
import '../assets/css/Search-Input-Responsive-with-Icon.css'

const Hospital = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <h1>병원 검색</h1>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-10 offset-md-1">
                <div className="card m-auto" style={{ maxWidth: "850px" }}>
                  <div className="card-body">
                    <form className="d-flex align-items-center">
                      <i className="fas fa-search d-none d-sm-block h4 text-body m-0"></i>
                      <input
                        className="form-control form-control-sm flex-shrink-1 form-control-borderless input-height"
                        type="search"
                        placeholder="병원명 입력"
                        name="search"
                      />
                      <button className="btn btn-success btn-lg no-wrap" type="submit">
                        검색
                      </button>
                    </form>
                  </div>
                </div>
                <table id="example" className="table table-striped table-bordered" cellspacing="0" width="100%">
                  <thead>
                    <tr>
                      <th>병원명</th>
                      <th>지역</th>
                      <th>진료과</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Table content */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Hospital;