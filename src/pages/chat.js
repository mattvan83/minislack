import { RaisedButton, Message } from "@/components";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "@/firebase/FirebaseContext";
import { useRouter } from "next/router";

export default function Chat() {
  const { user, signout, sendMessage, messages } = useContext(FirebaseContext);
  const [newMessageContent, setNewMessageContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  const handleSubmit = async e => {
    e.preventDefault();
    await sendMessage(newMessageContent);
    setNewMessageContent("");
  };

  if (!user) return null;
  return (
    <div className="chat container">
      <div className="sider">
        <div>
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="sider-avatar"
          />
          <h2>{user.displayName}</h2>
          <h3>{user.email}</h3>
        </div>
        <RaisedButton onClick={signout}>LOGOUT</RaisedButton>
      </div>
      <div className="content">
        <div className="message-container">
          {messages.map(message => {
            return (
              <Message
                key={message.id}
                message={message}
                isOwnMessage={message.user.uid === user.uid}
              />
            );
          })}
        </div>
        <form className="input-container" onSubmit={handleSubmit}>
          <input
            placeholder="Enter your message here"
            value={newMessageContent}
            onChange={e => setNewMessageContent(e.target.value)}
          />
          <RaisedButton type="submit">SEND</RaisedButton>
        </form>
      </div>
    </div>
  );
}
