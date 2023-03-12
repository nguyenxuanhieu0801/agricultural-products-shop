import { CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { IconOrder, IconUser } from 'components/icons';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import { OrderService } from 'services/orderServices';
import userService from 'services/userServices';
import { getToken } from 'utils/getToken';
import { BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardPage = () => {
  const [quantityOrder, setQuantityOrder] = useState(0);
  const [quantityUser, setQuantityUser] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        document.title = 'Dashboard Page';

        const token = getToken();

        const formatEndDate = moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD');
        const formatStartDate = moment(new Date().setDate(new Date(formatEndDate).getDate() - 7)).format('YYYY-MM-DD');

        const data = await OrderService.report(token, formatStartDate, formatEndDate);
        setList(data);
        console.log(data);
        const orders = await OrderService.getAllOrdersToday(token);
        if (orders.length > 0) {
          setQuantityOrder(orders.length);
        }
        const users = await userService.getAll({
          roleId: 2,
        });
        setQuantityUser(users.length);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  const data = {
    labels: list.map((item) => item.date),
    datasets: [
      {
        label: 'Thống kê doanh thu 7 ngày gần nhất',
        data: list.map((item) => item.total),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div className="">
      <div className="grid grid-cols-3 mb-10 gap-x-5">
        <div className="w-[350px] h-[125px] shadow-1 flex gap-x-3 rounded-lg">
          <div className="flex-1 px-3 py-5">
            <h2 className="mb-4 text-lg font-semibold text-text2">Đơn hàng hôm nay</h2>
            <div className="mt-6 text-3xl font-medium leading-8">{quantityOrder}</div>
          </div>
          <div className="flex items-center">
            <IconOrder className="w-20 h-20" strokeWidth="1" />
          </div>
        </div>
        {/* <div className="w-[350px] h-[125px] shadow-1 flex gap-x-3 rounded-lg">
          <div className="flex-1 px-3 py-5">
            <h2 className="mb-4 text-lg font-semibold text-text2">Tổng giá trị hôm nay</h2>
            <div className="mt-6 text-3xl font-medium leading-8">{amountOrder}</div>
          </div>
          <div className="flex items-center">
            <IconOrder className="w-20 h-20" strokeWidth="1" />
          </div>
        </div> */}
        <div className="w-[350px] h-[125px] shadow-1 flex gap-x-3 rounded-lg">
          <div className="flex-1 px-3 py-5">
            <h2 className="mb-4 text-lg font-semibold text-text2">Tổng số người dùng</h2>
            <div className="mt-6 text-3xl font-medium leading-8">{quantityUser}</div>
          </div>
          <div className="flex items-center">
            <IconUser className="w-20 h-20" strokeWidth="1" />
          </div>
        </div>
      </div>
      <div className="">
        <Bar data={data} height={400} options={options} />
      </div>
    </div>
  );
};

export default DashboardPage;
