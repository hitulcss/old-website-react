import React, { useRef } from "react";
import "./NewAccordian.css";

const AccordionItem = (props) => {
  const contentEl = useRef();
  const { handleToggle, active, faq, index } = props;
  const { question, id, answer } = faq;

  return (
    <div className="rc-accordion-card">
      <div className="rc-accordion-header">
        <div
          className={`rc-accordion-toggle p-3 ${active === index ? "active" : ""}`}
          onClick={() => handleToggle(index)}
        >
          <h5 className="rc-accordion-title">{question}</h5>
          <i className="fa fa-chevron-down rc-accordion-icon"></i>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`rc-collapse ${active === index ? "show" : ""}`}
        style={
          active === index
            ? { height: contentEl.current.scrollHeight }
            : { height: "0px" }
        }
      >
        <div className="rc-accordion-body">
          <p className="mb-0">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
