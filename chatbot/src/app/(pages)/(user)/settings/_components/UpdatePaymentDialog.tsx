
interface UpdatePaymentDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    business: any;
}
function UpdatePaymentDialog({open,setOpen,business}:UpdatePaymentDialogProps) {
  return (
    <div>UpdatePaymentDialog</div>
  )
}

export default UpdatePaymentDialog