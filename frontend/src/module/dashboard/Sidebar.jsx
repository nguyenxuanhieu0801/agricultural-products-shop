import { IconChart, IconDashboard, IconOrder } from 'components/icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarStyles = styled.div`
  width: 300px;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  border-radius: 12px;
  .menu-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 14px 20px;
    font-weight: 500;
    color: ${(props) => props.theme.gray80};
    margin-bottom: 12px;
    cursor: pointer;
    &.active,
    &:hover {
      background: #f1fbf7;
      color: ${(props) => props.theme.primary};
    }
  }
  @media screen and (max-width: 1023.98px) {
    display: none;
  }
`;

const sidebarLinks = [
  {
    title: 'Dashboard',
    url: '/manage/dashboard',
    icon: <IconDashboard />,
  },
  {
    title: 'Chart',
    url: '/manage/chart',
    icon: <IconChart />,
  },
  {
    title: 'Category',
    url: '/manage/category',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    title: 'Product',
    url: '/manage/product',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
        />
      </svg>
    ),
  },
  {
    title: 'Unit',
    url: '/manage/unit',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: 'Delivery',
    url: '/manage/delivery',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
        />
      </svg>
    ),
  },
  {
    title: 'Order',
    url: '/manage/order',
    icon: <IconOrder />,
  },
  {
    title: 'User',
    url: '/manage/user',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
];

const Sidebar = () => {
  return (
    <SidebarStyles className="sidebar">
      {sidebarLinks.map((link) => {
        if (link.onClick)
          return (
            <div className="menu-item" onClick={link.onClick} key={link.title}>
              <span className="menu-icon">{link.icon}</span>
              <span className="menu-text">{link.title}</span>
            </div>
          );
        return (
          <NavLink to={link.url} className="menu-item" key={link.title}>
            <span className="menu-icon">{link.icon}</span>
            <span className="menu-text">{link.title}</span>
          </NavLink>
        );
      })}
    </SidebarStyles>
  );
};

export default Sidebar;
