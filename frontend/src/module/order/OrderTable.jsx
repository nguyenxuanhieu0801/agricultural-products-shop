import { ActionEdit, ActionView } from 'components/actions';
import { Table } from 'components/table';

const OrderTable = ({ list, onEdit = () => {}, onView = () => {} }) => {
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
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>ShipName</th>
          <th>ShipAddress</th>
          <th>ShipPhone</th>
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
                  <ActionView onClick={() => onView(item.id)} />
                  <ActionEdit onClick={() => onEdit(item.id)} />
                </div>
              </th>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default OrderTable;
