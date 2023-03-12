import { Button } from 'components/button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts } from 'redux/features/productSlice';
import ProductTable from './ProductTable';
import ReactPaginate from 'react-paginate';
import { LoadingSpinner } from 'components/loading';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'utils/getToken';
import { debounce } from 'lodash';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const limit = 10;
const ProductManage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [name, setName] = useState(null);
  const { data, totalPages, loading } = useSelector((state) => state.products);

  useEffect(() => {
    document.title = 'Product Manage';
    dispatch(
      fetchProducts({
        name,
        page,
        limit,
      })
    );
  }, [dispatch, page, name]);

  const handleCreate = () => {
    navigate('/manage/add-product');
  };

  const handleEdit = (id) => {
    navigate(`/manage/update-product/${id}`);
  };

  // const handleDelete = (id) => {
  //   const token = getToken();
  //   dispatch(deleteProduct({ id, token }));
  // };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Thông báo',
      text: `Bạn muốn hủy xóa product có id = ${id}`,
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
          dispatch(deleteProduct({ id, body: { isDelete: true }, token })).unwrap();
          if (data) {
            Swal.fire('Thông báo', 'Xóa thành công', 'success');
            dispatch(
              fetchProducts({
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
  }, 500);

  return (
    <div>
      <h1 className="dashboard-heading">Manage Products</h1>
      <div className="flex justify-end gap-3 mb-5">
        <input
          type="text"
          placeholder="Search product..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
        <Button className="bg-primary" to="/manage/add-category" onClick={handleCreate}>
          Create Product
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <ProductTable list={data} onDelete={handleDelete} onEdit={handleEdit} />
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

export default ProductManage;
