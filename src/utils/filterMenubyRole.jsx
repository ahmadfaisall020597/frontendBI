export function filterMenuByRole(items, role) {
    return items
        .map((group) => {
            if (!group.children) return null;

            const newGroupChildren = group.children
                .map((menu) => {
                    if (!menu.children) return null;

                    const newMenuChildren = menu.children.filter(
                        (item) => !item.roles || item.roles.includes(role)
                    );

                    if (!newMenuChildren.length) return null;

                    return {
                        ...menu,
                        children: newMenuChildren
                    };
                })
                .filter(Boolean);

            if (!newGroupChildren.length) return null;

            return {
                ...group,
                children: newGroupChildren
            };
        })
        .filter(Boolean);
}
