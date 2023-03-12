import { Button } from 'components/button';
import { LoadingSpinner } from 'components/loading';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCategory, fetchCategories } from 'redux/features/categorySlice';
import Swal from 'sweetalert2';
import { getToken } from 'utils/getToken';
import CategoryTable from './CategoryTable';

const limit = 10;

const CategoryManage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [name, setName] = useState(null);

  const { data, totalPages, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    document.title = 'Category Manage';
    dispatch(
      fetchCategories({
        name,
        page,
        limit,
      })
    );
  }, [dispatch, page, name]);

  const handleCreate = () => {
    navigate('/manage/add-category');
  };

  const handleEdit = (id) => {
    navigate(`/manage/update-category?id=${id}`);
  };


  const handleDelete = (id) => {
    Swal.fire({
      title: 'Thông báo',
      text: `Bạn muốn hủy xóa category có id = ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = getToken();
          dispatch(deleteCategory({ id, body: { isDelete: true }, token })).unwrap();
          if (data) {
            Swal.fire('Thông báo', 'Xóa thành công', 'success');
            dispatch(
              fetchCategories({
                name,
                page,
                limit,
              })
            );
          }
        } catch (error) {
          toast.error('Cập nhật thất bại');
        }
      }
    });
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleInputFilter = debounce((e) => {
    setName(e.target.value);
    setPage(1);
  }, 500);

  return (
    <div>
      <h1 className="dashboard-heading">Manage Categories</h1>
      <div className="flex justify-end gap-3 mb-5">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
        <Button className="bg-primary" onClick={handleCreate}>
          Create Categpry
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <CategoryTable list={data} onDelete={handleDelete} onEdit={handleEdit} />
          <div className="flex items-center justify-center mt-4">
            <ReactPaginate
              className="pagination"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={limit}
              pageCount={totalPages || 0}
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

export default CategoryManage;
