import { useEffect, useState } from "react";
import axios from "axios";
import CrudData from "./Components/CrudData";

function App() {
  const [users, setUsers] = useState([]);
  const [addingUser, setAddingUser] = useState({
    name: "",
    lname: "",
    age: "",
    city: "",
    id: null,
  });

  function onFormUpdate(e) {
      const { name, value } = e.target;
    setAddingUser((prevState) => ({
      ...prevState,
      [name]: value.charAt(0).toUpperCase() + value.slice(1),
    }));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:3000/users").then((res) => {
      console.log('Data Fetched');
      setUsers(res.data);
    });
  };

  const addUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users/add", { ...addingUser })
      .then((data) => {
        console.log("Data Has Been Sended Successfully", data);
        fetchData();
        setAddingUser({ name: "", lname: "", age: "", city: "", id: null });
      })
      .catch((err) => console.log(err));
  };

  const editUser = (user) => {
    setAddingUser({
      name: user.name,
      lname: user.lname,
      age: user.age,
      city: user.city,
      id: user._id,
    });
  };

  const updateUser = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:3000/users/update/${addingUser.id}`, {
        ...addingUser,
      })
      .then((data) => {
        console.log("Updated Succefully", data);
        fetchData();
        setAddingUser({ name: "", lname: "", age: "", city: "", id: null });
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (userId) => {
    axios
      .delete(`http://localhost:3000/users/delete/${userId}`)
      .then((res) =>
        {
          console.log('deleted', res);
          fetchData()

        } )
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container container-fluid w-50">
        <div>
          <h1>Friends Database</h1>

          <table className="table table-hover table-dark rounded">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Age</th>
                <th scope="col">City</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              <CrudData data={users} edit={editUser} deleteUser={deleteUser} />
            </tbody>
          </table>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center bg-secondary rounded">
          <h1>Adding Friends</h1>
          <form
            className="form-control d-flex flex-column align-items-center justify-content-center bg-primary mx-4"
            onSubmit={addingUser.id ? updateUser : addUser}
          >
            <label>Enter Your Name</label>
            <input
              name="name"
              value={addingUser.name}
              onChange={onFormUpdate}
              className="form-control col-xl-3 w-75"
            />
            <label>Enter Your Last Name</label>
            <input
              name="lname"
              value={addingUser.lname}
              onChange={onFormUpdate}
              className="col-xl-3 w-75 form-control"
            />
            <label>Enter Your Age</label>
            <input
              name="age"
              value={addingUser.age}
              onChange={onFormUpdate}
              className="form-control col-xl-3 w-75"
            />
            <label>Enter Your City</label>
            <input
              name="city"
              value={addingUser.city}
              onChange={onFormUpdate}
              className="form-control col-xl-3 w-75"
            />
            {addingUser.id ? (
              <button type="submit" className="btn btn-success btn-lg mt-3">
                Update
              </button>
            ) : (
              <button type="submit" className="btn btn-success btn-lg mt-3">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
