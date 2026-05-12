"use client";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

export function Switch({ checked, onChange, label }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      data-state={checked ? "on" : "off"}
      onClick={() => onChange(!checked)}
      className="switch-track"
    >
      <span className="switch-thumb" />
    </button>
  );
}
