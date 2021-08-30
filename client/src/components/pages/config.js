import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import LearningOptions from "../LearningOptions/LearningOptions";
import LinkList from "../LinkList/LinkList";

const config = {
  botName: "LearningBot",
  initialMessages: [
    createChatBotMessage("Hi, How may I help you?", {
      widget: "learningOptions",
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  widgets: [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />,
    },
    {
      widgetName: "javascriptLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Want to learn Agile?",
            url: "https://www.atlassian.com/agile",
            id: 1,
          },
          {
            text: "Want to learn React?",
            url: "https://reactjs.org/tutorial/tutorial.html",
            id: 2,
          },
          {
            text: "Want to learn Django?",
            url: "https://www.djangoproject.com/start/",
            id: 3,
          },
          {
            text: "Want to learn Docker?",
            url: "https://docs.docker.com/get-started/",
            id: 4,
          },
        ],
      },
    },
    {
      widgetName: "Ticket",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Drop an a ticket under settings admin page",
            id: 1,
          },
        ]
      }
    },

    {
      widgetName: "Admin",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Drop an a email under settings admin page",
            id: 1,
          },
        ],
      },
    }
  ]
}

export default config;
