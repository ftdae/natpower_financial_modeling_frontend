import ModelInputSetting from "./ModelInputSetting";

const xindex = () => {
  // const [isModelInputsOpen, setIsModelInputsOpen] = useState(false);
  // const [activeComponent, setActiveComponent] = useState("Dashboard");

  // const toggleModelInputs = () => {
  //   setIsModelInputsOpen(!isModelInputsOpen);
  // };

  // const handleComponentChange = (component: any) => {
  //   setActiveComponent(component);
  // };
  // const { currentParameterId } = useAppSelector(selectParam);

  // useParameter();
  // const dispatch = useAppDispatch();

  // React.useEffect(() => {
  //   dispatch(paramGetAsync());
  //   console.log('loading sidebarlayout');
  // }, []);
  // React.useEffect(() => {
  //   if (currentParameterId)
  //     dispatch(allInputsGetAsync(currentParameterId as number));
  // }, [currentParameterId]);

  return (
    <>
      <div className="w-full h-full">
        <ModelInputSetting></ModelInputSetting>
        {/* {activeComponent === "Dashboard" && <Dashboard />}
          {activeComponent === "ModelInputSetting" && <ModelInputSetting />}
          {activeComponent === "Basic Project Inputs" && <BasicProjectInput />}
          {activeComponent === "Battery Assumption" && <BatteryAssumption />} */}
      </div>
    </>
  );
};

export default xindex;
