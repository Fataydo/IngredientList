import React, { useState, ReactNode } from 'react';
import RecipeForm from './RecipeForm';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalStyle: React.CSSProperties = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    background: '#fff',
    zIndex: 1000,
  };

  return (
    <div style={modalStyle}>
      <span style={{ float: 'right', cursor: 'pointer' }} onClick={onClose}>
        &times;
      </span>
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Recipe Form</button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <RecipeForm />
      </Modal>
    </div>
  );
};

export default App;
