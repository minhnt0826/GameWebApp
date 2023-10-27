import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
  UseDisclosureReturn,
} from "@chakra-ui/react";

interface Props {
  action: String;
  useDisclosureReturn: UseDisclosureReturn;
}

const NotLoggedInDialog = ({ action, useDisclosureReturn }: Props) => {
  const cancelRef = React.useRef(null);

  return (
    <>
      <AlertDialog
        isOpen={useDisclosureReturn.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={useDisclosureReturn.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Not Logged In
            </AlertDialogHeader>

            <AlertDialogBody>You need to login to {action}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={useDisclosureReturn.onClose}>
                Okay
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default NotLoggedInDialog;
