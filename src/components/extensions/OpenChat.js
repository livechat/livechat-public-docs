import { openChatWindow } from "utils/index";

const ChatWindow = ({ children }) => {
  return (
    <a href="#open-chat" onClick={openChatWindow}>
      {children}
    </a>
  );
};

export default ChatWindow;
