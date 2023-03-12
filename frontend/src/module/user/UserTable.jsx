import { ActionDelete, ActionEdit } from 'components/actions';
import { Table } from 'components/table';
import { userRole } from 'utils/constants';

const UserTable = ({ list, onEdit = () => {}, onDelete = () => {} }) => {
  const renderRole = (roleId) => {
    switch (roleId) {
      case userRole.ADMIN:
        return 'ADMIN';
      case userRole.USER:
        return 'USER';
      default:
        break;
    }
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list.length > 0 &&
          list.map((item) => (
            <tr key={item.id}>
              <th>{item.id}</th>
              <th>{item.firstName}</th>
              <th>{item.lastName}</th>
              <th>{item.email}</th>
              <th>{renderRole(item.roleId)}</th>
              <th>
                <div className="flex items-center gap-x-3">
                  <ActionEdit onClick={() => onEdit(item.id)} />
                  {/* <ActionDelete onClick={() => onDelete(item.id)} /> */}
                </div>
              </th>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
