import { Avatar, Badge } from '@nextui-org/react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../../contexts/auth.context';

function UserItem({ user, size, badgeSize, badgeColor, badgeNumber }) {
    const { userLoged } = useContext(AuthContext)

  return (
    <div>
        {userLoged && (
        <Link to={`/user/${user?.id}`}>
            <div className='flex flex-col items-center gap-4'>
            <Badge
            className={`w-${badgeSize} h-${badgeSize} bg-[${badgeColor}] text-white font-bold`}
            isOneChar
            content={badgeNumber}
            placement="bottom-right"
            shape="circle"
            >
                <Avatar radius="full" className={`w-${size} h-${size} border-3 text-large`} style={{borderColor:`${badgeColor}`}} src={user?.avatar } />
            </Badge>
                <p>{user?.name}</p>
            </div>
        </Link>
        )}
        {!userLoged && (
            <div className='flex flex-col items-center'>
                <Avatar radius="full" className={`w-${size} h-${size} text-large`} src={user?.avatar } />
                <p>{user?.name}</p>
            </div>
        )}
    </div>
  )
}

export default UserItem;