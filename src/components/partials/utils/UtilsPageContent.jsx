import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

import Markdown from "../../features/Markdown";

const UtilsPageContent = ({ singlePage }) => {
  return (
    <>
      <section>
        <div className="card-section-wrapper bg-secondary-2 pd---none-border-top newhe334">
          <div className="container-default-64 w-container">
            <div
              data-w-id="262916be-6b73-bc23-db01-80a767b44861"
              className="inner-container _700px center"
            >
              <div className="text-center-9">
                <h1 className="display-24 text-center text-primary">
                  {singlePage?.attributes?.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {
        console.log(singlePage?.attributes?.content, "singlePage?.attributes?.content")
      }

      <section class="section-27">
        <div class="w-layout-blockcontainer container-3 w-container">
          <Markdown
            value={md?.render(singlePage?.attributes?.content)}
          />
        </div>
      </section>
    </>
  );
};

export default UtilsPageContent;
