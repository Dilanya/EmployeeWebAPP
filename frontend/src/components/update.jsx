import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; // Import Yup
import { Formik, Form, ErrorMessage } from 'formik'; // Import Formik components
import UserService from '../service/EmployeeService';
import Container from 'react-bootstrap/Container';
import Spinner from '../Assets/Spinner.gif';

function Update() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: '',
    city: ''
  });

  useEffect(() => {
    fetchUserDataById(userId); // Pass the userId to fetchUserDataById
  }, [userId]); // When there's a change in userId, run this

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getUserById(userId, token); // Pass userId to getUserById
      const { name, email, role, city } = response.employee;
      console.log(name, email, role, city);
      setUserData({ name, email, role, city });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    role: Yup.string().transform((value, originalValue) => {
      return originalValue ? originalValue.toUpperCase() : value;
  }).required('Role is required'),
    city: Yup.string().required('City is required'),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const confirmDelete = window.confirm('Are you sure you want to Update this user?');
      if (confirmDelete) {
        const token = localStorage.getItem('token');
        const res = await UserService.updateUser(userId, userData, token);
        console.log(res)
        
        
        setTimeout(() => {
          setLoading(false); 
          navigate("/admin/user-management")
          
      }, 5000);
    } 

    } catch (error) {
      console.error('Error updating user profile:', error);
      alert(error)
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading ? (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <img src={Spinner} alt="Loading..." style={{ width: '100px', height: '100px' }} />
        </div>
      ) : (
        <div className="row" style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <div className="col-md-6">
            <h2>Update User</h2>
            <Formik
              initialValues={
              {userData}}
              
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              
                <Form className="needs-validation" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={userData.name} onChange={handleInputChange} className="form-control" required/>
                    
                    <ErrorMessage name="name" component="div" className="error-message" style={{ color: 'red' }}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} className="form-control" required/>
                    <ErrorMessage name="email" component="div" className="error-message" style={{ color: 'red' }}/>
                  </div>
                  <div className="form-group">
    <label htmlFor="role">Role:</label>
    <select id="role" name="role" value={userData.role} onChange={handleInputChange} className="form-control" required>
        <option value="">Select Role</option>
        <option value="ADMIN">Admin</option>
        <option value="USER">User</option>
    </select>
    <ErrorMessage name="role" component="div" className="error-message" style={{ color: 'red' }} />
</div>

                  <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" name="city" value={userData.city} onChange={handleInputChange} className="form-control" required/>
                    <ErrorMessage name="city" component="div" className="error-message" style={{ color: 'red' }}/>
                  </div>
                  <button type="submit" className="btn btn-primary" >Update</button>
                </Form>
              
            </Formik>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Update;
