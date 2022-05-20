import "./style.css";

import React, { useEffect, useRef } from "react";

interface Props {
  label: string;
  checked: boolean | "indeterminate";
  onChange: () => void;
}
const Checkbox: React.FC<Props> = ({ label, checked, onChange }) => {
  const checkRef = useRef<any>();

  useEffect(() => {
    checkRef.current.checked = checked === true;
    checkRef.current.indeterminate = checked === "indeterminate";
  }, [checked]);

  return (
    <div className="container">
      <label className="textLabel">
        <input
          type="checkbox"
          checked={!!checked}
          ref={checkRef}
          onChange={onChange}
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
