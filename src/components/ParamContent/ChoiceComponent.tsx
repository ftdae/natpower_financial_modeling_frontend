import { FC, useMemo } from 'react';
import { CHOICE_DATA } from '../../utils/constant';
import { User } from '../../store/types/types';
import tokenService from '../../services/token.service';

interface ChoiceComponentProps {
  type: string;
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  item: any
}

const ChoiceComponent: FC<ChoiceComponentProps> = ({
  item,
  type,
  value,
  onChange,
  onFocus,
  onBlur
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  const choiceList = useMemo(() => {
    if (Object.keys(CHOICE_DATA).includes(type)) return CHOICE_DATA[type];
    return [];
  }, [type]);
  const user: User = tokenService.getUser();

  return (
    <div className="w-full">
      <select
        value={value}
        onChange={handleChange}
        className="border rounded px-2 py-1 w-full"
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={
          item?.editable == 'disabled' && user.is_admin == false || false
        }
      >
        <option
          key={0}
          value={""}
        >
        </option>
        {choiceList.map((option: any, index: number) => (
          <option
            key={index + 1}
            value={option.id}
            disabled={option?.disabled === true}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChoiceComponent;
