import {
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
} from "@elastic/eui";

export interface ModalProps {
  onCloseModal: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ onCloseModal, children }) => {
  return (
    <EuiModal onClose={onCloseModal}>
      <EuiModalHeader></EuiModalHeader>
      <EuiModalBody>{children}</EuiModalBody>
    </EuiModal>
  );
};
