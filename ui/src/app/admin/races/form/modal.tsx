import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import Button from "@/components/button";
import useToggle from "@/hooks/use-toggle";

import Form from "./form";

const RaceForm = () => {
  const { toggle, onToggle } = useToggle(false);

  const handleClose = () => onToggle(false);

  return (
    <>
      <Button variant="contained" onClick={() => onToggle(true)}>
        Add Race
      </Button>
      <Dialog open={toggle} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Race</DialogTitle>
        <DialogContent>
          <Form isModal onClose={handleClose} onSuccess={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RaceForm;
