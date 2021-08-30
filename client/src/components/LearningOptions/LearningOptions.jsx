import React from "react";

import "./LearningOptions.css";

const LearningOptions = (props) => {
  const options = [
    {
      text: "Learn new Technology",
      handler: props.actionProvider.handleTechList,
      id: 1,
    },
    { text: "Raise a Ticket", handler: props.actionProvider.handleTicket, id: 2 },
    { text: "Contact Admin", handler: props.actionProvider.handleAdmin, id: 3 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default LearningOptions;
