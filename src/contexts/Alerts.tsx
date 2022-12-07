import { createContext, useState, useContext, ReactNode } from "react";

interface AlertsContextData {
  openAlertSuccess: boolean;
  messageAlertSuccess: string;
  handleOpenAlertSuccess(message: string): void;
  handleCloseAlertSuccess(
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void;
}

type PropsAlertsProviders = {
  children: ReactNode;
};

const AlertsContext = createContext({} as AlertsContextData);

const AlertsContextProvider = ({ children }: PropsAlertsProviders) => {
  const [openAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [messageAlertSuccess, setMessageAlertSuccess] = useState<string>("");

  const handleOpenAlertSuccess = (message: string) => {
    setOpenAlertSuccess(true);
    setMessageAlertSuccess(message);
  };

  const handleCloseAlertSuccess = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlertSuccess(false);
    setMessageAlertSuccess("");
  };

  return (
    <AlertsContext.Provider
      value={{
        handleOpenAlertSuccess,
        handleCloseAlertSuccess,
        openAlertSuccess,
        messageAlertSuccess,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

export const useAlertsContext = () => {
  return useContext(AlertsContext);
};

export default AlertsContextProvider;
