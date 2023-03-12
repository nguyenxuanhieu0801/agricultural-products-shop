import { useEffect, useState } from 'react';
import { LoadingSpinner } from 'components/loading';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import OrderTable from './OrderTable';
import { getToken } from 'utils/getToken';
import { OrderService } from 'services/orderServices';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

const limit = 10;

const OrderManage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    document.title = 'Order Manage';
    (async () => {
      try {
        setLoading(true);
        const token = getToken();
        const { orders: data } = await OrderService.getAll(token, );
        if (data?.totalPages) {
          setOrders(data.data);
          setTotalPages(data.totalPages);
        } else {
          setOrders(data);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error);
      }
    })();
    setLoading(false);
  }, [page]);

  const handleEdit = (id) => {
    navigate(`/manage/update-order/${id}`);
  };

  const handleView = (id) => {
    navigate(`/manage/order/${id}`);
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };


  return (
    <div>
      <h1 className="dashboard-heading">Manage Orders</h1>

      {loading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <OrderTable list={orders} onEdit={handleEdit} onView={handleView} />
          <div className="flex items-center justify-center mt-4">
            <ReactPaginate
              className="mt-2 pagination"
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

export default OrderManage;
