import { v4 as uuidv4 } from "uuid";
import type UserType from "../../../interfaces/UserType";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { z } from "zod";

const { string } = z;

import Markdown from "../../../components/features/Markdown";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

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

Modal.setAppElement("body");

const ServiceRegistration = ({
  data = [],
  user,
  apiUrl,
  reafToken,
  services,
  currentService,
  registerPageData,
  locale,
}: any) => {
  console.log(data, "datadata");

  const [step, setStep] = useState<number>(0);
  const [serviceData, setServiceData] = useState<UserType>();
  const [category, setCategory] = useState<string>(
    currentService?.category?.data?.attributes?.value
  );

  const saudiArabianPhoneNumberPattern = /^(?:(?:\+?966)|0)?\s?5\d{8}$/;

  const saudiMobileSchema = z.object({
    mobileNumber: string().refine((value) => saudiArabianPhoneNumberPattern.test(value), {
      message:
        "Please enter a valid Saudi mobile number (+966XXXXXXXXX or 05XXXXXXXX).",
    }),
  });

  

  // Function to check the correctness and validity of a Saudi Arabian phone number
  function isValidSaudiArabianPhoneNumber(phoneNumber: any) {
    // Step 1: Regular expression validation
    if (!saudiArabianPhoneNumberPattern.test(phoneNumber)) {
      return false; // Phone number format is incorrect
    }

    // Step 2: Length check
    if (phoneNumber.replace(/\D/g, "").length !== 10) {
      return false; // Phone number length is incorrect
    }

    // Step 3: Country code verification
    if (!phoneNumber.startsWith("966") && !phoneNumber.startsWith("05")) {
      return false; // Invalid country code
    }

    // All checks passed, phone number is considered valid
    return true;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleScrollTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const handleService = (value: any) => {
    setServiceData(value);
    handleScrollTop();
    setStep(1);
  };

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  function openModal() {
    isChecked && setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSelectChange = (e: any) => {
    const selectedValue = e.target.value;
    setCategory(selectedValue);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checked status
  };

  const handleRequestService = async (e: any) => {
    e.preventDefault();

    createNewServiceToStrapi();
  };

  const createNewServiceToStrapi = async () => {
    console.log(user, "useruseruser!!");
    try {
      const response = await fetch(`${apiUrl}/api/service-orders`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${reafToken}`,
        },
        body: JSON.stringify({
          data: {
            serviceID: uuidv4(),
            serviceName: serviceData?.serviceName,
            personalInformation: {
              firstName: serviceData?.firstNameEn,
              lastName: serviceData?.lastNameEn,
              fatherName: serviceData?.fatherNameEn,
              grandFatherName: serviceData?.grandFatherNameEn,
              email: serviceData?.email,
              address: serviceData?.address,
              idNumber: serviceData?.idNumber,
              mobileNumber: serviceData?.mobileNumber,
            },
            requestInformation: {
              serviceName: serviceData?.serviceName,
              applicantCategory: category,
              specialty: serviceData?.specialty,
              qualificationType: serviceData?.qualificationType,
              professionalStatus: serviceData?.professtionalStatus,
              qualificationDesc: serviceData?.qualification,
            },
            user: user,
            confirm: false,
          },
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create new Service");
      }

      openModal();
      console.log("New Service created:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error creating new Service:", error);
      throw new Error("Failed to create new Service");
    }
  };

  const handleKeyPress = (event: any) => {
    const pattern = /^[\u0600-\u06FF\s]+$/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  };

  const handleEnKeyPress = (event: any) => {
    const pattern = /^[a-zA-Z\s]+$/; // Regular expression pattern for English letters and spaces
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <section className="section hero v9">
        <div className="container-default w-container">
          <div data-w-id="77c7669f-a103-d027-e3e4-947d37f3ea3d">
            <div className="inner-container _680px center">
              <div className="text-center mg-bottom-32px">
                <img
                  src="https://assets-global.website-files.com/65a12e04c59a1723c86ea0f8/65a65e4b8ece87037ed1beec_Untitled%20design%20(40).png"
                  alt=""
                  className="subtitle-icon"
                />
                <h1 className="display-1 mg-bottom-12px">
                  {registerPageData?.title}
                </h1>
                <p className="mg-bottom-0">{registerPageData?.desc}</p>
              </div>
            </div>

            <div className="join-form-block w-form" style={{ minHeight: 500 }}>
              <div
                id="wf-form-Become-Professional-Form"
                data-name="Become Professional Form"
                className="grid-1-column gap-row-32px"
                data-wf-page-id="65b16c08a54d3202cc2bea00"
                data-wf-element-id="f3ab2e7e-c67d-76f9-84e1-783e60990123"
                aria-label="Become Professional Form"
              >
                <div
                  className="f-form-steps-item-inner"
                  style={{ minHeight: 500 }}
                >
                  <div className="f-steps-wrapper is--2">
                    <div className="f-progress-list">
                      <div className="f-progress-item">
                        <div
                          className={`progress-number_block  ${
                            step === 0 ? "f-progress-current-2" : ""
                          }`}
                        >
                          <div>1</div>
                        </div>
                        <div
                          className={`f-progress-txt-2 ${
                            step === 0 ? "form-step" : ""
                          }`}
                        >
                          {registerPageData?.personalRequestTitle}
                          <em>
                            <br />
                          </em>
                        </div>
                      </div>
                      <div className="f-progress-item">
                        <div
                          className={`progress-number_block  ${
                            step === 1 ? "f-progress-current-2" : ""
                          }`}
                        >
                          <div>2</div>
                        </div>
                        <div
                          className={`f-progress-txt-2 ${
                            step === 1 ? "form-step" : ""
                          }`}
                        >
                          {registerPageData?.summaryTitle}
                        </div>
                      </div>

                      <div className="f-progress-item">
                        <div
                          className={`progress-number_block  ${
                            step === 2 ? "f-progress-current-2" : ""
                          }`}
                        >
                          <div>3</div>
                        </div>
                        <div
                          className={`f-progress-txt-2 ${
                            step === 2 ? "form-step" : ""
                          }`}
                        >
                          {registerPageData?.termsConditionTitle}
                        </div>
                      </div>
                    </div>

                    {step === 0 && (
                      <form
                        action="#"
                        onSubmit={handleSubmit(handleService)}
                        className="grid-1-column gap-row-32px"
                      >
                        <div
                          data-clone-wrapper="contact"
                          className="f-steps-info-wrapper"
                        >
                          <div
                            data-clone="contact"
                            className="f-steps-info-clone"
                          >
                            <div className="f-steps-info-text-header is---2">
                              <div className="flex-horizontal start flex-wrap---gap-16px">
                                <img
                                  alt="Icon Personal Information - Localfinder X Webflow Template"
                                  src="https://assets-global.website-files.com/65a12e04c59a1723c86ea0f8/65a12e04c59a1723c86ea1f7_icon-personal-information-localfinder-x-webflow-template.svg"
                                  className={`card-image size-40px ${
                                    locale === "en" ? "mr-3  ml-0" : ""
                                  }`}
                                />
                                <h2 className="display-4 mg-bottom-0 ">
                                  {registerPageData?.personalInformationTitle}
                                </h2>
                              </div>
                            </div>

                            <div className="f-steps-info-grid">
                              <div className="f-input-block">
                                <label
                                  htmlFor="name-2"
                                  className="f-input-label w-clearfix"
                                >
                                  {registerPageData?.firstName} (
                                  {registerPageData?.arabicText})
                                </label>
                                <input
                                  {...register("firstNameAr", {
                                    required: true,
                                  })}
                                  className="input w-input"
                                  placeholder="مثال : خالد "
                                  onKeyPress={handleKeyPress}
                                  type="text"
                                />
                                {errors.firstNameAr && (
                                  <p className="error">
                                    {registerPageData?.firstName} (
                                    {registerPageData?.arabicText}){" "}
                                    {registerPageData?.requiredText}.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-3"
                                  className="f-input-label w-clearfix"
                                >
                                  {registerPageData?.firstName} (
                                  {registerPageData?.englishText})
                                </label>
                                <input
                                  {...register("firstNameEn", {
                                    required: true,
                                  })}
                                  defaultValue={user?.username?.split(" ")[0]}
                                  className="input w-input"
                                  placeholder="Ex: Khalid"
                                  onKeyPress={handleEnKeyPress}
                                  type="text"
                                />
                                {errors.firstNameEn && (
                                  <p className="error">
                                    {registerPageData?.firstName} (
                                    {registerPageData?.englishText}){" "}
                                    {registerPageData?.requiredText}.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-4"
                                  className="f-input-label w-clearfix"
                                >
                                  {registerPageData?.fatherName} (
                                  {registerPageData?.arabicText})
                                </label>

                                <input
                                  {...register("fatherNameAr", {
                                    required: true,
                                  })}
                                  onKeyPress={handleKeyPress}
                                  className="input w-input"
                                  placeholder="مثال : عبدالله "
                                  type="text"
                                />
                                {errors.fatherNameAr && (
                                  <p className="error">
                                    {registerPageData?.fatherName} (
                                    {registerPageData?.arabicText}){" "}
                                    {registerPageData?.requiredText}.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-5"
                                  className="f-input-label w-clearfix"
                                >
                                  {registerPageData?.fatherName} (
                                  {registerPageData?.englishText})
                                </label>
                                <input
                                  {...register("fatherNameEn", {
                                    required: true,
                                  })}
                                  onKeyPress={handleEnKeyPress}
                                  className="input w-input"
                                  placeholder="Ex: Abdullah"
                                  type="text"
                                />
                                {errors.fatherNameEn && (
                                  <p className="error">
                                    {registerPageData?.fatherName} (
                                    {registerPageData?.englishText}){" "}
                                    {registerPageData?.requiredText}.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-7"
                                  className="f-input-label w-clearfix"
                                >
                                  {registerPageData?.grandFatherName} (
                                  {registerPageData?.arabicText})
                                </label>
                                <input
                                  {...register("grandFatherNameAr", {
                                    required: true,
                                  })}
                                  onKeyPress={handleKeyPress}
                                  className="input w-input"
                                  placeholder="مثال : محمد"
                                  type="text"
                                />
                                {errors.grandFatherNameAr && (
                                  <p className="error">
                                    {registerPageData?.grandFatherName} (
                                    {registerPageData?.arabicText}){" "}
                                    {registerPageData?.requiredText}.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-6"
                                  className="f-input-label w-clearfix"
                                >
                                  {registerPageData?.grandFatherName} (
                                  {registerPageData?.englishText})
                                </label>

                                <input
                                  {...register("grandFatherNameEn", {
                                    required: true,
                                  })}
                                  className="input w-input"
                                  onKeyPress={handleEnKeyPress}
                                  placeholder="Ex: Mohamed"
                                  type="text"
                                />
                                {errors.grandFatherNameEn && (
                                  <p className="error">
                                    {registerPageData?.grandFatherName} (
                                    {registerPageData?.englishText}){" "}
                                    {registerPageData?.requiredText}.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-8"
                                  className="f-input-label w-clearfix"
                                >
                                  {registerPageData?.lastName} (
                                  {registerPageData?.arabicText})
                                </label>
                                <input
                                  {...register("lastNameAr", {
                                    required: true,
                                  })}
                                  className="input w-input"
                                  onKeyPress={handleKeyPress}
                                  placeholder="مثال : الراقي "
                                  type="text"
                                />
                                {errors.lastNameAr && (
                                  <p className="error">
                                    {registerPageData?.lastName} (
                                    {registerPageData?.arabicText}){" "}
                                    {registerPageData?.requiredText}.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="name-9"
                                  className="f-input-label w-clearfix"
                                >
                                  {registerPageData?.lastName} (
                                  {registerPageData?.englishText})
                                </label>
                                <input
                                  {...register("lastNameEn", {
                                    required: true,
                                  })}
                                  defaultValue={user?.username?.split(" ")[1]}
                                  onKeyPress={handleEnKeyPress}
                                  className="input w-input"
                                  placeholder="Ex: Alraqe"
                                  type="text"
                                />

                                {errors.lastNameEn && (
                                  <p className="error">
                                    {registerPageData?.lastName} (
                                    {registerPageData?.englishText}){" "}
                                    {registerPageData?.requiredText}.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="email-2"
                                  className="f-input-label"
                                >
                                  {registerPageData?.email}
                                </label>
                                <div className="ms-input-wrap">
                                  <input
                                    {...register("email", {
                                      required: true,
                                    })}
                                    defaultValue={user?.email}
                                    className="input w-input"
                                    placeholder="example@email.com"
                                    type="email"
                                  />
                                </div>
                                {errors.email && (
                                  <p className="error">
                                    {" "}
                                    {registerPageData?.email}{" "}
                                    {registerPageData?.requiredText}.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="email-2"
                                  className="f-input-label"
                                >
                                  {registerPageData?.address}
                                </label>
                                <div className="ms-input-wrap">
                                  <input
                                    {...register("address", {
                                      required: true,
                                    })}
                                    defaultValue={user?.address}
                                    className="input w-input"
                                    placeholder={
                                      registerPageData?.addressPlaceholder
                                    }
                                    type="text"
                                  />
                                </div>
                                {errors.email && (
                                  <p className="error">
                                    {registerPageData?.address}{" "}
                                    {registerPageData?.requiredText}.
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="phone-2"
                                  className="f-input-label"
                                >
                                  {registerPageData?.idNumber}
                                </label>

                                <input
                                  {...register("idNumber", {
                                    required: true,
                                    maxLength: {
                                      value: 10,
                                      message:
                                        locale === "ar"
                                          ? "الرجاء إدخال رقم الهوية المكون من عشر خانات"
                                          : "Please enter your ten-digit ID number",
                                    },
                                  })}
                                  defaultValue={user?.idNumber}
                                  className="input w-input"
                                  placeholder="Ex: 1100000000"
                                  type="number"
                                />

                                {errors.idNumber && (
                                  <p className="error">
                                    {locale === "ar"
                                      ? "الرجاء إدخال رقم الهوية المكون من عشر خانات"
                                      : "Please enter your ten-digit ID number"}
                                  </p>
                                )}
                              </div>

                              <div className="f-input-block">
                                <label
                                  htmlFor="phone-3"
                                  className="f-input-label"
                                >
                                  {registerPageData?.mobileNumber}
                                </label>

                                <input
                                  type="tel"
                                  id="mobileNumber"
                                  {...register("mobileNumber", {
                                    required: true,
                                    validate: (value) =>
                                      saudiMobileSchema.safeParse({
                                        mobileNumber: value,
                                      }).success,
                                  })}
                                  defaultValue={user?.mobileNumber}
                                  className={`input w-input ${
                                    locale === "ar" ? "direction-rtl" : ""
                                  }`}
                                  placeholder="e.g.+966XXXXXXXXX or 05XXXXXXXX"
                                />

                                {errors.mobileNumber && (
                                  <p className="error">
                                    {registerPageData?.mobileNumberError}{" "}
                                    (+966XXXXXXXXX or 05XXXXXXXX)
                                  </p>
                                )}
                              </div>

                              <div
                                id="w-node-_802cfdac-c6a7-4894-2e49-abb498c5c682-4ea0ea95"
                                className="f-input-block"
                              >
                                <div className="flex-horizontal start flex-wrap---gap-16px">
                                  <img
                                    alt="Icon Blog - Localfinder X Webflow Template"
                                    src="https://assets-global.website-files.com/65a12e04c59a1723c86ea0f8/65a12e04c59a1723c86ea1fa_icon-blog-localfinder-x-webflow-template.svg"
                                    className={`card-image size-40px ${
                                      locale === "en" ? "mr-3 ml-0" : ""
                                    }`}
                                  />
                                  <h2 className="display-4 mg-bottom-0">
                                    <strong>
                                      {registerPageData?.requestInformation}
                                    </strong>
                                  </h2>
                                </div>

                                <label
                                  htmlFor="email-3"
                                  className="f-input-label w-clearfix"
                                >
                                  {registerPageData?.serviceName}
                                </label>

                                <div className="ms-input-wrap"></div>

                                <div className="ms-input-wrap">
                                  <div className="ms-input-outer">
                                    <select
                                      {...register("serviceName", {
                                        required: true,
                                      })}
                                      defaultValue={currentService?.slug}
                                      className="f-input-2 is-middle is-right w-select"
                                    >
                                      {services?.map(
                                        (service: any, index: number) => (
                                          <option
                                            key={index}
                                            value={service?.attributes?.slug}
                                          >
                                            {service?.attributes?.title}
                                          </option>
                                        )
                                      )}
                                    </select>

                                    {errors.serviceName && (
                                      <p>
                                        {registerPageData?.serviceName}{" "}
                                        {registerPageData?.requiredText}.
                                      </p>
                                    )}

                                    <label
                                      htmlFor="email-2"
                                      className="f-input-label w-clearfix"
                                    >
                                      {registerPageData?.applicantCategory}
                                    </label>

                                    <select
                                      {...register("applicantCategory", {
                                        required: true,
                                      })}
                                      onChange={handleSelectChange}
                                      value={category}
                                      className="f-input-2 is-middle is-right w-select"
                                    >
                                      {data?.map((item: any, index: number) => (
                                        <option
                                          value={item?.attributes?.value}
                                          key={index}
                                        >
                                          {item?.attributes?.title}
                                        </option>
                                      ))}
                                    </select>

                                    {errors.applicantCategory && (
                                      <p>
                                        {registerPageData?.applicantCategory}{" "}
                                        {registerPageData?.requiredText}.
                                      </p>
                                    )}

                                    <label
                                      htmlFor="Specialty-of-the-applicant"
                                      className="f-input-label w-clearfix"
                                    >
                                      {registerPageData?.specialty}
                                    </label>

                                    <select
                                      {...register("specialty", {
                                        required: true,
                                      })}
                                      defaultValue={
                                        data?.find(
                                          (item: any) =>
                                            item?.attributes?.value === category
                                        )?.attributes?.specialties?.data[0]
                                          ?.attributes?.value
                                      }
                                      className="f-input-2 is-middle is-right w-select"
                                    >
                                      {data
                                        ?.find(
                                          (item: any) =>
                                            item?.attributes?.value === category
                                        )
                                        ?.attributes?.specialties?.data?.map(
                                          (sub: any, subIndex: number) => (
                                            <option
                                              value={sub?.attributes?.value}
                                              key={subIndex}
                                            >
                                              {sub?.attributes?.title}
                                            </option>
                                          )
                                        )}
                                    </select>

                                    {errors.specialty && (
                                      <p>
                                        {registerPageData?.specialty}{" "}
                                        {registerPageData?.requiredText}.
                                      </p>
                                    )}

                                    <label
                                      htmlFor="Type-of-qualification"
                                      className="f-input-label w-clearfix"
                                    >
                                      {registerPageData?.qualificationTypeTitle}
                                    </label>

                                    <select
                                      {...register("qualificationType", {
                                        required: true,
                                      })}
                                      id="Type-of-qualification"
                                      name="Type-of-qualification"
                                      data-name="Type Of Qualification"
                                      className="f-input-2 is-middle is-right w-select"
                                    >
                                      {registerPageData?.qualificationTypeList?.map(
                                        (item: any) => (
                                          <option value={item?.value}>
                                            {item?.title}
                                          </option>
                                        )
                                      )}
                                    </select>

                                    {errors.qualificationType && (
                                      <p>
                                        {registerPageData?.qualificationType}{" "}
                                        {registerPageData?.requiredText}.
                                      </p>
                                    )}

                                    <label
                                      htmlFor="message-2"
                                      className="f-input-label w-clearfix"
                                    >
                                      {registerPageData?.qualification}
                                    </label>

                                    <textarea
                                      {...register("qualification", {
                                        required: true,
                                      })}
                                      placeholder={
                                        registerPageData?.qualificationPlaceholder
                                      }
                                      className={`text-area small mg-bottom-0 w-input ${
                                        locale === "ar"
                                          ? "text-right"
                                          : "text-left"
                                      }`}
                                    ></textarea>

                                    {errors.qualification && (
                                      <p
                                        className="error"
                                        style={{ width: "100%" }}
                                      >
                                        {registerPageData?.qualification}{" "}
                                        {registerPageData?.requiredText}.
                                      </p>
                                    )}

                                    <label
                                      htmlFor="email-2"
                                      className="f-input-label w-clearfix"
                                    >
                                      {
                                        registerPageData?.professionalStatusTitle
                                      }
                                    </label>

                                    <div className="ms-input-middle-row">
                                      <select
                                        {...register("professtionalStatus", {
                                          required: true,
                                        })}
                                        id="Professional-status-of-the-applicant"
                                        name="Professional-status-of-the-applicant"
                                        data-name="Professional Status Of The Applicant"
                                        className="f-input-2 is-middle is-right w-select"
                                      >
                                        {registerPageData?.professionalStatusList?.map(
                                          (item: any) => (
                                            <option value={item?.value}>
                                              {item?.title}
                                            </option>
                                          )
                                        )}
                                      </select>

                                      {errors.professtionalStatus && (
                                        <p>
                                          {registerPageData?.professionalStatus}{" "}
                                          {registerPageData?.requiredText}.
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="f-form-button-wrapper is---2">
                          <button
                            type="submit"
                            data-form="next-btn"
                            className="f-form-button next w-button"
                          >
                            {registerPageData?.nextBtnTitle}
                          </button>
                        </div>
                      </form>
                    )}

                    {step === 1 && (
                      <>
                        <div
                          data-display-wrapper="contact"
                          className="f-steps-info-details-wrapper"
                        >
                          <div
                            data-display="contact"
                            className="f-steps-info-details-item"
                          >
                            <div className="f-steps-info-details-wrap">
                              <div className="f-steps-info-details-grid">
                                <div>
                                  <div className="f-steps-info-details-heading">
                                    {registerPageData?.serviceName}
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.serviceName}
                                    <br />
                                  </div>
                                </div>
                                <div>
                                  <div className="f-steps-info-details-heading">
                                    <strong className="f-steps-info-details-heading">
                                      {registerPageData?.idNumber}
                                    </strong>
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="lastname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.idNumber}
                                    <br />
                                  </div>
                                </div>
                              </div>
                              <div className="f-steps-info-details-grid">
                                <div>
                                  <div className="f-steps-info-details-heading">
                                    {registerPageData?.firstName} (
                                    {registerPageData?.arabicText})
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.firstNameAr}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    {registerPageData?.firstName} (
                                    {registerPageData?.englishText})
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.firstNameEn}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    {registerPageData?.fatherName} (
                                    {registerPageData?.arabicText})
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.fatherNameAr}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    {registerPageData?.fatherName} (
                                    {registerPageData?.englishText})
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.fatherNameEn}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    {registerPageData?.grandFatherName} (
                                    {registerPageData?.arabicText})
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.grandFatherNameAr}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    {registerPageData?.grandFatherName} (
                                    {registerPageData?.englishText})
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.grandFatherNameEn}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    {registerPageData?.lastName} (
                                    {registerPageData?.arabicText})
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="lastname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.lastNameAr}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    {registerPageData?.lastName} (
                                    {registerPageData?.englishText})
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="lastname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.lastNameEn}
                                    <br />
                                  </div>
                                </div>
                              </div>
                              <div className="f-steps-info-details-grid">
                                <div>
                                  <div className="f-steps-info-details-heading">
                                    {registerPageData?.email}
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="email"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.email}
                                    <br />
                                  </div>
                                </div>
                                <div className="f-input-display-item">
                                  <div className="f-steps-info-details-heading">
                                    <strong className="f-steps-info-details-heading">
                                      {registerPageData?.mobileNumber}
                                    </strong>
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="relationship"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.mobileNumber}
                                    <br />
                                  </div>
                                </div>
                                <div id="w-node-fa84bdca-1099-417e-a5df-211bc4d5dab4-c98c163b">
                                  <div className="f-steps-info-details-heading">
                                    {registerPageData?.address}
                                    <br />
                                  </div>

                                  <div
                                    data-input-field="relationship"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.address}
                                    <br />
                                  </div>

                                  {/* {user?.address && (
                                    <Markdown
                                      value={md?.render(user?.address)}
                                    />
                                  )} */}
                                </div>
                              </div>

                              <div className="f-steps-info-details-grid">
                                <div>
                                  <div className="f-steps-info-details-heading">
                                    <strong className="f-steps-info-details-heading">
                                      {registerPageData?.applicantCategory}
                                    </strong>
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.applicantCategory}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    <strong className="f-steps-info-details-heading">
                                      {registerPageData?.specialty}
                                    </strong>
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="lastname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.specialty}
                                    <br />
                                  </div>
                                </div>
                              </div>

                              <div className="f-steps-info-details-grid">
                                <div>
                                  <div className="f-steps-info-details-heading">
                                    <strong className="f-steps-info-details-heading">
                                      {registerPageData?.qualificationTypeTitle}
                                    </strong>
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="firstname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.qualificationType}
                                    <br />
                                  </div>
                                </div>

                                <div>
                                  <div className="f-steps-info-details-heading">
                                    <strong className="f-steps-info-details-heading">
                                      {
                                        registerPageData?.professionalStatusTitle
                                      }
                                    </strong>
                                    <br />
                                  </div>
                                  <div
                                    data-input-field="lastname"
                                    className="f-steps-info-details-subtext"
                                  >
                                    {serviceData?.professtionalStatus}
                                    <br />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="f-form-button-wrapper is---2">
                          <a
                            data-add-new="contact"
                            data-form="back-btn"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setStep(0);
                              handleScrollTop();
                            }}
                            className="f-form-button back w-button"
                          >
                            {registerPageData?.backBtnTitle}
                          </a>

                          <a
                            data-form="next-btn"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setStep(2);
                              handleScrollTop();
                            }}
                            className="f-form-button next w-button"
                          >
                            {registerPageData?.continueBtnTitle}
                          </a>
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="f-steps-info-details-wrapper">
                          <div
                            id="w-node-_87c542fa-6619-a495-7111-d5dfe242e1cf-76852cd0"
                            className="f-steps-terms-contain"
                          >
                            <label className="w-checkbox f-checkbox-field">
                              <input
                                type="checkbox"
                                id="checkbox"
                                name="checkbox"
                                data-name="Checkbox"
                                className="w-checkbox-input f-checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                              />
                              <span className="f-checkbox-label w-form-label ml-2">
                                <Markdown
                                  value={md?.render(
                                    registerPageData?.termsPolicyText.toString()
                                  )}
                                />
                              </span>
                            </label>
                          </div>
                        </div>

                        <div className="f-form-button-wrapper is---2">
                          <a
                            data-form="back-btn"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleScrollTop();
                              setStep(1);
                            }}
                            className="f-form-button back w-button"
                          >
                            {registerPageData?.backBtnTitle}
                          </a>
                          <a
                            data-form="next-btn"
                            href="#"
                            onClick={(e) => handleRequestService(e)}
                            className={`f-form-button next w-button ${
                              isChecked ? "" : "btn-disabled"
                            }`}
                          >
                            {registerPageData?.submitBtnTitle}
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={"overlay"}
      >
        <div className="mb-0" style={{ textAlign: "center" }}>
          <div className="line-rounded-icon success-message-check large"></div>
          <div className="heading-h3-size mg-bottom-8px">
            {registerPageData?.thankyouTitle}
          </div>
          <div>{registerPageData?.thankyouContent}</div>

          <a
            href={registerPageData?.profileBtn?.value}
            className="f-form-button next w-button inline-block mt-7"
            style={{ display: "inline-flex" }}
          >
            {registerPageData?.profileBtn?.title}
          </a>
        </div>
      </Modal>
    </>
  );
};

export default ServiceRegistration;
