import { createContext, useState, useContext, ReactNode } from "react";

interface AlertsContextData {
  openAlertSuccess: boolean;
  messageAlertSuccess: string;
  typeAlert: 'success' | 'error';
  handleOpenAlertSuccess(message: string): void;
  handleOpenAlertError(message: string): void;
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
  const [typeAlert, setTypeAlert] = useState<"success" | "error">('success')

  const handleOpenAlertSuccess = (message: string) => {
    setTypeAlert('success')
    setMessageAlertSuccess(message);
    setOpenAlertSuccess(true);
  };

  const handleOpenAlertError = (message: string) => {
    setTypeAlert('error')
    setMessageAlertSuccess(message);
    setOpenAlertSuccess(true);

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
        typeAlert,
        handleOpenAlertError,
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
