import React, { useState } from "react";
import axios from "axios";
import Load from "./Rhombus.gif";
import { Link } from "react-router-dom";
// mimetype
function App() {
  const [f, setF] = useState();
  const [fName, setfName] = useState("");
  const [ld, setLd] = useState(false);
  const [mTyp, setmTyp] = useState("");
  const [id, setid] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLd(true);
    let data = new FormData();
    data.append("file", f);
    axios
      .post("/upload", data)
      .then((res) => {
        console.log(res.data);
        setfName(res.data.file.filename);
        setmTyp(res.data.file.mimetype);
        setid(res.data.file.id);
        setLd(false);
      })
      .catch((err) => {
        console.log(err);
        setLd(false);
      });
  };

  const handleDelete = () => {
    axios
      .delete("/files/" + id)
      .then((res) => {
        console.log(res.data);
        setfName("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 m-auto">
          <h1 className="text-center display-4 my-4">Mongo File Upload</h1>
          <Link to="/documents">
            <input
              type="button"
              name="file"
              id="file"
              value="View All Files"
              className="btn btn-block btn-success mb-3"
              onChange={(e) => setF(e.target.files[0])}
            />
          </Link>
          <form>
            <div className="custom-file mb-3">
              <input
                type="file"
                name="file"
                id="file"
                className="custom-file-input"
                onChange={(e) => setF(e.target.files[0])}
              />
            </div>
            <input
              type="button"
              value="Submit"
              className="btn btn-primary btn-block"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
      <div className="row1">
        {ld ? (
          <div className="imgFlex">
            <img src={Load} alt="" />
          </div>
        ) : fName.length === 0 ? null : mTyp === "image/jpeg" ||
          mTyp === "image/png" ? (
          <div className="col-md-6">
            <div className="card card-body mb-3">
              <img src={`/image/${fName}`} alt="" width="100%" height="40%" />
              <button className="btn btn-danger btn-block mt-4">Delete</button>
            </div>
          </div>
        ) : (
          <div className="col-md-6">
            <div className="card card-body mb-3">
              <p>{fName}</p>
              <button
                onClick={handleDelete}
                className="btn btn-danger btn-block mt-4"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
