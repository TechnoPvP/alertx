import { Alert, AlertStatus, AlertStore } from '@alertx/core';
import {
  FC,
  PropsWithChildren,
  useEffect,
  useState,
  isValidElement,
  ReactElement,
} from 'react';
import { AlertContext } from '../../contexts/AlertContext';
import { AlertItem, AlertItemProps } from '../Alert/AlertItem';
import styled, { keyframes } from 'styled-components';

const AlertContainer = styled.div`
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const fadeIn = keyframes`
  0% { transform: translateX(-105%); }
  100% { transform: translateX(0%); }
`;

const AlertWrapper = styled.div`
  position: relative;
  animation: ${fadeIn} 0.25s ease-out normal;
`;

export type CustomAlertComponent = (props: Alert) => ReactElement;

export interface AlertProviderComponents {
  alertComponent?: CustomAlertComponent;
  variants?: { [key in AlertStatus]?: CustomAlertComponent };
}

export interface AlertProviderProps extends PropsWithChildren {
  store: AlertStore;
  Components?: AlertProviderComponents;
}

const AlertItemRender: FC<{
  alert: Alert;
  components?: AlertProviderComponents;
  onClose: () => void;
}> = ({ alert, components, onClose, ...props }) => {
  if (
    alert.status &&
    typeof components?.variants?.[alert.status] === 'function'
  ) {
    return (components.variants[alert.status] as any)(alert);
  }

  if (typeof components?.alertComponent === 'function')
    return components.alertComponent(alert);

  return (
    <AlertItem
      key={alert.id}
      status={alert.status}
      message={`${alert.message} - ${alert.id}`}
      title={alert?.title}
      display={{ closeAction: true }}
      onClose={onClose}
      actions={
        typeof alert.actions === 'function'
          ? alert.actions(alert)
          : (Array.isArray(alert.actions) &&
              alert.actions.every(isValidElement)) ||
            isValidElement(alert.actions)
          ? alert.actions
          : undefined
      }
    />
  );
};

export const AlertProvider: FC<AlertProviderProps> = ({
  children,
  store,
  Components,
  ...props
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const alertStore = store.on((alert) => {
      setAlerts(alert);
    });

    return () => {
      alertStore.unsubscribe();
    };
  }, [store]);

  return (
    <>
      <AlertContext.Provider
        value={{
          alerts: alerts,
          addAlert: (alert) => {
            return store.alert(alert);
          },
          alertPromise: (alert) => {
            return store.alertPromise(alert);
          },
          clear: () => {
            return store.clear();
          },
          removeAlert: (id) => {
            return store.remove(id);
          },
          updateAlert: (id, alert) => {
            return store.update(id, alert);
          },
        }}
      >
        <AlertContainer>
          {alerts.map((alert) => {
            console.log({ status: alert.status });
            return (
              <AlertWrapper key={alert.id}>
                {/* TODO: Make known that alert id is always there */}
                <AlertItemRender onClose={() => store.remove(alert.id)} alert={alert} components={Components} />
              </AlertWrapper>
            );
          })}
        </AlertContainer>

        {children}
      </AlertContext.Provider>

      <style jsx>{``}</style>
    </>
  );
};
