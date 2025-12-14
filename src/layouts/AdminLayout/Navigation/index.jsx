import { useContext, useMemo } from 'react';
import NavContent from './NavContent';
import { ConfigContext } from 'contexts/ConfigContext';
import { AuthContext } from 'contexts/AuthContext';
import useWindowSize from 'hooks/useWindowSize';
import navigation from 'menu-items';
import { filterMenuByRole } from '../../../utils/filterMenubyRole';

export default function Navigation() {
  const { state, dispatch } = useContext(ConfigContext);
  const { user, loading } = useContext(AuthContext);
  const windowSize = useWindowSize();

  const role = user?.role;

  const filteredMenu = useMemo(() => {
    if (loading || !role) return [];
    return filterMenuByRole(navigation.items, role);
  }, [loading, role]);

  if (loading || !windowSize.width) {
    return null;
  }

  return (
    <nav className="dark-sidebar pc-sidebar">
      <NavContent navigation={filteredMenu} />
    </nav>
  );
}
