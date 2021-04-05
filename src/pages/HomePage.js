import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Spinner } from "react-bootstrap";
const HomePage = () => {
  // const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
  //   fetch(
  //     "https://api.codingthailand.com/api/news"
  //   ).then((res) => res.json())
  // );

  const query = useQuery("repoData", () => {
    const controller = new AbortController();
    const signal = controller.signal;
      const promise =  fetch(
        "https://api.codingthailand.com/api/news",{
          method : 'get',
          signal : signal
        }
      ).then((res) => res.json());
        
      //cancel request
      promise.cancel = () => controller.abort();
      return promise;
    }
  );
  const { isLoading, error, data, isFetching } = query;
  
  if (isLoading === true) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>เกิดข้อผิดพลาด</p>
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }
  return (
    <>
      <main role="main">
        {/* Main jumbotron for a primary marketing message or call to action */}
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Welcome</h1>
            <p>พัฒนาด้วย React v.2</p>
            <p>
              <Link
                to="/product"
                className="btn btn-primary btn-lg"
                role="button"
              >
                สินค้าทั้งหมด
              </Link>
            </p>
          </div>
        </div>
        <div className="container">
          {/* Example row of columns */}
          <div className="row">
            <div className="text-center">
              {isFetching ? 'Updating' : null}
            </div>
            {
              data.data.map((news, index) => {
                return (
                  <div className="col-md-4" key={news.id}>
                    <h2>{news.topic}</h2>
                    <p>
                      {news.detail}
                    </p>
                    <p>
                      หมวดหมู่ : {news.name}
                    </p>
                  </div>
                )
              })
            }
          </div>
          <hr />
        </div>{" "}
        {/* /container */}
      </main>
    </>
  );
};

export default HomePage;
