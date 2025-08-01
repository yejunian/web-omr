import type React from "react";
import clsx from "clsx";

import styles from "./QuestionOption.module.css";

type Props = React.ComponentProps<"button"> & {
  children?: React.ReactNode;
  checked?: boolean;
};

function QuestionOption({
  children,
  className,
  checked = false,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(styles.target, checked && styles.checked, className)}
      role="checkbox"
      aria-checked={checked}
    >
      <div>{children}</div>
    </button>
  );
}

export default QuestionOption;
