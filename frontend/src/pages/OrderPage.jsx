import { ActionDelete, ActionEdit, ActionView } from 'components/actions';
import { Button } from 'components/button';
import { IconMinus, IconPlus } from 'components/icons';
import { Table } from 'components/table';
import Layout from 'layouts/Layout';
import CartSummury from 'module/cart/CartSummury';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart, fetchCart, removeItem } from 'redux/features/cartSlice';
import { OrderService } from 'services/orderServices';
import userService from 'services/userServices';
import Swal from 'sweetalert2';
import { STEP } from 'utils/constants';
import { getToken } from 'utils/getToken';

const limit = 10;

const OrderPage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = 'Orders';
    (async () => {
      try {
        const token = getToken();
        const data = await userService.getListOrderOfUser(user.id, token, {
          page,
          limit,
        });
        if (data.totalPage) {
          setTotalPages(data.totalPage);
          setPage(data.page);
        } else {
          setList(data.sort((a, b) => b.id - a.id));
        }
      } catch (error) {}
    })();
  }, [navigate, user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Thông báo',
      text: `Bạn muốn hủy đơn hàng có id = ${id}`,
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
          const data = await OrderService.update(id, { status: 3 }, token);
          if (data) {
            Swal.fire('Thông báo', 'Đã hủy đơn hàng thành công', 'success');
            const data = await userService.getListOrderOfUser(user.id, token);
            setList(data.sort((a, b) => b.id - a.id));
          }
        } catch (error) {
          toast.error('Cập nhật thất bại');
        }
      }
    });
  };

  const handleView = (id) => {
    navigate(`/orders/${id}`);
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  if (!user) navigate('/404');

  const renderStatus = (status) => {
    switch (status) {
      case 0:
        return 'Đang xử lý';
      case 1:
        return 'Đang giao hàng';
      case 2:
        return 'Giao hàng thành công';
      case 3:
        return 'Hủy';
      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="max-w-[1170px] mx-auto">
        <h2 className="font-bold text-[30px] leading-normal mb-4 text-center">Danh sách đơn hàng</h2>
        <Table className="">
          <thead>
            <tr>
              <th>Id</th>
              <th>Họ và tên</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 &&
              list.map((item) => (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <th>{item.shipName}</th>
                  <th>{item.shipAddress}</th>
                  <th>{item.shipPhone}</th>
                  <th>{renderStatus(item.status)}</th>
                  <th>
                    <div className="flex items-center gap-x-3">
                      <ActionView onClick={() => handleView(item.id)} />

                      {item.status !== 2 && <ActionDelete onClick={() => handleDelete(item.id)} />}
                    </div>
                  </th>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="flex items-center justify-center mt-1">
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
      </div>
    </Layout>
  );
};

export default OrderPage;
