import { LoadingSpinner } from 'components/loading';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { OrderService } from 'services/orderServices';
import { getToken } from 'utils/getToken';
import OrderDetailTable from './OrderDetailTable';

const OrderDetailManage = () => {
  const [loading, setLoading] = useState(1);
  const [orderDetails, setOrderDetails] = useState([]);
  const [total, setTotal] = useState(0);

  let { id } = useParams();

  useEffect(() => {
    document.title = 'Order Details Manage';
    (async () => {
      try {
        setLoading(true);
        const token = getToken();
        const { total, orderDetails: data } = await OrderService.getListOrderDetail(id, token);
        console.log(data);
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
    <div>
      <h1 className="dashboard-heading">Manage orderDetails</h1>
      {loading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <OrderDetailTable list={orderDetails} total={total} />
      )}
    </div>
  );
};

export default OrderDetailManage;
