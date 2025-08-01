import type React from "react";
import clsx from "clsx";

import styles from "./QuestionOption.module.css";

type Props = React.ComponentProps<"button"> & {
  children?: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

function QuestionOption({
  children,
  className,
  checked = false,
  onCheckedChange,
  onClick,
  ...props
}: Props) {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) {
      onClick(event);
    }

    if (onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <button
      {...props}
      className={clsx(styles.target, checked && styles.checked, className)}
      role="checkbox"
      aria-checked={checked}
      onClick={handleClick}
    >
      <div>{children}</div>
    </button>
  );
}

export default QuestionOption;
