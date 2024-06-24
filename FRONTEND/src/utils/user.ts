enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SHOP = 'SHOP',
  NONE = 'NONE',
}

const usersToOptions = (users: User[]) : UserOption[] => {
  return users.map(u => {
    return {
      value: {...u},
      label: `${u.firstName} ${u.lastName} - ${u.email} - ${u.wallet}\ud83e\ude99`,
    }
  });
}

export { UserRole, usersToOptions }