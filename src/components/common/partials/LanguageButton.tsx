import Cookies from "js-cookie";

const LanguageButton = () => {
  const isEn = Cookies.get("locale");

  const handleSwitchLocale = () => {
    if (isEn === "en") {
      Cookies.set("locale", "ar");
    } else {
      Cookies.set("locale", "en");
    }

    location.href = typeof window !== "undefined" ? window.location.href : "/";
  };

  return isEn === "en" ? (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        handleSwitchLocale();
      }}
      className="btn-secondary small header-btn-hidden-on-tablet white white2 w-button"
    >
      العربية
    </a>
  ) : (
    <>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleSwitchLocale();
        }}
        className="btn-secondary small header-btn-hidden-on-tablet white white2 w-button"
      >
        English
      </a>
    </>
  );
};

export default LanguageButton;
