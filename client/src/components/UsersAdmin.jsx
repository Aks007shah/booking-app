import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';

function UsersAdmin(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/auth/getallusers`);
        setUsers(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="col-md-10">
        <h2> Total No. of Users <span className="text-danger"> {users.length} </span></h2>
        {loading && <Loader />}

        <div className="container-fluid">
          <table className="table table-border table-dark">
            <thead className="bs bg-dark">
              <tr>
                <th className="text-danger">User Id</th>
                <th className="text-danger">Name</th>
                <th className="text-danger">Email</th>
                <th className="text-danger">Password</th>
                <th className="text-danger">Is Admin</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td className={user.isAdmin ? 'bg-success' : 'bg-danger'}>
                      {user.isAdmin ? 'Yes' : 'No'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersAdmin;
