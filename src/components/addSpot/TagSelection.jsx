import Tag from "components/common/Tag";
import React from "react";

const TagSelection = ({ tagName, category, onClick, clicked }) => {
  return (
    <Tag
      tagName={tagName}
      category={category}
      onClick={onClick}
      clicked={clicked}
    />
  );
};

export default TagSelection;
