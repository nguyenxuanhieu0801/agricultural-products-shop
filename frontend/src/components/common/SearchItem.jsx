import { Link, NavLink } from 'react-router-dom';

const SearchItem = ({ item }) => {
  return (
    <Link to={`/product/${item.id}`} className="flex items-center gap-x-5">
      <img
        src={item.image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
        className="w-[50px] h-[50px] rounded-lg object-cover"
        alt=""
      />
      <div className="flex-1 text-sm">
        <h3 className="mb-1">{item.name}</h3>
        <p className="text-text3">By Durgham Family</p>
      </div>
    </Link>
  );
};

export default SearchItem;
