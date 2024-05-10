import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/EmployeeService";
import Button from "react-bootstrap/Button";
import Spinner from "../Assets/Spinner.gif";

function EmployeeManagement() {
  const [users, setUsers] = useState([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getAllUsers(token);
      //   console.log(response);
      setUsers(response.employeeList); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
     
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );

      const token = localStorage.getItem("token"); 
      if (confirmDelete) {
        setDeleting(true);
        await UserService.deleteUser(userId, token);

        setTimeout(() => {
          fetchUsers();
          setDeleting(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      {" "}
      {deleting ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            src={Spinner}
            alt="Loading..."
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      ) : (
        <div className="container">
          <Link to="/register" className="btn btn-primary mb-2 mt-3">
            Add Employee
          </Link>
          <h2 className="text-center mb-4">List Employee</h2>
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.city}</td>
                  <td>
                    <Button
                      onClick={() => deleteUser(user.id)}
                      variant="danger"
                      className="mr-2"
                      style={{ marginLeft: 2 }}
                    >
                      Delete
                    </Button>
                    <Link
                      to={`/update-user/${user.id}`}
                      className="btn btn-info ml-2"
                      style={{ marginLeft: 2 }}
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default EmployeeManagement;
