import { useEffect, useState } from 'react';
import UserTable from './UserTable';
import ReactPaginate from 'react-paginate';
import { LoadingSpinner } from 'components/loading';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'utils/getToken';
import { toast } from 'react-toastify';
import userService from 'services/userServices';
import { debounce } from 'lodash';

const limit = 10;
const UserManage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    document.title = 'User Manage';
    (async () => {
      try {
        setLoading(true);
        const data = await userService.getAll({
          email,
          page,
          limit,
        });
        if (data?.totalPages) {
          setUsers(data.data);
          setTotalPages(data.totalPages);
        } else {
          setUsers(data);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error);
      }
    })();
    setLoading(false);
  }, [email, page]);

  const handleEdit = (id) => {
    navigate(`/manage/update-user/${id}`);
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleInputFilter = debounce((e) => {
    setEmail(e.target.value);
    setPage(1);
  }, 500);

  return (
    <div>
      <h1 className="dashboard-heading">Manage Users</h1>
      <div className="flex justify-end gap-3 mb-10">
        <input
          type="text"
          placeholder="Search user..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <UserTable list={users} onEdit={handleEdit} />

          <div className="flex items-center justify-center mt-4">
            <ReactPaginate
              className="pagination"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={limit}
              pageCount={totalPages}
              previousLabel="<"
              renderOnZeroPageCount={null}
              forcePage={page - 1}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserManage;
