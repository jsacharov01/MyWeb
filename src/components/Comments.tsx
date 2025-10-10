import React from "react";
import Giscus from "@giscus/react";

type Props = { slug: string };

// Configure these to your repository/category at deployment time
const GISCUS_REPO = "jsacharov01/MyWeb"; // owner/repo
const GISCUS_REPO_ID = "R_kgDOPuDU7A"; // fill in from giscus.app
const GISCUS_CATEGORY = "General"; // or your chosen category
const GISCUS_CATEGORY_ID = "DIC_kwDOPuDU7M4CweUq"; // fill in from giscus.app

const Comments: React.FC<Props> = ({ slug }) => {
  return (
    <section aria-label="Komentáře" className="mt-8">
      <Giscus
        id="comments"
        repo={GISCUS_REPO}
        repoId={GISCUS_REPO_ID}
        category={GISCUS_CATEGORY}
        categoryId={GISCUS_CATEGORY_ID}
        mapping="specific"
        term={slug}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="cs"
        loading="lazy"
      />
    </section>
  );
};

export default Comments;
