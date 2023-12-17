import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { fetchGroup, createNewUser } from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";

const ModelUser = (props) => {
  const { action, dataModelUser } = props;
  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "",
    group: "",
  };
  const validaInputDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [userData, setUserData] = useState(defaultUserData);
  const [validInputs, setValidInputs] = useState(validaInputDefault);

  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    getGroup();
  }, []);
  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({
        ...dataModelUser,
        group: dataModelUser.Group ? dataModelUser.Group.id : "",
      });
    }
  }, [dataModelUser]);
  useEffect(() => {
    if (action === 'CREATE') {
      if (userGroups && userGroups.length>0) {
        setUserData({ ...userData, group: userGroups[0].id });
      }
    }
  }, [action])

  const getGroup = async () => {
    let res = await fetchGroup();
    if (res && res.EC === 0) {
      setUserGroups(res.DT);
      if (res.DT && res.DT.length > 0) {
        let groups = res.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.EM);
    }
  };

  const handleOnchangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const checkValidateInputs = () => {
    setValidInputs(validaInputDefault);
    // create user
    let arr = ["email", "phone", "password", "group"];
    let check = true;
    for (let index = 0; index < arr.length; index++) {
      if (!userData[arr[index]]) {
        toast.error(`Empty input ${arr[index]}`);
        let _validInputs = _.cloneDeep(validaInputDefault);
        _validInputs[arr[index]] = false;
        setValidInputs(_validInputs);
        check = false;
        break;
      }
      return check;
    }
  };
  const handleConfirmUser = async () => {
    //create user
    let check = checkValidateInputs();
    if (check == true) {
      let res = await createNewUser({
        ...userData,
        groupId: userData["group"],
      });
      if (res.data && res.EC === 0) {
        props.onHide();
        setUserData({ ...defaultUserData, group: userGroups[0].id });
      }
      if (res.data && res.EC !== 0) {
        toast.error(res.EM);
        let _validInputs = _.cloneDeep(validaInputDefault);
        _validInputs[res.DT] = false;
        setValidInputs(_validInputs);
      }
    }
  };

  const handleCloseModelUser = () => {
    props.onHide()
    setUserData(defaultUserData)
    setValidInputs(validaInputDefault)
  }
  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        className="model-user"
        onHide={() => handleCloseModelUser()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>
              {props.action === "CREATE" ? "Create new user" : "Edit new user"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Email address: (<span className="red">*</span>)
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                className={
                  validInputs.email ? "form-control" : "form-control is-invalid"
                }
                type="email"
                value={userData.email}
                onChange={(event) => {
                  handleOnchangeInput(event.target.value, "email");
                }}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>
                Phone number (<span className="red">*</span>)
              </label>
              <input
                disabled={action === "CREATE" ? false : true}
                className={
                  validInputs.phone ? "form-control" : "form-control is-invalid"
                }
                type="text"
                value={userData.phone}
                onChange={(event) => {
                  handleOnchangeInput(event.target.value, "phone");
                }}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Username:</label>
              <input
                className={
                  validInputs.username
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                value={userData.username}
                onChange={(event) => {
                  handleOnchangeInput(event.target.value, "username");
                }}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              {action === "CREATE" && (
                <>
                  <label>
                    Password: (<span className="red">*</span>)
                  </label>
                  <input
                    className={
                      validInputs.password
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    type="password"
                    value={userData.password}
                    onChange={(event) => {
                      handleOnchangeInput(event.target.value, "password");
                    }}
                  />
                </>
              )}
            </div>
            <div className="col-12 col-sm-12 form-group">
              <label>Address: </label>
              <input
                className="form-control"
                type="text"
                value={userData.address}
                onChange={(event) => {
                  handleOnchangeInput(event.target.value, "address");
                }}
              />
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Gender: </label>
              <select
                value={userData.sex}
                className="form-select"
                type="text"
                onChange={(event) => {
                  handleOnchangeInput(event.target.value, "sex");
                }}
              >
                <option defaultValue="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 form-group">
              <label>Group: </label>
              <select
                value={userData.group}
                className={
                  validInputs.group ? "form-select" : "form-control is-invalid"
                }
                type="text"
                onChange={(event) => {
                  handleOnchangeInput(event.target.value, "group");
                }}
              >
                {userGroups.length > 0 &&
                  userGroups.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModelUser()}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmUser}>
            {action === 'CREATE' ? 'Save' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelUser;
