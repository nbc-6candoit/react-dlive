import Tag from "components/common/Tag";
import React from "react";

const TagSelection = ({ tagName, category, onClick, clicked, uid }) => {
  return (
    <Tag
      tagName={tagName}
      category={category}
      onClick={onClick}
      clicked={clicked}
      key={uid}
    />
  );
};

export default TagSelection;
