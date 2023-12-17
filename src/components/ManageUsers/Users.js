import { useEffect, useState } from "react";
import Navigate from "../Nav/Nav";
import { fetAllUsers, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModelDelete from "./ModelDelete";
import ModelUser from "./ModalUser";
import "./Users.scss";


const Users = (props) => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  //model delete
  const [isShowedModelDelete, setIsShowedModelDelete] = useState(false);
  const [dataModel, setDataModel] = useState({});

  //model update/create user
  const [isShowModelUser, setIsShowModelUser] = useState(false);
  const [actionModelUser, setActionModelUser] = useState("CREATE");
  const [dataModelUser, setDataModelUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    let response = await fetAllUsers(currentPage, currentLimit);
    if (response && response.EC === 0) {
      setTotalPages(response.DT.totalPages);
      setListUser(response.DT.users);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleDeleteUser = async (user) => {
    setDataModel(user);
    setIsShowedModelDelete(true);
  };

  const handleClose = () => {
    setIsShowedModelDelete(false);
    setDataModel({});
  };
  const confirmDeleteUser = async () => {
    let response = await deleteUser(dataModel);
    if (response && response.EC === 0) {
      toast.success(response.EM);
      await fetchUsers();
      setIsShowedModelDelete(false);
    } else {
      toast.error(response.EM);
    }
  };
  const onHideModelUser = async () => {
    setDataModel({})
    setIsShowModelUser(false);
    await fetchUsers()
  };

  const handleEditUser = (user) => {
    setActionModelUser("UPDATE");
    setIsShowedModelDelete(false);
    setDataModel({});

    setDataModelUser(user);
    setIsShowModelUser(true);
  };
  return (
    <>
      <Navigate></Navigate>
      <div className="container">
        <div className="manage-users-container">
          <div className="user-header">
            <div className="title">
              <h3>Table Users</h3>
            </div>
            <div className="action">
              <button className="btn btn-success">Refresh</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsShowModelUser(true);
                  setActionModelUser("CREATE");
                }}
              >
                Add new user
              </button>
            </div>
          </div>
          <div className="user-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">no</th>
                  <th scope="col">id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Username</th>
                  <th scope="col">Group</th>
                </tr>
              </thead>
              <tbody>
                {listUser && listUser.length > 0 ? (
                  <>
                    {listUser.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>
                            {(currentPage - 1) * currentLimit + index + 1}
                          </td>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.username}</td>
                          <td>{item.Group? item.Group.name : ''}</td>
                          <td>
                            <button
                              className="btn btn-warning mx-2"
                              onClick={() => {
                                handleEditUser(item);
                              }}
                            >
                              edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                handleDeleteUser(item);
                              }}
                            >
                              delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Not found users</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 0 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>

      <ModelDelete
        show={isShowedModelDelete}
        handleClose={handleClose}
        confirmDeleteUser={confirmDeleteUser}
        dataModel={dataModel}
      />
      <ModelUser
        onHide={onHideModelUser}
        show={isShowModelUser}
        action={actionModelUser}
        dataModelUser={dataModelUser}
      />
    </>
  );
};

export default Users;
