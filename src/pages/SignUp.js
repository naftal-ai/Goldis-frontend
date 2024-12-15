import React, { useState, useRef, useEffect } from "react";
import "./styles/signUp.css";
import axios from "axios";
import { API_BASE_URL } from "../lib/Constants";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import Error from "../components/Error";
import Loading from "../components/Loading";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    street: "",
    house: "",
    comments: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const errorRef = useRef(null);

  const navigator = useNavigate();

 useEffect(() => console.log(errorRef), [errorRef]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { city, street, house, comments } = formData;
    const address = { city, street, house, comments };

    console.log("Form Submitted:", { ...formData, address });
    axios
      .post(`${API_BASE_URL}/user/signup`, { ...formData, address })
      .then(function (response) {
        //redirect to login page
        setLoading(false);
        console.log(response);
        navigator("/login", { state: formData.email });
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setErrorMsg(error.response?.data?.message || error.message);
        
        setTimeout(() => setErrorMsg(""), 10000);
      });
  };

  return (
    <div className="sign-up">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2>Sign Up</h2>

          <form onSubmit={handleSubmit} className="sign-up-form">
            {errorMsg.length > 0 && (
             <Error ref={errorRef} errMsg={errorMsg} setErrMsg={setErrorMsg} />
              
            )}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="house">House</label>
              <input
                type="text"
                id="house"
                name="house"
                value={formData.house}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="comments">Comments (Optional)</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="btn-submit" >
              Sign Up
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default SignUp;
