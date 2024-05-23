import { useState } from "react";
import JobApplyModal from "../../../components/features/Modals/JobApplyModal";

const JobApplyButton = ({
  singleJobPost,
  jobModal,
  locale,
  apiUrl,
  apiToken,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a
        href="#"
        className="button-3 w-button"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        {locale === "ar" ? "التقديم" : "Submission"}
      </a>

      <JobApplyModal
        singleJobPost={singleJobPost}
        locale={locale}
        open={open}
        setOpen={setOpen}
        apiToken={apiToken}
        apiUrl={apiUrl}
        jobModal={jobModal}
      />
    </>
  );
};

export default JobApplyButton;
