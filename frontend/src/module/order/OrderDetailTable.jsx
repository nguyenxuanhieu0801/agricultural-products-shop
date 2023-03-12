import { Button } from 'components/button';
import { Table } from 'components/table';
import * as XLSX from 'xlsx';

const OrderDetailTable = ({ list, total }) => {
  const exportCSV = () => {
    let newList = list.map((item) => {
      return {
        Id: item.id,
        Name: item.name,
        Price: item.price,
        Quantity: item.quantity,
        Total: item.price * item.quantity,
      };
    });
    var todayDate = new Date().toISOString().slice(0, 10);
    const ws = XLSX.utils.json_to_sheet(newList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Thong Ke');
    XLSX.writeFile(wb, `${todayDate}.xlsx`);
  };

  return (
    <div className="">
      <div className="flex justify-end gap-3 mb-10">
        <Button className="bg-primary" onClick={exportCSV}>
          Export excel
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 &&
            list.map((item) => (
              <tr key={item.id}>
                <th>{item.id}</th>
                <th>
                  {' '}
                  <div className="flex items-center gap-x-3">
                    <img
                      src={item?.image || 'https://placehold.jp/100x78.png'}
                      alt=""
                      className="w-[100px] h-[78px] rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                    </div>
                  </div>
                </th>
                <th>{item.price}đ</th>
                <th>{item.quantity}</th>
                <th>{item.price * item.quantity}đ</th>
              </tr>
            ))}
          <tr>
            <th>Total</th>
            <th></th>
            <th></th>
            <th></th>
            <th>{total}đ</th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default OrderDetailTable;
