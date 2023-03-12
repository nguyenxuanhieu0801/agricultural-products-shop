import { Button } from 'components/button';
import { LoadingSpinner } from 'components/loading';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UnitService } from 'services/unitServices';
import Swal from 'sweetalert2';
import UnitTable from './UnitTable';

const limit = 10;

const UnitManage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1);
  const [units, setUnits] = useState([]);
  const [name, setName] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    document.title = 'Unit Manage';
    (async () => {
      try {
        setLoading(true);
        const data = await UnitService.getAll({
          name,
          limit,
          page,
        });
        if (data?.totalPages) {
          setUnits(data.data);
          setTotalPages(data.totalPages);
        } else {
          setUnits(data);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error);
      }
    })();
    setLoading(false);
  }, [page, name]);

  const handleCreate = () => {
    navigate('/manage/add-unit');
  };

  const handleEdit = (id) => {
    navigate(`/manage/update-unit/${id}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Thông báo',
      text: `Bạn muốn hủy xóa unit có id = ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = await UnitService.update(id, { isDelete: true });
          if (data) {
            Swal.fire('Thông báo', 'Xóa thành công', 'success');
            const data = await UnitService.getAll({
              name,
              limit,
              page,
            });
            if (data?.totalPages) {
              setUnits(data.data);
              setTotalPages(data.totalPages);
            } else {
              setUnits(data);
            }
          }
        } catch (error) {
          toast.error('Cập nhật thất bại');
        }
      }
    });
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleInputFilter = debounce((e) => {
    setName(e.target.value);
    setPage(1);
  }, 500);

  return (
    <div>
      <h1 className="dashboard-heading">Manage Units</h1>
      <div className="flex justify-end gap-3 mb-5">
        <input
          type="text"
          placeholder="Search unit..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
        <Button className="bg-primary" onClick={handleCreate}>
          Create Unit
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <UnitTable list={units} onDelete={handleDelete} onEdit={handleEdit} />
          <div className="flex items-center justify-center mt-4">
            <ReactPaginate
              className="pagination"
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
        </>
      )}
    </div>
  );
};

export default UnitManage;
