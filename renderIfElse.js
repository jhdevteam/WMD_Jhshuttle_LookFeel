export default function renderIfElse(condition, content, altcontent) {
    if (condition) {
        return content;
    } else {
        return altcontent;
    }   
  }