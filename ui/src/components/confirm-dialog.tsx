import { Box, Dialog, DialogContent, DialogTitle, Stack, DialogActions } from "@mui/material";

import Button from "@/components/button";
import useToggle from "@/hooks/use-toggle";

interface Props {
  title: string;
  text: string;
  btnText: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
}

const ConfirmDialog = ({
  title,
  text,
  btnText,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onConfirm = () => {},
}: Props) => {
  const { toggle, onToggle } = useToggle(false);

  const handleClose = () => onToggle(false);
  const handleOpen = () => onToggle(true);

  return (
    <>
      <Button color="error" onClick={handleOpen}>
        {btnText}
      </Button>
      <Dialog open={toggle} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{text}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            {cancelText}
          </Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
