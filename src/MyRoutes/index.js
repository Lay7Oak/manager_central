
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Persistence/AuthContext';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

export default function MyRoutes() {
  const { user } = useContext(AuthContext);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (user !== undefined) {
      setIsReady(true);
    }
  }, [user]);

  if (!isReady) {
    return null;
  }

  return user ? <PrivateRoutes /> : <PublicRoutes />;
}
