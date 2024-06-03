const Buttons = ({ buttons }) => {
  const handleScroll = (value) => {
    if (value === "register-interest") {
      const top = document.querySelector("#careers").offsetTop;

      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {buttons?.map((button) => (
        <a
          data-w-id="77dedd9b-7265-2f12-95bd-8f07ed98ac2e"
          href={"#"}
          onClick={(e) => {
            e.preventDefault();
            handleScroll(
              button?.title?.toLocaleLowerCase().replaceAll(" ", "-")
            );
          }}
          className={`${button?.title
            ?.toLocaleLowerCase()
            .replaceAll(
              " ",
              "-"
            )} btn-primary-66 btn-primary-6 btn-primary-665 w-button`}
        >
          {button?.title}
        </a>
      ))}
    </>
  );
};

export default Buttons;
