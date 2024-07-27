import documentStatusList from "../constants/documentStatusList";
export const getDocumentStatus = (status) => {
  let documentStatus;
  switch (status) {
    case documentStatusList.incoming:
      documentStatus = "incoming";
      break;
    case documentStatusList.received:
      documentStatus = "received";
      break;
    case documentStatusList.delayed:
      documentStatus = "delayed";
      break;
    default:
      break;
  }
  return documentStatus;
};
