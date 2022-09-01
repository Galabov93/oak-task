import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

// this can be moved to a components folder/library as it is a common component
function Checkbox({ label, checked, onToggle }: CheckboxProps): React.ReactElement {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          style={{ cursor: 'pointer' }}
        />
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
