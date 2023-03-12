import { ActionDelete, ActionEdit } from 'components/actions';
import { Table } from 'components/table';

const ProductTable = ({ list, onEdit = () => {}, onDelete = () => {} }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Tên</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Xuất xứ</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list.length > 0 &&
          list.map((item) => (
            <tr key={item.id}>
              <th>{item.id}</th>
              <th>{item.name}</th>
              <th>{item.price}</th>
              <th>{item.quantity}</th>
              <th>{item.origin}</th>
              <th>
                <div className="flex items-center gap-x-3">
                  <ActionEdit onClick={() => onEdit(item.id)} />
                  <ActionDelete onClick={() => onDelete(item.id)} />
                </div>
              </th>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;
