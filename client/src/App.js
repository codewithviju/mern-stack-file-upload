import React, { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [profile, setProfile] = useState();
  useEffect(() => {
    const getAllUsers = async () => {
      const getAllData = await axios.get("http://localhost:9000/api/v1/users");
      setUsers(getAllData.data);
    };
    getAllUsers();
  }, [render]);

  const formdata = new FormData();
  formdata.append("name", inputs.name);
  formdata.append("email", inputs.email);
  formdata.append("age", inputs.age);
  formdata.append("profile", profile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:9000/api/v1/users", formdata);
      setRender(true);
      setInputs({
        name: "",
        email: "",
        age: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12" style={{ backgroundColor: "blue" }}>
          <h1 className="text-center text-white">MERN FILE UPLOAD</h1>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                type="text"
                value={inputs.name}
                onChange={(e) =>
                  setInputs({ ...inputs, [e.target.name]: e.target.value })
                }
                name="name"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Email
              </label>
              <input
                type="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, [e.target.name]: e.target.value })
                }
                name="email"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Age
              </label>
              <input
                value={inputs.age}
                onChange={(e) =>
                  setInputs({ ...inputs, [e.target.name]: e.target.value })
                }
                type="number"
                name="age"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Profile
              </label>
              <input
                type="file"
                onChange={(e) => setProfile(e.target.files[0])}
                name="profile"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Profile</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => {
                  return (
                    <tr>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td>
                        <img
                          className="img img-fluid"
                          src={`http://localhost:9000/${user.profile}`}
                          alt="users"
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
