import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../../context/Admin.context";
import axios from "axios";
import Loader from "../../../components/Loader/Loader";

function AllUsers() {
  const { token } = useContext(AdminContext);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/admin/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  if (loading)
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div className="text-red-500">Error loading users: {error}</div>
      </div>
    );

  return (
    <>
      <div className="w-full lg:w-5/6 float-end px-8 py-8">
        <div>
          <h1 className="text-2xl xs:text-4xl">all users</h1>
          <p className="text-lightgray text-xs pt-0.5 xs:text-sm">
            manage all registered users and their statuses
          </p>
        </div>
        <div className="mb-4 xs:mb-0 mt-4">
          <h2 className="text-2xl xs:text-3xl mb-0.5">user list</h2>
          <p className="text-lightgray text-xs xs:text-sm">
            list of all users with basic info and quick actions
          </p>
        </div>
        <div className="overflow-x-auto mt-4">
          <div>
            <div className="min-w-[600px] grid grid-cols-9 items-center gap-4">
              <span className="text-sm whitespace-nowrap text-lightblack">
                user id
              </span>
              <span className="col-span-2 text-sm whitespace-nowrap text-lightblack">
                name
              </span>
              <span className="col-span-2 text-sm whitespace-nowrap text-lightblack">
                phone
              </span>
              <span className="col-span-3 text-sm whitespace-nowrap text-lightblack">
                email
              </span>
              <span className="text-sm whitespace-nowrap text-lightblack">
                action
              </span>
            </div>
            {users &&
              users.map((user) => (
                <div
                  key={user.id}
                  className="min-w-[600px] grid grid-cols-9 items-center gap-4 mt-3"
                >
                  <span className="text-sm whitespace-nowrap">{user.id}</span>
                  <span className="col-span-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {user.name}
                  </span>
                  <span className="col-span-2 text-sm whitespace-nowrap">
                    {user.phone}
                  </span>
                  <span className="col-span-3 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {user.email}
                  </span>
                  <Link
                    to={`/Admin/ViewUser/${user.id}`}
                    className="w-fit text-sm whitespace-nowrap bg-primary text-white rounded-sm py-1 px-4 border border-lightblack hover:bg-transparent hover:text-black transition duration-300"
                  >
                    view
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUsers;
