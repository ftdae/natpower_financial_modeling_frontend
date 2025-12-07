import { useMemo, useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import {
  localeStringToNumber,
  sumArray,
} from "../../calculation/calculates/utils";

export const TableItem = ({ item, boldRows }: any) => {
  return (
    <div className="flex">
      {item?.data?.map((c: any, index: number) => (
        <div
          key={index}
          className="border-b border-[#F2F4F7] text-center bg-white px-2"
          style={{
            minWidth: "100px",
            minHeight: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div
            className={`cursor-pointer font-inter text-[13px]  ${
              boldRows.includes(item.title)
                ? "font-bold text-bold"
                : "text-[#111927] font-normal"
            }`}
          >
            {localeStringToNumber(c)}
          </div>
        </div>
      ))}
    </div>
  );
};

const ParamCollapsableTable = ({
  itemList = {},
  headers = [],
  onClick,
  selected = null,
  depth = 0,
  hasTotal,
  boldRows,
  size,
}: any) => {
  const [open, setOpen] = useState(depth < 1);
  const handleClick = () => {
    if (typeof onClick === "function") onClick(itemList);
    setOpen(!open);
  };

  const isEmptyChildren = useMemo(() => {
    return !Array.isArray(itemList.children) || itemList.children.length === 0;
  }, [itemList]);

  const hasChildren =
    Array.isArray(itemList?.children) && itemList.children.length > 0;

  return (
    <div className="">
      <div className="flex text-[#2F3746] sticky top-0 z-20 w-max">
        {headers.map((headerRow: any, rowIndex: number) => {
          const classNames = `flex flex-col px-2 items-start justify-center text-center font-inter font-semibold text-[12px] leading-[24px] bg-[#F8F9FA] h-[90px]
    ${
      rowIndex === 0
        ? "min-w-[200px] sticky top-0 left-0 z-20 pl-[15px]"
        : rowIndex === 1 && hasTotal === "true"
        ? size === "sm"
          ? "min-w-[150px] sticky top-0 left-[200px] z-20"
          : "min-w-[200px] sticky top-0 left-[200px] z-20"
        : "min-w-[100px] w-[100px] z-10"
    }`;

          return (
            <div key={rowIndex} className={classNames}>
              {headerRow.map((header: any, index: number) => (
                <div key={index}>{String(header).toUpperCase()}</div>
              ))}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col">
        {depth > 0 && (
          <div className="flex">
            <div
              className={`sticky left-0 top-0 border-b border-[#F2F4F7] text-center bg-white z-10 min-w-[200px] cursor-pointer font-inter ${
                depth === 1
                  ? "text-[14px] text-[#111927] "
                  : "text-[14px] text-[#111927] "
              } ${
                boldRows.includes(itemList?.title) ? "font-bold" : "font-normal"
              }`}
              style={{
                width: "200px",
                minHeight: "60px",
                paddingLeft: `${depth * 14}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                textAlign: "start",
              }}
              onClick={hasChildren ? handleClick : undefined} // Only allow click if there are children
            >
              <div className={`${!hasChildren ? "pl-[15px]" : ""}`}>
                {hasChildren &&
                  (open ? (
                    <IoIosArrowDown size={15} />
                  ) : (
                    <IoIosArrowForward size={15} />
                  ))}
              </div>
              {itemList?.title}
            </div>

            {hasTotal == "true" ? (
              <div
                className={`sticky top-0 left-[200px] border-b border-[#F2F4F7] bg-white z-10  ${
                  size === "sm" ? "min-w-[150px]" : "min-w-[200px]"
                }  text-center`}
              >
                <div
                  key={0}
                  className="border-b border-[#F2F4F7] text-center bg-white px-2"
                  style={{
                    minWidth: "100px",
                    minHeight: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    className={`cursor-pointer font-inter text-[13px] text-[#111927] ${
                      boldRows.includes(itemList.title)
                        ? "font-bold"
                        : "font-normal"
                    }`}
                  >
                    {localeStringToNumber(sumArray(itemList?.data))}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            <TableItem
              item={itemList}
              handleClick={handleClick}
              isOpen={open}
              depth={depth}
              hasTotal={hasTotal}
              boldRows={boldRows}
            />
          </div>
        )}

        {!isEmptyChildren && open && (
          <div style={{ width: "max-content" }}>
            {itemList.children.map((menu: any, index: number) => (
              <ParamCollapsableTable
                key={index}
                onClick={onClick}
                selected={selected}
                depth={depth + 1}
                itemList={menu}
                hasTotal={hasTotal}
                boldRows={boldRows}
                size={size}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParamCollapsableTable;
