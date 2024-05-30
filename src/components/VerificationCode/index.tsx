import React, { useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface VerificationCodeProps {
  id?: string;
  height?: number;
  width?: number;
  value?: string;
  onChange?: (value: string) => void;
}

const srcPrefix =
  import.meta.env.VITE_API_HOST + '/uavShareManage/verifyCode/generateVerifyCode?uuid=';

const VerificationCode: React.FC<VerificationCodeProps> = (props) => {
  const defaultValue = uuidv4().replace(/-/g, '');
  const { id, width = 120, height = 48, value = defaultValue, onChange = () => ({}) } = props;

  useEffect(() => {
    onChange(defaultValue);
  }, []);

  const src = useMemo(() => srcPrefix + value, [value]);

  return (
    <img
      id={id}
      height={height}
      width={width}
      src={src}
      className="cursor-pointer"
      onClick={() => onChange(uuidv4().replace(/-/g, ''))}
      alt=""
    />
  );
};

export default VerificationCode;
