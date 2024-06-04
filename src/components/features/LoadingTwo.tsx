import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "30px 50px",
    borderRadius: "20px",
    background: "transparent",
    border: "none"
  },
};

const LoadingTwo = () => {
  return (
    <Modal
      isOpen={true}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName={"overlay"}
    >
       <div className="ml-loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
    </Modal>
  );
};

export default LoadingTwo;
