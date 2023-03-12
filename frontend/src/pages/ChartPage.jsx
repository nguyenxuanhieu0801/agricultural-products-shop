import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import { OrderService } from 'services/orderServices';
import { getToken } from 'utils/getToken';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Button } from 'components/button';
import { FormGroup, FormRow } from 'components/common';
import moment from 'moment';
import DatePicker from 'react-date-picker';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [list, setList] = useState([]);
  useEffect(() => {}, []);

  const handleClick = async () => {
    try {
      const formatStartDate = moment(new Date(startDate)).format('YYYY-MM-DD');
      const formatEndDate = moment(new Date(endDate).setDate(new Date(endDate).getDate() + 1)).format('YYYY-MM-DD');
      const token = getToken();
      console.log(formatEndDate);
      console.log(formatStartDate);
      const data = await OrderService.report(token, formatStartDate, formatEndDate);
      setList(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const data = {
    labels: list.map((item) => item.date),
    datasets: [
      {
        label: 'Thống kê doanh thu',
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
      <FormRow>
        <FormGroup>
          <DatePicker value={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" />
        </FormGroup>
        <FormGroup>
          <DatePicker value={endDate} onChange={(date) => setEndDate(date)} dateFormat="dd/MM/yyyy" />
        </FormGroup>
      </FormRow>
      <Button className="bg-primary" onClick={handleClick}>
        Submit
      </Button>
      {list.length > 0 && (
        <div className="">
          <Bar data={data} height={400} options={options} />
        </div>
      )}
    </div>
  );
};

export default ChartPage;
