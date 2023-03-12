import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CategoryService } from 'services/categoryServices';
import { useForm } from 'react-hook-form';
import { Button } from 'components/button';
import { FormGroup } from 'components/form-group';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { updateCategory } from 'redux/features/categorySlice';
import { toast } from 'react-toastify';
import { getToken } from 'utils/getToken';

const CategoryUpdate = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const categoryId = params.get('id');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Category Update';

    (async () => {
      const data = await CategoryService.findById(categoryId);
      reset({
        name: data.name,
        slug: data.slug,
      });
    })();
  }, [categoryId, reset]);

  const handleUpdate = async (values) => {
    if (!isValid) return;
    try {
      const token = getToken();
      dispatch(updateCategory({ id: categoryId, body: values, token })).unwrap();
      toast.success('Update category successfully');
      navigate('/manage/category');
    } catch (error) {
      toast.error(error);
    }
  };

  if (!categoryId) return null;

  return (
    <div>
      <h1 className="dashboard-heading">Update category</h1>
      <form onSubmit={handleSubmit(handleUpdate)} autoComplete="off">
        <div className="form-layout">
          <FormGroup>
            <Label>Name</Label>
            <Input control={control} name="name" placeholder="Enter your category name" required />
          </FormGroup>
          <FormGroup>
            <Label>Slug</Label>
            <Input control={control} name="slug" placeholder="Enter your category slug" />
          </FormGroup>
        </div>
        <Button type="submit" className="w-[300px] bg-primary">
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
