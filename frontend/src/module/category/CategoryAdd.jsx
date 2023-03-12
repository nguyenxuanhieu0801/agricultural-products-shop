import { Button } from 'components/button';
import { FormGroup } from 'components/form-group';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createCategory } from 'redux/features/categorySlice';
import slugify from 'slugify';
import { getToken } from 'utils/getToken';

const CategoryAddNew = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  useEffect(() => {
    document.title = 'Category Add';
  }, []);

  const dispatch = useDispatch();

  const handleAddNewCategory = async (values) => {
    if (!isValid) return;

    try {
      const newValues = { ...values, name: values.name.trim() };
      newValues.slug = slugify(newValues.name || newValues.slug, {
        trim: true,
        lower: true,
      });

      const token = getToken();

      dispatch(createCategory({ body: newValues, token })).unwrap();
      toast.success('Create new category successfully');
    } catch (error) {
      toast.error(error);
    } finally {
      reset({
        name: '',
        slug: '',
      });
    }
  };
  return (
    <div>
      <h1 className="dashboard-heading">Add new category</h1>
      <form onSubmit={handleSubmit(handleAddNewCategory)} autoComplete="off">
        <div className="form-layout">
          <FormGroup>
            <Label>Tên</Label>
            <Input control={control} name="name" placeholder="Enter your category name" required />
          </FormGroup>
          <FormGroup>
            <Label>Slug</Label>
            <Input control={control} name="slug" placeholder="Enter your category slug" />
          </FormGroup>
        </div>
        <Button type="submit" className="w-[300px] bg-primary">
          Add
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
