import { Avatar } from '@nextui-org/react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../../contexts/auth.context';

function UserItem({ user }) {
    const { userLoged } = useContext(AuthContext)

  return (
    <div>
        {userLoged && (
        <Link to={`/user/${user.id}`}>
            <div className='flex flex-col items-center'>
                <Avatar isBordered radius="full" className="w-20 h-20 text-large" src={user.avatar } />
                <p>{user.name}</p>
            </div>
        </Link>
        )}
        {!userLoged && (
            <div className='flex flex-col items-center'>
                <Avatar isBordered radius="full" className="w-20 h-20 text-large" src={user.avatar } />
                <p>{user.name}</p>
            </div>
        )}
    </div>
  )
}

export default UserItem;