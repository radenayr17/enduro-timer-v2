import React from "react";
import { Button as MUIButton } from "@mui/material";

interface Props {
  children: React.ReactNode;
  variant?: "contained" | "text" | "outlined";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: "small" | "medium" | "large";
}

const Button = (props: Props) => {
  const {
    variant = "contained",
    children,
    onClick = () => {},
    type = "button",
    color = "primary",
    size = "medium",
    ...rest
  } = props;
  return (
    <MUIButton variant={variant} onClick={onClick} type={type} color={color} size={size} {...rest}>
      {children}
    </MUIButton>
  );
};

export default Button;
