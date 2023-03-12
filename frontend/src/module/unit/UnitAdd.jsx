import { Button } from 'components/button';
import { FormGroup } from 'components/form-group';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UnitService } from 'services/unitServices';

const UnitAddNew = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    document.title = 'Unit Add';
  }, []);

  const handleAddNewUnit = async (values) => {
    if (!isValid) return;

    try {
      const data = await UnitService.create(values);
      if (data) {
        toast.success('Create new unit successfully');
      }
    } catch (error) {
      toast.error(error);
    } finally {
      reset({
        name: '',
      });
    }
  };
  return (
    <div>
      <h1 className="dashboard-heading">Add new unit</h1>
      <form onSubmit={handleSubmit(handleAddNewUnit)} autoComplete="off">
        <div className="form-layout">
          <FormGroup>
            <Label>Name</Label>
            <Input control={control} name="name" placeholder="Nhập tên đơn vị" required />
          </FormGroup>
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <Button type="submit" className="w-[300px] bg-primary">
          Add
        </Button>
      </form>
    </div>
  );
};

export default UnitAddNew;
