import { Button } from "primereact/button";

const index = ({ title, iconUrl, imgUrl, btnlabel, noPortMsg, url }: any) => {
  const handleButtonClick = () => {
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div className="h-full">
      <div className="card flex flex-col h-full">
        <div className="flex ml-3 py-3 items-center">
          <img alt="Card" className="h-5 px-2" src={iconUrl} />
          <p className="font-bold">{title}</p>
        </div>

        <div className="px-4 pb-4 flex-grow flex flex-col">
          <div
            className="flex items-center justify-center h-60 rounded bg-gray-200 bg-cover bg-center"
            style={{ backgroundImage: `url(${imgUrl})` }}
          ></div>

          <div className="flex-grow">
            <span className="text-xs text-center text-gray-400 flex justify-center py-4">
              {noPortMsg}
            </span>
          </div>

          <div className="mt-auto text-sm">
            <Button
              label={btnlabel}
              icon="pi pi-check"
              link
              onClick={handleButtonClick}
              className="w-full bg-slate-main text-white hover:bg-slate-main/80 no-underline-on-hover p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
