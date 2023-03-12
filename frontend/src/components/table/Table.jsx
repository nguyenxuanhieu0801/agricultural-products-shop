import styled from 'styled-components';
import PropTypes from 'prop-types';

const TableStyles = styled.div`
  box-shadow: -4px 4px 8px rgba(226, 226, 226, 0.2), 4px 4px 8px rgba(226, 226, 226, 0.2);
  overflow-x: auto;
  background-color: white;
  border-radius: 10px;
  table {
    width: 100%;
  }
  thead {
    background-color: #f7f7f8;
  }
  th,
  td {
    vertical-align: middle;
  }
  th {
    padding: 20px 30px;
    font-weight: 600;
    text-align: left;
  }
  td {
    padding: 15px 30px;
  }
  tbody {
  }
`;
const Table = ({ children }) => {
  return (
    <TableStyles>
      <table>{children}</table>
    </TableStyles>
  );
};

Table.propTypes = {
  children: PropTypes.node,
};

export default Table;
