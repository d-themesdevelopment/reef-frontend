import { useEffect, useState } from "react";

const CategoryPageContent = ({ categories, servicesData }: any) => {
  const [category, setCategory] = useState<any>();

  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const item = searchParams.get('item');
    setSearchValue(item as string);
    setCategory(categories?.find((value:any) => value?.attributes?.value === item ));
  }, []);

  return (
    <>
      <section className="section hero-blog-category">
        <div className="card-section-wrapper bg-secondary-2 pd---none-border-top">
          <div className="container-default w-container">
            <div
              data-w-id="3e4e7251-8551-627f-c0f5-993b0da1edc1"
              className="inner-container _490px center"
            >
              <div className="text-center">
                <div className="category-page-icon-wrapper">
                  <img
                    src="https://assets-global.website-files.com/65e9eb27ad372f914ea0e97d/65e9eb27ad372f914ea0eb43_21.svg"
                    width="42"
                    alt="الأسر الريفية المنتجة"
                    className="subtitle-icon category-page-icon"
                  />
                </div>
                <h1 className="display-1 mg-bottom-12px">
                  {category?.attributes?.title}
                </h1>
                <p className="mg-bottom-32px">{category?.attributes?.desc}</p>

                <div className="w-dyn-list">
                  <div
                    role="list"
                    className="categories-badges-wrapper center w-dyn-items"
                  >
                    {categories?.map((item: any, index: number) => (
                      <div
                        key={index}
                        role="listitem"
                        className="categories-badges-item-wrapper center w-dyn-item"
                      >
                        <a
                          onClick={() => setCategory(item)}
                          href={`/category?item=${item?.attributes?.value}`}
                          className={`badge-secondary small category-badges center w-inline-block ${
                            item?.attributes?.value ===
                            searchValue
                              ? "w--current"
                              : ""
                          }`}
                        >
                          <div className="flex-horizontal gap-4px">
                            <>
                              <img
                                alt="صغار المزارعين"
                                src="https://assets-global.website-files.com/65e9eb27ad372f914ea0e97d/65e9eb27ad372f914ea0eafc_22.svg"
                                width="39"
                              />
                              <div className="text-block-23">
                                {item?.attributes?.title}
                              </div>
                            </>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pd-80px">
        <div className="container-default w-container">
          <div className="container-responsive">
            <div
              data-w-id="0af75b57-78b7-473f-a13a-ba5a04798e58"
              className="w-dyn-list"
            >
              <div
                role="list"
                className="grid-3-columns gap-row-32px w-dyn-items"
              >
                { (searchValue ? servicesData
                  ?.filter(
                    (value: any) =>
                      value?.attributes?.category?.data?.attributes?.value ===
                      category?.attributes?.value
                  ) : servicesData )?.map((item: any, index: number) => (
                    <div role="listitem" className="w-dyn-item" key={index}>
                      <a
                        data-w-id="4ef36aa9-69ab-043c-c626-baafa095a585"
                        href={`/services/${item.attributes.slug}`}
                        className="card card-team-member w-inline-block"
                      >
                        <>
                          <div className="card-picture card-team-member---image">
                            <div
                              className="lottie-animation"
                              data-w-id="ecc40607-317a-e6f6-9d86-6e59c07a54fb"
                              data-animation-type="lottie"
                              data-src="/documents/Animation---1707959104600.json"
                              data-loop="1"
                              data-direction="1"
                              data-autoplay="1"
                              data-is-ix2-target="0"
                              data-renderer="svg"
                              data-default-duration="9.366666666666667"
                              data-duration="0"
                            />
                          </div>
                          <div className="pd---content-inside-card card-team-member---content">
                            <>
                              <div className="flex-horizontal space-between align-top">
                                <>
                                  <div className="inner-container _350px---mbl">
                                    <>
                                      <h2 className="mg-bottom-6px display-4">
                                        {item.attributes.title}
                                      </h2>
                                      <p className="paragraph-5 paragraph-445">
                                        {item.attributes.desc}
                                      </p>
                                    </>
                                  </div>
                                  <div className="mg-left-6px">
                                    <div className="btn-circle-wrapper">
                                      <div className="line-rounded-icon">
                                        <strong></strong>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              </div>

                              <div className="flex-horizontal start flex-wrap---gap-12px">
                                <>
                                  <div className="badge-v1">
                                    <div>{item.attributes.workingDay}</div>
                                  </div>
                                  <div className="badge-v1">
                                    {item.attributes.type}
                                  </div>
                                </>
                              </div>
                            </>
                          </div>
                        </>
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPageContent;
