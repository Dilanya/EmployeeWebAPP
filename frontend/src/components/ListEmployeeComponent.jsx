import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const ListEmployeeComponent = () => {
    const [employeeArray, setEmployeeArray] = useState([]);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        getAllEmployee();
    }, []);

    function getAllEmployee() {
        EmployeeService.getAllEmployee()
            .then(res => { setEmployeeArray(res.data); console.log(res) })
            .catch(e => console.log(e));
    }

    
    function deleteEmployee(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (confirmDelete) {
            setDeleting(true); // Start the spinner
            EmployeeService.deleteEmployee(id)
                .then(() => {
                    setDeleting(false); // Stop the spinner
                    getAllEmployee(); // Reload all employees
                })
                .catch(e => {
                    console.log(e);
                    setDeleting(false); // Stop the spinner in case of error
                });
        }
    }

    return (
        <div className='container'>
            <Link to={"/add-employee"} className='btn btn-primary mb-2 mt-3'>Add Employee</Link>
            <h2 className='text-center mb-4'>List Employee</h2>
            <table className='table table-bordered table-striped'>
                <thead className="thead-dark">
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeArray.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <Link to={`/employee/${employee.id}`} className='btn btn-success ml-2 ' >View</Link>
                                <Link to={`/add-employee/${employee.id}`} className='btn btn-info ml-2'style={{marginLeft:2}}>Update</Link>
                                <Button onClick={() => deleteEmployee(employee.id)} variant="danger" className="mr-2" style={{marginLeft:2}}>
                                    {deleting && <Spinner animation="border" size="sm" />} Delete
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;
