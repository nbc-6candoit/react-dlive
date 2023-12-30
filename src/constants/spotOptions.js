import { FaToilet } from "react-icons/fa";
import { FaShower } from "react-icons/fa";
import { AiFillShop } from "react-icons/ai";
import { BsFillSignpost2Fill } from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import { FaSink } from "react-icons/fa";

export const FACILITIES_DATA = [
  { icon: <FaToilet />, label: "화장실" },
  { icon: <FaShower />, label: "샤워실" },
  { icon: <FaSink />, label: "싱크대" },
  { icon: <AiFillShop />, label: "매점" },
  { icon: <BsFillSignpost2Fill />, label: "산책로" },
  { icon: <MdOutlinePets />, label: "반려동물" },
];

export const SEASONS = ["봄", "여름", "가을", "겨울"];
export const VIEWS = ["마운틴뷰", "리버뷰", "오션뷰"];
