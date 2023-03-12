import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { IconCart, IconDashboard } from 'components/icons';
import { useSelector } from 'react-redux';
import { Button } from 'components/button';
import { userRole } from 'utils/constants';
import { useState } from 'react';
import { debounce } from 'lodash';
import { ProductService } from 'services/productServices';
import SearchItem from './SearchItem';

const menuLinks = [
  {
    url: '/profile',
    title: 'Profile',
  },
  {
    url: '/orders',
    title: 'Đơn hàng',
  },
  {
    url: '/sign-out',
    title: 'Đăng xuất',
  },
];

const Header2 = () => {
  const { data } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const navigate = useNavigate();

  const handleClickIconCart = () => {
    navigate('/cart');
  };
  const handleClickIconDashboard = () => {
    navigate('/manage/dashboard');
  };

  const handleInputFilter = debounce(async (e) => {
    if (e.target.value === '') {
      setSearchResult([]);
    } else {
      setName(e.target.value.trim());
      const data = await ProductService.getAll({ name: e.target.value.trim() });
      setSearchResult(data);
    }
  }, 500);

  const handleButtonClick = () => {
    navigate(`/product?search=${name}`);
  };

  return (
    <div className="px-10 py-4">
      <div className="max-w-[1170px] mx-auto">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-5">
            <Link to="/">
              <div className="text-xl font-medium text-[#1DC071]">EZ Store</div>
            </Link>

            <div className="">
              <Tippy
                interactive
                placement="bottom"
                visible={searchResult.length > 0}
                render={(attrs) => (
                  <div className="left-0 z-50 w-[400px] bg-white rounded-lg" tabIndex="-1" {...attrs}>
                    <div className="p-6 pb-1">
                      <div className="flex flex-col mb-6 gap-y-5">
                        {searchResult.length > 0 &&
                          searchResult.map((item, index) => <SearchItem key={item.id} item={item} />)}
                      </div>
                    </div>
                  </div>
                )}
              >
                <div className="relative bg-[rgba(22,_24,_35,_0.06)] rounded-full shadow-[10px_10px_20px_rgba(218,_213,_213,_0.15)] border-slate-200 p-2 w-[400px] flex items-center ">
                  <div className="flex-1 px-5">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full text-sm bg-transparent placeholder:text-text4 text-text1"
                      onChange={handleInputFilter}
                    />
                  </div>
                  <button
                    type="button"
                    className="w-[72px] rounded-full bg-primary text-white h-10 flex items-center justify-center flex-shrink-0"
                    onClick={handleButtonClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </Tippy>
            </div>
            <div className="">
              {user === null ? (
                <Button href="/sign-in" type="button" kind="primary">
                  Đăng nhập
                </Button>
              ) : (
                <div className="flex gap-3">
                  <div className="relative flex items-center" onClick={handleClickIconCart}>
                    <IconCart />
                    <span className="text-xs text-center rounded-full px-1.5 bg-orange-400 text-white absolute left-3 bottom-3">
                      {data.length || 0}
                    </span>
                  </div>
                  {user.roleId === userRole.ADMIN && (
                    <div className="flex items-center justify-center" onClick={handleClickIconDashboard}>
                      <IconDashboard />
                    </div>
                  )}
                  <Tippy
                    interactive
                    placement="bottom-end"
                    render={(attrs) => (
                      <div className={'menu-list'} tabIndex="10" {...attrs}>
                        {menuLinks.map((item, index) => (
                          <div key={index} className="menu-item" onClick={() => navigate(`${item.url}`)}>
                            {item.title}
                          </div>
                        ))}
                      </div>
                    )}
                  >
                    <div className="w-[52px] h-[52px]">
                      <img
                        src={
                          user.image ||
                          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                        }
                        alt=""
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>
                  </Tippy>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header2;
