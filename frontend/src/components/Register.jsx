import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserService from '../service/EmployeeService';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

function Register() {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        role: Yup.string().required('Role is required'),
        city: Yup.string().required('City is required')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const token = localStorage.getItem('token');
            await UserService.register(values, token);
            resetForm();
            alert('User registered successfully');
            navigate('/admin/user-management');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container>
            <div className="row" style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                <div className="col-md-6">
                    <h2>Registration</h2>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            role: '',
                            city: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="needs-validation">
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <Field type="text" id="name" name="name" className="form-control" required />
                                    <ErrorMessage name="name" component="div" className="error-message" style={{ color: 'red' }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <Field type="email" id="email" name="email" className="form-control" required />
                                    <ErrorMessage name="email" component="div" className="error-message" style={{ color: 'red' }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <Field type="password" id="password" name="password" className="form-control" required />
                                    <ErrorMessage name="password" component="div" className="error-message" style={{ color: 'red' }}/>
                                </div>
                                <div className="form-group">
    <label htmlFor="role">Role:</label>
    <Field as="select" id="role" name="role" className="form-control" required>
        <option value="">Select Role</option>
        <option value="ADMIN">Admin</option>
        <option value="USER">User</option>
    </Field>
    <ErrorMessage name="role" component="div" className="error-message" style={{ color: 'red' }} />
</div>
                                <div className="form-group">
                                    <label htmlFor="city">City:</label>
                                    <Field type="text" id="city" name="city" className="form-control" required />
                                    <ErrorMessage name="city" component="div" className="error-message" style={{ color: 'red' }}/>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Register</button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Container>
    );
}

export default Register;
