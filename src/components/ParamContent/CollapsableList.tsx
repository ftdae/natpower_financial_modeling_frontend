import React, { useMemo, useState } from 'react';
// Custom SVG Icons
const ExpandLessIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M12 8l-6 6h12l-6-6z" fill="currentColor" />
  </svg>
);

const ExpandMoreIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M12 16l6-6H6l6 6z" fill="currentColor" />
  </svg>
);

const DesignServicesIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.4202 10.8427C17.4608 10.5267 17.4913 10.2108 17.4913 9.875C17.4913 9.53925 17.4608 9.22325 17.4202 8.90725L19.5623 7.27787C19.7552 7.12975 19.8059 6.86312 19.6841 6.64587L17.6537 3.22913C17.5623 3.07113 17.3897 2.98225 17.207 2.98225C17.1461 2.98225 17.0852 2.99213 17.0344 3.01188L14.5066 3.99938C13.9787 3.60438 13.4101 3.2785 12.7909 3.03163L12.4051 0.41475C12.3746 0.17775 12.1614 0 11.9076 0H7.84684C7.59304 0 7.37984 0.17775 7.34939 0.41475L6.96361 3.03163C6.34434 3.2785 5.77582 3.61425 5.24792 3.99938L2.72006 3.01188C2.65915 2.99213 2.59824 2.98225 2.53733 2.98225C2.36474 2.98225 2.19216 3.07113 2.10079 3.22913L0.0703856 6.64587C-0.0615907 6.86312 -0.000678462 7.12975 0.19221 7.27787L2.33429 8.90725C2.29368 9.22325 2.26322 9.54912 2.26322 9.875C2.26322 10.2009 2.29368 10.5267 2.33429 10.8427L0.19221 12.4721C-0.000678462 12.6203 -0.0514387 12.8869 0.0703856 13.1041L2.10079 16.5209C2.19216 16.6789 2.36474 16.7677 2.54748 16.7677C2.60839 16.7677 2.6693 16.7579 2.72006 16.7381L5.24792 15.7506C5.77582 16.1456 6.34434 16.4715 6.96361 16.7184L7.34939 19.3353C7.37984 19.5723 7.59304 19.75 7.84684 19.75H11.9076C12.1614 19.75 12.3746 19.5723 12.4051 19.3353L12.7909 16.7184C13.4101 16.4715 13.9787 16.1358 14.5066 15.7506L17.0344 16.7381C17.0953 16.7579 17.1562 16.7677 17.2172 16.7677C17.3897 16.7677 17.5623 16.6789 17.6537 16.5209L19.6841 13.1041C19.8059 12.8869 19.7552 12.6203 19.5623 12.4721L17.4202 10.8427ZM15.4101 9.15413C15.4507 9.46025 15.4609 9.66763 15.4609 9.875C15.4609 10.0824 15.4406 10.2996 15.4101 10.5959L15.268 11.7118L16.1715 12.403L17.2679 13.2325L16.5573 14.4274L15.268 13.9238L14.2122 13.509L13.2985 14.1805C12.8619 14.4965 12.4457 14.7335 12.0295 14.9014L10.9534 15.326L10.7909 16.4419L10.5879 17.775H9.1666L8.97371 16.4419L8.81128 15.326L7.73517 14.9014C7.29863 14.7236 6.89255 14.4965 6.48647 14.2002L5.56263 13.509L4.48652 13.9336L3.19721 14.4373L2.48657 13.2424L3.58299 12.4129L4.48652 11.7216L4.34439 10.6058C4.31393 10.2996 4.29363 10.0725 4.29363 9.875C4.29363 9.6775 4.31393 9.45038 4.34439 9.15413L4.48652 8.03825L3.58299 7.347L2.48657 6.5175L3.19721 5.32263L4.48652 5.82625L5.54233 6.241L6.45601 5.5695C6.89255 5.2535 7.30878 5.0165 7.72501 4.84862L8.80113 4.424L8.96356 3.30813L9.1666 1.975H10.5777L10.7706 3.30813L10.9331 4.424L12.0092 4.84862C12.4457 5.02637 12.8518 5.2535 13.2579 5.54975L14.1817 6.241L15.2578 5.81637L16.5471 5.31275L17.2578 6.50763L16.1715 7.347L15.268 8.03825L15.4101 9.15413ZM9.87724 5.925C7.63364 5.925 5.81643 7.69263 5.81643 9.875C5.81643 12.0574 7.63364 13.825 9.87724 13.825C12.1208 13.825 13.9381 12.0574 13.9381 9.875C13.9381 7.69263 12.1208 5.925 9.87724 5.925ZM9.87724 11.85C8.76052 11.85 7.84684 10.9613 7.84684 9.875C7.84684 8.78875 8.76052 7.9 9.87724 7.9C10.994 7.9 11.9076 8.78875 11.9076 9.875C11.9076 10.9613 10.994 11.85 9.87724 11.85Z" fill="#6C737F" />
  </svg>

);

// Define types for MenuItem props
interface MenuItemProps {
  id?: string;
  current?: string;
  to?: string;
  title: string;
  handleClick: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  selected?: boolean;
  depth?: number;
}

// MenuItem component
const MenuItem: React.FC<MenuItemProps> = ({
  id,
  current,
  title,
  handleClick,
  startIcon,
  endIcon,
  // selected = false,
  depth = 0
}) => {

  return (
    <div className={`flex gap-3 ml-${depth * 2} mt-2`}>
      {startIcon}
      <button

        className={`font-semibold text-[#6C737F] 
          ${id === current ? 'text-gray-800' : ''}`
        }
        style={{ textAlign: "start", width: "-webkit-fill-available" }}
        onClick={handleClick}
      >
        {title}
      </button>
      {endIcon}
    </div>
  );
};

// Define types for ParamCollapsableList props
interface MenuList {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children?: MenuList[];
  parentId?: string | null;
}

interface ParamCollapsableListProps {
  menuList: MenuList;
  parent?: string | null;
  onClick?: any;
  selected?: MenuList | null;
  current?: string;
  depth?: number;
}

// ParamCollapsableList component
const ParamCollapsableList: React.FC<ParamCollapsableListProps> = ({
  menuList,
  parent = null,
  onClick,
  selected = null,
  current,
  depth = 0
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (typeof onClick === 'function') onClick(menuList, parent);
    setOpen(!open);
  };

  const isEmptyChildren = useMemo(() => {
    if (!Array.isArray(menuList.children)) return true;
    return menuList.children.length === 0;
  }, [menuList]);

  return (
    <>
      <MenuItem
        depth={depth}
        id={menuList.id}
        current={current}
        selected={selected?.id == menuList.id && selected?.parentId == menuList.parentId}
        handleClick={handleClick}
        title={menuList.title}
        startIcon={menuList.icon || <DesignServicesIcon />}
        endIcon={
          isEmptyChildren ? null : open ? (
            <ExpandLessIcon style={{ marginLeft: '8px' }} />
          ) : (
            <ExpandMoreIcon style={{ marginLeft: '8px' }} />
          )
        }
      />
      {!isEmptyChildren && open && (
        <div style={{ paddingLeft: '5px' }}>
          {menuList.children?.map((child, index) => (
            <ParamCollapsableList
              current={current}
              key={index}
              menuList={child}
              selected={selected}
              onClick={onClick}
              depth={depth + 1}
              parent={parent ? `${parent}@${menuList.id}` : `${menuList.id}`}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ParamCollapsableList;
