'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { useUIStore } from '@/store';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

const NotificationContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;

  @media (max-width: 768px) {
    left: 20px;
    right: 20px;
    max-width: none;
  }
`;

const NotificationItem = styled.div<{ $type: 'success' | 'error' | 'info' | 'warning' }>`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: slideIn 0.3s ease-in-out;
  border-left: 4px solid ${props => {
    switch (props.$type) {
      case 'success': return '#48bb78';
      case 'error': return '#f56565';
      case 'warning': return '#ed8936';
      case 'info': return '#4299e1';
      default: return '#4299e1';
    }
  }};

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const IconWrapper = styled.div<{ $type: 'success' | 'error' | 'info' | 'warning' }>`
  color: ${props => {
    switch (props.$type) {
      case 'success': return '#48bb78';
      case 'error': return '#f56565';
      case 'warning': return '#ed8936';
      case 'info': return '#4299e1';
      default: return '#4299e1';
    }
  }};
`;

const Message = styled.p`
  flex: 1;
  margin: 0;
  color: #2d3748;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: #2d3748;
  }
`;

const getIcon = (type: 'success' | 'error' | 'info' | 'warning') => {
  switch (type) {
    case 'success':
      return <FiCheckCircle size={24} />;
    case 'error':
      return <FiAlertCircle size={24} />;
    case 'warning':
      return <FiAlertTriangle size={24} />;
    case 'info':
      return <FiInfo size={24} />;
    default:
      return <FiInfo size={24} />;
  }
};

export default function NotificationSystem() {
  const notifications = useUIStore(state => state.notifications);
  const removeNotification = useUIStore(state => state.removeNotification);

  return (
    <NotificationContainer>
      {notifications.map(notification => (
        <NotificationItem key={notification.id} $type={notification.type}>
          <IconWrapper $type={notification.type}>
            {getIcon(notification.type)}
          </IconWrapper>
          <Message>{notification.message}</Message>
          <CloseButton onClick={() => removeNotification(notification.id)}>
            <FiX size={20} />
          </CloseButton>
        </NotificationItem>
      ))}
    </NotificationContainer>
  );
}
