import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import FormRow from 'components/common/FormRow';
import { Dropdown } from 'components/dropdown';
import { FormGroup } from 'components/form-group';
import { Input } from 'components/input';
import { Label } from 'components/label';
import ImageUpload from 'pages/ImageUpload';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateProduct } from 'redux/features/productSlice';
import { CategoryService } from 'services/categoryServices';
import { ProductService } from 'services/productServices';
import { UnitService } from 'services/unitServices';
import { UploadService } from 'services/uploadService';
import { MAX_LENGTH, MIN_NUMBER } from 'utils/constants';
import { getToken } from 'utils/getToken';
import * as yup from 'yup';

const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên sản phẩm').min(2, 'Tên sản phẩm tối thiểu 2 ký tự'),
    price: yup.number().integer().required('Vui lòng nhập giá').min(1000, 'Giá tối thiểu là 1000đ'),
    quantity: yup.number().integer().required('Vui lòng nhập số lượng').min(0),
    origin: yup.string().required('Vui lòng nhập xuất xứ').min(2, 'Xuất xứ tối thiểu 2 ký tự'),
    mass: yup.number().required('Vui lòng nhập khối lượng'),
    categoryId: yup.number().integer().required('Vui lòng chọn danh mục'),
    unitId: yup.number().integer().required('Vui lòng chọn đơn vị'),
  })
  .required();

const ProductUpdate = () => {
  let { id } = useParams();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      price: 0,
      quantity: 0,
      origin: '',
      mass: 0,
      categoryId: null,
      unitId: null,
    },
  });

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ],
  };

  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectCategory, setSelectCategory] = useState(1);
  const [selectUnit, setSelectUnit] = useState(1);
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    document.title = 'Product Update';
    (async () => {
      const listCategory = await CategoryService.getAll();
      setCategories(listCategory);
      const { product } = await ProductService.findById(id);
      reset({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        origin: product.origin,
        mass: product.mass,
        categoryId: product.categoryId,
        unitId: product.unitId,
      });
      const category = await CategoryService.findById(product.categoryId);
      const unit = await UnitService.findById(product.unitId);
      setSelectCategory(category);
      setSelectUnit(unit);
      setImage(product.image);
      setContent(product.description);
    })();
  }, [id, reset]);

  useEffect(() => {
    document.title = 'Product Add';
    (async () => {
      const category = await CategoryService.getAll();
      setCategories(category);
      const unit = await UnitService.getAll();
      setUnits(unit);
    })();
  }, []);

  const handleAddNewProduct = async (values) => {
    if (!isValid) return;

    try {
      let body = { ...values, image, description: content };
      body.price = parseFloat(body.price);
      body.quantity = Number(body.quantity);
      body.mass = Number(body.mass);

      const token = getToken();
      const resultAction = await dispatch(updateProduct({ id, body, token })).unwrap();
      if (resultAction) {
        toast.success('Cập nhật thành công');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleUploadImage = async (file) => {
    let formData = new FormData();
    formData.append('file', file);
    const response = await UploadService.create(formData);
    console.log(response[0]?.url);
    if (response[0]?.url) {
      setImage(response[0]?.url);
    } else {
      setImage('');
    }
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleUploadImage(file);
  };

  const handleClickCategory = async (item) => {
    setValue('categoryId', item.id);
    setSelectCategory(item);
  };

  const handleClickUnit = async (item) => {
    setValue('unitId', item.id);
    setSelectUnit(item);
  };
  return (
    <div>
      <h1 className="dashboard-heading">Update product</h1>
      <form onSubmit={handleSubmit(handleAddNewProduct)} autoComplete="off">
        <div className="form-layout2">
          <FormGroup>
            <Label>Tên sản phẩm</Label>
            <Input control={control} name="name" placeholder="Nhập tên sản phẩm" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </FormGroup>
          <FormGroup>
            <Label>Giá</Label>
            <Input
              control={control}
              type="number"
              name="price"
              min={MIN_NUMBER}
              step="100"
              maxLength={MAX_LENGTH}
              placeholder="Nhập giá"
              required
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
          </FormGroup>
          <FormGroup>
            <Label>Số lượng</Label>
            <Input
              control={control}
              type="number"
              name="quantity"
              min={MIN_NUMBER}
              maxLength={MAX_LENGTH}
              placeholder="Nhập số lượng"
              required
            />
          </FormGroup>
        </div>
        <div className="form-layout2">
          <FormGroup>
            <Label>Image</Label>
            <ImageUpload className="!w-full h-[200px] min-h-0" onChange={handleSelectImage} image={image} />
          </FormGroup>
          <FormGroup>
            <Label>Đơn vị</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Chọn đơn vị"></Dropdown.Select>
              <Dropdown.List>
                {units.length > 0 &&
                  units.map((item) => (
                    <Dropdown.Option key={item.id} onClick={() => handleClickUnit(item)}>
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectUnit?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectUnit?.name}
              </span>
            )}
            {errors.unitId && <p className="text-sm text-red-500">{errors.unitId.message}</p>}
          </FormGroup>
          <FormGroup>
            <Label>Danh mục</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Chọn danh mục"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option key={item.id} onClick={() => handleClickCategory(item)}>
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectCategory?.name}
              </span>
            )}

            {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId.message}</p>}
          </FormGroup>
        </div>
        <FormRow>
          <FormGroup>
            <Label>Xuất xứ</Label>
            <Input control={control} name="origin" placeholder="Nhập xuất xứ" />
            {errors.origin && <p className="text-sm text-red-500">{errors.origin.message}</p>}
          </FormGroup>
          <FormGroup>
            <Label>Khối lượng</Label>
            <Input control={control} type="number" name="mass" min={MIN_NUMBER} placeholder="Nhập khối lượng" />
            {errors.mass && <p className="text-sm text-red-500">{errors.mass.message}</p>}
          </FormGroup>
        </FormRow>
        <div className="mb-10">
          <FormGroup>
            <Label>Description</Label>
            <div className="w-full entry-content">
              <ReactQuill theme="snow" modules={modules} value={content} onChange={setContent} />
            </div>
          </FormGroup>
        </div>
        <Button type="submit" className="w-[300px] bg-primary">
          Update
        </Button>
      </form>
    </div>
  );
};

export default ProductUpdate;
