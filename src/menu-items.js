// menu-items.jsx
const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'collapse',
          icon: 'ph-gauge',
          children: [
            // 🔒 ADMIN
            {
              id: 'sales',
              title: 'Sales',
              type: 'item',
              url: '/dashboard/admin/sales',
              roles: ['admin']
            },
            {
              id: 'iklan',
              title: 'Iklan',
              type: 'item',
              url: '/dashboard/admin/list-iklan',
              roles: ['admin']
            },
            {
              id: 'kalangan',
              title: 'Kalangan',
              type: 'item',
              url: '/dashboard/admin/list-kalangan',
              roles: ['admin']
            },
            {
              id: 'webinar',
              title: 'Webinar',
              type: 'item',
              url: '/dashboard/admin/list-webinar',
              roles: ['admin']
            },

            // 👤 MEMBER
            {
              id: 'pendaftaran',
              title: 'Pendaftaran',
              type: 'item',
              url: '/dashboard/member',
              roles: ['member']
            }
          ]
        }
      ]
    }
  ]
};

export default menuItems;
