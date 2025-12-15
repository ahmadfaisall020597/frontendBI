import { useEffect, useState } from 'react';

// react-bootstrap
import { ListGroup, Dropdown, Button } from 'react-bootstrap';

// third party
import SimpleBar from 'simplebar-react';

// assets
import avatar2 from 'assets/images/user/avatar-2.jpg';

// utils
import { getUser, clearAuth } from '../../../../utils/authStorage';

// -----------------------|| NAV RIGHT ||-----------------------//

export default function NavRight() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    clearAuth();               
    window.location.reload();  
  };

  if (!user) return null;

  return (
    <ListGroup as="ul" bsPrefix=" " className="list-unstyled">
      <ListGroup.Item as="li" bsPrefix=" " className="pc-h-item">
        <Dropdown align="end">
          <Dropdown.Toggle
            as="a"
            variant="link"
            className="pc-head-link pc-head-link-text arrow-none me-0 user-name"
          >
            <img src={avatar2} alt="user" className="user-avatar" />
            <span>
              <span className="user-name">{user.name}</span>
              <span className="user-desc">{user.role}</span>
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="pc-h-dropdown dropdown-user-profile">
            <Dropdown.Header className="d-flex align-items-center justify-content-between">
              <h5 className="m-0">Profile</h5>
            </Dropdown.Header>

            <SimpleBar style={{ maxHeight: 'calc(100vh - 225px)' }}>
              <div className="dropdown-body profile-notification-scroll">
                <ul className="list-group list-group-flush w-100">
                  <li className="list-group-item">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <img
                          src={avatar2}
                          alt="user"
                          className="wid-50 rounded-circle"
                        />
                      </div>
                      <div className="flex-grow-1 mx-3">
                        <h5 className="mb-0">{user.name}</h5>
                        <span className="text-sm text-muted">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </li>

                  {/* LOGOUT */}
                  <li className="list-group-item">
                    <Button
                      variant="danger"
                      className="w-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </li>
                </ul>
              </div>
            </SimpleBar>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroup.Item>
    </ListGroup>
  );
}
