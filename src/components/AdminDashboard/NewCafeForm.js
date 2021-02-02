import React, { useState, useEffect } from "react";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import axios from "axios";

const initialUserState = {
  username: "",
  password: "",
  user_name: "",
  role: "user",
  phone: ""
};

const NewCafeForm = (props) => {
  const { setCafeData, cafeData, initialCafeState, isEditing, cafes, setCafes } = props;

  const [userData, setUserData] = useState(initialUserState);

  // on initial load
  useEffect(() => {
    if (isEditing) {
      console.log(isEditing)
      axios.get(`http://localhost:5000/users/${cafeData.owner}`).then((res) => {
        setUserData(res.data);
      });
    }
  }, []);

  // every time isEditing changes
  useEffect(() => {
    if(!isEditing) {
      setUserData(initialUserState)
      setCafeData(initialCafeState)
    }
  }, [isEditing]);

  const addCafe = (newCafe) => {
    setCafes([...cafes, newCafe]);
  };

  const updateCafe = (newCafe) => {
    setCafes(cafes.map((cafe) => (cafe._id == cafeData._id ? newCafe : cafe)));
  };

  const handleCafeInputChange = (e) => {
    setCafeData({ ...cafeData, [e.target.name]: e.target.value });
  };

  const handleUserInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const updateExistingCafe = () => {
    axios
      .put(`http://localhost:5000/cafes/${cafeData._id}`, cafeData)
      .then((res) => updateCafe(res.data))
      .catch((error) => console.log(error));
      props.history.push('/admin');  
  };

  const updateExistingUser = () => {
    axios
      .patch(`http://localhost:5000/users/${userData._id}`, userData)
      .then((res) => console.log(res.data));
  };

  const saveNewUser = () => {
    return axios.post("http://localhost:5000/users/register", userData).then(res => {
      const cafeId = res.data._id;
      const newCafeData = {...cafeData, owner: cafeId};
      addCafe(newCafeData);
      return newCafeData
    })
  };

  const saveNewCafe = (newCafeData) => {
    return axios.post("http://localhost:5000/cafes", newCafeData).then(() => {
      setCafeData(initialCafeState);
      setUserData(initialUserState);
    })
  };

  const cancelEditing = () => {
    setCafeData(initialCafeState);
    setUserData(initialUserState);
    props.history.push('/admin');
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // console.log(userData);
    // if (cafeData.cafe_name && cafeData.address) { // add validation that all fields must be entered
    // console.log(cafeData);
    if (isEditing) {
      // Save updated cafe here
      updateExistingUser();
      updateExistingCafe();
    } else {
      saveNewUser().then(newCafeData => {
        saveNewCafe(newCafeData).then(() => {
          props.history.push('/admin');
        });
      })
    }
  };

  return (
    <div>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
          <h2>{isEditing ? "Edit" : "Add New"} Cafe</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleFinalSubmit}>
            <FormGroup>
              <Label for="cafe_name">Cafe name:</Label>
              <Input
                name="cafe_name"
                value={cafeData.cafe_name}
                onChange={handleCafeInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="user_name">Owner:</Label>
              <Input
                name="user_name"
                value={userData.user_name}
                onChange={handleUserInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="username">Email:</Label>
              <Input
                name="username"
                value={userData.username}
                onChange={handleUserInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input
                name="password"
                value={userData.password}
                onChange={handleUserInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="role">Role:</Label>
              <Input
                name="role"
                value={userData.role}
                onChange={handleUserInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone:</Label>
              <Input
                name="phone"
                value={userData.phone}
                onChange={handleUserInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="address">Address:</Label>
              <Input
                name="address"
                value={cafeData.address}
                onChange={handleCafeInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="opening">Opening time:</Label>
              <Input
                name="operating_hours[0]"
                value={cafeData.operating_hours[0] || ""}
                onChange={(e) =>
                  handleCafeInputChange({
                    target: {
                      name: "operating_hours",
                      value: [e.target.value, cafeData.operating_hours[1]],
                    },
                  })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="closing">Closing time:</Label>
              <Input
                name="operating_hours[1]"
                value={cafeData.operating_hours[1] || ""}
                onChange={(e) =>
                  handleCafeInputChange({
                    target: {
                      name: "operating_hours",
                      value: [cafeData.operating_hours[0], e.target.value],
                    },
                  })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="latitude">Latitude:</Label>
              <Input
                name="location[0]"
                value={cafeData.location[0] || ""}
                onChange={(e) =>
                  handleCafeInputChange({
                    target: {
                      name: "location",
                      value: [e.target.value, cafeData.location[1]],
                    },
                  })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="longitude">Longitude:</Label>
              <Input
                name="location[1]"
                value={cafeData.location[1] || ""}
                onChange={(e) =>
                  handleCafeInputChange({
                    target: {
                      name: "location",
                      value: [cafeData.location[0], e.target.value],
                    },
                  })
                }
              ></Input>
            </FormGroup>
            <Button>Submit</Button>
            <Button onClick={cancelEditing}>Cancel</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default NewCafeForm;
