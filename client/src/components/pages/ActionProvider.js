class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // new method
  greet() {
    const greetingMessage = this.createChatBotMessage("Hi, friend.");
    this.updateChatbotState(greetingMessage);
  }

  handleTechList = () => {
    const message = this.createChatBotMessage(
      "Fantastic, I've got the following resources for you:",
      {
        widget: "javascriptLinks",
      }
    );

    this.updateChatbotState(message);
  };

  handleTicket = () => {
    const message = this.createChatBotMessage(
      "Fantastic, I've got the message for you:",
      {
        widget: "Ticket",
      }
    );

    this.updateChatbotState(message);
  };

  handleAdmin = () => {
    const message = this.createChatBotMessage(
      "Fantastic, I've got the message for you:",
      {
        widget: "Admin",
      }
    );

    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
