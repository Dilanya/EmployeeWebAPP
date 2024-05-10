import React, { useState, useEffect } from 'react';
import UserService from '../service/EmployeeService';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import admin from "../Assets/admin.png"
import user from "../Assets/user.png"


function Profile() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {

            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.employee);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="row" style={{display:"flex",justifyContent:"center", marginTop:"1rem", width:"100%"}}>
        <Card style={{ width: '18rem', display:"flex"}}>
      <Card.Body>
        
      <Card.Img variant="top" src={profileInfo.role === "ADMIN" ? admin : user} alt="User Icon" />
      <div className="d-flex justify-content-between align-items-center">
          <Card.Title>Profile Information</Card.Title>
          
        </div>
        <Card.Text>
          <p>Name: {profileInfo.name}</p>
          <p>Email: {profileInfo.email}</p>
          <p>City: {profileInfo.city}</p>
          {profileInfo.role === "ADMIN" && (
            <Button as={Link} to={`/update-user/${profileInfo.id}`} variant="primary">Update This Profile</Button>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    );
}

export default Profile;