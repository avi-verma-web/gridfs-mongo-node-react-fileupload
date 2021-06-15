import React, { useEffect, useState } from "react";
import axios from "axios";
import Load from "../Rhombus.gif";

const AllFiles = () => {
  const [dAry, setdAry] = useState([]);
  const [ld, setLd] = useState(false);
  useEffect(() => {
    setLd(true);
    axios
      .get("/files")
      .then((res) => {
        setdAry(res.data);
        setLd(false);
      })
      .catch((err) => {
        console.log(err);
        setLd(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("/files/" + id)
      .then((res) => {
        let a = dAry.filter((a) => a._id !== id);
        setdAry(a);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center display-4 my-4">Mongo File Upload</h1>
        {ld ? (
          <div className="afllex">
            <img src={Load} alt="" />
          </div>
        ) : (
          dAry.map((el, index) => {
            return (
              <div key={index} className="col-md-4 m-auto">
                <div className="card card-body mb-3">
                  {el.contentType === "image/jpeg" ||
                  el.contentType === "image/png" ? (
                    <>
                      <img
                        src={`/image/${el.filename}`}
                        alt=""
                        width="100%"
                        height="40%"
                      ></img>
                      <button
                        className="btn btn-danger btn-block mt-4"
                        onClick={() => handleDelete(el._id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{el.filename}</p>
                      <button
                        className="btn btn-danger btn-block mt-4"
                        onClick={() => handleDelete(el._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllFiles;
