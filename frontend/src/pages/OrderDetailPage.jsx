import { LoadingSpinner } from 'components/loading';
import Layout from 'layouts/Layout';
import OrderDetailTable from 'module/order/OrderDetailTable';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { OrderService } from 'services/orderServices';
import { getToken } from 'utils/getToken';

const OrderDetailPage = () => {
  const [loading, setLoading] = useState(1);
  const [total, setTotal] = useState(0);
  const [orderDetails, setOrderDetails] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    document.title = 'Order Details Manage';
    (async () => {
      try {
        setLoading(true);
        const token = getToken();
        const { total, orderDetails: data } = await OrderService.getListOrderDetail(id, token);
        setTotal(total);
        setOrderDetails(data);
      } catch (error) {
        setLoading(false);
        toast.error(error);
      }
    })();
    setLoading(false);
  }, [id]);

  return (
    <Layout>
      <div className="max-w-[1170px] mx-auto">
        <div>
          <h2 className="font-bold text-[30px] leading-normal mb-4 text-center">Chi tiết đơn hàng</h2>
          {loading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <OrderDetailTable list={orderDetails} total={total} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailPage;
