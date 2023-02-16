import { message } from "antd";

export const copyTOClipboard = (str: string) => {
  var textField = document.createElement("textarea");
  textField.value = str;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
  //   showMessage.success(message);
  message.success("Copied to clipboard");
};
