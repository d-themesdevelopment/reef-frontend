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
  },
};

const Loading = () => {
  return (
    <Modal
      isOpen={true}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName={"overlay"}
    >
      <div className="loading">
        <div className="preloader">
          <div className="loader">
            <div className="shadow"></div>
            <div className="box"></div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Loading;
